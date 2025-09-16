import React from 'react';
import { Lock, Shield } from 'lucide-react';

const SSLIndicator = ({ variant = 'header' }) => {
  if (variant === 'header') {
    return (
      <div className="hidden lg:flex items-center gap-2 text-xs text-gray-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
        <Lock size={14} className="text-green-600" />
        <span>Secure Connection</span>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className="flex items-center justify-center gap-2 text-xs text-blue-100 mb-4">
        <Shield size={16} className="text-green-400" />
        <span>SSL Secured • GDPR Compliant • Privacy Protected</span>
      </div>
    );
  }

  return null;
};

export default SSLIndicator;