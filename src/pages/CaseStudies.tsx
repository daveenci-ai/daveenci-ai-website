import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Users, Zap, FileText } from 'lucide-react';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

const CaseStudies = () => {
  const caseStudies = [
    {
      title: "E-commerce Lead Generation Automation",
      client: "Tech Retailer",
      industry: "E-commerce",
      challenge: "Manual lead qualification was consuming 20+ hours per week and missing qualified prospects.",
      solution: "Built an AI-powered lead scoring system with automated email sequences and CRM integration.",
      results: [
        "300% increase in qualified leads",
        "80% reduction in manual work",
        "45% improvement in conversion rates",
        "ROI achieved in 6 weeks"
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Real Estate CRM Integration & Automation",
      client: "Property Management Firm",
      industry: "Real Estate",
      challenge: "Disconnected systems causing data silos and missed follow-ups with potential tenants.",
      solution: "Integrated multiple platforms and created automated workflows for lead nurturing and property matching.",
      results: [
        "90% faster lead response time",
        "60% increase in tenant conversions",
        "50% reduction in administrative tasks",
        "Complete data synchronization"
      ],
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "SaaS Customer Onboarding Automation",
      client: "Software Company",
      industry: "SaaS",
      challenge: "High customer churn during onboarding due to complexity and lack of personalized guidance.",
      solution: "Developed an AI-driven onboarding system with personalized workflows and proactive support triggers.",
      results: [
        "75% reduction in churn rate",
        "40% faster time-to-value",
        "95% customer satisfaction score",
        "85% reduction in support tickets"
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "E-commerce Automation Revolution",
      client: "TechRetail Co.",
      industry: "E-commerce",
      challenge: "Manual order processing and customer service consuming 60+ hours weekly",
      solution: "Custom AI chatbot + automated order processing system",
      results: ["85% reduction in manual tasks", "24/7 customer support", "$50K annual savings"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Lead Generation on Autopilot",
      client: "GrowthStart Agency",
      industry: "Marketing",
      challenge: "Inconsistent lead quality and time-intensive qualification process",
      solution: "AI-powered lead scoring + automated nurture sequences",
      results: ["300% increase in qualified leads", "50% faster sales cycle", "ROI of 450%"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Operations Intelligence System",
      client: "ManufacturePro Inc.",
      industry: "Manufacturing",
      challenge: "No visibility into production bottlenecks and inefficiencies",
      solution: "Custom dashboard with predictive analytics and real-time monitoring",
      results: ["40% improvement in efficiency", "Predictive maintenance", "15% cost reduction"],
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {/* Hero Section */}
      <section className="relative pt-32 pb-24" style={{background: 'linear-gradient(to right, #e8d5f0 0%, #ffffff 30%, #ffffff 70%, #d5e8ff 100%)'}}>
        <div className="absolute inset-0 bg-grid"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-3xl mx-auto mb-8">
              <FileText className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl leading-tight mb-8">
              <span className="text-red-600">Case Studies</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              See how we've helped businesses transform their operations with AI-powered marketing automation and custom solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-24">
            {caseStudies.map((study, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    <img 
                      src={study.image} 
                      alt={study.title}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center space-x-2 text-sm text-red-600 font-medium mb-2">
                        <span>{study.client}</span>
                        <span>•</span>
                        <span>{study.industry}</span>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">{study.title}</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Challenge</h4>
                        <p className="text-gray-600">{study.challenge}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Solution</h4>
                        <p className="text-gray-600">{study.solution}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Results</h4>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {study.results.map((result, resultIndex) => (
                            <div key={resultIndex} className="flex items-center space-x-3 p-3 bg-green-100 rounded-lg">
                              <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0" />
                              <span className="text-gray-700 font-medium">{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-gray-100 via-red-100/40 to-orange-100/30 relative">
        <div className="absolute inset-0 bg-grid"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Proven Results Across Industries
            </h2>
            <p className="text-xl text-gray-600">
              Our track record speaks for itself
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl mx-auto mb-4">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Successful Projects</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-red-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">300%</div>
              <div className="text-gray-600">Average ROI Increase</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl mx-auto mb-4">
                <Zap className="w-8 h-8 text-red-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">80%</div>
              <div className="text-gray-600">Time Savings</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Be Our Next Success Story?
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Let's discuss how we can help you achieve similar results with AI-powered automation.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-red-500/25">
            Start Your Project
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudies; 