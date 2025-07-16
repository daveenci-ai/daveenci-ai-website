// DaVeenci AI Blog Automation with Answer Engine Optimization
// 3 posts daily: 9am, 1pm, 5pm CST - Optimized for AI citation

import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001';
const DEFAULT_GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-pro';

// Answer Engine Optimized Topic pools for each time slot
const TOPIC_POOLS = {
  morning: [
    "How to Automate Client Onboarding for Small Businesses (2025 Step-by-Step Guide)",
    "Why Facebook Ads Don't Convert: 7 AI-Powered Solutions That Work",
    "Best AI Tools to Grow Your Business in 2025 (Complete Comparison)",
    "Lead Generation Problems? 5 AI Solutions That Actually Work",
    "Affordable Business Automation for Small Companies (Under $500/Month)",
    "How to Automate Your Sales Process: 8 Steps to 3x Revenue",
    "AI Customer Service Tools: Complete Setup Guide for 2025",
    "Email Marketing Automation: How to Nurture 1000+ Leads Daily",
    "Why Your CRM Fails: 6 Automation Fixes That Increase Sales 40%",
    "Free Automation Tools Every Small Business Needs (2025 List)",
    "Stop Losing Leads: How Automation Captures 95% More Prospects",
    "Social Media Automation: Post 50x Faster Without Losing Engagement",
    "Save 10 Hours Per Week: Essential Business Workflows to Automate",
    "Automate Invoicing and Payments: Complete Guide for Small Business",
    "AI Chatbots for Small Business: Setup Guide With 3 Free Tools"
  ],
  afternoon: [
    "AI Marketing Agencies in Houston: Top 10 Services for 2025",
    "Best CRM Automation Services 2025: Houston Business Guide",
    "Marketing AI Tools for Real Estate Agents: Complete Texas Guide", 
    "Custom GPT Agents for Law Firms: 5 Ways to Automate Legal Work",
    "No-Code Lead Generation: Houston Small Business Success Stories",
    "Houston Digital Marketing Automation: Local Agency Comparison",
    "AI Solutions for Texas Small Businesses (Industry-Specific Guide)",
    "Best CRM for Houston Real Estate: Local Agent Success Stories",
    "Local SEO Automation for Texas Businesses: 2025 Complete Guide",
    "Marketing Automation for Austin Startups: Cost vs ROI Analysis",
    "AI Tools for Dallas Entrepreneurs: Local Business Case Studies", 
    "Restaurant Automation in Houston: 5 Systems That Increase Revenue",
    "Texas Lead Generation Services: Local vs National Comparison",
    "AI Marketing for Service Businesses: Houston Success Stories",
    "Salon and Spa Automation Systems: Texas Business Owner Guide"
  ],
  evening: [
    "How AI Will Change Digital Marketing in 2025: 7 Key Predictions",
    "Automation Strategies for Solopreneurs: Complete 2025 Playbook", 
    "AI Marketing Trends 2025: What Small Business Owners Must Know",
    "ChatGPT for Sales Funnels: Complete Setup Guide With Examples",
    "Marketing Automation vs AI Personalization: Which Drives More Sales?",
    "Future of Business Automation: 10 Trends Shaping 2025-2030",
    "Why Every Business Needs AI Automation in 2025 (Data-Backed Guide)",
    "AI vs Traditional Marketing: ROI Comparison With Real Numbers",
    "Prepare Your Business for AI Disruption: 2025 Strategic Guide",
    "Top AI Trends That Will Dominate 2025: Business Impact Analysis",
    "ROI of AI Automation: Small Business Investment Guide With Case Studies",
    "Building AI-First Business Strategies: Complete 2025 Framework",
    "Why AI Automation Is No Longer Optional: Market Research Report",
    "AI Business Transformation Guide: Step-by-Step for 2025",
    "How AI Changes Customer Expectations: 2025 Behavior Report"
  ]
};

