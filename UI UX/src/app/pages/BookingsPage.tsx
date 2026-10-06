import { useState } from 'react';
import { Search, Download, QrCode, MapPin, Calendar, Clock, ChevronRight } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface BookingsPageProps {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
}

const translations = {
  en: {
    myBookings: 'My Bookings',
    searchPlaceholder: 'Search by event name...',
    bookingId: 'Booking ID',
    downloadPdf: 'Download PDF',
    pastBookings: 'Past Bookings',
    viewDetails: 'View Details',
    upcoming: 'Upcoming',
    past: 'Past',
  },
  ar: {
    myBookings: 'حجوزاتي',
    searchPlaceholder: 'ابحث باسم الفعالية...',
    bookingId: 'رقم الحجز',
    downloadPdf: 'تحميل PDF',
    pastBookings: 'الحجوزات السابقة',
    viewDetails: 'عرض التفاصيل',
    upcoming: 'القادمة',
    past: 'السابقة',
  },
};

const upcomingBookings = [
  {
    id: 1,
    bookingId: 'EVH-2026-001234',
    eventTitle: 'Tech Innovation Summit 2026',
    date: 'June 15, 2026',
    time: '9:00 AM - 6:00 PM',
    venue: 'Dubai World Trade Centre',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
  },
  {
    id: 2,
    bookingId: 'EVH-2026-001567',
    eventTitle: 'Summer Music Festival',
    date: 'July 20, 2026',
    time: '5:00 PM - 11:00 PM',
    venue: 'Etihad Arena, Abu Dhabi',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400',
  },
  {
    id: 3,
    bookingId: 'EVH-2026-001890',
    eventTitle: 'Business Leadership Conference',
    date: 'June 25, 2026',
    time: '10:00 AM - 4:00 PM',
    venue: 'Jumeirah Beach Hotel, Dubai',
    image: 'https://images.unsplash.com/photo-1559223607-a43c990c7a1a?w=400',
  },
];

const pastBookings = [
  {
    id: 4,
    bookingId: 'EVH-2026-000456',
    eventTitle: 'Marathon Championship',
    date: 'March 15, 2026',
    time: '6:00 AM - 12:00 PM',
    venue: 'Sheikh Zayed Road, Dubai',
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=400',
  },
  {
    id: 5,
    bookingId: 'EVH-2026-000789',
    eventTitle: 'Food & Wine Expo',
    date: 'April 10, 2026',
    time: '2:00 PM - 8:00 PM',
    venue: 'ADNEC, Abu Dhabi',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
  },
];

export function BookingsPage({ language, setLanguage }: BookingsPageProps) {
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  return (
    <div>
      <Header language={language} setLanguage={setLanguage} />

      <div className="container mx-auto px-6 py-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl text-white mb-6">{t.myBookings}</h1>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-[#1a1a2e]/80 backdrop-blur-xl border border-purple-500/20 rounded-2xl pl-14 pr-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-3 mb-8 border-b border-purple-500/10">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-6 py-3 transition-all relative ${
              activeTab === 'upcoming'
                ? 'text-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {t.upcoming}
            {activeTab === 'upcoming' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-6 py-3 transition-all relative ${
              activeTab === 'past'
                ? 'text-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {t.past}
            {activeTab === 'past' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500" />
            )}
          </button>
        </div>

        {/* Upcoming Bookings */}
        {activeTab === 'upcoming' && (
          <div className="space-y-6">
            {upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-[#1a1a2e]/50 backdrop-blur-xl border border-purple-500/10 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all group relative"
              >
                {/* Perforated Line Effect */}
                <div className="absolute top-0 bottom-0 right-80 w-0.5 bg-gradient-to-b from-transparent via-purple-500/30 to-transparent" style={{ backgroundSize: '1px 10px', backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(168, 85, 247, 0.3) 5px, rgba(168, 85, 247, 0.3) 10px)' }} />

                <div className="flex flex-col md:flex-row">
                  {/* Left Side - Event Details */}
                  <div className="flex-1 p-6 flex items-center gap-6">
                    {/* Thumbnail */}
                    <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                      <img
                        src={booking.image}
                        alt={booking.eventTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="text-xl text-white mb-3">{booking.eventTitle}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar size={16} className="text-purple-400" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Clock size={16} className="text-blue-400" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <MapPin size={16} className="text-red-400" />
                          <span>{booking.venue}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - QR & Actions */}
                  <div className="md:w-80 border-t md:border-t-0 md:border-l border-purple-500/10 p-6 flex flex-col items-center justify-center gap-4 bg-[#0f0f1e]/30">
                    {/* QR Code Placeholder */}
                    <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center">
                      <QrCode size={96} className="text-gray-900" />
                    </div>

                    {/* Booking ID */}
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">{t.bookingId}</p>
                      <p className="text-sm text-purple-400 font-mono">{booking.bookingId}</p>
                    </div>

                    {/* Download Button */}
                    <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2">
                      <Download size={18} />
                      {t.downloadPdf}
                    </button>

                    {/* View Details Link */}
                    <button className="text-sm text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-1">
                      {t.viewDetails}
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Past Bookings */}
        {activeTab === 'past' && (
          <div className="space-y-6">
            {pastBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-[#1a1a2e]/30 backdrop-blur-xl border border-purple-500/5 rounded-2xl overflow-hidden opacity-60 hover:opacity-100 transition-all group relative"
              >
                {/* Perforated Line Effect */}
                <div className="absolute top-0 bottom-0 right-80 w-0.5 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent" style={{ backgroundSize: '1px 10px', backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(168, 85, 247, 0.2) 5px, rgba(168, 85, 247, 0.2) 10px)' }} />

                <div className="flex flex-col md:flex-row">
                  {/* Left Side - Event Details */}
                  <div className="flex-1 p-6 flex items-center gap-6">
                    {/* Thumbnail */}
                    <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 grayscale">
                      <img
                        src={booking.image}
                        alt={booking.eventTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="text-xl text-white mb-3">{booking.eventTitle}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar size={16} className="text-purple-400" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Clock size={16} className="text-blue-400" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <MapPin size={16} className="text-red-400" />
                          <span>{booking.venue}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - QR & Actions */}
                  <div className="md:w-80 border-t md:border-t-0 md:border-l border-purple-500/5 p-6 flex flex-col items-center justify-center gap-4 bg-[#0f0f1e]/20">
                    {/* QR Code Placeholder */}
                    <div className="w-32 h-32 bg-gray-700 rounded-xl flex items-center justify-center grayscale">
                      <QrCode size={96} className="text-gray-500" />
                    </div>

                    {/* Booking ID */}
                    <div className="text-center">
                      <p className="text-xs text-gray-600 mb-1">{t.bookingId}</p>
                      <p className="text-sm text-gray-500 font-mono">{booking.bookingId}</p>
                    </div>

                    {/* Download Button */}
                    <button className="w-full px-6 py-3 bg-gray-700/50 text-gray-400 rounded-xl flex items-center justify-center gap-2">
                      <Download size={18} />
                      {t.downloadPdf}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer language={language} />
    </div>
  );
}
