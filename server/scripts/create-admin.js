import bcrypt from 'bcrypt';
import { pool } from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config();

const createAdminUser = async () => {
  try {
    const email = process.argv[2];
    const password = process.argv[3];
    const name = process.argv[4] || 'Admin';

    if (!email || !password) {
      console.log('Usage: node scripts/create-admin.js <email> <password> [name]');
      console.log('Example: node scripts/create-admin.js admin@daveenci.ai mypassword123 "Admin User"');
      process.exit(1);
    }

    // Check if user already exists
    const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      console.log(`❌ User with email ${email} already exists!`);
      process.exit(1);
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user
    const result = await pool.query(
      'INSERT INTO users (email, name, password, validated) VALUES ($1, $2, $3, $4) RETURNING id, email, name',
      [email, name, hashedPassword, true]
    );

    const newUser = result.rows[0];
    console.log('✅ Admin user created successfully!');
    console.log(`📧 Email: ${newUser.email}`);
    console.log(`👤 Name: ${newUser.name}`);
    console.log(`🆔 ID: ${newUser.id}`);
    console.log('\n🔐 You can now login to the admin dashboard at /admin');

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  } finally {
    // Close the database connection
    await pool.end();
  }
};

createAdminUser(); 