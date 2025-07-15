// Chatbot Configuration - Phase 2: LLM Integration
// This file contains all the patterns, keywords, responses, and LLM settings
// Update this file to modify bot behavior without touching core logic

// Phase 2: LLM Integration Settings
export const llmSettings = {
  enabled: true, // Set to false to use only rule-based responses
  confidenceThreshold: 0.5, // Lower threshold to prefer LLM responses
  fallbackAfterAttempts: 10, // Higher limit before falling back to rules
  useForAllInteractions: true, // Use LLM for ALL conversations
  useForGreeting: true, // Use LLM for natural, contextual greetings
  useForContactCollection: true, // Use LLM for natural contact collection
  useForComplexQueries: true, // Use LLM for complex questions
  contextWindow: 6, // Number of previous messages to include
  personalityTraits: [
    'helpful and solution-focused',
    'professional but conversational', 
    'knowledgeable about AI and business automation',
    'empathetic to business challenges',
    'direct when collecting contact information'
  ]
};

// Advanced conversation patterns for Phase 2
export const advancedPatterns = {
  complexQuestions: [
    'how do you', 'what would you recommend', 'can you explain', 'what are the benefits',
    'how does this work', 'what makes you different', 'why should I choose',
    'what are the steps', 'how long does it take', 'what is the process'
  ],
  emergencySignals: [
    'urgent', 'asap', 'immediately', 'crisis', 'emergency', 'help now',
    'breaking', 'failing', 'down', 'not working'
  ],
  highIntentSignals: [
    'ready to move forward', 'want to get started', 'need this done',
    'when can we begin', 'how do we proceed', 'what\'s next',
    'i want to hire', 'let\'s do this', 'sign me up'
  ],
  comparisonQueries: [
    'vs', 'versus', 'compared to', 'difference between', 'alternatives',
    'other options', 'competitors', 'similar solutions'
  ]
};

// Session and Memory Management (Phase 2)
export const sessionConfig = {
  storageKey: 'daveenci_chat_session',
  contextRetentionDays: 30, // How long to remember user context
  maxConversationHistory: 20, // Maximum messages to store per session
  autoSaveInterval: 5000, // Auto-save conversation every 5 seconds
  crossSessionMemory: true, // Remember user across browser sessions
  memoryFields: [
    'name', 'email', 'company', 'phone', 'servicesDiscussed',
    'painPoints', 'conversationStage', 'leadQualification', 'lastVisit'
  ]
};

// Conversation Intelligence (Phase 2)
export const intelligenceConfig = {
  sentiment: {
    enabled: true,
    trackPositive: ['excited', 'great', 'perfect', 'love', 'amazing', 'awesome'],
    trackNegative: ['frustrated', 'angry', 'disappointed', 'terrible', 'hate', 'awful'],
    trackUrgent: ['urgent', 'asap', 'quickly', 'emergency', 'immediately', 'rush']
  },
  intentConfidence: {
    high: 0.9, // Very confident in intent detection
    medium: 0.7, // Moderately confident
    low: 0.5 // Low confidence, might need clarification
  },
  responseAdaptation: {
    shortResponses: ['yes', 'no', 'ok', 'sure', 'maybe'],
    detailedQuestions: ['tell me more', 'explain', 'details', 'how does'],
    urgentTone: ['quick', 'fast', 'asap', 'urgent', 'immediately']
  }
};

export const serviceKeywords = {
  'AI Automation': [
    // Original Keywords
    'ai', 'automation', 'automate', 'artificial intelligence', 'machine learning', 'ml', 'ai assistant', 'chatbot', 'chatbots', 'chat bot', 'chat bots', 'chatboots', 'assistant',
    // Problem/Pain-Point Keywords
    'repetitive tasks', 'manual data entry', 'time-consuming', 'inefficient', 'human error', 'streamline', 'efficiency', 'productivity',
    // Solution/Outcome Keywords
    'intelligent automation', 'robotic process automation', 'rpa', 'data processing', 'virtual agent', 'conversational ai', 'natural language processing', 'nlp', 'business process automation', 'bpa'
  ],
  'Digital Marketing': [
    // Original Keywords
    'marketing', 'digital marketing', 'ads', 'advertising', 'campaigns', 'lead generation',
    // Channel-Specific Keywords
    'seo', 'search engine optimization', 'social media marketing', 'smm', 'email marketing', 'content marketing', 'ppc', 'pay-per-click', 'google ads', 'facebook ads',
    // Goal-Oriented Keywords
    'increase sales', 'get more customers', 'brand awareness', 'online presence', 'customer acquisition', 'conversion rate', 'funnel'
  ],
  'Custom Software': [
    // Original Keywords
    'software', 'custom software', 'development', 'application', 'app', 'platform', 'website',
    // Specific Application Types
    'mobile app', 'web app', 'ios', 'android', 'internal tool', 'dashboard', 'customer portal', 'saas', 'enterprise software',
    // Verbs and Actions
    'build', 'create', 'develop', 'design', 'code', 'program', 'bespoke software'
  ],
  'Systems Integration': [
    // Original Keywords
    'integration', 'crm', 'systems', 'workflow', 'process',
    // Action-Oriented Keywords
    'connect', 'sync', 'link', 'talk to each other', 'api',
    // Specific System Names/Types
    'salesforce', 'hubspot', 'shopify', 'quickbooks', 'erp', 'zapier', 'make.com', 'payment gateway',
    // Problem/Outcome Keywords
    'data silos', 'disconnected systems', 'automated workflow', 'seamless data flow', 'single source of truth'
  ]
};

