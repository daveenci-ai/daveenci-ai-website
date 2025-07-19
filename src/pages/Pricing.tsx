import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, X, Star, ArrowRight, Brain, Zap, Database } from 'lucide-react';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

const Pricing = () => {
  const pricingTiers = [
    {
      name: "Starter",
      price: "$5,000",
      description: "Perfect for small businesses getting started",
      popular: false,
      features: [
        "Landing Page + Form",
        "Basic CRM",
        "Email Marketing",
        "System Setup"
      ]
    },
    {
      name: "Growth",
      price: "$8,000",
      description: "Scale your business with AI-powered tools",
      popular: true,
      features: [
        "Everything in Starter",
        "Smart Blog",
        "Chatbot Assistant",
        "Lead Scoring",
        "Email Newsletters"
      ]
    },
    {
      name: "AI Max",
      price: "$10,000+",
      description: "Complete AI-powered business ecosystem",
      popular: false,
      features: [
        "Everything in Growth",
        "Analytics Dashboard",
        "AI Avatar Tools",
        "Advanced Automation",
        "Custom Integrations"
      ]
    }
  ];

  const detailedFeatures = [

    {
      category: "Website",
      color: "blue",
      items: [
        {
          name: "Landing Page + Intake Form / Calendar",
          type: "Core",
          starter: true,
          growth: true,
          aiMax: true,
          price: "$2,500",
          period: "One-time"
        },
        {
          name: "Smart Blog (SEO & AEO Optimized)",
          type: "Add-on",
          starter: false,
          growth: true,
          aiMax: true,
          price: "$900",
          period: "One-time"
        },
        {
          name: "Chatbot Assistant",
          type: "Add-on",
          starter: false,
          growth: true,
          aiMax: true,
          price: "$1,000",
          period: "One-time"
        }
      ]
    },
    {
        category: "CRM",
        color: "green",
        items: [
          {
            name: "CRM Table",
            type: "Core",
            starter: true,
            growth: true,
            aiMax: true,
            price: "$1,000",
            period: "One-time"
          },
          {
            name: "Customer Journey",
            type: "Add-on",
            starter: true,
            growth: true,
            aiMax: true,
            price: "$1,500",
            period: "One-time"
          },
          {
            name: "Lead Scoring System",
            type: "Add-on",
            starter: true,
            growth: true,
            aiMax: true,
            price: "$1,500",
            period: "One-time"
          },
          {
            name: "Personalized Email Marketing",
            type: "Add-on",
            starter: true,
            growth: true,
            aiMax: true,
            price: "$1,150",
            period: "One-time"
          },
          {
            name: "Auto-Reply Email System",
            type: "Add-on",
            /*starter: false,*/
            growth: true,
            aiMax: true,
            price: "$150",
            period: "One-time"
          },
          {
            name: "Email Newsletters",
            type: "Add-on",
            starter: true,
            growth: true,
            aiMax: true,
            price: "$400",
            period: "One-time"
          },
          {
            name: "SMS",
            type: "Add-on",
            starter: true,
            growth: true,
            aiMax: true,
            price: "$700",
            period: "One-time"
          },
          {
            name: "Analytics Dashboard",
            type: "Add-on",
            /*starter: true,*/
            growth: true,
            aiMax: true,
            price: "$2,000",
            period: "One-time"
          }
        ]
      },
    {
      category: "Marketing",
      color: "purple",
      items: [
        {
          name: "Paid Media",
          type: "Core",
          starter: true,
          growth: true,
          aiMax: true,
          price: "$1,250",
          period: "Monthly"
        },
        {
          name: "Organic Media",
          type: "Core",
          starter: true,
          growth: true,
          aiMax: true,
          price: "$500",
          period: "Monthly"
        }
      ]
    },
    {
      category: "Tools",
      color: "orange",
      items: [
        {
          name: "AI-Copywriter Tune Up",
          type: "By Requirement",
          starter: true,
          growth: true,
          aiMax: true,
          price: "$500",
          period: "One-time"
        },
        {
          name: "AI Avatar Image Generator",
          type: "Add-on",
          starter: true,
          growth: true,
          aiMax: true,
          price: "$500",
          period: "One-time"
        },
        {
          name: "AI Avatar Video Generator",
          type: "Add-on",
          starter: true,
          growth: true,
          aiMax: true,
          price: "$1,500",
          period: "One-time"
        }
      ]
    },
    {
      category: "Voice",
      color: "blue",
      items: [
        {
          name: "Voice Assistant Integration",
          type: "Add-on",
          starter: true,
          growth: true,
          aiMax: true,
          price: "Talk To Us",
          period: ""
        }
      ]
    }
  ];

  const systemFoundations = [
    {
      name: "GitHub Account",
      price: "$150",
      period: "One-time"
    },
    {
      name: "Domain / DNS Records",
      price: "$150",
      period: "One-time"
    },
    {
      name: "Hosting / Server / Database",
      price: "$350",
      period: "One-time"
    },
    {
      name: "APIs / Webhooks",
      price: "$350",
      period: "One-time"
    }
  ];

  const renderStatusIcon = (included: boolean, column: string) => {
    if (included) {
      if (column === 'ai') {
        return <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mx-auto"><Check className="w-4 h-4 text-white" /></div>;
      } else if (column === 'auto') {
        return <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mx-auto"><Check className="w-4 h-4 text-white" /></div>;
      } else if (column === 'db') {
        return <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mx-auto"><Check className="w-4 h-4 text-white" /></div>;
      }
    } else {
      return <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mx-auto"><X className="w-4 h-4 text-white" /></div>;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16" style={{background: 'linear-gradient(to right, #e8d5f0 0%, #ffffff 30%, #ffffff 70%, #d5e8ff 100%)'}}>
        <div className="absolute inset-0 bg-grid-subtle"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-3xl mx-auto mb-8">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl leading-tight mb-6">
              AI-Powered Growth System
            </h1>
            <p className="text-xl text-gray-600 mb-4">Modular Pricing Menu</p>
            <p className="text-lg text-gray-700 mb-8">
              Choose what you need. Build what fits. <span className="text-red-600 font-semibold">Fully owned. Fully scalable.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Main Pricing Tiers */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Growth Engine</h2>
            <p className="text-xl text-gray-600">Get started quickly with our expertly crafted packages.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <div key={index} className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${tier.popular ? 'ring-2 ring-red-500' : ''}`}>
                {tier.popular && (
                  <div className="bg-red-500 text-white text-center py-2 px-4 text-sm font-medium flex items-center justify-center">
                    <Star className="w-4 h-4 mr-2" fill="currentColor" />
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <p className="text-gray-600 mb-6">{tier.description}</p>
                  <div className="text-4xl font-bold text-gray-900 mb-8">{tier.price}</div>
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full py-4 text-lg ${
                      tier.popular 
                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                  >
                    Choose {tier.name} <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Ownership Section */}
      <section className="py-16 bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center justify-center w-16 h-16 bg-red-600 rounded-full">
              <Check className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Full Ownership, No Lock-In</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              All systems are built for complete ownership. You control your data, your code, and your hosting. 
              There are no vendor lock-ins and no recurring platform fees. Just pure, scalable power.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-16">
            {detailedFeatures.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center mb-8">
                  <div className={`w-1 h-12 mr-4 ${
                    category.color === 'purple' ? 'bg-purple-500' :
                    category.color === 'orange' ? 'bg-orange-500' :
                    category.color === 'blue' ? 'bg-blue-500' :
                    category.color === 'green' ? 'bg-green-500' :
                    'bg-gray-500'
                  }`}></div>
                  <h3 className="text-3xl font-bold text-gray-900">{category.category}</h3>
                </div>
                
                <div className="bg-gray-50 rounded-2xl overflow-hidden">
                  <div className="grid grid-cols-6 gap-4 p-6 bg-gray-100 text-sm font-medium text-gray-600">
                    <div className="col-span-2">Feature</div>
                    <div className="text-center flex items-center justify-center">
                      <Brain className="w-4 h-4 mr-1" />
                      AI
                    </div>
                    <div className="text-center flex items-center justify-center">
                      <Zap className="w-4 h-4 mr-1" />
                      Auto
                    </div>
                    <div className="text-center flex items-center justify-center">
                      <Database className="w-4 h-4 mr-1" />
                      DB
                    </div>
                    <div className="text-center">Price</div>
                  </div>
                  
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="grid grid-cols-6 gap-4 p-6 border-t border-gray-200 items-center">
                      <div className="col-span-2">
                        <div className="flex items-center">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium mr-3 ${
                            item.type === 'Core' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
                          }`}>
                            {item.type}
                          </span>
                          <span className="font-medium text-gray-900">{item.name}</span>
                        </div>
                        {item.name.includes('AI-Powered Copywriter Tool on request') && (
                          <div className="text-sm text-gray-500 mt-1">+ AI-Powered Copywriter Tool on request</div>
                        )}
                      </div>
                                             <div className="text-center">{renderStatusIcon(item.starter, 'ai')}</div>
                       <div className="text-center">{renderStatusIcon(item.growth, 'auto')}</div>
                       <div className="text-center">{renderStatusIcon(item.aiMax, 'db')}</div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{item.price}</div>
                        {item.period && <div className="text-sm text-gray-500">{item.period}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Build Custom Solution */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Build a Custom Solution</h2>
            <p className="text-xl text-gray-600">Select individual services to create a system that's perfectly tailored to your needs.</p>
          </div>
        </div>
      </section>

      {/* System Foundations */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">System Foundations</h2>
            <p className="text-xl text-gray-600">One-time setup for a robust, scalable infrastructure.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {systemFoundations.map((foundation, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{foundation.name}</h3>
                <div className="text-3xl font-bold text-gray-900 mb-2">{foundation.price}</div>
                <div className="text-sm text-gray-500">{foundation.period}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing; 