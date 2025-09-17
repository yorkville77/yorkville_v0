import React, { useState, useEffect } from 'react';
import { X, Mail, MapPin, Clock, Phone, CheckCircle } from 'lucide-react';
import SocialLinks from './SocialLinks';
import { sendContactFormEmail } from '../services/emailService';
import { useErrorHandler } from '../hooks/useErrorHandler';

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const { handleError } = useErrorHandler();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      await sendContactFormEmail(formData);
      setSubmitted(true);
      
      // Track form submission
      if (typeof window !== 'undefined' && window.trackFormSubmission) {
        window.trackFormSubmission('contact_form');
      }
    } catch (error) {
      setSubmitError('Failed to send message. Please try again.');
      handleError(error, 'Contact form submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  // Show thank you message if form was submitted successfully
  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
          >
            <X size={24} />
          </button>
          
          <div className="p-8 text-center">
            <CheckCircle className="text-green-500 mx-auto mb-6" size={64} />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Thank you for making contact with us.<br />
              We will respond as soon as possible.
            </p>
            <button
              onClick={onClose}
              className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <X size={24} />
        </button>
        
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="text-blue-900 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <a 
                      href="mailto:hello@yorkville.global" 
                      className="text-blue-900 hover:text-blue-800 transition-colors"
                    >
                      hello@yorkville.global
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="text-blue-900 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-600">
                      Yorkville Advisors BV<br />
                      Den Haag, Netherlands
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="text-blue-900 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">Business Hours</p>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM CET<br />
                      Weekend: By appointment only
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Contact Form */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="contact-name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="contact-email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="contact-subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                    placeholder="How can we help you?"
                  />
                </div>
                
                {submitError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{submitError}</p>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <SocialLinks variant="contact" />
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Frequently Asked Questions</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-gray-900">How quickly do you respond to inquiries?</p>
                <p className="text-gray-600">We typically respond within 24 hours during business days.</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Do you offer consultations?</p>
                <p className="text-gray-600">Yes, we offer initial consultations to understand your needs and how we can help.</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">What types of businesses do you work with?</p>
                <p className="text-gray-600">We work with businesses of all sizes, from early-stage startups to established companies seeking growth.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;