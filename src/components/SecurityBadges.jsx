import React from 'react';
import { Shield, Lock, CheckCircle, Eye, Database, Globe } from 'lucide-react';

const SecurityBadges = () => {
  return (
    <div className="bg-gray-50 py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            Your Security & Privacy Matter
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            We implement industry-leading security measures to protect your information
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">

          {/* GDPR Compliance */}
          <div className="flex flex-col items-center text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2 sm:mb-3">
              <Shield className="text-blue-600" size={20} />
            </div>
            <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">GDPR</h4>
            <p className="text-xs text-gray-600">Compliant</p>
          </div>

          {/* Data Protection */}
          <div className="flex flex-col items-center text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2 sm:mb-3">
              <Database className="text-purple-600" size={20} />
            </div>
            <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">Data Protected</h4>
            <p className="text-xs text-gray-600">EU Standards</p>
          </div>

          {/* Privacy First */}
          <div className="flex flex-col items-center text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2 sm:mb-3">
              <Eye className="text-indigo-600" size={20} />
            </div>
            <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">Privacy First</h4>
            <p className="text-xs text-gray-600">Transparent</p>
          </div>

          {/* Verified Business */}
          <div className="flex flex-col items-center text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2 sm:mb-3">
              <CheckCircle className="text-blue-600" size={20} />
            </div>
            <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">Verified</h4>
            <p className="text-xs text-gray-600">Business</p>
          </div>

        {/* Additional Security Information */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full border border-gray-200">
            <Lock size={16} className="text-green-600" />
            <span>This site is protected by SSL encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;
  )
}