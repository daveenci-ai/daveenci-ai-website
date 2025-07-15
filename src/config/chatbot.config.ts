// Chatbot Configuration - LLM-First Approach
// Simplified configuration for AI-powered chatbot

// LLM Integration Settings
export const llmSettings = {
  enabled: true,
  confidenceThreshold: 0.5,
  fallbackAfterAttempts: 10,
  useForAllInteractions: true,
  contextWindow: 6,
  personalityTraits: [
    'helpful and solution-focused',
    'professional but conversational', 
    'knowledgeable about AI and business automation',
    'empathetic to business challenges',
    'direct when collecting contact information'
  ]
};

// Session and Memory Management
export const sessionConfig = {
  storageKey: 'daveenci_chat_session',
  contextRetentionDays: 30,
  maxConversationHistory: 20,
  autoSaveInterval: 5000,
  crossSessionMemory: true,
  memoryFields: [
    'name', 'email', 'company', 'phone', 'servicesDiscussed',
    'painPoints', 'conversationStage', 'leadQualification', 'lastVisit'
  ]
};

// Simple fallback responses (only used when LLM fails)
export const fallbackResponses = {
  greeting: "Hi! I'm Dave from DaVeenci. We help businesses with AI automation, digital marketing, and custom software. How can I help you today?",
  default: "I'd be happy to help you with that. Could you tell me a bit more about what you're looking for?",
  error: "I apologize, but I'm having some technical difficulties. Let me connect you with our team who can help you right away."
};

// Company information for LLM context
export const companyInfo = {
  name: "DaVeenci",
  website: "daveenci.ai",
  services: ["AI Automation", "Digital Marketing", "Custom Software", "Systems Integration"],
  founders: {
    anton: {
      name: "Anton Osipov",
      title: "Co-Founder, CTO, AI Engineer",
      background: "Data scientist with 10+ years at Google and Apple"
    },
    astrid: {
      name: "Astrid Abrahamyan", 
      title: "Co-Founder, COO, Creative Director",
      focus: "Creative solutions and relationship-building"
    }
  }
}; 