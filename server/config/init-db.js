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

    // Simplified Blog Posts table
    await query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        slug VARCHAR(500) NOT NULL UNIQUE,
        content TEXT NOT NULL,
        excerpt TEXT,
        tags TEXT, -- Simple comma-separated tags
        meta_description VARCHAR(160),
        meta_keywords TEXT,
        seo_score DECIMAL(3,2) DEFAULT 0.0,
        featured_image_url TEXT,
        status VARCHAR(20) DEFAULT 'published',
        is_featured BOOLEAN DEFAULT false,
        view_count INT DEFAULT 0,
        read_time_minutes INT,
        published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_by_llm BOOLEAN DEFAULT true,
        llm_prompt TEXT
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

    // Add unique constraints for UPSERT operations
    try {
      await query(`
        CREATE UNIQUE INDEX IF NOT EXISTS idx_events_unique 
        ON events(event_name, event_type);
      `);
    } catch (error) {
      console.log('Unique constraint for events might already exist');
    }

    try {
      await query(`
        CREATE UNIQUE INDEX IF NOT EXISTS idx_participants_unique 
        ON event_participants(event_id, email);
      `);
    } catch (error) {
      console.log('Unique constraint for participants might already exist');
    }

    // Create indexes for better performance - Events
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

    // Create indexes for better performance - Blog
    await query(`
      CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
    `);

    await query(`
      CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
    `);

    await query(`
      CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
    `);

    await query(`
      CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(is_featured);
    `);

    await query(`
      CREATE INDEX IF NOT EXISTS idx_blog_posts_created_by_llm ON blog_posts(created_by_llm);
    `);

    await query(`
      CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING gin(to_tsvector('english', tags));
    `);

    await query(`
      CREATE INDEX IF NOT EXISTS idx_blog_posts_search ON blog_posts USING gin(to_tsvector('english', title || ' ' || content));
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