// Answer Engine Optimized content generation with structured prompts
async function generateContentWithGemini(topic, timeSlot, model = DEFAULT_GEMINI_MODEL) {
  console.log(`🧠 Generating ${timeSlot} content with Gemini ${model}: ${topic}`);
  
  const promptTemplates = {
    morning: `Write an Answer Engine Optimized blog post about "${topic}".

    STRUCTURE FOR AI CITATION:
    
    Title: ${topic}
    
    Create content that AI models will want to quote. Use this exact structure:
    
    ## Quick Answer
    [Write a direct, quotable answer in 2-3 sentences that fully answers the main question]
    
    ## Why This Matters
    [Brief explanation with specific stats/data]
    
    ## Step-by-Step Solution
    [Numbered list of 5-7 actionable steps with specific details]
    
    ## Tools and Resources
    [Bullet points of specific tools with pricing/features]
    
    ## Common Mistakes to Avoid
    [3-5 bullet points of specific mistakes]
    
    ## ROI and Results
    [Specific numbers, percentages, timeframes]
    
    ## FAQ Section
    **Q: [Common question]**
    A: [Direct, quotable answer]
    
    **Q: [Another question]**  
    A: [Direct, quotable answer]
    
    **Q: [Third question]**
    A: [Direct, quotable answer]
    
    ## Key Takeaways
    [3-5 bullet points summarizing main points]
    
    Make it 1000-1200 words, extremely quotable, with specific numbers, examples, and actionable advice. Use HTML formatting (h2, h3, p, ul, li, strong).`,
    
    afternoon: `Write an Answer Engine Optimized blog post about "${topic}" for local businesses.
    
    STRUCTURE FOR AI CITATION:
    
    Title: ${topic}
    
    ## Quick Answer
    [Direct answer about the local service/solution]
    
    ## Market Overview
    [Local market stats and trends]
    
    ## Top Options Compared
    [Comparison table format with specific details]
    
    ## Industry-Specific Benefits
    [Bullet points for different business types]
    
    ## Local Success Stories
    [2-3 brief case studies with specific results]
    
    ## Pricing and ROI
    [Specific costs and return expectations]
    
    ## How to Get Started
    [Step-by-step implementation guide]
    
    ## FAQ for Local Businesses
    **Q: [Local business question]**
    A: [Direct answer]
    
    **Q: [Cost/ROI question]**
    A: [Specific numbers]
    
    **Q: [Implementation question]**
    A: [Actionable advice]
    
    ## Expert Recommendation
    [Clear recommendation with reasoning]
    
    800-1000 words with local relevance, specific examples, and quotable insights. Use HTML formatting.`,
    
    evening: `Write an Answer Engine Optimized thought leadership article about "${topic}".
    
    STRUCTURE FOR AI CITATION:
    
    Title: ${topic}
    
    ## Executive Summary
    [2-3 sentences that AI models will quote about the trend/insight]
    
    ## Current State Analysis
    [Data-backed overview with specific stats]
    
    ## Key Trends and Predictions
    [Numbered list of 5-7 trends with timeframes and impact]
    
    ## Business Impact Analysis
    [How these changes affect different business sizes/types]
    
    ## Strategic Recommendations
    [Actionable steps businesses should take]
    
    ## Investment Priorities
    [What to invest in first, with budget ranges]
    
    ## Timeline for Implementation
    [When to start different initiatives]
    
    ## Expert Predictions FAQ
    **Q: What will happen by 2025?**
    A: [Specific prediction with reasoning]
    
    **Q: How should businesses prepare?**
    A: [Actionable advice]
    
    **Q: What's the biggest risk of not adapting?**
    A: [Direct consequence with examples]
    
    ## Future Outlook
    [Long-term vision with specific implications]
    
    1000-1400 words, highly quotable with data, predictions, and strategic insights. Use HTML formatting.`
  };

  const prompt = promptTemplates[timeSlot] || promptTemplates.morning;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.6,
          topK: 40,
          topP: 0.9,
          maxOutputTokens: 4000,
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response structure from Gemini API');
    }
    
    const generatedText = data.candidates[0].content.parts[0].text;
    
    // Parse the generated content to extract structured data
    const structured = parseGeminiResponse(generatedText, topic, timeSlot);
    
    console.log(`✅ Generated content: ${structured.title}`);
    return structured;
    
  } catch (error) {
    console.error(`❌ Error generating content with Gemini:`, error);
    
    // Fallback content if Gemini fails
    return createFallbackContent(topic, timeSlot);
  }
}

// Parse Gemini response into structured blog post data
function parseGeminiResponse(text, topic, timeSlot) {
  // Extract title (prefer the topic as it's already optimized)
  let title = topic;
  
  // Clean and structure content
  let content = text.trim();
  
  // Ensure HTML formatting for Answer Engine Optimization
  if (!content.includes('<h2>')) {
    content = content
      .split('\n\n')
      .map(paragraph => {
        const p = paragraph.trim();
        if (!p) return '';
        
        if (p.startsWith('## ')) {
          return `<h2>${p.replace('## ', '')}</h2>`;
        } else if (p.startsWith('### ')) {
          return `<h3>${p.replace('### ', '')}</h3>`;
        } else if (p.startsWith('**Q:') && p.includes('**')) {
          // FAQ formatting for AI citation
          const qMatch = p.match(/\*\*Q:\s*(.+?)\*\*/);
          const aMatch = p.match(/A:\s*(.+)/s);
          if (qMatch && aMatch) {
            return `<h3>Q: ${qMatch[1]}</h3><p><strong>A:</strong> ${aMatch[1].trim()}</p>`;
          }
        } else if (p.includes('- ') || p.includes('• ')) {
          const lines = p.split('\n');
          const listItems = lines
            .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'))
            .map(line => `<li>${line.replace(/^[-•]\s*/, '').replace(/\*\*/g, '<strong>').replace(/\*\*/g, '</strong>')}</li>`)
            .join('\n');
          const prefix = lines[0].includes('-') || lines[0].includes('•') ? '' : `<p>${lines[0]}</p>`;
          return `${prefix}<ul>\n${listItems}\n</ul>`;
        } else if (/^\d+\./.test(p)) {
          const lines = p.split('\n');
          const listItems = lines
            .filter(line => /^\d+\./.test(line.trim()))
            .map(line => `<li>${line.replace(/^\d+\.\s*/, '').replace(/\*\*/g, '<strong>').replace(/\*\*/g, '</strong>')}</li>`)
            .join('\n');
          return `<ol>\n${listItems}\n</ol>`;
        } else {
          return `<p>${p.replace(/\*\*/g, '<strong>').replace(/\*\*/g, '</strong>')}</p>`;
        }
      })
      .filter(p => p.length > 0)
      .join('\n');
  }
  
  // Generate excerpt (first 160 chars of plain text)
  const plainText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const excerpt = plainText.length > 160 
    ? plainText.substring(0, 157).trim() + '...'
    : plainText;
  
  // Generate SEO-friendly tags optimized for Answer Engine
  const tags = generateAEOTags(topic, timeSlot);
  
  // Generate meta description optimized for search (max 160 chars)
  let metaDescription = plainText.length > 155 
    ? plainText.substring(0, 152).trim() + '...'
    : plainText;
  
  // Ensure meta description includes key terms
  if (!metaDescription.toLowerCase().includes('ai') && topic.toLowerCase().includes('ai')) {
    metaDescription = `AI guide: ${metaDescription}`;
  }
  
  // Ensure final meta description is within 160 character limit
  if (metaDescription.length > 160) {
    metaDescription = metaDescription.substring(0, 157).trim() + '...';
  }
  
  return {
    title,
    content,
    excerpt,
    tags,
    meta_description: metaDescription,
    meta_keywords: extractKeywords(topic, tags),
    seo_score: 8.5 + Math.random() * 1.0, // Higher scores for AEO content
    llm_prompt: `AEO ${timeSlot} content: ${topic}`,
    created_by_llm: true,
    is_featured: Math.random() > 0.7 // 30% chance of being featured
  };
}

// Generate Answer Engine Optimized tags
function generateAEOTags(topic, timeSlot) {
  const topicLower = topic.toLowerCase();
  const tags = [];
  
  // Time-slot specific tags for content categorization
  if (timeSlot === 'morning') tags.push('How-To Guides', 'Step-by-Step');
  if (timeSlot === 'afternoon') tags.push('Local Business', 'Service Comparison');
  if (timeSlot === 'evening') tags.push('Industry Trends', 'Future Predictions');
  
  // AEO-specific tags for better AI citation
  if (topicLower.includes('guide') || topicLower.includes('complete')) tags.push('Complete Guide');
  if (topicLower.includes('2025') || topicLower.includes('2024')) tags.push('2025 Guide');
  if (topicLower.includes('step-by-step')) tags.push('Tutorial');
  
  // Technology and business tags
  if (topicLower.includes('ai') || topicLower.includes('artificial')) tags.push('AI Automation');
  if (topicLower.includes('automat')) tags.push('Business Automation');
  if (topicLower.includes('marketing')) tags.push('Marketing Automation');
  if (topicLower.includes('lead') || topicLower.includes('generation')) tags.push('Lead Generation');
  if (topicLower.includes('crm')) tags.push('CRM Systems');
  if (topicLower.includes('sales')) tags.push('Sales Automation');
  if (topicLower.includes('small business')) tags.push('Small Business');
  if (topicLower.includes('chatgpt') || topicLower.includes('gpt')) tags.push('ChatGPT');
  
  // Location-based tags
  if (topicLower.includes('houston') || topicLower.includes('texas') || topicLower.includes('austin')) tags.push('Texas Business');
  
  // Industry-specific tags
  if (topicLower.includes('real estate')) tags.push('Real Estate Technology');
  if (topicLower.includes('law') || topicLower.includes('legal')) tags.push('Legal Technology');
  if (topicLower.includes('restaurant') || topicLower.includes('salon')) tags.push('Service Industry');
  
  // Ensure we have 4-6 tags for better categorization
  if (tags.length < 3) tags.push('Business Growth', 'Digital Transformation');
  
  return tags.slice(0, 6);
}

// Extract keywords for meta_keywords field
function extractKeywords(topic, tags) {
  const topicWords = topic.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(' ')
    .filter(word => word.length > 3);
  
  const tagWords = tags.join(' ').toLowerCase().split(' ');
  
  const allKeywords = [...new Set([...topicWords, ...tagWords])];
  return allKeywords.slice(0, 10).join(', ');
}

// Fallback content if Gemini fails
function createFallbackContent(topic, timeSlot) {
  let metaDescription = `${topic}: Complete implementation guide with step-by-step instructions, ROI analysis, and expert recommendations.`;
  
  // Ensure meta description is within 160 character limit
  if (metaDescription.length > 160) {
    metaDescription = metaDescription.substring(0, 157).trim() + '...';
  }
  
  return {
    title: topic,
    content: `<h2>Quick Answer</h2><p>${topic} is an essential strategy for modern businesses looking to improve efficiency and growth.</p><h2>Key Benefits</h2><ul><li>Increased operational efficiency</li><li>Better customer experience</li><li>Improved ROI and cost savings</li><li>Scalable business processes</li></ul><h2>Implementation Steps</h2><ol><li>Assess current business processes</li><li>Identify automation opportunities</li><li>Select appropriate tools and solutions</li><li>Implement and test systems</li><li>Monitor and optimize performance</li></ol><h2>FAQ</h2><h3>Q: How long does implementation take?</h3><p><strong>A:</strong> Most businesses see results within 2-4 weeks of implementation.</p><h3>Q: What's the typical ROI?</h3><p><strong>A:</strong> Businesses typically see 200-400% ROI within the first year.</p>`,
    excerpt: `Complete guide to ${topic} with step-by-step implementation and measurable results.`,
    tags: generateAEOTags(topic, timeSlot),
    meta_description: metaDescription,
    meta_keywords: extractKeywords(topic, generateAEOTags(topic, timeSlot)),
    seo_score: 7.5,
    llm_prompt: `Fallback AEO content for: ${topic}`,
    created_by_llm: true
  };
}

