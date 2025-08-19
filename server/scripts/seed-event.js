import { query } from '../config/database.js';

// Seeds the AI Automation Workshop — Austin event into the existing `events` table
// Usage: node scripts/seed-event.js
// Optional env overrides: EVENT_NAME, EVENT_TYPE, EVENT_DATE, EVENT_ADDRESS, EVENT_DESC, EVENT_CAPACITY

const DEFAULTS = {
  name: process.env.EVENT_NAME || 'AI Automation Workshop - Austin',
  type: process.env.EVENT_TYPE || 'workshop',
  date: process.env.EVENT_DATE || '2025-07-30 14:30:00',
  address: process.env.EVENT_ADDRESS || '9606 N Mopac Expy #400, Austin, TX 78759 (Roku on Mopac)',
  description:
    process.env.EVENT_DESC ||
    'Hands-on AI workshop covering AEO/GEO, CRM Copilot essentials, and practical tools & skills.',
  capacity: parseInt(process.env.EVENT_CAPACITY || '40', 10),
  status: 'active',
};

async function main() {
  console.log('🧪 Seeding event with defaults:', DEFAULTS);
  try {
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
      )
      SELECT 'ok' as result;
    `, [
      DEFAULTS.date,
      DEFAULTS.name,
      DEFAULTS.address,
      DEFAULTS.type,
      DEFAULTS.description,
      DEFAULTS.capacity,
      DEFAULTS.status,
    ]);

    console.log('✅ Seeded/updated event:', DEFAULTS.name, `(${DEFAULTS.type})`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to seed event:', err.message);
    process.exit(1);
  }
}

main();


