import React from 'react';
import { Helmet } from 'react-helmet-async';

const RichSnippets = ({ type, data }) => {
  const generateFAQSchema = (faqs) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  });

  const generateBreadcrumbSchema = (breadcrumbs) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  });

  const generateReviewSchema = (reviews) => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Yorkville Advisors BV",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": reviews.averageRating,
      "reviewCount": reviews.totalReviews,
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviews.reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": review.text,
      "datePublished": review.date
    }))
  });

  const generateHowToSchema = (steps) => ({
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": data.title,
    "description": data.description,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.description,
      "image": step.image
    }))
  });

  const generateEventSchema = (event) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.name,
    "description": event.description,
    "startDate": event.startDate,
    "endDate": event.endDate,
    "location": {
      "@type": "Place",
      "name": event.location.name,
      "address": event.location.address
    },
    "organizer": {
      "@type": "Organization",
      "name": "Yorkville Advisors BV",
      "url": "https://yorkville.global"
    },
    "offers": {
      "@type": "Offer",
      "price": event.price || "0",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    }
  });

  const generateJobPostingSchema = (job) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "datePosted": job.datePosted,
    "validThrough": job.validThrough,
    "employmentType": job.employmentType,
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Yorkville Advisors BV",
      "sameAs": "https://yorkville.global"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Den Haag",
        "addressCountry": "NL"
      }
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "EUR",
      "value": {
        "@type": "QuantitativeValue",
        "minValue": job.salaryMin,
        "maxValue": job.salaryMax,
        "unitText": "YEAR"
      }
    }
  });

  const getSchemaByType = () => {
    switch (type) {
      case 'faq':
        return generateFAQSchema(data);
      case 'breadcrumb':
        return generateBreadcrumbSchema(data);
      case 'review':
        return generateReviewSchema(data);
      case 'howto':
        return generateHowToSchema(data.steps);
      case 'event':
        return generateEventSchema(data);
      case 'job':
        return generateJobPostingSchema(data);
      default:
        return null;
    }
  };

  const schema = getSchemaByType();

  if (!schema) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default RichSnippets;