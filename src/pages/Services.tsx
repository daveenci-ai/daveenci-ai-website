import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Target, Code, Zap, Cog } from 'lucide-react';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import EventBanner from '@/components/EventBanner';

const Services = () => {
  const services = [
    {
      icon: Brain,
      title: "AI Solutions",
      description: "Intelligent automation systems that learn and adapt to your business needs",
      features: ["Machine Learning Integration", "Predictive Analytics", "Automated Decision Making", "Smart Data Processing"],
      link: "/services/ai-solutions"
    },
    {
      icon: Target,
      title: "Marketing Automation",
      description: "Lead generation and nurturing systems that work around the clock",
      features: ["Lead Generation Systems", "Email Campaign Automation", "Customer Journey Mapping", "ROI Tracking"],
      link: "/services/marketing-automation"
    },
    {
      icon: Code,
      title: "Custom Software",
      description: "Tailored business applications built specifically for your operations",
      features: ["Custom Dashboards", "Business Process Automation", "Data Management Systems", "API Development"],
      link: "/services/custom-software"
    },
    {
      icon: Zap,
      title: "Systems Integration",
      description: "Connect your existing tools and create seamless automated workflows",
      features: ["CRM Integration", "Third-party API Connections", "Data Synchronization", "Workflow Automation"],
      link: "/services/systems-integration"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <EventBanner />
      <EventBanner />
      {/* Hero Section */}
      <section className="relative pt-32 pb-24" style={{background: 'linear-gradient(to right, #e8d5f0 0%, #ffffff 30%, #ffffff 70%, #d5e8ff 100%)'}}>
        <div className="absolute inset-0 bg-grid"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-3xl mx-auto mb-8">
              <Cog className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl leading-tight mb-8">
              Our <span className="text-red-600">Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We specialize in building AI-powered marketing systems and custom solutions that help businesses automate their operations and accelerate growth.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-red-200">
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-100 to-red-200 group-hover:from-red-600 group-hover:to-red-700 mb-6 transition-all duration-300">
                      <Icon className="w-8 h-8 text-red-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white w-full group-hover:scale-105 transition-all duration-200">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-100 via-red-100/40 to-orange-100/30 relative">
        <div className="absolute inset-0 bg-grid"></div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Let's discuss how our AI-powered solutions can help you automate operations and accelerate growth.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-red-500/25"
            onClick={() => window.open('https://calendly.com/daveenci/astrid', '_blank')}
          >
            Schedule a Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services; 