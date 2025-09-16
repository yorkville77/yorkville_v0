import React from 'react';
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react';

const ErrorFallback = ({ error, resetError, context = 'component' }) => {
  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-[400px] flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="text-red-600" size={32} />
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {context === 'form' ? 'Form Error' : 'Something went wrong'}
        </h2>
        
        <p className="text-gray-600 mb-6">
          {context === 'form' 
            ? 'There was an issue with the form. Please try again.'
            : 'We encountered an unexpected error. Please try refreshing the page.'
          }
        </p>

        <div className="space-y-3">
          {resetError && (
            <button
              onClick={resetError}
              className="w-full bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw size={20} />
              Try Again
            </button>
          )}
          
          <button
            onClick={handleReload}
            className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw size={20} />
            Refresh Page
          </button>
          
          <button
            onClick={handleGoHome}
            className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Go Home
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? 
            <a 
              href="mailto:hello@yorkville.global?subject=Website Error Report"
              className="text-blue-900 hover:text-blue-800 font-medium ml-1"
            >
              Contact support
            </a>
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && error && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Error Details (Development)
            </summary>
            <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded text-xs">
              <pre className="whitespace-pre-wrap text-red-800">
                {error.toString()}
              </pre>
            </div>
          </details>
        )}
      </div>
    </div>
  );
};

export default ErrorFallback;