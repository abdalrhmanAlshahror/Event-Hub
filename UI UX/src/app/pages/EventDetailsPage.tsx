import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { Calendar, MapPin, Users, Star, Clock, DollarSign, Share2, Heart, ArrowLeft } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface EventDetailsPageProps {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
}

const translations = {
  en: {
    back: 'Back to Events',
    bookTicket: 'Book Ticket',
    share: 'Share',
    save: 'Save',
    description: 'Description',
    organizer: 'Organizer',
    location: 'Location',
    price: 'Price',
    capacity: 'Capacity Remaining',
    ratings: 'Ratings & Reviews',
    relatedEvents: 'Related Events',
    perPerson: 'per person',
    spotsLeft: 'spots left',
    viewProfile: 'View Profile',
  },
  ar: {
    back: 'العودة للفعاليات',
    bookTicket: 'احجز تذكرة',
    share: 'مشاركة',
    save: 'حفظ',
    description: 'الوصف',
    organizer: 'المنظم',
    location: 'الموقع',
    price: 'السعر',
    capacity: 'الأماكن المتبقية',
    ratings: 'التقييمات والمراجعات',
    relatedEvents: 'فعاليات ذات صلة',
    perPerson: 'للشخص',
    spotsLeft: 'مكان متبقي',
    viewProfile: 'عرض الملف الشخصي',
  },
};

const eventData = {
  title: 'Tech Innovation Summit 2026',
  category: 'Technology',
  date: 'June 15, 2026',
  time: '9:00 AM - 6:00 PM',
  image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200',
  description: 'Join us for the biggest technology summit of the year! Featuring keynote speakers from leading tech companies, hands-on workshops, networking opportunities, and the latest innovations in AI, blockchain, and cloud computing. This full-day event will bring together industry leaders, innovators, and tech enthusiasts from around the world.',
  organizer: {
    name: 'TechEvents Global',
    logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100',
    events: 47,
    rating: 4.9,
  },
  location: 'Dubai World Trade Centre, UAE',
  price: 299,
  capacity: 156,
  rating: 4.8,
  reviews: 234,
};

const reviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    rating: 5,
    comment: 'Amazing event! The speakers were top-notch and I learned so much. Highly recommend!',
    date: '2 days ago',
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    rating: 4,
    comment: 'Great networking opportunities and well-organized. Looking forward to next year!',
    date: '5 days ago',
  },
  {
    id: 3,
    name: 'Emma Davis',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    rating: 5,
    comment: 'Exceeded my expectations. The workshops were hands-on and practical.',
    date: '1 week ago',
  },
];

const relatedEvents = [
  {
    id: 1,
    title: 'AI & Machine Learning Workshop',
    image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=400',
    date: 'July 5, 2026',
    price: 149,
    rating: 4.7,
  },
  {
    id: 2,
    title: 'Startup Pitch Competition',
    image: 'https://images.unsplash.com/photo-1559223607-a43c990c7a1a?w=400',
    date: 'July 12, 2026',
    price: 99,
    rating: 4.6,
  },
  {
    id: 3,
    title: 'Cloud Computing Conference',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
    date: 'July 20, 2026',
    price: 249,
    rating: 4.9,
  },
];

export function EventDetailsPage({ language, setLanguage }: EventDetailsPageProps) {
  const t = translations[language];
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div>
      <Header language={language} setLanguage={setLanguage} />

      {/* Hero Banner */}
      <div className="relative h-[500px]">
        <img
          src={eventData.image}
          alt={eventData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 pb-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft size={20} />
              {t.back}
            </Link>

            <div className="bg-[#0f0f1e]/70 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  {eventData.category}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-400 fill-yellow-400" size={18} />
                  <span className="text-white">{eventData.rating}</span>
                  <span className="text-gray-400 text-sm">({eventData.reviews} reviews)</span>
                </div>
              </div>

              <h1 className="text-4xl text-white mb-4">{eventData.title}</h1>

              <div className="flex flex-wrap gap-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar size={20} className="text-purple-400" />
                  <span>{eventData.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-blue-400" />
                  <span>{eventData.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-red-400" />
                  <span>{eventData.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-[#0f0f1e]/50 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-8">
              <h2 className="text-2xl text-white mb-4">{t.description}</h2>
              <p className="text-gray-300 leading-relaxed">{eventData.description}</p>
            </div>

            {/* Organizer */}
            <div className="bg-[#0f0f1e]/50 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-8">
              <h2 className="text-2xl text-white mb-6">{t.organizer}</h2>
              <div className="flex items-center gap-4">
                <img
                  src={eventData.organizer.logo}
                  alt={eventData.organizer.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl text-white">{eventData.organizer.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                    <span>{eventData.organizer.events} events</span>
                    <span className="flex items-center gap-1">
                      <Star className="text-yellow-400 fill-yellow-400" size={14} />
                      {eventData.organizer.rating}
                    </span>
                  </div>
                </div>
                <button className="px-6 py-2 bg-purple-500/20 text-purple-300 rounded-xl hover:bg-purple-500/30 transition-colors">
                  {t.viewProfile}
                </button>
              </div>
            </div>

            {/* Location Map Placeholder */}
            <div className="bg-[#0f0f1e]/50 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-8">
              <h2 className="text-2xl text-white mb-6">{t.location}</h2>
              <div className="bg-[#1a1a2e] rounded-xl h-64 flex items-center justify-center">
                <MapPin className="text-purple-400" size={48} />
              </div>
              <p className="text-gray-300 mt-4">{eventData.location}</p>
            </div>

            {/* Ratings & Reviews */}
            <div className="bg-[#0f0f1e]/50 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-8">
              <h2 className="text-2xl text-white mb-6">{t.ratings}</h2>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-purple-500/10 last:border-0">
                    <div className="flex items-start gap-4">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white">{review.name}</h4>
                          <span className="text-sm text-gray-400">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                            />
                          ))}
                        </div>
                        <p className="text-gray-300">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-[#0f0f1e]/50 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-6">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl text-white">${eventData.price}</span>
                  <span className="text-gray-400">{t.perPerson}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Users size={16} className="text-purple-400" />
                  <span>{eventData.capacity} {t.spotsLeft}</span>
                </div>
              </div>

              <button className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all mb-4">
                {t.bookTicket}
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-3 bg-white/5 text-gray-300 rounded-xl hover:bg-white/10 transition-colors">
                  <Share2 size={18} />
                  {t.share}
                </button>
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl transition-colors ${
                    isSaved
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <Heart size={18} className={isSaved ? 'fill-current' : ''} />
                  {t.save}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Events */}
        <div className="mt-16">
          <h2 className="text-3xl text-white mb-8">{t.relatedEvents}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedEvents.map((event) => (
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
                </div>
                <div className="p-6">
                  <h3 className="text-lg text-white mb-2">{event.title}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{event.date}</span>
                    <div className="flex items-center gap-2">
                      <Star className="text-yellow-400 fill-yellow-400" size={14} />
                      <span className="text-white">{event.rating}</span>
                    </div>
                  </div>
                  <div className="mt-4 text-purple-400">${event.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer language={language} />
    </div>
  );
}
