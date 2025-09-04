import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
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

      {/* Privacy Policy & Terms Content */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Collection of Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Collection of Information</h2>
              <p className="text-gray-700 leading-7 mb-4">
                In the ordinary course of operating our Services, we may collect, receive, or otherwise process categories of information that include, but are not limited to:
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">1.1 Identifiers and Contact Information</h3>
                  <p className="text-gray-700 leading-7">
                    Such as names, business affiliations, mailing addresses, electronic mail addresses, telephone numbers, and other related identifiers supplied voluntarily or incidentally in the course of engagement.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">1.2 Commercial Information</h3>
                  <p className="text-gray-700 leading-7">
                    Including records of products or services purchased, obtained, or considered, and related transactional information.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">1.3 Usage Data</h3>
                  <p className="text-gray-700 leading-7">
                    Encompassing website browsing metadata, cookie files, device identifiers, internet protocol addresses, browser types, and similar technologies deployed for diagnostic and analytic purposes.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">1.4 Campaign-Related Data</h3>
                  <p className="text-gray-700 leading-7">
                    Comprising insights, analytics, and performance information extracted through third-party platforms such as, without limitation, Google Data Studio, Meta Business Manager, LinkedIn Campaign Manager, or comparable digital marketing tools.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">1.5 Communications Content</h3>
                  <p className="text-gray-700 leading-7">
                    Including, without limitation, information voluntarily disclosed in response to or in connection with our email marketing initiatives, SMS or text-based outreach, chatbot conversations, and related automated or semi-automated communications.
                  </p>
                </div>
              </div>
            </div>

            {/* Purpose of Processing */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Purpose of Processing</h2>
              <p className="text-gray-700 leading-7 mb-4">
                The foregoing categories of information may be collected and processed for multiple overlapping business purposes, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-7 mb-6 space-y-2">
                <li>Implementing, administering, and optimizing paid media strategies on behalf of clients.</li>
                <li>Generating reports, analyses, and presentations through cloud-based data visualization and analytics platforms.</li>
                <li>Conducting direct and automated marketing communications by means of email, SMS/text, chatbot interaction, or other channels.</li>
                <li>Preserving, archiving, and administering contact and relationship information in one or more customer relationship management (CRM) databases.</li>
                <li>Complying with applicable legal requirements, regulatory obligations, or valid governmental requests.</li>
                <li>Exercising or defending legal rights, contractual claims, or dispute-resolution procedures.</li>
              </ul>
            </div>

            {/* Disclosure of Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Disclosure of Information</h2>
              <p className="text-gray-700 leading-7 mb-4">
                We may disclose personal or business information under the following circumstances:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Affiliated Service Providers</h3>
                  <p className="text-gray-700 leading-7">
                    Vendors, subcontractors, or technological intermediaries who perform operational functions on our behalf, including email distribution, SMS transmission, hosting, data storage, chatbot operation, or analytics reporting.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Advertising Platforms</h3>
                  <p className="text-gray-700 leading-7">
                    Digital networks or advertising channels through which media campaigns are executed, solely for the purposes of facilitating campaign delivery, measurement, or optimization.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Legal Authorities</h3>
                  <p className="text-gray-700 leading-7">
                    Government entities, regulators, or courts of competent jurisdiction where disclosure is compelled or advisable to comply with applicable law or protect Company rights.
                  </p>
                </div>
              </div>

              <p className="text-gray-700 leading-7 mt-6 font-medium">
                We do not, under any ordinary course of business, sell or lease personal data for independent commercial gain.
              </p>
            </div>

            {/* Cookies and Tracking */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Cookies, Pixels, and Tracking Technologies</h2>
              <p className="text-gray-700 leading-7 mb-4">
                Our digital properties may utilize persistent and session-based cookies, embedded pixels, tracking beacons, or similar technologies in order to:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-7 mb-6 space-y-2">
                <li>Monitor user navigation, engagement, and conversion.</li>
                <li>Retarget advertising content across diverse platforms.</li>
                <li>Accumulate aggregate, anonymized statistics.</li>
              </ul>
              <p className="text-gray-700 leading-7">
                Users may configure browser settings to refuse or delete cookies; however, such actions may impair the availability or functionality of certain features of the Services.
              </p>
            </div>

            {/* Data Retention and Safeguards */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Data Retention and Safeguards</h2>
              <p className="text-gray-700 leading-7 mb-4">
                Information collected in accordance with this Agreement will be retained for durations consistent with business necessity, contractual requirements, or legal mandates. The Company undertakes commercially reasonable security measures, including but not limited to access restrictions, data segmentation, and encryption protocols, in an effort to protect information against unauthorized access, alteration, or destruction.
              </p>
              <p className="text-gray-700 leading-7 italic">
                No system of storage or transmission can be guaranteed as absolutely secure; accordingly, the Company disclaims liability for unauthorized access that is beyond its reasonable control.
              </p>
            </div>

            {/* User Rights */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">6. User Rights and Preferences</h2>
              <p className="text-gray-700 leading-7 mb-4">
                Subject to applicable U.S. privacy regulations, you may:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-7 mb-6 space-y-2">
                <li>Decline to receive further marketing communications by utilizing the unsubscribe functionality embedded in emails or by replying "STOP" to SMS messages.</li>
                <li>Submit written requests for access to, or deletion of, records held by the Company.</li>
              </ul>
              <p className="text-gray-700 leading-7">
                All such requests shall be submitted in accordance with the contact procedures set forth in Section 11 below.
              </p>
            </div>

            {/* Terms of Service */}
            <div className="mb-12 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Terms of Service</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">7.1 Services</h3>
                  <p className="text-gray-700 leading-7">
                    The Company provides digital marketing solutions, including but not limited to automation, paid media management, CRM integration, chatbot deployment, and campaign reporting.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">7.2 Client Obligations</h3>
                  <p className="text-gray-700 leading-7">
                    Clients represent and warrant that all data and content provided is accurate, lawful, and free of infringing material. Clients are solely responsible for compliance with advertising, consumer protection, and anti-spam laws in their respective jurisdictions.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">7.3 Financial Terms</h3>
                  <p className="text-gray-700 leading-7">
                    Payment schedules, invoice procedures, and termination provisions shall be governed by the specific service agreement executed between the parties. Failure to remit timely payment may result in suspension or termination of Services without further notice.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">7.4 Limitation of Liability</h3>
                  <p className="text-gray-700 leading-7">
                    The Company shall not be held liable for indirect, incidental, consequential, or exemplary damages, nor for service interruptions, advertising platform outages, or alterations in third-party policies that adversely impact campaign results.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">7.5 Intellectual Property</h3>
                  <p className="text-gray-700 leading-7">
                    Clients shall retain ownership of their proprietary data, creative materials, and campaign assets. The Company reserves the right to utilize anonymized or aggregated data for benchmarking, research, and internal development purposes.
                  </p>
                </div>
              </div>
            </div>

            {/* Marketing Communications */}
            <div className="mb-12 bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Marketing Communications</h2>
              <p className="text-gray-700 leading-7">
                By providing an email address, telephone number, or similar identifier, you consent to receiving commercial and informational messages, whether automated or manual, from the Company. Such consent shall remain valid until affirmatively withdrawn by the user in accordance with Section 6.
              </p>
              
              <div className="mt-4 bg-white p-4 rounded border-l-4 border-blue-500">
                <p className="text-sm text-gray-700">
                  <strong>SMS Opt-out:</strong> Reply STOP to any text message to unsubscribe immediately.<br/>
                  <strong>Email Opt-out:</strong> Use the unsubscribe link in any email communication.
                </p>
              </div>
            </div>

            {/* Modifications */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Modifications to Agreement</h2>
              <p className="text-gray-700 leading-7">
                The Company reserves the unilateral right to modify, amend, or update this Agreement at any time, with changes taking effect upon posting to the website. Continued use of the Services shall constitute acceptance of such modifications.
              </p>
            </div>

            {/* Governing Law */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Governing Law</h2>
              <p className="text-gray-700 leading-7">
                This Agreement shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-12 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">11. Contact Information</h2>
              <p className="text-gray-700 leading-7 mb-4">
                Any requests, notices, or communications required or permitted hereunder shall be directed to:
              </p>
              
              <div className="space-y-2 mb-4">
                <p className="text-gray-700 font-semibold">DaVeenci LLC</p>
                <p className="text-gray-700">Attention: Privacy Contact</p>
                <p className="text-gray-700">Austin, TX 78741</p>
                <p className="text-gray-700">
                  <strong>Email:</strong> <a href="mailto:anton.osipov@daveenci.com" className="text-blue-600 hover:text-blue-800">anton.osipov@daveenci.com</a>
                </p>
                <p className="text-gray-700">
                  <strong>Telephone:</strong> <a href="tel:760-877-1853" className="text-blue-600 hover:text-blue-800">(760) 877-1853</a>
                </p>
              </div>

              <p className="text-sm text-gray-600 italic">
                Please note: while a telephone number is provided for completeness, the most effective and expeditious method of communication regarding privacy or terms-related matters is via email.
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
