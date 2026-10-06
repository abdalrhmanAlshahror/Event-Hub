import { useState } from 'react';
import { Link } from 'react-router';
import { Search, SlidersHorizontal, Star, MapPin, Calendar, DollarSign, X } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface SearchResultsPageProps {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
}

const translations = {
  en: {
    searchPlaceholder: 'Search events...',
    filters: 'Filters',
    categories: 'Categories',
    priceRange: 'Price Range',
    rating: 'Rating',
    minPrice: 'Min',
    maxPrice: 'Max',
    clearFilters: 'Clear All',
    results: 'results found',
    quickView: 'Quick View',
    noResults: 'No events found',
    tryDifferent: 'Try adjusting your search or filters',
    technology: 'Technology',
    music: 'Music',
    art: 'Art & Culture',
    food: 'Food & Drink',
    sports: 'Sports',
    business: 'Business',
    starsUp: 'stars & up',
  },
  ar: {
    searchPlaceholder: 'ابحث عن الفعاليات...',
    filters: 'المرشحات',
    categories: 'الفئات',
    priceRange: 'نطاق السعر',
    rating: 'التقييم',
    minPrice: 'الحد الأدنى',
    maxPrice: 'الحد الأقصى',
    clearFilters: 'مسح الكل',
    results: 'نتيجة',
    quickView: 'عرض سريع',
    noResults: 'لم يتم العثور على فعاليات',
    tryDifferent: 'جرب تعديل البحث أو المرشحات',
    technology: 'التكنولوجيا',
    music: 'الموسيقى',
    art: 'الفن والثقافة',
    food: 'الطعام والشراب',
    sports: 'الرياضة',
    business: 'الأعمال',
    starsUp: 'نجوم وأكثر',
  },
};

const searchResults = [
  {
    id: 1,
    title: 'Tech Innovation Summit 2026',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
    category: 'Technology',
    date: 'June 15, 2026',
    location: 'Dubai, UAE',
    price: 299,
    rating: 4.8,
    reviews: 234,
  },
  {
    id: 2,
    title: 'Summer Music Festival',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400',
    category: 'Music',
    date: 'July 20, 2026',
    location: 'Abu Dhabi, UAE',
    price: 149,
    rating: 4.9,
    reviews: 567,
  },
  {
    id: 3,
    title: 'Contemporary Art Exhibition',
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400',
    category: 'Art & Culture',
    date: 'August 5, 2026',
    location: 'Sharjah, UAE',
    price: 49,
    rating: 4.7,
    reviews: 123,
  },
  {
    id: 4,
    title: 'Food & Wine Expo',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
    category: 'Food & Drink',
    date: 'September 10, 2026',
    location: 'Dubai, UAE',
    price: 199,
    rating: 4.6,
    reviews: 345,
  },
  {
    id: 5,
    title: 'Marathon Championship',
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=400',
    category: 'Sports',
    date: 'October 1, 2026',
    location: 'Abu Dhabi, UAE',
    price: 89,
    rating: 4.8,
    reviews: 789,
  },
  {
    id: 6,
    title: 'Business Leadership Conference',
    image: 'https://images.unsplash.com/photo-1559223607-a43c990c7a1a?w=400',
    category: 'Business',
    date: 'November 15, 2026',
    location: 'Dubai, UAE',
    price: 349,
    rating: 4.9,
    reviews: 456,
  },
];

export function SearchResultsPage({ language, setLanguage }: SearchResultsPageProps) {
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [minRating, setMinRating] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(true);

  const categories = [
    { id: 'technology', label: t.technology },
    { id: 'music', label: t.music },
    { id: 'art', label: t.art },
    { id: 'food', label: t.food },
    { id: 'sports', label: t.sports },
    { id: 'business', label: t.business },
  ];

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: '', max: '' });
    setMinRating(null);
  };

  const hasActiveFilters = selectedCategories.length > 0 || priceRange.min || priceRange.max || minRating;

  return (
    <div>
      <Header language={language} setLanguage={setLanguage} />

      <div className="container mx-auto px-6 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-3xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-purple-400" size={24} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-[#0f0f1e]/80 backdrop-blur-xl border border-purple-500/20 rounded-2xl pl-16 pr-6 py-5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-300 rounded-xl hover:bg-purple-500/30 transition-colors"
            >
              <SlidersHorizontal size={18} />
              <span className="hidden sm:inline">{t.filters}</span>
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filter Sidebar */}
          {showFilters && (
            <aside className="w-80 shrink-0">
              <div className="bg-[#0f0f1e]/50 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-6 sticky top-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl text-white">{t.filters}</h2>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      {t.clearFilters}
                    </button>
                  )}
                </div>

                {/* Categories */}
                <div className="mb-8">
                  <h3 className="text-white mb-4">{t.categories}</h3>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <label
                        key={category.id}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => toggleCategory(category.id)}
                          className="w-5 h-5 rounded border-purple-500/30 bg-[#1a1a2e] checked:bg-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-colors"
                        />
                        <span className="text-gray-300 group-hover:text-white transition-colors">
                          {category.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-8">
                  <h3 className="text-white mb-4">{t.priceRange}</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <input
                        type="number"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                        placeholder={t.minPrice}
                        className="w-full bg-[#1a1a2e] border border-purple-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                        min="0"
                      />
                    </div>
                    <span className="text-gray-400">-</span>
                    <div className="flex-1">
                      <input
                        type="number"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                        placeholder={t.maxPrice}
                        className="w-full bg-[#1a1a2e] border border-purple-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h3 className="text-white mb-4">{t.rating}</h3>
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <label
                        key={rating}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="rating"
                          checked={minRating === rating}
                          onChange={() => setMinRating(rating)}
                          className="w-5 h-5 border-purple-500/30 bg-[#1a1a2e] checked:bg-purple-500 focus:ring-2 focus:ring-purple-500/50"
                        />
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                            {rating} {t.starsUp}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Results Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl text-white">
                {searchResults.length} {t.results}
              </h2>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((event) => (
                  <Link
                    key={event.id}
                    to={`/event/${event.id}`}
                    className="bg-[#0f0f1e]/50 backdrop-blur-xl border border-purple-500/10 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 px-3 py-1 bg-purple-500/20 backdrop-blur-md text-purple-300 rounded-full text-xs">
                        {event.category}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg text-white mb-3">{event.title}</h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar size={14} className="text-purple-400" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <MapPin size={14} className="text-red-400" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-purple-500/10">
                        <div className="flex items-center gap-2">
                          <Star className="text-yellow-400 fill-yellow-400" size={14} />
                          <span className="text-white">{event.rating}</span>
                          <span className="text-sm text-gray-400">({event.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-purple-400">
                          <DollarSign size={16} />
                          <span>{event.price}</span>
                        </div>
                      </div>

                      <button className="w-full mt-4 py-2 bg-purple-500/20 text-purple-300 rounded-xl hover:bg-purple-500/30 transition-colors">
                        {t.quickView}
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-500/10 rounded-full mb-6">
                  <Search className="text-purple-400" size={32} />
                </div>
                <h3 className="text-2xl text-white mb-2">{t.noResults}</h3>
                <p className="text-gray-400">{t.tryDifferent}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer language={language} />
    </div>
  );
}
