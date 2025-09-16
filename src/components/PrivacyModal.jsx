import React from 'react';
import { X, Shield, Eye, Lock, Database } from 'lucide-react';

const PrivacyModal = ({ isOpen, onClose }) => {
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
            <Shield className="text-blue-900" size={28} />
            <h2 className="text-2xl font-bold text-gray-900">Privacy Policy</h2>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> 9 July 2025
            </p>
            
            <div className="space-y-8">
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Eye size={20} className="text-blue-900" />
                  Information We Collect
                </h3>
                <div className="text-gray-600 space-y-3">
                  <p>We collect information you provide directly to us, such as when you:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Fill out our contact forms or application forms</li>
                    <li>Subscribe to our newsletter or communications</li>
                    <li>Contact us via email or other communication channels</li>
                    <li>Use our website and services</li>
                  </ul>
                  
                  <p className="mt-4"><strong>Types of information collected:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Personal identifiers (name, email address, LinkedIn profile)</li>
                    <li>Professional information (experience, company details, business size)</li>
                    <li>Communication preferences and interests</li>
                    <li>Technical information (IP address, browser type, device information)</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Database size={20} className="text-blue-900" />
                  How We Use Your Information
                </h3>
                <div className="text-gray-600 space-y-3">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process applications and connect finance professionals with businesses</li>
                    <li>Send you relevant communications and updates</li>
                    <li>Respond to your inquiries and provide customer support</li>
                    <li>Analyze usage patterns to improve our website and services</li>
                    <li>Comply with legal obligations and protect our rights</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Information Sharing</h3>
                <div className="text-gray-600 space-y-3">
                  <p>We do not sell, trade, or otherwise transfer your personal information to third parties except:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>With your explicit consent</li>
                    <li>To facilitate connections between finance professionals and businesses (with appropriate permissions)</li>
                    <li>To service providers who assist us in operating our website and services</li>
                    <li>When required by law or to protect our rights and safety</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Cookies and Tracking</h3>
                <div className="text-gray-600 space-y-3">
                  <p>We use cookies and similar technologies to:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Remember your preferences and settings</li>
                    <li>Analyze website traffic and usage patterns</li>
                    <li>Improve user experience and website functionality</li>
                    <li>Provide personalized content and recommendations</li>
                  </ul>
                  <p>You can control cookie settings through our cookie consent banner and your browser settings.</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Lock size={20} className="text-blue-900" />
                  Data Security
                </h3>
                <div className="text-gray-600 space-y-3">
                  <p>We implement appropriate technical and organizational measures to protect your personal information, including:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security assessments and updates</li>
                    <li>Access controls and authentication measures</li>
                    <li>Staff training on data protection practices</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Rights</h3>
                <div className="text-gray-600 space-y-3">
                  <p>Under applicable data protection laws, you have the right to:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate or incomplete information</li>
                    <li>Delete your personal information</li>
                    <li>Object to or restrict processing</li>
                    <li>Data portability</li>
                    <li>Withdraw consent at any time</li>
                  </ul>
                  <p>To exercise these rights, please contact us at <a href="mailto:hello@yorkville.global" className="text-blue-900 hover:text-blue-800">hello@yorkville.global</a>.</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Retention</h3>
                <div className="text-gray-600 space-y-3">
                  <p>We retain your personal information only as long as necessary to:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Provide our services and fulfill our obligations</li>
                    <li>Comply with legal requirements</li>
                    <li>Resolve disputes and enforce agreements</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">International Transfers</h3>
                <div className="text-gray-600 space-y-3">
                  <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Changes to This Policy</h3>
                <div className="text-gray-600 space-y-3">
                  <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last updated" date.</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Us</h3>
                <div className="text-gray-600 space-y-3">
                  <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
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

export default PrivacyModal;