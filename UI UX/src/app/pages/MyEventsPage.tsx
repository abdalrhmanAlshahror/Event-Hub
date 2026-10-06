import { useState } from 'react';
import { Link } from 'react-router';
import { Plus, MoreVertical, Edit, Trash2, Eye, TrendingUp, Users } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface MyEventsPageProps {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
}

const translations = {
  en: {
    myEvents: 'My Events',
    createdEvents: 'Created Events',
    attendingEvents: 'Attending Events',
    createEvent: 'Create Event',
    all: 'All',
    active: 'Active',
    pending: 'Pending Approval',
    past: 'Past Events',
    ticketsSold: 'Tickets Sold',
    registrations: 'Registrations',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    capacity: 'Capacity',
  },
  ar: {
    myEvents: 'فعالياتي',
    createdEvents: 'الفعاليات المنشأة',
    attendingEvents: 'الفعاليات المحجوزة',
    createEvent: 'إنشاء فعالية',
    all: 'الكل',
    active: 'نشطة',
    pending: 'قيد الموافقة',
    past: 'فعاليات سابقة',
    ticketsSold: 'التذاكر المباعة',
    registrations: 'التسجيلات',
    edit: 'تعديل',
    delete: 'حذف',
    view: 'عرض',
    capacity: 'السعة',
  },
};

const myEvents = [
  {
    id: 1,
    title: 'Tech Innovation Summit 2026',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
    status: 'active',
    ticketsSold: 245,
    capacity: 500,
    date: 'June 15, 2026',
  },
  {
    id: 2,
    title: 'Summer Music Festival',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400',
    status: 'active',
    ticketsSold: 892,
    capacity: 1000,
    date: 'July 20, 2026',
  },
  {
    id: 3,
    title: 'Art Exhibition Opening',
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400',
    status: 'pending',
    ticketsSold: 0,
    capacity: 200,
    date: 'August 5, 2026',
  },
  {
    id: 4,
    title: 'Food & Wine Expo',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
    status: 'past',
    ticketsSold: 567,
    capacity: 600,
    date: 'April 10, 2026',
  },
  {
    id: 5,
    title: 'Business Leadership Conference',
    image: 'https://images.unsplash.com/photo-1559223607-a43c990c7a1a?w=400',
    status: 'active',
    ticketsSold: 345,
    capacity: 400,
    date: 'June 25, 2026',
  },
  {
    id: 6,
    title: 'Marathon Championship',
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=400',
    status: 'past',
    ticketsSold: 1200,
    capacity: 1200,
    date: 'March 15, 2026',
  },
];

export function MyEventsPage({ language, setLanguage }: MyEventsPageProps) {
  const t = translations[language];
  const [viewMode, setViewMode] = useState<'created' | 'attending'>('created');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'past'>('all');
  const [showMenu, setShowMenu] = useState<number | null>(null);

  const filteredEvents = myEvents.filter(event => {
    if (statusFilter === 'all') return true;
    return event.status === statusFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'past':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return t.active;
      case 'pending':
        return t.pending;
      case 'past':
        return t.past;
      default:
        return status;
    }
  };

  return (
    <div>
      <Header language={language} setLanguage={setLanguage} />

      <div className="container mx-auto px-6 py-24">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl text-white mb-2">{t.myEvents}</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Toggle Switch */}
            <div className="bg-[#1a1a2e]/80 backdrop-blur-xl border border-purple-500/20 rounded-xl p-1 flex">
              <button
                onClick={() => setViewMode('created')}
                className={`px-6 py-3 rounded-lg transition-all ${
                  viewMode === 'created'
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {t.createdEvents}
              </button>
              <button
                onClick={() => setViewMode('attending')}
                className={`px-6 py-3 rounded-lg transition-all ${
                  viewMode === 'attending'
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {t.attendingEvents}
              </button>
            </div>

            {/* Create Event Button */}
            <Link to="/create-event">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2">
                <Plus size={20} />
                {t.createEvent}
              </button>
            </Link>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
          {[
            { key: 'all', label: t.all },
            { key: 'active', label: t.active },
            { key: 'pending', label: t.pending },
            { key: 'past', label: t.past },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key as any)}
              className={`px-6 py-2 rounded-xl whitespace-nowrap transition-all ${
                statusFilter === tab.key
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50'
                  : 'bg-[#1a1a2e]/50 text-gray-400 border border-transparent hover:border-purple-500/30 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-[#1a1a2e]/50 backdrop-blur-xl border border-purple-500/10 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all group"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs border backdrop-blur-md ${getStatusColor(event.status)}`}>
                    {getStatusLabel(event.status)}
                  </span>
                </div>

                {/* Action Menu */}
                <div className="absolute top-4 left-4">
                  <div className="relative">
                    <button
                      onClick={() => setShowMenu(showMenu === event.id ? null : event.id)}
                      className="p-2 bg-black/50 backdrop-blur-md rounded-lg hover:bg-black/70 transition-colors"
                    >
                      <MoreVertical size={18} className="text-white" />
                    </button>

                    {showMenu === event.id && (
                      <div className="absolute top-full mt-2 left-0 bg-[#0f0f1e] border border-purple-500/20 rounded-xl overflow-hidden shadow-xl z-10 min-w-[150px]">
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-purple-500/10 hover:text-white transition-colors">
                          <Eye size={16} />
                          {t.view}
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-purple-500/10 hover:text-white transition-colors">
                          <Edit size={16} />
                          {t.edit}
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors">
                          <Trash2 size={16} />
                          {t.delete}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg text-white mb-2">{event.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{event.date}</p>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{t.ticketsSold}</span>
                    <span className="text-purple-400">
                      {event.ticketsSold} / {event.capacity}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all"
                      style={{ width: `${(event.ticketsSold / event.capacity) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-purple-500/10">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Users size={16} className="text-purple-400" />
                    <span>{event.ticketsSold}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <TrendingUp size={16} className="text-green-400" />
                    <span>{Math.round((event.ticketsSold / event.capacity) * 100)}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-500/10 rounded-full mb-6">
              <Plus className="text-purple-400" size={32} />
            </div>
            <h3 className="text-2xl text-white mb-2">No events found</h3>
            <p className="text-gray-400 mb-6">Start creating amazing events for your audience</p>
            <Link to="/create-event">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                {t.createEvent}
              </button>
            </Link>
          </div>
        )}
      </div>

      <Footer language={language} />
    </div>
  );
}
