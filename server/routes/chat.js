import express from 'express';
import pool, { query } from '../config/database.js';
import { authenticateToken } from './auth.js';
import geminiService from '../services/geminiService.js';

const router = express.Router();

// Health check for Gemini service
router.get('/gemini-status', (req, res) => {
  const status = geminiService.getStatus();
  res.json({
    ...status,
    timestamp: new Date().toISOString(),
    message: status.available ? 'Gemini 2.5 Pro is ready' : 'Gemini API key required'
  });
});

// Phase 2: LLM Response Generation
router.post('/llm-response', async (req, res) => {
  try {
    const { prompt, context } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: 'Prompt is required'
      });
    }

    // Check if Gemini service is available
    if (!geminiService.isAvailable()) {
      console.warn('⚠️ Gemini API not configured, using fallback response');
      return res.json({
        response: "I understand your question. To provide you with the best assistance, our team will be happy to help you directly. Would you like to schedule a consultation?",
        confidence: 0.5,
        reasoning: "Gemini API not configured - using fallback response",
        suggestedActions: ["Schedule a consultation", "Contact our team"],
        fallbackUsed: true
      });
    }

    console.log('🤖 Calling Gemini 2.5 Pro API:', {
      promptLength: prompt.length,
      sessionId: context?.sessionId,
      stage: context?.stage,
      model: context?.model || 'gemini-2.5-pro',
      temperature: context?.temperature || 0.7,
      maxTokens: context?.maxTokens || 500
    });

    try {
      // Call actual Gemini 2.5 Pro API
      const geminiResponse = await geminiService.generateResponse(prompt, {
        temperature: context?.temperature || 0.7,
        maxTokens: context?.maxTokens || 500
      });

      console.log('✅ Gemini 2.5 Pro response generated successfully');

      res.json({
        response: geminiResponse.response,
        confidence: geminiResponse.confidence,
        reasoning: geminiResponse.reasoning,
        suggestedActions: geminiResponse.suggestedActions,
        metadata: geminiResponse.metadata
      });

    } catch (error) {
      console.error('❌ Gemini API call failed:', error.message);
      
      // Return fallback response with error info
      res.json({
        response: "I apologize, but I'm having trouble accessing my AI capabilities right now. Let me connect you with our team who can provide immediate assistance. What specific questions do you have about our services?",
        confidence: 0.4,
        reasoning: `Gemini API error: ${error.message}`,
        suggestedActions: ["Schedule a consultation", "Contact our team directly"],
        fallbackUsed: true,
        error: process.env.NODE_ENV === 'development' ? error.message : 'AI service temporarily unavailable'
      });
    }
  } catch (error) {
    console.error('❌ LLM Response generation failed:', error);
    res.status(500).json({
      error: 'Failed to generate LLM response',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Phase 2: Store conversation context
router.post('/context', async (req, res) => {
  try {
    const { sessionId, context } = req.body;

    if (!sessionId || !context) {
      return res.status(400).json({
        error: 'SessionId and context are required'
      });
    }

    console.log('💾 Storing conversation context:', {
      sessionId,
      userInfo: context.userInfo,
      stage: context.conversationStage,
      messageCount: context.messageCount
    });

    // Store context in database
    const insertQuery = `
      INSERT INTO conversation_contexts (
        session_id,
        user_info,
        conversation_stage,
        services_discussed,
        pain_points,
        last_interaction,
        message_count,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      ON CONFLICT (session_id) 
      DO UPDATE SET
        user_info = EXCLUDED.user_info,
        conversation_stage = EXCLUDED.conversation_stage,
        services_discussed = EXCLUDED.services_discussed,
        pain_points = EXCLUDED.pain_points,
        last_interaction = EXCLUDED.last_interaction,
        message_count = EXCLUDED.message_count,
        updated_at = NOW()
      RETURNING id
    `;

    const values = [
      sessionId,
      JSON.stringify(context.userInfo || {}),
      context.conversationStage || 'greeting',
      JSON.stringify(context.servicesDiscussed || []),
      JSON.stringify(context.painPoints || []),
      context.lastInteraction || new Date().toISOString(),
      context.messageCount || 0
    ];

    const result = await query(insertQuery, values);
    const contextId = result.rows[0]?.id;

    res.json({
      success: true,
      message: 'Conversation context stored successfully',
      id: contextId
    });

  } catch (error) {
    console.error('❌ Error storing conversation context:', error);
    res.status(500).json({
      error: 'Failed to store conversation context',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Phase 2: Retrieve conversation context
router.get('/context/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;

    const selectQuery = `
      SELECT user_info, conversation_stage, services_discussed, pain_points, 
             last_interaction, message_count, created_at, updated_at
      FROM conversation_contexts
      WHERE session_id = $1
    `;

    const result = await query(selectQuery, [sessionId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Conversation context not found'
      });
    }

    const context = result.rows[0];
    res.json({
      userInfo: context.user_info,
      conversationStage: context.conversation_stage,
      servicesDiscussed: context.services_discussed,
      painPoints: context.pain_points,
      lastInteraction: context.last_interaction,
      messageCount: context.message_count,
      createdAt: context.created_at,
      updatedAt: context.updated_at
    });

  } catch (error) {
    console.error('❌ Error retrieving conversation context:', error);
    res.status(500).json({
      error: 'Failed to retrieve conversation context',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

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
router.get('/summaries', authenticateToken, async (req, res) => {
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