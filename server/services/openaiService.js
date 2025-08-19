import fetch from 'node-fetch';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_BASE_URL = 'https://api.openai.com/v1';

class OpenAIService {
  constructor() {
    if (!OPENAI_API_KEY) {
      console.warn('⚠️ OPENAI_API_KEY not found in environment variables');
    }
  }

  async generateContent(prompt, options = {}) {
    const {
      model = 'gpt-4o-mini',
      temperature = 0.7,
      max_tokens = 4000,
      response_format = null
    } = options;

    try {
      console.log(`🤖 Generating content with OpenAI ${model}...`);
      
      const requestBody = {
        model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature,
        max_tokens
      };

      // Add response format if specified (for JSON responses)
      if (response_format) {
        requestBody.response_format = response_format;
      }

      const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid response structure from OpenAI API');
      }

      return {
        content: data.choices[0].message.content,
        usage: data.usage,
        model: data.model
      };

    } catch (error) {
      console.error(`❌ OpenAI API error:`, error);
      throw error;
    }
  }

  async generateBlogContent(topic, timeSlot, options = {}) {
    const defaultOptions = {
      model: 'gpt-4o-mini',
      temperature: 0.6,
      max_tokens: 4000
    };

    const mergedOptions = { ...defaultOptions, ...options };

    const prompt = `Write a comprehensive, SEO-optimized blog post about "${topic}" for the energy sector.

REQUIREMENTS:
- Target audience: Energy companies (EPC contractors, utilities, oilfield services, industrial services)
- Time slot: ${timeSlot}
- Make it AEO (Answer Engine Optimization) friendly for AI citation
- Include specific examples and actionable insights
- Use professional, authoritative tone
- Focus on practical business applications

STRUCTURE:
1. Compelling headline
2. Executive summary (2-3 sentences)
3. Main content with clear sections and headers
4. Actionable takeaways
5. Conclusion with clear next steps

FORMAT: Return as clean HTML with proper semantic tags (h2, h3, p, ul, li, strong).
LENGTH: 1000-1200 words
TONE: Professional, informative, solution-focused

Generate the complete blog post now:`;

    return await this.generateContent(prompt, mergedOptions);
  }

  async generateUseCaseContent(companyType, painPoint, decisionMaker, buyingTrigger, techEnvironment, options = {}) {
    const defaultOptions = {
      model: 'gpt-4o-mini',
      temperature: 0.6,
      max_tokens: 3000,
      response_format: { type: "json_object" }
    };

    const mergedOptions = { ...defaultOptions, ...options };

    const prompt = `Generate a compelling business use case for AI automation in the energy sector.

TARGETING CONTEXT:
- Company Type: ${companyType}
- Pain Point: ${painPoint}
- Decision Maker: ${decisionMaker}
- Buying Trigger: ${buyingTrigger}
- Tech Environment: ${techEnvironment}

REQUIREMENTS:
- Create educational content that showcases AI/automation capabilities
- Focus on practical, implementable solutions with clear ROI
- Make it AEO-optimized for answer engines like ChatGPT and Perplexity
- Use industry-specific terminology
- NO specific company names - use generic terms

FORMAT: Return as JSON with three keys: "challenge", "solution", and "results"

- "challenge": HTML content starting with <h2>Business Challenge: [Title]</h2>. 2-3 paragraphs describing the specific operational challenges.

- "solution": HTML content starting with <h2>AI Automation Solution: [Category]</h2>. 2-3 paragraphs explaining the solution, followed by a <ul> list of 5-6 AI capabilities.

- "results": Array of exactly 5 quantifiable outcomes with specific metrics (percentages, dollar amounts, time savings).

Generate the use case now:`;

    return await this.generateContent(prompt, mergedOptions);
  }

  async generateTitle(industry, category, options = {}) {
    const defaultOptions = {
      model: 'gpt-4o-mini',
      temperature: 0.7,
      max_tokens: 100
    };

    const mergedOptions = { ...defaultOptions, ...options };

    const prompt = `Generate a compelling, SEO-optimized title for a ${industry} ${category} article.

REQUIREMENTS:
- Professional and solution-focused
- Include relevant keywords for the energy sector
- Make it quotable and reference-worthy
- Focus on business value and practical implementation
- 8-12 words ideal length

EXAMPLES:
- "AI-Powered Equipment Monitoring for Energy Operations"
- "Automated Compliance Tracking for Industrial Services"
- "Smart Document Management for EPC Contractors"

Generate only the title, no quotes or explanations:`;

    return await this.generateContent(prompt, mergedOptions);
  }

  async testConnection() {
    try {
      const result = await this.generateContent('Say "OpenAI connection successful"', { 
        model: 'gpt-4o-mini',
        max_tokens: 50 
      });
      
      console.log('✅ OpenAI service connection test successful');
      return true;
    } catch (error) {
      console.error('❌ OpenAI service connection test failed:', error.message);
      return false;
    }
  }
}

// Create and export a singleton instance
const openaiService = new OpenAIService();

export default openaiService;

// Named exports for specific functions
export const {
  generateContent,
  generateBlogContent,
  generateUseCaseContent,
  generateTitle,
  testConnection
} = openaiService; 