import express from 'express';
import rateLimit from 'express-rate-limit';
import { sendEmail } from '../utils/sendEmail.js';
import { query } from '../config/database.js';
import Stripe from 'stripe';

const router = express.Router();
const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecret ? new Stripe(stripeSecret, { apiVersion: '2024-06-20' }) : null;

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

// Syllabus/lead capture preflight
router.options('/lead', (req, res) => {
  res.status(200).end();
});

// Simple lead capture for syllabus
router.post('/lead', async (req, res) => {
  try {
    const { email, name } = req.body || {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    const adminEmail = process.env.NOTIFICATION_EMAIL || process.env.FROM_EMAIL || 'support@daveenci.ai';
    const safeName = typeof name === 'string' ? name.trim() : '';
    const subject = 'New syllabus request — Discoverability Workshop (Austin)';
    const adminHtml = `
      <h2>Syllabus Request</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Name:</strong> ${safeName || '—'}</p>
      <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
    `;
    const userHtml = `
      <h2>Your Workshop Syllabus</h2>
      <p>Thanks${safeName ? `, ${safeName}` : ''}! Here’s what we’ll cover in the 90‑minute workshop:</p>
      <ul>
        <li><strong>AEO/GEO vs SEO</strong> — Q→A→Proof→Action, FAQ stacks, entity cues</li>
        <li><strong>CRM Copilot</strong> — enrichment, recap, replies, next actions</li>
        <li><strong>Setup</strong> — Render deploy, Stripe Checkout, Resend emails/.ics</li>
      </ul>
      <p>
        Date: <strong>Aug 28, 2025</strong> • Time: <strong>2:30 PM CT</strong> • Location: <strong>Austin, TX</strong>
      </p>
      <p>
        Ready to join? <a href="${process.env.PUBLIC_URL || 'https://daveenci.ai/events/ai-automation-workshop-austin'}" target="_blank">Reserve your seat</a>.
      </p>
      <p>— DaVeenci</p>
    `;

    // Fire-and-forget
    Promise.all([
      sendEmail(adminEmail, subject, adminHtml).catch(() => {}),
      sendEmail(email, 'Your Workshop Syllabus', userHtml).catch(() => {}),
    ]);

    return res.json({ ok: true });
  } catch {
    return res.status(500).json({ error: 'Failed to store lead' });
  }
});

// Stripe preflight
router.options('/checkout', (req, res) => {
  res.status(200).end();
});

// Create Stripe Checkout Session
router.post('/checkout', async (req, res) => {
  try {
    if (!stripe) {
      return res.status(501).json({ error: 'Payments not configured' });
    }

    const { plan = 'general', addOns = [], email, name, priceId, productId, lookupKey } = req.body || {};

    const priceMap = {
      early: process.env.EARLY_PRICE_ID,
      general: process.env.GA_PRICE_ID,
      team: process.env.TEAM_PRICE_ID,
      vip: process.env.VIP_PRICE_ID
    };

    const lineItems = [];

    // Resolve primary price
    let primaryPriceId = priceId || null;

    try {
      if (!primaryPriceId && lookupKey) {
        const prices = await stripe.prices.list({ lookup_keys: [lookupKey], active: true, limit: 1 });
        primaryPriceId = prices.data[0]?.id || null;
      }
      if (!primaryPriceId && productId) {
        // Prefer product default_price if set
        const product = await stripe.products.retrieve(productId);
        if (product.default_price) {
          primaryPriceId = typeof product.default_price === 'string' ? product.default_price : product.default_price.id;
        }
        if (!primaryPriceId) {
          const prices = await stripe.prices.list({ product: productId, active: true, limit: 10 });
          const oneTime = prices.data.find(p => p.type === 'one_time');
          primaryPriceId = (oneTime || prices.data[0])?.id || null;
        }
      }
    } catch (resolveErr) {
      console.error('Error resolving price from product/lookupKey:', resolveErr);
    }

    if (!primaryPriceId) {
      primaryPriceId = priceMap[plan] || null;
    }

    if (!primaryPriceId) {
      return res.status(400).json({ error: 'No valid price found. Provide plan, priceId, productId, or lookupKey.' });
    }

    lineItems.push({ price: primaryPriceId, quantity: plan === 'team' ? 3 : 1 });

    if (Array.isArray(addOns) && addOns.includes('vip') && priceMap.vip) {
      lineItems.push({ price: priceMap.vip, quantity: 1 });
    }

    const publicUrl = process.env.PUBLIC_URL || 'https://daveenci.ai/events/ai-automation-workshop-austin';
    const thankYouUrl = process.env.THANK_YOU_URL || 'https://daveenci.ai/events/thank-you-event';

    // Quick capacity pre-check (best-effort; hard cap enforced via webhook logic you can add later)
    try {
      if (process.env.DATABASE_URL) {
        const result = await query(
          `SELECT 
             COALESCE(event_capacity, 40) AS capacity,
             (SELECT COUNT(*) FROM event_participants ep INNER JOIN events e ON ep.event_id = e.id 
              WHERE e.event_name = $1 AND e.event_type = $2) AS sold
           FROM events WHERE event_name = $1 AND event_type = $2 LIMIT 1`,
          ['AI Automation Workshop - Austin', 'workshop']
        );
        if (result.rows.length > 0) {
          const { capacity, sold } = result.rows[0];
          const requested = plan === 'team' ? 3 : 1;
          if (sold + requested > capacity) {
            return res.status(409).json({ error: 'Sold out or not enough seats' });
          }
        }
      }
    } catch (e) {
      console.warn('Seat pre-check skipped due to DB error');
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      allow_promotion_codes: true,
      automatic_tax: { enabled: true },
      success_url: `${thankYouUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${publicUrl}`,
      customer_email: email || undefined,
      phone_number_collection: { enabled: true },
      custom_fields: [
        {
          key: 'company_name',
          label: { type: 'custom', custom: 'Company Name' },
          type: 'text',
          optional: true
        },
        {
          key: 'website',
          label: { type: 'custom', custom: 'Company Website' },
          type: 'text',
          optional: true
        }
      ],
      client_reference_id: 'ai-automation-workshop-austin',
      metadata: {
        workshop: 'ai-automation-workshop-austin',
        plan,
        vip: Array.isArray(addOns) && addOns.includes('vip') ? 'true' : 'false',
        name: name || '',
        email: email || ''
      }
    });

    return res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
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
        '2025-08-28 14:30:00',
        'AI Automation Workshop - Austin',
        '9606 N Mopac Expy #400, Austin, TX 78759 (Roku on Mopac)',
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
      <p>You're confirmed for our Discoverability Workshop (AEO/GEO vs SEO) in Austin.</p>
      
      <h3>Event Details:</h3>
      <ul>
        <li><strong>Date:</strong> August 28, 2025</li>
        <li><strong>Time:</strong> 2:30 PM - 4:30 PM CT</li>
        <li><strong>Location:</strong> 9606 N Mopac Expy #400, Austin, TX 78759 (Roku on Mopac)</li>
      </ul>
      
      <p>What you'll learn:</p>
      <ul>
        <li>Discoverability first: AEO/GEO vs SEO — structure pages for questions → answers → proof → action</li>
        <li>Build entity pages and FAQ stacks that answer engines cite</li>
        <li>CRM Copilot essentials (data hygiene, lead scoring, auto‑reply assistant)</li>
      </ul>
      
      <p>We'll send you reminders and resources before the event.</p>
      
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
    date: '2025-08-28',
    time: '14:30:00-05:00',
    endTime: '16:30:00-05:00',
    timeDisplay: '2:30 PM - 4:30 PM CT',
    location: '9606 N Mopac Expy #400, Austin, TX 78759 (Roku on Mopac)',
    capacity: 40,
    price: 'Free',
    status: 'open'
  });
});

export { router as workshopRoutes }; 