import { useEffect } from 'react';

export const useSEO = () => {
  // Page-specific SEO configurations
  const seoConfigs = {
    home: {
      title: "Yorkville Advisors - Connecting Finance Expertise with Growth",
      description: "Join our community of finance professionals and businesses working together to drive growth through strategic financial guidance and mentorship.",
      keywords: "finance professionals, business mentorship, financial guidance, investment opportunities, advisory services, startup funding, financial planning, business growth",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Yorkville Advisors BV",
        "description": "Connecting finance professionals with businesses seeking growth through strategic financial guidance and mentorship.",
        "url": "https://yorkville.global",
        "logo": "https://yorkville.global/FullLogo_Transparent.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+31-20-000-0000",
          "contactType": "customer service",
          "email": "hello@yorkville.global"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Den Haag",
          "addressCountry": "NL"
        },
        "sameAs": [
          "https://linkedin.com/company/yorkville-advisors"
        ],
        "foundingDate": "2022",
        "industry": "Financial Services"
      }
    },
    
    philosophy: {
      title: "Our Philosophy - Strong Fundamentals, Community Driven, Simplified Focus",
      description: "Learn about Yorkville Advisors' philosophy: combining strong financial fundamentals with community wisdom and simplified approaches for lasting business value.",
      keywords: "financial philosophy, business fundamentals, community driven finance, simplified financial strategies, financial principles",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Our Philosophy - Strong Fundamentals, Community Driven, Simplified Focus",
        "description": "Learn about Yorkville Advisors' philosophy: combining strong financial fundamentals with community wisdom and simplified approaches.",
        "author": {
          "@type": "Organization",
          "name": "Yorkville Advisors BV"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Yorkville Advisors BV",
          "logo": "https://yorkville.global/FullLogo_Transparent.png"
        },
        "datePublished": "2022-01-01",
        "dateModified": "2025-01-09"
      }
    },
    
    services: {
      title: "Financial Services - Business Support & Professional Network",
      description: "Discover our comprehensive financial services: strategic planning, funding preparation, advisory roles, and investment opportunities for businesses and finance professionals.",
      keywords: "financial services, business advisory, strategic planning, funding preparation, investment opportunities, finance professional network",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Financial Advisory Services",
        "description": "Comprehensive financial services including strategic planning, funding preparation, and professional networking.",
        "provider": {
          "@type": "Organization",
          "name": "Yorkville Advisors BV"
        },
        "serviceType": "Financial Advisory",
        "areaServed": "Global",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Financial Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Strategic Financial Planning",
                "description": "Develop comprehensive financial strategies for business growth"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Funding Preparation",
                "description": "Get ready for investment rounds with expert guidance"
              }
            }
          ]
        }
      }
    },
    
    contact: {
      title: "Contact Yorkville Advisors - Get Financial Guidance Today",
      description: "Contact our team of finance professionals for business support, investment opportunities, or to join our network. Email hello@yorkville.global or use our contact form.",
      keywords: "contact yorkville advisors, financial consultation, business support contact, finance professional network contact",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Yorkville Advisors",
        "description": "Get in touch with our team for financial guidance and business support.",
        "mainEntity": {
          "@type": "Organization",
          "name": "Yorkville Advisors BV",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+31-20-000-0000",
            "contactType": "customer service",
            "email": "hello@yorkville.global",
            "availableLanguage": ["English", "Dutch"]
          }
        }
      }
    },
    
    'business-form': {
      title: "Business Support Application - Get Financial Guidance",
      description: "Apply for business mentoring and financial guidance from our network of experienced finance professionals. Strategic planning, funding preparation, and growth management.",
      keywords: "business support application, financial mentoring, business guidance, startup funding help, financial advisory application",
      noIndex: false,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Business Support Application",
        "description": "Apply for business mentoring and financial guidance from experienced finance professionals.",
        "mainEntity": {
          "@type": "Service",
          "name": "Business Support Program",
          "description": "Comprehensive business mentoring and financial guidance program."
        }
      }
    },
    
    'finance-form': {
      title: "Join Finance Professional Network - Investment & Advisory Opportunities",
      description: "Join our network of finance professionals. Access investment opportunities, advisory roles, and contribute to our community of financial experts.",
      keywords: "finance professional network, investment opportunities, advisory roles, finance expert community, professional financial network",
      noIndex: false,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Finance Professional Network Application",
        "description": "Join our network of finance professionals for investment and advisory opportunities.",
        "mainEntity": {
          "@type": "ProfessionalService",
          "name": "Finance Professional Network",
          "description": "Network of finance professionals providing advisory and investment services."
        }
      }
    },
    
    privacy: {
      title: "Privacy Policy - How We Protect Your Data",
      description: "Learn how Yorkville Advisors protects your personal information, complies with GDPR, and maintains your privacy. Updated July 9, 2025.",
      keywords: "privacy policy, data protection, GDPR compliance, personal information security, yorkville privacy",
      noIndex: false,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Privacy Policy",
        "description": "Privacy policy detailing how we protect and handle personal information.",
        "datePublished": "2022-01-01",
        "dateModified": "2025-07-09"
      }
    },
    
    terms: {
      title: "Terms of Service - Yorkville Advisors Legal Terms",
      description: "Read our terms of service for using Yorkville Advisors platform and services. Legal terms, user responsibilities, and service conditions.",
      keywords: "terms of service, legal terms, user agreement, service conditions, yorkville terms",
      noIndex: false,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Terms of Service",
        "description": "Terms of service and legal conditions for using our platform.",
        "datePublished": "2022-01-01",
        "dateModified": "2025-07-09"
      }
    }
  };

  const getSEOConfig = (page) => {
    return seoConfigs[page] || seoConfigs.home;
  };

  // Future-ready: Blog post SEO
  const generateBlogPostSEO = (post) => {
    return {
      title: `${post.title} | Yorkville Advisors Blog`,
      description: post.excerpt || post.description,
      keywords: post.tags ? post.tags.join(', ') : '',
      canonicalUrl: `https://yorkville.global/blog/${post.slug}`,
      ogType: 'article',
      structuredData: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "author": {
          "@type": "Person",
          "name": post.author || "Yorkville Advisors Team"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Yorkville Advisors BV",
          "logo": "https://yorkville.global/FullLogo_Transparent.png"
        },
        "datePublished": post.publishedAt,
        "dateModified": post.updatedAt || post.publishedAt,
        "image": post.featuredImage || "https://yorkville.global/FullLogo_Transparent.png",
        "articleSection": post.category,
        "keywords": post.tags
      }
    };
  };

  // Future-ready: Service page SEO
  const generateServiceSEO = (service) => {
    return {
      title: `${service.name} - Financial Services | Yorkville Advisors`,
      description: service.description,
      keywords: service.keywords || '',
      canonicalUrl: `https://yorkville.global/services/${service.slug}`,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.name,
        "description": service.description,
        "provider": {
          "@type": "Organization",
          "name": "Yorkville Advisors BV"
        },
        "serviceType": service.category,
        "areaServed": "Global"
      }
    };
  };

  // Future-ready: Team member SEO
  const generateTeamMemberSEO = (member) => {
    return {
      title: `${member.name} - ${member.role} | Yorkville Advisors Team`,
      description: `Meet ${member.name}, ${member.role} at Yorkville Advisors. ${member.bio}`,
      keywords: `${member.name}, ${member.role}, yorkville team, finance professional`,
      canonicalUrl: `https://yorkville.global/team/${member.slug}`,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": member.name,
        "jobTitle": member.role,
        "description": member.bio,
        "worksFor": {
          "@type": "Organization",
          "name": "Yorkville Advisors BV"
        },
        "image": member.photo,
        "sameAs": member.socialLinks || []
      }
    };
  };

  // Analytics and tracking setup
  const setupAnalytics = () => {
    // Google Analytics 4 setup (future-ready)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: document.title,
        page_location: window.location.href
      });
    }

    // Microsoft Clarity setup (future-ready)
    if (typeof window !== 'undefined' && window.clarity) {
      window.clarity('set', 'page_title', document.title);
    }
  };

  useEffect(() => {
    setupAnalytics();
  }, []);

  return {
    getSEOConfig,
    generateBlogPostSEO,
    generateServiceSEO,
    generateTeamMemberSEO,
    setupAnalytics
  };
};