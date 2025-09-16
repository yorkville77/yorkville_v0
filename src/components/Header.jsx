import React, { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin, Search } from 'lucide-react';
import SocialLinks from './SocialLinks';
import SSLIndicator from './SSLIndicator';

const Header = ({ onShowContact, onShowPrivacy, onShowTerms, onShowSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (action) => {
    action();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/FullLogo_Transparent.png" 
              alt="Yorkville - Simply Focused" 
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav id="navigation" className="hidden md:flex items-center space-x-8">
            <a href="#philosophy" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">
              Philosophy
            </a>
            <a href="#services" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">
              Services
            </a>
            <button 
              onClick={onShowContact}
              className="text-gray-700 hover:text-blue-900 transition-colors font-medium"
            >
              Contact
            </button>
            <button 
              onClick={onShowPrivacy}
              className="text-gray-700 hover:text-blue-900 transition-colors font-medium"
            >
              Privacy
            </button>
            <button
              onClick={onShowSearch}
              className="text-gray-700 hover:text-blue-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </nav>

          {/* Contact Info - Desktop */}
          <div className="hidden lg:flex items-center space-x-4 text-sm text-gray-600">
            <SSLIndicator variant="header" />
            <SocialLinks variant="header" />
            <div className="flex items-center gap-1">
              <Mail size={16} />
              <span>hello@yorkville.global</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onShowSearch}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#philosophy" 
                className="text-gray-700 hover:text-blue-900 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Philosophy
              </a>
              <a 
                href="#services" 
                className="text-gray-700 hover:text-blue-900 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <button 
                onClick={() => handleNavClick(onShowContact)}
                className="text-gray-700 hover:text-blue-900 transition-colors font-medium py-2 text-left"
              >
                Contact
              </button>
              <button 
                onClick={() => handleNavClick(onShowPrivacy)}
                className="text-gray-700 hover:text-blue-900 transition-colors font-medium py-2 text-left"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => handleNavClick(onShowTerms)}
                className="text-gray-700 hover:text-blue-900 transition-colors font-medium py-2 text-left"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => handleNavClick(onShowSearch)}
                className="text-gray-700 hover:text-blue-900 transition-colors font-medium py-2 text-left flex items-center gap-2"
              >
                <Search size={16} />
                Search
              </button>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={16} />
                  <span>hello@yorkville.global</span>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;