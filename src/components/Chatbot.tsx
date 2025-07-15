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
      addBotMessage("Hello! I'm Dave, your AI assistant here at DaVeenci. I'm here to help you discover how AI and automation can elevate your business. To get started, could you tell me a bit about your business and what you're hoping to achieve?");
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

  const analyzeUserMessage = (message: string): {
    services: string[];
    painPoints: string[];
    containsContact: boolean;
    qualification: 'Hot' | 'Warm' | 'Cold';
  } => {
    const lowerMessage = message.toLowerCase();
    
    const serviceKeywords = {
      'AI Automation': ['ai', 'automation', 'automate', 'artificial intelligence', 'machine learning', 'ml'],
      'Digital Marketing': ['marketing', 'digital marketing', 'ads', 'advertising', 'campaigns', 'lead generation'],
      'Custom Software': ['software', 'custom software', 'development', 'application', 'app', 'platform'],
      'Systems Integration': ['integration', 'crm', 'systems', 'workflow', 'process']
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

    return { services, painPoints, containsContact, qualification };
  };

  const generateResponse = (userMessage: string): string => {
    const analysis = analyzeUserMessage(userMessage);
    const lowerMessage = userMessage.toLowerCase();

    // Update tracked data
    analysis.services.forEach(service => setServicesDiscussed(prev => new Set([...prev, service])));
    analysis.painPoints.forEach(painPoint => setPainPoints(prev => new Set([...prev, painPoint])));

    // Founder-specific responses
    if (lowerMessage.includes('anton') || lowerMessage.includes('founder') || lowerMessage.includes('ceo')) {
      return "Anton Osipov is our Co-Founder and CEO, a brilliant data scientist with over a decade of experience in Silicon Valley with tech giants like Google and Apple. He brings deep expertise in digital marketing trends and analytics. Anton's background in working with these industry leaders gives DaVeenci a unique edge in understanding how to scale AI solutions effectively. Would you like to schedule a call to speak with Anton directly about your business needs?";
    }

    if (lowerMessage.includes('astrid') || lowerMessage.includes('coo')) {
      return "Astrid Abrahamyan is our Co-Founder and COO, who focuses on creative solutions and relationship-building to ensure we take a truly client-centric approach. She ensures that every solution we build not only meets technical requirements but also aligns perfectly with your business goals and team dynamics. Astrid's expertise in operations and client relations makes sure your experience with DaVeenci is seamless. Would you like to discuss how we can tailor our approach to your specific business?";
    }

    // Service-specific responses
    if (analysis.services.includes('AI Automation')) {
      return "AI automation is one of our specialties! We transform businesses by creating intelligent solutions that operate 24/7. This includes predictive analytics for customer behavior, automated customer segmentation, and intelligent lead scoring systems. These solutions typically reduce manual work by 60-80% while improving accuracy and consistency. What specific processes in your business are taking up too much of your time right now?";
    }

    if (analysis.services.includes('Digital Marketing')) {
      return "Our digital marketing approach is completely data-driven, leveraging Anton's decade of experience with companies like Google and Apple. We create AI-powered marketing systems that automatically optimize campaigns, personalize customer journeys, and maximize ROI across all platforms. Most clients see a 200-400% improvement in campaign performance within the first few months. What's your biggest challenge with your current marketing efforts?";
    }

    if (analysis.services.includes('Custom Software')) {
      return "We specialize in building custom software solutions that replace expensive SaaS subscriptions and eliminate vendor lock-in. Our approach focuses on creating tools specifically for your business processes, whether it's internal productivity systems, client portals, or specialized applications. This typically saves businesses $50,000+ annually while providing exactly what they need. What kind of software tools is your business currently using that you'd like to optimize or replace?";
    }

    // Pain point responses
    if (analysis.painPoints.includes('Manual processes')) {
      return "Manual processes are definitely a major pain point for most businesses! That's exactly what we solve with our AI-powered automation systems. We can automate everything from data entry and customer communications to complex business workflows. Most of our clients free up 30-40 hours per week that they can redirect to growing their business. I'd love to show you some specific examples of automations we've built. Do you have 15 minutes next week for a quick demo call?";
    }

    // Unknown questions
    if (lowerMessage.includes('?') && !analysis.services.length && !analysis.painPoints.length) {
      return "That's an excellent question. I don't have the specific information on that right now, but I can connect you with a specialist on our team who can provide a detailed answer. Would you like to schedule a brief call? In the meantime, could you tell me more about your business and what you're hoping to achieve?";
    }

    // Qualifying questions based on stage
    if (conversationStage === 'greeting') {
      setConversationStage('qualifying');
      return "Thanks for sharing that! To better understand how we can help you, I'd love to know: What are some of the biggest challenges you're currently facing in your marketing efforts? And are you currently using any automation tools in your business?";
    }

    if (conversationStage === 'qualifying') {
      setConversationStage('service_discussion');
      if (analysis.qualification === 'Hot') {
        setCallToActionOffered(true);
        return "Based on what you've shared, it sounds like our AI-powered solutions could be a great fit for your business! We've helped companies in similar situations achieve remarkable results. I can schedule a no-obligation strategy call with one of our experts to explore this further and show you exactly how we'd approach your specific challenges. Do you have some time available next week?";
      } else {
        return "I understand your situation. These are common challenges that many businesses face, and there are definitely solutions available. To give you the most relevant recommendations, could you tell me what your approximate company size is and what industry you're in?";
      }
    }

    // Contact collection based on stage
    if (conversationStage === 'service_discussion' && !contactInfo.email && !contactInfo.name) {
      setConversationStage('contact_collection');
      return "That's really interesting! I can see how that would be important for your business. Our team has experience solving exactly these types of challenges with AI and automation. I'd love to send you a personalized case study showing how we've helped businesses like yours. What's your name and the best email address to send it to?";
    }

    if (conversationStage === 'contact_collection' && (!contactInfo.name || !contactInfo.company_name)) {
      if (!contactInfo.name) {
        return "Thanks! And what's your name so I can personalize the information for you?";
      }
      if (!contactInfo.company_name) {
        return `Nice to meet you${contactInfo.name ? `, ${contactInfo.name.split(' ')[0]}` : ''}! What's the name of your company so I can find the most relevant case studies for your industry?`;
      }
    }

    // Default response
    return "That's really helpful information! Based on what you've shared, I think our team could definitely help you achieve your goals. Would you like to schedule a quick 15-minute call to discuss your specific situation in more detail?";
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

    // Extract name patterns
    const namePatterns = [
      /(?:my name is|i'm|i am|call me)\s+([a-zA-Z\s]{2,30})/i,
      /(?:^|\.|!)?\s*([A-Z][a-z]+ [A-Z][a-z]+)/,  // First Last name pattern
    ];

    for (const pattern of namePatterns) {
      const nameMatch = message.match(pattern);
      if (nameMatch && !contactInfo.name) {
        const potentialName = nameMatch[1].trim();
        // Basic validation - should be 2-4 words, reasonable length
        if (potentialName.split(' ').length <= 4 && potentialName.length <= 50) {
          extracted.name = potentialName;
          break;
        }
      }
    }

    // Extract company patterns
    const companyPatterns = [
      /(?:company is|work at|i work for|from|at)\s+([a-zA-Z0-9\s&.,'-]{2,50})/i,
      /([A-Z][a-zA-Z0-9\s&.,'-]{1,49})(?:\s+(?:inc|corp|corporation|llc|ltd|company|co)\.?)/i,
    ];

    for (const pattern of companyPatterns) {
      const companyMatch = message.match(pattern);
      if (companyMatch && !contactInfo.company_name) {
        const potentialCompany = companyMatch[1].trim();
        // Exclude common non-company words
        const excludeWords = ['google', 'facebook', 'microsoft', 'apple', 'the', 'and', 'or', 'but', 'business', 'customer'];
        if (!excludeWords.some(word => potentialCompany.toLowerCase().includes(word)) && potentialCompany.length >= 2) {
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
    
    // Add acknowledgment if contact info was captured
    if (wasContactExtracted) {
      let acknowledgment = "";
      if (extractedContact.name && extractedContact.email) {
        acknowledgment = `Perfect, ${extractedContact.name.split(' ')[0]}! I have your email as ${extractedContact.email}. `;
      } else if (extractedContact.name) {
        acknowledgment = `Great to meet you, ${extractedContact.name.split(' ')[0]}! `;
      } else if (extractedContact.email) {
        acknowledgment = `Thanks! I've got your email as ${extractedContact.email}. `;
      } else if (extractedContact.company_name) {
        acknowledgment = `Thanks for sharing that you're with ${extractedContact.company_name}. `;
      }
      
      if (acknowledgment) {
        response = acknowledgment + response;
      }
    }
    
    addBotMessage(response);
    
    setInputValue('');
  };

  const generateSummary = (): ChatSummary => {
    const userMessages = messages.filter(m => m.sender === 'user').map(m => m.content).join(' ');
    const analysis = analyzeUserMessage(userMessages);
    
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
          
          toast({
            title: "Thanks for chatting!",
            description: "Our team will review your conversation and get back to you soon.",
          });
        } else {
          console.error('❌ Failed to store chat summary:', response.statusText);
          
          toast({
            title: "Chat logged locally",
            description: "We've saved your conversation details for follow-up.",
          });
        }
      } catch (error) {
        console.error('❌ Error storing chat summary:', error);
        
        toast({
          title: "Chat logged locally",
          description: "We've saved your conversation details for follow-up.",
        });
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