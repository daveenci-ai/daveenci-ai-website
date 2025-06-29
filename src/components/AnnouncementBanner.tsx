import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  // Hide banner on the workshop page and thank you page
  if (location.pathname === '/events/ai-automation-workshop-austin' || 
      location.pathname === '/events/thank-you-event') return null;
  
  if (!isVisible) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-gradient-to-r from-red-600 to-red-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <span className="text-sm font-medium">
            <span className="animate-pulse">🔥</span> <strong>Unlock the Power of AI for Your Business</strong> – Free Workshop in Austin, July 30 • Only 40 Seats • Hands-On Demos • Real Business Use Cases
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Link 
            to="/events/ai-automation-workshop-austin"
            className="bg-white text-red-600 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors"
          >
            Reserve Your Spot
          </Link>
          
          <button
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-gray-200 transition-colors p-1"
            aria-label="Close banner"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner; 