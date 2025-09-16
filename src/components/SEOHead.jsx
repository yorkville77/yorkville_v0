import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title = "Yorkville Advisors - Connecting Finance Expertise with Growth",
  description = "Join our community of finance professionals and businesses working together to drive growth through strategic financial guidance and mentorship.",
  keywords = "finance professionals, business mentorship, financial guidance, investment opportunities, advisory services, startup funding, financial planning, business growth",
  canonicalUrl = "https://yorkville.global",
  ogImage = "/FullLogo_Transparent.png",
  ogType = "website",
  twitterCard = "summary_large_image",
  structuredData = null,
  noIndex = false,
  noFollow = false
}) => {
  const fullTitle = title.includes('Yorkville') ? title : `${title} | Yorkville Advisors`;
  
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Yorkville Advisors BV",
    "description": description,
    "url": "https://yorkville.global",
    "logo": "https://yorkville.global/FullLogo_Transparent.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+31-20-000-0000",
      "contactType": "customer service",
      "email": "hello@yorkville.global",
      "availableLanguage": ["English", "Dutch"]
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
    "numberOfEmployees": "2-10",
    "industry": "Financial Services",
    "serviceArea": {
      "@type": "Place",
      "name": "Global"
    }
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Yorkville Advisors BV" />
      <meta name="robots" content={`${noIndex ? 'noindex' : 'index'},${noFollow ? 'nofollow' : 'follow'}`} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`https://yorkville.global${ogImage}`} />
      <meta property="og:image:alt" content="Yorkville Advisors - Simply Focused" />
      <meta property="og:site_name" content="Yorkville Advisors" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://yorkville.global${ogImage}`} />
      <meta name="twitter:image:alt" content="Yorkville Advisors - Simply Focused" />

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#1e3a8a" />
      <meta name="msapplication-TileColor" content="#1e3a8a" />
      <meta name="application-name" content="Yorkville Advisors" />
      <meta name="apple-mobile-web-app-title" content="Yorkville Advisors" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />

      {/* Geo Meta Tags */}
      <meta name="geo.region" content="NL" />
      <meta name="geo.placename" content="Den Haag" />
      <meta name="geo.position" content="52.0705;4.3007" />
      <meta name="ICBM" content="52.0705, 4.3007" />

      {/* Business Meta Tags */}
      <meta name="rating" content="General" />
      <meta name="distribution" content="Global" />
      <meta name="classification" content="Business" />
      <meta name="coverage" content="Worldwide" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>

      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      
      {/* DNS Prefetch for External Resources */}
      <link rel="dns-prefetch" href="//api.emailjs.com" />
      <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
    </Helmet>
  );
};

export default SEOHead;