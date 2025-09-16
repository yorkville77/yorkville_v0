import React from 'react';
import { Star, Quote, CheckCircle, Users, TrendingUp, Award } from 'lucide-react';

const SocialProof = () => {
  // Hidden for now - will be enabled when we have real testimonials and data
  const isVisible = false;
  
  if (!isVisible) {
    return null;
  }

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CFO, TechStart Inc.",
      content: "The financial guidance we received was instrumental in our successful Series A funding round. The mentorship program connected us with exactly the right expertise.",
      rating: 5,
      company: "TechStart Inc.",
      industry: "Technology",
      result: "Raised €2.5M Series A"
    },
    {
      name: "Michael Chen",
      role: "Finance Director",
      content: "Being part of the Yorkville network has been incredibly rewarding. I've been able to share my expertise while learning from other professionals.",
      rating: 5,
      company: "Global Finance Corp",
      industry: "Financial Services",
      result: "Advised 12+ startups"
    },
    {
      name: "Emily Rodriguez",
      role: "CEO, GrowthCorp",
      content: "The strategic financial planning support helped us scale from €2M to €15M in revenue. Their community-driven approach is truly unique.",
      rating: 5,
      company: "GrowthCorp",
      industry: "E-commerce",
      result: "650% revenue growth"
    }
  ];

  const stats = [
    {
      number: "150+",
      label: "Finance Professionals",
      description: "Expert advisors in our network",
      icon: Users,
      color: "text-blue-600"
    },
    {
      number: "€50M+",
      label: "Capital Raised",
      description: "By businesses we've supported",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      number: "95%",
      label: "Success Rate",
      description: "Of completed advisory engagements",
      icon: Award,
      color: "text-purple-600"
    },
    {
      number: "25+",
      label: "Countries",
      description: "Where our network operates",
      icon: CheckCircle,
      color: "text-orange-600"
    }
  ];

  const certifications = [
    {
      name: "GDPR Compliant",
      description: "Full compliance with EU data protection regulations",
      badge: "🛡️"
    },
    {
      name: "ISO 27001",
      description: "Information security management certified",
      badge: "🔒"
    },
    {
      name: "SOC 2 Type II",
      description: "Security and availability controls verified",
      badge: "✅"
    },
    {
      name: "Dutch Chamber of Commerce",
      description: "Officially registered business entity",
      badge: "🏛️"
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Statistics */}
        <div className="text-center mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Trusted by Finance Professionals Worldwide
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Our community delivers real results for businesses and meaningful opportunities for finance professionals
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center ${stat.color}`}>
                    <Icon size={32} />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              What Our Community Says
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real stories from finance professionals and business leaders in our network
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Quote className="text-blue-900 mr-2" size={24} />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" size={16} />
                    ))}
                  </div>
                </div>
                
                <blockquote className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                      <div className="text-sm text-gray-500">{testimonial.company}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-blue-900">{testimonial.result}</div>
                      <div className="text-xs text-gray-500">{testimonial.industry}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Trust Badges */}
        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8">
            Security & Compliance Certifications
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="text-3xl mb-3">{cert.badge}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{cert.name}</h4>
                <p className="text-sm text-gray-600">{cert.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            <p>All certifications are regularly audited and maintained to ensure the highest standards of security and compliance.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;