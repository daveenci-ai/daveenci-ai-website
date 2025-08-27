import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Stripe from 'stripe';

// Import routes
import { workshopRoutes } from './routes/workshop.js';
import { authRoutes } from './routes/auth.js';
import { chatRoutes } from './routes/chat.js';
import { blogRoutes } from './routes/blog.js';
import useCaseRoutes from './routes/useCases.js';
import { sendEmail } from './utils/sendEmail.js';

// Import database initialization
import { initializeDatabase } from './config/init-db.js';
import { closePool, query } from './config/database.js';

// Import blog automation for manual triggers only
import { runScheduledAutomation as runBlogAutomation } from './automation/blog-scheduler.js';
import { runAutomation as runUseCaseAutomation } from './automation/use-case-scheduler.js';

// Setup for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Force Render deployment trigger - debugging frontend issues
console.log('🔧 Deployment trigger: Frontend debugging v1.0');
console.log('📦 NODE_ENV:', process.env.NODE_ENV);
console.log('🌐 Static files path:', path.join(__dirname, '..', 'dist'));

const app = express();
const PORT = process.env.PORT || 3001;
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' }) : null;

// Trust proxy headers from Render (specific to avoid rate limiting warnings)
app.set('trust proxy', 1);

// Security middleware with custom CSP for external content
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'", 
        "'unsafe-inline'", // For Google Tag Manager
        "https://www.googletagmanager.com",
        "https://www.google-analytics.com",
        "https://js.stripe.com",
        "https://snap.licdn.com", // LinkedIn tracking
        "https://sc-static.net", // Snapchat tracking  
        "https://tr.snapchat.com", // Snapchat dynamic scripts
        "https://tr6.snapchat.com", // Snapchat dynamic scripts subdomain
        "https://connect.facebook.net", // Facebook tracking
        "https://analytics.tiktok.com", // TikTok tracking
        "https://static.ads-twitter.com" // Twitter tracking
      ],
      styleSrc: [
        "'self'", 
        "'unsafe-inline'", // For inline styles
        "https://fonts.googleapis.com"
      ],
      imgSrc: [
        "'self'", 
        "data:",
        "https:", // Allow all HTTPS images
        "http:", // Allow HTTP images for development
        "https://raw.githubusercontent.com", // GitHub images
        "https://picsum.photos", // Lorem Picsum
        "https://via.placeholder.com", // Placeholder.com
        "https://dummyimage.com", // DummyImage
        "https://images.unsplash.com" // Unsplash
      ],
      frameSrc: [
        "'self'",
        "https://www.youtube.com", // YouTube embeds
        "https://youtube.com",
        "https://www.googletagmanager.com", // Google Tag Manager
        "https://js.stripe.com",
        "https://checkout.stripe.com",
        "https://tr.snapchat.com", // Snapchat tracking frames
        "https://tr6.snapchat.com" // Snapchat tracking frames subdomain
      ],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com"
      ],
      connectSrc: [
        "'self'",
        "https://daveenci-ai-backend.onrender.com", // Backend API calls
        "https://www.google-analytics.com",
        "https://analytics.google.com", // Google Analytics collect endpoint
        "https://www.googletagmanager.com",
        "https://api.stripe.com",
        "https://snap.licdn.com", // LinkedIn tracking
        "https://px.ads.linkedin.com", // LinkedIn tracking endpoints
        "https://sc-static.net", // Snapchat tracking
        "https://tr.snapchat.com", // Snapchat tracking endpoints
        "https://tr6.snapchat.com", // Snapchat tracking subdomain
        "https://connect.facebook.net", // Facebook tracking
        "https://analytics.tiktok.com", // TikTok tracking
        "https://static.ads-twitter.com", // Twitter tracking
        "https://www.facebook.com", // Facebook Pixel
        "https://graph.facebook.com" // Facebook Graph API
      ]
    },
  },
}));

