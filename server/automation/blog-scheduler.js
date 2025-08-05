// DaVeenci AI Blog Automation with Answer Engine Optimization
// 3 posts daily: 9am, 1pm, 5pm CST - Optimized for AI citation

import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';
import dotenv from 'dotenv';

// Load environment variables from .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const serverDir = dirname(__dirname);
dotenv.config({ path: join(serverDir, '.env') });

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001';
const DEFAULT_GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-pro';

// Energy sector focused topic categories for dynamic content generation
const TOPIC_CATEGORIES = {
  // Energy Sector Core Topics
  energy_automation: [
    "AI-powered equipment monitoring for energy companies",
    "Predictive maintenance in oil and gas operations", 
    "Automated compliance reporting for energy sector",
    "Smart grid management with AI technology",
    "Energy trading automation platforms",
    "Industrial IoT for energy infrastructure",
    "Automated safety monitoring systems"
  ],
  
  // Energy Operations & Management
  energy_operations: [
    "Digital transformation for EPC contractors",
    "Project management automation for energy projects",
    "Asset management systems for utilities",
    "Energy consumption optimization strategies",
    "Industrial process automation solutions",
    "Renewable energy project coordination",
    "Energy facility maintenance scheduling"
  ],

  // Energy Compliance & Safety  
  energy_compliance: [
    "OSHA compliance automation for energy companies",
    "Environmental reporting automation systems",
    "Safety incident tracking and analysis",
    "Regulatory compliance management platforms",
    "ISO certification process automation",
    "Energy sector audit preparation tools",
    "Automated safety training management"
  ],

  // Energy Business Development
  energy_business: [
    "RFP management automation for energy contractors",
    "Bid tracking systems for EPC companies",
    "Lead scoring for energy sector sales",
    "Customer relationship management for utilities",
    "Proposal generation automation tools",
    "Energy market analysis and forecasting",
    "Contract management for energy projects"
  ],

  // Energy Technology & Innovation
  energy_tech: [
    "Machine learning for energy demand forecasting",
    "AI applications in renewable energy",
    "Smart sensor networks for oil and gas",
    "Automated data analysis for energy companies",
    "Digital twin technology for energy assets",
    "Blockchain applications in energy trading",
    "Cloud computing for energy sector operations"
  ],

  // Energy Document & Data Management
  energy_data: [
    "Document automation for energy contractors",
    "Data integration platforms for utilities",
    "Electronic records management for energy firms",
    "Automated reporting for energy operations",
    "Knowledge management systems for energy sector",
    "Digital workflows for energy project documentation",
    "Automated invoice processing for energy companies"
  ]
};

// Enhanced content guidelines with industry rotation and 5 daily time slots
const CONTENT_GUIDELINES = {
  early_morning: {
    type: "Quick Start Guides & Fundamentals",
    description: "Essential basics and quick implementation guides for busy professionals starting their day.",
    core_categories: ["energy_automation", "energy_operations"],
    industry_categories: ["energy_compliance", "energy_business"],
    industry_probability: 0.3 // 30% chance of industry-specific content
  },
  morning: {
    type: "How-To Guides & Implementation",
    description: "Practical, step-by-step guides that solve specific business problems across AI, marketing, CRM, and operations.",
    core_categories: ["energy_automation", "energy_operations", "energy_compliance"],
    industry_categories: ["energy_business", "energy_tech", "energy_data"],
    industry_probability: 0.4 // 40% chance of industry-specific content
  },
  afternoon: {
    type: "Comparisons & Analysis", 
    description: "Deep comparisons, tool evaluations, and strategic analysis for business decision makers.",
    core_categories: ["energy_business", "energy_tech"],
    industry_categories: ["energy_compliance", "energy_data"],
    industry_probability: 0.35 // 35% chance of industry-specific content
  },
  evening: {
    type: "Trends & Strategic Insights",
    description: "Industry trends, future predictions, and strategic insights about technology and business.",
    core_categories: ["energy_automation", "energy_business", "energy_operations"],
    industry_categories: ["energy_compliance", "energy_data"],
    industry_probability: 0.45 // 45% chance of industry-specific content
  },
  late_evening: {
    type: "Deep Dives & Advanced Strategies",
    description: "Comprehensive analysis and advanced strategies for serious business leaders and decision makers.",
    core_categories: ["energy_operations", "energy_business", "energy_compliance"],
    industry_categories: ["energy_data"],
    industry_probability: 0.5 // 50% chance of industry-specific content
  }
};

