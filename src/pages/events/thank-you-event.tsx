import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, Clock, MapPin, Share2, Download, ArrowRight, Users, Gift, Star } from 'lucide-react';
import Navigation from '@/components/Navigation';

const ThankYouEvent = () => {
  const handleShare = (platform: string) => {
    const url = encodeURIComponent('https://daveenci.ai/events/ai-automation-workshop-austin');
    const text = encodeURIComponent('Just registered for the AI Automation Workshop in Austin! Join me to learn how AI can transform your business 🤖✨');
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`
    };
    
    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Navigation />
      {/* Success Header */}
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full mb-8">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            🎉 You're In! Welcome to the Future of Business Automation
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Thank you for registering for the <strong>AI Automation Workshop</strong> in Austin. 
            Your spot is confirmed and we're excited to see you there!
          </p>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📅 Event Details</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start space-x-3">
                <Calendar className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <div className="text-sm text-gray-500">Date</div>
                  <div className="font-semibold text-gray-900">July 30, 2025</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <div className="text-sm text-gray-500">Time</div>
                  <div className="font-semibold text-gray-900">2:00 PM - 6:00 PM CST</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <div className="text-sm text-gray-500">Location</div>
                  <div className="font-semibold text-gray-900">Austin, TX</div>
                  <div className="text-sm text-gray-500">Exact location coming soon</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Next Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Happens Next?
            </h2>
            <p className="text-xl text-gray-600">
              Here's everything you need to know before the workshop
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-6">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Check Your Email</h3>
              <p className="text-gray-600">
                You'll receive a confirmation email with all the details. Keep an eye out for updates as we get closer to the event.
              </p>
            </div>

            <div className="text-center bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-full mb-6">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get the Location</h3>
              <p className="text-gray-600">
                We'll send you the exact venue address 1 week before the workshop, along with parking information.
              </p>
            </div>

            <div className="text-center bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full mb-6">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Join & Learn</h3>
              <p className="text-gray-600">
                Show up ready to learn! Bring a laptop if you want to follow along with the hands-on demos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bonus Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-orange-400 to-red-500 text-white rounded-3xl p-8 mb-12">
            <Gift className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">🎁 Bonus: Free Resources</h2>
            <p className="text-xl mb-6 opacity-90">
              As a thank you for registering, get instant access to our AI Automation Toolkit
            </p>
            <Button 
              className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
              onClick={() => window.open('https://calendly.com/daveenci/astrid', '_blank')}
            >
              <Download className="w-5 h-5 mr-2" />
              Download Free Toolkit
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Star className="w-8 h-8 text-yellow-500 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">AI Prompt Library</h3>
              <p className="text-gray-600 text-sm">50+ proven prompts for marketing automation</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Users className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">CRM Templates</h3>
              <p className="text-gray-600 text-sm">Ready-to-use automation workflows</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <CheckCircle className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">ROI Calculator</h3>
              <p className="text-gray-600 text-sm">Measure your automation savings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Sharing */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Spread the Word! 📢
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Know someone who could benefit from AI automation? Share this workshop with them!
          </p>

          <div className="flex justify-center space-x-4 mb-8">
            <Button 
              onClick={() => handleShare('twitter')}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share on Twitter
            </Button>
            <Button 
              onClick={() => handleShare('linkedin')}
              className="bg-blue-700 hover:bg-blue-800 text-white"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share on LinkedIn
            </Button>
            <Button 
              onClick={() => handleShare('facebook')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share on Facebook
            </Button>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6">
            <p className="text-gray-600 text-sm mb-4">
              <strong>Referral Bonus:</strong> For every person you refer who attends, you'll get a free 30-minute AI consultation call with our experts!
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-red-500 to-orange-500 text-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Business Before the Workshop?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Don't wait until July 30th! Schedule a free strategy call to get started with AI automation today.
          </p>
          <Button 
            size="lg"
            className="bg-white text-red-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
            onClick={() => window.open('https://calendly.com/daveenci/astrid', '_blank')}
          >
            Book Free Strategy Call
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <div className="flex justify-center space-x-8 mb-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/events/ai-automation-workshop-austin" className="text-gray-300 hover:text-white transition-colors">
              Workshop Details
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
              About Us
            </Link>
            <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
              Services
            </Link>
          </div>
          <p className="text-gray-400 text-sm">
            Questions? Email us at <a href="mailto:support@daveenci.ai" className="text-white hover:underline">support@daveenci.ai</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default ThankYouEvent; 