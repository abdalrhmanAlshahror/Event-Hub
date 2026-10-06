import { useState } from 'react';
import { Link } from 'react-router';
import { Search, SlidersHorizontal, X, Star, DollarSign, Calendar, MapPin, User, Sparkles } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface ExplorePageProps {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
}

const translations = {
  en: {
    startExploring: 'Start Exploring',
    searchPlaceholder: 'Search for events, venues, or topics...',
    filters: 'Filters',
    priceRange: 'Price Range',
    dateRange: 'Date Range',
    rating: 'Rating',
    today: 'Today',
    thisWeek: 'This Week',
    nextMonth: 'Next Month',
    starsUp: '4 Stars & Up',
    free: 'Free',
    quickBook: 'Quick Book',
    organizer: 'Organizer',
    categories: {
      technology: 'Technology',
      design: 'Design',
      business: 'Business',
      music: 'Music',
      art: 'Art & Culture',
      sports: 'Sports',
    },
  },
  ar: {
    startExploring: 'ابدأ الاستكشاف',
    searchPlaceholder: 'ابحث عن الفعاليات أو الأماكن أو المواضيع...',
    filters: 'المرشحات',
    priceRange: 'نطاق السعر',
    dateRange: 'نطاق التاريخ',
    rating: 'التقييم',
    today: 'اليوم',
    thisWeek: 'هذا الأسبوع',
    nextMonth: 'الشهر القادم',
    starsUp: '4 نجوم وأكثر',
    free: 'مجاني',
    quickBook: 'حجز سريع',
    organizer: 'المنظم',
    categories: {
      technology: 'التكنولوجيا',
      design: 'التصميم',
      business: 'الأعمال',
      music: 'الموسيقى',
      art: 'الفن والثقافة',
      sports: 'الرياضة',
    },
  },
};

const categoryFilters = [
  { id: 'technology', icon: '💻' },
  { id: 'design', icon: '🎨' },
  { id: 'business', icon: '💼' },
  { id: 'music', icon: '🎵' },
  { id: 'art', icon: '🎭' },
  { id: 'sports', icon: '⚽' },
];

const events = [
  {
    id: 1,
    title: 'Tech Innovation Summit 2026',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600',
    organizer: 'TechEvents Global',
    organizerAvatar: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100',
    price: 299,
    rating: 4.8,
    reviews: 234,
    date: 'June 15, 2026',
    location: 'Dubai, UAE',
    category: 'technology',
  },
  {
    id: 2,
    title: 'UX/UI Design Workshop',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600',
    organizer: 'Design Academy',
    organizerAvatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100',
    price: 149,
    rating: 4.9,
    reviews: 567,
    date: 'June 20, 2026',
    location: 'Abu Dhabi, UAE',
    category: 'design',
  },
  {
    id: 3,
    title: 'Business Leadership Summit',
    image: 'https://images.unsplash.com/photo-1559223607-a43c990c7a1a?w=600',
    organizer: 'Business Leaders Inc',
    organizerAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100',
    price: 349,
    rating: 4.7,
    reviews: 423,
    date: 'June 25, 2026',
    location: 'Dubai, UAE',
    category: 'business',
  },
  {
    id: 4,
    title: 'Summer Music Festival',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600',
    organizer: 'Music Events Pro',
    organizerAvatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100',
    price: 0,
    rating: 5.0,
    reviews: 892,
    date: 'July 10, 2026',
    location: 'Abu Dhabi, UAE',
    category: 'music',
  },
  {
    id: 5,
    title: 'Contemporary Art Exhibition',
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600',
    organizer: 'Art Gallery Dubai',
    organizerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100',
    price: 49,
    rating: 4.6,
    reviews: 198,
    date: 'July 15, 2026',
    location: 'Sharjah, UAE',
    category: 'art',
  },
  {
    id: 6,
    title: 'Marathon Championship',
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=600',
    organizer: 'Sports Federation',
    organizerAvatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100',
    price: 89,
    rating: 4.8,
    reviews: 1234,
    date: 'August 5, 2026',
    location: 'Dubai, UAE',
    category: 'sports',
  },
  {
    id: 7,
    title: 'AI & Machine Learning Conference',
    image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=600',
    organizer: 'AI Research Lab',
    organizerAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100',
    price: 399,
    rating: 4.9,
    reviews: 645,
    date: 'August 12, 2026',
    location: 'Dubai, UAE',
    category: 'technology',
  },
  {
    id: 8,
    title: 'Jazz Night Live',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600',
    organizer: 'Jazz Society',
    organizerAvatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100',
    price: 75,
    rating: 4.7,
    reviews: 321,
    date: 'August 20, 2026',
    location: 'Abu Dhabi, UAE',
    category: 'music',
  },
];

