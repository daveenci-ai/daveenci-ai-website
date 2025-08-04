import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col pt-24 sm:pt-28 pb-12 sm:pb-16" style={{background: 'linear-gradient(to right, #e8d5f0 0%, #ffffff 30%, #ffffff 70%, #d5e8ff 100%)'}}>
      {/* Enhanced Grid Background */}
      <div className="absolute inset-0 bg-grid-subtle"></div>
      
      {/* Hero Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl w-full">
          <div className="text-center space-y-8 sm:space-y-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-gray-900 leading-tight">
              AI-Powered Marketing to<br />
              <span className="text-red-600">Grow Your Business</span><br className="hidden sm:block" />
              <span className="block sm:inline">While You Sleep</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Our expert team creates <strong>fully functioning</strong> marketing automations and internal tools - so you can focus on growing your business.
            </p>
            
            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-6 sm:pt-8">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-500 border-3 border-white shadow-lg"></div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500 border-3 border-white shadow-lg"></div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-500 border-3 border-white shadow-lg"></div>
              </div>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 font-medium text-center">
                Unlock Your Business's Growth Potential
              </p>
            </div>

            <div className="pt-8 sm:pt-12">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-4 sm:px-8 sm:py-6 lg:px-12 lg:py-8 text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold rounded-2xl transition-all duration-200 hover:scale-105 shadow-xl hover:shadow-red-500/25"
                onClick={() => window.open('https://calendly.com/daveenci/astrid', '_blank')}
              >
                Book a Strategy Call
                <ArrowRight className="ml-2 sm:ml-3 lg:ml-4 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 xl:h-8 xl:w-8" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section - Full Width Below */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24 pt-12 sm:pt-16 lg:pt-20 relative z-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Watch How DaVeenci Works
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 px-4">
              See AI-powered marketing automation in action
            </p>
          </div>
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-gray-900">
            <div className="aspect-video relative">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/SJYIHasLPS0?rel=0&showinfo=0&modestbranding=1"
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