// Permissions policy for payment features
app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', 'payment=*, payment-handler=*');
  next();
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS configuration - Simplified since we're serving everything from one domain
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3001',
    'https://daveenci.ai',
    'https://www.daveenci.ai',
    'https://daveenci-ai-backend.onrender.com'  // All traffic will come through backend now
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  preflightContinue: false,
  optionsSuccessStatus: 200
}));

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path} - Origin: ${req.headers.origin}`);
  next();
});

// Serve static files from dist directory (built frontend)
const distPath = path.join(__dirname, '..', 'dist');
console.log(`📁 Serving static files from: ${distPath}`);
app.use(express.static(distPath));

// Stripe webhook must be defined BEFORE body parsers to preserve raw body
if (stripe && process.env.STRIPE_WEBHOOK_SECRET) {
  app.post('/webhooks/stripe', express.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error('❌ Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log('✅ Checkout completed:', session.id, session.metadata);
      // Idempotency: skip if this event was processed
      // Persist attendee to DB (best effort; do not block webhook response)
      (async () => {
        try {
          // If DB is not configured, skip
          if (!process.env.DATABASE_URL) {
            console.log('ℹ️ DATABASE_URL not set; skipping attendee persistence');
            return;
          }

          // Check processed_stripe_events
          const seen = await query('SELECT 1 FROM processed_stripe_events WHERE stripe_event_id = $1', [event.id]);
          if (seen.rows.length > 0) {
            console.log('↩️ Stripe event already processed:', event.id);
            return;
          }

          const email = session.customer_details?.email || session.metadata?.email || null;
          const fullName = session.customer_details?.name || session.metadata?.name || null;
          const phone = session.customer_details?.phone || null;
          // Extract custom fields if present
          const customFields = Array.isArray(session.custom_fields) ? session.custom_fields : [];
          const companyField = customFields.find(f => f.key === 'company_name');
          const websiteField = customFields.find(f => f.key === 'website');
          const companyName = companyField && companyField.text ? companyField.text.value : null;
          const website = websiteField && websiteField.text ? websiteField.text.value : null;
          const notes = `Stripe session ${session.id}; plan=${session.metadata?.plan || ''}; vip=${session.metadata?.vip || ''}`;

          // Upsert event (based on name + type unique index)
          await query(`
            WITH event_upsert AS (
              INSERT INTO events (event_date, event_name, event_address, event_type, event_description, event_capacity, event_status)
              VALUES ($1, $2, $3, $4, $5, $6, $7)
              ON CONFLICT (event_name, event_type) DO UPDATE SET
                event_date = EXCLUDED.event_date,
                event_address = EXCLUDED.event_address,
                event_description = EXCLUDED.event_description,
                event_capacity = EXCLUDED.event_capacity,
                dt_updated = CURRENT_TIMESTAMP
              RETURNING id
            ),
            participant_upsert AS (
              INSERT INTO event_participants (event_id, full_name, email, phone, company_name, website, notes)
              VALUES ((SELECT id FROM event_upsert), $8, $9, $10, $11, $12, $13)
              ON CONFLICT (event_id, email) DO UPDATE SET
                full_name = COALESCE(EXCLUDED.full_name, event_participants.full_name),
                notes = COALESCE(event_participants.notes, '') || '\n' || EXCLUDED.notes,
                dt_updated = CURRENT_TIMESTAMP
              RETURNING id
            )
            SELECT 'success' as result
          `, [
            '2025-08-28 14:30:00',
            'AI Automation Workshop - Austin',
            'Live Online Workshop',
            'workshop',
            'Master AEO: The Future of Search vs. Traditional SEO - Learn how to optimize your content for AI-driven answer engines.',
            100,
            'active',
            fullName,
            email,
            phone,
            companyName,
            website,
            notes
          ]);

          console.log('🗄️ Attendee persisted from Stripe session:', email || '(no email)');
          
          // Send confirmation email if we have customer email
          if (email) {
            const isVip = session.metadata?.vip === 'true';
            const plan = session.metadata?.plan || 'standard';
            await sendWorkshopConfirmationEmail(email, fullName, isVip, plan);
            
            // Send admin notification
            const adminEmail = process.env.NOTIFICATION_EMAIL || process.env.FROM_EMAIL || 'support@daveenci.ai';
            await sendAdminPurchaseNotification(adminEmail, session, email, fullName, isVip, plan);
          }

          // Mark processed
          await query('INSERT INTO processed_stripe_events (stripe_event_id) VALUES ($1) ON CONFLICT (stripe_event_id) DO NOTHING', [event.id]);
        } catch (dbErr) {
          console.error('❌ Failed to persist attendee from webhook:', dbErr.message);
        }
      })();
    }

    res.json({ received: true });
  });
} else {
  app.post('/webhooks/stripe', (req, res) => {
    return res.status(501).json({ error: 'Stripe webhook not configured' });
  });
}

// Body parsing middleware (after webhook)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'DaVeenci Server', 
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    database: process.env.DATABASE_URL ? 'configured' : 'not_configured',
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/workshop', workshopRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/use-cases', useCaseRoutes);
// Future routes can be added here:
// app.use('/api/admin', adminRoutes);

// Manual blog automation trigger (for testing)
app.post('/api/blog/automation/trigger', async (req, res) => {
  const { timeSlot } = req.body;
  
  if (!timeSlot || !['early_morning', 'morning', 'afternoon', 'evening', 'late_evening'].includes(timeSlot)) {
    return res.status(400).json({ 
      error: 'Invalid time slot. Must be: early_morning, morning, afternoon, evening, or late_evening' 
    });
  }
  
  try {
    console.log(`🚀 Manual trigger: Running ${timeSlot} blog automation`);
    const result = await runBlogAutomation(timeSlot);
    res.json({ 
      success: true, 
      message: `${timeSlot} blog automation completed successfully`,
      result 
    });
  } catch (error) {
    console.error(`❌ Manual ${timeSlot} automation failed:`, error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Handle 404 for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// SPA routing handler - serve index.html for all non-API routes
app.get('*', (req, res) => {
  // Skip API routes (they're handled above)
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  
  // Check if the file exists in the dist directory first
  const filePath = path.join(distPath, req.path);
  
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    // File exists, serve it
    res.sendFile(filePath);
  } else {
    // File doesn't exist, serve index.html for SPA routing
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).json({ 
        error: 'Frontend not found. Please build the frontend first.',
        hint: 'Run: npm run build'
      });
    }
  }
});

// Workshop confirmation email function
async function sendWorkshopConfirmationEmail(email, name, isVip, plan) {
  const firstName = name ? name.split(' ')[0] : 'there';
  
  const confirmationHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: 0; }
        .highlight { background: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0; }
        .vip-badge { background: #dc2626; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
        .event-details { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
        ul { padding-left: 20px; }
        li { margin: 8px 0; }
        a { color: #dc2626; text-decoration: none; }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 You're In! Welcome to the AI Revolution</h1>
          <p>AI for Business, Part 1: The Future of Content</p>
          ${isVip ? '<span class="vip-badge">VIP BUNDLE</span>' : ''}
        </div>
        
        <div class="content">
          <h2>Thank you, ${firstName}! 🚀</h2>
          <p>Your registration is confirmed for <strong>AI for Business, Part 1: The Future of Content</strong>. Get ready to transform your business operations with AI-powered content creation and automation!</p>
          
          <div class="event-details">
            <h3>📅 Workshop Details</h3>
            <ul style="list-style: none; padding-left: 0;">
              <li><strong>📅 Date:</strong> September 4, 2025</li>
              <li><strong>⏰ Time:</strong> 11:30 AM - 12:30 PM CT</li>
              <li><strong>🌐 Location:</strong> Live Online Workshop</li>
              <li><strong>🔗 Zoom Link:</strong> <a href="https://us04web.zoom.us/j/72964508583?pwd=TIXgmugncn1hD1KPZ1ad5Hq1vefaCH.1&jst=2" style="color: #dc2626;">Join Workshop Here</a></li>
              <li><strong>🎥 Recording:</strong> Yes, included for all participants</li>
            </ul>
          </div>

          <div class="highlight">
            <h3>🎯 What You'll Master</h3>
            <ul>
              <li><strong>AI Content Creation:</strong> Automate and scale your content production processes</li>
              <li><strong>Business Automation:</strong> Implement AI tools to streamline operations</li>
              <li><strong>Strategic Implementation:</strong> Practical approaches to AI adoption in business</li>
              <li><strong>Ready-to-Use Systems:</strong> Walk away with implemented AI workflows</li>
            </ul>
          </div>

          ${isVip ? `
          <div class="highlight" style="border-left-color: #dc2626;">
            <h3>⭐ Your VIP Bundle Includes:</h3>
            <ul>
              <li>Everything in Standard Ticket</li>
              <li><strong>Private 60-min consultation</strong> with our AI business experts</li>
              <li><strong>10% off future services</strong></li>
              <li><strong>Priority support access</strong></li>
            </ul>
          </div>
          ` : ''}

          <h3>📧 What Happens Next?</h3>
          <ol>
            <li><strong>Workshop Access:</strong> Your Zoom link is provided above - save it now!</li>
            <li><strong>AI Implementation Kit:</strong> Templates and resources will be sent 1 week before</li>
            <li><strong>Reminders:</strong> We'll send friendly reminders as the date approaches</li>
            <li><strong>Recording Access:</strong> You'll receive the recording link within 24 hours after the workshop</li>
          </ol>

          <h3>🎯 Prepare for Success</h3>
          <p>To get the most out of your AI for Business workshop:</p>
          <ul>
            <li>Think about your current content creation bottlenecks</li>
            <li>Identify repetitive tasks that could be automated</li>
            <li>Come ready to implement AI tools in your workflow!</li>
          </ul>
        </div>

        <div class="footer">
          <p>Questions? Reply to this email or contact us at <a href="mailto:support@daveenci.ai">support@daveenci.ai</a></p>
          <p><strong>DaVeenci</strong> • Mastering AI for Business</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await sendEmail(
      email,
      `🎉 You're In! AI for Business Workshop - September 4, 2025`,
      confirmationHtml
    );
    console.log(`✅ Confirmation email sent to ${email}`);
  } catch (error) {
    console.error(`❌ Failed to send confirmation email to ${email}:`, error);
  }
}

