import React, { useState } from 'react';
import { ChevronRight, Users, Target, Zap, Star, ArrowRight, X } from 'lucide-react';
import SEOHead from './components/SEOHead';
import RichSnippets from './components/RichSnippets';
import SkipNavigation from './components/SkipNavigation';
import Breadcrumbs from './components/Breadcrumbs';
import SearchModal from './components/SearchModal';
import FinanceProfessionalForm from './components/FinanceProfessionalForm';
import BusinessForm from './components/BusinessForm';
import Header from './components/Header';
import CookieConsent from './components/CookieConsent';
import ContactModal from './components/ContactModal';
import PrivacyModal from './components/PrivacyModal';
import TermsModal from './components/TermsModal';
import SocialLinks from './components/SocialLinks';
import ExternalResources from './components/ExternalResources';
import SocialProof from './components/SocialProof';
import NewsletterSignup from './components/NewsletterSignup';
import SecurityBadges from './components/SecurityBadges';
import SSLIndicator from './components/SSLIndicator';
import { useBreadcrumbs } from './hooks/useBreadcrumbs';
import { useSEO } from './hooks/useSEO';

function App() {
  const [showFinanceForm, setShowFinanceForm] = useState(false);
  const [showBusinessForm, setShowBusinessForm] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  
  const { breadcrumbs, setBreadcrumbsForSection } = useBreadcrumbs();
  const { getSEOConfig } = useSEO();

  // Get current page SEO config
  const currentSEO = getSEOConfig('home');

  // FAQ data for rich snippets
  const faqData = [
    {
      question: "What services does Yorkville Advisors provide?",
      answer: "We provide strategic financial planning, funding preparation, financial systems implementation, and growth management support for businesses. We also offer investment opportunities and advisory roles for finance professionals."
    },
    {
      question: "How do I join the finance professional network?",
      answer: "You can join by filling out our Finance Professional application form. We review applications based on experience, expertise, and alignment with our community values."
    },
    {
      question: "What types of businesses do you work with?",
      answer: "We work with businesses of all sizes, from early-stage startups to established companies seeking growth. Our focus is on companies that can benefit from strategic financial guidance and mentorship."
    },
    {
      question: "Is Yorkville Advisors GDPR compliant?",
      answer: "Yes, we are fully GDPR compliant and follow strict data protection standards. We prioritize your privacy and security in all our operations."
    }
  ];

  // Handle form opening with breadcrumbs
  const handleShowFinanceForm = () => {
    setBreadcrumbsForSection('finance-form');
    setShowFinanceForm(true);
  };

  const handleShowBusinessForm = () => {
    setBreadcrumbsForSection('business-form');
    setShowBusinessForm(true);
  };

  const handleShowContact = () => {
    setBreadcrumbsForSection('contact');
    setShowContact(true);
  };

  const handleShowPrivacy = () => {
    setBreadcrumbsForSection('privacy');
    setShowPrivacy(true);
  };

  const handleShowTerms = () => {
    setBreadcrumbsForSection('terms');
    setShowTerms(true);
  };

  // Handle modal closing - reset breadcrumbs
  const handleCloseModal = (setter) => {
    setter(false);
    setBreadcrumbsForSection('');
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CFO, TechStart Inc.",
      content: "The financial guidance we received was instrumental in our successful Series A funding round. The mentorship program connected us with exactly the right expertise.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Finance Director",
      content: "Being part of the Yorkville network has been incredibly rewarding. I've been able to share my expertise while learning from other professionals.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "CEO, GrowthCorp",
      content: "The strategic financial planning support helped us scale from $2M to $15M in revenue. Their community-driven approach is truly unique.",
      rating: 5
    }
  ];

  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 z-10 p-2"
          >
            <X size={24} />
          </button>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Head */}
      <SEOHead {...currentSEO} />
      
      {/* Rich Snippets */}
      <RichSnippets type="faq" data={faqData} />
      
      {/* Skip Navigation */}
      <SkipNavigation />
      
      {/* Header */}
      <Header 
        onShowContact={handleShowContact}
        onShowPrivacy={handleShowPrivacy}
        onShowTerms={handleShowTerms}
        onShowSearch={() => setShowSearch(true)}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Section */}
      <main id="main-content">
        <section id="hero" className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-8">
              <img 
                src="/FullLogo_Transparent.png" 
                alt="Yorkville - Simply Focused" 
                className="h-[32rem] sm:h-[40rem] md:h-[48rem] lg:h-[56rem] w-auto max-w-full"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight px-4">
              Connecting Finance<br />
              Expertise with Growth
            </h1>
            <p className="text-lg sm:text-xl mb-8 max-w-2xl text-blue-100 px-4">
              Join our community of finance professionals and businesses working together 
              to drive growth through strategic financial guidance and mentorship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg px-4">
              <button
                onClick={handleShowFinanceForm}
                onClickCapture={() => window.trackButtonClick && window.trackButtonClick('finance_professional_cta', 'hero')}
                className="bg-white text-blue-900 px-6 sm:px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <span className="hidden sm:inline">Join as Finance Professional</span>
                <span className="sm:hidden">Finance Professional</span>
                <ArrowRight size={20} />
              </button>
              <button
                onClick={handleShowBusinessForm}
                onClickCapture={() => window.trackButtonClick && window.trackButtonClick('business_support_cta', 'hero')}
                className="border-2 border-white text-white px-6 sm:px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                Get Business Support
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* Our Philosophy Section */}
      <section id="philosophy" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 px-4">
              Our Philosophy
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              We believe that great financial outcomes come from combining strong fundamentals 
              with community wisdom and simplified approaches.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Target className="text-blue-900" size={24} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Strong Fundamentals</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Every successful business is built on solid financial foundations. We focus on 
                time-tested principles and proven strategies that create lasting value.
              </p>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="text-blue-900" size={24} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Community Driven</h3>
              <p className="text-sm sm:text-base text-gray-600">
                The best insights come from shared experiences. Our community of finance 
                professionals collaborates to solve complex challenges together.
              </p>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Zap className="text-blue-900" size={24} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Simplified Focus</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Complex problems require clear thinking. We break down sophisticated financial 
                concepts into actionable strategies that drive results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section id="services" className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 px-4">
              What We Offer
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Tailored solutions for both finance professionals looking to share expertise 
              and businesses seeking financial guidance.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            <div className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-md">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
                For Finance Professionals
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <ChevronRight className="text-blue-900 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <strong className="text-gray-900 text-sm sm:text-base">Investment Opportunities</strong>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">Access to early-stage businesses seeking capital and expertise</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="text-blue-900 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <strong className="text-gray-900 text-sm sm:text-base">Advisory Roles</strong>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">Meaningful engagements with growing companies</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="text-blue-900 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <strong className="text-gray-900 text-sm sm:text-base">Content Creation</strong>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">Contribute to educational resources and tools</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="text-blue-900 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <strong className="text-gray-900 text-sm sm:text-base">Professional Network</strong>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">Connect with like-minded finance professionals</p>
                  </div>
                </li>
              </ul>
              <button
                onClick={handleShowFinanceForm}
                onClickCapture={() => window.trackButtonClick && window.trackButtonClick('finance_professional_cta', 'services')}
                className="mt-6 sm:mt-8 bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors w-full sm:w-auto text-sm sm:text-base"
              >
                Join Our Network
              </button>
            </div>
            
            <div className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-md">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
                For Businesses
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <ChevronRight className="text-blue-900 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <strong className="text-gray-900 text-sm sm:text-base">Strategic Planning</strong>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">Develop comprehensive financial strategies for growth</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="text-blue-900 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <strong className="text-gray-900 text-sm sm:text-base">Funding Preparation</strong>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">Get ready for investment rounds with expert guidance</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="text-blue-900 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <strong className="text-gray-900 text-sm sm:text-base">Financial Systems</strong>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">Implement robust financial processes and controls</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="text-blue-900 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <strong className="text-gray-900 text-sm sm:text-base">Growth Management</strong>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">Navigate financial challenges during scaling</p>
                  </div>
                </li>
              </ul>
              <button
                onClick={handleShowBusinessForm}
                onClickCapture={() => window.trackButtonClick && window.trackButtonClick('business_support_cta', 'services')}
                className="mt-6 sm:mt-8 bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors w-full sm:w-auto text-sm sm:text-base"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section - Hidden for now, ready for future */}
      <SocialProof />

      {/* External Resources Section - Hidden for now, ready for future */}
      <ExternalResources />

      {/* Security & Trust Section */}
      <SecurityBadges />

      {/* Newsletter Signup */}
      <NewsletterSignup />

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center text-center space-y-6">
            <SSLIndicator variant="footer" />
            
            <div className="mb-4 sm:mb-6">
              <img 
                src="/FullLogo_Transparent.png" 
                alt="Yorkville - Simply Focused" 
                className="h-48 sm:h-60 w-auto max-w-full"
              />
            </div>
            
            {/* Footer Links */}
            <SocialLinks variant="footer" className="mb-6" />
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <button 
                onClick={() => setShowContact(true)}
                className="text-blue-100 hover:text-white transition-colors"
              >
                Contact Us
              </button>
              <button 
                onClick={() => setShowPrivacy(true)}
                className="text-blue-100 hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => setShowTerms(true)}
                className="text-blue-100 hover:text-white transition-colors"
              >
                Terms of Service
              </button>
            </div>
            
            <p className="text-white text-sm sm:text-base px-4">
              © 2022 Yorkville Advisors BV. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <Modal isOpen={showFinanceForm} onClose={() => handleCloseModal(setShowFinanceForm)}>
        <FinanceProfessionalForm 
          onClose={() => handleCloseModal(setShowFinanceForm)}
          onOpen={() => window.trackModalOpen && window.trackModalOpen('finance_professional_form')}
        />
      </Modal>

      <Modal isOpen={showBusinessForm} onClose={() => handleCloseModal(setShowBusinessForm)}>
        <BusinessForm 
          onClose={() => handleCloseModal(setShowBusinessForm)}
          onOpen={() => window.trackModalOpen && window.trackModalOpen('business_form')}
        />
      </Modal>

      {/* Search Modal */}
      <SearchModal 
        isOpen={showSearch} 
        onClose={() => setShowSearch(false)}
        onShowContact={handleShowContact}
        onShowPrivacy={handleShowPrivacy}
        onShowTerms={handleShowTerms}
        onShowBusinessForm={handleShowBusinessForm}
        onShowFinanceForm={handleShowFinanceForm}
      />

      {/* Additional Modals */}
      <ContactModal 
        isOpen={showContact} 
        onClose={() => handleCloseModal(setShowContact)}
        onOpen={() => window.trackModalOpen && window.trackModalOpen('contact')}
      />
      <PrivacyModal 
        isOpen={showPrivacy} 
        onClose={() => handleCloseModal(setShowPrivacy)}
        onOpen={() => window.trackModalOpen && window.trackModalOpen('privacy')}
      />
      <TermsModal 
        isOpen={showTerms} 
        onClose={() => handleCloseModal(setShowTerms)}
        onOpen={() => window.trackModalOpen && window.trackModalOpen('terms')}
      />

      {/* Cookie Consent */}
      <CookieConsent />
    </div>
  );
}

export default App;