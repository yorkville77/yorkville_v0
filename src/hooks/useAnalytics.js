import { useEffect, useCallback, useRef } from 'react';

export const useAnalytics = () => {
  const sessionStartTime = useRef(Date.now());
  const pageStartTime = useRef(Date.now());
  const interactionCount = useRef(0);
  const engagementScore = useRef(0);

  // Enhanced page tracking
  const trackPageView = useCallback((pageName, additionalData = {}) => {
    if (window.trackPageView) {
      window.trackPageView(window.location.pathname, document.title, {
        page_name: pageName,
        session_duration: Date.now() - sessionStartTime.current,
        ...additionalData
      });
    }
  }, []);

  // Form analytics hook
  const useFormAnalytics = (formType) => {
    const formStartTime = useRef(null);
    const fieldInteractions = useRef({});
    const validationErrors = useRef([]);

    const trackFormStart = useCallback(() => {
      formStartTime.current = Date.now();
      if (window.trackEvent) {
        window.trackEvent('form_start', {
          form_type: formType,
          user_journey_step: 'form_initiation'
        });
      }
    }, [formType]);

    const trackFieldInteraction = useCallback((fieldName, action) => {
      if (!fieldInteractions.current[fieldName]) {
        fieldInteractions.current[fieldName] = [];
      }
      fieldInteractions.current[fieldName].push({
        action,
        timestamp: Date.now()
      });

      if (window.trackFormFieldInteraction) {
        window.trackFormFieldInteraction(fieldName, action, formType);
      }
    }, [formType]);

    const trackValidationError = useCallback((fieldName, errorType) => {
      validationErrors.current.push({
        field: fieldName,
        error: errorType,
        timestamp: Date.now()
      });

      if (window.trackEvent) {
        window.trackEvent('form_validation_error', {
          form_type: formType,
          field_name: fieldName,
          error_type: errorType
        });
      }
    }, [formType]);

    const trackFormCompletion = useCallback((formData = {}) => {
      const completionTime = formStartTime.current ? Date.now() - formStartTime.current : 0;
      const fieldCount = Object.keys(fieldInteractions.current).length;

      if (window.trackFormSubmission) {
        window.trackFormSubmission(formType, {
          completionTime,
          fieldCount,
          validationErrors: validationErrors.current.length,
          userType: formData.userType || 'unknown'
        });
      }

      // Calculate form efficiency score
      const efficiencyScore = Math.max(0, 100 - (validationErrors.current.length * 10) - Math.min(50, completionTime / 1000));
      
      if (window.trackBusinessMetric) {
        window.trackBusinessMetric('form_efficiency', {
          value: efficiencyScore,
          category: formType,
          impact: efficiencyScore > 70 ? 'positive' : 'negative'
        });
      }
    }, [formType]);

    const trackFormAbandonment = useCallback(() => {
      const completedFields = Object.keys(fieldInteractions.current).length;
      const totalFields = formType === 'business_support' ? 8 : 7; // Adjust based on actual form fields

      if (window.trackFormAbandonment) {
        window.trackFormAbandonment(formType, completedFields, totalFields);
      }
    }, [formType]);

    return {
      trackFormStart,
      trackFieldInteraction,
      trackValidationError,
      trackFormCompletion,
      trackFormAbandonment
    };
  };

  // User engagement tracking
  const trackEngagement = useCallback((engagementType, data = {}) => {
    interactionCount.current += 1;
    
    // Calculate engagement score
    const sessionDuration = Date.now() - sessionStartTime.current;
    const pageDuration = Date.now() - pageStartTime.current;
    
    engagementScore.current = Math.min(100, 
      (interactionCount.current * 10) + 
      Math.min(30, sessionDuration / 60000) + // Max 30 points for time
      (data.scrollDepth || 0) / 4 // Max 25 points for scroll
    );

    if (window.trackUserEngagement) {
      window.trackUserEngagement(engagementType, {
        sessionDuration: Math.round(sessionDuration / 1000),
        pagesVisited: 1, // Would need to track across pages
        interactionsCount: interactionCount.current,
        conversionLikelihood: engagementScore.current > 60 ? 'high' : engagementScore.current > 30 ? 'medium' : 'low',
        ...data
      });
    }
  }, []);

  // Conversion tracking
  const trackConversion = useCallback((conversionType, value = 0, additionalData = {}) => {
    if (window.trackEvent) {
      window.trackEvent('conversion', {
        conversion_type: conversionType,
        conversion_value: value,
        engagement_score: engagementScore.current,
        session_duration: Math.round((Date.now() - sessionStartTime.current) / 1000),
        ...additionalData
      });
    }

    // Track business impact
    if (window.trackBusinessMetric) {
      window.trackBusinessMetric('conversion_rate', {
        value: 1,
        category: conversionType,
        impact: 'positive'
      });
    }
  }, []);

  // A/B testing support
  const trackABTest = useCallback((testName, variant, outcome = null) => {
    if (window.trackEvent) {
      window.trackEvent('ab_test', {
        test_name: testName,
        variant: variant,
        outcome: outcome,
        user_segment: 'default' // Could be enhanced with user segmentation
      });
    }
  }, []);

  // Performance tracking
  const trackPerformance = useCallback((metricName, value, context = {}) => {
    if (window.trackEvent) {
      window.trackEvent('performance_metric', {
        metric_name: metricName,
        metric_value: value,
        page_path: window.location.pathname,
        ...context
      });
    }
  }, []);

  // Error tracking with context
  const trackErrorWithContext = useCallback((error, component, userAction = null) => {
    if (window.trackError) {
      window.trackError('component_error', {
        error_message: error.message,
        error_stack: error.stack,
        component: component,
        user_action: userAction,
        engagement_score: engagementScore.current,
        session_duration: Math.round((Date.now() - sessionStartTime.current) / 1000)
      });
    }
  }, []);

  // UTM and campaign tracking
  const trackCampaign = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const campaignData = {
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign'),
      utm_term: urlParams.get('utm_term'),
      utm_content: urlParams.get('utm_content'),
      referrer: document.referrer
    };

    if (Object.values(campaignData).some(value => value !== null)) {
      if (window.trackEvent) {
        window.trackEvent('campaign_attribution', campaignData);
      }
    }
  }, []);

  // Initialize campaign tracking on mount
  useEffect(() => {
    trackCampaign();
  }, [trackCampaign]);

  return {
    trackPageView,
    useFormAnalytics,
    trackEngagement,
    trackConversion,
    trackABTest,
    trackPerformance,
    trackErrorWithContext,
    trackCampaign,
    engagementScore: engagementScore.current
  };
};

