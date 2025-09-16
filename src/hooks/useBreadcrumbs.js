import { useState, useEffect } from 'react';
import { Users, Target, Mail, Shield, FileText } from 'lucide-react';

export const useBreadcrumbs = () => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const updateBreadcrumbs = (newBreadcrumbs) => {
    setBreadcrumbs(newBreadcrumbs);
  };

  // Predefined breadcrumb configurations
  const breadcrumbConfigs = {
    philosophy: [
      { label: 'Our Philosophy', href: '#philosophy', icon: Target }
    ],
    services: [
      { label: 'Services', href: '#services', icon: Users }
    ],
    contact: [
      { label: 'Contact', href: '#contact', icon: Mail }
    ],
    privacy: [
      { label: 'Privacy Policy', href: '#privacy', icon: Shield }
    ],
    terms: [
      { label: 'Terms of Service', href: '#terms', icon: FileText }
    ],
    'business-form': [
      { label: 'Services', href: '#services', icon: Users },
      { label: 'Business Support', href: '#business-form', icon: Users }
    ],
    'finance-form': [
      { label: 'Services', href: '#services', icon: Users },
      { label: 'Finance Professional', href: '#finance-form', icon: Target }
    ]
  };

  const setBreadcrumbsForSection = (section) => {
    const config = breadcrumbConfigs[section];
    if (config) {
      setBreadcrumbs(config);
    } else {
      setBreadcrumbs([]);
    }
  };

  return {
    breadcrumbs,
    updateBreadcrumbs,
    setBreadcrumbsForSection
  };
};