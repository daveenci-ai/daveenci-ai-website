import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Database, Globe, Settings, CheckCircle, GitMerge } from 'lucide-react';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import EventBanner from '@/components/EventBanner';

const SystemsIntegration = () => {
  const features = [
    {
      icon: GitMerge,
      title: "CRM Integration",
      description: "Connect your customer relationship management system with marketing tools, support platforms, and business applications."
    },
    {
      icon: Globe,
      title: "API Connections",
      description: "Seamlessly integrate third-party services and platforms through secure, reliable API connections and data synchronization."
    },
    {
      icon: Database,
      title: "Data Synchronization",
      description: "Ensure consistent, real-time data flow between all your business systems and eliminate data silos."
    },
    {
      icon: Settings,
      title: "Workflow Automation",
      description: "Create automated workflows that trigger actions across multiple systems based on specific events or conditions."
    }
  ];

  const benefits = [
    "Eliminate manual data entry and reduce errors",
    "Improve data accuracy and consistency across systems",
    "Increase operational efficiency by 60%",
    "Save 15+ hours per week on manual tasks",
    "Enable real-time reporting and analytics",
    "Scale integrations as your business grows"
  ];

  const integrationServices = [
    {
      title: "CRM & Marketing Platform Integration",
      description: "Connect your CRM with email marketing, social media, and advertising platforms to create a unified customer experience and eliminate data silos.",
      icon: GitMerge,
      integrations: ["Salesforce ↔ HubSpot", "Mailchimp ↔ Zapier", "Facebook Ads ↔ CRM", "Google Analytics ↔ Dashboard"]
    },
    {
      title: "E-commerce System Integration",
      description: "Synchronize your online store with inventory management, accounting, shipping, and customer service platforms for streamlined operations.",
      icon: Globe,
      integrations: ["Shopify ↔ QuickBooks", "WooCommerce ↔ Inventory", "Amazon ↔ Fulfillment", "PayPal ↔ Accounting"]
    },
    {
      title: "Business Intelligence Connections",
      description: "Aggregate data from multiple sources into centralized dashboards and reporting systems for comprehensive business insights.",
      icon: Database,
      integrations: ["ERP ↔ Analytics", "Sales ↔ Reporting", "Finance ↔ Dashboard", "Operations ↔ KPIs"]
    },
    {
      title: "Communication Tool Integration",
      description: "Unify your communication channels by connecting email, chat, video conferencing, and project management tools.",
      icon: Settings,
      integrations: ["Slack ↔ Project Tools", "Teams ↔ CRM", "Email ↔ Support Desk", "Calendar ↔ Scheduling"]
    }
  ];

  const commonIntegrations = [
    { name: "Salesforce", category: "CRM" },
    { name: "HubSpot", category: "Marketing" },
    { name: "Shopify", category: "E-commerce" },
    { name: "QuickBooks", category: "Accounting" },
    { name: "Mailchimp", category: "Email Marketing" },
    { name: "Google Workspace", category: "Productivity" },
    { name: "Microsoft 365", category: "Office Suite" },
    { name: "Slack", category: "Communication" },
    { name: "Zapier", category: "Automation" },
    { name: "Monday.com", category: "Project Management" },
    { name: "Stripe", category: "Payments" },
    { name: "AWS", category: "Cloud Services" }
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
              <Zap className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl leading-tight mb-8">
              <span className="text-red-600">Systems</span> Integration
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect all your business tools and platforms to create seamless automated workflows that eliminate data silos and boost operational efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Integration Services</h2>
            <p className="text-xl text-gray-600">Connect your entire business ecosystem</p>
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
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Transform Your Operations</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Stop wasting time on manual data entry and disconnected systems. Our integration solutions create a unified business ecosystem that works seamlessly together.
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
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Systems Integration"
                className="rounded-2xl shadow-xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Services Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Types of Integrations We Build</h2>
            <p className="text-xl text-gray-600">Comprehensive integration solutions for every business need</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {integrationServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                  <div className="flex items-center mb-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-xl mr-4">
                      <Icon className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-sm mb-3">Common Integrations:</h4>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {service.integrations.map((integration, integrationIndex) => (
                        <div key={integrationIndex} className="flex items-center space-x-2 text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                          <span>{integration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Common Integrations Section */}
      <section className="py-24 bg-gradient-to-br from-gray-100 via-red-100/40 to-orange-100/30 relative">
        <div className="absolute inset-0 bg-grid"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Platforms We Integrate</h2>
            <p className="text-xl text-gray-600">We work with the tools you already use</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {commonIntegrations.map((platform, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                  <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">{platform.category}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Don't see your platform? We integrate with virtually any system that has an API.</p>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-red-50 hover:border-red-300 hover:text-red-600">
              Request Custom Integration
            </Button>
          </div>
        </div>
      </section>

      {/* Integration Process Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Integration Process</h2>
            <p className="text-xl text-gray-600">From assessment to automation in 5 steps</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { step: "01", title: "System Audit", description: "Analyze your current tools and identify integration opportunities" },
              { step: "02", title: "Integration Plan", description: "Design optimal data flows and workflow automation strategies" },
              { step: "03", title: "API Setup", description: "Configure secure connections between all your business systems" },
              { step: "04", title: "Data Mapping", description: "Ensure accurate data synchronization and field matching" },
              { step: "05", title: "Testing & Launch", description: "Thoroughly test integrations and deploy automated workflows" }
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
      <section className="py-24 bg-gradient-to-br from-gray-100 via-red-100/40 to-orange-100/30 relative">
        <div className="absolute inset-0 bg-grid"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-12 shadow-lg">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Integration Impact</h2>
              <p className="text-xl text-gray-600">Measurable results from connected systems</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-red-600 mb-2">85%</div>
                <div className="text-gray-900 font-semibold mb-1">Time Savings</div>
                <div className="text-gray-600 text-sm">Reduction in manual data entry</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-red-600 mb-2">99%</div>
                <div className="text-gray-900 font-semibold mb-1">Data Accuracy</div>
                <div className="text-gray-600 text-sm">Elimination of human errors</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-red-600 mb-2">4x</div>
                <div className="text-gray-900 font-semibold mb-1">Productivity Boost</div>
                <div className="text-gray-600 text-sm">Improved operational efficiency</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Connect Your Systems?
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Let's build integrations that eliminate data silos and create seamless automated workflows across your entire business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-red-500/25">
              Start Integration Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-red-50 hover:border-red-300 hover:text-red-600 px-8 py-4 text-lg font-semibold rounded-lg">
              Schedule Assessment
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SystemsIntegration; 