import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { sendFinanceProfessionalEmail } from '../services/emailService';
import ErrorFallback from './ErrorFallback';
import { useErrorHandler } from '../hooks/useErrorHandler';

const FinanceProfessionalForm = ({ onClose, onOpen }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    coreInterests: [],
    yearsExperience: '',
    entitySize: '',
    linkedinUrl: '',
    weeklyCommitment: '',
    contentContribution: false
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const { error, handleError, clearError } = useErrorHandler();

  // Track form open
  React.useEffect(() => {
    if (onOpen) onOpen();
  }, [onOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    clearError();

    try {
      const result = await sendFinanceProfessionalEmail(formData);
      
      if (result.success) {
        setSubmitted(true);
        // Track successful form submission
        if (window.trackFormSubmission) {
          window.trackFormSubmission('finance_professional');
        }
      } else {
        setSubmitError('Failed to send your application. Please try again or contact us directly at hello@yorkville.global');
      }
    } catch (error) {
      handleError(error, 'finance professional form submission');
      setSubmitError('Failed to send your application. Please try again or contact us directly at hello@yorkville.global');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      coreInterests: prev.coreInterests.includes(interest)
        ? prev.coreInterests.filter(i => i !== interest)
        : [...prev.coreInterests, interest]
    }));
  };

  if (error) {
    return <ErrorFallback error={error} resetError={clearError} context="form" />;
  }

  if (submitted) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 text-center">
        <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base px-4">
          Thank you for your interest! We will review your submission and be in touch shortly. 
          Your expertise is invaluable to our community.
        </p>
        <button
          onClick={onClose}
          className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors text-sm sm:text-base"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 pr-8">Join as Finance Professional</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Core Interests (Select all that apply)
          </label>
          <div className="space-y-2 max-h-32 sm:max-h-none overflow-y-auto">
            {[
              'Investing in early-stage businesses',
              'Committing time to advise early-stage businesses',
              'Contributing content for finance tools'
            ].map(interest => (
              <label key={interest} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.coreInterests.includes(interest)}
                  onChange={() => handleInterestChange(interest)}
                  className="mr-2 h-4 w-4 text-blue-900 focus:ring-blue-800 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{interest}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="yearsExperience" className="block text-sm font-medium text-gray-700 mb-2">
            Years of Finance Experience
          </label>
          <select
            id="yearsExperience"
            value={formData.yearsExperience}
            onChange={(e) => setFormData({...formData, yearsExperience: e.target.value})}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent text-sm sm:text-base"
          >
            <option value="">Select...</option>
            <option value="0-5">0-5 years</option>
            <option value="6-10">6-10 years</option>
            <option value="11-15">11-15 years</option>
            <option value="15+">15+ years</option>
          </select>
        </div>

        <div>
          <label htmlFor="entitySize" className="block text-sm font-medium text-gray-700 mb-2">
            Typical Entity Size by Revenue
          </label>
          <select
            id="entitySize"
            value={formData.entitySize}
            onChange={(e) => setFormData({...formData, entitySize: e.target.value})}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent text-sm sm:text-base"
          >
            <option value="">Select...</option>
            <option value="<$1M">&lt;$1M</option>
            <option value="$1M-$10M">$1M-$10M</option>
            <option value="$10M-$100M">$10M-$100M</option>
            <option value=">$100M">&gt;$100M</option>
          </select>
        </div>

        <div>
          <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn Profile URL *
          </label>
          <input
            type="url"
            id="linkedinUrl"
            required
            value={formData.linkedinUrl}
            onChange={(e) => setFormData({...formData, linkedinUrl: e.target.value})}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent text-sm sm:text-base"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>

        <div>
          <label htmlFor="weeklyCommitment" className="block text-sm font-medium text-gray-700 mb-2">
            Weekly Time Commitment
          </label>
          <select
            id="weeklyCommitment"
            value={formData.weeklyCommitment}
            onChange={(e) => setFormData({...formData, weeklyCommitment: e.target.value})}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent text-sm sm:text-base"
          >
            <option value="">Select...</option>
            <option value="0.5">0.5 hours</option>
            <option value="1">1 hour</option>
            <option value="2">2 hours</option>
            <option value="2+">2+ hours</option>
          </select>
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.contentContribution}
              onChange={(e) => setFormData({...formData, contentContribution: e.target.checked})}
              className="mr-2 h-4 w-4 text-blue-900 focus:ring-blue-800 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">
              I'm interested in contributing content for finance tools
            </span>
          </label>
        </div>

        {submitError && (
          <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{submitError}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors text-sm sm:text-base"
          >
            {isSubmitting ? 'Sending...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FinanceProfessionalForm;