import { Link } from 'react-router';
import { Plus, Sparkles, Users, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';

interface CTASectionProps {
  language: 'en' | 'ar';
}

export function CTASection({ language }: CTASectionProps) {
  const content = {
    en: {
      title: 'Create Your Event',
      subtitle: 'Join thousands of organizers worldwide',
      description: 'Turn your vision into reality. Our platform makes event creation simple, powerful, and effective.',
      addEvent: 'Add Event',
      features: [
        { icon: Users, text: 'Reach millions of attendees' },
        { icon: TrendingUp, text: 'Grow your audience' },
        { icon: Sparkles, text: 'Professional tools included' },
      ],
    },
    ar: {
      title: 'أنشئ فعاليتك',
      subtitle: 'انضم إلى آلاف المنظمين حول العالم',
      description: 'حول رؤيتك إلى واقع. منصتنا تجعل إنشاء الفعاليات بسيطاً وقوياً وفعالاً.',
      addEvent: 'إضافة فعالية',
      features: [
        { icon: Users, text: 'الوصول إلى ملايين الحضور' },
        { icon: TrendingUp, text: 'نمِّ جمهورك' },
        { icon: Sparkles, text: 'أدوات احترافية مضمنة' },
      ],
    },
  };

  const t = content[language];

  return (
    <section className="px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-purple-600/20 backdrop-blur-xl border border-purple-500/30 shadow-2xl shadow-purple-500/20">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-600/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/30 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 p-12 md:p-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/40 mb-4">
                  <Sparkles className="w-4 h-4 text-purple-300" />
                  <span className="text-sm text-purple-200">{t.subtitle}</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  {t.title}
                </h2>

                <p className="text-lg text-gray-300 mb-6 max-w-xl">
                  {t.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-4 mb-8">
                  {t.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
                    >
                      <feature.icon className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-gray-200">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <Link to="/create-event">
                  <Button
                    size="lg"
                    className="bg-white text-purple-900 hover:bg-gray-100 shadow-xl shadow-purple-500/30 px-8 py-6 text-lg font-semibold"
                  >
                    <Plus className="w-5 h-5" />
                    {t.addEvent}
                  </Button>
                </Link>
              </div>

              {/* Visual Element */}
              <div className="hidden lg:block">
                <div className="relative w-64 h-64">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 opacity-20 blur-2xl animate-pulse"></div>
                  <div className="absolute inset-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                    <Plus className="w-32 h-32 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