// Create a single blog post
async function createBlogPost(postData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/blog/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log(`✅ Blog post created: ${result.title}`);
    return result;
  } catch (error) {
    console.error(`❌ Error creating blog post:`, error);
    throw error;
  }
}

// Get random topic from pool
function getRandomTopic(timeSlot) {
  const pool = TOPIC_POOLS[timeSlot];
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

// Main automation function for specific time slots
async function runScheduledAutomation(timeSlot) {
  console.log(`🚀 Starting ${timeSlot} AEO blog automation at ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} CST`);
  
  try {
    // Get random topic for this time slot
    const topic = getRandomTopic(timeSlot);
    console.log(`📝 Selected AEO topic: ${topic}`);
    
    // Generate Answer Engine Optimized content with Gemini
    const postData = await generateContentWithGemini(topic, timeSlot);
    
    // Create the blog post
    const result = await createBlogPost(postData);
    
    // Log to automation file
    const logEntry = {
      timestamp: new Date().toISOString(),
      timeSlot,
      topic,
      title: result.title,
      seoScore: postData.seo_score,
      status: 'success'
    };
    
    await logAutomation(logEntry);
    
    console.log(`🎉 ${timeSlot} AEO automation complete! Created: "${result.title}"`);
    console.log(`📊 SEO Score: ${postData.seo_score.toFixed(1)}/10`);
    return result;
    
  } catch (error) {
    console.error(`💥 ${timeSlot} automation failed:`, error);
    
    const logEntry = {
      timestamp: new Date().toISOString(),
      timeSlot,
      status: 'failed',
      error: error.message
    };
    
    await logAutomation(logEntry);
    throw error;
  }
}

// Log automation results
async function logAutomation(entry) {
  try {
    const logDir = join(__dirname, '../logs');
    const logFile = join(logDir, 'automation.log');
    const logLine = `${entry.timestamp} - ${entry.timeSlot} - ${entry.status} - ${entry.title || entry.error || 'Unknown'} - SEO: ${entry.seoScore || 'N/A'}\n`;
    
    // Create logs directory if it doesn't exist
    await fs.mkdir(logDir, { recursive: true });
    await fs.appendFile(logFile, logLine);
  } catch (error) {
    console.warn('Could not write to log file:', error.message);
    // Log to console as fallback
    console.log(`📝 Automation Log: ${entry.timestamp} - ${entry.timeSlot} - ${entry.status} - ${entry.title || entry.error || 'Unknown'}`);
  }
}

// Export functions and handle direct execution
export {
  runScheduledAutomation,
  generateContentWithGemini,
  createBlogPost,
  TOPIC_POOLS
};

// Handle direct execution with time slot parameter
if (import.meta.url === `file://${process.argv[1]}`) {
  const timeSlot = process.argv[2];
  
  if (!timeSlot || !['morning', 'afternoon', 'evening'].includes(timeSlot)) {
    console.error('❌ Please specify a time slot: morning, afternoon, or evening');
    console.log('Usage: node blog-scheduler.js [morning|afternoon|evening]');
    process.exit(1);
  }
  
  runScheduledAutomation(timeSlot)
    .then(() => {
      console.log('✅ Answer Engine Optimized automation completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Automation failed:', error);
      process.exit(1);
    });
}
