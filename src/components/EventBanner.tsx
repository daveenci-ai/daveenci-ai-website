import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const EventBanner = () => {
  // Dismissible event banner with localStorage
  const BANNER_STORAGE_KEY = 'eventBanner_austin_workshop_v2025';
  const [showBanner, setShowBanner] = useState(true);
  const location = useLocation();

  // Don't show banner on the workshop landing page itself
  if (location.pathname === '/events/ai-automation-workshop-austin') {
    return null;
  }

  useEffect(() => {
    try {
      const hidden = localStorage.getItem(BANNER_STORAGE_KEY) === '1';
      if (hidden) setShowBanner(false);
    } catch (error) {
      // Handle cases where localStorage is not available
      console.warn('localStorage not available');
    }
  }, []);

  const dismissBanner = () => {
    setShowBanner(false);
    try {
      localStorage.setItem(BANNER_STORAGE_KEY, '1');
    } catch (error) {
      console.warn('Could not save banner dismiss state');
    }
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
            {/* Event Icon */}
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full">
                <Calendar className="w-4 h-4 text-white" />
              </div>
            </div>
            
            {/* Event Details */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <div className="flex items-center space-x-2 mb-1 sm:mb-0">
                  <span className="font-semibold text-sm sm:text-base tracking-tight">
                    🚀 Master AEO: The Future of Search — Aug 28
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-xs sm:text-sm text-red-100">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>Aug 28, 2025</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>2:30 PM CT</span>
                  </div>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline opacity-90">Master AEO vs Traditional SEO</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA and Close Button */}
          <div className="flex items-center space-x-2 ml-2">
            <Button 
              asChild
              size="sm"
              className="bg-white text-red-700 hover:bg-red-50 font-semibold text-xs sm:text-sm px-3 py-1 h-8 transition-colors shadow-sm"
            >
              <Link to="/events/ai-automation-workshop-austin">
                Get Tickets
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
            
            <button
              onClick={dismissBanner}
              className="p-1 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
              aria-label="Close banner"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventBanner;
