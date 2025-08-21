import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Mail, Users, BarChart3, CheckCircle, Zap } from 'lucide-react';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import EventBanner from '@/components/EventBanner';

const MarketingAutomation = () => {
  const features = [
    {
      icon: Target,
      title: "Lead Generation Systems",
      description: "Automated lead capture, qualification, and nurturing systems that work 24/7 to fill your sales pipeline."
    },
    {
      icon: Mail,
      title: "Email Campaign Automation",
      description: "Personalized email sequences that adapt based on user behavior and engagement patterns."
    },
    {
      icon: Users,
      title: "Customer Journey Mapping",
      description: "Design and automate complex customer journeys from awareness to conversion and retention."
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Real-time tracking and reporting on campaign performance, ROI, and customer lifetime value."
    }
  ];

  const benefits = [
    "Increase lead generation by 300%",
    "Reduce marketing costs by 50%",
    "Improve conversion rates by 45%",
    "Save 20+ hours per week on manual tasks",
    "Scale marketing efforts without increasing team size",
    "Achieve consistent messaging across all channels"
  ];

  const automationTypes = [
    {
      title: "Lead Nurturing Sequences",
      description: "Automated email and SMS sequences that guide prospects through your sales funnel with personalized content based on their interests and behavior.",
      icon: Target
    },
    {
      title: "Social Media Automation",
      description: "Schedule, publish, and manage social media content across multiple platforms while engaging with your audience automatically.",
      icon: Users
    },
    {
      title: "CRM Integration & Sync",
      description: "Seamlessly connect your marketing tools with your CRM to ensure no leads fall through the cracks and sales teams have complete visibility.",
      icon: Zap
    },
    {
      title: "Behavioral Trigger Campaigns",
      description: "Automatically send targeted messages based on user actions like website visits, email opens, downloads, and purchase behavior.",
      icon: BarChart3
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <EventBanner />
      {/* Hero Section */}
      <section className="relative pt-32 pb-24" style={{background: 'linear-gradient(to right, #e8d5f0 0%, #ffffff 30%, #ffffff 70%, #d5e8ff 100%)'}}>
        <div className="absolute inset-0 bg-grid"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-3xl mx-auto mb-8">
              <Target className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl leading-tight mb-8">
              <span className="text-red-600">Marketing</span> Automation
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Build intelligent marketing systems that generate, nurture, and convert leads automatically while you focus on growing your business.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Marketing Automation</h2>
            <p className="text-xl text-gray-600">Everything you need to automate your marketing operations</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 group-hover:from-red-600 group-hover:to-red-700 rounded-2xl mx-auto mb-6 transition-all duration-300">
                    <Icon className="w-8 h-8 text-red-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-gray-100 via-red-100/40 to-orange-100/30 relative">
        <div className="absolute inset-0 bg-grid"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Transform Your Marketing Results</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our marketing automation systems deliver consistent results by working around the clock to generate, qualify, and nurture leads.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Marketing Automation"
                className="rounded-2xl shadow-xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Automation Types Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Types of Marketing Automation</h2>
            <p className="text-xl text-gray-600">Comprehensive automation solutions for every aspect of your marketing</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {automationTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-xl mr-4">
                      <Icon className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{type.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{type.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-br from-gray-100 via-red-100/40 to-orange-100/30 relative">
        <div className="absolute inset-0 bg-grid"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Marketing Automation Process</h2>
            <p className="text-xl text-gray-600">From strategy to execution in 5 proven steps</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { step: "01", title: "Audit", description: "Analyze current marketing processes and identify automation opportunities" },
              { step: "02", title: "Strategy", description: "Design custom automation workflows aligned with your business goals" },
              { step: "03", title: "Setup", description: "Configure and integrate marketing automation tools and platforms" },
              { step: "04", title: "Launch", description: "Deploy automated campaigns and begin lead generation and nurturing" },
              { step: "05", title: "Optimize", description: "Monitor performance and continuously improve automation effectiveness" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center mx-auto">
                    <span className="text-white font-bold text-lg">{item.step}</span>
                  </div>
                  {index < 4 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-red-200 to-transparent"></div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                      <div className="bg-gradient-to-br from-red-100 via-orange-100/60 to-gray-100 rounded-3xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Marketing Automation ROI</h2>
              <p className="text-xl text-gray-600">See the impact on your business metrics</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-red-600 mb-2">300%</div>
                <div className="text-gray-900 font-semibold mb-1">Lead Generation Increase</div>
                <div className="text-gray-600 text-sm">Average improvement in qualified leads</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-red-600 mb-2">6x</div>
                <div className="text-gray-900 font-semibold mb-1">Revenue Growth</div>
                <div className="text-gray-600 text-sm">Typical revenue increase within 12 months</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-red-600 mb-2">75%</div>
                <div className="text-gray-900 font-semibold mb-1">Time Savings</div>
                <div className="text-gray-600 text-sm">Reduction in manual marketing tasks</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Automate Your Marketing?
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Let's build a marketing automation system that generates qualified leads and grows your business on autopilot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-red-500/25">
              Start Your Automation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-red-50 hover:border-red-300 hover:text-red-600 px-8 py-4 text-lg font-semibold rounded-lg">
              View Success Stories
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MarketingAutomation; 