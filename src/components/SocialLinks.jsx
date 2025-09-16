import React from 'react';
import { Linkedin, Mail, Globe, ExternalLink } from 'lucide-react';

const SocialLinks = ({ variant = 'default', className = '' }) => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/yorkville-advisors',
      icon: Linkedin,
      color: 'text-blue-600 hover:text-blue-700',
      description: 'Connect with us on LinkedIn'
    },
    {
      name: 'Email',
      url: 'mailto:hello@yorkville.global',
      icon: Mail,
      color: 'text-gray-600 hover:text-gray-700',
      description: 'Send us an email'
    },
    {
      name: 'Website',
      url: 'https://yorkville.global',
      icon: Globe,
      color: 'text-green-600 hover:text-green-700',
      description: 'Visit our website'
    }
  ];

  if (variant === 'footer') {
    return (
      <div className={`flex justify-center space-x-6 ${className}`}>
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.url}
              target={link.name !== 'Email' ? '_blank' : undefined}
              rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
              className="text-blue-100 hover:text-white transition-colors p-2 rounded-lg hover:bg-blue-800"
              aria-label={link.description}
              title={link.description}
            >
              <Icon size={24} />
            </a>
          );
        })}
      </div>
    );
  }

  if (variant === 'header') {
    return (
      <div className={`flex items-center space-x-4 ${className}`}>
        {socialLinks.slice(0, 2).map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.url}
              target={link.name !== 'Email' ? '_blank' : undefined}
              rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
              className={`${link.color} transition-colors p-1 rounded`}
              aria-label={link.description}
              title={link.description}
            >
              <Icon size={18} />
            </a>
          );
        })}
      </div>
    );
  }

  if (variant === 'contact') {
    return (
      <div className={`space-y-4 ${className}`}>
        <h4 className="font-semibold text-gray-900 mb-3">Connect With Us</h4>
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.url}
              target={link.name !== 'Email' ? '_blank' : undefined}
              rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-3 text-gray-600 hover:text-blue-900 transition-colors p-2 rounded-lg hover:bg-gray-50"
            >
              <Icon size={20} className={link.color} />
              <div>
                <span className="font-medium">{link.name}</span>
                <p className="text-sm text-gray-500">{link.description}</p>
              </div>
              <ExternalLink size={14} className="ml-auto text-gray-400" />
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex space-x-4 ${className}`}>
      {socialLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.name}
            href={link.url}
            target={link.name !== 'Email' ? '_blank' : undefined}
            rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
            className={`${link.color} transition-colors p-2 rounded-lg hover:bg-gray-100`}
            aria-label={link.description}
            title={link.description}
          >
            <Icon size={20} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;