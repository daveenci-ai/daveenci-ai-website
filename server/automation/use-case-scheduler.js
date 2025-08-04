import fetch from 'node-fetch';
import { query } from '../config/database.js';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const INDUSTRIES = ['Law Firm', 'Energy Sector'];
const CATEGORIES = [
  'Automation',
  'CRM',
  'Content Creation',
  'AI Avatars',
  'Document Processing & Compliance',
  'RFP & Proposal Management',
  'Knowledge Management (RAG Systems)',
  'Lead & Matter Scoring',
  'Email & Calendar Triage',
  'Reporting & Analytics Dashboards',
  'Data Enrichment & Verification',
  'Workflow Integration (MS 365, SharePoint, Teams)',
  'Training & Change Management',
  'AI Chatbots & Self-Service Portals'
];

const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

const generateUseCase = async (industry, category, topic) => {

    const prompt = `
        Generate a detailed and compelling business use case for a fictional company in the ${industry} on the topic of "${topic}".
        The tone should be professional, informative, and persuasive, showcasing the transformative impact of the solution.
        Create a realistic scenario that demonstrates measurable business value and ROI.
        
        Format the output as a JSON object with four keys: "clientProfile", "challenge", "solution", and "results".
        
        - "clientProfile": An object with "name", "industry", and a short "description" of the fictional client.
        - "challenge": A string containing well-formatted HTML. Start with an <h2>The Challenge</h2> title. Follow with 2-3 detailed paragraphs (<p> tags) that vividly describe the business problems and pain points. Include specific challenges like inefficiencies, costs, time waste, or missed opportunities.
        - "solution": A string containing well-formatted HTML. Start with an <h2>Our Solution</h2> title. Follow with 2-3 paragraphs describing the implemented solution in detail. Then, include an unordered list (<ul>) with 4-6 list items (<li>) detailing the key technologies, features, or implementation steps taken.
        - "results": An array of exactly 5 short, quantifiable, and impressive KPI-driven outcomes. Each result MUST include specific numbers and percentages. Examples: "75% Reduction in Processing Time", "300% Increase in Lead Conversion", "$450,000 Annual Cost Savings", "90% Improvement in Customer Satisfaction", "50% Faster Time-to-Market".
        
        CRITICAL: Each result in the "results" array must contain specific metrics (percentages, dollar amounts, or multipliers like "3x faster").
        Ensure all HTML is clean, valid, and ready to be rendered. Do not include the main use case title in the JSON content.
    `;

    let model = 'gemini-2.5-pro';
    let response;

    try {
      console.log(`🤖 Attempting to generate content with ${model}...`);
      response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                  response_mime_type: "application/json",
              }
          })
      });

      if (!response.ok) {
        throw new Error(`Primary model (${model}) failed with status: ${response.status}`);
      }

    } catch (error) {
      console.warn(`⚠️ Primary model failed: ${error.message}. Falling back to flash model.`);
      model = 'gemini-2.5-flash';
      response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                response_mime_type: "application/json",
            }
        })
      });
    }

    if (!response.ok) {
        throw new Error(`Gemini API error with fallback model ${model}: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts[0]) {
      console.error('❌ Invalid response structure from Gemini API:', data);
      throw new Error('Invalid or empty response from Gemini API.');
    }

    const useCaseContent = JSON.parse(data.candidates[0].content.parts[0].text);

    const slug = generateSlug(topic);
    const imageUrl = `https://picsum.photos/seed/${slug}/800/600`;

    const newUseCase = {
        title: topic,
        slug,
        industry: `${useCaseContent.clientProfile.name} - ${category}`,
        challenge: useCaseContent.challenge,
        solution: useCaseContent.solution,
        results: useCaseContent.results,
        image_url: imageUrl
    };

    try {
        const result = await query(
            'INSERT INTO use_cases (title, slug, industry, challenge, solution, results, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [newUseCase.title, newUseCase.slug, newUseCase.industry, newUseCase.challenge, newUseCase.solution, newUseCase.results, newUseCase.image_url]
        );
        console.log(`✅ Use case "${result.rows[0].title}" created successfully for ${industry} - ${category}.`);
    } catch (err) {
        console.error(`❌ Error creating use case for ${industry} - ${category}:`, err);
    }
};

const generateTopic = async (industry, category) => {
  const prompt = `
    Generate a compelling, specific use case title for a ${industry} using ${category}.
    The title should be concise, professional, and results-oriented.
    Do not use placeholders like [Company Name] or [Product].
    Return only the title as a single string.

    Example: "AI-Powered Contract Analysis for Corporate Law Firms"
  `;
  
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
  });

  if (!response.ok) throw new Error('Failed to generate topic');

  const data = await response.json();
  return data.candidates[0].content.parts[0].text.trim().replace(/"/g, '');
}

const runAutomation = async () => {
    const existingSlugsResult = await query('SELECT slug FROM use_cases');
    const existingSlugs = new Set(existingSlugsResult.rows.map(r => r.slug));

    let attempts = 0;
    const maxAttempts = (INDUSTRIES.length * CATEGORIES.length) * 2;

    let useCaseGenerated = false;

    while (!useCaseGenerated && attempts < maxAttempts) {
        const industry = INDUSTRIES[Math.floor(Math.random() * INDUSTRIES.length)];
        const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];

        try {
            console.log(`🧠 Generating a topic for ${industry} and ${category}...`);
            const topic = await generateTopic(industry, category);
            const slug = generateSlug(topic);

            if (!existingSlugs.has(slug)) {
                console.log(`🚀 Generating new use case: "${topic}"`);
                await generateUseCase(industry, category, topic);
                useCaseGenerated = true;
            } else {
                console.log(`⏩ Topic "${topic}" already exists, skipping.`);
            }
        } catch (error) {
            console.error(`❌ Failed to generate topic or use case for ${industry}/${category}:`, error.message);
        }

        attempts++;
    }

    if (!useCaseGenerated) {
        console.warn(`⚠️ Could not generate a unique use case after ${maxAttempts} attempts.`);
    }
};

// Only run automation if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    runAutomation();
}

export { runAutomation }; 