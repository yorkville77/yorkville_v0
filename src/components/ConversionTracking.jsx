import React, { useEffect } from 'react';

const ConversionTracking = ({ children }) => {
  useEffect(() => {
    // Set up conversion tracking pixels and scripts
    setupFacebookPixel();
    setupLinkedInInsight();
    setupGoogleAdsConversion();
  }, []);

  const setupFacebookPixel = () => {
    const FACEBOOK_PIXEL_ID = import.meta.env.VITE_FACEBOOK_PIXEL_ID;
    
    if (FACEBOOK_PIXEL_ID && typeof window !== 'undefined') {
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');

      window.fbq('init', FACEBOOK_PIXEL_ID);
      window.fbq('track', 'PageView');
    }
  };

  const setupLinkedInInsight = () => {
    const LINKEDIN_PARTNER_ID = import.meta.env.VITE_LINKEDIN_PARTNER_ID;
    
    if (LINKEDIN_PARTNER_ID && typeof window !== 'undefined') {
      window._linkedin_partner_id = LINKEDIN_PARTNER_ID;
      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
      window._linkedin_data_partner_ids.push(LINKEDIN_PARTNER_ID);
      
      (function(l) {
        if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
        window.lintrk.q=[]}
        var s = document.getElementsByTagName("script")[0];
        var b = document.createElement("script");
        b.type = "text/javascript";b.async = true;
        b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
        s.parentNode.insertBefore(b, s);})(window.lintrk);
    }
  };

  const setupGoogleAdsConversion = () => {
    const GOOGLE_ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID;
    
    if (GOOGLE_ADS_ID && typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', GOOGLE_ADS_ID);
    }
  };

  // Enhanced conversion tracking functions
  useEffect(() => {
    // Override form submission tracking to include conversion pixels
    const originalTrackFormSubmission = window.trackFormSubmission;
    
    window.trackFormSubmission = (formType, formData = {}) => {
      // Call original tracking
      if (originalTrackFormSubmission) {
        originalTrackFormSubmission(formType, formData);
      }
      
      // Facebook Pixel conversion
      if (window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: formType,
          content_category: 'form_submission',
          value: formType === 'business_support' ? 100 : 50,
          currency: 'EUR'
        });
      }
      
      // LinkedIn conversion
      if (window.lintrk) {
        window.lintrk('track', { conversion_id: formType === 'business_support' ? 'business_lead' : 'finance_lead' });
      }
      
      // Google Ads conversion
      if (window.gtag) {
        window.gtag('event', 'conversion', {
          send_to: `${import.meta.env.VITE_GOOGLE_ADS_ID}/${formType === 'business_support' ? 'BUSINESS_CONVERSION_ID' : 'FINANCE_CONVERSION_ID'}`,
          value: formType === 'business_support' ? 100 : 50,
          currency: 'EUR'
        });
      }
    };
  }, []);

  return <>{children}</>;
};

export default ConversionTracking;