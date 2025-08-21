import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company_name: '',
    website: '',
    question: ''
  });

  // Countdown timer logic
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

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const [isSyllabusOpen, setIsSyllabusOpen] = useState(false);
  const [leadEmail, setLeadEmail] = useState('');
  const [leadQuestion, setLeadQuestion] = useState('');
  const [leadStatus, setLeadStatus] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'regular' | 'consult'>('regular');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    try {
      // Save registration first
      const registerRes = await fetch(`${apiConfig.baseUrl}/api/workshop/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const registerJson = await registerRes.json();
      if (!registerRes.ok) {
        setSubmitMessage(registerJson.error || 'Registration failed. Please try again.');
        return;
      }

      // Then create Checkout session with saved contact info
      const checkoutRes = await fetch(`${apiConfig.baseUrl}/api/workshop/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: selectedPlan,
          productId: 'prod_StiXnR9cZOv96D',
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`.trim() || undefined,
        }),
      });
      const checkoutJson = await checkoutRes.json();
      if (checkoutRes.ok && checkoutJson.url) {
        window.location.href = checkoutJson.url;
      } else {
        setSubmitMessage(checkoutJson.error || 'Unable to start checkout. Please try again.');
      }
    } catch (err) {
      console.error('Registration/Checkout error:', err);
      setSubmitMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckout = async (plan: 'early' | 'general' | 'team' = 'general', addVip = false) => {
    setIsCheckingOut(true);
    setCheckoutError('');
    try {
      const response = await fetch(`${apiConfig.baseUrl}/api/workshop/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan,
          addOns: addVip ? ['vip'] : [],
          // You provided a product ID for Stripe
          productId: 'prod_StiXnR9cZOv96D',
          email: formData.email || undefined,
          name: `${formData.firstName} ${formData.lastName}`.trim() || undefined,
        }),
      });
      const result = await response.json();
      if (response.ok && result.url) {
        window.location.href = result.url;
      } else {
        setCheckoutError(result.error || 'Checkout failed. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setCheckoutError('Network error. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const submitLead = async () => {
    setIsSubmitting(true);
    setLeadStatus(null);
    try {
      const r = await fetch(`${apiConfig.baseUrl}/api/workshop/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: leadEmail, name: `${formData.firstName} ${formData.lastName}`.trim() || undefined, question: leadQuestion })
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
          <Button onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })} className="ml-auto inline-flex items-center rounded-full bg-white text-red-700 hover:bg-white/90 px-3 py-1 font-semibold shadow-sm transition-colors">
            Reserve my seat
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
                Be The Answer <br />Buyers See First
              </h1>

            {/* Sub-Headline */}
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-5">
                Discoverability first: AEO/GEO vs SEO. Structure content the way people actually ask—then layer CRM Copilot essentials to convert.
              </p>

              {/* Chips */}
              <div className="flex flex-wrap gap-2 mb-5 justify-center lg:justify-start">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-200 text-xs shadow-sm"><span className="w-2 h-2 rounded-full bg-rose-500"></span>AEO vs SEO</span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-200 text-xs shadow-sm"><span className="w-2 h-2 rounded-full bg-rose-500"></span>Avatars</span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-200 text-xs shadow-sm"><span className="w-2 h-2 rounded-full bg-rose-500"></span>AI Assistant</span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-200 text-xs shadow-sm"><span className="w-2 h-2 rounded-full bg-rose-500"></span>Smart CRM</span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-200 text-xs shadow-sm"><span className="w-2 h-2 rounded-full bg-rose-500"></span>Technical Setup</span>
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
                Reserve my seat
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsSyllabusOpen(true)}
                className="px-6 md:px-8 py-3 md:py-4 border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 text-base md:text-lg font-semibold rounded-xl shadow-sm"
              >
                <BookOpen className="w-4 h-4 mr-2" /> Get Syllabus
              </Button>
              </div>
            {checkoutError && (
              <div className="mx-auto max-w-xl text-sm md:text-base text-red-700 bg-red-100 border border-red-200 rounded-md px-4 py-2 mb-4">
                {checkoutError}
              </div>
            )}
              

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

      {/* What You’ll Master (and Take Home) */}
      <section className="py-12 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What You’ll Master <span className="text-gray-500">(and Take Home)</span></h2>
            <p className="text-gray-600 mt-2">A comprehensive system for AI‑powered discovery with a simple technical foundation.</p>
          </div>

          {/* Top row: Website (left), Discoverability (center larger), CRM (right) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Website */}
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:shadow-md relative">
              <div className="absolute top-4 right-4 text-[11px] bg-gray-100 text-gray-700 px-2 py-1 rounded-full border border-gray-200">Website</div>
              <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl md:rounded-2xl mb-4">
                <Globe className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">Website</h3>
              <p className="text-sm text-gray-600 mt-1">Build a site that captures demand and plugs into your CRM.</p>
              <div className="border-t border-gray-100 my-3"></div>
              <div className="text-sm md:text-base text-gray-700 space-y-2">
                <div className="font-semibold text-gray-900">What you'll master</div>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Smart forms for routing and progressive profiling</li>
                  <li>Chatbot answers + human handoff patterns</li>
                  <li>Form + chatbot snippets wired to CRM</li>
                </ul>
              </div>
            </div>

            {/* Discoverability (center, larger with highlight) */}
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-red-200/50 to-orange-200/50 blur-xl opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative md:scale-105 bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="absolute top-4 right-4 text-[11px] bg-red-50 text-red-700 px-2 py-1 rounded-full border border-red-200">Discoverability</div>
                <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl md:rounded-2xl mb-4">
                  <Target className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">AEO/GEO vs SEO</h3>
                <p className="text-sm text-gray-600 mt-1">Structure Q→A→Proof→Action so models can choose and cite you.</p>
                <div className="border-t border-gray-100 my-3"></div>
                <div className="text-sm md:text-base text-gray-700 space-y-2">
                  <div className="font-semibold text-gray-900">What you'll master</div>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Q→A→Proof→Action page structure</li>
                    <li>Entity cues + FAQ stacks models cite</li>
                    <li>Model‑friendly copy and first‑party evidence</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CRM Copilot */}
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:shadow-md relative">
              <div className="absolute top-4 right-4 text-[11px] bg-gray-100 text-gray-700 px-2 py-1 rounded-full border border-gray-200">Smart CRM</div>
              <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl md:rounded-2xl mb-4">
                <User className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">CRM Copilot</h3>
              <p className="text-sm text-gray-600 mt-1">A lightweight assistant to speed first reply and next actions.</p>
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

          {/* Technical setup (full width, short) */}
          <div className="mt-6 md:mt-8">
            <div className="bg-white rounded-xl md:rounded-2xl p-6 shadow-sm border border-gray-200 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl">
                  <Settings className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Technical Setup</h3>
                <span className="ml-auto text-[11px] bg-gray-100 text-gray-700 px-2 py-1 rounded-full border border-gray-200">Foundation</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-3 text-sm text-gray-700">
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Render deployment with environment config</li>
                  <li>Stripe Checkout with Automatic Tax + promo codes</li>
                  <li>Resend emails with calendar (.ics) attachments</li>
                </ul>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Webhook architecture with idempotency</li>
                  <li>Performance + SEO technical foundations</li>
                  <li>Analytics + conversion tracking setup</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* What We’ll Build Live */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">What We’ll Build Live</h2>
          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            <div className="bg-white rounded-xl md:rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl mb-3">
                <Globe className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Building Website Live</h3>
              <ul className="text-gray-600 text-sm list-disc list-inside space-y-1">
                <li>Fully functional website</li>
                <li>Smart form (routes + qualifies)</li>
                <li>Chatbot (answers + handoff)</li>
                <li>AEO/GEO‑ready blog</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl md:rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl mb-3">
                <BookOpen className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Content for Social Media</h3>
              <ul className="text-gray-600 text-sm list-disc list-inside space-y-1">
                <li>Plan, generate, and package posts</li>
                <li>On‑brand avatars and short video teasers</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Agenda removed per request */}

      {/* Pricing Tiers */}
      <section id="pricing" className="py-12 md:py-20 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">Pricing</h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Regular Ticket */}
            <div onClick={() => setSelectedPlan('regular')} className={`cursor-pointer bg-white rounded-2xl p-6 shadow-sm border ${selectedPlan==='regular' ? 'border-red-300 ring-1 ring-red-200' : 'border-gray-200'}`}>
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-xl font-bold text-gray-900">Regular Ticket</div>
                  <div className="text-sm text-gray-600">Recording, slides, templates, Copilot prompts, SOPs</div>
                </div>
                <div className="text-2xl font-extrabold text-gray-900">$44.95</div>
              </div>
              <Button onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })} className="mt-4 w-full bg-gradient-to-r from-red-600 to-red-700 text-white">Reserve my seat</Button>
            </div>
            {/* Private Consultation */}
            <div onClick={() => setSelectedPlan('consult')} className={`cursor-pointer bg-white rounded-2xl p-6 shadow-sm border ${selectedPlan==='consult' ? 'border-red-300 ring-1 ring-red-200' : 'border-gray-200'}`}>
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-xl font-bold text-gray-900">VIP Bundle</div>
                  <div className="text-sm text-gray-600">Includes Private Consultation ($150 value) + 10% off all other services</div>
                </div>
                <div className="text-2xl font-extrabold text-gray-900">$89.95</div>
              </div>
              <Button onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })} className="mt-4 w-full bg-gradient-to-r from-red-600 to-red-700 text-white">Reserve my seat</Button>
            </div>
          </div>
          <div className="text-center mt-4 text-sm text-gray-600">Secure checkout by Stripe • Apple Pay & Google Pay</div>
        </div>
      </section>

      

      {/* FAQs (reuse site component) */}
      
      <section className="py-8 md:py-12 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FAQ />
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-gray-600 mb-4">Have questions? Email support@daveenci.ai</p>
          <Button onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-base md:text-lg font-semibold rounded-lg transition-all duration-200">
            Reserve my seat
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
      {/* Syllabus Modal */}
      <Dialog open={isSyllabusOpen} onOpenChange={setIsSyllabusOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Get the syllabus</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <Input type="email" placeholder="you@company.com" value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} />
            <Textarea placeholder="Optional question" value={leadQuestion} onChange={(e) => setLeadQuestion(e.target.value)} />
            {leadStatus && <div className="text-sm text-gray-700">{leadStatus}</div>}
          </div>
          <DialogFooter>
            <Button onClick={submitLead} disabled={isSubmitting || !leadEmail}>Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Registration Form Section */}
      <section id="form" className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6 md:mb-8">Reserve Your Spot</h2>
            
            {submitMessage && (
              <div className={`p-4 rounded-lg mb-6 ${submitMessage.toLowerCase().includes('failed') || submitMessage.toLowerCase().includes('error') ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-green-100 text-green-800 border border-green-200'}`}>
                {submitMessage}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number (optional)</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="(555) 123-4567" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" />
              </div>

              <div>
                <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleInputChange}
                  placeholder="Enter your company name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Website (Optional)
                </label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div>
                <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                  What's one question you'd like us to answer? (Optional)
                </label>
                <textarea
                  id="question"
                  name="question"
                  rows={4}
                  value={formData.question}
                  onChange={handleInputChange}
                  placeholder="What specific automation challenge would you like help with?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 md:py-4 text-base md:text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-red-500/25"
              >
                {isSubmitting ? 'Registering...' : 'Reserve My Spot'}
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Meet Your Experts Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
              Meet Your <span className="text-red-600">Experts</span>
            </h2>
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
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
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
                    <div className="font-semibold text-gray-900 text-sm md:text-base">2:30 PM CT</div>
                    <div className="text-gray-600 text-sm md:text-base">Duration: 2 hours</div>
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
                    <div className="font-semibold text-gray-900 text-sm md:text-base">Recording + Slides Included</div>
                    <div className="text-gray-600 text-sm md:text-base">Templates and prompts provided</div>
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

      {/* Final CTA Section (Blue gradient) */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-[11px] md:text-xs bg-white/10 text-white px-3 py-1 rounded-full mb-3">Limited Time Offer</div>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">Transform Your Digital Strategy<br/>Starting Today</h2>
            <p className="text-white/80 mt-3">Join the businesses already winning AI‑powered search. Get everything you need for AEO/GEO discoverability and seamless CRM integration.</p>
          </div>

          {/* Center Card */}
          <div className="max-w-xl mx-auto bg-white text-gray-900 rounded-2xl shadow-xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-center mb-4">Reserve Your Spot</h3>
            <ul className="text-sm text-gray-700 grid grid-cols-1 gap-2 mb-4">
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-600"></span>Complete AEO/GEO starter pack</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-600"></span>Working CRM Copilot basics</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-600"></span>Templates, prompts, and a deployment guide</li>
            </ul>
            <Button onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white">Secure My Seat Now</Button>
            <div className="text-center text-xs text-gray-500 mt-3">Or download the free syllabus</div>
          </div>

          {/* Feature tiles */}
          <div className="grid md:grid-cols-3 gap-6 mt-10 text-center">
            <div className="bg-white/10 rounded-xl p-6">
              <div className="text-lg font-semibold">Bonus Resources</div>
              <div className="text-white/80 text-sm mt-1">Take‑home templates and SOPs</div>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <div className="text-lg font-semibold">Expert Network</div>
              <div className="text-white/80 text-sm mt-1">Curated Slack for ongoing Q&A</div>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <div className="text-lg font-semibold">Implementation Support</div>
              <div className="text-white/80 text-sm mt-1">Set‑up clinic post‑workshop</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIAutomationWorkshopAustin;