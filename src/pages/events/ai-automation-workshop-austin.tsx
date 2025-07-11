import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock, MapPin, Users, Target, User, Settings, BookOpen, TrendingUp, Zap } from 'lucide-react';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { getApiUrl } from '@/config/api';

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
    const targetDate = new Date('2025-07-30T14:00:00-05:00'); // July 30, 2025, 2:00 PM CST

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch(getApiUrl('/api/workshop/register'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Redirect to thank you page
        navigate('/events/thank-you-event');
      } else {
        setSubmitMessage(result.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Target,
      title: "Automate Your Content Marketing",
      description: "Learn AI-powered strategies to create, schedule, and optimize content across all platforms"
    },
    {
      icon: User,
      title: "AI-Powered CRM Lead Qualification",
      description: "Use AI to qualify leads automatically and engage customers at the perfect moment"
    },
    {
      icon: Settings,
      title: "No-Code Automation Tools",
      description: "Master Make.com, Shortcuts, and other tools to build workflows without coding"
    },
    {
      icon: BookOpen,
      title: "Live Walkthroughs & Case Studies",
      description: "See real automations in action with step-by-step demonstrations"
    },
    {
      icon: TrendingUp,
      title: "Increase ROI & Efficiency",
      description: "Discover how to save hours daily while improving your business results"
    },
    {
      icon: Zap,
      title: "Instant Implementation",
      description: "Walk away with ready-to-use templates and automation blueprints"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-32 pb-16 md:pb-24" style={{background: 'linear-gradient(to right, #e8d5f0 0%, #ffffff 30%, #ffffff 70%, #d5e8ff 100%)'}}>
        <div className="absolute inset-0 bg-grid-subtle"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Pre-Header Announcement */}
            <div className="inline-flex items-center px-4 md:px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-xs md:text-sm font-medium mb-4 md:mb-8">
              ☆ Live Workshop • Austin, TX ☆
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900 leading-tight mb-4 md:mb-8">
              If it <span className="text-orange-600">Repeats</span>, it <span className="text-pink-600">Automates</span>
            </h1>

            {/* Sub-Headline */}
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6 md:mb-12 px-4 md:px-0">
              Unlock the Power of AI Automations for Your Business. Learn how to save time, increase ROI, and streamline your content, CRM, and marketing using AI tools.
            </p>

            {/* Countdown Timer */}
            <div className="flex justify-center space-x-2 md:space-x-4 mb-6 md:mb-8">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center bg-white rounded-lg shadow-md p-2 md:p-4 min-w-[60px] md:min-w-[80px]">
                  <div className="text-xl md:text-3xl font-bold text-gray-900">{value.toString().padStart(2, '0')}</div>
                  <div className="text-xs md:text-sm text-gray-600 capitalize">{unit}</div>
                </div>
              ))}
            </div>

            {/* Urgency Message */}
            <div className="flex items-center justify-center space-x-2 mb-6 md:mb-8 px-4">
              <span className="text-xl md:text-2xl">🔥</span>
              <span className="text-sm md:text-lg font-bold text-red-600 text-center">Limited to 40 seats!</span>
            </div>

            {/* Event Perks */}
            <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center space-y-2 md:space-y-0 md:space-x-6 text-gray-700 text-sm md:text-base">
              <div className="flex items-center space-x-2">
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-red-600" />
                <span>Free event</span>
              </div>
              <span className="hidden md:inline text-gray-400">•</span>
              <div className="flex items-center space-x-2">
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-red-600" />
                <span>Networking included</span>
              </div>
              <span className="hidden md:inline text-gray-400">•</span>
              <div className="flex items-center space-x-2">
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-red-600" />
                <span>Take-home resources</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="form" className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6 md:mb-8">Reserve Your Spot</h2>
            
            {submitMessage && (
              <div className={`p-4 rounded-lg mb-6 ${
                submitMessage.includes('successful') 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
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
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (we'll remind you 24 hours in advance via SMS)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm">🇺🇸 +1</span>
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 123-4567"
                    className="w-full pl-16 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-600">
                  By entering your phone number, you consent to receive messages for this event via SMS. Message and data rates may apply. Reply STOP to opt out.
                </p>
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

      {/* What You'll Master Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-100 via-red-100/40 to-orange-100/30 relative">
        <div className="absolute inset-0 bg-grid-subtle"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
              What You'll <span className="text-red-600">Master</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Transform your business operations with cutting-edge AI automation strategies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                  <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl md:rounded-2xl mb-3 md:mb-6">
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-4">{benefit.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet Your Expert Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
              Meet Your <span className="text-red-600">Expert</span>
            </h2>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-200">
              <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
                {/* Expert Image */}
                <div className="text-center lg:text-left">
                  <div className="relative inline-block">
                    <img 
                      src="https://raw.githubusercontent.com/daveenci-ai/daveenci-ai-website-images/main/about_astrid.png" 
                      alt="Astrid Abrahamyan, AI Automation Expert"
                      className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-xl mx-auto lg:mx-0"
                    />
                    <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl md:text-2xl">"</span>
                    </div>
                  </div>
                </div>

                {/* Expert Details */}
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">Astrid Abrahamyan</h3>
                    <p className="text-base md:text-lg text-red-600 font-medium">AI Automation Expert</p>
                  </div>

                  <blockquote className="text-base md:text-lg text-gray-700 italic leading-relaxed">
                    "I specialize in helping businesses save time and increase efficiency through strategic AI automation. My mission is to make advanced automation accessible to every business owner, regardless of technical background."
                  </blockquote>

                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-3 md:p-4 text-center">
                      <div className="text-xl md:text-2xl font-bold text-red-600">5+</div>
                      <div className="text-xs md:text-sm text-gray-700">Years Experience</div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 md:p-4 text-center">
                      <div className="text-xl md:text-2xl font-bold text-orange-600">100%</div>
                      <div className="text-xs md:text-sm text-gray-700">Practical Focus</div>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-100 via-red-100/40 to-orange-100/30 relative">
        <div className="absolute inset-0 bg-grid-subtle"></div>
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
                    <div className="font-semibold text-gray-900 text-sm md:text-base">Tuesday, July 30, 2025</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-lg">
                    <Clock className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm md:text-base">2:00 PM CST</div>
                    <div className="text-gray-600 text-sm md:text-base">Duration: 2 hours</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-lg">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm md:text-base">7800 North Mopac Expressway</div>
                    <div className="text-gray-600 text-sm md:text-base">Austin, TX 78759</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-lg">
                    <Users className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm md:text-base">Limited to 40 attendees</div>
                    <div className="text-pink-600 font-medium text-sm md:text-base">Filling up fast!</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Map */}
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Location & Directions</h3>
              
              <div className="mb-4 md:mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3344.8!2d-97.7431!3d30.3878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644cb4e7e7e7e7e%3A0x7e7e7e7e7e7e7e7e!2s7800%20N%20Mopac%20Expy%2C%20Austin%2C%20TX%2078759!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg md:h-[250px]"
                ></iframe>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">Getting There</h4>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  Free parking available on-site. The venue is easily accessible from I-35 and Loop 1 (MoPac).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
            Join us on July 30th and discover how AI automation can revolutionize your workflow
          </p>
          
          <a 
            href="#form" 
            className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-base md:text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-red-500/25"
          >
            <span className="hidden md:inline">Tuesday, July 30, 2025 • 2:00 PM CST • Austin, TX</span>
            <span className="md:hidden">Register Now - July 30, 2:00 PM CST</span>
            <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIAutomationWorkshopAustin;