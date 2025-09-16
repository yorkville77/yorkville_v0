import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = ({ items = [] }) => {
  // Default breadcrumb for homepage
  const defaultItems = [
    { label: 'Home', href: '#hero', icon: Home }
  ];

  const breadcrumbItems = items.length > 0 ? [...defaultItems, ...items] : defaultItems;

  if (breadcrumbItems.length <= 1) {
    return null; // Don't show breadcrumbs if only home
  }

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-200 py-2">
      <div className="container mx-auto px-4 sm:px-6">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            const Icon = item.icon;
            
            return (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <ChevronRight size={16} className="text-gray-400 mx-2" />
                )}
                {isLast ? (
                  <span className="flex items-center gap-1 text-gray-900 font-medium" aria-current="page">
                    {Icon && <Icon size={16} />}
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href}
                    className="flex items-center gap-1 text-gray-600 hover:text-blue-900 transition-colors"
                  >
                    {Icon && <Icon size={16} />}
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;