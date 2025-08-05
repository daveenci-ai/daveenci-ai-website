import fetch from 'node-fetch';
import { query } from '../config/database.js';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const INDUSTRIES = ['Law Firms', 'Energy Companies', 'Healthcare Organizations', 'Manufacturing Companies', 'Financial Services', 'Real Estate Firms'];
const CATEGORIES = [
  'Process Automation',
  'CRM & Lead Management', 
  'Content Creation & Marketing',
  'AI Chatbots & Virtual Assistants',
  'Document Processing & Compliance',
  'Proposal & RFP Management',
  'Knowledge Management Systems',
  'Lead Scoring & Analytics',
  'Email & Calendar Automation',
  'Reporting & Business Intelligence',
  'Data Verification & Enrichment',
  'Workflow Integration',
  'Training & Change Management',
  'Customer Service Automation'
];

const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

const generateUseCase = async (industry, category, topic) => {

    const prompt = `
        Generate a hypothetical, educational business use case that shows how AI and automation can help ${industry} with ${category}. 
        This should be a relatable scenario that helps readers understand the potential applications, NOT a specific company case study.
        
        Focus on:
        - Common challenges that most businesses in this industry face
        - How AI/automation solutions can address these challenges  
        - Realistic benefits and outcomes that readers can envision for their own business
        - Educational value that helps people understand AI/automation capabilities
        
        Use generic terms like "a typical law firm", "most energy companies", "organizations in this sector" instead of specific company names.
        
        Format the output as a JSON object with three keys: "challenge", "solution", and "results".
        
        - "challenge": A string containing well-formatted HTML. Start with an <h2>Common Industry Challenge</h2> title. Follow with 2-3 detailed paragraphs (<p> tags) describing typical problems that businesses in this industry face. Focus on pain points that readers will recognize from their own experience.
        
        - "solution": A string containing well-formatted HTML. Start with an <h2>How AI & Automation Can Help</h2> title. Follow with 2-3 paragraphs explaining how AI/automation addresses these challenges. Then include an unordered list (<ul>) with 4-6 list items (<li>) detailing specific AI/automation features and capabilities.
        
        - "results": An array of exactly 5 realistic, quantifiable outcomes that businesses could expect. Each result MUST include specific metrics. Examples: "65% Reduction in Manual Processing Time", "250% Increase in Lead Response Speed", "$180,000 Annual Labor Cost Savings", "85% Improvement in Accuracy", "40% Faster Decision Making".
        
        CRITICAL: 
        - No specific company names or fictional company names
        - Use industry-generic language ("organizations", "firms", "companies")
        - Focus on educational value and relatability
        - Each result must contain specific metrics (percentages, dollar amounts, time savings)
        - Ensure all HTML is clean and valid
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
        industry: `${industry} - ${category}`,
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
    Generate a compelling, educational use case title that shows how ${category} can help ${industry}.
    The title should be professional, clear, and focus on the business value/solution.
    Do not use specific company names - keep it generic and educational.
    Return only the title as a single string.

    Examples: 
    - "Automated Document Review for Legal Practice Efficiency"
    - "AI-Powered Lead Scoring for Energy Sector Sales Teams"
    - "Intelligent Customer Service Automation for Healthcare"
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