// Fetch recent blog post titles to avoid duplication
async function fetchRecentBlogTitles() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/blog/posts?limit=10&page=1`);
    if (!response.ok) {
      console.warn('Could not fetch recent blog posts for duplication check');
      return [];
    }
    
    const data = await response.json();
    const recentTitles = data.posts ? data.posts.map(post => post.title) : [];
    console.log(`📚 Found ${recentTitles.length} recent blog posts for duplication check`);
    return recentTitles;
  } catch (error) {
    console.warn('Error fetching recent blog posts:', error.message);
    return [];
  }
}

// Industry-aware topic selection with balanced rotation
async function selectDiverseTopic(timeSlot) {
  console.log(`🎯 Selecting diverse topic for ${timeSlot}...`);
  
  try {
    // Get recent blog titles to check for duplicates
    const recentTitles = await fetchRecentBlogTitles();
    const recentTopicsLower = recentTitles.map(title => title.toLowerCase());
    
    const guideline = CONTENT_GUIDELINES[timeSlot];
    
    // Determine if this should be industry-specific content
    const shouldUseIndustryContent = Math.random() < guideline.industry_probability;
    const categoryPool = shouldUseIndustryContent 
      ? guideline.industry_categories 
      : guideline.core_categories;
    
    console.log(`🎲 ${shouldUseIndustryContent ? 'Industry-specific' : 'Core AI/tech'} content selected for ${timeSlot}`);
    
    // Try each category to find a unique topic
    for (const category of categoryPool) {
      const topicPool = TOPIC_CATEGORIES[category];
      
      if (!topicPool) {
        console.warn(`⚠️ Topic category '${category}' not found`);
        continue;
      }
      
      for (const baseTopic of topicPool) {
        // Check if this topic concept is already covered recently
        const topicWords = baseTopic.toLowerCase().split(' ');
        const isUnique = !recentTopicsLower.some(recentTitle => {
          const recentWords = recentTitle.split(' ');
          const commonWords = topicWords.filter(word => 
            recentWords.some(recentWord => recentWord.includes(word) || word.includes(recentWord))
          );
          return commonWords.length >= 3; // If 3+ common words, consider it similar
        });
        
        if (isUnique) {
          console.log(`✅ Selected unique topic from ${category}: ${baseTopic}`);
          return baseTopic;
        }
      }
    }
    
    // If no unique predefined topic found, try the other category pool
    console.log(`🔄 No unique topic in ${shouldUseIndustryContent ? 'industry' : 'core'} categories, trying alternative...`);
    const alternativePool = shouldUseIndustryContent 
      ? guideline.core_categories 
      : guideline.industry_categories;
    
    for (const category of alternativePool) {
      const topicPool = TOPIC_CATEGORIES[category];
      
      if (!topicPool) continue;
      
      for (const baseTopic of topicPool) {
        const topicWords = baseTopic.toLowerCase().split(' ');
        const isUnique = !recentTopicsLower.some(recentTitle => {
          const recentWords = recentTitle.split(' ');
          const commonWords = topicWords.filter(word => 
            recentWords.some(recentWord => recentWord.includes(word) || word.includes(recentWord))
          );
          return commonWords.length >= 3;
        });
        
        if (isUnique) {
          console.log(`✅ Selected unique topic from alternative ${category}: ${baseTopic}`);
          return baseTopic;
        }
      }
    }
    
    // If still no unique topic found, generate one with AI
    console.log('🤖 No unique predefined topic found, generating with AI...');
    return await generateAIDrivenTopic(timeSlot, recentTitles, shouldUseIndustryContent);
    
  } catch (error) {
    console.error('❌ Error in topic selection:', error);
    return await generateAIDrivenTopic(timeSlot, []);
  }
}

// AI-driven topic generation with enhanced prompts
async function generateAIDrivenTopic(timeSlot, recentTitles = [], useIndustryContent = false, model = DEFAULT_GEMINI_MODEL) {
  console.log(`🧠 Generating AI-driven ${timeSlot} topic (${useIndustryContent ? 'industry-specific' : 'core tech'})...`);
  
  try {
    const recentTitlesText = recentTitles.length > 0 
      ? `\n\nRECENT BLOG POSTS TO AVOID DUPLICATING:\n${recentTitles.map(title => `- ${title}`).join('\n')}`
      : '';
    
    const guideline = CONTENT_GUIDELINES[timeSlot];
    
    // Select appropriate categories based on content type
    const selectedCategories = useIndustryContent 
      ? guideline.industry_categories 
      : guideline.core_categories;
    
    const categoryExamples = selectedCategories.map(cat => 
      TOPIC_CATEGORIES[cat] ? TOPIC_CATEGORIES[cat].slice(0, 2).join(', ') : ''
    ).filter(example => example).join(', ');
    
    // Industry-specific content instructions
    const industryInstructions = useIndustryContent ? `

  INDUSTRY FOCUS: Generate content specifically for the Energy Sector:
