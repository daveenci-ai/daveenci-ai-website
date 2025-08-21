import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Database, Shield, Zap, CheckCircle, Monitor } from 'lucide-react';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import EventBanner from '@/components/EventBanner';

const CustomSoftware = () => {
  const features = [
    {
      icon: Code,
      title: "Custom Dashboards",
      description: "Tailored business intelligence dashboards that provide real-time insights specific to your industry and KPIs."
    },
    {
      icon: Database,
      title: "Data Management Systems",
      description: "Robust data storage, processing, and management solutions that scale with your business growth."
    },
    {
      icon: Monitor,
      title: "Business Process Automation",
      description: "Custom applications that automate complex workflows and eliminate manual, repetitive tasks."
    },
    {
      icon: Zap,
      title: "API Development",
      description: "Secure, scalable APIs that connect your systems and enable seamless data exchange between platforms."
    }
  ];

  const benefits = [
    "100% tailored to your specific business needs",
    "Scalable architecture that grows with your business",
    "Full ownership and control of your software",
    "Ongoing support and maintenance included",
    "Integration with existing systems and tools",
    "Enhanced security and data protection"
  ];

  const softwareTypes = [
    {
      title: "Customer Relationship Management (CRM)",
      description: "Custom CRM systems designed around your unique sales process, customer journey, and business requirements for maximum efficiency.",
      icon: Database,
      features: ["Custom Fields & Workflows", "Advanced Reporting", "Integration Capabilities", "Mobile Access"]
    },
    {
      title: "Business Intelligence Dashboards",
      description: "Real-time dashboards that consolidate data from multiple sources to provide actionable insights for better decision-making.",
      icon: Monitor,
      features: ["Real-time Data Visualization", "Custom KPI Tracking", "Automated Reporting", "Multi-user Access"]
    },
    {
      title: "Workflow Automation Tools",
      description: "Custom applications that automate complex business processes, reducing manual work and improving accuracy across your organization.",
      icon: Zap,
      features: ["Process Automation", "Task Management", "Approval Workflows", "Notification Systems"]
    },
    {
      title: "Data Analytics Platforms",
      description: "Sophisticated analytics tools that process large datasets to uncover patterns, trends, and opportunities specific to your business.",
      icon: Code,
      features: ["Advanced Analytics", "Predictive Modeling", "Data Mining", "Custom Algorithms"]
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
              <Code className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl leading-tight mb-8">
              <span className="text-red-600">Custom</span> Software
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Build powerful, tailored software solutions that perfectly fit your business processes and give you a competitive advantage in your market.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Custom Software Solutions</h2>
            <p className="text-xl text-gray-600">Built specifically for your business requirements</p>
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
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Custom Software?</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Unlike off-the-shelf solutions, custom software is built around your exact needs, ensuring perfect alignment with your business processes and goals.
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
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Custom Software Development"
                className="rounded-2xl shadow-xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Software Types Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Types of Custom Software We Build</h2>
            <p className="text-xl text-gray-600">Comprehensive solutions for every business need</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {softwareTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                  <div className="flex items-center mb-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-xl mr-4">
                      <Icon className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{type.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">{type.description}</p>
                  
                  <div className="grid sm:grid-cols-2 gap-3">
                    {type.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-24 bg-gradient-to-br from-gray-100 via-red-100/40 to-orange-100/30 relative">
        <div className="absolute inset-0 bg-grid"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Technology Stack</h2>
            <p className="text-xl text-gray-600">Modern, reliable technologies for robust solutions</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl mx-auto mb-6">
                <Code className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Frontend</h3>
              <div className="space-y-2 text-gray-600">
                <div>React, Vue.js, Angular</div>
                <div>TypeScript, JavaScript</div>
                <div>Tailwind CSS, Bootstrap</div>
                <div>Progressive Web Apps</div>
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl mx-auto mb-6">
                <Database className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Backend</h3>
              <div className="space-y-2 text-gray-600">
                <div>Node.js, Python, .NET</div>
                <div>PostgreSQL, MongoDB</div>
                <div>REST APIs, GraphQL</div>
                <div>Microservices Architecture</div>
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl mx-auto mb-6">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Infrastructure</h3>
              <div className="space-y-2 text-gray-600">
                <div>AWS, Azure, Google Cloud</div>
                <div>Docker, Kubernetes</div>
                <div>CI/CD Pipelines</div>
                <div>Security & Monitoring</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Process Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Development Process</h2>
            <p className="text-xl text-gray-600">From concept to deployment in 6 proven phases</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Discovery", description: "Requirements gathering, stakeholder interviews, and technical feasibility analysis" },
              { step: "02", title: "Design", description: "UI/UX design, system architecture, and technical specifications documentation" },
              { step: "03", title: "Development", description: "Agile development with regular sprints, code reviews, and continuous integration" },
              { step: "04", title: "Testing", description: "Comprehensive testing including unit, integration, and user acceptance testing" },
              { step: "05", title: "Deployment", description: "Production deployment, monitoring setup, and performance optimization" },
              { step: "06", title: "Maintenance", description: "Ongoing support, updates, feature enhancements, and technical maintenance" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center mx-auto">
                    <span className="text-white font-bold text-lg">{item.step}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-100 via-red-100/40 to-orange-100/30 relative">
        <div className="absolute inset-0 bg-grid"></div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Build Your Custom Solution?
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Let's discuss your requirements and create a custom software solution that perfectly fits your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-red-500/25">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-red-50 hover:border-red-300 hover:text-red-600 px-8 py-4 text-lg font-semibold rounded-lg">
              View Portfolio
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CustomSoftware; 