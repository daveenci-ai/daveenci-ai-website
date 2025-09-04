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
      description: "Best for small businesses getting started.",
      priceNote: "One-time fee",
      popular: false,
      featuresHeader: "Core Features:",
      features: [
        "🌐 Landing Page + Form",
        "👥 Basic CRM", 
        "📧 Email Marketing",
        "🛠️ System Setup"
      ],
      buttonText: "Get Started",
      buttonAction: "starter"
    },
    {
      name: "Growth",
      price: "$8,000", 
      description: "Best for scaling businesses ready for AI-powered tools.",
      priceNote: "One-time fee",
      popular: true,
      featuresHeader: "Includes everything in Starter, plus:",
      features: [
        "✍️ Smart Blog",
        "🤖 AI Chatbot",
        "⭐ Lead Scoring", 
        "📰 Email Newsletters"
      ],
      buttonText: "Get Started",
      buttonAction: "growth"
    },
    {
      name: "AI Max",
      price: "$10,000+",
      description: "Best for enterprises wanting complete AI automation.",
      priceNote: "Custom Quote",
      popular: false,
      featuresHeader: "Includes everything in Growth, plus:",
      features: [
        "📊 Analytics Dashboard",
        "👤 AI Avatar Tools",
        "⚙️ Advanced Automation",
        "🔌 Custom Integrations"
      ],
      buttonText: "Contact Sales",
      buttonAction: "contact"
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
          starter: true,
          growth: true,
          aiMax: true,
          price: "$900",
          period: "One-time"
        },
        {
          name: "Chatbot Assistant",
          type: "Add-on",
          starter: true,
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
            starter: true,
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
            starter: true,
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
        return <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-500 flex items-center justify-center mx-auto"><Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" /></div>;
      } else if (column === 'auto') {
        return <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500 flex items-center justify-center mx-auto"><Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" /></div>;
      } else if (column === 'db') {
        return <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 flex items-center justify-center mx-auto"><Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" /></div>;
      }
    } else {
      return <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-500 flex items-center justify-center mx-auto"><X className="w-3 h-3 sm:w-4 sm:h-4 text-white" /></div>;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 sm:pb-16" style={{background: 'linear-gradient(to right, #e8d5f0 0%, #ffffff 30%, #ffffff 70%, #d5e8ff 100%)'}}>
        <div className="absolute inset-0 bg-grid"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-3xl mx-auto mb-6 sm:mb-8">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 sm:w-6 sm:h-6 bg-white rounded-full"></div>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900 leading-tight mb-4 sm:mb-6">
              AI-Powered Growth System
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-2 sm:mb-4">Modular Pricing Menu</p>
            <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 px-4">
              Choose what you need. Build what fits. <span className="text-red-600 font-semibold">Fully owned. Fully scalable.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Main Pricing Tiers */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Choose Your Growth Engine</h2>
            <p className="text-lg sm:text-xl text-gray-600 px-4">Get started quickly with our expertly crafted packages.</p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-7xl mx-auto items-end justify-center">
            {pricingTiers.map((tier, index) => (
              <div key={index} className={`relative flex flex-col w-full max-w-sm mx-auto ${tier.popular ? 'lg:w-80 lg:scale-105' : 'lg:w-72'} ${tier.popular ? 'z-10' : 'z-0'} lg:mx-0`}>
                {tier.popular && (
                  <div className="bg-red-500 text-white text-center py-2 sm:py-3 px-4 text-sm font-bold flex items-center justify-center rounded-t-2xl -mb-1 relative z-20 shadow-lg">
                    <Star className="w-4 h-4 mr-2" fill="currentColor" />
                    Most Popular
                  </div>
                )}
                <div className={`bg-white shadow-lg overflow-hidden flex flex-col h-full ${tier.popular ? 'shadow-xl border-2 border-red-500 rounded-b-2xl' : 'rounded-2xl'}`}>
                  <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">{tier.description}</p>
                  
                  {/* Price Section */}
                  <div className="mb-4 sm:mb-6">
                    <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{tier.price}</div>
                    <div className="text-sm text-gray-500">{tier.priceNote}</div>
                  </div>
                  
                  <hr className="border-gray-200 mb-4 sm:mb-6" />
                  
                  {/* Features */}
                  <div className="flex-1 mb-6 sm:mb-8">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 sm:mb-4">{tier.featuresHeader}</h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Button - Always at bottom */}
                  <div className="mt-auto">
                    <Button 
                    className={`w-full py-3 sm:py-4 text-base sm:text-lg ${
                      tier.popular 
                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                    onClick={() => {
                      if (tier.buttonAction === 'contact') {
                        window.open('https://calendly.com/daveenci/astrid', '_blank');
                      } else {
                        window.open('https://calendly.com/daveenci/astrid', '_blank');
                      }
                    }}
                  >
                    {tier.buttonText} <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                    </Button>
                  </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Ownership Section */}
      <section className="py-12 sm:py-16 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-red-600 rounded-full">
              <Check className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">Full Ownership, No Lock-In</h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto px-4">
              All systems are built for complete ownership. You control your data, your code, and your hosting. 
              There are no vendor lock-ins and no recurring platform fees. Just pure, scalable power.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 sm:space-y-16">
            {detailedFeatures.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center mb-6 sm:mb-8">
                  <div className={`w-1 h-8 sm:h-12 mr-3 sm:mr-4 ${
                    category.color === 'purple' ? 'bg-purple-500' :
                    category.color === 'orange' ? 'bg-orange-500' :
                    category.color === 'blue' ? 'bg-blue-500' :
                    category.color === 'green' ? 'bg-green-500' :
                    'bg-gray-500'
                  }`}></div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{category.category}</h3>
                </div>
                
                <div className="bg-gray-50 rounded-2xl overflow-hidden">
                  {/* Desktop Table Header */}
                  <div className="hidden lg:grid grid-cols-6 gap-4 p-6 bg-gray-100 text-sm font-medium text-gray-600">
                    <div className="col-span-2">Feature</div>
                    <div className="text-center flex items-center justify-center">
                      <Brain className="w-4 h-4 mr-1" />
                      Artificial Intelligence
                    </div>
                    <div className="text-center flex items-center justify-center">
                      <Zap className="w-4 h-4 mr-1" />
                      Automation
                    </div>
                    <div className="text-center flex items-center justify-center">
                      <Database className="w-4 h-4 mr-1" />
                      Database
                    </div>
                    <div className="text-right">Price</div>
                  </div>
                  
                  {/* Mobile/Tablet Optimized Cards */}
                  <div className="lg:hidden space-y-4 p-4 sm:p-6">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <span className={`inline-block px-2 py-1 rounded text-xs font-medium mr-2 ${
                                item.type === 'Core' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
                              }`}>
                                {item.type}
                              </span>
                            </div>
                            <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">{item.name}</h4>
                          </div>
                          <div className="text-right ml-4">
                            <div className="font-bold text-gray-900 text-sm sm:text-base">{item.price}</div>
                            {item.period && <div className="text-xs sm:text-sm text-gray-500">{item.period}</div>}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="text-center">
                            <div className="text-xs text-gray-500 mb-1 flex items-center justify-center">
                              <Brain className="w-3 h-3 mr-1" />
                              <span className="hidden sm:inline">AI</span>
                            </div>
                            {renderStatusIcon(item.starter, 'ai')}
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-500 mb-1 flex items-center justify-center">
                              <Zap className="w-3 h-3 mr-1" />
                              <span className="hidden sm:inline">Auto</span>
                            </div>
                            {renderStatusIcon(item.growth, 'auto')}
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-500 mb-1 flex items-center justify-center">
                              <Database className="w-3 h-3 mr-1" />
                              <span className="hidden sm:inline">DB</span>
                            </div>
                            {renderStatusIcon(item.aiMax, 'db')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Table Rows */}
                  <div className="hidden lg:block">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Foundations */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">System Foundations</h2>
            <p className="text-lg sm:text-xl text-gray-600 px-4">One-time setup for a robust, scalable infrastructure.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {systemFoundations.map((foundation, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 sm:p-8 text-center">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">{foundation.name}</h3>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{foundation.price}</div>
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