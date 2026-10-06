import { Link } from 'react-router';
import { Calendar, MapPin, Star } from 'lucide-react';
import { Card } from './ui/card';

interface FeaturedEventsProps {
  language: 'en' | 'ar';
}

interface Event {
  id: number;
  image: string;
  title: { en: string; ar: string };
  date: string;
  location: { en: string; ar: string };
  rating: number;
  category: string;
}

export function FeaturedEvents({ language }: FeaturedEventsProps) {
  const content = {
    en: {
      title: 'Featured Events',
      subtitle: 'Discover the most popular events happening around you',
    },
    ar: {
      title: 'الفعاليات المميزة',
      subtitle: 'اكتشف أشهر الفعاليات التي تحدث من حولك',
    },
  };

  const events: Event[] = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1769798643237-8642a3fbe5bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwZXZlbnQlMjBwcm9mZXNzaW9uYWwlMjBhdWRpZW5jZXxlbnwxfHx8fDE3NzgxNTI2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: {
        en: 'Global Tech Summit 2026',
        ar: 'قمة التقنية العالمية 2026',
      },
      date: 'May 15-17, 2026',
      location: {
        en: 'San Francisco, CA',
        ar: 'سان فرانسيسكو، كاليفورنيا',
      },
      rating: 4.9,
      category: 'Conference',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1672841821756-fc04525771c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGZlc3RpdmFsJTIwY29uY2VydCUyMGNyb3dkfGVufDF8fHx8MTc3ODE1MjY4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      title: {
        en: 'Summer Music Festival',
        ar: 'مهرجان الموسيقى الصيفي',
      },
      date: 'June 10, 2026',
      location: {
        en: 'Los Angeles, CA',
        ar: 'لوس أنجلوس، كاليفورنيا',
      },
      rating: 5.0,
      category: 'Concert',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1675716921224-e087a0cca69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG5ldHdvcmtpbmclMjBldmVudHxlbnwxfHx8fDE3NzgxMjU0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: {
        en: 'Business Networking Night',
        ar: 'ليلة التواصل التجاري',
      },
      date: 'May 20, 2026',
      location: {
        en: 'New York, NY',
        ar: 'نيويورك، نيويورك',
      },
      rating: 4.8,
      category: 'Networking',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1733222814745-f8463360d12c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwd29ya3Nob3AlMjBwcmVzZW50YXRpb258ZW58MXx8fHwxNzc4MTUyNjg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: {
        en: 'AI & Machine Learning Workshop',
        ar: 'ورشة عمل الذكاء الاصطناعي',
      },
      date: 'May 25, 2026',
      location: {
        en: 'Seattle, WA',
        ar: 'سياتل، واشنطن',
      },
      rating: 4.7,
      category: 'Workshop',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1742497360136-3c7f3110bc26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBleGhpYml0aW9uJTIwZ2FsbGVyeSUyMG9wZW5pbmd8ZW58MXx8fHwxNzc4MDkzNjAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: {
        en: 'Contemporary Art Exhibition',
        ar: 'معرض الفن المعاصر',
      },
      date: 'June 1-15, 2026',
      location: {
        en: 'Miami, FL',
        ar: 'ميامي، فلوريدا',
      },
      rating: 4.6,
      category: 'Exhibition',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1770129768815-29a98e02d4f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzdGFkaXVtJTIwZXZlbnQlMjBjcm93ZHxlbnwxfHx8fDE3NzgxNTI2ODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: {
        en: 'Championship Finals 2026',
        ar: 'نهائيات البطولة 2026',
      },
      date: 'June 5, 2026',
      location: {
        en: 'Chicago, IL',
        ar: 'شيكاغو، إلينوي',
      },
      rating: 4.9,
      category: 'Sports',
    },
  ];

  const t = content[language];

  return (
    <section className="px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-xl text-gray-400">{t.subtitle}</p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link key={event.id} to={`/event/${event.id}`}>
              <Card
                className="group overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2"
              >
              {/* Event Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title[language]}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-purple-500/90 backdrop-blur-sm text-xs font-semibold text-white">
                    {event.category}
                  </span>
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-semibold text-white">{event.rating}</span>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-purple-400 transition-colors">
                  {event.title[language]}
                </h3>

                <div className="space-y-2">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">{event.date}</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">{event.location[language]}</span>
                  </div>

                  {/* 5-Star Rating System */}
                  <div className="flex items-center gap-1 pt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.round(event.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-2">
                      ({event.rating}/5.0)
                    </span>
                  </div>
                </div>
              </div>
            </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
