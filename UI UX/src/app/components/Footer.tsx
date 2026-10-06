import { Link } from 'react-router';
import { Sparkles, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  language: 'en' | 'ar';
}

export function Footer({ language }: FooterProps) {
  const content = {
    en: {
      about: 'About EventHub',
      aboutText: 'Connecting people with unforgettable experiences since 2020. Your trusted platform for discovering and creating events.',
      quickLinks: 'Quick Links',
      links: {
        about: 'About Us',
        events: 'Browse Events',
        create: 'Create Event',
        pricing: 'Pricing',
        blog: 'Blog',
        careers: 'Careers',
      },
      contact: 'Contact Us',
      contactInfo: {
        email: 'hello@eventhub.com',
        phone: '+1 (555) 123-4567',
        address: '123 Event Street, San Francisco, CA 94102',
      },
      followUs: 'Follow Us',
      copyright: '© 2026 EventHub. All rights reserved.',
      legal: {
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        cookies: 'Cookie Policy',
      },
    },
    ar: {
      about: 'عن EventHub',
      aboutText: 'نربط الناس بتجارب لا تُنسى منذ عام 2020. منصتك الموثوقة لاكتشاف وإنشاء الفعاليات.',
      quickLinks: 'روابط سريعة',
      links: {
        about: 'من نحن',
        events: 'تصفح الفعاليات',
        create: 'إنشاء فعالية',
        pricing: 'الأسعار',
        blog: 'المدونة',
        careers: 'الوظائف',
      },
      contact: 'تواصل معنا',
      contactInfo: {
        email: 'hello@eventhub.com',
        phone: '+1 (555) 123-4567',
        address: '123 Event Street, San Francisco, CA 94102',
      },
      followUs: 'تابعنا',
      copyright: '© 2026 EventHub. جميع الحقوق محفوظة.',
      legal: {
        privacy: 'سياسة الخصوصية',
        terms: 'شروط الخدمة',
        cookies: 'سياسة ملفات تعريف الارتباط',
      },
    },
  };

  const t = content[language];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative mt-20 border-t border-white/10 bg-black/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                EventHub
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t.aboutText}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t.quickLinks}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  {t.links.about}
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  {t.links.events}
                </Link>
              </li>
              <li>
                <Link to="/create-event" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  {t.links.create}
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  {t.links.pricing}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  {t.links.blog}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  {t.links.careers}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t.contact}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <Mail className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <span>{t.contactInfo.email}</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>{t.contactInfo.phone}</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>{t.contactInfo.address}</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t.followUs}</h3>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-purple-600 border border-white/20 hover:border-purple-500 flex items-center justify-center transition-all duration-300 group"
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">{t.copyright}</p>
            
            <div className="flex gap-6">
              <a href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                {t.legal.privacy}
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                {t.legal.terms}
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                {t.legal.cookies}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>
    </footer>
  );
}
