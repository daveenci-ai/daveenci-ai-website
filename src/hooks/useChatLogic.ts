import { useReducer, useEffect, useCallback, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  serviceKeywords, 
  painPointKeywords, 
  intentPatterns, 
  responses, 
  conversationalFollowUps,
  textNormalizations,
  companyInfo,
  llmSettings,
  advancedPatterns,
  sessionConfig,
  intelligenceConfig
} from '@/config/chatbot.config';
import llmService, { type LLMContext, type LLMResponse } from '@/services/llmService';

// Types
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Phase 2: Enhanced interface for LLM integration
interface UserIntent {
  intent: 'greeting' | 'what_do_you_do' | 'chatbot_request' | 'need_statement' | 'question' | 'clarification' | 'interest' | 'negative' | 'contact_info' | 'business_info' | 'general' | 'complex_query' | 'comparison' | 'urgent';
  services: string[];
  painPoints: string[];
  hasContactInfo: boolean;
  qualification: 'Hot' | 'Warm' | 'Cold';
  needsAcknowledgment: boolean;
  confidence: number;
  sentiment: 'positive' | 'negative' | 'neutral' | 'urgent';
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  company_name: string;
}

export interface ChatSummary {
  interaction_date: string;
  contact_info: ContactInfo;
  chat_summary: string;
  services_discussed: string[];
  key_pain_points: string[];
  call_to_action_offered: boolean;
  next_step: string;
  lead_qualification: 'Hot' | 'Warm' | 'Cold';
}

interface ChatState {
  messages: Message[];
  isTyping: boolean;
  contactInfo: ContactInfo;
  conversationStage: 'greeting' | 'qualifying' | 'service_discussion' | 'contact_collection' | 'closing';
  servicesDiscussed: Set<string>;
  painPoints: Set<string>;
  callToActionOffered: boolean;
  lastQuestion: string;
  expectingResponse: 'name' | 'email' | 'company' | 'general' | null;
  // Phase 2: LLM and session management
  sessionId: string;
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>;
  llmEnabled: boolean;
  fallbackCount: number;
  lastLLMCall: Date | null;
  userSentiment: 'positive' | 'negative' | 'neutral' | 'urgent';
  conversationQuality: number;
}

type ChatAction = 
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'SET_CONTACT_INFO'; payload: Partial<ContactInfo> }
  | { type: 'SET_CONVERSATION_STAGE'; payload: ChatState['conversationStage'] }
  | { type: 'ADD_SERVICE_DISCUSSED'; payload: string }
  | { type: 'ADD_PAIN_POINT'; payload: string }
  | { type: 'SET_CALL_TO_ACTION_OFFERED'; payload: boolean }
  | { type: 'SET_LAST_QUESTION'; payload: string }
  | { type: 'SET_EXPECTING_RESPONSE'; payload: ChatState['expectingResponse'] }
  | { type: 'RESET_CHAT' }
  // Phase 2: LLM and session actions
  | { type: 'ADD_TO_HISTORY'; payload: { role: 'user' | 'assistant'; content: string } }
  | { type: 'SET_LLM_ENABLED'; payload: boolean }
  | { type: 'INCREMENT_FALLBACK_COUNT' }
  | { type: 'SET_LAST_LLM_CALL'; payload: Date }
  | { type: 'SET_USER_SENTIMENT'; payload: ChatState['userSentiment'] }
  | { type: 'SET_CONVERSATION_QUALITY'; payload: number }
  | { type: 'LOAD_SESSION'; payload: Partial<ChatState> };

