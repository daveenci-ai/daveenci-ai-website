
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
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
          <p className="text-xs leading-5 text-gray-400">
            &copy; 2024 DaVeenci. All rights reserved. Transforming businesses through AI automation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
