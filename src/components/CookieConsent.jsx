import React, { useState, useEffect } from 'react';
import { X, Cookie, Shield, Settings, Info } from 'lucide-react';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    const consentTimestamp = localStorage.getItem('cookieConsentTimestamp');
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    
    // Show banner if no consent or consent is older than 30 days
    if (!consent || !consentTimestamp || parseInt(consentTimestamp) < thirtyDaysAgo) {
      setShowBanner(true);
      // Initialize Google Consent Mode with denied defaults
      initializeConsentMode();
    } else {
      // Load existing preferences and update consent mode
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      updateConsentMode(savedPreferences);
    }
  }, []);

  // Initialize Google Consent Mode with denied defaults (EEA compliant)
  const initializeConsentMode = () => {
    if (window.gtag) {
      window.gtag('consent', 'default', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'functionality_storage': 'denied',
        'personalization_storage': 'denied',
        'security_storage': 'granted', // Always granted for security
        'wait_for_update': 500
      });
    }

    // Microsoft Clarity consent mode
    if (window.clarity) {
      window.clarity('consent', false);
    }

    // Facebook Pixel consent mode
    if (window.fbq) {
      window.fbq('consent', 'revoke');
    }
  };

  // Update consent mode based on user preferences
  const updateConsentMode = (newPreferences) => {
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': newPreferences.analytics ? 'granted' : 'denied',
        'ad_storage': newPreferences.marketing ? 'granted' : 'denied',
        'ad_user_data': newPreferences.marketing ? 'granted' : 'denied',
        'ad_personalization': newPreferences.marketing ? 'granted' : 'denied',
        'functionality_storage': newPreferences.functional ? 'granted' : 'denied',
        'personalization_storage': newPreferences.functional ? 'granted' : 'denied'
      });
    }

    // Microsoft Clarity consent
    if (window.clarity) {
      window.clarity('consent', newPreferences.analytics);
    }

    // Facebook Pixel consent
    if (window.fbq) {
      if (newPreferences.marketing) {
        window.fbq('consent', 'grant');
      } else {
        window.fbq('consent', 'revoke');
      }
    }

    // LinkedIn Insight consent
    if (window.lintrk && newPreferences.marketing) {
      // LinkedIn doesn't have explicit consent mode, so we reinitialize if granted
      window.lintrk('track', { conversion_id: 'consent_granted' });
    }

    // Track consent decision
    if (window.trackEvent) {
      window.trackEvent('consent_updated', {
        analytics: newPreferences.analytics,
        marketing: newPreferences.marketing,
        functional: newPreferences.functional,
        consent_method: 'user_choice'
      });
    }
  };

  const saveConsentPreferences = (newPreferences) => {
    const timestamp = Date.now().toString();
    localStorage.setItem('cookieConsent', JSON.stringify(newPreferences));
    localStorage.setItem('cookieConsentTimestamp', timestamp);
    setPreferences(newPreferences);
    updateConsentMode(newPreferences);
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    saveConsentPreferences(allAccepted);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    saveConsentPreferences(onlyNecessary);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleSavePreferences = () => {
    saveConsentPreferences(preferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handlePreferenceChange = (type) => {
    if (type === 'necessary') return; // Cannot disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* EEA Compliant Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-900 shadow-lg z-50 p-4 sm:p-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="text-blue-900 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span>Cookie Consent Required</span>
                  <Info size={16} className="text-blue-600" />
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-2">
                  <strong>We need your consent to use cookies.</strong> We use cookies and similar technologies to analyze website traffic, 
                  personalize content, and provide social media features. Some cookies are essential for the website to function.
                </p>
                <p className="text-xs text-gray-500">
                  By clicking "Accept All", you consent to our use of cookies for analytics and marketing. 
                  You can customize your preferences or learn more in our{' '}
                  <button 
                    onClick={() => {/* Open privacy modal */}} 
                    className="text-blue-900 underline hover:text-blue-800"
                  >
                    Privacy Policy
                  </button>.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center gap-2"
              >
                <Settings size={16} />
                Manage Preferences
              </button>
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Reject All
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm font-medium"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Cookie Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Shield className="text-blue-900" size={24} />
                  <h2 className="text-xl font-bold text-gray-900">Cookie Preferences</h2>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Why We Need Your Consent</h3>
                <p className="text-sm text-blue-800">
                  Under EU privacy laws (GDPR), we need your explicit consent before using non-essential cookies. 
                  You can withdraw your consent at any time by returning to this settings page.
                </p>
              </div>

              <div className="space-y-6">
                {/* Necessary Cookies */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Strictly Necessary Cookies</h3>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                      Always Active
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    These cookies are essential for the website to function properly. They enable basic features 
                    like page navigation, access to secure areas, and form submissions. The website cannot function 
                    properly without these cookies.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Examples:</strong> Session management, security tokens, form data, accessibility preferences
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Analytics & Performance Cookies</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={() => handlePreferenceChange('analytics')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Help us understand how visitors interact with our website by collecting and reporting 
                    information anonymously. This data helps us improve our website performance and user experience.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Services:</strong> Google Analytics, Microsoft Clarity<br />
                    <strong>Purpose:</strong> Page views, user behavior, performance metrics<br />
                    <strong>Data:</strong> Anonymized usage statistics, no personal identification
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Functional Cookies</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.functional}
                        onChange={() => handlePreferenceChange('functional')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Enable enhanced functionality and personalization, such as remembering your preferences, 
                    settings, and providing personalized content recommendations.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Examples:</strong> Language preferences, theme settings, personalized content<br />
                    <strong>Purpose:</strong> Enhanced user experience and personalization
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Marketing & Advertising Cookies</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={() => handlePreferenceChange('marketing')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Used to track visitors across websites to display relevant advertisements, measure 
                    campaign effectiveness, and provide social media features.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Services:</strong> Facebook Pixel, LinkedIn Insight, Google Ads<br />
                    <strong>Purpose:</strong> Targeted advertising, conversion tracking, social media integration<br />
                    <strong>Data:</strong> Browsing behavior, ad interactions, social media activity
                  </div>
                </div>
              </div>

              {/* Legal Information */}
              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Your Rights</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• You can withdraw your consent at any time</p>
                  <p>• You can request deletion of your data</p>
                  <p>• You can access and export your data</p>
                  <p>• You can object to processing for legitimate interests</p>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  For more information, see our Privacy Policy or contact us at hello@yorkville.global
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={handleRejectAll}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Reject All
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
                >
                  Save My Preferences
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;