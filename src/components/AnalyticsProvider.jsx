import React, { useEffect } from 'react';

// Enhanced Analytics Provider with comprehensive tracking
const AnalyticsProvider = ({ children }) => {
  useEffect(() => {
    // Initialize analytics services with consent awareness
    initializeConsentAwareAnalytics();
    initializePerformanceTracking();
    initializeUserBehaviorTracking();
    
    // Setup global error tracking
    setupErrorTracking();
    
    // Setup conversion tracking
    setupConversionTracking();

    // Production environment optimizations
    if (import.meta.env.PROD) {
      // Disable console logs in production
      if (!import.meta.env.VITE_ENABLE_CONSOLE_LOGS) {
        console.log = () => {};
        console.warn = () => {};
        console.info = () => {};
      }
    }
    // Custom event tracking
    const trackEvent = (eventName, parameters = {}) => {
      // Google Analytics
      if (window.gtag) {
        window.gtag('event', eventName, parameters);
      }
      
      // Enhanced parameters for all events
      const enhancedParameters = {
        ...parameters,
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
        referrer: document.referrer,
        page_path: window.location.pathname
      };
      
      // Microsoft Clarity
      if (window.clarity) {
        window.clarity('event', eventName);
      }
      
      // Hotjar event tracking
      if (window.hj) {
        window.hj('event', eventName);
      }
      
      // Console log for development
      if (import.meta.env.DEV) {
        console.log('Analytics Event:', eventName, parameters);
      }
    };

    // Track page views
    const trackPageView = (path, title, additionalData = {}) => {
      trackEvent('page_view', {
        page_path: path,
        page_title: title,
        ...additionalData
      });
    };

    // Track form submissions
    const trackFormSubmission = (formType, formData = {}) => {
      trackEvent('form_submit', {
        form_type: formType,
        form_completion_time: formData.completionTime,
        form_field_count: formData.fieldCount,
        form_validation_errors: formData.validationErrors,
        user_type: formData.userType
      });
      
      // Track form abandonment prevention
      localStorage.removeItem(`form_draft_${formType}`);
    };

    // Track form field interactions
    const trackFormFieldInteraction = (fieldName, action, formType) => {
      trackEvent('form_field_interaction', {
        field_name: fieldName,
        interaction_type: action, // focus, blur, change, error
        form_type: formType
      });
    };

    // Track form abandonment
    const trackFormAbandonment = (formType, completedFields, totalFields) => {
      trackEvent('form_abandonment', {
        form_type: formType,
        completion_percentage: Math.round((completedFields / totalFields) * 100),
        abandoned_at_field: completedFields,
        total_fields: totalFields
      });
    };

    // Track button clicks
    const trackButtonClick = (buttonName, location, additionalData = {}) => {
      trackEvent('button_click', {
        button_name: buttonName,
        click_location: location,
        button_type: additionalData.buttonType || 'primary',
        user_intent: additionalData.userIntent,
        conversion_potential: additionalData.conversionPotential
      });
    };

    // Track modal opens
    const trackModalOpen = (modalType, trigger = 'unknown') => {
      trackEvent('modal_open', {
        modal_type: modalType,
        trigger_source: trigger,
        user_journey_step: 'modal_interaction'
      });
    };

    // Track search queries
    const trackSearch = (query, results_count, searchContext = {}) => {
      trackEvent('search', {
        search_term: query,
        results_count: results_count,
        search_category: searchContext.category,
        search_filters: searchContext.filters,
        search_duration: searchContext.duration
      });
    };

    // Track errors
    const trackError = (error_type, errorData = {}) => {
      trackEvent('error', {
        error_type: error_type,
        error_message: errorData.error_message || errorData.message,
        error_stack: errorData.error_stack || errorData.stack,
        error_component: errorData.component,
        error_severity: errorData.severity || 'medium',
        user_action_before_error: errorData.userAction
      });
    };

    // Track user engagement
    const trackUserEngagement = (engagementType, engagementData = {}) => {
      trackEvent('user_engagement', {
        engagement_type: engagementType, // high, medium, low
        session_duration: engagementData.sessionDuration,
        pages_visited: engagementData.pagesVisited,
        interactions_count: engagementData.interactionsCount,
        conversion_likelihood: engagementData.conversionLikelihood
      });
    };

    // Track business metrics
    const trackBusinessMetric = (metricType, metricData = {}) => {
      trackEvent('business_metric', {
        metric_type: metricType, // lead_quality, conversion_rate, user_value
        metric_value: metricData.value,
        metric_category: metricData.category,
        business_impact: metricData.impact
      });
    };

    // Make tracking functions globally available
    window.trackEvent = trackEvent;
    window.trackPageView = trackPageView;
    window.trackFormSubmission = trackFormSubmission;
    window.trackButtonClick = trackButtonClick;
    window.trackModalOpen = trackModalOpen;
    window.trackSearch = trackSearch;
    window.trackError = trackError;
    window.trackFormFieldInteraction = trackFormFieldInteraction;
    window.trackFormAbandonment = trackFormAbandonment;
    window.trackUserEngagement = trackUserEngagement;
    window.trackBusinessMetric = trackBusinessMetric;

    // Track initial page load
    trackPageView(window.location.pathname, document.title, {
      is_initial_load: true,
      referrer: document.referrer,
      utm_source: new URLSearchParams(window.location.search).get('utm_source'),
      utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
      utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign')
    });

    // Cleanup function
    return () => {
      // Remove global tracking functions
      delete window.trackEvent;
      delete window.trackPageView;
      delete window.trackFormSubmission;
      delete window.trackButtonClick;
      delete window.trackModalOpen;
      delete window.trackSearch;
      delete window.trackError;
      delete window.trackFormFieldInteraction;
      delete window.trackFormAbandonment;
      delete window.trackUserEngagement;
      delete window.trackBusinessMetric;
    };
  }, []);

  // Initialize consent-aware analytics
  const initializeConsentAwareAnalytics = () => {
    // Check if user has given consent
    const consent = localStorage.getItem('cookieConsent');
    if (consent) {
      const preferences = JSON.parse(consent);
      
      // Initialize Hotjar only if analytics consent is given
      if (preferences.analytics) {
        initializeHotjar();
      }
    }
    
    // Google Analytics is already loaded in HTML with consent mode
    // It will only collect data when consent is granted
    
    // Microsoft Clarity is now loaded in HTML and consent is managed there
  };

  // Initialize Hotjar (only called when consent is given)
  const initializeHotjar = () => {
    const HOTJAR_ID = import.meta.env.VITE_HOTJAR_ID;
    const HOTJAR_SV = import.meta.env.VITE_HOTJAR_SV || '6';
    
    if (HOTJAR_ID && typeof window !== 'undefined' && !window.hj) {
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:HOTJAR_ID,hjsv:HOTJAR_SV};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    }
  };

  // Initialize Performance Tracking
  const initializePerformanceTracking = () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Track page load performance
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          if (perfData && window.trackEvent) {
            window.trackEvent('page_performance', {
              load_time: Math.round(perfData.loadEventEnd - perfData.fetchStart),
              dom_content_loaded: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
              first_byte: Math.round(perfData.responseStart - perfData.fetchStart)
            });
          }
        }, 0);
      });
    }
  };

  // Initialize User Behavior Tracking
  const initializeUserBehaviorTracking = () => {
    if (typeof window !== 'undefined') {
      let scrollDepth = 0;
      let timeOnPage = Date.now();
      
      // Track scroll depth
      const trackScrollDepth = () => {
        const currentScroll = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (currentScroll > scrollDepth) {
          scrollDepth = currentScroll;
        }
      };
      
      window.addEventListener('scroll', trackScrollDepth);
      
      // Track time on page when user leaves
      window.addEventListener('beforeunload', () => {
        if (window.trackEvent) {
          window.trackEvent('user_behavior', {
            time_on_page: Math.round((Date.now() - timeOnPage) / 1000),
            scroll_depth: scrollDepth
          });
        }
      });
    }
  };

  // Setup Error Tracking
  const setupErrorTracking = () => {
    if (typeof window !== 'undefined') {
      window.addEventListener('error', (event) => {
        if (window.trackError) {
          window.trackError('javascript_error', {
            error_message: event.message,
            error_stack: event.error?.stack,
            filename: event.filename,
            line_number: event.lineno,
            column_number: event.colno
          });
        }
      });

      window.addEventListener('unhandledrejection', (event) => {
        if (window.trackError) {
          window.trackError('promise_rejection', {
            error_message: event.reason?.message || 'Unhandled promise rejection',
            error_stack: event.reason?.stack
          });
        }
      });
    }
  };

  // Setup Conversion Tracking
  const setupConversionTracking = () => {
    // This function can be used to set up additional conversion tracking
    // that doesn't require external scripts
    if (typeof window !== 'undefined') {
      // Track form starts
      document.addEventListener('focusin', (event) => {
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
          const form = event.target.closest('form');
          if (form && window.trackEvent) {
            window.trackEvent('form_start', {
              form_id: form.id || 'unknown',
              field_name: event.target.name || event.target.id || 'unknown'
            });
          }
        }
      });
    }
  };

  return <>{children}</>;
};

export default AnalyticsProvider;