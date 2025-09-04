
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isBlogPage = location.pathname.startsWith('/blog');

  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div>
              <Link to="/" className="inline-block">
                <h3 className="text-2xl font-bold text-white hover:text-gray-200 transition-colors">DaVeenci</h3>
              </Link>
              <p className="mt-4 text-gray-300 max-w-md">
                AI-powered automation and custom software solutions that help businesses scale smarter and more efficiently.
              </p>
              <p className="mt-3 text-sm text-gray-400">
                📍 Located in Austin, TX 78741
              </p>
            </div>
            <div className="flex space-x-6">
              {/* Social links would go here */}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Services</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link to="/services/ai-solutions" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      AI Solutions
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/marketing-automation" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      Marketing Automation
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/custom-software" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      Custom Software
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/systems-integration" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      Systems Integration
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link to="/about-us" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/case-studies" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      Case Studies
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <a href="mailto:support@daveenci.ai" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Resources</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link to="/events/ai-automation-workshop-austin" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      AI Workshop
                    </Link>
                  </li>
                  <li>
                    <a href="https://calendly.com/daveenci/astrid" target="_blank" rel="noopener noreferrer" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      Free Consultation
                    </a>
                  </li>
                  <li>
                    <Link to="/services" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      All Services
                    </Link>
                  </li>
                  <li>
                    <a href="mailto:support@daveenci.ai" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      Get Help
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Connect</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a href="mailto:hello@daveenci.ai" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      hello@daveenci.ai
                    </a>
                  </li>
                  <li>
                    <a href="https://calendly.com/daveenci/astrid" target="_blank" rel="noopener noreferrer" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      Schedule Call
                    </a>
                  </li>
                  <li>
                    <Link to="/" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-800 pt-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-gray-400">
              &copy; 2024 DaVeenci. All rights reserved. Transforming businesses through AI automation.
            </p>
            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/privacy-policy" 
                className="text-xs leading-5 text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              {isBlogPage && (
                <Link 
                  to="/content-disclaimer" 
                  className="text-xs leading-5 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  Content Disclaimer
                </Link>
              )}
            </div>
          </div>
          {isBlogPage && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-xs leading-4 text-gray-500 max-w-4xl">
                We use AI tools to assist with content creation. All posts are reviewed and approved by human editors before publishing. 
                Content is for informational purposes only and should not be considered professional advice. Please verify important details independently.
              </p>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
