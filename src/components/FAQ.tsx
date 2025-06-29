import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is DaVeenci?",
      answer: "DaVeenci is a specialized service company that builds AI-powered marketing systems and automations for businesses. We create custom solutions that help you generate leads, nurture prospects, and grow your business while you focus on what you do best."
    },
    {
      question: "Do I need technical experience to work with DaVeenci?",
      answer: "Not at all! That's the whole point of our service. We handle all the technical aspects - from AI implementation to system integration. You simply tell us your business goals and we build the marketing automation systems for you."
    },
    {
      question: "What types of marketing systems can DaVeenci build?",
      answer: "We can build lead generation systems, email marketing automations, client portals, internal productivity tools, CRM integrations, content creation workflows, analytics dashboards, and custom marketing applications tailored to your specific business needs."
    },
    {
      question: "How does the process work?",
      answer: "We start with a strategy call to understand your business and goals. Then we design and build your custom marketing systems, integrate them with your existing tools, test everything thoroughly, and provide training and ongoing support."
    },
    {
      question: "How long does it take to implement a marketing automation system?",
      answer: "Timeline varies based on complexity, but most projects are completed within 2-8 weeks. Simple automations can be ready in days, while comprehensive marketing systems may take several weeks to perfect."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We provide complete end-to-end support including initial consultation, custom development, system integration, testing, training, and ongoing maintenance. We're your dedicated AI marketing automation team."
    },
    {
      question: "How much does it cost?",
      answer: "Our pricing varies based on project scope and complexity. We offer both one-time project rates and ongoing service packages. Contact us for a personalized quote based on your specific needs and goals."
    },
    {
      question: "Can you integrate with our existing tools?",
      answer: "Yes! We specialize in integrating AI-powered marketing systems with your existing CRM, email platforms, websites, databases, and other business tools to create seamless automated workflows."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section className="py-24 bg-white relative">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-grid-subtle"></div>
      
      <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Got questions? We've got answers. If you can't find what you're looking for, feel free to contact our team.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl border border-gray-200 hover:border-red-200 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-2xl"
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  {openItem === index ? (
                    <ChevronUp className="w-5 h-5 text-red-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </button>
              
              {openItem === index && (
                <div className="px-8 pb-6">
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Still have questions? We're here to help.
          </p>
          <button 
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-red-500/25"
            onClick={() => window.open('https://calendly.com/daveenci/astrid', '_blank')}
          >
            Contact Our Team
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ; 