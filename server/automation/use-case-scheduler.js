import fetch from 'node-fetch';
import { query } from '../config/database.js';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const USE_CASE_CATEGORIES = [
  {
    name: 'Automation',
    topics: [
      "Automated Lead Nurturing for Sales Teams",
      "Streamlining Client Onboarding with Automation",
      "Workflow Automation for Creative Agencies",
      "Automating Financial Reporting for SMBs"
    ]
  },
  {
    name: 'CRM',
    topics: [
      "Integrating CRM with Marketing Automation Platforms",
      "Custom CRM Dashboards for Sales Analytics",
      "Automating Data Entry in CRM Systems",
      "Smart CRM for Personalized Customer Journeys"
    ]
  },
  {
    name: 'Content',
    topics: [
      "AI-Powered Content Generation for Blogs",
      "Automating Social Media Content Schedules",
      "Smart Blogging: From SEO Research to Publication",
      "Personalized Email Content at Scale"
    ]
  },
  {
    name: 'Avatars',
    topics: [
      "Creating AI Avatars for Customer Support",
      "Using AI Avatars for Corporate Training Videos",
      "Personalized Video Messaging with AI Avatars",
      "24/7 AI Sales Avatars for E-commerce Websites"
    ]
  }
];

const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

const generateUseCase = async (category) => {
    const topic = category.topics[Math.floor(Math.random() * category.topics.length)];

    const prompt = `
        Generate a detailed business use case on the topic of "${topic}".
        The use case should be from the perspective of a company that successfully implemented this solution.
        It must include a "Challenge" section describing the problem, a "Solution" section detailing how it was solved, and a "Results" section with 3-5 specific, quantifiable outcomes.
        Format the output as a JSON object with the following keys: "challenge", "solution", "results".
        The results should be an array of strings.
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
        industry: category.name, // Using category name as the 'industry'
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
        console.log(`✅ Use case "${result.rows[0].title}" created successfully.`);
    } catch (err) {
        console.error('❌ Error creating use case:', err);
    }
};

const runAutomation = async () => {
    // Get all existing slugs from the database to ensure uniqueness
    const existingSlugsResult = await query('SELECT slug FROM use_cases');
    const existingSlugs = new Set(existingSlugsResult.rows.map(r => r.slug));

    let attempts = 0;
    const maxAttempts = USE_CASE_CATEGORIES.length * 2; // Safety break

    const categoriesToPost = [];
    
    while (categoriesToPost.length < 2 && attempts < maxAttempts) {
        const randomCategory = USE_CASE_CATEGORIES[Math.floor(Math.random() * USE_CASE_CATEGORIES.length)];
        const randomTopic = randomCategory.topics[Math.floor(Math.random() * randomCategory.topics.length)];
        const slug = generateSlug(randomTopic);

        if (!existingSlugs.has(slug) && !categoriesToPost.find(c => c.name === randomCategory.name)) {
             categoriesToPost.push({ ...randomCategory, topics: [randomTopic] }); // Use the selected topic
        }
        attempts++;
    }

    if (categoriesToPost.length < 2) {
      console.warn("⚠️ Could not find two unique use cases to generate. Skipping.");
      return;
    }

    console.log(`🚀 Generating ${categoriesToPost.length} new use cases...`);
    for (const category of categoriesToPost) {
        await generateUseCase(category);
    }
};

// Only run automation if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    runAutomation();
}

export { runAutomation }; 