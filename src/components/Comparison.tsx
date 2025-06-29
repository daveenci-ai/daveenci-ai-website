import React from 'react';
import { Check, X } from 'lucide-react';

const Comparison = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            DaVeenci Services vs Traditional Marketing
          </h2>
          <p className="text-xl text-gray-600">
            See how our AI-powered services transform your marketing operations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Traditional Approach */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Traditional Approach
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-1">
                  <X className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Custom Website Development</h4>
                  <p className="text-sm text-gray-600">Static designs, lengthy development cycles</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-1">
                  <X className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">CRM & Email Marketing</h4>
                  <p className="text-sm text-gray-600">Manual list management, generic bulk emails</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-1">
                  <X className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">SEO & Content Strategy</h4>
                  <p className="text-sm text-gray-600">Guesswork keywords, inconsistent manual blogging</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-1">
                  <X className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Technical Setup</h4>
                  <p className="text-sm text-gray-600">Complex manual configurations, disjointed tools</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-1">
                  <X className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Strategy & Reporting</h4>
                  <p className="text-sm text-gray-600">Reactive decisions, basic & delayed reports</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-500">
                Hours spent on manual setup, slow updates, and missed opportunities
              </p>
            </div>
          </div>

          {/* DaVeenci */}
          <div className="bg-gradient-to-br from-white via-red-50/30 to-white rounded-2xl p-8 shadow-lg border-2 border-red-200 relative hover:shadow-xl transition-all duration-300">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                RECOMMENDED
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              DaVeenci Services
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Custom Website Development</h4>
                  <p className="text-sm text-gray-600">AI-enhanced, conversion-focused sites built for growth</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">CRM & Email Automation</h4>
                  <p className="text-sm text-gray-600">Automated follow-ups, retargeting & personalized campaigns</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">AI-Powered SEO & Content</h4>
                  <p className="text-sm text-gray-600">Optimized keywords, auto-blogging for consistent relevance</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Streamlined Technical Setup</h4>
                  <p className="text-sm text-gray-600">Integrated hosting, analytics, pixels & more, expertly configured</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Data-Driven Strategy & Reporting</h4>
                  <p className="text-sm text-gray-600">Proactive strategies fueled by AI-insights & real-time dashboards</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-500">
                Full-service, AI-driven solutions delivered by our expert team
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison; 