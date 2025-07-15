// API Configuration
// Centralized configuration for all API endpoints and external services

const API_BASE_URL = import.meta.env.PROD 
  ? 'https://daveenci-ai-backend.onrender.com' 
  : 'http://localhost:3001';

export const apiConfig = {
  baseUrl: API_BASE_URL,
  endpoints: {
    chat: {
      summary: '/api/chat/summary',
      summaries: '/api/chat/summaries',
      llmResponse: '/api/chat/llm-response',
      context: '/api/chat/context'
    },
    auth: {
      login: '/api/auth/login',
      verify: '/api/auth/verify'
    },
    blog: {
      posts: '/api/blog/posts',
      create: '/api/blog/create'
    }
  }
};

export const llmConfig = {
  provider: 'gemini', // or 'openai', 'anthropic'
  maxTokens: 500,
  temperature: 0.7,
  model: 'gemini-2.5-pro', // Latest Gemini model with improved reasoning and performance
  fallbackToRules: true, // Fallback to rule-based responses if LLM fails
  rateLimitPerMinute: 60
};

// API client helper
export const apiClient = {
  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${apiConfig.baseUrl}${endpoint}`;
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Request failed for ${endpoint}:`, error);
      throw error;
    }
  },

  // Chat-specific API calls
  chat: {
    async generateResponse(prompt: string, context: any) {
      return apiClient.request(apiConfig.endpoints.chat.llmResponse, {
        method: 'POST',
        body: JSON.stringify({ prompt, context })
      });
    },

    async storeContext(sessionId: string, context: any) {
      return apiClient.request(apiConfig.endpoints.chat.context, {
        method: 'POST',
        body: JSON.stringify({ sessionId, context })
      });
    },

    async getContext(sessionId: string) {
      return apiClient.request(`${apiConfig.endpoints.chat.context}/${sessionId}`);
    },

    async storeSummary(summary: any) {
      return apiClient.request(apiConfig.endpoints.chat.summary, {
        method: 'POST',
        body: JSON.stringify(summary)
      });
    }
  }
}; 