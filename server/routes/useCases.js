import express from 'express';
import { query } from '../config/database.js';

const router = express.Router();

// GET all use cases
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM use_cases ORDER BY published_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST a new use case (for automation)
router.post('/', async (req, res) => {
  // Add authentication middleware here later
  const { title, slug, industry, challenge, solution, results, image_url } = req.body;
  try {
    const newUseCase = await query(
      'INSERT INTO use_cases (title, slug, industry, challenge, solution, results, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, slug, industry, challenge, solution, results, image_url]
    );
    res.json(newUseCase.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router; 