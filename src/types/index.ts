// Centralized type definitions for the application

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  company_name: string;
}

export interface ChatSummary {
  id?: number;
  interaction_date: string;
  contact_info: ContactInfo;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  company_name?: string;
  chat_summary: string;
  services_discussed: string[];
  key_pain_points: string[];
  call_to_action_offered: boolean;
  next_step: string;
  lead_qualification: 'Hot' | 'Warm' | 'Cold';
  created_at?: string;
}

export interface LLMContext {
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>;
  userInfo: {
    name?: string;
    email?: string;
    company?: string;
    previousVisits?: number;
  };
  conversationStage: string;
  servicesDiscussed: string[];
  painPoints: string[];
  sessionId: string;
  timestamp: Date;
}

export interface LLMResponse {
  content: string;
  confidence: number;
  fallbackUsed: boolean;
  reasoning?: string;
  suggestedActions?: string[];
}

export interface UseCase {
  id: number;
  title: string;
  slug: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  image_url: string;
  published_at: string;
  created_at: string;
  updated_at: string;
} 