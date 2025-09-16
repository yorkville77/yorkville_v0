import React from 'react';
import { ExternalLink, BookOpen, TrendingUp, Users, Target, Award } from 'lucide-react';

const ExternalResources = () => {
  // Hidden for now - will be enabled when we have established partnerships
  const isVisible = false;
  
  if (!isVisible) {
    return null;
  }

  const resources = [
    {
      title: 'Financial Planning Best Practices',
      description: 'Comprehensive guide to strategic financial planning for growing businesses',
      url: 'https://www.investopedia.com/financial-planning-4689695',
      category: 'Education',
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Startup Funding Guide',
      description: 'Everything you need to know about raising capital for your business',
      url: 'https://www.entrepreneur.com/article/funding-guide',
      category: 'Funding',
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Building Finance Teams',
      description: 'How to build and scale effective finance teams in growing companies',
      url: 'https://www.mckinsey.com/business-functions/strategy-and-corporate-finance',
      category: 'Team Building',
      icon: Users,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Financial KPIs for Startups',
      description: 'Key performance indicators every startup should track',
      url: 'https://www.klipfolio.com/resources/articles/what-is-a-key-performance-indicator',
      category: 'Metrics',
      icon: Target,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      title: 'Professional Finance Certifications',
      description: 'Overview of important certifications for finance professionals',
      url: 'https://www.cfainstitute.org/',
      category: 'Professional Development',
      icon: Award,
      color: 'bg-indigo-100 text-indigo-600'
    }
  ];

  const industryPartners = [
    {
      name: 'Dutch Chamber of Commerce',
      description: 'Official business registration and support',
      url: 'https://www.kvk.nl/english/',
      logo: '🏛️'
    },
    {
      name: 'Netherlands Enterprise Agency',
      description: 'Government support for entrepreneurs',
      url: 'https://english.rvo.nl/',
      logo: '🇳🇱'
    },
    {
      name: 'European Investment Bank',
      description: 'Financing solutions for European businesses',
      url: 'https://www.eib.org/',
      logo: '🏦'
    },
    {
      name: 'TechLeap.nl',
      description: 'Dutch tech ecosystem support',
      url: 'https://www.techleap.nl/',
      logo: '🚀'
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Educational Resources */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Educational Resources
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Expand your knowledge with these carefully curated resources from industry leaders
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 group"
                  onClick={() => {
                    if (window.trackEvent) {
                      window.trackEvent('external_resource_click', {
                        resource_title: resource.title,
                        resource_category: resource.category,
                        resource_url: resource.url
                      });
                    }
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${resource.color} flex-shrink-0`}>
                      <Icon size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">
                          {resource.title}
                        </h4>
                        <ExternalLink size={16} className="text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                      </div>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {resource.description}
                      </p>
                      <span className="inline-block mt-3 text-xs font-medium text-blue-900 bg-blue-50 px-2 py-1 rounded-full">
                        {resource.category}
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Industry Partners */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Trusted Partners & Resources
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We work alongside established institutions to provide comprehensive support
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industryPartners.map((partner, index) => (
              <a
                key={index}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-center group"
                onClick={() => {
                  if (window.trackEvent) {
                    window.trackEvent('partner_link_click', {
                      partner_name: partner.name,
                      partner_url: partner.url
                    });
                  }
                }}
              >
                <div className="text-4xl mb-4">{partner.logo}</div>
                <h4 className="font-semibold text-gray-900 group-hover:text-blue-900 transition-colors mb-2">
                  {partner.name}
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  {partner.description}
                </p>
                <div className="flex items-center justify-center gap-1 text-blue-900 text-sm font-medium">
                  <span>Learn More</span>
                  <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
            <h4 className="text-xl font-bold text-gray-900 mb-4">
              Need More Specific Resources?
            </h4>
            <p className="text-gray-600 mb-6">
              Our team can provide personalized recommendations based on your specific needs and industry.
            </p>
            <button
              onClick={() => {
                if (window.trackButtonClick) {
                  window.trackButtonClick('contact_for_resources', 'external_resources');
                }
                // This would trigger the contact modal - you'd need to pass the handler down
              }}
              className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Get Personalized Recommendations
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExternalResources;