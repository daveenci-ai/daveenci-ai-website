import { query, testConnection } from './database.js';

// Initialize database tables
const initializeTables = async () => {
  try {
    console.log('🔄 Initializing database tables...');

    // Events table
    await query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        event_date TIMESTAMP,
        event_name TEXT,
        event_address TEXT,
        event_type TEXT,
        event_description TEXT,
        event_capacity INT,
        event_status TEXT,
        dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        dt_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Event participants table
    await query(`
      CREATE TABLE IF NOT EXISTS event_participants (
        id SERIAL PRIMARY KEY,
        event_id INT REFERENCES events(id),
        full_name TEXT,
        email TEXT,
        phone TEXT,
        company_name TEXT,
        website TEXT,
        notes TEXT,
        dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        dt_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Add new columns to existing tables if they don't exist
    try {
      await query(`ALTER TABLE events ADD COLUMN IF NOT EXISTS event_address TEXT`);
    } catch (error) {
      // Column might already exist, ignore error
    }

    try {
      await query(`ALTER TABLE event_participants ADD COLUMN IF NOT EXISTS company_name TEXT`);
    } catch (error) {
      // Column might already exist, ignore error
    }

    try {
      await query(`ALTER TABLE event_participants ADD COLUMN IF NOT EXISTS website TEXT`);
    } catch (error) {
      // Column might already exist, ignore error
    }

    // Create indexes for better performance
    await query(`
      CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
    `);

    await query(`
      CREATE INDEX IF NOT EXISTS idx_events_type ON events(event_type);
    `);

    await query(`
      CREATE INDEX IF NOT EXISTS idx_events_status ON events(event_status);
    `);

    await query(`
      CREATE INDEX IF NOT EXISTS idx_participants_event ON event_participants(event_id);
    `);

    await query(`
      CREATE INDEX IF NOT EXISTS idx_participants_email ON event_participants(email);
    `);

    console.log('✅ Database tables initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Error initializing database tables:', error.message);
    throw error;
  }
};

// Initialize database
export const initializeDatabase = async () => {
  try {
    // Test connection first
    const connected = await testConnection();
    if (!connected) {
      throw new Error('Failed to connect to database');
    }

    // Initialize tables
    await initializeTables();
    
    console.log('🎉 Database initialization complete!');
    return true;
  } catch (error) {
    console.error('💥 Database initialization failed:', error.message);
    throw error;
  }
};

export default initializeDatabase; 