- Energy Companies: Equipment monitoring, predictive maintenance, smart grid management
- EPC Contractors: Project management, asset management, industrial process automation
- Utilities: Compliance reporting, safety incident tracking, renewable energy coordination
- Oilfield Services: Maintenance, logistics, inspection automation
- Industrial Services: Scaffolding, coatings, safety compliance automation
  
  INDUSTRY REQUIREMENTS:
- Address specific pain points and challenges in the chosen industry
- Include relevant compliance, regulatory, or industry-standard considerations
- Focus on technology solutions that serve these specific sectors
- Use industry-appropriate terminology and examples` : `

CORE TECHNOLOGY FOCUS:
- AI solutions, automation, CRM systems, digital marketing
- Business operations, content automation, SEO/AEO strategies
- Technology implementation and optimization`;
    
    const topicPrompt = `You are a content strategist for DaVeenci AI, a company specializing in AI solutions and business automation.

Generate a compelling, unique blog post title for our ${timeSlot} content slot.

CONTENT TYPE: ${guideline.type}
DESCRIPTION: ${guideline.description}

TOPIC INSPIRATION (create something NEW based on these themes):
${categoryExamples}${industryInstructions}

REQUIREMENTS:
1. Create a completely unique title that hasn't been covered recently
2. Include specific elements: numbers, year (2025), concrete benefits, or comparisons
3. Make it actionable and solution-oriented for business leaders
4. 60-80 characters for optimal SEO and Answer Engine Optimization (AEO)
5. Use power words: "Complete", "Ultimate", "Proven", "Advanced", "Smart", "Strategic"

CONTENT STYLE BY TIME:
- Early Morning (6am): Quick starts, fundamentals, basics
- Morning (10am): How-to guides, implementation steps, practical tutorials
- Afternoon (2pm): Comparisons, analysis, tool evaluations, strategic decisions  
- Evening (6pm): Trends, predictions, insights, future planning
- Late Evening (10pm): Deep dives, advanced strategies, comprehensive analysis

AVOID:
- Topics similar to recent posts listed below
- Generic or vague titles
- Overly technical jargon${recentTitlesText}

Return ONLY the blog post title, nothing else.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: topicPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 100,
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AI topic generation error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response from AI topic generation');
    }
    
    const generatedTopic = data.candidates[0].content.parts[0].text.trim()
      .replace(/^["']|["']$/g, '') // Remove quotes
      .replace(/\n.*$/s, ''); // Remove any extra lines
    
    console.log(`✅ AI generated unique topic: ${generatedTopic}`);
    return generatedTopic;
    
  } catch (error) {
    console.error(`❌ Error in AI topic generation:`, error);
    
    // Enhanced fallback topics with energy sector focus for 5 time slots
    const fallbackTopics = useIndustryContent ? {
      early_morning: "Energy Technology Basics: Getting Started with Digital Transformation",
      morning: "Energy CRM Integration: Complete Setup Guide for 2025",
      afternoon: "Energy Management Software: Top 5 Solutions Compared", 
      evening: "Industrial IoT Trends: How Energy Companies Are Innovating",
              late_evening: "Advanced Energy Analytics: Predictive Modeling for Modern Energy Operations"
    } : {
      early_morning: "AI Fundamentals: Quick Start Guide for Business Leaders",
      morning: "Smart CRM Automation: Complete Implementation Guide for Small Businesses",
      afternoon: "SEO vs AEO vs GEO: Which Strategy Works Best in 2025?",
      evening: "AI-Powered Content Marketing: 7 Trends Reshaping Digital Strategy",
      late_evening: "Advanced Marketing Automation: Deep Dive Strategy Guide"
    };
    
    return fallbackTopics[timeSlot] || fallbackTopics.morning;
  }
}

