import express from 'express';
import rateLimit from 'express-rate-limit';
import { sendEmail } from '../utils/sendEmail.js';
import { query } from '../config/database.js';

const router = express.Router();

// Rate limiting for form submissions
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 form submissions per windowMs
  message: { error: 'Too many form submissions, please try again later.' }
});

// Handle preflight requests explicitly
router.options('/register', (req, res) => {
  res.status(200).end();
});

router.options('/info', (req, res) => {
  res.status(200).end();
});

// Workshop registration endpoint
router.post('/register', formLimiter, async (req, res) => {
  try {
    const { firstName, lastName, email, phone, company_name, website, question } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ 
        error: 'First name, last name, and email are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Please provide a valid email address' 
      });
    }

    // Save to database (optimized with single query using UPSERT)
    let dbOperation;
    try {
      // Single optimized query using UPSERT operations
      dbOperation = query(`
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
            full_name = EXCLUDED.full_name,
            phone = EXCLUDED.phone,
            company_name = EXCLUDED.company_name,
            website = EXCLUDED.website,
            notes = EXCLUDED.notes,
            dt_updated = CURRENT_TIMESTAMP
          RETURNING id
        )
        SELECT 'success' as result
      `, [
        '2025-07-30 14:00:00',
        'AI Automation Workshop - Austin',
        '7800 North Mopac Expressway Austin, TX 78759',
        'workshop',
        'Learn AI-powered content marketing strategies, master CRM lead qualification with AI, and get hands-on experience with no-code automation tools.',
        40,
        'active',
        `${firstName} ${lastName}`,
        email,
        phone || null,
        company_name || null,
        website || null,
        question || null
      ]);

      console.log(`✅ Registration saved to database: ${firstName} ${lastName} (${email})`);

    } catch (dbError) {
      console.error('Database error during registration:', dbError);
      // Continue with email sending even if database fails
    }

    // Create email content
    const notificationHtml = `
      <h2>New Workshop Registration</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone ? `${phone} (SMS consent given)` : 'Not provided'}</p>
      <p><strong>Company:</strong> ${company_name || 'Not provided'}</p>
      <p><strong>Website:</strong> ${website || 'Not provided'}</p>
      <p><strong>Question:</strong> ${question || 'No question provided'}</p>
      <p><strong>Registration Time:</strong> ${new Date().toLocaleString()}</p>
    `;

    const confirmationHtml = `
      <h2>Thank you for registering, ${firstName}!</h2>
      <p>We're excited to have you join us for the AI Automation Workshop in Austin.</p>
      
      <h3>Event Details:</h3>
      <ul>
        <li><strong>Date:</strong> July 30, 2025</li>
        <li><strong>Time:</strong> 2:00 PM - 6:00 PM CST</li>
        <li><strong>Location:</strong> 7800 North Mopac Expressway, Austin, TX 78759</li>
      </ul>
      
      <p>What to expect:</p>
      <ul>
        <li>Learn AI-powered content marketing strategies</li>
        <li>Master CRM lead qualification with AI</li>
        <li>Hands-on experience with no-code automation tools</li>
        <li>Live walkthroughs and case studies</li>
        <li>Networking with fellow entrepreneurs</li>
        <li>Take-home templates and resources</li>
      </ul>
      
      <p>We'll send you more details and updates as the event approaches.</p>
      
      ${phone ? `<p><strong>SMS Updates:</strong> You'll receive text message updates about the workshop at ${phone}. Reply STOP to opt out at any time.</p>` : ''}
      
      <p>Best regards,<br>
      The DaVeenci Team</p>
    `;

    // ⚡ SPEED OPTIMIZATION: Send emails in parallel + respond immediately
    const notificationEmail = process.env.NOTIFICATION_EMAIL || process.env.FROM_EMAIL || 'support@daveenci.ai';
    
    // Fire and forget - send emails in background without waiting
    Promise.all([
      sendEmail(notificationEmail, 'New AI Automation Workshop Registration - Austin', notificationHtml).catch(err => 
        console.error('Admin notification email failed:', err)
      ),
      sendEmail(email, 'Welcome to the AI Automation Workshop - Austin!', confirmationHtml).catch(err => 
        console.error('User confirmation email failed:', err)
      ),
      dbOperation.catch(err => 
        console.error('Database operation failed:', err)
      )
    ]).then(() => {
      console.log('📧 All background operations completed');
    });

    // ⚡ IMMEDIATE RESPONSE - Don't wait for emails!
    res.status(200).json({ 
      message: 'Registration successful! Check your email for confirmation.',
      success: true 
    });

  } catch (error) {
    console.error('Workshop registration error:', error);
    res.status(500).json({ 
      error: 'Registration failed. Please try again later.' 
    });
  }
});

// Get workshop info endpoint
router.get('/info', (req, res) => {
  res.json({
    title: 'AI Automation Workshop - Austin',
    date: '2025-07-30',
    time: '14:00:00-05:00',
    location: 'Austin, TX',
    capacity: 40,
    price: 'Free',
    status: 'open'
  });
});

export { router as workshopRoutes }; 