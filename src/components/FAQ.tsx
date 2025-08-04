import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqs = [
    {
      question: "How long does it actually take to implement these systems in a small business like mine?",
      answer: "Great question. Most of our clients start seeing results within the first 2–4 weeks depending on the scope. If it's just the CRM automation, we can launch in as little as one week. For full website systems or content automation, it's usually under a month. The goal is speed with support — we don't just drop a tool on you and walk away. We implement, train, and fine-tune together."
    },
    {
      question: "I'm not very tech-savvy. Can AI tools still help me, or is it too complicated?",
      answer: "Honestly? That's exactly who we build for. If it's too complicated, it's a bad system. We design dashboards that feel like you're texting a team member. You don't need to code, you don't need to write prompts. You just run your business, and the smart tools handle the rest."
    },
    {
      question: "Can you give a real example of how this saved time or made money for another client?",
      answer: "Absolutely. We worked with a local health clinic that was drowning in inbound leads. Their team spent 6+ hours/day answering repetitive emails. After we implemented smart inbox filtering and an AI auto-reply system, they cut that time by 70% — and increased appointment bookings by 22% in the first month. It's not magic — it's about letting tech do the repetitive stuff so your people can focus on the real work."
    },
    {
      question: "I already use a CRM—what's the difference between what I have and what you're offering?",
      answer: "Most CRMs are just databases. What we offer is an AI-augmented system that thinks. For example, instead of just logging a new lead, our system: Scores it instantly, Sends a tailored email or SMS, Books a call if they qualify, Tags it for follow-up. And the best part? You don't have to touch it — it all runs in the background."
    },
    {
      question: "Can automation make it feel too impersonal? I want my clients to feel like they're talking to me.",
      answer: "Totally valid concern. Our goal isn't to replace your personal touch — it's to amplify it. The messaging, the voice, the timing — all of it is based on your style, your tone, and your customer behavior. So when someone gets a message, it feels like it came from you — because it was designed that way."
    },
    {
      question: "I just got a new website—do I have to rebuild it from scratch to make it AI-powered?",
      answer: "Not necessarily. If your site has a solid foundation, we can usually upgrade it with smart tools — like forms, chatbots, and dynamic content — without touching the core design. But if your site is slow, outdated, or not mobile-ready, sometimes it's faster and more affordable to rebuild smart from the start. Either way, we tailor the solution to what you already have."
    },
    {
      question: "What's the difference between SEO and GEO, and do I need both?",
      answer: "Great question — and very timely. SEO is about ranking on Google. GEO — Generative Engine Optimization — is about being cited by AI tools like ChatGPT, Perplexity, or Gemini when they answer user questions. These AI engines don't care as much about keywords or backlinks — they care about relevance, freshness, and structured data. If you want to show up in both places, you need both — but the good news is: GEO is faster and cheaper to implement right now."
    },
    {
      question: "I don't have time to create content. Can AI really do it all for me?",
      answer: "Yes — and it's one of the fastest wins. You give us a topic or idea, we train the AI with your tone, and it creates weekly content, blog posts, captions, even short videos with your digital avatar. You stay in control, but you're no longer stuck staring at a blank screen. Most clients go from 1 post/month to 12+ posts/month in less than an hour a week."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section className="py-24 bg-white relative">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-grid"></div>
      
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