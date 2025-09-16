import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, Users, Target, Zap, Mail, Shield } from 'lucide-react';
import NotFoundPage from './NotFoundPage';

const SearchModal = ({ 
  isOpen, 
  onClose, 
  onShowContact, 
  onShowPrivacy, 
  onShowTerms, 
  onShowBusinessForm, 
  onShowFinanceForm 
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);
  const inputRef = useRef(null);

  // Search data - in a real app, this would come from an API or search service
  const searchData = [
    {
      id: 1,
      title: 'Our Philosophy',
      content: 'Strong fundamentals, community driven, simplified focus',
      type: 'section',
      href: '#philosophy',
      icon: Target
    },
    {
      id: 2,
      title: 'Services for Businesses',
      content: 'Strategic planning, funding preparation, financial systems, growth management',
      type: 'section',
      href: '#services',
      icon: Users
    },
    {
      id: 3,
      title: 'Finance Professional Network',
      content: 'Join our community of finance professionals, investment opportunities, advisory roles',
      type: 'section',
      href: '#services',
      icon: Zap
    },
    {
      id: 4,
      title: 'Contact Us',
      content: 'Get in touch with our team at hello@yorkville.global',
      type: 'contact',
      href: '#contact',
      icon: Mail,
      action: 'contact'
    },
    {
      id: 5,
      title: 'Privacy Policy',
      content: 'Learn about how we protect your data and privacy',
      type: 'legal',
      href: '#privacy',
      icon: Shield,
      action: 'privacy'
    },
    {
      id: 6,
      title: 'Terms of Service',
      content: 'Read our terms and conditions for using our services',
      type: 'legal',
      href: '#terms',
      icon: FileText,
      action: 'terms'
    },
    {
      id: 7,
      title: 'Business Support Form',
      content: 'Apply for business mentoring and financial guidance',
      type: 'form',
      href: '#business-form',
      icon: Users,
      action: 'business-form'
    },
    {
      id: 8,
      title: 'Finance Professional Application',
      content: 'Join our network as a finance professional',
      type: 'form',
      href: '#finance-form',
      icon: Zap,
      action: 'finance-form'
    }
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    // Simulate search delay
    const searchTimeout = setTimeout(() => {
      const filteredResults = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.content.toLowerCase().includes(query.toLowerCase())
      );
      
      setResults(filteredResults);
      setShowNoResults(filteredResults.length === 0 && query.trim().length > 0);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const handleResultClick = (result) => {
    if (result.action) {
      // Handle special actions
      switch (result.action) {
        case 'contact':
          onClose();
          onShowContact && onShowContact();
          break;
        case 'privacy':
          onClose();
          onShowPrivacy && onShowPrivacy();
          break;
        case 'terms':
          onClose();
          onShowTerms && onShowTerms();
          break;
        case 'business-form':
          onClose();
          onShowBusinessForm && onShowBusinessForm();
          break;
        case 'finance-form':
          onClose();
          onShowFinanceForm && onShowFinanceForm();
          break;
        default:
          break;
      }
    } else {
      // Navigate to section
      const element = document.querySelector(result.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleShowNoResultsPage = () => {
    // Close search modal and show full 404 page
    onClose();
    // You could implement a full-page 404 state here
  };

  if (!isOpen) return null;

  // Show full 404 page for extensive searches with no results
  if (showNoResults && query.length > 3) {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
        <div className="min-h-screen">
          <NotFoundPage
            searchQuery={query}
            customMessage="We couldn't find what you're looking for."
            onShowContact={() => { onClose(); onShowContact && onShowContact(); }}
            onShowBusinessForm={() => { onClose(); onShowBusinessForm && onShowBusinessForm(); }}
            onShowFinanceForm={() => { onClose(); onShowFinanceForm && onShowFinanceForm(); }}
            onShowSearch={() => { setShowNoResults(false); setQuery(''); }}
          />
          <button
            onClick={() => { setShowNoResults(false); setQuery(''); }}
            className="fixed top-4 right-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 pt-20">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[70vh] overflow-hidden shadow-2xl">
        {/* Search Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200">
          <Search className="text-gray-400" size={20} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for services, information, or help..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 text-lg outline-none placeholder-gray-400"
          />
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto">
          {!query.trim() && (
            <div className="p-6 text-center text-gray-500">
              <Search size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">Search Yorkville Advisors</p>
              <p className="text-sm">Find information about our services, philosophy, or get help</p>
            </div>
          )}

          {query.trim() && isSearching && (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900 mx-auto"></div>
              <p className="mt-2 text-gray-500">Searching...</p>
            </div>
          )}

          {query.trim() && !isSearching && results.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              <p className="text-lg font-medium mb-2">No results found</p>
              <p className="text-sm mb-4">Try searching for "services", "philosophy", "contact", or "forms"</p>
              {query.length > 3 && (
                <button
                  onClick={handleShowNoResultsPage}
                  className="text-blue-900 hover:text-blue-800 text-sm font-medium"
                >
                  Get more help finding what you need →
                </button>
              )}
            </div>
          )}

          {results.length > 0 && (
            <div className="py-2">
              {results.map((result) => {
                const Icon = result.icon;
                return (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <Icon className="text-blue-900" size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 mb-1">{result.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{result.content}</p>
                        <span className="inline-block mt-1 text-xs text-blue-900 bg-blue-50 px-2 py-1 rounded-full capitalize">
                          {result.type}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Search Footer */}
        <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Press ESC to close</span>
            <span>Enter to select</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;