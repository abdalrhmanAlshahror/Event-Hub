import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { LayoutDashboard, Calendar, Users, Settings, TrendingUp, Star, DollarSign, BarChart3, Edit, Trash2, MoreVertical } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface DashboardPageProps {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
}

const translations = {
  en: {
    dashboard: 'Dashboard',
    myEvents: 'My Events',
    bookings: 'Bookings',
    settings: 'Settings',
    totalEvents: 'Total Events',
    totalAttendees: 'Total Attendees',
    revenue: 'Revenue',
    avgRating: 'Average Rating',
    eventsManagement: 'Events Management',
    recentActivity: 'Recent Activity',
    active: 'Active',
    pending: 'Pending',
    ended: 'Ended',
    edit: 'Edit',
    delete: 'Delete',
    newBooking: 'New booking for',
    minutes: 'minutes ago',
  },
  ar: {
    dashboard: 'لوحة التحكم',
    myEvents: 'فعالياتي',
    bookings: 'الحجوزات',
    settings: 'الإعدادات',
    totalEvents: 'إجمالي الفعاليات',
    totalAttendees: 'إجمالي الحضور',
    revenue: 'الإيرادات',
    avgRating: 'متوسط التقييم',
    eventsManagement: 'إدارة الفعاليات',
    recentActivity: 'النشاط الأخير',
    active: 'نشط',
    pending: 'قيد الانتظار',
    ended: 'منتهي',
    edit: 'تعديل',
    delete: 'حذف',
    newBooking: 'حجز جديد لـ',
    minutes: 'دقائق مضت',
  },
};

const statsData = [
  { value: 20 },
  { value: 35 },
  { value: 28 },
  { value: 42 },
  { value: 38 },
  { value: 50 },
];

const events = [
  {
    id: 1,
    title: 'Tech Summit 2026',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
    status: 'active',
    attendees: 245,
    revenue: '$12,250',
  },
  {
    id: 2,
    title: 'Music Festival',
    thumbnail: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400',
    status: 'active',
    attendees: 892,
    revenue: '$44,600',
  },
  {
    id: 3,
    title: 'Art Exhibition',
    thumbnail: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400',
    status: 'pending',
    attendees: 0,
    revenue: '$0',
  },
  {
    id: 4,
    title: 'Food & Wine Expo',
    thumbnail: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
    status: 'ended',
    attendees: 567,
    revenue: '$28,350',
  },
];

const activities = [
  { event: 'Tech Summit 2026', time: 5 },
  { event: 'Music Festival', time: 12 },
  { event: 'Tech Summit 2026', time: 23 },
  { event: 'Music Festival', time: 35 },
];

export function DashboardPage({ language }: DashboardPageProps) {
  const t = translations[language];
  const location = useLocation();

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: t.dashboard, path: '/dashboard' },
    { id: 'myEvents', icon: Calendar, label: t.myEvents, path: '/my-events' },
    { id: 'bookings', icon: Users, label: t.bookings, path: '/bookings' },
    { id: 'settings', icon: Settings, label: t.settings, path: '/settings' },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className={`w-64 bg-[#0f0f1e]/80 backdrop-blur-xl border-${language === 'ar' ? 'l' : 'r'} border-purple-500/20 p-6`}>
        <Link to="/" className="mb-12 block">
          <h1 className="text-2xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">EventHub</h1>
        </Link>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === item.path
                  ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Calendar, label: t.totalEvents, value: '12', color: 'purple', trend: statsData },
            { icon: Users, label: t.totalAttendees, value: '2,456', color: 'blue', trend: statsData },
            { icon: DollarSign, label: t.revenue, value: '$125,400', color: 'green', trend: statsData },
            { icon: Star, label: t.avgRating, value: '4.8', color: 'yellow', trend: statsData },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#0f0f1e]/50 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 bg-${stat.color}-500/10 rounded-xl`}>
                  <stat.icon className={`text-${stat.color}-400`} size={24} />
                </div>
                <TrendingUp className="text-green-400" size={16} />
              </div>
              <div className="text-3xl text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400 mb-4">{stat.label}</div>
              <ResponsiveContainer width="100%" height={40}>
                <LineChart data={stat.trend}>
                  <Line type="monotone" dataKey="value" stroke="#a78bfa" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Events Management Table */}
          <div className="lg:col-span-2 bg-[#0f0f1e]/50 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-white">{t.eventsManagement}</h2>
              <BarChart3 className="text-purple-400" size={20} />
            </div>

            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-4 p-4 bg-[#1a1a2e]/50 rounded-xl border border-purple-500/5 hover:border-purple-500/20 transition-all"
                >
                  <img
                    src={event.thumbnail}
                    alt={event.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-white mb-1">{event.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Users size={14} />
                        {event.attendees}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign size={14} />
                        {event.revenue}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      event.status === 'active'
                        ? 'bg-green-500/10 text-green-400'
                        : event.status === 'pending'
                        ? 'bg-yellow-500/10 text-yellow-400'
                        : 'bg-gray-500/10 text-gray-400'
                    }`}
                  >
                    {t[event.status as keyof typeof t]}
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-purple-500/10 rounded-lg transition-colors">
                      <Edit size={16} className="text-purple-400" />
                    </button>
                    <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors">
                      <Trash2 size={16} className="text-red-400" />
                    </button>
                    <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                      <MoreVertical size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-[#0f0f1e]/50 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-6">
            <h2 className="text-xl text-white mb-6">{t.recentActivity}</h2>
            <div className="space-y-4">
              {activities.map((activity, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#1a1a2e]/50 rounded-xl border border-purple-500/5"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Users size={16} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-white mb-1">
                        {t.newBooking} <span className="text-purple-400">{activity.event}</span>
                      </p>
                      <p className="text-xs text-gray-400">
                        {activity.time} {t.minutes}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