// Custom hook for business metrics
export const useBusinessMetrics = () => {
  const trackLeadQuality = useCallback((leadData) => {
    let qualityScore = 0;
    
    // Score based on form completion
    if (leadData.formType === 'business_support') qualityScore += 30;
    if (leadData.formType === 'finance_professional') qualityScore += 40;
    
    // Score based on provided information
    if (leadData.businessSize) qualityScore += 20;
    if (leadData.yearsExperience) qualityScore += 20;
    if (leadData.linkedinUrl) qualityScore += 10;
    
    if (window.trackBusinessMetric) {
      window.trackBusinessMetric('lead_quality', {
        value: qualityScore,
        category: leadData.formType,
        impact: qualityScore > 70 ? 'high' : qualityScore > 40 ? 'medium' : 'low'
      });
    }
    
    return qualityScore;
  }, []);

  const trackUserValue = useCallback((userActions) => {
    let valueScore = 0;
    
    // Calculate value based on actions
    valueScore += (userActions.formSubmissions || 0) * 50;
    valueScore += (userActions.modalOpens || 0) * 5;
    valueScore += (userActions.buttonClicks || 0) * 2;
    valueScore += Math.min(20, (userActions.timeOnSite || 0) / 60); // Max 20 points for time
    
    if (window.trackBusinessMetric) {
      window.trackBusinessMetric('user_value', {
        value: valueScore,
        category: 'user_engagement',
        impact: valueScore > 100 ? 'high' : valueScore > 50 ? 'medium' : 'low'
      });
    }
    
    return valueScore;
  }, []);

  return {
    trackLeadQuality,
    trackUserValue
  };
};