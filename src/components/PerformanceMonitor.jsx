import React, { useEffect } from 'react';

const PerformanceMonitor = ({ children }) => {
  useEffect(() => {
    // Monitor Core Web Vitals
    monitorCoreWebVitals();
    
    // Monitor resource loading
    monitorResourceLoading();
    
    // Monitor API performance
    monitorAPIPerformance();
    
    // Monitor user interactions
    monitorUserInteractions();
    
    // Monitor memory usage
    monitorMemoryUsage();
  }, []);

  const monitorCoreWebVitals = () => {
    // This is already implemented in AnalyticsProvider, but we can add more detailed monitoring
    if ('PerformanceObserver' in window) {
      // Time to First Byte (TTFB)
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.name === window.location.href) {
            const ttfb = entry.responseStart - entry.requestStart;
            if (window.trackPerformance) {
              window.trackPerformance('TTFB', Math.round(ttfb), {
                rating: ttfb < 200 ? 'good' : ttfb < 500 ? 'needs_improvement' : 'poor'
              });
            }
          }
        }
      }).observe({ entryTypes: ['navigation'] });

      // First Contentful Paint (FCP)
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (window.trackPerformance) {
            window.trackPerformance('FCP', Math.round(entry.startTime), {
              rating: entry.startTime < 1800 ? 'good' : entry.startTime < 3000 ? 'needs_improvement' : 'poor'
            });
          }
        }
      }).observe({ entryTypes: ['paint'] });
    }
  };

  const monitorResourceLoading = () => {
    if ('PerformanceObserver' in window) {
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.duration > 1000) { // Track slow resources
            if (window.trackPerformance) {
              window.trackPerformance('slow_resource', Math.round(entry.duration), {
                resource_name: entry.name,
                resource_type: entry.initiatorType,
                resource_size: entry.transferSize
              });
            }
          }
        }
      }).observe({ entryTypes: ['resource'] });
    }
  };

  const monitorAPIPerformance = () => {
    // Monitor fetch requests
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const startTime = performance.now();
      try {
        const response = await originalFetch(...args);
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        if (window.trackPerformance) {
          window.trackPerformance('api_request', Math.round(duration), {
            url: args[0],
            status: response.status,
            success: response.ok
          });
        }
        
        return response;
      } catch (error) {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        if (window.trackError) {
          window.trackError('api_error', {
            error_message: error.message,
            url: args[0],
            duration: Math.round(duration)
          });
        }
        
        throw error;
      }
    };
  };

  const monitorUserInteractions = () => {
    // Monitor interaction responsiveness
    let interactionStart = 0;
    
    ['click', 'keydown', 'touchstart'].forEach(eventType => {
      document.addEventListener(eventType, () => {
        interactionStart = performance.now();
      }, { passive: true });
    });
    
    // Monitor when the interaction completes
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (interactionStart > 0) {
          const interactionTime = entry.startTime - interactionStart;
          if (interactionTime > 100) { // Track slow interactions
            if (window.trackPerformance) {
              window.trackPerformance('slow_interaction', Math.round(interactionTime), {
                interaction_type: entry.name,
                rating: interactionTime < 100 ? 'good' : interactionTime < 300 ? 'needs_improvement' : 'poor'
              });
            }
          }
          interactionStart = 0;
        }
      }
    });
    
    observer.observe({ entryTypes: ['measure'] });
  };

  const monitorMemoryUsage = () => {
    // Monitor memory usage (Chrome only)
    if ('memory' in performance) {
      setInterval(() => {
        const memInfo = performance.memory;
        if (window.trackPerformance) {
          window.trackPerformance('memory_usage', memInfo.usedJSHeapSize, {
            total_heap_size: memInfo.totalJSHeapSize,
            heap_size_limit: memInfo.jsHeapSizeLimit,
            usage_percentage: Math.round((memInfo.usedJSHeapSize / memInfo.jsHeapSizeLimit) * 100)
          });
        }
      }, 30000); // Check every 30 seconds
    }
  };

  return <>{children}</>;
};

export default PerformanceMonitor;