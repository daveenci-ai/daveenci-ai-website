import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, X, Send, Bot, User, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  company_name: string;
}

interface ChatSummary {
  interaction_date: string;
  contact_info: ContactInfo;
  chat_summary: string;
  services_discussed: string[];
  key_pain_points: string[];
  call_to_action_offered: boolean;
  next_step: string;
  lead_qualification: 'Hot' | 'Warm' | 'Cold';
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: '',
    email: '',
    phone: '',
    company_name: ''
  });
  const [conversationStage, setConversationStage] = useState<'greeting' | 'qualifying' | 'service_discussion' | 'contact_collection' | 'closing'>('greeting');
  const [servicesDiscussed, setServicesDiscussed] = useState<Set<string>>(new Set());
  const [painPoints, setPainPoints] = useState<Set<string>>(new Set());
  const [callToActionOffered, setCallToActionOffered] = useState(false);
  const [lastQuestion, setLastQuestion] = useState<string>('');
  const [expectingResponse, setExpectingResponse] = useState<'name' | 'email' | 'company' | 'general' | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = "Hi! I'm Dave from DaVeenci. I can help you with AI automation, digital marketing, or custom software solutions. What can I help you with today?";
      setLastQuestion(greeting);
      setExpectingResponse('general');
      addBotMessage(greeting);
    }
  }, [isOpen]);

  const addMessage = (content: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addBotMessage = (content: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(content, 'bot');
    }, 1000 + Math.random() * 1000); // Simulate typing delay
  };

  const detectUserIntent = (message: string): {
    intent: 'greeting' | 'question' | 'clarification' | 'interest' | 'negative' | 'contact_info' | 'business_info' | 'general';
    services: string[];
    painPoints: string[];
    containsContact: boolean;
    qualification: 'Hot' | 'Warm' | 'Cold';
  } => {
    const lowerMessage = message.toLowerCase().trim();
    
    // Intent detection patterns
    const greetingPatterns = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'];
    const questionPatterns = ['what', 'how', 'where', 'when', 'why', 'can you', 'do you', 'tell me', '?'];
    const clarificationPatterns = ['what do you mean', 'i don\'t understand', 'what?', 'huh?', 'clarify', 'explain', 'sharing what', 'what are you talking about'];
    const interestPatterns = ['interested', 'sounds good', 'tell me more', 'yes', 'sure', 'okay', 'ok', 'i want'];
    const negativePatterns = ['no', 'not interested', 'don\'t want', 'stop', 'leave me alone', 'no thanks'];
    
    let intent: 'greeting' | 'question' | 'clarification' | 'interest' | 'negative' | 'contact_info' | 'business_info' | 'general' = 'general';
    
    // Check for greetings first (simple messages)
    if (lowerMessage.length < 20 && greetingPatterns.some(pattern => lowerMessage.includes(pattern))) {
      intent = 'greeting';
    }
    // Check for clarification requests
    else if (clarificationPatterns.some(pattern => lowerMessage.includes(pattern))) {
      intent = 'clarification';
    }
    // Check for questions
    else if (questionPatterns.some(pattern => lowerMessage.includes(pattern))) {
      intent = 'question';
    }
    // Check for interest signals
    else if (interestPatterns.some(pattern => lowerMessage.includes(pattern))) {
      intent = 'interest';
    }
    // Check for negative responses
    else if (negativePatterns.some(pattern => lowerMessage.includes(pattern))) {
      intent = 'negative';
    }
    // Check if providing contact info
    else if (extractContactInfo(lowerMessage).email || extractContactInfo(lowerMessage).name || extractContactInfo(lowerMessage).company_name) {
      intent = 'contact_info';
    }
    // Check if providing business info
    else if (lowerMessage.includes('company') || lowerMessage.includes('business') || lowerMessage.includes('industry') || lowerMessage.includes('work')) {
      intent = 'business_info';
    }
    
    const serviceKeywords = {
      'AI Automation': [
        // Original Keywords
        'ai', 'automation', 'automate', 'artificial intelligence', 'machine learning', 'ml', 'ai assistant', 'chatbot', 'assistant',
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

    const painPointKeywords = {
      'Manual processes': ['manual', 'time consuming', 'repetitive', 'tedious'],
      'Lead generation issues': ['leads', 'prospects', 'customers', 'acquisition'],
      'Marketing inefficiency': ['marketing', 'campaigns', 'roi', 'conversion'],
      'System integration problems': ['integration', 'systems', 'workflow', 'process'],
      'Cost concerns': ['expensive', 'cost', 'budget', 'price']
    };

    const services: string[] = [];
    const painPoints: string[] = [];

    // Detect services
    Object.entries(serviceKeywords).forEach(([service, keywords]) => {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        services.push(service);
      }
    });

    // Detect pain points
    Object.entries(painPointKeywords).forEach(([painPoint, keywords]) => {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        painPoints.push(painPoint);
      }
    });

    // Check for contact info
    const emailRegex = /[\w\.-]+@[\w\.-]+\.\w+/;
    const phoneRegex = /(\d{3}[-\.\s]??\d{3}[-\.\s]??\d{4}|\(\d{3}\)\s*\d{3}[-\.\s]??\d{4}|\d{3}[-\.\s]??\d{4})/;
    const containsContact = emailRegex.test(message) || phoneRegex.test(message);

    // Qualification logic
    let qualification: 'Hot' | 'Warm' | 'Cold' = 'Cold';
    if (services.length >= 2 || painPoints.length >= 2) {
      qualification = 'Hot';
    } else if (services.length >= 1 || painPoints.length >= 1) {
      qualification = 'Warm';
    }

    return { intent, services, painPoints, containsContact, qualification };
  };

  const generateResponse = (userMessage: string): string => {
    const analysis = detectUserIntent(userMessage);
    const lowerMessage = userMessage.toLowerCase();

    // FIRST: Handle expected responses based on conversation context
    if (expectingResponse) {
      // Handle negative responses
      if (analysis.intent === 'negative') {
        setExpectingResponse(null);
        return "No problem at all! Feel free to browse our website or ask me any questions about our services. I'm here to help whenever you're ready.";
      }

      if (expectingResponse === 'name' && !contactInfo.name) {
        const extractedName = extractContactInfo(userMessage).name;
        if (extractedName || (userMessage.trim().split(' ').length <= 3 && userMessage.trim().length > 1)) {
          setExpectingResponse('email');
          const name = extractedName || userMessage.trim();
          setContactInfo(prev => ({ ...prev, name }));
          return `Great to meet you, ${name.split(' ')[0]}! What's the best email address to send you those case studies?`;
        } else {
          return "I didn't catch your name. Could you please tell me what I should call you?";
        }
      }
      
      if (expectingResponse === 'email' && !contactInfo.email) {
        const extractedEmail = extractContactInfo(userMessage).email;
        if (extractedEmail) {
          setExpectingResponse('company');
          setContactInfo(prev => ({ ...prev, email: extractedEmail }));
          return `Perfect! I've got your email as ${extractedEmail}. And what company are you with so I can send you the most relevant case studies for your industry?`;
        } else {
          return "I didn't catch that email address. Could you please share your email again?";
        }
      }
      
      if (expectingResponse === 'company' && !contactInfo.company_name) {
        const extractedCompany = extractContactInfo(userMessage).company_name || userMessage.trim();
        if (extractedCompany && extractedCompany.length > 1) {
          setExpectingResponse(null);
          setContactInfo(prev => ({ ...prev, company_name: extractedCompany }));
          setCallToActionOffered(true);
          setConversationStage('closing');
          return `Excellent! Thanks ${contactInfo.name ? contactInfo.name.split(' ')[0] : 'for that'}, I'll send you some targeted case studies for ${extractedCompany}. Our team will also reach out within 24 hours to discuss how we can help streamline your operations. Would you prefer a call or email for the initial consultation?`;
        }
      }
    }

    // Handle different user intents with appropriate responses
    switch (analysis.intent) {
      case 'greeting':
        setExpectingResponse('general');
        setLastQuestion("How can I help you today?");
        return "Hi there! Great to meet you. I'm here to help you discover how AI and automation can elevate your business. How can I help you today?";
      
      case 'clarification':
        setExpectingResponse(null);
        return "My apologies! I may have gotten ahead of myself. Let me clarify - I'm here to help you learn about our AI and automation solutions. What would you like to know about our services?";
      
      case 'question':
        return handleQuestionIntent(userMessage, analysis);
      
      case 'interest':
        return handleInterestIntent(analysis);
      
      case 'negative':
        setExpectingResponse(null);
        return "No problem at all! If you change your mind or have any questions about our services, I'm here to help.";
      
      case 'contact_info':
        return handleContactInfo(userMessage);
      
      case 'business_info':
        return handleBusinessInfo(userMessage);
      
      default:
        return handleGeneralIntent(userMessage, analysis);
    }
  };

  const handleQuestionIntent = (userMessage: string, analysis: any): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Case studies question - provide value first!
    if (lowerMessage.includes('case stud') || lowerMessage.includes('examples') || lowerMessage.includes('results')) {
      return provideValueWithCaseStudies();
    }
    
    // Pricing questions
    if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('expensive') || lowerMessage.includes('budget')) {
      return "Great question! Our solutions typically provide 300-500% ROI - most clients save $50,000+ annually while dramatically improving efficiency. Pricing depends on your specific needs and scale. I'd love to have one of our specialists give you a personalized quote. Would you like to schedule a brief call to discuss your specific situation?";
    }
    
    // Founder questions
    if (lowerMessage.includes('anton osipov') || (lowerMessage.includes('anton') && (lowerMessage.includes('founder') || lowerMessage.includes('ceo')))) {
      return "Anton Osipov is our Co-Founder and CEO, a brilliant data scientist with over a decade of experience in Silicon Valley with tech giants like Google and Apple. He brings deep expertise in digital marketing trends and analytics. Would you like to schedule a call to speak with Anton directly about your business needs?";
    }
    
    if (lowerMessage.includes('astrid') && (lowerMessage.includes('founder') || lowerMessage.includes('coo'))) {
      return "Astrid Abrahamyan is our Co-Founder and COO, who focuses on creative solutions and relationship-building. She ensures that every solution we build aligns perfectly with your business goals and team dynamics. Would you like to discuss how we can tailor our approach to your specific business?";
    }
    
    // Service-specific questions
    if (analysis.services.includes('AI Automation')) {
      return "AI automation is one of our specialties! We transform businesses by creating intelligent solutions that operate 24/7. This includes predictive analytics, automated customer segmentation, and intelligent lead scoring. These solutions typically reduce manual work by 60-80% while improving accuracy. What specific processes in your business are taking up too much of your time?";
    }
    
    if (analysis.services.includes('Digital Marketing')) {
      return "Our digital marketing approach is completely data-driven, leveraging Anton's decade of experience with companies like Google and Apple. We create AI-powered marketing systems that automatically optimize campaigns and personalize customer journeys. Most clients see a 200-400% improvement in campaign performance. What's your biggest challenge with your current marketing efforts?";
    }
    
    // Default helpful response for questions
    return "I'd be happy to help answer that! Could you be a bit more specific about what you'd like to know? I can tell you about our services, share case studies, or discuss how we might help your specific business.";
  };

  const provideValueWithCaseStudies = (): string => {
    return "Absolutely! Here are some real results from our clients:\n\n📈 **FashionForward** (Retail): We automated their inventory management with AI, reducing stock errors by 30% and saving 25 hours/week.\n\n🚀 **TechStartup** (SaaS): Our marketing automation increased their lead conversion by 400% and reduced customer acquisition cost by 60%.\n\n💼 **ConsultingPro** (Services): We built custom workflow automation that freed up 40 hours/week of manual work.\n\nWhich industry are you in? I can share more specific examples that match your business!";
  };

  const handleInterestIntent = (analysis: any): string => {
    if (!callToActionOffered && conversationStage !== 'contact_collection') {
      setCallToActionOffered(true);
      setConversationStage('contact_collection');
      setExpectingResponse('name');
      const response = "Excellent! I'm excited to help you explore how we can transform your business with AI and automation. To get you connected with the right specialist and send you some relevant case studies, what's your name?";
      setLastQuestion(response);
      return response;
    } else if (conversationStage === 'contact_collection') {
      return "Perfect! I'll make sure our team reaches out to you soon with exactly what you need.";
    }
    return "That's great to hear! What specifically interests you most about our solutions?";
  };

  const handleContactInfo = (userMessage: string): string => {
    const extractedContact = extractContactInfo(userMessage);
    setContactInfo(prev => ({ ...prev, ...extractedContact }));
    
    if (extractedContact.name && extractedContact.email) {
      setConversationStage('closing');
      return `Perfect, ${extractedContact.name.split(' ')[0]}! I have your email as ${extractedContact.email}. I'll send you those case studies right away and our team will reach out to discuss how we can help your business!`;
    } else if (extractedContact.email) {
      return `Thanks! I've got your email as ${extractedContact.email}. What's your name so I can personalize the information I send you?`;
    } else if (extractedContact.name) {
      return `Great to meet you, ${extractedContact.name.split(' ')[0]}! What's the best email to send you some relevant case studies?`;
    }
    
    return "Thanks for sharing that information! What else can I help you with?";
  };

  const handleBusinessInfo = (userMessage: string): string => {
    return "That's helpful context! Based on your business, I can recommend specific solutions that would be most valuable. What are your biggest operational challenges right now?";
  };

  const handleGeneralIntent = (userMessage: string, analysis: any): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Update tracked data
    analysis.services.forEach((service: string) => setServicesDiscussed(prev => new Set([...prev, service])));
    analysis.painPoints.forEach((painPoint: string) => setPainPoints(prev => new Set([...prev, painPoint])));
    
    // Handle specific service requests
    if (lowerMessage.includes('need') || lowerMessage.includes('want') || lowerMessage.includes('looking for')) {
      if (analysis.services.includes('AI Automation')) {
        return "Perfect! AI assistants and chatbots are exactly what we specialize in. We build intelligent AI systems that can handle customer service, lead qualification, and much more. For example, we built an AI assistant for a client that handles 70% of their customer inquiries automatically. What specific features would you want your AI assistant to have?";
      }
      
      if (analysis.services.includes('Custom Software')) {
        return "Great! We build custom software solutions including websites with AI integration. We can create intelligent websites that adapt to user behavior and automate various processes. What specific functionality are you looking to add to your website?";
      }
      
      if (analysis.services.includes('Digital Marketing')) {
        return "Excellent! Our AI-powered marketing solutions help businesses increase conversions and reduce costs. We create systems that automatically optimize campaigns and personalize customer experiences. What's your current marketing setup like?";
      }
    }
    
    // Handle clarification requests better
    if (lowerMessage.includes('did you see') || lowerMessage.includes('what I told you') || lowerMessage.includes('already said')) {
      return "You're absolutely right - I should have acknowledged what you said! You mentioned needing an AI assistant for your website. That's exactly what we do! We build intelligent AI systems that can handle customer interactions, lead qualification, and provide 24/7 support. What specific tasks would you want your AI assistant to handle?";
    }
    
    // Pain point responses
    if (analysis.painPoints.includes('Manual processes')) {
      return "Manual processes are exactly what we solve! Our AI-powered automation systems handle everything from data entry to complex business workflows. Most clients free up 30-40 hours per week. I'd love to show you specific examples - would you like to see some case studies?";
    }
    
    // Service-specific responses
    if (analysis.services.length > 0) {
      if (analysis.services.includes('AI Automation')) {
        return "AI automation is perfect for your needs! We build intelligent systems that work 24/7. For websites, this could include AI chatbots, automated lead scoring, or intelligent content personalization. What specific automation are you most interested in?";
      }
      
      if (analysis.services.includes('Custom Software')) {
        return "Custom software development is one of our core services! We can build exactly what you need, whether it's integrating AI into your existing website or creating something completely new. What's your current setup like?";
      }
    }
    
    // Conversation flow based on stage
    if (conversationStage === 'greeting') {
      setConversationStage('qualifying');
      // Don't use generic script anymore - respond based on what they actually said
      if (analysis.services.length > 0 || lowerMessage.includes('need') || lowerMessage.includes('want')) {
        return "That sounds like something we can definitely help with! Tell me more about what you're looking for.";
      } else {
        setLastQuestion("What brings you here today?");
        return "Thanks for reaching out! What brings you here today? Are you looking for AI automation, marketing solutions, or custom software development?";
      }
    }
    
    // Engaging follow-up responses
    const responses = [
      "That's interesting! Tell me more about your situation.",
      "I can see how that would impact your business. What approaches have you tried so far?",
      "That makes sense. How are you currently handling that?",
      "Good point! What would an ideal solution look like for you?",
      "I understand. What's driving you to look for solutions now?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const extractContactInfo = (message: string): Partial<ContactInfo> => {
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
      /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)(?:\s|$)/,  // First Last name at start
      /(?:^|\.|!)\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)(?:\s|$)/,  // After punctuation
    ];

    for (const pattern of namePatterns) {
      const nameMatch = message.match(pattern);
      if (nameMatch && !contactInfo.name) {
        const potentialName = nameMatch[1].trim();
        const words = potentialName.split(' ').filter(w => w.length > 1);
        // Should be 2-4 words, reasonable length, avoid common non-names
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
      if (companyMatch && !contactInfo.company_name) {
        const potentialCompany = companyMatch[1].trim();
        // Exclude common non-company words and too generic terms
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
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addMessage(inputValue, 'user');
    
    // Extract contact info if present
    const extractedContact = extractContactInfo(inputValue);
    const wasContactExtracted = Object.keys(extractedContact).length > 0;
    setContactInfo(prev => ({ ...prev, ...extractedContact }));
    
    let response = generateResponse(inputValue);
    
    // Only add acknowledgment if we're not in an expected response flow
    if (wasContactExtracted && !expectingResponse) {
      let acknowledgment = "";
      if (extractedContact.name && extractedContact.email) {
        acknowledgment = `Perfect, ${extractedContact.name.split(' ')[0]}! I have your email as ${extractedContact.email}. `;
        setConversationStage('closing');
      } else if (extractedContact.email) {
        acknowledgment = `Thanks! I've got your email as ${extractedContact.email}. `;
        setConversationStage('closing');
      } else if (extractedContact.company_name) {
        acknowledgment = `Thanks for sharing that you're with ${extractedContact.company_name}. `;
      }
      
      if (acknowledgment && !response.toLowerCase().includes('that\'s really interesting')) {
        response = acknowledgment + response;
      }
    }
    
    addBotMessage(response);
    
    setInputValue('');
  };

  const generateSummary = (): ChatSummary => {
    const userMessages = messages.filter(m => m.sender === 'user').map(m => m.content).join(' ');
    const analysis = detectUserIntent(userMessages);
    
    return {
      interaction_date: new Date().toISOString().split('T')[0],
      contact_info: contactInfo,
      chat_summary: `User inquired about ${Array.from(servicesDiscussed).join(', ') || 'general business automation'} and expressed challenges with ${Array.from(painPoints).join(', ') || 'current business processes'}.`,
      services_discussed: Array.from(servicesDiscussed),
      key_pain_points: Array.from(painPoints),
      call_to_action_offered: callToActionOffered,
      next_step: callToActionOffered ? "Call to action offered" : "Continue nurturing",
      lead_qualification: analysis.qualification
    };
  };

  const handleCloseChat = async () => {
    if (messages.length > 2) { // If there was actual conversation
      const summary = generateSummary();
      console.log('Chat Summary for Database:', JSON.stringify(summary, null, 2));
      
      try {
        // Send to backend API
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
    setIsOpen(false);
  };

  const scheduleCall = () => {
    setCallToActionOffered(true);
    window.open('https://calendly.com/daveenci/astrid', '_blank');
    addBotMessage("Perfect! I've opened our calendar for you. Astrid will be able to provide you with detailed insights about how we can help your business. Looking forward to speaking with you soon!");
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white rounded-full w-16 h-16 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col">
      {/* Header */}
      <div className="bg-red-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 rounded-full p-2">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold">Dave</h3>
            <p className="text-sm opacity-90">DaVeenci AI Assistant</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCloseChat}
          className="text-white hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`rounded-full p-2 ${message.sender === 'user' ? 'bg-gray-200' : 'bg-red-100'}`}>
                {message.sender === 'user' ? (
                  <User className="h-4 w-4 text-gray-600" />
                ) : (
                  <Bot className="h-4 w-4 text-red-600" />
                )}
              </div>
              <Card className={`${message.sender === 'user' ? 'bg-red-600 text-white' : 'bg-gray-50'}`}>
                <CardContent className="p-3">
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2 max-w-[80%]">
              <div className="rounded-full p-2 bg-red-100">
                <Bot className="h-4 w-4 text-red-600" />
              </div>
              <Card className="bg-gray-50">
                <CardContent className="p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="p-2 border-t border-gray-100">
        <div className="flex space-x-2 mb-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={scheduleCall}
            className="flex-1 text-xs"
          >
            <Calendar className="h-3 w-3 mr-1" />
            Schedule Call
          </Button>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-red-600 hover:bg-red-700 text-white"
            disabled={!inputValue.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot; 