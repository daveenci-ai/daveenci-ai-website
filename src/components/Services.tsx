
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Zap, Code, Settings } from 'lucide-react';

const services = [
  {
    icon: Bot,
    title: "AI-Driven Digital Advertising",
    description: "Intelligent ad optimization that automatically adjusts campaigns, targets ideal audiences, and maximizes ROI across all platforms using advanced machine learning.",
    features: ["Smart Bid Management", "Audience Optimization", "Performance Analytics"]
  },
  {
    icon: Zap,
    title: "AI-Powered Automations",
    description: "End-to-end workflow automation that handles repetitive tasks, streamlines operations, and scales your business processes without manual intervention.",
    features: ["Workflow Optimization", "Task Automation", "Process Intelligence"]
  },
  {
    icon: Code,
    title: "AI-Enhanced Content Generation",
    description: "Create compelling, personalized content at scale using AI that understands your brand voice and generates high-converting copy for all channels.",
    features: ["Content Creation", "Brand Voice Training", "Multi-Channel Publishing"]
  },
  {
    icon: Settings,
    title: "CRM & Email Solutions",
    description: "Intelligent customer relationship management with automated email sequences, lead scoring, and personalized communication that converts prospects into customers.",
    features: ["Lead Management", "Email Automation", "Customer Analytics"]
  }
];

const Services = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-red-600">Our Services</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Built for Modern Business
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We specialize in creating AI-powered solutions that transform how businesses operate, scale, and succeed.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-gray-200">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <service.icon className="h-8 w-8 text-red-600" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{service.title}</CardTitle>
                </div>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
