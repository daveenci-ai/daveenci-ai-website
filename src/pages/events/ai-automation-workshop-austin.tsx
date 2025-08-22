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
    document.title = 'Be The Answer Buyers See First — Discoverability Workshop | DaVeenci';
    const targetDate = new Date('2025-08-28T14:30:00-05:00'); // Aug 28, 2025, 2:30 PM CT

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
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-2 flex items-center gap-2 md:gap-4 text-[13px] md:text-sm">
          <span className="font-semibold tracking-tight">Discoverability Workshop (AEO/GEO vs SEO) — Austin</span>
          <span className="opacity-90 hidden sm:inline">•</span>
          <span className="opacity-90">Aug 28, 2025 • 2:30 PM CT</span>
          <Button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="ml-auto inline-flex items-center rounded-full bg-white text-red-700 hover:bg-white/90 px-3 py-1 font-semibold shadow-sm transition-colors">
            Get tickets
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-16 md:pt-24 pb-12 md:pb-16 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="absolute inset-0 bg-grid"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Pre-Header Announcement */}
            <div className="lg:col-span-1 order-2 lg:order-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] md:text-xs font-semibold mb-3 bg-gray-100 text-gray-800 border border-gray-200 shadow-sm">
                <Clock className="w-3.5 h-3.5" />
                <span>Next‑Generation Digital Strategy</span>
              </div>

            {/* Main Headline */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight mb-4 md:mb-6">
                Master AEO: The Future of Search <br /><span className="text-red-600">vs. Traditional SEO</span>
              </h1>

            {/* Sub-Headline */}
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-5">
                Unlock the power of AI-driven answer engines. Learn how to optimize your content for AEO and get a head start on the future of search marketing.
              </p>

              {/* Chips */}
              <div className="flex flex-wrap gap-2 mb-5 justify-center lg:justify-start">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 border border-red-200 text-xs shadow-sm font-semibold"><span className="w-2 h-2 rounded-full bg-red-600"></span>AEO Mastery</span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-200 text-xs shadow-sm"><span className="w-2 h-2 rounded-full bg-blue-500"></span>AI Search Optimization</span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-200 text-xs shadow-sm"><span className="w-2 h-2 rounded-full bg-green-500"></span>Answer Engine Strategy</span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-200 text-xs shadow-sm"><span className="w-2 h-2 rounded-full bg-purple-500"></span>Future-Proof Marketing</span>
              </div>

              {/* Countdown Timer */}
              <div className="flex lg:justify-start justify-center space-x-2 md:space-x-4 mb-6 md:mb-8">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center bg-white rounded-lg shadow-md p-2 md:p-4 min-w-[60px] md:min-w-[80px]">
                  <div className="text-xl md:text-3xl font-bold text-gray-900">{value.toString().padStart(2, '0')}</div>
                  <div className="text-xs md:text-sm text-gray-600 capitalize">{unit}</div>
                </div>
              ))}
            </div>

              {/* Live/Trust badges */}
              <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-2 md:gap-3 mb-6 md:mb-8">
                <span className="inline-flex items-center gap-2 text-xs md:text-sm px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">🔴 Live online event</span>
                <span className="inline-flex items-center gap-2 text-xs md:text-sm px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200">🎥 Recording included</span>
                <span className="inline-flex items-center gap-2 text-xs md:text-sm px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">🧰 Templates provided</span>
              </div>

              {/* Primary + Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-3 md:gap-4 mb-6 md:mb-6">
              <Button
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 md:px-8 py-3 md:py-4 bg-red-600 hover:bg-red-700 text-white text-base md:text-lg font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Become an AEO Master
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsSyllabusOpen(true)}
                className="px-6 md:px-8 py-3 md:py-4 border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 text-base md:text-lg font-semibold rounded-xl shadow-sm"
              >
                <BookOpen className="w-4 h-4 mr-2" /> Get AEO Syllabus
              </Button>
              </div>

              

              {/* Event Perks */}
              <div className="flex flex-col md:flex-row md:flex-wrap lg:justify-start justify-center items-center gap-3 text-gray-700 text-sm md:text-base">
                <div className="inline-flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>Live online workshop</div>
                <div className="hidden md:block text-gray-300">•</div>
                <div className="inline-flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Recording included</div>
                <div className="hidden md:block text-gray-300">•</div>
                <div className="inline-flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>Interactive Q&A</div>
              </div>
            </div>

            {/* Right visual */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                <img src="https://picsum.photos/seed/aeo/1200/700" alt="Workshop preview" className="w-full h-auto" />
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
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Master AEO: <span className="text-red-600">Future-Proof Your Marketing</span></h2>
            <p className="text-lg text-gray-600 mt-2">Learn the complete AEO system that positions you ahead of the competition in AI-driven search.</p>
          </div>

          {/* Top row: Website (left), Discoverability (center larger), CRM (right) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Website */}
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:shadow-md relative">
              <div className="absolute top-4 right-4 text-[11px] bg-gray-100 text-gray-700 px-2 py-1 rounded-full border border-gray-200">Website</div>
              <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl md:rounded-2xl mb-4">
                <Globe className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">AEO-Optimized Website</h3>
              <p className="text-sm text-gray-600 mt-1">Build a website structure optimized for both traditional SEO and AI-powered answer engines.</p>
              <div className="border-t border-gray-100 my-3"></div>
              <div className="text-sm md:text-base text-gray-700 space-y-2">
                <div className="font-semibold text-gray-900">What you'll master</div>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>AEO-friendly site structure and navigation</li>
                  <li>Answer-focused content architecture</li>
                  <li>Smart forms optimized for AI crawling</li>
                </ul>
              </div>
            </div>

            {/* AEO vs SEO (center, dominant visual focus) */}
            <div className="relative group">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-red-400/70 to-orange-400/70 blur-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative md:scale-115 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl md:rounded-3xl p-8 md:p-10 shadow-2xl border-3 border-red-300 flex flex-col transition-transform duration-300 hover:-translate-y-3 hover:shadow-3xl">
                <div className="absolute top-4 right-4 text-[11px] bg-red-600 text-white px-3 py-1 rounded-full font-bold shadow-sm">CORE FOCUS</div>
                <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl md:rounded-3xl mb-6 shadow-lg">
                  <Target className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">AEO vs. SEO</h3>
                <div className="bg-red-100 border border-red-200 rounded-lg p-3 mb-3">
                  <p className="text-xs text-red-800 font-semibold">AEO (Answer Engine Optimization): Optimizing your content so it appears directly as the answer in AI-driven search results, voice searches, and other 'answer engine' experiences.</p>
                </div>
                <p className="text-base text-gray-700 mt-1 font-medium">Master the Q→A→Proof→Action framework: Optimize your content so that both users and AI can easily find answers and cite your pages as sources.</p>
                <div className="border-t border-red-200 my-4"></div>
                <div className="text-sm md:text-base text-gray-700 space-y-3">
                  <div className="font-bold text-gray-900 text-lg">What you'll master</div>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 font-medium">
                    <li>Q→A→Proof→Action page framework for AI optimization</li>
                    <li>Entity cues + FAQ stacks that AI models cite</li>
                    <li>Model-friendly copy and first-party evidence strategies</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CRM Copilot */}
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:shadow-md relative">
              <div className="absolute top-4 right-4 text-[11px] bg-gray-100 text-gray-700 px-2 py-1 rounded-full border border-gray-200">AI CRM</div>
              <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl md:rounded-2xl mb-4">
                <User className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">AI CRM</h3>
              <p className="text-sm text-gray-600 mt-1">Supporting systems to convert your AEO-driven traffic into customers.</p>
              <div className="border-t border-gray-100 my-3"></div>
              <div className="text-sm md:text-base text-gray-700 space-y-2">
                <div className="font-semibold text-gray-900">What you'll master</div>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Auto‑enrichment + call summaries</li>
                  <li>Reply‑drafts and next‑best‑actions</li>
                  <li>Prompt pack for research → recap → action</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical setup (full width, consistent sizing) */}
          <div className="mt-6 md:mt-8">
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl md:rounded-2xl">
                  <Settings className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">Technical Setup</h3>
                  <p className="text-sm text-gray-600 mt-1">Deployment, payment processing, and infrastructure fundamentals.</p>
                </div>
                <span className="text-[11px] bg-gray-100 text-gray-700 px-2 py-1 rounded-full border border-gray-200">Foundation</span>
              </div>
              <div className="border-t border-gray-100 mb-3"></div>
              <div className="text-sm md:text-base text-gray-700 space-y-2">
                <div className="font-semibold text-gray-900">What you'll master</div>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Render deployment with environment config</li>
                    <li>Stripe Checkout with Automatic Tax + promo codes</li>
                    <li>Resend emails with calendar (.ics) attachments</li>
                  </ul>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Webhook architecture that safely handles repeated requests</li>
                    <li>Performance + SEO technical foundations</li>
                    <li>Analytics + conversion tracking setup</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* What We'll Build Live */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We'll Build Live</h2>
            <p className="text-lg text-gray-600">Live demonstrations of real implementations you can use immediately.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl md:rounded-2xl mb-4">
                <Globe className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Building Website Live</h3>
              <ul className="text-gray-600 text-sm md:text-base list-disc list-inside space-y-2">
                <li>Fully functional website</li>
                <li>Smart form (routes + qualifies)</li>
                <li>Chatbot (answers + handoff)</li>
                <li>AEO/GEO‑ready blog</li>
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
      </section>

      {/* Meet Your Experts Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Your <span className="text-red-600">Experts</span>
            </h2>
            <p className="text-lg text-gray-600">Learn from experienced practitioners who've built these systems.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Astrid */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-200 text-center">
              <div className="relative inline-block mb-4">
                <img 
                  src="https://raw.githubusercontent.com/daveenci-ai/daveenci-ai-website-images/main/about_astrid.png" 
                  alt="Astrid Abrahamyan"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-xl"
                />
                <div className="absolute -top-2 -right
                -2 w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">"</span>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">Astrid Abrahamyan</h3>
              <p className="text-sm md:text-base text-red-600 font-medium">Co-Founder & COO @ DaVeenci.ai | AI Ops for Energy Sector</p>
              <p className="text-sm text-gray-700 mt-3">Helps teams ship practical automations that save time and compound results.</p>
            </div>

            {/* Anton */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-200 text-center">
              <div className="relative inline-block mb-4">
                <img 
                  src="https://raw.githubusercontent.com/daveenci-ai/daveenci-ai-website-images/refs/heads/main/about_anton.webp" 
                  alt="Anton Osipov"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-xl"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">"</span>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">Anton Osipov</h3>
              <p className="text-sm md:text-base text-red-600 font-medium">Co-Founder & CTO @ DaVeenci.ai | AI Dev for Energy Sector</p>
              <p className="text-sm text-gray-700 mt-3">Focuses on discoverability systems (AEO/GEO) and AI engineering for energy.</p>
            </div>

            {/* Kiko */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-200 text-center">
              <div className="relative inline-block mb-4">
                <img 
                  src="/placeholder.svg" 
                  alt="Federico Lopez (Kiko)"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-xl"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">"</span>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">Federico Lopez (Kiko)</h3>
              <p className="text-sm md:text-base text-red-600 font-medium">🎯 Creative Strategist | Content Architect | UX Storyteller</p>
              <p className="text-sm text-gray-700 mt-3">Emotional intelligence in action—making brands actually sound human.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Investment Section */}
      <section id="pricing" className="py-16 md:py-20 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Workshop <span className="text-red-600">Investment</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Choose your ticket and secure your spot in the future of search marketing</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* Regular Ticket */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl md:rounded-2xl p-8 md:p-10 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Standard Ticket</div>
                <div className="text-3xl md:text-4xl font-extrabold text-red-600 mb-4">$44.95</div>
                <div className="text-base md:text-lg text-gray-700 mb-8 space-y-2">
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
                <div className="text-xl md:text-2xl font-bold text-gray-900 mb-2">VIP Bundle</div>
                <div className="text-3xl md:text-4xl font-extrabold text-red-600 mb-4">$89.95</div>
                <div className="text-base md:text-lg text-gray-700 mb-8 space-y-2">
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
          
          <div className="text-center mt-10">
            <div className="inline-flex items-center gap-4 text-base text-gray-600">
              <span className="flex items-center gap-2">
                🔒 <span>Secure checkout by Stripe</span>
              </span>
              <span>•</span>
              <span>Apple Pay & Google Pay accepted</span>
            </div>
          </div>
        </div>
      </section>



      {/* Why Traditional SEO Falls Short in the AI Era */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Traditional SEO Falls Short in the <span className="text-red-600">AI Era</span>
            </h2>
            <p className="text-lg text-gray-600">The search landscape has fundamentally changed. Here's what you need to know.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Traditional SEO */}
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Traditional SEO (Old Playbook)</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-gray-400 mt-2 flex-shrink-0"></span>
                  <span>Focus on ranking pages for specific keywords</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-gray-400 mt-2 flex-shrink-0"></span>
                  <span>Long-form content optimized for search crawlers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-gray-400 mt-2 flex-shrink-0"></span>
                  <span>Success measured by positions and sessions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-gray-400 mt-2 flex-shrink-0"></span>
                  <span>Generic tips and keyword-stuffed content</span>
                </li>
              </ul>
            </div>

            {/* AEO/GEO */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm border border-red-200">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">AEO/GEO (New Reality)</h3>
              <ul className="space-y-3 text-gray-700 mb-6">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                  <span>Get quoted as the definitive answer by AI</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                  <span>Q&A blocks, concise briefs, and checklists</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                  <span>Mentions in AI answers and assisted conversions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                  <span>First-party data, screenshots, and SOPs</span>
                </li>
              </ul>
                          </div>
          </div>

          <div className="text-center mt-8 md:mt-12">
            <p className="text-lg text-gray-600 mb-8">
              AI now provides direct answers, integrates sponsored content, and uses virtual shopping assistants. 
              Success isn't about having the best product—it's about being optimized for how AI selects and presents information.
            </p>
            <div className="flex justify-center">
              <Button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg">
                Master AEO: Secure Your Spot
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FAQ />
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-100 via-red-100/40 to-orange-100/30 relative">
        <div className="absolute inset-0 bg-grid"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
              Event <span className="text-red-600">Details</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Everything you need to know about the workshop
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-12">
            {/* Workshop Information */}
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">Workshop Information</h3>
              
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-lg">
                    <Calendar className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm md:text-base">August 28, 2025</div>
                    <div className="text-gray-600 text-sm md:text-base">Thursday</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-lg">
                    <Clock className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm md:text-base">11:00 AM EST (10:00 AM CST)</div>
                    <div className="text-gray-600 text-sm md:text-base">Duration: 1.5 hours</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-lg">
                    <Globe className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm md:text-base">Live Online (Zoom)</div>
                    <div className="text-gray-600 text-sm md:text-base">Join from anywhere • Link sent after purchase</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-lg">
                    <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm md:text-base">Demos + Recording Available</div>
                    <div className="text-gray-600 text-sm md:text-base">Access right after the presentation</div>
                  </div>
                </div>
              </div>
            </div>

            {/* What You Get */}
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">What You Get</h3>
              <ul className="grid sm:grid-cols-2 gap-3 text-gray-700 text-sm md:text-base">
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-red-600" />AEO/GEO page template + mini FAQ pack</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-red-600" />CRM Copilot prompt pack</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-red-600" />Setup checklist + working checkout flow</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-red-600" />Recording and slides within 24 hours</li>
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
      <section className="py-16 md:py-20 bg-gradient-to-br from-red-600 via-red-700 to-red-800 relative">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 text-xs bg-white/20 text-white px-3 py-1 rounded-full mb-4 shadow-sm">
              ⏰ Limited Time Offer
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Future-Proof Your Marketing: <br className="hidden sm:block" />
              <span className="text-red-100">Unlock the Future of Search with AEO</span>
            </h2>
            <p className="text-lg text-red-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Join the businesses already winning with AI‑powered search. Master AEO and position yourself ahead of the competition.
            </p>

          </div>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8 items-center">
            {/* Left: What You Get */}
            <div className="lg:text-right text-center">
              <h3 className="text-lg md:text-xl font-semibold text-white mb-4">What You'll Walk Away With</h3>
              <div className="space-y-2 text-red-100">
                <div className="flex items-center justify-center lg:justify-end gap-2">
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  <span>Complete AEO/GEO starter pack</span>
                </div>
                <div className="flex items-center justify-center lg:justify-end gap-2">
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  <span>Working CRM Copilot essentials</span>
                </div>
                <div className="flex items-center justify-center lg:justify-end gap-2">
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  <span>Templates, prompts, and SOPs</span>
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
                  <span>Take‑home templates & SOPs</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  <span>Expert Slack community access</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  <span>Post‑workshop setup clinic</span>
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