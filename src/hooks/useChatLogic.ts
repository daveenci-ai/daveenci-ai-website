import { useReducer, useEffect, useCallback, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  fallbackResponses,
  companyInfo,
  llmSettings,
  sessionConfig
} from '@/config/chatbot.config';
import llmService, { type LLMContext, type LLMResponse } from '@/services/llmService';

// Types
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatState {
  messages: Message[];
  isTyping: boolean;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    company_name: string;
  };
  conversationStage: 'greeting' | 'qualifying' | 'service_discussion' | 'contact_collection' | 'closing';
  servicesDiscussed: Set<string>;
  painPoints: Set<string>;
  callToActionOffered: boolean;
  sessionId: string;
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>;
  llmEnabled: boolean;
  fallbackCount: number;
  lastLLMCall: Date | null;
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

type ChatAction = 
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'SET_CONTACT_INFO'; payload: Partial<ContactInfo> }
  | { type: 'SET_CONVERSATION_STAGE'; payload: ChatState['conversationStage'] }
  | { type: 'ADD_SERVICE_DISCUSSED'; payload: string }
  | { type: 'ADD_PAIN_POINT'; payload: string }
  | { type: 'SET_CALL_TO_ACTION_OFFERED'; payload: boolean }
  | { type: 'RESET_CHAT' }
  | { type: 'ADD_TO_HISTORY'; payload: { role: 'user' | 'assistant'; content: string } }
  | { type: 'SET_LLM_ENABLED'; payload: boolean }
  | { type: 'INCREMENT_FALLBACK_COUNT' }
  | { type: 'SET_LAST_LLM_CALL'; payload: Date }
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
  sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  conversationHistory: [],
  llmEnabled: llmSettings.enabled,
  fallbackCount: 0,
  lastLLMCall: null
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
    case 'RESET_CHAT':
      return { ...initialState, sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` };
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
    case 'LOAD_SESSION':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function useChatLogic() {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const { toast } = useToast();
  const sessionMemoryRef = useRef<Map<string, any>>(new Map());

  // Initialize chat with session management
  const initializeChat = useCallback(async () => {
    if (state.messages.length === 0) {
      // Load session memory
      try {
        const sessionData = localStorage.getItem(sessionConfig.storageKey);
        if (sessionData && sessionConfig.crossSessionMemory) {
          const parsedSession = JSON.parse(sessionData);
          const daysSinceLastVisit = parsedSession.lastVisit ? 
            (Date.now() - new Date(parsedSession.lastVisit).getTime()) / (1000 * 60 * 60 * 24) : 999;
          
          if (daysSinceLastVisit <= sessionConfig.contextRetentionDays) {
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
        const greeting = fallbackResponses.greeting;
        addBotMessage(greeting);
        dispatch({ type: 'ADD_TO_HISTORY', payload: { role: 'assistant', content: greeting } });
      }

      llmService.resetSession();
    }
  }, [state.messages.length, state.contactInfo]);

  // Save user name to localStorage when captured
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
    }, 1000 + Math.random() * 1000);
  }, [addMessage]);

  // Simple contact extraction
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

    // Simple name extraction
    const namePatterns = [
      /(?:my name is|i'm|i am|call me|this is|name's)\s+([a-zA-Z\s]{2,40})/i,
      /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)(?:\s|$)/,
    ];

    for (const pattern of namePatterns) {
      const nameMatch = message.match(pattern);
      if (nameMatch && !state.contactInfo.name) {
        const potentialName = nameMatch[1].trim();
        const words = potentialName.split(' ').filter(w => w.length > 1);
        if (words.length >= 2 && words.length <= 4 && potentialName.length <= 50) {
          extracted.name = potentialName;
          break;
        }
      }
    }

    // Simple company extraction
    const companyPatterns = [
      /(?:company is|work at|i work for|from|at|with)\s+([a-zA-Z0-9\s&.,'-]{2,50})/i,
      /(?:company|business|startup|firm):\s*([a-zA-Z0-9\s&.,'-]{2,50})/i,
    ];

    for (const pattern of companyPatterns) {
      const companyMatch = message.match(pattern);
      if (companyMatch && !state.contactInfo.company_name) {
        const potentialCompany = companyMatch[1].trim();
        if (potentialCompany.length >= 2) {
          extracted.company_name = potentialCompany;
          break;
        }
      }
    }
    
    return extracted;
  }, [state.contactInfo.name, state.contactInfo.company_name]);

  // Main message handler - uses LLM for everything
  const handleSendMessage = useCallback(async (inputValue: string) => {
    if (!inputValue.trim()) return;

    // Add user message
    addMessage(inputValue, 'user');
    dispatch({ type: 'ADD_TO_HISTORY', payload: { role: 'user', content: inputValue } });
    
    // Extract contact info if present
    const extractedContact = extractContactInfo(inputValue);
    if (Object.keys(extractedContact).length > 0) {
      dispatch({ type: 'SET_CONTACT_INFO', payload: extractedContact });
    }
    
    try {
      // Always try LLM first
      const shouldUseLLM = llmSettings.enabled && 
        state.llmEnabled && 
        state.fallbackCount < llmSettings.fallbackAfterAttempts;

      let response = '';

      if (shouldUseLLM) {
        console.log('🤖 Generating LLM response...');
        dispatch({ type: 'SET_LAST_LLM_CALL', payload: new Date() });

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

        const llmResponse: LLMResponse = await llmService.generateResponse(
          inputValue, 
          llmContext,
          fallbackResponses.default
        );

        if (llmResponse.fallbackUsed) {
          console.log('⚠️ LLM fallback used:', llmResponse.reasoning);
          dispatch({ type: 'INCREMENT_FALLBACK_COUNT' });
          response = llmResponse.content;
        } else {
          console.log('✅ LLM response generated successfully');
          response = llmResponse.content;
        }
      } else {
        console.log('🔄 Using fallback response (LLM disabled or failed too many times)');
        response = fallbackResponses.default;
      }

      dispatch({ type: 'ADD_TO_HISTORY', payload: { role: 'assistant', content: response } });
      addBotMessage(response);
      
    } catch (error) {
      console.error('❌ Error generating response:', error);
      const errorResponse = fallbackResponses.error;
      addBotMessage(errorResponse);
      dispatch({ type: 'ADD_TO_HISTORY', payload: { role: 'assistant', content: errorResponse } });
      dispatch({ type: 'INCREMENT_FALLBACK_COUNT' });
    }
  }, [addMessage, extractContactInfo, state, addBotMessage]);

  const generateSummary = useCallback((): ChatSummary => {
    return {
      interaction_date: new Date().toISOString().split('T')[0],
      contact_info: state.contactInfo,
      chat_summary: `User engaged with AI assistant about ${Array.from(state.servicesDiscussed).join(', ') || 'general business solutions'}.`,
      services_discussed: Array.from(state.servicesDiscussed),
      key_pain_points: Array.from(state.painPoints),
      call_to_action_offered: state.callToActionOffered,
      next_step: state.callToActionOffered ? "Call to action offered" : "Continue nurturing",
      lead_qualification: 'Warm'
    };
  }, [state]);

  const scheduleCall = useCallback(() => {
    dispatch({ type: 'SET_CALL_TO_ACTION_OFFERED', payload: true });
    window.open('https://calendly.com/daveenci/astrid', '_blank');
    addBotMessage("Perfect! I've opened our calendar for you. Astrid will be able to provide you with detailed insights about how we can help your business. Looking forward to speaking with you soon!");
  }, [addBotMessage]);

  const handleCloseChat = useCallback(async () => {
    if (state.messages.length > 2) {
      const summary = generateSummary();
      
      // Save session data
      try {
        const sessionData = {
          contactInfo: state.contactInfo,
          servicesDiscussed: Array.from(state.servicesDiscussed),
          painPoints: Array.from(state.painPoints),
          conversationStage: state.conversationStage,
          lastVisit: new Date().toISOString(),
          visitCount: sessionMemoryRef.current.get('visitCount') || 1
        };
        
        localStorage.setItem(sessionConfig.storageKey, JSON.stringify(sessionData));
      } catch (error) {
        console.warn('⚠️ Failed to save session data:', error);
      }

      // Store conversation context
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
      
      // Send to backend
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
          console.log('✅ Chat summary stored successfully');
        }
      } catch (error) {
        console.error('❌ Error storing chat summary:', error);
      }
    }
  }, [state, generateSummary]);

  return {
    // State
    messages: state.messages,
    isTyping: state.isTyping,
    contactInfo: state.contactInfo,
    conversationStage: state.conversationStage,
    servicesDiscussed: state.servicesDiscussed,
    painPoints: state.painPoints,
    callToActionOffered: state.callToActionOffered,
    sessionId: state.sessionId,
    conversationHistory: state.conversationHistory,
    llmEnabled: state.llmEnabled,
    fallbackCount: state.fallbackCount,
    lastLLMCall: state.lastLLMCall,
    
    // Actions
    initializeChat,
    handleSendMessage,
    scheduleCall,
    handleCloseChat,
    generateSummary,
    
    // Utils
    toggleLLM: useCallback(() => {
      dispatch({ type: 'SET_LLM_ENABLED', payload: !state.llmEnabled });
    }, [state.llmEnabled]),
    
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