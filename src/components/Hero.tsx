import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col pt-28 pb-16" style={{background: 'linear-gradient(to right, #e8d5f0 0%, #ffffff 30%, #ffffff 70%, #d5e8ff 100%)'}}>
      {/* Enhanced Grid Background */}
      <div className="absolute inset-0 bg-grid-subtle"></div>
      
      {/* Hero Content */}
      <div className="flex-1 flex items-center justify-center px-6 lg:px-8 relative z-10 py-16">
        <div className="mx-auto max-w-7xl w-full">
          <div className="text-center space-y-12">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl xl:text-8xl leading-tight">
              AI-Powered Marketing to<br />
              <span className="text-red-600">Grow Your Business</span><br className="hidden lg:block" />
              While You Sleep
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our expert team creates <strong>fully functioning</strong> marketing automations and internal tools - so you can focus on growing your business.
            </p>
            
            {/* Social Proof */}
            <div className="flex items-center justify-center space-x-6 pt-8">
              <div className="flex -space-x-3">
                <div className="w-12 h-12 rounded-full bg-red-500 border-3 border-white shadow-lg"></div>
                <div className="w-12 h-12 rounded-full bg-blue-500 border-3 border-white shadow-lg"></div>
                <div className="w-12 h-12 rounded-full bg-green-500 border-3 border-white shadow-lg"></div>
              </div>
              <p className="text-lg lg:text-xl text-gray-600 font-medium">
                Unlock Your Business's Growth Potential
              </p>
            </div>

            <div className="pt-12">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-6 sm:px-12 sm:py-8 text-lg sm:text-xl lg:text-2xl font-semibold rounded-2xl transition-all duration-200 hover:scale-105 shadow-xl hover:shadow-red-500/25"
                onClick={() => window.open('https://calendly.com/daveenci/astrid', '_blank')}
              >
                Book a Strategy Call
                <ArrowRight className="ml-3 sm:ml-4 h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section - Full Width Below */}
      <div className="px-6 lg:px-8 pb-24 pt-20 relative z-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Watch How DaVeenci Works
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600">
              See AI-powered marketing automation in action
            </p>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-900">
            <div className="aspect-video relative">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/kJ5hmzpl5GU?rel=0&showinfo=0&modestbranding=1"
                title="DaVeenci AI-Powered Marketing Automation Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
