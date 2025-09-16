import React, { useState } from 'react';
import { Mail, CheckCircle, TrendingUp, Users, Target } from 'lucide-react';

const NewsletterSignup = () => {
  // Hidden for now - will be enabled when ready for newsletter campaigns
  const isVisible = false;
  
  if (!isVisible) {
    return null;
  }

  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const interestOptions = [
    {
      id: 'market_insights',
      label: 'Market Insights',
      description: 'Weekly analysis of financial markets and trends',
      icon: TrendingUp
    },
    {
      id: 'networking_events',
      label: 'Networking Events',
      description: 'Exclusive events for finance professionals',
      icon: Users
    },
    {
      id: 'business_opportunities',
      label: 'Business Opportunities',
      description: 'New advisory and investment opportunities',
      icon: Target
    }
  ];

  const handleInterestChange = (interestId) => {
    setInterests(prev => 
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Simulate API call - replace with actual newsletter service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Track newsletter signup
      if (window.trackEvent) {
        window.trackEvent('newsletter_signup', {
          email: email,
          interests: interests.join(', '),
          source: 'website'
        });
      }

      // Track conversion
      if (window.trackConversion) {
        window.trackConversion('newsletter_signup', 0, {
          email: email,
          interests_count: interests.length
        });
      }

      setIsSubmitted(true);
    } catch (error) {
      setError('Failed to subscribe. Please try again.');
      if (window.trackError) {
        window.trackError('newsletter_signup_error', {
          error_message: error.message,
          email: email
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-12 sm:py-16 bg-blue-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="text-green-400 mx-auto mb-6" size={64} />
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Welcome to Our Community!
            </h3>
            <p className="text-blue-100 text-lg mb-6">
              Thank you for subscribing! You'll receive your first newsletter within the next few days.
            </p>
            <div className="bg-blue-800 p-6 rounded-lg">
              <h4 className="text-white font-semibold mb-3">What's Next?</h4>
              <ul className="text-blue-100 text-sm space-y-2 text-left">
                <li>• Check your email for a confirmation message</li>
                <li>• Follow us on LinkedIn for daily insights</li>
                <li>• Explore our services and community</li>
                <li>• Consider joining our professional network</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 bg-blue-900">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="text-blue-100" size={32} />
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Stay Connected with Finance Insights
          </h3>
          <p className="text-blue-100 text-lg mb-8">
            Get exclusive market insights, networking opportunities, and business updates delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
            </div>

            {/* Interest Selection */}
            <div className="text-left">
              <h4 className="text-white font-semibold mb-4">What interests you most? (Optional)</h4>
              <div className="grid sm:grid-cols-3 gap-4">
                {interestOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <label
                      key={option.id}
                      className="bg-blue-800 p-4 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={interests.includes(option.id)}
                        onChange={() => handleInterestChange(option.id)}
                        className="sr-only"
                      />
                      <div className={`flex flex-col items-center text-center ${
                        interests.includes(option.id) ? 'text-white' : 'text-blue-200'
                      }`}>
                        <Icon size={24} className="mb-2" />
                        <span className="font-medium text-sm">{option.label}</span>
                        <span className="text-xs mt-1 opacity-80">{option.description}</span>
                      </div>
                      {interests.includes(option.id) && (
                        <CheckCircle size={16} className="text-green-400 mt-2 mx-auto" />
                      )}
                    </label>
                  );
                })}
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-100 border border-red-300 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !email}
              className="w-full bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
            </button>

            <p className="text-blue-200 text-sm">
              We respect your privacy. Unsubscribe at any time. 
              <br />
              Read our <button className="underline hover:text-white">Privacy Policy</button> for more details.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;