import React from 'react';
import { Zap, Target, Users, BarChart3, Cog, Rocket } from 'lucide-react';

const UseCases = () => {
  const useCases = [
    {
      icon: Target,
      title: 'Replace expensive SaaS',
      description: 'We create custom marketing solutions that eliminate ongoing subscription costs and vendor lock-in.'
    },
    {
      icon: Cog,
      title: 'Build internal tools',
      description: 'We develop tailored applications to automate your internal marketing processes and workflows.'
    },
    {
      icon: Zap,
      title: 'Automate lead generation',
      description: 'We design AI-powered systems that identify and nurture prospects automatically for your business.'
    },
    {
      icon: Users,
      title: 'Develop client portals',
      description: 'We build secure, user-friendly interfaces that let your clients track campaign performance in real-time.'
    },
    {
      icon: BarChart3,
      title: 'Streamline workflows',
      description: 'We integrate marketing automation with your existing CRM and business systems seamlessly.'
    },
    {
      icon: Rocket,
      title: 'Rapidly prototype campaigns',
      description: 'We quickly build and test marketing campaigns to validate your strategies and optimize performance.'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-100/50 to-orange-200/60 relative">
      {/* Enhanced Grid Background */}
      <div className="absolute inset-0 bg-grid-subtle"></div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Save time, money and headaches.<br />
            We build your <span className="text-red-600">marketing systems</span> for you.
          </h2>
          <p className="text-xl text-gray-600">
            No hiring developers, no learning complex tools, no time-consuming setup.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <div 
                key={index} 
                className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white hover:from-white hover:to-red-50/20 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-red-200/50"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-100 to-red-200 group-hover:from-red-600 group-hover:to-red-700 mb-6 transition-all duration-300 shadow-sm group-hover:shadow-lg">
                  <Icon className="w-6 h-6 text-red-600 group-hover:text-white transition-colors duration-200" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-8">
            Ready to transform your marketing operations?
          </p>
          <button 
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-red-500/25"
            onClick={() => window.open('https://calendly.com/daveenci/astrid', '_blank')}
          >
            Schedule a Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default UseCases; 