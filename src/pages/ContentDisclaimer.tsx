import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const ContentDisclaimer = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16" style={{background: 'linear-gradient(to right, #e8d5f0 0%, #ffffff 30%, #ffffff 70%, #d5e8ff 100%)'}}>
        <div className="absolute inset-0 bg-grid"></div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6">
              Content Disclaimer
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Important information about our content creation process and the use of AI tools.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Content Disclaimer */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            {/* AI Content Disclosure */}
            <div className="mb-12 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Use of AI Tools in Content Creation</h2>
              <p className="text-gray-700 leading-7 mb-4">
                <strong>We use AI tools to brainstorm, draft, and edit parts of our content.</strong> Our content creation process may involve artificial intelligence technologies to assist with research, ideation, drafting, and editorial processes. However, every piece of content published on our blog undergoes thorough human review and approval.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Content Process</h3>
              <ul className="list-disc list-inside text-gray-700 leading-7 mb-6 space-y-2">
                <li><strong>AI Assistance:</strong> We may use AI tools for brainstorming topics, generating initial drafts, research assistance, and editorial suggestions</li>
                <li><strong>Human Oversight:</strong> Every post is reviewed, fact-checked, and approved by a human editor before publishing</li>
                <li><strong>Quality Control:</strong> Our editorial team ensures accuracy, relevance, and alignment with our expertise and values</li>
                <li><strong>Transparency:</strong> We are committed to being open about our use of AI tools in content creation</li>
              </ul>
            </div>

            {/* General Disclaimer */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">General Information Disclaimer</h2>
              <p className="text-gray-700 leading-7 mb-4">
                The information provided in our blog posts and content is for general informational purposes only. While we strive for accuracy and reliability, the information should not be considered as professional advice.
              </p>
              
              <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">⚠️ Important Notice</h3>
                <p className="text-gray-700 leading-7">
                  <strong>Information may evolve; please verify critical details independently.</strong> The digital marketing and AI landscape changes rapidly. What is current today may become outdated tomorrow. Always verify important information through current, authoritative sources before making business decisions.
                </p>
              </div>
            </div>

            {/* Not Professional Advice */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Not Professional Advice</h2>
              <p className="text-gray-700 leading-7 mb-4">
                <strong>This material is for general information only and isn't legal, financial, or medical advice.</strong> Our content should not be relied upon as:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-7 mb-6 space-y-2">
                <li><strong>Legal Advice:</strong> Consult with a qualified attorney for legal matters</li>
                <li><strong>Financial Advice:</strong> Speak with a certified financial advisor for investment or financial planning decisions</li>
                <li><strong>Medical Advice:</strong> Always consult healthcare professionals for medical concerns</li>
                <li><strong>Professional Services:</strong> Our content does not replace professional consultation specific to your situation</li>
              </ul>
            </div>

            {/* Content Accuracy */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Content Accuracy and Updates</h2>
              <p className="text-gray-700 leading-7 mb-4">
                While we make every effort to ensure the accuracy of our content:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-7 mb-6 space-y-2">
                <li>Information is provided "as is" without warranties of any kind</li>
                <li>We periodically review and update content, but cannot guarantee all information is current</li>
                <li>Technology, regulations, and best practices in AI and marketing evolve rapidly</li>
                <li>We encourage readers to verify information through additional sources</li>
              </ul>
            </div>

            {/* Third-Party References */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Third-Party References and Links</h2>
              <p className="text-gray-700 leading-7 mb-4">
                Our content may reference or link to third-party tools, services, or websites. These references are for informational purposes and do not constitute endorsements. We are not responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-7 mb-6 space-y-2">
                <li>The accuracy of third-party information</li>
                <li>Changes to third-party services or pricing</li>
                <li>The privacy practices of external websites</li>
                <li>Any issues arising from the use of third-party services</li>
              </ul>
            </div>

            {/* Use at Your Own Risk */}
            <div className="mb-12 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Use at Your Own Risk</h2>
              <p className="text-gray-700 leading-7 mb-4">
                By using the information provided in our content, you acknowledge that:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-7 mb-6 space-y-2">
                <li>You are using the information at your own risk</li>
                <li>You will not hold DaVeenci LLC liable for any decisions made based on our content</li>
                <li>You understand the importance of independent verification</li>
                <li>Professional consultation may be necessary for your specific situation</li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="mb-12 bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Questions or Corrections</h2>
              <p className="text-gray-700 leading-7 mb-4">
                If you have questions about our content creation process, notice an error, or need clarification on any of our published material, please contact us:
              </p>
              
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>Email:</strong> <a href="mailto:astrid@daveenci.com" className="text-blue-600 hover:text-blue-800">astrid@daveenci.com</a>
                </p>
                <p className="text-gray-700">
                  <strong>General Support:</strong> <a href="mailto:anton.osipov@daveenci.com" className="text-blue-600 hover:text-blue-800">anton.osipov@daveenci.com</a>
                </p>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                We appreciate feedback and are committed to maintaining the quality and accuracy of our content.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContentDisclaimer;
