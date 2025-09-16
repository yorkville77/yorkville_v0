import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary';
import AnalyticsProvider from './components/AnalyticsProvider';
import ConversionTracking from './components/ConversionTracking';
import PerformanceMonitor from './components/PerformanceMonitor';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <AnalyticsProvider>
        <ConversionTracking>
          <PerformanceMonitor>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </PerformanceMonitor>
        </ConversionTracking>
      </AnalyticsProvider>
    </HelmetProvider>
  </StrictMode>
);