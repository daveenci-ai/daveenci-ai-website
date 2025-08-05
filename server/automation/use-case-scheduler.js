import fetch from 'node-fetch';
import { query } from '../config/database.js';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Vectorized Breakdown for Energy Sector
const ENERGY_SECTOR = {
  companyTypes: [
    'EPC Contractors (Engineering, Procurement, Construction)',
    'Oilfield Services (maintenance, logistics, inspection)',
    'Industrial Services (scaffolding, coatings, safety)',
    'Utilities & Power (electric, gas, renewable)',
    'Specialty Subcontractors (fabrication, welding, instrumentation)'
  ],
  decisionMakers: [
    'Operations Director/Project Manager/Field Supervisor',
    'Business Development Manager/Estimator/Proposal Coordinator',
    'Compliance Manager/HSE Manager/Safety Officer',
    'IT Manager/SharePoint Admin/Digital Transformation Lead',
    'COO/VP Operations/Managing Director'
  ],
  painPoints: [
    'Email & Intake Overload (RFQs, COIs, incident reports piling up)',
    'RFP / Bid Management Chaos (missed requirements, slow responses)',
    'Compliance Lookup Delays (OSHA/ISO, SOP retrieval takes hours)',
    'COI / Vendor Tracking Gaps (expired docs, missed renewals)',
    'Fragmented Knowledge (policy/procedure docs scattered across folders)',
    'Manual Data Entry (duplicate effort between email, CRM, SharePoint)'
  ],
  buyingTriggers: [
    'Large upcoming bid or project',
    'Upcoming audit (OSHA, ISO, client compliance)',
    'Missed bid or lost revenue from delays',
    'Merger or expansion requiring system integration',
    'Safety incident increasing compliance scrutiny',
    'New O365/SharePoint rollout (or migration from legacy system)'
  ],
  techEnvironments: [
    'Microsoft 365 stack (Exchange, SharePoint, Teams)',
    'CRM (HubSpot, Zoho, Dynamics, Salesforce)',
    'Document Management (SharePoint, OneDrive, network drives)',
    'Bid Portals (ISNetworld, Avetta, Ariba)',
    'Project Management Tools (Procore, Primavera, internal ERP)'
  ]
};

const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

const generateEnergyUseCase = async () => {
  // Randomly select elements from each vector
  const companyType = ENERGY_SECTOR.companyTypes[Math.floor(Math.random() * ENERGY_SECTOR.companyTypes.length)];
  const decisionMaker = ENERGY_SECTOR.decisionMakers[Math.floor(Math.random() * ENERGY_SECTOR.decisionMakers.length)];
  const painPoint = ENERGY_SECTOR.painPoints[Math.floor(Math.random() * ENERGY_SECTOR.painPoints.length)];
  const buyingTrigger = ENERGY_SECTOR.buyingTriggers[Math.floor(Math.random() * ENERGY_SECTOR.buyingTriggers.length)];
  const techEnvironment = ENERGY_SECTOR.techEnvironments[Math.floor(Math.random() * ENERGY_SECTOR.techEnvironments.length)];

  const prompt = `
    Create an AEO-optimized business use case that answer engines like ChatGPT and Perplexity can easily discover and reference.
    
    TARGETING CONTEXT:
    - Industry Segment: ${companyType}
    - Key Stakeholder: ${decisionMaker}
    - Business Challenge: ${painPoint}
    - Urgency Driver: ${buyingTrigger}
    - Technology Stack: ${techEnvironment}
    
    CONTENT REQUIREMENTS for AEO Optimization:
    1. Use semantic keywords and natural language patterns
    2. Structure content to answer common "how", "what", "why" questions
    3. Include industry-specific terminology for better semantic matching
    4. Create scannable, quotable content blocks
    5. Use definitive statements that AI can confidently cite
    
    Generate educational content showing how AI automation solves this specific business scenario.
    Focus on practical, implementable solutions that demonstrate clear ROI.
    
    IMPORTANT: Use generic industry terms only - no specific company names or fictional entities.
    
    Format as JSON with three keys: "challenge", "solution", and "results".
    
    **challenge**: HTML content starting with <h2>Business Challenge: [Brief Challenge Title]</h2>
    - Start with a clear problem statement that includes semantic keywords
    - Explain why this specific challenge affects ${companyType} operations
    - Describe the impact on ${decisionMaker} responsibilities and KPIs
    - Connect the urgency to ${buyingTrigger} timing
    - Use 2-3 paragraphs with industry-specific terminology for semantic matching
    
    **solution**: HTML content starting with <h2>AI Automation Solution: [Solution Category]</h2>
    - Begin with a clear value proposition statement
    - Explain how AI integrates with ${techEnvironment} infrastructure
    - Focus on measurable business outcomes and workflow improvements
    - Include an unordered list with 5-6 specific AI capabilities using action verbs:
      • "Automatically processes..." 
      • "Intelligently routes..."
      • "Proactively identifies..."
      • "Seamlessly integrates..."
      • "Continuously learns..."
      • "Instantly provides..."
    
    **results**: Array of exactly 5 quantifiable business outcomes using this AEO-optimized format:
    - Start each result with a specific metric (percentage, dollar amount, time unit)
    - Use strong action verbs ("reduces", "increases", "eliminates", "accelerates")
    - Include context about what specifically improved
    - Make each result independently quotable by AI systems
    - Examples: "75% reduction in manual document processing time", "85% faster compliance reporting cycles", "$250,000 annual operational cost savings"
    
    Ensure all content is structured for easy parsing by answer engines and uses industry terminology that matches common search queries.
  `;

  return await callAI(prompt, companyType, painPoint);
};