async function sendAdminPurchaseNotification(adminEmail, session, email, name, isVip, plan) {
  const adminHtml = `
    <h2>💰 New Workshop Purchase!</h2>
    <h3>Master AEO: The Future of Search vs. Traditional SEO</h3>
    
    <p><strong>Customer Details:</strong></p>
    <ul>
      <li><strong>Name:</strong> ${name || 'Not provided'}</li>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Phone:</strong> ${session.customer_details?.phone || 'Not provided'}</li>
      <li><strong>Plan:</strong> ${plan} ${isVip ? '+ VIP Bundle' : ''}</li>
    </ul>

    <p><strong>Payment Details:</strong></p>
    <ul>
      <li><strong>Amount:</strong> $${(session.amount_total / 100).toFixed(2)} ${session.currency?.toUpperCase() || 'USD'}</li>
      <li><strong>Session ID:</strong> ${session.id}</li>
      <li><strong>Payment Status:</strong> ${session.payment_status}</li>
      <li><strong>Purchase Time:</strong> ${new Date().toLocaleString()}</li>
    </ul>

    ${session.custom_fields?.length ? `
    <p><strong>Additional Information:</strong></p>
    <ul>
      ${session.custom_fields.map(field => 
        `<li><strong>${field.label?.custom || field.key}:</strong> ${field.text?.value || field.dropdown?.value || 'N/A'}</li>`
      ).join('')}
    </ul>
    ` : ''}

    <p><strong>Next Steps:</strong></p>
    <ul>
      <li>Participant has been automatically added to the workshop list</li>
      <li>Confirmation email sent to customer</li>
      <li>${isVip ? 'Schedule VIP consultation call within 48 hours' : 'Standard participation confirmed'}</li>
    </ul>
  `;

  try {
    await sendEmail(
      adminEmail,
      `💰 New AI for Business Workshop Purchase - ${name || email}`,
      adminHtml
    );
    console.log(`✅ Admin notification sent`);
  } catch (error) {
    console.error(`❌ Failed to send admin notification:`, error);
  }
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Blog automation setup - runs within backend service
const setupBlogAutomation = () => {
  console.log('🤖 Setting up blog automation (5 times daily: 6am, 10am, 2pm, 6pm, 10pm CST)...');
  
  const checkAndRunAutomation = async () => {
    try {
      const now = new Date();
      const cstTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Chicago"}));
      const hour = cstTime.getHours();
      const minute = cstTime.getMinutes();
      
      // Only run at specific times: 6am, 10am, 2pm, 6pm, 10pm CST (at the top of the hour)
      const targetHours = [6, 10, 14, 18, 22]; // 6am, 10am, 2pm, 6pm, 10pm in 24-hour format
      
      if (targetHours.includes(hour) && minute === 0) {
        console.log(`🕐 Automation trigger: ${cstTime.toLocaleString('en-US', { timeZone: 'America/Chicago' })} CST`);
        
        // Map hours to content types
        const timeSlots = {
          6: 'early_morning',  // 6am
          10: 'morning',       // 10am
          14: 'afternoon',     // 2pm
          18: 'evening',       // 6pm
          22: 'late_evening'   // 10pm
        };
        const timeSlot = timeSlots[hour];
        
        console.log(`🚀 Running ${timeSlot} automation...`);
        
        // Import and run the automation
        await runBlogAutomation(timeSlot);
        
        console.log(`✅ ${timeSlot} automation completed successfully`);
      }
    } catch (error) {
      console.error('❌ Blog automation error:', error.message);
    }
  };
  
  // Check every minute for the exact hour
  setInterval(checkAndRunAutomation, 60000); // 1 minute
  console.log('✅ Blog automation scheduler active');
};

const setupUseCaseAutomation = () => {
  console.log('🤖 Setting up use case automation (once every 3 days at 10:00 AM CT)...');

  const checkAndRunUseCaseAutomation = async () => {
    try {
      const now = new Date();
      const cstTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Chicago" }));
      const hour = cstTime.getHours();
      const minute = cstTime.getMinutes();

      // Run every 3 days at 10:00 AM CT
      // Calculate if it's the right day (every 3 days from a starting point)
      const startDate = new Date('2025-01-27'); // Monday as starting point
      const daysDiff = Math.floor((cstTime - startDate) / (1000 * 60 * 60 * 24));
      const isScheduledDay = daysDiff % 3 === 0;

      if (isScheduledDay && hour === 10 && minute === 0) {
        console.log(`🚀 Running use case automation (3-day cycle)...`);
        await runUseCaseAutomation();
        console.log(`✅ Use case automation completed successfully`);
      }
    } catch (error) {
      console.error('❌ Use case automation error:', error.message);
    }
  };

  // Check every minute
  setInterval(checkAndRunUseCaseAutomation, 60000); 
  console.log('✅ Use case automation scheduler active (every 3 days)');
};

// Start server with database initialization
const startServer = async () => {
  // Start the server first, then try database initialization
  const server = app.listen(PORT, () => {
    console.log(`🚀 DaVeenci Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📍 Health check: http://localhost:${PORT}/health`);
  });

  // Try to initialize database after server is running
  if (process.env.DATABASE_URL) {
    try {
      console.log('🔗 Initializing database connection...');
      await initializeDatabase();
      console.log('✅ Database initialized successfully');
      
      // Setup blog automation after database is ready
      setupBlogAutomation();
      setupUseCaseAutomation();
      
    } catch (error) {
      console.error('❌ Database initialization failed, but server will continue:', error.message);
      console.log('⚠️  Server running without database connection');
    }
  } else {
    console.log('⚠️  No DATABASE_URL found - running without database');
  }

  // Graceful shutdown handling
  const gracefulShutdown = async (signal) => {
    console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
    
    server.close(async () => {
      console.log('🔒 HTTP server closed');
      
      // Close database connections if they exist
      try {
        if (process.env.DATABASE_URL) {
          await closePool();
        }
      } catch (error) {
        console.error('Error closing database connections:', error.message);
      }
      
      console.log('👋 Graceful shutdown complete');
      process.exit(0);
    });
  };

  // Listen for shutdown signals
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
};

startServer().catch((error) => {
  console.error('💥 Failed to start server:', error.message);
  process.exit(1);
}); 