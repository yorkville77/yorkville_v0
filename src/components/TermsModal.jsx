import React from 'react';
import { X, FileText, AlertTriangle, Scale } from 'lucide-react';

const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <X size={24} />
        </button>
        
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="text-blue-900" size={28} />
            <h2 className="text-2xl font-bold text-gray-900">Terms of Service</h2>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> 9 July 2025
            </p>
            
            <div className="space-y-8">
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h3>
                <div className="text-gray-600 space-y-3">
                  <p>By accessing and using the Yorkville Advisors website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Description of Service</h3>
                <div className="text-gray-600 space-y-3">
                  <p>Yorkville Advisors provides a platform that connects finance professionals with businesses seeking financial guidance, advisory services, and investment opportunities. Our services include:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Matching finance professionals with suitable business opportunities</li>
                    <li>Facilitating advisory relationships and mentorship programs</li>
                    <li>Providing educational resources and tools</li>
                    <li>Creating networking opportunities within our community</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">3. User Responsibilities</h3>
                <div className="text-gray-600 space-y-3">
                  <p>As a user of our services, you agree to:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Provide accurate, current, and complete information</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Use the service in compliance with all applicable laws and regulations</li>
                    <li>Respect the intellectual property rights of others</li>
                    <li>Not engage in any fraudulent, abusive, or illegal activities</li>
                    <li>Not attempt to gain unauthorized access to our systems</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertTriangle size={20} className="text-blue-900" />
                  4. Financial Disclaimers
                </h3>
                <div className="text-gray-600 space-y-3 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p><strong>Important:</strong> The following disclaimers apply to all financial services and advice:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>All investments carry risk, and past performance does not guarantee future results</li>
                    <li>Financial advice provided through our platform is for informational purposes only</li>
                    <li>You should consult with qualified financial advisors before making investment decisions</li>
                    <li>Yorkville Advisors does not guarantee the accuracy or completeness of financial advice</li>
                    <li>We are not responsible for investment losses or financial decisions made based on our services</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Intellectual Property</h3>
                <div className="text-gray-600 space-y-3">
                  <p>The content, organization, graphics, design, compilation, magnetic translation, digital conversion, and other matters related to the site are protected under applicable copyrights, trademarks, and other proprietary rights.</p>
                  <p>Users may not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information obtained from this website.</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">6. Privacy and Data Protection</h3>
                <div className="text-gray-600 space-y-3">
                  <p>Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms of Service by reference.</p>
                  <p>By using our services, you consent to the collection, use, and sharing of your information as described in our Privacy Policy.</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">7. Limitation of Liability</h3>
                <div className="text-gray-600 space-y-3">
                  <p>To the fullest extent permitted by law, Yorkville Advisors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.</p>
                  <p>Our total liability to you for all damages, losses, and causes of action shall not exceed the amount paid by you, if any, for accessing our services.</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">8. Professional Conduct</h3>
                <div className="text-gray-600 space-y-3">
                  <p>Finance professionals using our platform agree to:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Maintain professional standards and ethical conduct</li>
                    <li>Provide services within their area of expertise</li>
                    <li>Disclose any conflicts of interest</li>
                    <li>Comply with applicable professional regulations and licensing requirements</li>
                    <li>Maintain confidentiality of client information</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">9. Termination</h3>
                <div className="text-gray-600 space-y-3">
                  <p>We reserve the right to terminate or suspend your access to our services at any time, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.</p>
                  <p>You may terminate your use of our services at any time by contacting us at hello@yorkville.global.</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Scale size={20} className="text-blue-900" />
                  10. Governing Law
                </h3>
                <div className="text-gray-600 space-y-3">
                  <p>These Terms of Service shall be governed by and construed in accordance with the laws of the Netherlands, without regard to its conflict of law provisions.</p>
                  <p>Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Den Haag, Netherlands.</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">11. Changes to Terms</h3>
                <div className="text-gray-600 space-y-3">
                  <p>We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after any changes constitutes acceptance of the new terms.</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">12. Contact Information</h3>
                <div className="text-gray-600 space-y-3">
                  <p>If you have any questions about these Terms of Service, please contact us:</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Yorkville Advisors BV</strong></p>
                    <p>Email: <a href="mailto:hello@yorkville.global" className="text-blue-900 hover:text-blue-800">hello@yorkville.global</a></p>
                    <p>Address: Den Haag, Netherlands</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;