export function ExplorePage({ language, setLanguage }: ExplorePageProps) {
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(true);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [selectedDateRange, setSelectedDateRange] = useState<string | null>(null);
  const [ratingFilter, setRatingFilter] = useState(false);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredEvents = events.filter((event) => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(event.category)) {
      return false;
    }
    if (event.price < priceRange.min || event.price > priceRange.max) {
      return false;
    }
    if (ratingFilter && event.rating < 4) {
      return false;
    }
    return true;
  });

  return (
    <div className="relative min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <Header language={language} setLanguage={setLanguage} />

      <div className="container mx-auto px-6 py-24">
        {/* Top Section - Search */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent animate-gradient">
            {t.startExploring}
          </h1>
          <p className="text-xl text-gray-400 mb-8">Discover amazing events tailored just for you</p>

          {/* Search Block */}
          <div className="max-w-4xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-purple-400 z-10" size={24} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-[#1a1a2e]/90 backdrop-blur-2xl border-2 border-purple-500/30 rounded-2xl pl-16 pr-24 py-7 text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all shadow-lg shadow-purple-500/5 group-hover:shadow-purple-500/10"
              />
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="absolute right-4 top-1/2 -translate-y-1/2 px-5 py-3 bg-gradient-to-r from-purple-500/30 to-blue-500/30 backdrop-blur-xl text-purple-200 rounded-xl hover:from-purple-500/40 hover:to-blue-500/40 transition-all flex items-center gap-2 border border-purple-500/30 shadow-lg shadow-purple-500/20"
              >
                <SlidersHorizontal size={18} />
                <span className="hidden sm:inline font-medium">{t.filters}</span>
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              {categoryFilters.map((category) => (
                <button
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={`group px-7 py-4 rounded-2xl backdrop-blur-xl border-2 transition-all transform hover:scale-105 ${
                    selectedCategories.includes(category.id)
                      ? 'bg-gradient-to-r from-purple-500/40 to-blue-500/40 border-purple-400/60 text-white shadow-xl shadow-purple-500/30 scale-105'
                      : 'bg-[#1a1a2e]/60 border-purple-500/20 text-gray-300 hover:bg-[#1a1a2e]/80 hover:border-purple-400/40 hover:shadow-lg'
                  }`}
                >
                  <span className="text-2xl mr-3">{category.icon}</span>
                  <span className="font-medium">{t.categories[category.id as keyof typeof t.categories]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Advanced Filters Sidebar */}
          {showFilters && (
            <aside className="w-80 shrink-0 animate-in slide-in-from-left duration-300">
              <div className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#0f0f1e]/80 backdrop-blur-2xl border-2 border-purple-500/20 rounded-3xl p-7 sticky top-24 shadow-2xl shadow-purple-500/10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl text-white font-semibold mb-1">{t.filters}</h3>
                    <p className="text-sm text-gray-400">Refine your search</p>
                  </div>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2.5 hover:bg-white/10 rounded-xl transition-colors group"
                  >
                    <X size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                  </button>
                </div>

                {/* Price Range Slider */}
                <div className="mb-10">
                  <h4 className="text-white text-lg font-medium mb-5 flex items-center gap-2">
                    <DollarSign size={18} className="text-purple-400" />
                    {t.priceRange}
                  </h4>
                  <div className="space-y-5">
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="500"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                        className="w-full h-3 bg-gradient-to-r from-gray-700 to-purple-500/30 rounded-full appearance-none cursor-pointer slider-thumb"
                        style={{
                          background: `linear-gradient(to right, rgb(147 51 234 / 0.3) 0%, rgb(147 51 234 / 0.3) ${(priceRange.max / 500) * 100}%, rgb(55 65 81) ${(priceRange.max / 500) * 100}%, rgb(55 65 81) 100%)`
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="px-4 py-2 bg-[#0f0f1e]/80 rounded-xl border border-purple-500/30">
                        <span className="text-xs text-gray-400">Min</span>
                        <p className="text-white font-semibold">${priceRange.min}</p>
                      </div>
                      <div className="text-gray-500">—</div>
                      <div className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-400/40">
                        <span className="text-xs text-purple-300">Max</span>
                        <p className="text-white font-semibold">${priceRange.max}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date Range */}
                <div className="mb-10">
                  <h4 className="text-white text-lg font-medium mb-5 flex items-center gap-2">
                    <Calendar size={18} className="text-blue-400" />
                    {t.dateRange}
                  </h4>
                  <div className="space-y-3">
                    {['today', 'thisWeek', 'nextMonth'].map((range) => (
                      <button
                        key={range}
                        onClick={() => setSelectedDateRange(range)}
                        className={`w-full px-5 py-4 rounded-xl text-left transition-all font-medium ${
                          selectedDateRange === range
                            ? 'bg-gradient-to-r from-purple-500/30 to-blue-500/30 text-white border-2 border-purple-400/50 shadow-lg shadow-purple-500/20'
                            : 'bg-[#0f0f1e]/60 text-gray-400 hover:bg-[#0f0f1e]/80 border-2 border-transparent hover:border-purple-500/20'
                        }`}
                      >
                        <Calendar size={16} className={`inline mr-3 ${selectedDateRange === range ? 'text-purple-300' : 'text-gray-500'}`} />
                        {t[range as keyof typeof t]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h4 className="text-white text-lg font-medium mb-5 flex items-center gap-2">
                    <Star className="text-yellow-400 fill-yellow-400" size={18} />
                    {t.rating}
                  </h4>
                  <label className="flex items-center gap-4 cursor-pointer p-5 bg-gradient-to-br from-[#0f0f1e]/70 to-[#0f0f1e]/50 rounded-xl border-2 border-purple-500/20 hover:border-yellow-500/40 transition-all group">
                    <input
                      type="checkbox"
                      checked={ratingFilter}
                      onChange={(e) => setRatingFilter(e.target.checked)}
                      className="w-6 h-6 rounded-lg border-2 border-purple-500/40 bg-[#1a1a2e] checked:bg-gradient-to-r checked:from-purple-500 checked:to-blue-500 focus:ring-2 focus:ring-purple-500/50 transition-all cursor-pointer"
                    />
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                          />
                        ))}
                      </div>
                      <span className="text-white font-medium group-hover:text-purple-200 transition-colors">{t.starsUp}</span>
                    </div>
                  </label>
                </div>
              </div>
            </aside>
          )}

          {/* Main Content Grid */}
          <div className="flex-1">
            <div className={`grid gap-7 ${showFilters ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
              {filteredEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="group bg-gradient-to-br from-[#1a1a2e]/70 to-[#0f0f1e]/70 backdrop-blur-2xl border-2 border-purple-500/20 rounded-3xl overflow-hidden hover:border-purple-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] relative animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Event Poster */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className={`px-4 py-2 rounded-xl text-sm font-semibold backdrop-blur-xl shadow-lg ${
                        event.price === 0
                          ? 'bg-gradient-to-r from-green-500/40 to-emerald-500/40 text-green-100 border-2 border-green-400/50'
                          : 'bg-gradient-to-r from-purple-500/40 to-blue-500/40 text-purple-100 border-2 border-purple-400/50'
                      }`}>
                        {event.price === 0 ? t.free : `$${event.price}`}
                      </span>
                    </div>

                    {/* Quick Book on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/60 backdrop-blur-sm">
                      <Link to={`/event/${event.id}`}>
                        <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg font-semibold rounded-2xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-110 flex items-center gap-3 border-2 border-white/20">
                          <Sparkles size={22} className="animate-pulse" />
                          {t.quickBook}
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-6">
                    <Link to={`/event/${event.id}`}>
                      <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors leading-tight">
                        {event.title}
                      </h3>
                    </Link>

                    {/* Organizer */}
                    <div className="flex items-center gap-3 mb-4 p-2.5 bg-[#0f0f1e]/50 rounded-xl border border-purple-500/10">
                      <img
                        src={event.organizerAvatar}
                        alt={event.organizer}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-500/30"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 mb-0.5">Hosted by</p>
                        <p className="text-sm text-gray-300 font-medium truncate">{event.organizer}</p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-3 mb-4 p-2.5 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`transition-all ${i < Math.round(event.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-yellow-100">
                        {event.rating}
                      </span>
                      <span className="text-xs text-gray-400">
                        ({event.reviews} reviews)
                      </span>
                    </div>

                    {/* Date & Location */}
                    <div className="space-y-2.5 pt-3 border-t border-purple-500/10">
                      <div className="flex items-center gap-3 text-sm text-gray-400 hover:text-purple-300 transition-colors">
                        <Calendar size={16} className="text-purple-400 shrink-0" />
                        <span className="font-medium">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-400 hover:text-purple-300 transition-colors">
                        <MapPin size={16} className="text-red-400 shrink-0" />
                        <span className="font-medium truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredEvents.length === 0 && (
              <div className="text-center py-32">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl mb-8 border-2 border-purple-500/30 backdrop-blur-xl">
                  <Search className="text-purple-400" size={56} />
                </div>
                <h3 className="text-4xl text-white mb-4 font-bold">No events found</h3>
                <p className="text-xl text-gray-400 mb-8">Try adjusting your filters or search query</p>
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange({ min: 0, max: 500 });
                    setSelectedDateRange(null);
                    setRatingFilter(false);
                    setSearchQuery('');
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all font-semibold"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer language={language} />
    </div>
  );
}