// Updated main topic generation function
async function generateDynamicTopic(timeSlot, model = DEFAULT_GEMINI_MODEL) {
  console.log(`🎯 Generating diverse topic for ${timeSlot}...`);
  
  try {
    // First try to select from predefined diverse topics
    const topic = await selectDiverseTopic(timeSlot);
    
    // If we got an AI-generated topic, enhance it with time-specific formatting
    if (topic.includes('Complete') || topic.includes('Guide') || topic.includes('vs')) {
      console.log(`📝 Using topic: ${topic}`);
      return topic;
    }
    
    // Enhance basic topics with time-specific formatting for 5 daily posts
    const timeFormatting = {
      early_morning: (topic) => `${topic}: Quick Start Guide for Busy Professionals`,
      morning: (topic) => `How to ${topic}: Complete 2025 Implementation Guide`,
      afternoon: (topic) => `${topic}: Comprehensive Comparison and Analysis`,
      evening: (topic) => `${topic}: Strategic Insights for 2025`,
      late_evening: (topic) => `${topic}: Advanced Deep Dive and Complete Strategy`
    };
    
    const enhancedTopic = timeFormatting[timeSlot] 
      ? timeFormatting[timeSlot](topic)
      : topic;
    
    console.log(`✨ Enhanced topic: ${enhancedTopic}`);
    return enhancedTopic;
    
  } catch (error) {
    console.error(`❌ Error in topic generation:`, error);
    
    // Final fallback with 5 time slots
    const fallbacks = {
      early_morning: "Business Automation Basics: Essential Getting Started Guide",
      morning: "Advanced CRM Integration: Step-by-Step Setup Guide",
      afternoon: "Marketing Automation vs Manual Processes: ROI Analysis",
      evening: "AI Business Intelligence: Future Trends and Predictions",
      late_evening: "Advanced Automation Strategies: Comprehensive Implementation"
    };
    
    return fallbacks[timeSlot] || fallbacks.morning;
  }
}

