import { query } from '../config/database.js';

const createUseCasesTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS use_cases (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      industry VARCHAR(100),
      challenge TEXT,
      solution TEXT,
      results TEXT[],
      image_url VARCHAR(255),
      published_at TIMESTAMPTZ DEFAULT NOW(),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
  try {
    await query(sql);
    console.log('✅ "use_cases" table created successfully.');
  } catch (err) {
    console.error('❌ Error creating "use_cases" table:', err);
  }
};

const initUseCases = async () => {
  await createUseCasesTable();
};

initUseCases(); 