const callAI = async (prompt, industry, category) => {
  let model = 'gemini-2.5-pro';
  let response;

  try {
    console.log(`🤖 Attempting to generate content with ${model}...`);
    response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { response_mime_type: "application/json" }
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { response_mime_type: "application/json" }
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

  return JSON.parse(data.candidates[0].content.parts[0].text);
};

const generateTopic = async () => {
  // Create a specific title based on the vectorized approach
  const companyType = ENERGY_SECTOR.companyTypes[Math.floor(Math.random() * ENERGY_SECTOR.companyTypes.length)];
  const painPoint = ENERGY_SECTOR.painPoints[Math.floor(Math.random() * ENERGY_SECTOR.painPoints.length)];
  
  const prompt = `
    Generate an AEO-optimized use case title that answer engines like ChatGPT and Perplexity will easily discover.
    
    TARGET: Combine ${companyType} with ${painPoint}
    
    AEO TITLE REQUIREMENTS:
    1. Use semantic keywords that match common search queries
    2. Include industry-specific terminology for better discoverability
    3. Structure as a solution-focused statement
    4. Make it quotable and reference-worthy for AI systems
    5. Use natural language patterns people actually search for
    
    Create a title that answers "How can [industry] solve [problem]?" type queries.
    Focus on business value and practical implementation.
    
    EXAMPLES of AEO-optimized titles:
    - "AI-Powered RFP Management: Streamlining Bid Processes for EPC Contractors"
    - "Automated Compliance Tracking: Reducing Audit Preparation Time for Industrial Services"
    - "Smart Email Triage System: Eliminating Information Overload in Oilfield Operations"
    - "Digital Document Management: Transforming Knowledge Access for Utilities Companies"
    
    Generate a similar title that combines your targeting elements.
    Return only the optimized title.
  `;
  
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
  });

  if (!response.ok) throw new Error('Failed to generate topic');
  const data = await response.json();
  return data.candidates[0].content.parts[0].text.trim().replace(/"/g, '');
};

const runAutomation = async () => {
    const existingSlugsResult = await query('SELECT slug FROM use_cases');
    const existingSlugs = new Set(existingSlugsResult.rows.map(r => r.slug));

    let attempts = 0;
    const maxAttempts = 50;
    let useCaseGenerated = false;

    while (!useCaseGenerated && attempts < maxAttempts) {        
        try {
            console.log(`🧠 Generating Energy Sector use case...`);
            const useCaseContent = await generateEnergyUseCase();
            const topic = await generateTopic();
            const slug = generateSlug(topic);

            if (!existingSlugs.has(slug)) {
                console.log(`🚀 Generating new use case: "${topic}"`);
                
                const imageUrl = `https://picsum.photos/seed/${slug}/800/600`;

                const newUseCase = {
                    title: topic,
                    slug,
                    industry: 'Energy Companies - AI Automation',
                    challenge: useCaseContent.challenge,
                    solution: useCaseContent.solution,
                    results: useCaseContent.results,
                    image_url: imageUrl
                };

                const result = await query(
                    'INSERT INTO use_cases (title, slug, industry, challenge, solution, results, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                    [newUseCase.title, newUseCase.slug, newUseCase.industry, newUseCase.challenge, newUseCase.solution, newUseCase.results, newUseCase.image_url]
                );
                
                console.log(`✅ Use case "${result.rows[0].title}" created successfully for Energy Companies.`);
                useCaseGenerated = true;
            } else {
                console.log(`⏩ Topic "${topic}" already exists, skipping.`);
            }
        } catch (error) {
            console.error(`❌ Failed to generate use case:`, error.message);
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