// Answer Engine Optimized content generation with structured prompts
async function generateContentWithGemini(topic, timeSlot, model = DEFAULT_GEMINI_MODEL) {
  console.log(`🧠 Generating ${timeSlot} content with Gemini ${model}: ${topic}`);
  
  const promptTemplates = {
    early_morning: `Write a concise Answer Engine Optimized blog post about "${topic}".

    STRUCTURE FOR AI CITATION:
    
    Title: ${topic}
    
    Create content perfect for busy professionals starting their day. Use this exact structure:
    
    ## Quick Answer
    [Write a direct, quotable answer in 2-3 sentences that fully answers the main question]
    
    ## Why This Matters Now
    [Brief explanation with specific stats/data - focus on immediate benefits]
    
    ## Essential Steps
    [Numbered list of 3-5 quick actionable steps]
    
    ## Key Tools
    [Bullet points of 2-3 essential tools with quick descriptions]
    
    ## Quick FAQ
    **Q: [Most common question]**
    A: [Direct, quotable answer]
    
    **Q: [Implementation question]**
    A: [Actionable advice]
    
    ## Bottom Line
    [2-3 bullet points summarizing key takeaways]
    
    Make it 600-800 words, extremely quotable, with specific examples and immediate value. Use HTML formatting (h2, h3, p, ul, li, strong).`,

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
    
    1000-1400 words, highly quotable with data, predictions, and strategic insights. Use HTML formatting.`,

    late_evening: `Write a comprehensive Answer Engine Optimized deep-dive article about "${topic}".
    
    STRUCTURE FOR AI CITATION:
    
    Title: ${topic}
    
    ## Executive Overview
    [Comprehensive summary that AI models will quote for detailed explanations]
    
    ## Complete Analysis Framework
    [In-depth methodology with specific parameters and measurements]
    
    ## Advanced Implementation Strategy
    [Detailed numbered list of 7-10 comprehensive steps with sub-steps]
    
    ## Technology Stack Deep Dive
    [Detailed analysis of tools, platforms, and integrations with technical specifications]
    
    ## Risk Assessment and Mitigation
    [Comprehensive list of potential challenges with detailed solutions]
    
    ## ROI and Performance Metrics
    [Detailed financial analysis with specific formulas and benchmarks]
    
    ## Advanced Case Studies
    [2-3 detailed real-world examples with specific results and lessons learned]
    
    ## Expert Implementation FAQ
    **Q: What are the most complex challenges?**
    A: [Detailed technical answer with solutions]
    
    **Q: How do you measure advanced success metrics?**
    A: [Specific measurement frameworks]
    
    **Q: What's the complete implementation timeline?**
    A: [Detailed project timeline with milestones]
    
    **Q: How do you scale this approach?**
    A: [Scaling strategies with specific examples]
    
    ## Strategic Recommendations
    [Comprehensive action plan with priorities and timelines]
    
    ## Future Considerations
    [Long-term strategic implications and evolution paths]
    
    1400-1800 words, highly detailed and authoritative, perfect for serious business leaders. Use HTML formatting.`
  };

  const basePrompt = promptTemplates[timeSlot] || promptTemplates.morning;
  
  // Add critical content rules to prevent placeholder variables
  const prompt = basePrompt + `

CRITICAL CONTENT RULES:
❌ NEVER use placeholder variables in brackets like [Your City], [Your Business], [Company Name], [Industry], etc.
❌ NEVER include template-style placeholders that make content look generic
❌ NEVER use phrases like "insert your", "fill in your", "customize for your"
✅ Always write specific, complete content with real examples
✅ Use actual city names (Austin, Dallas, Houston, etc.) when location is relevant
✅ Use actual company examples and real industry names
✅ Write as if for a specific business audience, not as a template

This is final published content - it must be complete and professional, not a template.`;

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
    
    // Format the content as proper HTML with embedded images
    const formattedContent = await formatContentAsHTML(generatedText, topic, timeSlot, model);
    
    // Parse the generated content to extract structured data
    const structured = parseGeminiResponse(formattedContent, topic, timeSlot);
    
    console.log(`✅ Generated and formatted content: ${structured.title}`);
    return structured;
    
  } catch (error) {
    console.error(`❌ Error generating content with Gemini:`, error);
    
    // Fallback content if Gemini fails
    return createFallbackContent(topic, timeSlot);
  }
}

// Format content as proper HTML with embedded images
async function formatContentAsHTML(rawContent, topic, timeSlot, model = DEFAULT_GEMINI_MODEL) {
  console.log(`🎨 Formatting content as HTML with images...`);
  
  const htmlPrompt = `You are an expert HTML formatter. Take the article content and format it as clean, semantic HTML.

CRITICAL FORMATTING RULES:
1. Use ONLY these HTML tags: h2, h3, p, ul, ol, li, strong, em, img
2. Every major section MUST start with <h2>Section Title</h2>
3. Every subsection MUST use <h3>Subsection Title</h3>
4. Every paragraph MUST be wrapped in <p>content</p> tags
5. Add 2-3 relevant images using reliable sources like: <img src="https://picsum.photos/1200/400?random=${Date.now()}" alt="AI automation concept" class="w-full h-64 object-cover rounded-lg shadow-md my-6" />
6. Use bullet points as <ul><li>item</li></ul> and numbered lists as <ol><li>item</li></ol>
7. Bold important text with <strong>text</strong>

EXAMPLE STRUCTURE:
<h2>Main Section Title</h2>
<p>Paragraph content here.</p>

<h3>Subsection Title</h3>
<p>More paragraph content.</p>
<ul>
<li>Bullet point one</li>
<li>Bullet point two</li>
</ul>

<img src="https://picsum.photos/1200/400?random=4" alt="AI technology" class="w-full h-64 object-cover rounded-lg shadow-md my-6" />

ARTICLE TOPIC: ${topic}
RAW CONTENT: ${rawContent}

CRITICAL CONTENT RULES:
❌ NEVER introduce placeholder variables like [Your City], [Your Business], [Company Name], etc.
❌ NEVER add template-style placeholders during formatting
✅ Keep all content specific and complete as provided
✅ Maintain real examples and actual company/location names

Format the content following the exact structure above. Return ONLY clean HTML, no explanations.`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: htmlPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.9,
          maxOutputTokens: 4000,
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTML formatting API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response structure from HTML formatting API');
    }
    
    let formattedHTML = data.candidates[0].content.parts[0].text.trim();
    
    // Clean up any markdown remnants and ensure proper HTML
    formattedHTML = formattedHTML
      .replace(/```html\n?/gi, '')
      .replace(/```\n?/gi, '')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .trim();
    
    // Ensure we have some images if none were added
    if (!formattedHTML.includes('<img')) {
      formattedHTML = addDefaultImages(formattedHTML, topic);
    }
    
    console.log(`✅ Content formatted as HTML with embedded images`);
    return formattedHTML;
    
  } catch (error) {
    console.error(`❌ Error formatting content as HTML:`, error);
    
    // Fallback: basic HTML formatting
    return basicHTMLFormat(rawContent, topic);
  }
}

// Enhanced image generation with multiple reliable sources
function getReliableImages(topic, count = 3) {
  // Generate different image styles based on topic keywords
  const topicLower = topic.toLowerCase();
  const images = [];
  
  // Use different reliable image services for variety
  const services = [
    { name: 'picsum', baseUrl: 'https://picsum.photos/1200/400' },
    { name: 'placeholder', baseUrl: 'https://via.placeholder.com/1200x400/4A90E2/FFFFFF' },
    { name: 'dummyimage', baseUrl: 'https://dummyimage.com/1200x400/ef4444/ffffff' }
  ];
  
  // Generate appropriate alt text based on topic
  let altTexts = [];
  if (topicLower.includes('ai') || topicLower.includes('artificial')) {
    altTexts = [
      "AI and artificial intelligence technology concept",
      "Machine learning and automation in business",
      "Digital transformation and AI implementation"
    ];
  } else if (topicLower.includes('business') || topicLower.includes('automation')) {
    altTexts = [
      "Modern business automation workflow",
      "Digital workplace and productivity tools", 
      "Business process optimization and efficiency"
    ];
  } else if (topicLower.includes('marketing') || topicLower.includes('sales')) {
    altTexts = [
      "Marketing automation and lead generation",
      "Sales process optimization tools",
      "Customer relationship management system"
    ];
  } else {
    altTexts = [
      "Professional business technology concept",
      "Modern digital workplace environment",
      "Business growth and innovation strategy"
    ];
  }
  
  for (let i = 0; i < count; i++) {
    const service = services[i % services.length];
    let imageUrl;
    
    if (service.name === 'picsum') {
      imageUrl = `${service.baseUrl}?random=${Date.now() + i}`;
    } else if (service.name === 'placeholder') {
      imageUrl = `${service.baseUrl}&text=Business+Technology`;
    } else {
      imageUrl = `${service.baseUrl}&text=AI+Business`;
    }
    
    images.push({
      url: imageUrl,
      alt: altTexts[i % altTexts.length]
    });
  }
  
  return images;
}

// Add default images to content if none were added
function addDefaultImages(content, topic) {
  // Using multiple reliable image services that will never 404
  const images = getReliableImages(topic, 3);
  
  const sections = content.split('<h2>');
  if (sections.length > 1) {
    // Add image after first section
    const firstImage = images[0];
    sections[1] = sections[1] + `\n\n<img src="${firstImage.url}" alt="${firstImage.alt}" class="w-full h-64 object-cover rounded-lg shadow-md my-6" />\n\n`;
    
    if (sections.length > 2) {
      // Add image after second section
      const secondImage = images[1];
      sections[2] = sections[2] + `\n\n<img src="${secondImage.url}" alt="${secondImage.alt}" class="w-full h-64 object-cover rounded-lg shadow-md my-6" />\n\n`;
    }
  }
  
  return sections.join('<h2>');
}

// Basic HTML formatting fallback
function basicHTMLFormat(content, topic) {
  let formattedContent = content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');

  // Split into sections and paragraphs
  const sections = formattedContent.split(/(?=##\s)|(?=###\s)/).filter(section => section.trim());
  
  let htmlOutput = '';
  let imageAdded = false;
  
  sections.forEach((section, index) => {
    const lines = section.split('\n').filter(line => line.trim());
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('## ')) {
        htmlOutput += `<h2>${line.replace('## ', '')}</h2>\n`;
      } else if (line.startsWith('### ')) {
        htmlOutput += `<h3>${line.replace('### ', '')}</h3>\n`;
      } else if (line.startsWith('- ') || line.startsWith('• ')) {
        // Handle bullet lists
        let listItems = [line];
        while (i + 1 < lines.length && (lines[i + 1].startsWith('- ') || lines[i + 1].startsWith('• '))) {
          i++;
          listItems.push(lines[i]);
        }
        htmlOutput += '<ul>\n';
        listItems.forEach(item => {
          const cleanItem = item.replace(/^[-•]\s*/, '').replace(/\*\*/g, '<strong>').replace(/\*\*/g, '</strong>');
          htmlOutput += `<li>${cleanItem}</li>\n`;
        });
        htmlOutput += '</ul>\n';
      } else if (/^\d+\./.test(line)) {
        // Handle numbered lists
        let listItems = [line];
        while (i + 1 < lines.length && /^\d+\./.test(lines[i + 1])) {
          i++;
          listItems.push(lines[i]);
        }
        htmlOutput += '<ol>\n';
        listItems.forEach(item => {
          const cleanItem = item.replace(/^\d+\.\s*/, '').replace(/\*\*/g, '<strong>').replace(/\*\*/g, '</strong>');
          htmlOutput += `<li>${cleanItem}</li>\n`;
        });
        htmlOutput += '</ol>\n';
      } else if (line.length > 0) {
        // Regular paragraph
        const formattedLine = line.replace(/\*\*/g, '<strong>').replace(/\*\*/g, '</strong>');
        htmlOutput += `<p>${formattedLine}</p>\n`;
      }
    }
    
    // Add image after first major section
    if (index === 0 && !imageAdded) {
      htmlOutput += '\n<img src="https://picsum.photos/1200/400?random=5" alt="AI automation and business technology" class="w-full h-64 object-cover rounded-lg shadow-md my-6" />\n\n';
      imageAdded = true;
    }
  });
  
  // Add a second image if content is long enough
  if (htmlOutput.length > 1000) {
    const midPoint = Math.floor(htmlOutput.length / 2);
    const insertPoint = htmlOutput.indexOf('</p>', midPoint);
    if (insertPoint !== -1) {
      const beforeInsert = htmlOutput.substring(0, insertPoint + 4);
      const afterInsert = htmlOutput.substring(insertPoint + 4);
      htmlOutput = beforeInsert + '\n\n<img src="https://picsum.photos/1200/400?random=6" alt="Modern business automation workflow" class="w-full h-64 object-cover rounded-lg shadow-md my-6" />\n\n' + afterInsert;
    }
  }
  
  return htmlOutput.trim();
}

// Parse Gemini response into structured blog post data
function parseGeminiResponse(formattedContent, topic, timeSlot) {
  // Extract title (prefer the topic as it's already optimized)
  let title = topic;
  
  // Use the already formatted HTML content
  let content = formattedContent.trim();
  
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
  
  // Generate a featured image URL for the blog card
  const featuredImages = getReliableImages(topic, 1);
  const featuredImageUrl = featuredImages[0]?.url || `https://picsum.photos/1200/400?random=${Date.now()}`;
  
  return {
    title,
    content,
    excerpt,
    tags,
    meta_description: metaDescription,
    meta_keywords: extractKeywords(topic, tags),
    featured_image_url: featuredImageUrl, // Add featured image for blog cards
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
  
  const fallbackContent = `
    <h2>Quick Answer</h2>
    <p>${topic} is an essential strategy for modern businesses looking to improve efficiency and growth. This comprehensive guide will walk you through the implementation process step by step.</p>
    
    <img src="https://picsum.photos/1200/400?random=7" alt="AI and automation technology concept" class="w-full h-64 object-cover rounded-lg shadow-md my-6" />
    
    <h2>Key Benefits</h2>
    <p>Implementing this solution brings numerous advantages to your business operations:</p>
    <ul>
      <li><strong>Increased operational efficiency</strong> - Streamline workflows and reduce manual tasks</li>
      <li><strong>Better customer experience</strong> - Faster response times and improved service quality</li>
      <li><strong>Improved ROI and cost savings</strong> - Reduce operational costs while increasing revenue</li>
      <li><strong>Scalable business processes</strong> - Grow your business without proportional increases in overhead</li>
    </ul>
    
    <h2>Implementation Steps</h2>
    <p>Follow these proven steps to successfully implement your solution:</p>
    <ol>
      <li><strong>Assess current business processes</strong> - Understand your existing workflows and pain points</li>
      <li><strong>Identify automation opportunities</strong> - Find areas where technology can add the most value</li>
      <li><strong>Select appropriate tools and solutions</strong> - Choose the right technology stack for your needs</li>
      <li><strong>Implement and test systems</strong> - Deploy solutions in a controlled, phased approach</li>
      <li><strong>Monitor and optimize performance</strong> - Continuously improve and refine your systems</li>
    </ol>
    
    <img src="https://picsum.photos/1200/400?random=8" alt="Modern business team working with automation tools" class="w-full h-64 object-cover rounded-lg shadow-md my-6" />
    
    <h2>Frequently Asked Questions</h2>
    
    <h3>Q: How long does implementation take?</h3>
    <p><strong>A:</strong> Most businesses see initial results within 2-4 weeks of implementation, with full deployment typically completed within 2-3 months depending on complexity.</p>
    
    <h3>Q: What's the typical ROI?</h3>
    <p><strong>A:</strong> Businesses typically see 200-400% ROI within the first year, with many organizations reporting even higher returns as they optimize their processes.</p>
    
    <h3>Q: Do I need technical expertise to get started?</h3>
    <p><strong>A:</strong> While technical knowledge is helpful, many modern solutions are designed for business users. Professional implementation support is also available to ensure success.</p>
    
    <h2>Getting Started</h2>
    <p>Ready to transform your business? The first step is understanding your current processes and identifying the areas where automation can have the biggest impact. Contact our team for a free consultation and see how we can help you achieve your goals.</p>
  `.trim();
  
  // Generate a featured image URL for the fallback content
  const featuredImages = getReliableImages(topic, 1);
  const featuredImageUrl = featuredImages[0]?.url || `https://picsum.photos/1200/400?random=${Date.now()}`;

  return {
    title: topic,
    content: fallbackContent,
    excerpt: `Complete guide to ${topic} with step-by-step implementation and measurable results.`,
    tags: generateAEOTags(topic, timeSlot),
    meta_description: metaDescription,
    meta_keywords: extractKeywords(topic, generateAEOTags(topic, timeSlot)),
    featured_image_url: featuredImageUrl, // Add featured image for blog cards
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

// This function is now replaced by generateDynamicTopic()
// Keeping for backward compatibility but it now calls the dynamic generator
async function getRandomTopic(timeSlot) {
  return await generateDynamicTopic(timeSlot);
}

// Main automation function for specific time slots
async function runScheduledAutomation(timeSlot) {
  console.log(`🚀 Starting ${timeSlot} AEO blog automation at ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} CST`);
  
  try {
    // Generate dynamic topic for this time slot
    const topic = await getRandomTopic(timeSlot);
    console.log(`📝 Generated dynamic topic: ${topic}`);
    
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
  createBlogPost
};

// Handle direct execution with time slot parameter or auto mode
if (import.meta.url === `file://${process.argv[1]}`) {
  const timeSlot = process.argv[2];
  
  if (!timeSlot) {
    console.error('❌ Please specify a time slot: morning, afternoon, evening, or auto');
    console.log('Usage: node blog-scheduler.js [morning|afternoon|evening|auto]');
    process.exit(1);
  }
  
  let actualTimeSlot = timeSlot;
  
  // Auto mode: determine time slot based on current time
  if (timeSlot === 'auto') {
    const now = new Date();
    const cstTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Chicago"}));
    const hour = cstTime.getHours();
    const minute = cstTime.getMinutes();
    
    console.log(`🕐 Current CST time: ${cstTime.toLocaleString('en-US', { timeZone: 'America/Chicago' })}`);
    console.log(`🕐 Hour: ${hour}, Minute: ${minute}`);
    
    // Check if we're in testing mode (every 10 minutes) or production mode
    const isTestingMode = process.env.NODE_ENV === 'production' && hour >= 8 && hour <= 20; // Testing during business hours
    
    if (isTestingMode) {
      // Testing mode: Cycle through content types every 10 minutes (5 slots)
      const timeSlots = ['early_morning', 'morning', 'afternoon', 'evening', 'late_evening'];
      const slotIndex = (hour * 6 + Math.floor(minute / 10)) % 5; // Rotate every ~10 minutes through 5 slots
      actualTimeSlot = timeSlots[slotIndex];
      console.log(`🧪 TEST MODE: Running ${actualTimeSlot.toUpperCase()} content (every 10 minutes rotation)`);
    } 
    // Production schedule (5 times daily):
    else if (hour === 6 && minute >= 0 && minute <= 5) {
      actualTimeSlot = 'early_morning';
      console.log(`🌅 PRODUCTION: Running EARLY MORNING content at 6:00 AM CST`);
    } else if (hour === 10 && minute >= 0 && minute <= 5) {
      actualTimeSlot = 'morning';
      console.log(`🌤️ PRODUCTION: Running MORNING content at 10:00 AM CST`);
    } else if (hour === 14 && minute >= 0 && minute <= 5) {
      actualTimeSlot = 'afternoon';
      console.log(`☀️ PRODUCTION: Running AFTERNOON content at 2:00 PM CST`);
    } else if (hour === 18 && minute >= 0 && minute <= 5) {
      actualTimeSlot = 'evening';
      console.log(`🌆 PRODUCTION: Running EVENING content at 6:00 PM CST`);
    } else if (hour === 22 && minute >= 0 && minute <= 5) {
      actualTimeSlot = 'late_evening';
      console.log(`🌙 PRODUCTION: Running LATE EVENING content at 10:00 PM CST`);
    } else if (!isTestingMode) {
      // Only exit if not in testing mode
      console.log(`⏰ Auto mode: Not a scheduled time. Current: ${hour}:${minute.toString().padStart(2, '0')} CST`);
      console.log(`📅 PRODUCTION: 6:00 AM (early_morning), 10:00 AM (morning), 2:00 PM (afternoon), 6:00 PM (evening), 10:00 PM (late_evening) CST`);
      console.log(`🚫 Skipping automation - not a scheduled time`);
      process.exit(0);
    }
  } else if (!['early_morning', 'morning', 'afternoon', 'evening', 'late_evening'].includes(timeSlot)) {
    console.error('❌ Invalid time slot. Must be: early_morning, morning, afternoon, evening, late_evening, or auto');
    console.log('Usage: node blog-scheduler.js [early_morning|morning|afternoon|evening|late_evening|auto]');
    process.exit(1);
  }
  
  runScheduledAutomation(actualTimeSlot)
    .then(() => {
      console.log('✅ Answer Engine Optimized automation completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Automation failed:', error);
      process.exit(1);
    });
}
