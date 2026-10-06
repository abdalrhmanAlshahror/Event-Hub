import { Sparkles, Calendar, MapPin, Users } from 'lucide-react';
import { Button } from './ui/button';

interface HeroSectionProps {
  language: 'en' | 'ar';
}

export function HeroSection({ language }: HeroSectionProps) {
  const content = {
    en: {
      headline: 'Discover Professional Events',
      subheadline: 'That Transform Your Experience',
      description: 'Connect with thousands of events worldwide. From conferences to concerts, find your next unforgettable experience.',
      startExploring: 'Start Exploring',
      stats: {
        events: 'Active Events',
        cities: 'Cities',
        attendees: 'Attendees',
      },
    },
    ar: {
      headline: 'اكتشف الفعاليات الاحترافية',
      subheadline: 'التي تحول تجربتك',
      description: 'تواصل مع آلاف الفعاليات حول العالم. من المؤتمرات إلى الحفلات الموسيقية، اعثر على تجربتك التالية التي لا تُنسى.',
      startExploring: 'ابدأ الاستكشاف',
      stats: {
        events: 'فعالية نشطة',
        cities: 'مدينة',
        attendees: 'مشارك',
      },
    },
  };

  const t = content[language];

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Futuristic Background Graphics */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Headline */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">
              {language === 'en' ? 'Welcome to EventHub' : 'مرحباً بك في EventHub'}
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {t.headline}
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t.subheadline}
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t.description}
          </p>

          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-2xl shadow-purple-500/50 px-8 py-6 text-lg"
          >
            <Sparkles className="w-5 h-5" />
            {t.startExploring}
          </Button>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">12,500+</div>
              <div className="text-sm text-gray-400">{t.stats.events}</div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">150+</div>
              <div className="text-sm text-gray-400">{t.stats.cities}</div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">2M+</div>
              <div className="text-sm text-gray-400">{t.stats.attendees}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
