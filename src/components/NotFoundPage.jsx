import React, { useState } from 'react';
import { 
  AlertCircle, 
  Home, 
  Search, 
  Mail, 
  ArrowRight, 
  Users, 
  Target,
  ChevronRight,
  Clock
} from 'lucide-react';

const NotFoundPage = ({ 
  onShowContact, 
  onShowBusinessForm, 
  onShowFinanceForm, 
  onShowSearch,
  searchQuery = '',
  customMessage = null 
}) => {
  const [recentSearches] = useState([
    'Business support',
    'Finance professional',
    'Contact information',
    'Privacy policy'
  ]);

  const quickActions = [
    {
      title: 'Get Business Support',
      description: 'Apply for financial guidance and mentoring',
      icon: Users,
      action: onShowBusinessForm,
      color: 'blue'
    },
    {
      title: 'Join as Finance Professional',
      description: 'Connect with businesses seeking expertise',
      icon: Target,
      action: onShowFinanceForm,
      color: 'green'
    },
    {
      title: 'Contact Our Team',
      description: 'Get direct help from our support team',
      icon: Mail,
      action: onShowContact,
      color: 'purple'
    }
  ];

  const popularPages = [
    { title: 'Our Philosophy', href: '#philosophy', description: 'Learn about our approach' },
    { title: 'Services', href: '#services', description: 'Explore what we offer' },
    { title: 'Security & Privacy', href: '#security', description: 'How we protect your data' }
  ];

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleSearchAgain = () => {
    if (onShowSearch) {
      onShowSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full">
        {/* Main Error Message */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="text-blue-600" size={48} />
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {customMessage ? 'No Results Found' : '404 - Page Not Found'}
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-2">
            {customMessage || "The page you're looking for doesn't exist or has been moved."}
          </p>
          
          {searchQuery && (
            <p className="text-gray-500">
              Your search for "<span className="font-medium">{searchQuery}</span>" didn't return any results.
            </p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            const colorClasses = {
              blue: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
              green: 'bg-green-100 text-green-600 hover:bg-green-200',
              purple: 'bg-purple-100 text-purple-600 hover:bg-purple-200'
            };
            
            return (
              <button
                key={index}
                onClick={action.action}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-left group"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${colorClasses[action.color]}`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
                  {action.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                <div className="flex items-center text-blue-900 text-sm font-medium">
                  Get Started
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Popular Pages */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Target size={20} className="text-blue-600" />
              Popular Pages
            </h3>
            <div className="space-y-3">
              {popularPages.map((page, index) => (
                <a
                  key={index}
                  href={page.href}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div>
                    <h4 className="font-medium text-gray-900 group-hover:text-blue-900 transition-colors">
                      {page.title}
                    </h4>
                    <p className="text-sm text-gray-600">{page.description}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
          </div>

          {/* Search & Help */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Search size={20} className="text-blue-600" />
              Search & Help
            </h3>
            
            <button
              onClick={handleSearchAgain}
              className="w-full bg-blue-50 border border-blue-200 text-blue-900 px-4 py-3 rounded-lg font-medium hover:bg-blue-100 transition-colors mb-4 flex items-center justify-center gap-2"
            >
              <Search size={16} />
              Try Another Search
            </button>

            {recentSearches.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <Clock size={14} />
                  Popular Searches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={handleSearchAgain}
                      className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoHome}
            className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Back to Home
          </button>
          
          <button
            onClick={onShowContact}
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <Mail size={20} />
            Contact Support
          </button>
        </div>

        {/* Additional Help */}
        <div className="text-center mt-8 p-4 bg-white rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">
            Still can't find what you're looking for? 
            <a 
              href="mailto:hello@yorkville.global" 
              className="text-blue-900 hover:text-blue-800 font-medium ml-1"
            >
              Email us directly
            </a>
            {' '}and we'll help you right away.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;