import { useState, useCallback } from 'react';

export const useErrorHandler = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleError = useCallback((error, context = '') => {
    console.error(`Error ${context}:`, error);
    setError({
      message: error.message || 'An unexpected error occurred',
      context,
      timestamp: new Date().toISOString()
    });
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const withErrorHandling = useCallback((asyncFunction, context = '') => {
    return async (...args) => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await asyncFunction(...args);
        return result;
      } catch (error) {
        handleError(error, context);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
  }, [handleError]);

  return {
    error,
    isLoading,
    handleError,
    clearError,
    withErrorHandling
  };
};