export const painPointKeywords = {
  'Manual processes': ['manual', 'time consuming', 'repetitive', 'tedious'],
  'Lead generation issues': ['leads', 'prospects', 'customers', 'acquisition'],
  'Marketing inefficiency': ['marketing', 'campaigns', 'roi', 'conversion'],
  'System integration problems': ['integration', 'systems', 'workflow', 'process'],
  'Cost concerns': ['expensive', 'cost', 'budget', 'price']
};

export const intentPatterns = {
  greeting: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'],
  whatDoYouDo: ['what do you do', 'what does', 'what are your services', 'how can you help', 'tell me about', 'what can you help', 'what services'],
  chatbotRequest: ['chatbots', 'chatbot', 'conversational ai', 'virtual assistant', 'chat assistant'],
  needs: ['i need', 'i want', 'looking for', 'need one', 'want one', 'interested in'],
  question: ['what', 'how', 'where', 'when', 'why', 'can you', 'do you', 'tell me', '?'],
  clarification: ['what do you mean', 'i don\'t understand', 'what?', 'huh?', 'clarify', 'explain', 'sharing what', 'what are you talking about'],
  interest: ['interested', 'sounds good', 'tell me more', 'yes', 'sure', 'okay', 'ok'],
  negative: ['no', 'not interested', 'don\'t want', 'stop', 'leave me alone', 'no thanks']
};

export const responses = {
  greeting: "Hi! I'm Dave from DaVeenci. We help businesses save time and money with AI automation, digital marketing, and custom software solutions. What can I help you with today?",
  
  whatDoYouDo: `We're DaVeenci - we help businesses save time and money through smart automation and technology solutions.

Here's what we specialize in:

🤖 **AI Automation** - We build chatbots, automate repetitive tasks, and create intelligent workflows that handle the work your team shouldn't have to do manually.

📈 **Digital Marketing** - We create data-driven campaigns that actually convert, using AI to optimize your ads and target the right customers at the right time.

💻 **Custom Software** - We develop web apps, mobile apps, and internal tools that are built specifically for your business needs - no generic solutions.

Most of our clients save 20-40 hours per week and see 300-500% ROI within the first year. What kind of challenges is your business facing right now?`,

  chatbotInterest: "Absolutely! Building intelligent chatbots is a core part of our AI Automation service. Is that something you're exploring for your business?",
  
  chatbotNeed: "That's great to hear! We can definitely help with that. To give you the best information, could you tell me what you'd want the chatbot to do? For example, are you looking for it to handle customer support, capture sales leads, or something else?",

  clarification: "My apologies! I may have gotten ahead of myself. Let me clarify - I'm here to help you learn about our AI and automation solutions. What would you like to know about our services?",

  negative: "No problem at all! If you change your mind or have any questions about our services, I'm here to help.",

  defaultQuestion: "Let me help you with that! We specialize in AI automation (like chatbots and workflow automation), digital marketing (data-driven campaigns that convert), and custom software development. Which of these areas interests you most, or do you have a specific challenge you're trying to solve?",

  caseStudies: `Absolutely! Here are some real results from our clients:

📈 **FashionForward** (Retail): We automated their inventory management with AI, reducing stock errors by 30% and saving 25 hours/week.

🚀 **TechStartup** (SaaS): Our marketing automation increased their lead conversion by 400% and reduced customer acquisition cost by 60%.

💼 **ConsultingPro** (Services): We built custom workflow automation that freed up 40 hours/week of manual work.

Which industry are you in? I can share more specific examples that match your business!`,

  pricing: "Great question! Our solutions typically provide 300-500% ROI - most clients save $50,000+ annually while dramatically improving efficiency. Pricing depends on your specific needs and scale. Would you like to schedule a brief call to discuss your specific situation?",

  antonInfo: "Anton Osipov is our Co-Founder and CEO, a brilliant data scientist with over a decade of experience in Silicon Valley with tech giants like Google and Apple. He brings deep expertise in digital marketing trends and analytics. Would you like to schedule a call to speak with Anton directly about your business needs?",

  astridInfo: "Astrid Abrahamyan is our Co-Founder and COO, who focuses on creative solutions and relationship-building. She ensures that every solution we build aligns perfectly with your business goals and team dynamics. Would you like to discuss how we can tailor our approach to your specific business?"
};

export const conversationalFollowUps = [
  "I'd love to help with that! Could you tell me more about your specific situation?",
  "That sounds like something we can definitely help with. How are you currently handling that process?",
  "Interesting! We've helped many businesses with similar challenges. What would an ideal solution look like for you?",
  "That's exactly the type of problem we solve for our clients. What's your biggest pain point with your current approach?"
];

// Text normalization patterns for better intent recognition
export const textNormalizations = [
  { pattern: /chatboots?/g, replacement: 'chatbots' },
  { pattern: /chat\s*boots?/g, replacement: 'chatbots' },
  { pattern: /chat\s*bots?/g, replacement: 'chatbots' },
  { pattern: /chatbot/g, replacement: 'chatbots' }
];

// Company information for consistent responses
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