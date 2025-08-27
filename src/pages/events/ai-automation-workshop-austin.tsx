import React, { useState, useEffect } from 'react';

// Declare Stripe buy button custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-buy-button': {
        'buy-button-id': string;
        'publishable-key': string;
      };
    }
  }
}
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock, Target, User, Settings, BookOpen, Globe } from 'lucide-react';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { apiConfig } from '@/config/api';
import FAQ from '@/components/FAQ';

const AIAutomationWorkshopAustin = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });



  // Countdown timer logic and Stripe buy button script loading
  useEffect(() => {
    document.title = 'AI for Business, Part 1: The Future of Content | DaVeenci';
    const targetDate = new Date('2025-09-04T11:30:00-05:00'); // Sept 4, 2025, 11:30 AM CT

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    // Load Stripe buy button script
    if (!document.querySelector('script[src="https://js.stripe.com/v3/buy-button.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/buy-button.js';
      script.async = true;
      document.head.appendChild(script);
    }

    return () => clearInterval(timer);
  }, []);



  const [isSubmitting, setIsSubmitting] = useState(false);


  const [isSyllabusOpen, setIsSyllabusOpen] = useState(false);
  const [leadEmail, setLeadEmail] = useState('');

  const [leadStatus, setLeadStatus] = useState<string | null>(null);






  const submitLead = async () => {
    setIsSubmitting(true);
    setLeadStatus(null);
    try {
      const r = await fetch(`${apiConfig.baseUrl}/api/workshop/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: leadEmail })
      });
      if (r.ok) {
        setLeadStatus('Syllabus sent! Check your email.');
      } else {
        setLeadStatus('Could not send syllabus. Please try again.');
      }
    } catch {
      setLeadStatus('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  //

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {/* Site-wide banner under header only on this page */}
      <div className="w-full bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-2 md:gap-4 text-[13px] md:text-sm">
          <span className="font-semibold tracking-tight">AI for Business, Part 1: The Future of Content — Austin</span>
          <span className="opacity-90 hidden sm:inline">•</span>
          <span className="opacity-90">Sept 4, 2025 • 11:30 AM CT</span>
          <Button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="ml-auto inline-flex items-center rounded-full bg-white text-red-700 hover:bg-white/90 px-3 py-1 font-semibold shadow-sm transition-colors">
            Get tickets
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="absolute inset-0 bg-grid"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Pre-Header Announcement */}
            <div className="lg:col-span-1 order-2 lg:order-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] md:text-xs font-semibold mb-3 bg-gray-100 text-gray-800 border border-gray-200 shadow-sm">
                <Clock className="w-3.5 h-3.5" />
                <span>Next‑Generation Digital Strategy</span>
              </div>

            {/* Main Headline */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900 leading-tight mb-4 md:mb-6">
                AI for Business, Part 1: <br className="hidden sm:block" /><span className="text-red-600">The Future of Content</span>
              </h1>

            {/* Sub-Headline */}
              <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-4 sm:mb-5">
                Discover how AI is transforming content creation and business operations. Learn practical strategies to leverage AI tools for enhanced productivity and competitive advantage.
              </p>

              {/* Chips */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5 justify-center lg:justify-start">
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-red-100 text-red-800 border border-red-200 text-[10px] sm:text-xs shadow-sm font-semibold"><span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-600"></span>AI Content Strategy</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-200 text-[10px] sm:text-xs shadow-sm font-semibold"><span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500"></span>Business Automation</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-200 text-[10px] sm:text-xs shadow-sm font-semibold"><span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500"></span>AI Tools Mastery</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-200 text-[10px] sm:text-xs shadow-sm font-semibold"><span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500"></span>Content Optimization</span>
              </div>

              {/* Countdown Timer */}
              <div className="flex lg:justify-start justify-center space-x-1.5 sm:space-x-2 md:space-x-4 mb-6 md:mb-8">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center bg-white rounded-lg shadow-md p-2 sm:p-3 md:p-4 min-w-[50px] sm:min-w-[60px] md:min-w-[80px]">
                  <div className="text-lg sm:text-xl md:text-3xl font-bold text-gray-900">{value.toString().padStart(2, '0')}</div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-gray-600 capitalize">{unit}</div>
                </div>
              ))}
            </div>

              {/* Live/Trust badges */}
              <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-1.5 sm:gap-2 md:gap-3 mb-6 md:mb-8">
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs md:text-sm px-2.5 sm:px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 font-medium">🔴 Live online event</span>
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs md:text-sm px-2.5 sm:px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200 font-medium">🎥 Recording included</span>
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs md:text-sm px-2.5 sm:px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium">🧰 Templates provided</span>
              </div>

              {/* Primary + Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-3 md:gap-4 mb-4 sm:mb-6">
              <Button
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-5 sm:px-6 md:px-8 py-3 md:py-4 bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base md:text-lg font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Master AI for Content
                <ArrowRight className="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsSyllabusOpen(true)}
                className="w-full sm:w-auto px-5 sm:px-6 md:px-8 py-3 md:py-4 border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 text-sm sm:text-base md:text-lg font-semibold rounded-xl shadow-sm"
              >
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" /> Get Workshop Syllabus
              </Button>
              </div>

              

              {/* Event Perks */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap lg:justify-start justify-center items-center gap-2 sm:gap-3 text-gray-700 text-xs sm:text-sm md:text-base">
                <div className="inline-flex items-center gap-1.5 sm:gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>Live online workshop</div>
                <div className="hidden sm:block text-gray-300">•</div>
                <div className="inline-flex items-center gap-1.5 sm:gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Recording included</div>
                <div className="hidden sm:block text-gray-300">•</div>
                <div className="inline-flex items-center gap-1.5 sm:gap-2"><span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>Interactive Q&A</div>
              </div>
            </div>

            {/* Right visual */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                <img src="https://picsum.photos/seed/aeo/800/800" alt="Workshop preview" className="w-full h-auto aspect-square object-cover" />
                <div className="absolute top-3 right-3 text-[11px] bg-red-600 text-white px-3 py-1 rounded-full shadow">🔥 Trending</div>
                <div className="absolute bottom-4 left-4 bg-white text-gray-900 px-4 py-2 rounded-xl shadow">
                  <div className="text-sm font-semibold">Beyond SEO</div>
                  <div className="text-[11px] text-gray-600 -mt-0.5">AI‑First Approach</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Master (and Take Home) */}
      <section className="py-16 md:py-20 lg:py-24 bg-white border-t-2 border-gray-100 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50/30"></div>
        <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Master AI for Business: <span className="text-red-600">Transform Your Content Strategy</span></h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-2 max-w-3xl mx-auto">Learn practical AI tools and strategies that will revolutionize how you create, optimize, and distribute content.</p>
          </div>

          {/* Top row: Website (left), Discoverability (center larger), CRM (right) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Website */}
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:shadow-md relative">
              <div className="absolute top-4 right-4 text-[11px] bg-blue-100 text-blue-700 px-2 py-1 rounded-full border border-blue-200 font-semibold">Attract</div>
              <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl md:rounded-2xl mb-4">
                <Globe className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">AI-Powered Website</h3>
              <p className="text-sm text-gray-600 mt-1">Transform your website with AI-driven content strategies and automated optimization systems.</p>
              <div className="border-t border-gray-100 my-3"></div>
              <div className="text-sm md:text-base text-gray-700 space-y-2">
                <div className="font-semibold text-gray-900">What you'll master</div>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>AI-enhanced site structure and navigation</li>
                  <li>Automated content creation workflows</li>
                  <li>Smart forms with AI-powered lead qualification</li>
                </ul>
              </div>
            </div>

            {/* AEO vs SEO (center, dominant visual focus) */}
            <div className="relative group">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-red-400/70 to-orange-400/70 blur-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative md:scale-115 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl md:rounded-3xl p-8 md:p-10 shadow-2xl border-3 border-red-300 flex flex-col transition-transform duration-300 hover:-translate-y-3 hover:shadow-3xl">
                <div className="absolute top-4 right-4 text-[11px] bg-orange-100 text-orange-700 px-2 py-1 rounded-full border border-orange-200 font-semibold">Engage</div>
                <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl md:rounded-3xl mb-6 shadow-lg">
                  <Target className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">AI Content Strategy</h3>
                <div className="bg-red-100 border border-red-200 rounded-lg p-3 mb-3">
                  <p className="text-xs text-red-800 font-semibold">AI for Business: Leveraging artificial intelligence to streamline content creation, automate repetitive tasks, and enhance business operations for maximum efficiency and growth.</p>
                </div>
                <p className="text-base text-gray-700 mt-1 font-medium">Master the AI-First Content Framework: Create, optimize, and distribute content at scale using cutting-edge AI tools and proven business strategies.</p>
                <div className="border-t border-red-200 my-4"></div>
                <div className="text-sm md:text-base text-gray-700 space-y-3">
                  <div className="font-bold text-gray-900 text-lg">What you'll master</div>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 font-medium">
                    <li>AI-powered content creation and optimization workflows</li>
                    <li>Automated content distribution across multiple channels</li>
                    <li>AI tools for research, writing, and performance tracking</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CRM Copilot */}
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:shadow-md relative">
              <div className="absolute top-4 right-4 text-[11px] bg-green-100 text-green-700 px-2 py-1 rounded-full border border-green-200 font-semibold">Convert</div>
              <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-xl md:rounded-2xl mb-4">
                <User className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">AI Business Systems</h3>
              <p className="text-sm text-gray-600 mt-1">Implement AI-powered systems to automate lead generation, customer engagement, and business operations.</p>
              <div className="border-t border-gray-100 my-3"></div>
              <div className="text-sm md:text-base text-gray-700 space-y-2">
                <div className="font-semibold text-gray-900">What you'll master</div>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>AI-powered lead qualification and scoring</li>
                  <li>Automated customer communication workflows</li>
                  <li>Business intelligence dashboards with AI insights</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical setup (full width, consistent sizing) */}
          <div className="mt-6 md:mt-8">
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl md:rounded-2xl">
                  <Settings className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
                </div>
                <div className="flex-1">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900">AI Implementation</h3>
              <p className="text-sm text-gray-600 mt-1">Step-by-step guide to implementing AI tools in your existing business infrastructure.</p>
                </div>
                <span className="text-[11px] bg-purple-100 text-purple-700 px-2 py-1 rounded-full border border-purple-200 font-semibold">Build</span>
              </div>
              <div className="border-t border-gray-100 mb-3"></div>
              <div className="text-sm md:text-base text-gray-700 space-y-2">
                <div className="font-semibold text-gray-900">What you'll master</div>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>AI tool integration with existing workflows</li>
                    <li>API connections and automation setup</li>
                    <li>Performance monitoring and optimization tracking</li>
                  </ul>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Scalable AI system architecture</li>
                    <li>Data privacy and security best practices</li>
                    <li>ROI measurement and success metrics</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
        </div>
      </section>

      {/* What We'll Build Live */}
      <section className="py-16 md:py-20 lg:py-24 bg-gray-50 border-t-2 border-gray-200 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100/30"></div>
        <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">What We'll Build Live</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">Live demonstrations of real implementations you can use immediately.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl md:rounded-2xl mb-4">
                <Globe className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">AI-Powered Content System</h3>
              <ul className="text-gray-600 text-sm md:text-base list-disc list-inside space-y-2">
                <li>Automated content creation pipeline</li>
                <li>AI-driven lead qualification system</li>
                <li>Smart chatbot with business intelligence</li>
                <li>Multi-channel content distribution</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl md:rounded-2xl mb-4">
                <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">AI Content for Social Media</h3>
              <ul className="text-gray-600 text-sm md:text-base list-disc list-inside space-y-2">
                <li>Plan, generate, and package posts</li>
                <li>On‑brand avatars and short video teasers</li>
              </ul>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Meet Your Experts Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-white border-t-2 border-gray-100 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50/20"></div>
        <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Meet Your <span className="text-red-600">Experts</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">Learn from experienced practitioners who've built these systems.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {/* Astrid */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-200 text-center">
              <div className="mb-6">
                <img 
                  src="https://raw.githubusercontent.com/daveenci-ai/daveenci-ai-website-images/main/about_astrid.png" 
                  alt="Astrid Abrahamyan"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-xl mx-auto"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Astrid Abrahamyan</h3>
              <p className="text-sm md:text-base text-red-600 font-semibold mb-4">Co-Founder & COO, DaVeenci.ai | Marketing Systems Strategist</p>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">The strategist who connects advanced technology to tangible business outcomes. Astrid focuses on designing practical marketing automation systems that drive efficiency and measurable growth.</p>
            </div>

            {/* Anton */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-200 text-center">
              <div className="mb-6">
                <img 
                  src="https://raw.githubusercontent.com/daveenci-ai/daveenci-ai-website-images/refs/heads/main/about_anton.webp" 
                  alt="Anton Osipov"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-xl mx-auto"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Anton Osipov</h3>
              <p className="text-sm md:text-base text-red-600 font-semibold mb-4">Co-Founder & CTO, DaVeenci.ai |<br />AI Systems Architect</p>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">The principal architect of AI-powered business systems, Anton specializes in implementing scalable AI solutions that transform content creation and business operations for maximum efficiency.</p>
            </div>

            {/* Federico */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-200 text-center">
              <div className="mb-6">
                <img 
                  src="/placeholder.svg" 
                  alt="Federico Lopez"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-xl mx-auto"
                />
                {/* Note: Professional headshot needed for Federico Lopez */}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Federico Lopez</h3>
              <p className="text-sm md:text-base text-red-600 font-semibold mb-4">AI Content Strategist |<br />Business Automation Specialist</p>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">An expert in AI-powered content strategies and business automation. He specializes in implementing AI tools that streamline operations and maximize content effectiveness across all business channels.</p>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Workshop Investment Section */}
      <section id="pricing" className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white border-t-2 border-gray-100 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white"></div>
        <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Workshop <span className="text-red-600">Investment</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">Choose your ticket and secure your spot in the future of search marketing</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto">
            {/* Regular Ticket */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl md:rounded-2xl p-8 md:p-10 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                          <div className="text-center">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">Standard Ticket</div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-red-600 mb-4 sm:mb-6">$44.95</div>
              <div className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 space-y-1.5 sm:space-y-2">
                <div>✓ Live workshop access</div>
                <div>✓ Recording & slides</div>
                <div>✓ AEO templates & prompts</div>
                <div>✓ Implementation checklists</div>
              </div>
                <div className="stripe-buy-button-wrapper">
                  <stripe-buy-button
                    buy-button-id="buy_btn_1RyhFrQd3PdwR2cKEr1N1IJ7"
                    publishable-key="pk_live_51RxuuTQd3PdwR2cKAI9DkYWdn7njfhxy0WmgkmKMKpFqV90YPZvP6r1VoJklgiB1G9B2V9j9Ehm5I3U7G94EuPJD00LLS4gNLT"
                  >
                  </stripe-buy-button>
                </div>
              </div>
            </div>

            {/* VIP Bundle */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl md:rounded-2xl p-8 md:p-10 border-2 border-red-300 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-600 text-white text-sm px-3 py-2 rounded-bl-lg font-bold">
                POPULAR
              </div>
                          <div className="text-center">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">VIP Bundle</div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-red-600 mb-4 sm:mb-6">$89.95</div>
              <div className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 space-y-1.5 sm:space-y-2">
                <div>✓ Everything in Standard</div>
                <div>✓ Private 60-min consultation</div>
                <div>✓ 10% off future services</div>
                <div>✓ Priority support access</div>
              </div>
                <div className="stripe-buy-button-wrapper">
                  <stripe-buy-button
                    buy-button-id="buy_btn_1RyhCvQd3PdwR2cK6go7eRgQ"
                    publishable-key="pk_live_51RxuuTQd3PdwR2cKAI9DkYWdn7njfhxy0WmgkmKMKpFqV90YPZvP6r1VoJklgiB1G9B2V9j9Ehm5I3U7G94EuPJD00LLS4gNLT"
                  >
                  </stripe-buy-button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8 sm:mt-10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm sm:text-base text-gray-600">
              <span className="flex items-center gap-2">
                🔒 <span>Secure checkout by Stripe</span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span>Apple Pay & Google Pay accepted</span>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Why Traditional SEO Falls Short in the AI Era */}
      <section className="py-16 md:py-20 lg:py-24 bg-gray-50 border-t-2 border-gray-200 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100/30"></div>
        <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Traditional Content Creation <span className="text-red-600">Can't Keep Up</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">The business landscape has fundamentally changed. Here's how AI is transforming content and operations.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Traditional SEO */}
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Traditional Content (Old Playbook)</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-gray-400 mt-2 flex-shrink-0"></span>
                  <span>Manual content creation and optimization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-gray-400 mt-2 flex-shrink-0"></span>
                  <span>Time-intensive research and writing processes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-gray-400 mt-2 flex-shrink-0"></span>
                  <span>Limited scalability and resource constraints</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-gray-400 mt-2 flex-shrink-0"></span>
                  <span>Inconsistent quality and brand messaging</span>
                </li>
              </ul>
            </div>

            {/* AEO/GEO */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm border border-red-200">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">AI-Powered Content (New Reality)</h3>
              <ul className="space-y-3 text-gray-700 mb-6">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                  <span>Automated content creation at scale</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                  <span>AI-generated blogs, social posts, and marketing copy</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                  <span>Consistent brand voice across all channels</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                  <span>Data-driven optimization and performance tracking</span>
                </li>
              </ul>
                          </div>
          </div>

          <div className="text-center mt-8 md:mt-12">
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed">
              AI has revolutionized content creation, customer engagement, and business operations. 
              Success isn't about working harder—it's about leveraging AI tools to work smarter and scale efficiently.
            </p>
            <div className="flex justify-center">
              <Button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-5 sm:px-6 md:px-8 py-3 md:py-4 text-sm sm:text-base md:text-lg font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg">
                Master AI for Business: Secure Your Spot
                <ArrowRight className="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
              </Button>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-white border-t-2 border-gray-100 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50/20"></div>
        <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FAQ />
        </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-100 via-red-100/40 to-orange-100/30 relative border-t-2 border-gray-200">
        <div className="absolute inset-0 bg-grid"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Event <span className="text-red-600">Details</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about the workshop
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-12">
            {/* Workshop Information */}
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg border border-gray-200">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8">Workshop Information</h3>
              
              <div className="space-y-3 sm:space-y-4 md:space-y-6">
                <div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-lg">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm md:text-base">September 4, 2025</div>
                    <div className="text-gray-600 text-xs sm:text-sm md:text-base">Thursday</div>
                  </div>
                </div>

                <div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-lg">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm md:text-base">11:30 AM - 12:30 PM CT</div>
                    <div className="text-gray-600 text-xs sm:text-sm md:text-base">Duration: 1 hour</div>
                  </div>
                </div>

                <div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-lg">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm md:text-base">Live Online Workshop</div>
                    <div className="text-gray-600 text-xs sm:text-sm md:text-base">Join from anywhere • Link sent after purchase</div>
                  </div>
                </div>

                <div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-lg">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm md:text-base">Recording Available</div>
                    <div className="text-gray-600 text-xs sm:text-sm md:text-base">Access right after the workshop</div>
                  </div>
                </div>
              </div>
            </div>

            {/* What You Get */}
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg border border-gray-200">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">What You Get</h3>
              <ul className="grid sm:grid-cols-2 gap-2 sm:gap-3 text-gray-700 text-xs sm:text-sm md:text-base">
                <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 flex-shrink-0" />AI content templates & prompts</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 flex-shrink-0" />Implementation checklists</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 flex-shrink-0" />AI workflow automation guide</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 flex-shrink-0" />Recording & slides</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus Modal */}
      <Dialog open={isSyllabusOpen} onOpenChange={setIsSyllabusOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Get the Workshop Syllabus</DialogTitle>
          </DialogHeader>
          <div>
            <div>
              <label htmlFor="leadEmail" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <Input
                id="leadEmail"
                type="email"
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
            {leadStatus && (
              <div className={`p-3 rounded-lg text-sm ${
                leadStatus.includes('sent') || leadStatus.includes('Sent') 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {leadStatus}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              onClick={submitLead}
              disabled={!leadEmail || isSubmitting}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
            >
              {isSubmitting ? 'Sending...' : 'Send Me the Syllabus'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Final CTA Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-red-600 via-red-700 to-red-800 relative border-t-4 border-red-500">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs bg-white/20 text-white px-2.5 sm:px-3 py-1 rounded-full mb-4 shadow-sm">
              ⏰ Limited Time Offer
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Transform Your Business: <br className="hidden sm:block" />
              <span className="text-red-100">Master AI for Content & Operations</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-red-100 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8">
              Join the businesses already transforming with AI‑powered content and automation. Master AI for business and position yourself ahead of the competition.
            </p>

          </div>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8 items-center">
            {/* Left: What You Get */}
            <div className="lg:text-right text-center">
              <h3 className="text-lg md:text-xl font-semibold text-white mb-4">What You'll Master</h3>
              <div className="space-y-2 text-red-100">
                <div className="flex items-center justify-center lg:justify-end gap-2">
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  <span>Complete AI content creation toolkit</span>
                </div>
                <div className="flex items-center justify-center lg:justify-end gap-2">
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  <span>AI-powered business automation systems</span>
                </div>
                <div className="flex items-center justify-center lg:justify-end gap-2">
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  <span>Ready-to-use AI templates and workflows</span>
                </div>
              </div>
            </div>

            {/* Center: CTA Card */}
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Reserve Your Spot</h3>
                  <div className="text-3xl md:text-4xl font-bold text-red-600 mb-4">Starting at $44.95</div>
                  <Button 
                    onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} 
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 md:py-4 text-base md:text-lg font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg mb-3"
                  >
                    Get Tickets Now
                  </Button>
                  <button 
                    onClick={() => setIsSyllabusOpen(true)}
                    className="text-sm text-gray-600 hover:text-red-600 underline transition-colors"
                  >
                    Or download the free syllabus
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Bonus Features */}
            <div className="text-center lg:text-left">
              <h3 className="text-lg md:text-xl font-semibold text-white mb-4">Bonus Included</h3>
              <div className="space-y-2 text-red-100">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  <span>Comprehensive AI implementation guides</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  <span>AI business community access</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  <span>AI implementation support session</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/20">
            <div className="flex items-center gap-2 text-white text-sm">
              🔒 <span>Secure checkout by Stripe</span>
            </div>
            <div className="flex items-center gap-2 text-white text-sm">
              💳 <span>Apple Pay & Google Pay</span>
            </div>
            <div className="flex items-center gap-2 text-white text-sm">
              ↩️ <span>7-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIAutomationWorkshopAustin;