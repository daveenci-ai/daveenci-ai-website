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
      setCallToActionOffered(true);
      return "Anton Osipov is our Co-Founder and CEO, a brilliant data scientist with over a decade of experience in Silicon Valley with tech giants like Google and Apple. He brings deep expertise in digital marketing trends and analytics. Anton's background in working with these industry leaders gives DaVeenci a unique edge in understanding how to scale AI solutions effectively. Would you like to schedule a call to speak with Anton directly about your business needs?";
    }

    if (lowerMessage.includes('astrid') || lowerMessage.includes('coo')) {
      setCallToActionOffered(true);
      return "Astrid Abrahamyan is our Co-Founder and COO, who focuses on creative solutions and relationship-building to ensure we take a truly client-centric approach. She ensures that every solution we build not only meets technical requirements but also aligns perfectly with your business goals and team dynamics. Astrid's expertise in operations and client relations makes sure your experience with DaVeenci is seamless. Would you like to discuss how we can tailor our approach to your specific business?";
    }

    // Service-specific responses
    if (analysis.services.includes('AI Automation')) {
      if (conversationStage === 'greeting') setConversationStage('qualifying');
      return "AI automation is one of our specialties! We transform businesses by creating intelligent solutions that operate 24/7. This includes predictive analytics for customer behavior, automated customer segmentation, and intelligent lead scoring systems. These solutions typically reduce manual work by 60-80% while improving accuracy and consistency. What specific processes in your business are taking up too much of your time right now?";
    }

    if (analysis.services.includes('Digital Marketing')) {
      if (conversationStage === 'greeting') setConversationStage('qualifying');
      return "Our digital marketing approach is completely data-driven, leveraging Anton's decade of experience with companies like Google and Apple. We create AI-powered marketing systems that automatically optimize campaigns, personalize customer journeys, and maximize ROI across all platforms. Most clients see a 200-400% improvement in campaign performance within the first few months. What's your biggest challenge with your current marketing efforts?";
    }

    if (analysis.services.includes('Custom Software')) {
      if (conversationStage === 'greeting') setConversationStage('qualifying');
      return "We specialize in building custom software solutions that replace expensive SaaS subscriptions and eliminate vendor lock-in. Our approach focuses on creating tools specifically for your business processes, whether it's internal productivity systems, client portals, or specialized applications. This typically saves businesses $50,000+ annually while providing exactly what they need. What kind of software tools is your business currently using that you'd like to optimize or replace?";
    }

    // Pain point responses with call to action
    if (analysis.painPoints.includes('Manual processes')) {
      setCallToActionOffered(true);
      setConversationStage('service_discussion');
      return "Manual processes are definitely a major pain point for most businesses! That's exactly what we solve with our AI-powered automation systems. We can automate everything from data entry and customer communications to complex business workflows. Most of our clients free up 30-40 hours per week that they can redirect to growing their business. I'd love to show you some specific examples of automations we've built. Do you have 15 minutes next week for a quick demo call?";
    }

    // Handle responses that indicate interest but aren't specific
    if (lowerMessage.includes('interested') || lowerMessage.includes('sounds good') || lowerMessage.includes('yes') || lowerMessage.includes('sure')) {
      if (!callToActionOffered) {
        setCallToActionOffered(true);
        setConversationStage('contact_collection');
        return "Excellent! I'm excited to help you explore how we can transform your business with AI and automation. To get you connected with the right specialist and send you some relevant case studies, what's your name and email address?";
      } else {
        return "Perfect! I'll make sure our team reaches out to you soon. In the meantime, feel free to ask me any other questions about our services or check out our case studies on the website.";
      }
    }

    // Handle pricing questions
    if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('expensive') || lowerMessage.includes('budget')) {
      setCallToActionOffered(true);
      return "Great question! Our solutions are designed to provide significant ROI - most clients save $50,000+ annually while dramatically improving efficiency. Pricing depends on your specific needs and scale. I'd love to have one of our specialists give you a personalized quote based on your requirements. Would you like to schedule a brief call to discuss your specific situation?";
    }

    // Unknown questions
    if (lowerMessage.includes('?') && !analysis.services.length && !analysis.painPoints.length) {
      return "That's an excellent question. I don't have the specific information on that right now, but I can connect you with a specialist on our team who can provide a detailed answer. Would you like to schedule a brief call? In the meantime, could you tell me more about your business and what you're hoping to achieve?";
    }

    // Conversation flow based on stage and content
    if (conversationStage === 'greeting') {
      setConversationStage('qualifying');
      return "Thanks for sharing that! To better understand how we can help you, I'd love to know: What are some of the biggest challenges you're currently facing in your business? Are there any repetitive tasks that are taking up too much of your team's time?";
    }

    if (conversationStage === 'qualifying' && messages.length > 3) {
      setConversationStage('service_discussion');
      if (analysis.qualification === 'Hot' || servicesDiscussed.size > 0 || painPoints.size > 0) {
        setCallToActionOffered(true);
        return "Based on what you've shared, it sounds like our AI-powered solutions could be a great fit for your business! We've helped companies in similar situations achieve remarkable results. I can schedule a no-obligation strategy call with one of our experts to explore this further and show you exactly how we'd approach your specific challenges. Do you have some time available next week?";
      } else {
        return "I understand your situation. Many businesses face similar challenges, and there are definitely solutions available. To give you the most relevant recommendations, could you tell me a bit more about your industry or what type of business you run?";
      }
    }

    // More natural contact collection
    if (conversationStage === 'service_discussion' && messages.length > 5 && !contactInfo.email) {
      setConversationStage('contact_collection');
      return "I can see this conversation is really valuable! I'd love to send you some specific case studies and resources that would be perfect for your situation. What's the best email address to send those to? And what should I call you?";
    }

    // Default responses that keep the conversation flowing
    const responses = [
      "That's really interesting! Tell me more about that.",
      "I can definitely see how that would be important for your business. What's been your biggest challenge with that?",
      "That makes a lot of sense. How are you currently handling that process?",
      "Great point! What would an ideal solution look like for you?",
      "I understand. What prompted you to start looking for a solution now?",
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
    
    // Add natural acknowledgment if contact info was captured
    if (wasContactExtracted) {
      let acknowledgment = "";
      if (extractedContact.name && extractedContact.email) {
        acknowledgment = `Perfect, ${extractedContact.name.split(' ')[0]}! I have your email as ${extractedContact.email}. `;
        setConversationStage('closing');
      } else if (extractedContact.name) {
        acknowledgment = `Great to meet you, ${extractedContact.name.split(' ')[0]}! `;
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