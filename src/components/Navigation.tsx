import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 150);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-3 lg:px-8 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-red-600 transition-colors">
            DaVeenci
          </Link>
        </div>

        {/* Desktop Navigation - Right Side */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
            Home
          </Link>
          
          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex items-center text-gray-700 hover:text-red-600 transition-colors font-medium py-2 px-2">
              Services
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isServicesOpen && (
              <div 
                className="absolute top-full right-0 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/services/ai-solutions" className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                  <div className="font-medium">AI Solutions</div>
                  <div className="text-sm text-gray-500">Intelligent automation systems</div>
                </Link>
                <Link to="/services/marketing-automation" className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                  <div className="font-medium">Marketing Automation</div>
                  <div className="text-sm text-gray-500">Lead generation & nurturing</div>
                </Link>
                <Link to="/services/custom-software" className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                  <div className="font-medium">Custom Software</div>
                  <div className="text-sm text-gray-500">Tailored business applications</div>
                </Link>
                <Link to="/services/systems-integration" className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                  <div className="font-medium">Systems Integration</div>
                  <div className="text-sm text-gray-500">Connect your existing tools</div>
                </Link>
              </div>
            )}
          </div>

          <Link to="/case-studies" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
            Case Studies
          </Link>
          <Link to="/about-us" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
            About Us
          </Link>
          <Link to="/blog" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
            Blog
          </Link>
          
          <Button 
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white ml-4"
            onClick={() => window.open('https://calendly.com/daveenci/astrid', '_blank')}
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-700 hover:text-red-600 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="px-4 py-2 space-y-2">
            <Link to="/" className="block py-2 text-gray-700 hover:text-red-600 transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <div className="py-2">
              <div className="font-medium text-gray-900 mb-2">Services</div>
              <div className="pl-4 space-y-2">
                <Link to="/services/ai-solutions" className="block py-1 text-gray-600 hover:text-red-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  AI Solutions
                </Link>
                <Link to="/services/marketing-automation" className="block py-1 text-gray-600 hover:text-red-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  Marketing Automation
                </Link>
                <Link to="/services/custom-software" className="block py-1 text-gray-600 hover:text-red-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  Custom Software
                </Link>
                <Link to="/services/systems-integration" className="block py-1 text-gray-600 hover:text-red-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  Systems Integration
                </Link>
              </div>
            </div>
            <Link to="/case-studies" className="block py-2 text-gray-700 hover:text-red-600 transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              Case Studies
            </Link>
            <Link to="/about-us" className="block py-2 text-gray-700 hover:text-red-600 transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              About Us
            </Link>
            <Link to="/blog" className="block py-2 text-gray-700 hover:text-red-600 transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              Blog
            </Link>
            <div className="pt-4 pb-2 border-t border-gray-200">
              <Button 
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                onClick={() => window.open('https://calendly.com/daveenci/astrid', '_blank')}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation; 