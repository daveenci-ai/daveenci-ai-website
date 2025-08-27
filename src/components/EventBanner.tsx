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
    <div className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center space-x-1 sm:space-x-3 min-w-0 flex-1">
            {/* Event Icon - Hidden on small screens for space */}
            <div className="hidden sm:flex flex-shrink-0">
              <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
            </div>
            
            {/* Event Details */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-col space-y-0.5 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-3">
                {/* Main Event Title - Mobile Optimized */}
                <div className="flex items-center">
                  <span className="font-semibold text-xs sm:text-sm md:text-base tracking-tight leading-tight">
                    <span className="sm:hidden">🚀 AI for Business — Sept 4</span>
                    <span className="hidden sm:inline">🚀 AI for Business, Part 1: The Future of Content — Sept 4</span>
                  </span>
                </div>
                
                {/* Event Details - Condensed for Mobile */}
                <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-red-100">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                    <span className="whitespace-nowrap">Sept 4</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                    <span className="whitespace-nowrap">11:30 AM CT</span>
                  </div>
                  <span className="hidden md:inline">•</span>
                  <span className="hidden md:inline opacity-90">AI for Business Workshop</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA and Close Button - Mobile Optimized */}
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <Button 
              asChild
              size="sm"
              className="bg-white text-red-700 hover:bg-red-50 font-semibold text-xs sm:text-sm px-2 sm:px-3 py-1 h-7 sm:h-8 transition-colors shadow-sm min-w-0 whitespace-nowrap"
            >
              <Link to="/events/ai-automation-workshop-austin">
                <span className="sm:hidden">Tickets</span>
                <span className="hidden sm:inline">Get Tickets</span>
                <ArrowRight className="ml-1 h-2.5 w-2.5 sm:h-3 sm:w-3 flex-shrink-0" />
              </Link>
            </Button>
            
            <button
              onClick={dismissBanner}
              className="p-1 sm:p-1.5 hover:bg-white/20 rounded-full transition-colors flex-shrink-0 min-h-[28px] min-w-[28px] sm:min-h-[32px] sm:min-w-[32px] touch-manipulation"
              aria-label="Close banner"
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventBanner;
