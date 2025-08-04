import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Import routes
import { workshopRoutes } from './routes/workshop.js';
import { authRoutes } from './routes/auth.js';
import { chatRoutes } from './routes/chat.js';
import { blogRoutes } from './routes/blog.js';
import useCaseRoutes from './routes/useCases.js';

// Import database initialization
import { initializeDatabase } from './config/init-db.js';
import { closePool } from './config/database.js';

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
        "https://www.google-analytics.com"
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
        "https://www.googletagmanager.com" // Google Tag Manager
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
        "https://www.googletagmanager.com"
      ]
    },
  },
}));

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

// Body parsing middleware
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
  console.log('🤖 Setting up use case automation (twice a week: Tue & Thu at 10am CST)...');

  const checkAndRunUseCaseAutomation = async () => {
    try {
      const now = new Date();
      const cstTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Chicago" }));
      const day = cstTime.getDay(); // 0 = Sunday, 1 = Monday, 2 = Tuesday, ...
      const hour = cstTime.getHours();
      const minute = cstTime.getMinutes();

      // Run on Tuesday (2) and Thursday (4) at 10:00 AM CST
      if ((day === 2 || day === 4) && hour === 10 && minute === 0) {
        console.log(`🚀 Running use case automation...`);
        await runUseCaseAutomation();
        console.log(`✅ Use case automation completed successfully`);
      }
    } catch (error) {
      console.error('❌ Use case automation error:', error.message);
    }
  };

  setInterval(checkAndRunUseCaseAutomation, 60000); // 1 minute
  console.log('✅ Use case automation scheduler active');
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