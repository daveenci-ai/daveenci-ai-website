// LLM Service for AI-Powered Chatbot Responses
// Handles dynamic response generation with fallback to simple responses

import { apiClient, llmConfig } from '@/config/api';
import { companyInfo, fallbackResponses } from '@/config/chatbot.config';
import type { LLMContext, LLMResponse } from '@/types';

class LLMService {
  private rateLimitCache: Map<string, number[]> = new Map();
  private fallbackCount = 0;
  private maxFallbacksPerSession = 5;

  constructor() {
    this.cleanupRateLimit();
  }

  /**
   * Generate AI-powered response based on user message and context
   */
  async generateResponse(
    userMessage: string, 
    context: LLMContext,
    fallbackResponse?: string
  ): Promise<LLMResponse> {
    try {
      // Check rate limits
      if (!this.checkRateLimit(context.sessionId)) {
        console.warn('🚫 Rate limit exceeded, using fallback');
        return this.createFallbackResponse(fallbackResponse || fallbackResponses.default);
      }

      // Check if we should use LLM (avoid overuse)
      if (this.fallbackCount >= this.maxFallbacksPerSession) {
        console.warn('🚫 Max LLM calls reached for session, using fallback');
        return this.createFallbackResponse(fallbackResponse || fallbackResponses.default);
      }

      const prompt = this.buildPrompt(userMessage, context);
      console.log('🤖 Generating LLM response for:', userMessage.substring(0, 50) + '...');

      const llmResponse = await apiClient.chat.generateResponse(prompt, {
        sessionId: context.sessionId,
        stage: context.conversationStage,
        userInfo: context.userInfo,
        model: llmConfig.model,
        temperature: llmConfig.temperature,
        maxTokens: llmConfig.maxTokens
      });

      // Check if we got an empty response and handle it
      if (!llmResponse.response || llmResponse.response.trim() === '') {
        console.warn('⚠️ Empty response from LLM, using fallback');
        return this.createFallbackResponse(
          fallbackResponse || fallbackResponses.default,
          'Empty response from LLM service'
        );
      }

      return {
        content: llmResponse.response,
        confidence: llmResponse.confidence || 0.8,
        fallbackUsed: false,
        reasoning: llmResponse.reasoning,
        suggestedActions: llmResponse.suggestedActions
      };

    } catch (error) {
      console.error('❌ LLM generation failed:', error);
      this.fallbackCount++;
      
      return this.createFallbackResponse(
        fallbackResponse || fallbackResponses.default,
        `LLM Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Build context-aware prompt for LLM
   */
  private buildPrompt(userMessage: string, context: LLMContext): string {
    // Ultra-simple prompt to avoid any content filtering
    // Remove conversation history and complex context that might trigger filters
    
    const userName = context.userInfo.name ? ` ${context.userInfo.name}` : '';
    
    return `You are a helpful business consultant named Dave. A user${userName} says: "${userMessage}"

Please respond helpfully and professionally.`;
  }

  /**
   * Create fallback response when LLM fails
   */
  private createFallbackResponse(content: string, error?: string): LLMResponse {
    return {
      content,
      confidence: 0.5,
      fallbackUsed: true,
      reasoning: error || 'Using simple fallback'
    };
  }

  /**
   * Check rate limiting for session
   */
  private checkRateLimit(sessionId: string): boolean {
    const now = Date.now();
    const windowMs = 60 * 1000;
    
    if (!this.rateLimitCache.has(sessionId)) {
      this.rateLimitCache.set(sessionId, []);
    }
    
    const timestamps = this.rateLimitCache.get(sessionId)!;
    const recentTimestamps = timestamps.filter(ts => now - ts < windowMs);
    
    if (recentTimestamps.length < llmConfig.rateLimitPerMinute) {
      recentTimestamps.push(now);
      this.rateLimitCache.set(sessionId, recentTimestamps);
      return true;
    }
    
    return false;
  }

  /**
   * Clean up old rate limit entries
   */
  private cleanupRateLimit(): void {
    setInterval(() => {
      const now = Date.now();
      const windowMs = 60 * 1000;
      
      for (const [sessionId, timestamps] of this.rateLimitCache.entries()) {
        const recentTimestamps = timestamps.filter(ts => now - ts < windowMs);
        if (recentTimestamps.length === 0) {
          this.rateLimitCache.delete(sessionId);
        } else {
          this.rateLimitCache.set(sessionId, recentTimestamps);
        }
      }
    }, 60000);
  }

  /**
   * Store conversation context for future sessions
   */
  async storeConversationContext(context: LLMContext): Promise<void> {
    try {
      await apiClient.chat.storeContext(context.sessionId, {
        userInfo: context.userInfo,
        conversationStage: context.conversationStage,
        servicesDiscussed: context.servicesDiscussed,
        painPoints: context.painPoints,
        lastInteraction: context.timestamp,
        messageCount: context.conversationHistory.length
      });
    } catch (error) {
      console.error('❌ Failed to store conversation context:', error);
    }
  }

  /**
   * Retrieve conversation context for returning users
   */
  async getConversationContext(sessionId: string): Promise<Partial<LLMContext> | null> {
    try {
      const context = await apiClient.chat.getContext(sessionId);
      return context;
    } catch (error) {
      console.error('❌ Failed to retrieve conversation context:', error);
      return null;
    }
  }

  /**
   * Reset fallback counter for new session
   */
  resetSession(): void {
    this.fallbackCount = 0;
  }

  /**
   * Get service health metrics
   */
  getMetrics() {
    return {
      rateLimitCacheSize: this.rateLimitCache.size,
      fallbackCount: this.fallbackCount,
      maxFallbacks: this.maxFallbacksPerSession,
      llmEnabled: llmConfig.fallbackToRules
    };
  }
}

// Export singleton instance
export const llmService = new LLMService();
export default llmService; 