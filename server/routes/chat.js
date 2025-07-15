import express from 'express';
import pool, { query } from '../config/database.js';

const router = express.Router();

// Store chat summary
router.post('/summary', async (req, res) => {
  try {
    const {
      interaction_date,
      contact_info,
      chat_summary,
      services_discussed,
      key_pain_points,
      call_to_action_offered,
      next_step,
      lead_qualification
    } = req.body;

    // Validate required fields
    if (!interaction_date || !chat_summary) {
      return res.status(400).json({
        error: 'Missing required fields: interaction_date and chat_summary are required'
      });
    }

    // Validate contact_info structure
    if (!contact_info || typeof contact_info !== 'object') {
      return res.status(400).json({
        error: 'contact_info must be an object'
      });
    }

    // Validate arrays
    if (services_discussed && !Array.isArray(services_discussed)) {
      return res.status(400).json({
        error: 'services_discussed must be an array'
      });
    }

    if (key_pain_points && !Array.isArray(key_pain_points)) {
      return res.status(400).json({
        error: 'key_pain_points must be an array'
      });
    }

    // Validate lead_qualification
    const validQualifications = ['Hot', 'Warm', 'Cold'];
    if (lead_qualification && !validQualifications.includes(lead_qualification)) {
      return res.status(400).json({
        error: 'lead_qualification must be one of: Hot, Warm, Cold'
      });
    }

    console.log('💬 Storing chat summary:', {
      date: interaction_date,
      email: contact_info.email || 'not provided',
      qualification: lead_qualification || 'not specified',
      services: services_discussed?.length || 0,
      pain_points: key_pain_points?.length || 0
    });

    // Store in database
    const insertQuery = `
      INSERT INTO chat_summaries (
        interaction_date,
        contact_name,
        contact_email,
        contact_phone,
        company_name,
        chat_summary,
        services_discussed,
        key_pain_points,
        call_to_action_offered,
        next_step,
        lead_qualification,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
      RETURNING id
    `;

    const values = [
      interaction_date,
      contact_info.name || null,
      contact_info.email || null,
      contact_info.phone || null,
      contact_info.company_name || null,
      chat_summary,
      JSON.stringify(services_discussed || []),
      JSON.stringify(key_pain_points || []),
      call_to_action_offered || false,
      next_step || null,
      lead_qualification || 'Cold'
    ];

    const result = await query(insertQuery, values);
    const chatId = result.rows[0].id;

    console.log('✅ Chat summary stored successfully with ID:', chatId);

    res.status(201).json({
      success: true,
      message: 'Chat summary stored successfully',
      id: chatId
    });

  } catch (error) {
    console.error('❌ Error storing chat summary:', error);

    res.status(500).json({
      error: 'Failed to store chat summary',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get chat summaries (for admin/analytics)
router.get('/summaries', async (req, res) => {
  try {
    const { page = 1, limit = 50, qualification, date_from, date_to } = req.query;
    
    let whereClause = 'WHERE 1=1';
    const values = [];
    let paramCount = 0;

    if (qualification) {
      paramCount++;
      whereClause += ` AND lead_qualification = $${paramCount}`;
      values.push(qualification);
    }

    if (date_from) {
      paramCount++;
      whereClause += ` AND interaction_date >= $${paramCount}`;
      values.push(date_from);
    }

    if (date_to) {
      paramCount++;
      whereClause += ` AND interaction_date <= $${paramCount}`;
      values.push(date_to);
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);
    paramCount++;
    const limitClause = `LIMIT $${paramCount}`;
    values.push(parseInt(limit));
    
    paramCount++;
    const offsetClause = `OFFSET $${paramCount}`;
    values.push(offset);

    const selectQuery = `
      SELECT 
        id,
        interaction_date,
        contact_name,
        contact_email,
        contact_phone,
        company_name,
        chat_summary,
        services_discussed,
        key_pain_points,
        call_to_action_offered,
        next_step,
        lead_qualification,
        created_at
      FROM chat_summaries 
      ${whereClause}
      ORDER BY created_at DESC
      ${limitClause} ${offsetClause}
    `;

    const result = await query(selectQuery, values);
    
    // Get total count for pagination
    const countQuery = `SELECT COUNT(*) FROM chat_summaries ${whereClause}`;
    const countResult = await query(countQuery, values.slice(0, -2)); // Remove limit and offset params
    const totalCount = parseInt(countResult.rows[0].count);

    // Parse JSON fields
    const summaries = result.rows.map(row => ({
      ...row,
      services_discussed: JSON.parse(row.services_discussed || '[]'),
      key_pain_points: JSON.parse(row.key_pain_points || '[]')
    }));

    res.json({
      summaries,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalCount,
        pages: Math.ceil(totalCount / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('❌ Error retrieving chat summaries:', error);
    res.status(500).json({
      error: 'Failed to retrieve chat summaries',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});



export { router as chatRoutes }; 