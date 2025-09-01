import React from 'react';
import Navigation from '@/components/Navigation';
import EventBanner from '@/components/EventBanner';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <EventBanner />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16" style={{background: 'linear-gradient(to right, #e8d5f0 0%, #ffffff 30%, #ffffff 70%, #d5e8ff 100%)'}}>
        <div className="absolute inset-0 bg-grid"></div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Introduction</h2>
              <p className="text-gray-700 leading-7 mb-4">
                DaVeenci ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit 
                our website at daveenci.ai, use our services, or interact with us through various channels including SMS messaging.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
              <p className="text-gray-700 leading-7 mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-7 mb-6 space-y-2">
                <li>Register for our workshops or events</li>
                <li>Fill out contact forms or request consultations</li>
                <li>Subscribe to our newsletter or marketing communications</li>
                <li>Make purchases through our website</li>
                <li>Interact with our chatbot or customer service</li>
                <li>Opt-in to receive SMS/text messages through EZTexting or other messaging services</li>
              </ul>

              <p className="text-gray-700 leading-7 mb-4">
                This personal information may include:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-7 mb-6 space-y-2">
                <li>Name and contact information (email, phone number, address)</li>
                <li>Company name and website</li>
                <li>Payment information (processed securely through Stripe)</li>
                <li>Demographics and preferences</li>
                <li>Communication history and interactions</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Automatically Collected Information</h3>
              <p className="text-gray-700 leading-7 mb-4">
                When you visit our website, we automatically collect certain information about your device and usage patterns:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-7 mb-6 space-y-2">
                <li>IP address, browser type, and operating system</li>
                <li>Pages visited, time spent on pages, and navigation patterns</li>
                <li>Referral sources and search terms used to find our website</li>
                <li>Device information and screen resolution</li>
              </ul>
            </div>

            {/* SMS/Text Messaging */}
            <div className="mb-12 bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">SMS/Text Messaging (EZTexting)</h2>
              <p className="text-gray-700 leading-7 mb-4">
                We may use EZTexting and other SMS messaging services to send you text messages about our services, 
                workshops, and promotional offers. By providing your mobile phone number and opting in, you consent to receive these messages.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">SMS Consent & Terms</h3>
              <ul className="list-disc list-inside text-gray-700 leading-7 mb-6 space-y-2">
                <li><strong>Opt-in:</strong> You will only receive SMS messages after explicitly consenting</li>
                <li><strong>Frequency:</strong> Message frequency varies; you may receive up to 4 messages per month</li>
                <li><strong>Message & Data Rates:</strong> Standard message and data rates may apply</li>
                <li><strong>Opt-out:</strong> Reply STOP to any text message to unsubscribe immediately</li>
                <li><strong>Help:</strong> Reply HELP for customer support or contact support@daveenci.ai</li>
                <li><strong>Supported Carriers:</strong> Compatible with major carriers including Verizon, AT&T, T-Mobile, Sprint, and others</li>
              </ul>

              <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                <p className="text-sm text-gray-700">
                  <strong>Important:</strong> We never share your phone number with third parties for their marketing purposes. 
                  Your phone number is only used for our direct communications and workshop notifications.
                </p>
              </div>
            </div>

            {/* How We Use Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How We Use Your Information</h2>
              <p className="text-gray-700 leading-7 mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-7 mb-6 space-y-2">
                <li>Provide and improve our services</li>
                <li>Process workshop registrations and payments</li>
                <li>Send workshop confirmations, reminders, and materials</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Analyze website usage to improve user experience</li>
                <li>Comply with legal obligations</li>
                <li>Protect against fraud and ensure security</li>
              </ul>
            </div>

            {/* Information Sharing */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Information Sharing and Disclosure</h2>
              <p className="text-gray-700 leading-7 mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information in the following limited circumstances:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Service Providers</h3>
              <p className="text-gray-700 leading-7 mb-4">
                We work with trusted third-party service providers who assist us in operating our business:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-7 mb-6 space-y-2">
                <li><strong>Stripe:</strong> Payment processing for workshop registrations</li>
                <li><strong>Resend:</strong> Email delivery services</li>
                <li><strong>EZTexting:</strong> SMS/text messaging services</li>
                <li><strong>Database hosting:</strong> Secure data storage</li>
                <li><strong>Analytics providers:</strong> Website performance analysis</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Legal Requirements</h3>
              <p className="text-gray-700 leading-7 mb-4">
                We may disclose your information if required by law, court order, or government request, or to protect our rights and safety.
              </p>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Security</h2>
              <p className="text-gray-700 leading-7 mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-7 mb-6 space-y-2">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure database storage with access controls</li>
                <li>Regular security assessments and updates</li>
                <li>Limited access to personal information on a need-to-know basis</li>
                <li>Secure payment processing through PCI-compliant providers</li>
              </ul>
            </div>

            {/* Data Retention */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Retention</h2>
              <p className="text-gray-700 leading-7 mb-4">
                We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-7 mb-6 space-y-2">
                <li>Workshop registration data: 3 years after the event</li>
                <li>Marketing communications: Until you unsubscribe</li>
                <li>SMS/text message consent: Until you opt out (reply STOP)</li>
                <li>Customer support records: 2 years</li>
                <li>Website analytics: 26 months</li>
              </ul>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Privacy Rights</h2>
              <p className="text-gray-700 leading-7 mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">General Rights</h3>
              <ul className="list-disc list-inside text-gray-700 leading-7 mb-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>SMS Opt-out:</strong> Reply STOP to text messages to unsubscribe immediately</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">California Privacy Rights (CCPA)</h3>
              <p className="text-gray-700 leading-7 mb-4">
                If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-7 mb-6 space-y-2">
                <li>Right to know what personal information is collected and how it's used</li>
                <li>Right to delete personal information</li>
                <li>Right to opt-out of the sale of personal information (we don't sell your data)</li>
                <li>Right to non-discrimination for exercising your privacy rights</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">European Privacy Rights (GDPR)</h3>
              <p className="text-gray-700 leading-7 mb-4">
                If you are in the European Union, you have rights under the General Data Protection Regulation (GDPR):
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-7 mb-6 space-y-2">
                <li>Right of access to your personal data</li>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure (right to be forgotten)</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
              </ul>
            </div>

            {/* Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookies and Tracking</h2>
              <p className="text-gray-700 leading-7 mb-4">
                Our website uses cookies and similar tracking technologies to enhance your experience:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-7 mb-6 space-y-2">
                <li><strong>Essential cookies:</strong> Required for website functionality</li>
                <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Marketing cookies:</strong> Enable personalized content and advertising</li>
              </ul>
              <p className="text-gray-700 leading-7 mb-4">
                You can control cookies through your browser settings. Disabling certain cookies may affect website functionality.
              </p>
            </div>

            {/* Third-Party Links */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Third-Party Links</h2>
              <p className="text-gray-700 leading-7 mb-4">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices 
                of these external sites. We encourage you to review their privacy policies before providing any personal information.
              </p>
            </div>

            {/* Children's Privacy */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Children's Privacy</h2>
              <p className="text-gray-700 leading-7 mb-4">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal 
                information from children under 13. If we become aware that we have collected such information, 
                we will take steps to delete it immediately.
              </p>
            </div>

            {/* Changes to Privacy Policy */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-7 mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
                We will notify you of any material changes by posting the updated policy on our website and updating the 
                "Last updated" date at the top of this page.
              </p>
              <p className="text-gray-700 leading-7 mb-4">
                For significant changes, we may also notify you via email or SMS if you have opted in to receive such communications.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-12 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
              <p className="text-gray-700 leading-7 mb-4">
                If you have questions about this Privacy Policy or want to exercise your privacy rights, please contact us:
              </p>
              
              <div className="space-y-3">
                <p className="text-gray-700">
                  <strong>Email:</strong> <a href="mailto:privacy@daveenci.ai" className="text-blue-600 hover:text-blue-800">privacy@daveenci.ai</a>
                </p>
                <p className="text-gray-700">
                  <strong>General Support:</strong> <a href="mailto:support@daveenci.ai" className="text-blue-600 hover:text-blue-800">support@daveenci.ai</a>
                </p>
                <p className="text-gray-700">
                  <strong>SMS Opt-out:</strong> Reply STOP to any text message
                </p>
                <p className="text-gray-700">
                  <strong>SMS Help:</strong> Reply HELP to any text message
                </p>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                We will respond to your privacy-related requests within 30 days.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