const initialState: ChatState = {
  messages: [],
  isTyping: false,
  contactInfo: {
    name: '',
    email: '',
    phone: '',
    company_name: ''
  },
  conversationStage: 'greeting',
  servicesDiscussed: new Set(),
  painPoints: new Set(),
  callToActionOffered: false,
  lastQuestion: '',
  expectingResponse: null,
  // Phase 2: LLM and session management
  sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  conversationHistory: [],
  llmEnabled: llmSettings.enabled,
  fallbackCount: 0,
  lastLLMCall: null,
  userSentiment: 'neutral',
  conversationQuality: 0.5
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_TYPING':
      return { ...state, isTyping: action.payload };
    case 'SET_CONTACT_INFO':
      return { ...state, contactInfo: { ...state.contactInfo, ...action.payload } };
    case 'SET_CONVERSATION_STAGE':
      return { ...state, conversationStage: action.payload };
    case 'ADD_SERVICE_DISCUSSED':
      return { ...state, servicesDiscussed: new Set([...state.servicesDiscussed, action.payload]) };
    case 'ADD_PAIN_POINT':
      return { ...state, painPoints: new Set([...state.painPoints, action.payload]) };
    case 'SET_CALL_TO_ACTION_OFFERED':
      return { ...state, callToActionOffered: action.payload };
    case 'SET_LAST_QUESTION':
      return { ...state, lastQuestion: action.payload };
    case 'SET_EXPECTING_RESPONSE':
      return { ...state, expectingResponse: action.payload };
    case 'RESET_CHAT':
      return { ...initialState, sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` };
    // Phase 2: LLM and session handling
    case 'ADD_TO_HISTORY':
      const updatedHistory = [...state.conversationHistory, action.payload];
      return { 
        ...state, 
        conversationHistory: updatedHistory.slice(-sessionConfig.maxConversationHistory) 
      };
    case 'SET_LLM_ENABLED':
      return { ...state, llmEnabled: action.payload };
    case 'INCREMENT_FALLBACK_COUNT':
      return { ...state, fallbackCount: state.fallbackCount + 1 };
    case 'SET_LAST_LLM_CALL':
      return { ...state, lastLLMCall: action.payload };
    case 'SET_USER_SENTIMENT':
      return { ...state, userSentiment: action.payload };
    case 'SET_CONVERSATION_QUALITY':
      return { ...state, conversationQuality: action.payload };
    case 'LOAD_SESSION':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function useChatLogic() {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const { toast } = useToast();
  
  // Phase 2: LLM service reference
  const sessionMemoryRef = useRef<Map<string, any>>(new Map());

  // Phase 2: Enhanced initialization with session management
  const initializeChat = useCallback(async () => {
    if (state.messages.length === 0) {
      // Phase 2: Load session memory
      try {
        const sessionData = localStorage.getItem(sessionConfig.storageKey);
        if (sessionData && sessionConfig.crossSessionMemory) {
          const parsedSession = JSON.parse(sessionData);
          const daysSinceLastVisit = parsedSession.lastVisit ? 
            (Date.now() - new Date(parsedSession.lastVisit).getTime()) / (1000 * 60 * 60 * 24) : 999;
          
          if (daysSinceLastVisit <= sessionConfig.contextRetentionDays) {
            // Load previous session data
            dispatch({ type: 'LOAD_SESSION', payload: {
              contactInfo: parsedSession.contactInfo || state.contactInfo,
              servicesDiscussed: new Set(parsedSession.servicesDiscussed || []),
              painPoints: new Set(parsedSession.painPoints || []),
              conversationStage: parsedSession.conversationStage || 'greeting'
            }});
            
            sessionMemoryRef.current.set('visitCount', (parsedSession.visitCount || 0) + 1);
            sessionMemoryRef.current.set('lastVisit', parsedSession.lastVisit);
          }
        }
      } catch (error) {
        console.warn('⚠️ Failed to load session data:', error);
      }

      // Check for returning user
      const savedName = localStorage.getItem('chatUserName');
      const visitCount = sessionMemoryRef.current.get('visitCount') || 0;
      
      if (savedName && visitCount > 0) {
        dispatch({ type: 'SET_CONTACT_INFO', payload: { name: savedName } });
        const welcomeBackMessage = `Welcome back, ${savedName}! ${visitCount > 3 ? 'Great to see you again!' : 'How can I help you today?'}`;
        addBotMessage(welcomeBackMessage);
        dispatch({ type: 'ADD_TO_HISTORY', payload: { role: 'assistant', content: welcomeBackMessage } });
      } else {
        const greeting = "Hi! I'm Dave from DaVeenci. I can help you with AI automation, digital marketing, or custom software solutions. What can I help you with today?";
        dispatch({ type: 'SET_LAST_QUESTION', payload: greeting });
        dispatch({ type: 'SET_EXPECTING_RESPONSE', payload: 'general' });
        addBotMessage(greeting);
        dispatch({ type: 'ADD_TO_HISTORY', payload: { role: 'assistant', content: greeting } });
      }

      // Phase 2: Initialize LLM service for the session
      llmService.resetSession();
    }
  }, [state.messages.length, state.contactInfo]);

  // Save user name to localStorage when it's captured
  useEffect(() => {
    if (state.contactInfo.name) {
      localStorage.setItem('chatUserName', state.contactInfo.name);
    }
  }, [state.contactInfo.name]);

  const addMessage = useCallback((content: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date()
    };
    dispatch({ type: 'ADD_MESSAGE', payload: newMessage });
  }, []);

  const addBotMessage = useCallback((content: string) => {
    dispatch({ type: 'SET_TYPING', payload: true });
    setTimeout(() => {
      dispatch({ type: 'SET_TYPING', payload: false });
      addMessage(content, 'bot');
    }, 1000 + Math.random() * 1000); // Simulate typing delay
  }, [addMessage]);

  const normalizeMessage = useCallback((message: string): string => {
    let normalized = message.toLowerCase().trim();
    textNormalizations.forEach(({ pattern, replacement }) => {
      normalized = normalized.replace(pattern, replacement);
    });
    return normalized;
  }, []);

  const detectUserIntent = useCallback((message: string): UserIntent => {
    const lowerMessage = message.toLowerCase().trim();
    const normalizedMessage = normalizeMessage(message);
    
    let intent: UserIntent['intent'] = 'general';
    let needsAcknowledgment = false;
    let confidence = 0.5;
    let sentiment: UserIntent['sentiment'] = 'neutral';
    
    // Check for greetings first (simple messages)
    if (lowerMessage.length < 20 && intentPatterns.greeting.some(pattern => lowerMessage.includes(pattern))) {
      intent = 'greeting';
    }
    // Check for "what do you do" type questions
    else if (intentPatterns.whatDoYouDo.some(pattern => normalizedMessage.includes(pattern))) {
      intent = 'what_do_you_do';
    }
    // Check for chatbot-specific requests
    else if (intentPatterns.chatbotRequest.some(pattern => normalizedMessage.includes(pattern))) {
      intent = 'chatbot_request';
      needsAcknowledgment = intentPatterns.needs.some(pattern => normalizedMessage.includes(pattern));
    }
    // Check for explicit need statements
    else if (intentPatterns.needs.some(pattern => normalizedMessage.includes(pattern))) {
      intent = 'need_statement';
      needsAcknowledgment = true;
    }
    // Check for clarification requests
    else if (intentPatterns.clarification.some(pattern => lowerMessage.includes(pattern))) {
      intent = 'clarification';
    }
    // Check for questions
    else if (intentPatterns.question.some(pattern => lowerMessage.includes(pattern))) {
      intent = 'question';
    }
    // Check for interest signals
    else if (intentPatterns.interest.some(pattern => lowerMessage.includes(pattern))) {
      intent = 'interest';
    }
    // Check for negative responses
    else if (intentPatterns.negative.some(pattern => lowerMessage.includes(pattern))) {
      intent = 'negative';
    }

    // Detect services and pain points
    const services: string[] = [];
    const painPointsFound: string[] = [];

    Object.entries(serviceKeywords).forEach(([service, keywords]) => {
      if (keywords.some(keyword => normalizedMessage.includes(keyword))) {
        services.push(service);
      }
    });

    Object.entries(painPointKeywords).forEach(([painPoint, keywords]) => {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        painPointsFound.push(painPoint);
      }
    });

    // Check for contact info
    const emailRegex = /[\w\.-]+@[\w\.-]+\.\w+/;
    const phoneRegex = /(\d{3}[-\.\s]??\d{3}[-\.\s]??\d{4}|\(\d{3}\)\s*\d{3}[-\.\s]??\d{4}|\d{3}[-\.\s]??\d{4})/;
    const containsContact = emailRegex.test(message) || phoneRegex.test(message);

    // Qualification logic
    let qualification: 'Hot' | 'Warm' | 'Cold' = 'Cold';
    if (services.length >= 2 || painPointsFound.length >= 2) {
      qualification = 'Hot';
    } else if (services.length >= 1 || painPointsFound.length >= 1) {
      qualification = 'Warm';
    }

    return { 
      intent, 
      services, 
      painPoints: painPointsFound, 
      hasContactInfo: containsContact, 
      qualification, 
      needsAcknowledgment,
      confidence,
      sentiment
    };
  }, [normalizeMessage]);

  const extractContactInfo = useCallback((message: string): Partial<ContactInfo> => {
    const emailRegex = /[\w\.-]+@[\w\.-]+\.\w+/;
    const phoneRegex = /(\d{3}[-\.\s]??\d{3}[-\.\s]??\d{4}|\(\d{3}\)\s*\d{3}[-\.\s]??\d{4}|\d{3}[-\.\s]??\d{4})/;
    
    const extracted: Partial<ContactInfo> = {};
    
    const emailMatch = message.match(emailRegex);
    if (emailMatch) {
      extracted.email = emailMatch[0];
    }
    
    const phoneMatch = message.match(phoneRegex);
    if (phoneMatch) {
      extracted.phone = phoneMatch[0];
    }

    // More flexible name patterns
    const namePatterns = [
      /(?:my name is|i'm|i am|call me|this is|name's)\s+([a-zA-Z\s]{2,40})/i,
      /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)(?:\s|$)/,
      /(?:^|\.|!)\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)(?:\s|$)/,
    ];

    for (const pattern of namePatterns) {
      const nameMatch = message.match(pattern);
      if (nameMatch && !state.contactInfo.name) {
        const potentialName = nameMatch[1].trim();
        const words = potentialName.split(' ').filter(w => w.length > 1);
        const excludeNames = ['thank', 'thanks', 'hello', 'hi', 'yes', 'sure', 'great', 'good', 'nice', 'awesome'];
        if (words.length >= 2 && words.length <= 4 && 
            potentialName.length <= 50 && 
            !excludeNames.some(word => potentialName.toLowerCase().includes(word))) {
          extracted.name = potentialName;
          break;
        }
      }
    }

    // More flexible company patterns
    const companyPatterns = [
      /(?:company is|work at|i work for|from|at|with)\s+([a-zA-Z0-9\s&.,'-]{2,50})/i,
      /(?:company|business|startup|firm):\s*([a-zA-Z0-9\s&.,'-]{2,50})/i,
      /([A-Z][a-zA-Z0-9\s&.,'-]{1,49})(?:\s+(?:inc|corp|corporation|llc|ltd|company|co|technologies|tech|solutions|group)\.?)/i,
    ];

    for (const pattern of companyPatterns) {
      const companyMatch = message.match(pattern);
      if (companyMatch && !state.contactInfo.company_name) {
        const potentialCompany = companyMatch[1].trim();
        const excludeWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'my', 'our', 'this', 'that'];
        const genericTerms = ['business', 'company', 'work', 'job', 'place', 'here', 'there', 'customer', 'client'];
        
        if (potentialCompany.length >= 2 && 
            !excludeWords.some(word => potentialCompany.toLowerCase() === word) &&
            !genericTerms.some(term => potentialCompany.toLowerCase() === term)) {
          extracted.company_name = potentialCompany;
          break;
        }
      }
    }
    
    return extracted;
  }, [state.contactInfo.name, state.contactInfo.company_name]);

  const generateResponse = useCallback((userMessage: string): string => {
    const analysis = detectUserIntent(userMessage);
    const lowerMessage = userMessage.toLowerCase();

    // Update tracked data
    analysis.services.forEach(service => dispatch({ type: 'ADD_SERVICE_DISCUSSED', payload: service }));
    analysis.painPoints.forEach(painPoint => dispatch({ type: 'ADD_PAIN_POINT', payload: painPoint }));

    // Handle expected responses based on conversation context
    if (state.expectingResponse) {
      if (analysis.intent === 'negative') {
        dispatch({ type: 'SET_EXPECTING_RESPONSE', payload: null });
        return responses.negative;
      }

      if (state.expectingResponse === 'name' && !state.contactInfo.name) {
        const extractedName = extractContactInfo(userMessage).name;
        if (extractedName || (userMessage.trim().split(' ').length <= 3 && userMessage.trim().length > 1)) {
          dispatch({ type: 'SET_EXPECTING_RESPONSE', payload: 'email' });
          const name = extractedName || userMessage.trim();
          dispatch({ type: 'SET_CONTACT_INFO', payload: { name } });
          return `Great to meet you, ${name.split(' ')[0]}! What's the best email address to send you those case studies?`;
        } else {
          return "I didn't catch your name. Could you please tell me what I should call you?";
        }
      }
      
      if (state.expectingResponse === 'email' && !state.contactInfo.email) {
        const extractedEmail = extractContactInfo(userMessage).email;
        if (extractedEmail) {
          dispatch({ type: 'SET_EXPECTING_RESPONSE', payload: 'company' });
          dispatch({ type: 'SET_CONTACT_INFO', payload: { email: extractedEmail } });
          return `Perfect! I've got your email as ${extractedEmail}. And what company are you with so I can send you the most relevant case studies for your industry?`;
        } else {
          return "I didn't catch that email address. Could you please share your email again?";
        }
      }
      
      if (state.expectingResponse === 'company' && !state.contactInfo.company_name) {
        const extractedCompany = extractContactInfo(userMessage).company_name || userMessage.trim();
        if (extractedCompany && extractedCompany.length > 1) {
          dispatch({ type: 'SET_EXPECTING_RESPONSE', payload: null });
          dispatch({ type: 'SET_CONTACT_INFO', payload: { company_name: extractedCompany } });
          dispatch({ type: 'SET_CALL_TO_ACTION_OFFERED', payload: true });
          dispatch({ type: 'SET_CONVERSATION_STAGE', payload: 'closing' });
          return `Excellent! Thanks ${state.contactInfo.name ? state.contactInfo.name.split(' ')[0] : 'for that'}, I'll send you some targeted case studies for ${extractedCompany}. Our team will also reach out within 24 hours to discuss how we can help streamline your operations. Would you prefer a call or email for the initial consultation?`;
        }
      }
    }

    // Handle different user intents
    switch (analysis.intent) {
      case 'greeting':
        dispatch({ type: 'SET_EXPECTING_RESPONSE', payload: 'general' });
        return responses.greeting;
      
      case 'what_do_you_do':
        dispatch({ type: 'SET_EXPECTING_RESPONSE', payload: null });
        return responses.whatDoYouDo;
      
      case 'chatbot_request':
        dispatch({ type: 'SET_EXPECTING_RESPONSE', payload: null });
        return analysis.needsAcknowledgment ? responses.chatbotNeed : responses.chatbotInterest;
      
      case 'need_statement':
        return handleNeedStatement(userMessage, analysis);
      
      case 'clarification':
        dispatch({ type: 'SET_EXPECTING_RESPONSE', payload: null });
        return responses.clarification;
      
      case 'question':
        return handleQuestionIntent(userMessage, analysis);
      
      case 'interest':
        return handleInterestIntent();
      
      case 'negative':
        dispatch({ type: 'SET_EXPECTING_RESPONSE', payload: null });
        return responses.negative;
      
      case 'contact_info':
        return handleContactInfo(userMessage);
      
      case 'business_info':
        return "That's helpful context! Based on your business, I can recommend specific solutions that would be most valuable. What are your biggest operational challenges right now?";
      
      default:
        return handleGeneralIntent(userMessage, analysis);
    }
  }, [state, detectUserIntent, extractContactInfo]);

  // Phase 2: LLM-powered response generation with intelligent fallback
  const generateLLMResponse = useCallback(async (
    userMessage: string, 
    analysis: UserIntent,
    fallbackResponse: string
  ): Promise<string> => {
    // Check if we should use LLM for this type of interaction
    const shouldUseLLM = llmSettings.enabled && 
      state.llmEnabled && 
      state.fallbackCount < llmSettings.fallbackAfterAttempts &&
      (
        (llmSettings.useForComplexQueries && advancedPatterns.complexQuestions.some(pattern => userMessage.toLowerCase().includes(pattern))) ||
        (analysis.intent === 'question' && analysis.confidence < intelligenceConfig.intentConfidence.medium) ||
        (analysis.sentiment === 'urgent' && llmSettings.useForComplexQueries) ||
        (advancedPatterns.comparisonQueries.some(pattern => userMessage.toLowerCase().includes(pattern)))
      ) &&
      // Don't use LLM for simple contact collection if disabled
      !(state.expectingResponse && !llmSettings.useForContactCollection) &&
      // Don't use LLM for greetings if disabled  
      !(analysis.intent === 'greeting' && !llmSettings.useForGreeting);

    if (!shouldUseLLM) {
      console.log('🔄 Using rule-based response (LLM conditions not met)');
      return fallbackResponse;
    }

    try {
      // Build LLM context
      const llmContext: LLMContext = {
        conversationHistory: state.conversationHistory,
        userInfo: {
          name: state.contactInfo.name,
          email: state.contactInfo.email,
          company: state.contactInfo.company_name,
          previousVisits: sessionMemoryRef.current.get('visitCount') || 0
        },
        conversationStage: state.conversationStage,
        servicesDiscussed: Array.from(state.servicesDiscussed),
        painPoints: Array.from(state.painPoints),
        sessionId: state.sessionId,
        timestamp: new Date()
      };

      console.log('🤖 Generating LLM response...');
      dispatch({ type: 'SET_LAST_LLM_CALL', payload: new Date() });

      const llmResponse: LLMResponse = await llmService.generateResponse(
        userMessage, 
        llmContext,
        fallbackResponse
      );

      // Update conversation quality based on LLM confidence
      if (llmResponse.confidence > intelligenceConfig.intentConfidence.high) {
        dispatch({ type: 'SET_CONVERSATION_QUALITY', payload: 0.9 });
      } else if (llmResponse.confidence > intelligenceConfig.intentConfidence.medium) {
        dispatch({ type: 'SET_CONVERSATION_QUALITY', payload: 0.7 });
      }

      if (llmResponse.fallbackUsed) {
        console.log('⚠️ LLM fallback used:', llmResponse.reasoning);
        dispatch({ type: 'INCREMENT_FALLBACK_COUNT' });
        return fallbackResponse;
      }

      console.log('✅ LLM response generated successfully');
      return llmResponse.content;

    } catch (error) {
      console.error('❌ LLM generation failed:', error);
      dispatch({ type: 'INCREMENT_FALLBACK_COUNT' });
      return fallbackResponse;
    }
  }, [state, detectUserIntent]);

  // Enhanced generateResponse with LLM integration
  const generateResponseWithLLM = useCallback(async (userMessage: string): Promise<string> => {
    const analysis = detectUserIntent(userMessage);
    const lowerMessage = userMessage.toLowerCase();

    // Update tracked data
    analysis.services.forEach(service => dispatch({ type: 'ADD_SERVICE_DISCUSSED', payload: service }));
    analysis.painPoints.forEach(painPoint => dispatch({ type: 'ADD_PAIN_POINT', payload: painPoint }));

    // Update user sentiment
    dispatch({ type: 'SET_USER_SENTIMENT', payload: analysis.sentiment });

    // Get rule-based response as fallback
    const ruleBasedResponse = generateResponse(userMessage);

    // Try LLM enhancement for complex interactions
    const finalResponse = await generateLLMResponse(userMessage, analysis, ruleBasedResponse);

    return finalResponse;
  }, [generateResponse, generateLLMResponse, detectUserIntent]);

  const handleNeedStatement = useCallback((userMessage: string, analysis: any): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('chatbot') || lowerMessage.includes('chat bot') || 
        lowerMessage.includes('chatbots') || lowerMessage.includes('chat bots') ||
        lowerMessage.includes('conversational ai') || lowerMessage.includes('virtual assistant')) {
      return responses.chatbotNeed;
    }
    
    if (analysis.services.includes('Digital Marketing')) {
      return "Perfect! We'd love to help you with that. What's your main goal - are you looking to get more website traffic, generate more leads, or increase sales from your current visitors?";
    }
    
    if (analysis.services.includes('Custom Software')) {
      return "Excellent! We can definitely build that for you. What kind of software are you thinking about - a web application, mobile app, or something to integrate with your existing systems?";
    }
    
    return "That sounds like something we can help with! Could you tell me a bit more about what you're looking for so I can point you in the right direction?";
  }, []);

  const handleQuestionIntent = useCallback((userMessage: string, analysis: any): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('case stud') || lowerMessage.includes('examples') || lowerMessage.includes('results')) {
      return responses.caseStudies;
    }
    
    if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('expensive') || lowerMessage.includes('budget')) {
      return responses.pricing;
    }
    
    if (lowerMessage.includes('anton osipov') || (lowerMessage.includes('anton') && (lowerMessage.includes('founder') || lowerMessage.includes('ceo')))) {
      return responses.antonInfo;
    }
    
    if (lowerMessage.includes('astrid') && (lowerMessage.includes('founder') || lowerMessage.includes('coo'))) {
      return responses.astridInfo;
    }
    
    if (analysis.services.includes('Digital Marketing')) {
      return "Our digital marketing approach is completely data-driven, leveraging Anton's decade of experience with companies like Google and Apple. We create AI-powered marketing systems that automatically optimize campaigns and personalize customer journeys. Most clients see a 200-400% improvement in campaign performance. What's your biggest challenge with your current marketing efforts?";
    }
    
    return responses.defaultQuestion;
  }, []);

  const handleInterestIntent = useCallback((): string => {
    if (!state.callToActionOffered && state.conversationStage !== 'contact_collection') {
      dispatch({ type: 'SET_CALL_TO_ACTION_OFFERED', payload: true });
      dispatch({ type: 'SET_CONVERSATION_STAGE', payload: 'contact_collection' });
      dispatch({ type: 'SET_EXPECTING_RESPONSE', payload: 'name' });
      const response = "Excellent! I'm excited to help you explore how we can transform your business with AI and automation. To get you connected with the right specialist and send you some relevant case studies, what's your name?";
      dispatch({ type: 'SET_LAST_QUESTION', payload: response });
      return response;
    } else if (state.conversationStage === 'contact_collection') {
      return "Perfect! I'll make sure our team reaches out to you soon with exactly what you need.";
    }
    return "That's great to hear! What specifically interests you most about our solutions?";
  }, [state.callToActionOffered, state.conversationStage]);

  const handleContactInfo = useCallback((userMessage: string): string => {
    const extractedContact = extractContactInfo(userMessage);
    dispatch({ type: 'SET_CONTACT_INFO', payload: extractedContact });
    
    if (extractedContact.name && extractedContact.email) {
      dispatch({ type: 'SET_CONVERSATION_STAGE', payload: 'closing' });
      return `Perfect, ${extractedContact.name.split(' ')[0]}! I have your email as ${extractedContact.email}. I'll send you those case studies right away and our team will reach out to discuss how we can help your business!`;
    } else if (extractedContact.email) {
      return `Thanks! I've got your email as ${extractedContact.email}. What's your name so I can personalize the information I send you?`;
    } else if (extractedContact.name) {
      return `Great to meet you, ${extractedContact.name.split(' ')[0]}! What's the best email to send you some relevant case studies?`;
    }
    
    return "Thanks for sharing that information! What else can I help you with?";
  }, [extractContactInfo]);

  const handleGeneralIntent = useCallback((userMessage: string, analysis: any): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('did you see') || lowerMessage.includes('what I told you') || lowerMessage.includes('already said')) {
      return "You're absolutely right - I should have acknowledged what you said earlier. Let me give you a proper response. What specifically can I help you with?";
    }
    
    if (analysis.painPoints.includes('Manual processes')) {
      return "Manual processes are exactly what we solve! Our AI-powered automation systems handle everything from data entry to complex business workflows. Most clients free up 30-40 hours per week. Would you like to see some case studies?";
    }
    
    if (analysis.services.includes('Digital Marketing')) {
      return "Digital marketing is one of our specialties! What's your main challenge with marketing right now?";
    }
    
    if (analysis.services.includes('Custom Software')) {
      return "Custom software development is one of our core services! What kind of solution are you thinking about?";
    }
    
    if (state.conversationStage === 'greeting') {
      dispatch({ type: 'SET_CONVERSATION_STAGE', payload: 'qualifying' });
      if (analysis.services.length > 0) {
        return "That sounds like something we can definitely help with! Tell me more about what you're looking for.";
      } else {
        return "Thanks for reaching out! What brings you here today?";
      }
    }
    
    return conversationalFollowUps[Math.floor(Math.random() * conversationalFollowUps.length)];
  }, [state.conversationStage]);

  const handleSendMessage = useCallback(async (inputValue: string) => {
    if (!inputValue.trim()) return;

    // Add user message
    addMessage(inputValue, 'user');
    
    // Phase 2: Add to conversation history
    dispatch({ type: 'ADD_TO_HISTORY', payload: { role: 'user', content: inputValue } });
    
    // Extract contact info if present
    const extractedContact = extractContactInfo(inputValue);
    const wasContactExtracted = Object.keys(extractedContact).length > 0;
    if (wasContactExtracted) {
      dispatch({ type: 'SET_CONTACT_INFO', payload: extractedContact });
    }
    
    try {
      // Phase 2: Use LLM-enhanced response generation
      let response = await generateResponseWithLLM(inputValue);
      
      // Only add acknowledgment if we're not in an expected response flow
      if (wasContactExtracted && !state.expectingResponse) {
        let acknowledgment = "";
        if (extractedContact.name && extractedContact.email) {
          acknowledgment = `Perfect, ${extractedContact.name.split(' ')[0]}! I have your email as ${extractedContact.email}. `;
          dispatch({ type: 'SET_CONVERSATION_STAGE', payload: 'closing' });
        } else if (extractedContact.email) {
          acknowledgment = `Thanks! I've got your email as ${extractedContact.email}. `;
          dispatch({ type: 'SET_CONVERSATION_STAGE', payload: 'closing' });
        } else if (extractedContact.company_name) {
          acknowledgment = `Thanks for sharing that you're with ${extractedContact.company_name}. `;
        }
        
        if (acknowledgment && !response.toLowerCase().includes('that\'s really interesting')) {
          response = acknowledgment + response;
        }
      }
      
      // Phase 2: Add bot response to history
      dispatch({ type: 'ADD_TO_HISTORY', payload: { role: 'assistant', content: response } });
      
      // Phase 2: Auto-save session context
      if (state.contactInfo.name || state.contactInfo.email) {
        sessionMemoryRef.current.set('lastUserInfo', {
          ...state.contactInfo,
          lastInteraction: new Date(),
          conversationStage: state.conversationStage
        });
      }
      
      addBotMessage(response);
      
    } catch (error) {
      console.error('❌ Error generating response:', error);
      // Fallback to rule-based response on error
      const fallbackResponse = generateResponse(inputValue);
      addBotMessage(fallbackResponse);
      dispatch({ type: 'ADD_TO_HISTORY', payload: { role: 'assistant', content: fallbackResponse } });
    }
  }, [addMessage, extractContactInfo, generateResponseWithLLM, generateResponse, state.expectingResponse, state.contactInfo, state.conversationStage, addBotMessage]);

  const generateSummary = useCallback((): ChatSummary => {
    const userMessages = state.messages.filter(m => m.sender === 'user').map(m => m.content).join(' ');
    const analysis = detectUserIntent(userMessages);
    
    return {
      interaction_date: new Date().toISOString().split('T')[0],
      contact_info: state.contactInfo,
      chat_summary: `User inquired about ${Array.from(state.servicesDiscussed).join(', ') || 'general business automation'} and expressed challenges with ${Array.from(state.painPoints).join(', ') || 'current business processes'}.`,
      services_discussed: Array.from(state.servicesDiscussed),
      key_pain_points: Array.from(state.painPoints),
      call_to_action_offered: state.callToActionOffered,
      next_step: state.callToActionOffered ? "Call to action offered" : "Continue nurturing",
      lead_qualification: analysis.qualification
    };
  }, [state, detectUserIntent]);

  const scheduleCall = useCallback(() => {
    dispatch({ type: 'SET_CALL_TO_ACTION_OFFERED', payload: true });
    window.open('https://calendly.com/daveenci/astrid', '_blank');
    addBotMessage("Perfect! I've opened our calendar for you. Astrid will be able to provide you with detailed insights about how we can help your business. Looking forward to speaking with you soon!");
  }, [addBotMessage]);

  const handleCloseChat = useCallback(async () => {
    if (state.messages.length > 2) {
      const summary = generateSummary();
      console.log('Chat Summary for Database:', JSON.stringify(summary, null, 2));
      
      // Phase 2: Save session data to localStorage
      try {
        const sessionData = {
          contactInfo: state.contactInfo,
          servicesDiscussed: Array.from(state.servicesDiscussed),
          painPoints: Array.from(state.painPoints),
          conversationStage: state.conversationStage,
          lastVisit: new Date().toISOString(),
          visitCount: sessionMemoryRef.current.get('visitCount') || 1,
          conversationQuality: state.conversationQuality,
          userSentiment: state.userSentiment
        };
        
        localStorage.setItem(sessionConfig.storageKey, JSON.stringify(sessionData));
        console.log('💾 Session data saved successfully');
      } catch (error) {
        console.warn('⚠️ Failed to save session data:', error);
      }

      // Phase 2: Store conversation context via LLM service
      try {
        const llmContext: LLMContext = {
          conversationHistory: state.conversationHistory,
          userInfo: {
            name: state.contactInfo.name,
            email: state.contactInfo.email,
            company: state.contactInfo.company_name,
            previousVisits: sessionMemoryRef.current.get('visitCount') || 1
          },
          conversationStage: state.conversationStage,
          servicesDiscussed: Array.from(state.servicesDiscussed),
          painPoints: Array.from(state.painPoints),
          sessionId: state.sessionId,
          timestamp: new Date()
        };
        
        await llmService.storeConversationContext(llmContext);
      } catch (error) {
        console.warn('⚠️ Failed to store LLM context:', error);
      }
      
      try {
        const apiUrl = import.meta.env.PROD 
          ? 'https://daveenci-ai-frontend.onrender.com' 
          : 'http://localhost:3001';
          
        const response = await fetch(`${apiUrl}/api/chat/summary`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(summary)
        });

        if (response.ok) {
          const result = await response.json();
          console.log('✅ Chat summary stored successfully:', result);
        } else {
          console.error('❌ Failed to store chat summary:', response.statusText);
        }
      } catch (error) {
        console.error('❌ Error storing chat summary:', error);
      }
    }
  }, [state.messages.length, state.contactInfo, state.servicesDiscussed, state.painPoints, state.conversationStage, state.conversationQuality, state.userSentiment, state.conversationHistory, state.sessionId, generateSummary]);

  return {
    // Phase 1: Core State
    messages: state.messages,
    isTyping: state.isTyping,
    contactInfo: state.contactInfo,
    conversationStage: state.conversationStage,
    servicesDiscussed: state.servicesDiscussed,
    painPoints: state.painPoints,
    callToActionOffered: state.callToActionOffered,
    lastQuestion: state.lastQuestion,
    expectingResponse: state.expectingResponse,
    
    // Phase 2: Enhanced State
    sessionId: state.sessionId,
    conversationHistory: state.conversationHistory,
    llmEnabled: state.llmEnabled,
    fallbackCount: state.fallbackCount,
    lastLLMCall: state.lastLLMCall,
    userSentiment: state.userSentiment,
    conversationQuality: state.conversationQuality,
    
    // Phase 1: Core Actions
    initializeChat,
    handleSendMessage,
    scheduleCall,
    handleCloseChat,
    
    // Phase 2: Enhanced Actions
    toggleLLM: useCallback(() => {
      dispatch({ type: 'SET_LLM_ENABLED', payload: !state.llmEnabled });
    }, [state.llmEnabled]),
    
    // Phase 1: Core Utils
    generateSummary,
    
    // Phase 2: Enhanced Utils
    getSessionMemory: useCallback(() => sessionMemoryRef.current, []),
    getLLMMetrics: useCallback(() => llmService.getMetrics(), []),
    resetSession: useCallback(() => {
      dispatch({ type: 'RESET_CHAT' });
      sessionMemoryRef.current.clear();
      localStorage.removeItem(sessionConfig.storageKey);
      llmService.resetSession();
    }, [])
  };
} 