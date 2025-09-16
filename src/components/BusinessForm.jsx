import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { sendBusinessFormEmail } from '../services/emailService';
import ErrorFallback from './ErrorFallback';
import { useErrorHandler } from '../hooks/useErrorHandler';

const BusinessForm = ({ onClose, onOpen }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    yearsInOperation: '',
    businessSize: '',
    idealOutcomes: [],
    otherOutcome: '',
    seekingInvestment: false,
    investmentAmount: ''
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
      const result = await sendBusinessFormEmail(formData);
      
      if (result.success) {
        setSubmitted(true);
        // Track successful form submission
        if (window.trackFormSubmission) {
          window.trackFormSubmission('business_support');
        }
      } else {
        setSubmitError('Failed to send your request. Please try again or contact us directly at hello@yorkville.global');
      }
    } catch (error) {
      handleError(error, 'business form submission');
      setSubmitError('Failed to send your request. Please try again or contact us directly at hello@yorkville.global');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOutcomeChange = (outcome) => {
    setFormData(prev => ({
      ...prev,
      idealOutcomes: prev.idealOutcomes.includes(outcome)
        ? prev.idealOutcomes.filter(i => i !== outcome)
        : [...prev.idealOutcomes, outcome]
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
          Thank you for reaching out! We've received your information and will connect you 
          with the right expertise to help your business thrive.
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
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 pr-8">Get Business Support</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
            Business Name *
          </label>
          <input
            type="text"
            id="businessName"
            required
            value={formData.businessName}
            onChange={(e) => setFormData({...formData, businessName: e.target.value})}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent text-sm sm:text-base"
          />
        </div>

        <div>
          <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
            Contact Name *
          </label>
          <input
            type="text"
            id="contactName"
            required
            value={formData.contactName}
            onChange={(e) => setFormData({...formData, contactName: e.target.value})}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent text-sm sm:text-base"
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
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent text-sm sm:text-base"
          />
        </div>

        <div>
          <label htmlFor="yearsInOperation" className="block text-sm font-medium text-gray-700 mb-2">
            Years in Operation
          </label>
          <select
            id="yearsInOperation"
            value={formData.yearsInOperation}
            onChange={(e) => setFormData({...formData, yearsInOperation: e.target.value})}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent text-sm sm:text-base"
          >
            <option value="">Select...</option>
            <option value="<1">&lt;1 year</option>
            <option value="1-3">1-3 years</option>
            <option value="4-7">4-7 years</option>
            <option value="7+">7+ years</option>
          </select>
        </div>

        <div>
          <label htmlFor="businessSize" className="block text-sm font-medium text-gray-700 mb-2">
            Current Business Size by Revenue
          </label>
          <select
            id="businessSize"
            value={formData.businessSize}
            onChange={(e) => setFormData({...formData, businessSize: e.target.value})}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent text-sm sm:text-base"
          >
            <option value="">Select...</option>
            <option value="<$500K">&lt;$500K</option>
            <option value="$500K-$5M">$500K-$5M</option>
            <option value="$5M-$25M">$5M-$25M</option>
            <option value=">$25M">&gt;$25M</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ideal Outcomes from Mentoring (Select all that apply)
          </label>
          <div className="space-y-2 max-h-32 sm:max-h-none overflow-y-auto">
            {[
              'Improving financial systems',
              'Preparing for funding',
              'Strategic financial planning',
              'Managing growth',
              'Addressing specific financial challenges'
            ].map(outcome => (
              <label key={outcome} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.idealOutcomes.includes(outcome)}
                  onChange={() => handleOutcomeChange(outcome)}
                  className="mr-2 h-4 w-4 text-blue-900 focus:ring-blue-800 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{outcome}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="otherOutcome" className="block text-sm font-medium text-gray-700 mb-2">
            Other Desired Outcome
          </label>
          <textarea
            id="otherOutcome"
            rows="3"
            value={formData.otherOutcome}
            onChange={(e) => setFormData({...formData, otherOutcome: e.target.value})}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent text-sm sm:text-base"
            placeholder="Please describe any other specific outcomes you're looking for..."
          />
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.seekingInvestment}
              onChange={(e) => setFormData({...formData, seekingInvestment: e.target.checked})}
              className="mr-2 h-4 w-4 text-blue-900 focus:ring-blue-800 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">
              Currently seeking investment
            </span>
          </label>
        </div>

        {formData.seekingInvestment && (
          <div>
            <label htmlFor="investmentAmount" className="block text-sm font-medium text-gray-700 mb-2">
              Investment Amount/Range
            </label>
            <input
              type="text"
              id="investmentAmount"
              value={formData.investmentAmount}
              onChange={(e) => setFormData({...formData, investmentAmount: e.target.value})}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent text-sm sm:text-base"
              placeholder="e.g., $500K - $2M"
            />
          </div>
        )}

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
            className="flex-1 px-6 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {isSubmitting ? 'Sending...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessForm;