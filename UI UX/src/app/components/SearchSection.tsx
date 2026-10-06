import { Link } from 'react-router';
import { Search, Filter, Calendar, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface SearchSectionProps {
  language: 'en' | 'ar';
}

export function SearchSection({ language }: SearchSectionProps) {
  const content = {
    en: {
      searchPlaceholder: 'Search events, venues, or organizers...',
      category: 'Category',
      date: 'Date',
      price: 'Price',
      search: 'Search',
      categories: {
        all: 'All Categories',
        conference: 'Conference',
        concert: 'Concert',
        workshop: 'Workshop',
        sports: 'Sports',
        exhibition: 'Exhibition',
        networking: 'Networking',
      },
      dates: {
        any: 'Any Date',
        today: 'Today',
        week: 'This Week',
        month: 'This Month',
        custom: 'Custom Range',
      },
      prices: {
        any: 'Any Price',
        free: 'Free',
        paid: 'Paid',
        under50: 'Under $50',
        under100: 'Under $100',
      },
    },
    ar: {
      searchPlaceholder: 'ابحث عن فعاليات أو أماكن أو منظمين...',
      category: 'الفئة',
      date: 'التاريخ',
      price: 'السعر',
      search: 'بحث',
      categories: {
        all: 'جميع الفئات',
        conference: 'مؤتمر',
        concert: 'حفلة موسيقية',
        workshop: 'ورشة عمل',
        sports: 'رياضة',
        exhibition: 'معرض',
        networking: 'شبكات تواصل',
      },
      dates: {
        any: 'أي تاريخ',
        today: 'اليوم',
        week: 'هذا الأسبوع',
        month: 'هذا الشهر',
        custom: 'نطاق مخصص',
      },
      prices: {
        any: 'أي سعر',
        free: 'مجاني',
        paid: 'مدفوع',
        under50: 'أقل من $50',
        under100: 'أقل من $100',
      },
    },
  };

  const t = content[language];

  return (
    <section className="px-6 pb-12 relative z-20">
      <div className="max-w-6xl mx-auto">
        {/* Floating Search Bar */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl shadow-purple-500/10">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder={t.searchPlaceholder}
                className="w-full pl-12 pr-4 py-6 bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-xl focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap lg:flex-nowrap gap-3">
              {/* Category Filter */}
              <Select defaultValue="all">
                <SelectTrigger className="w-full lg:w-48 bg-white/10 border-white/20 text-white rounded-xl">
                  <Filter className="w-4 h-4 text-purple-400" />
                  <SelectValue placeholder={t.category} />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="all">{t.categories.all}</SelectItem>
                  <SelectItem value="conference">{t.categories.conference}</SelectItem>
                  <SelectItem value="concert">{t.categories.concert}</SelectItem>
                  <SelectItem value="workshop">{t.categories.workshop}</SelectItem>
                  <SelectItem value="sports">{t.categories.sports}</SelectItem>
                  <SelectItem value="exhibition">{t.categories.exhibition}</SelectItem>
                  <SelectItem value="networking">{t.categories.networking}</SelectItem>
                </SelectContent>
              </Select>

              {/* Date Filter */}
              <Select defaultValue="any">
                <SelectTrigger className="w-full lg:w-44 bg-white/10 border-white/20 text-white rounded-xl">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <SelectValue placeholder={t.date} />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="any">{t.dates.any}</SelectItem>
                  <SelectItem value="today">{t.dates.today}</SelectItem>
                  <SelectItem value="week">{t.dates.week}</SelectItem>
                  <SelectItem value="month">{t.dates.month}</SelectItem>
                  <SelectItem value="custom">{t.dates.custom}</SelectItem>
                </SelectContent>
              </Select>

              {/* Price Filter */}
              <Select defaultValue="any">
                <SelectTrigger className="w-full lg:w-44 bg-white/10 border-white/20 text-white rounded-xl">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  <SelectValue placeholder={t.price} />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="any">{t.prices.any}</SelectItem>
                  <SelectItem value="free">{t.prices.free}</SelectItem>
                  <SelectItem value="paid">{t.prices.paid}</SelectItem>
                  <SelectItem value="under50">{t.prices.under50}</SelectItem>
                  <SelectItem value="under100">{t.prices.under100}</SelectItem>
                </SelectContent>
              </Select>

              {/* Search Button */}
              <Link to="/search">
                <Button
                  size="lg"
                  className="w-full lg:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/50 px-8 rounded-xl"
                >
                  <Search className="w-5 h-5" />
                  {t.search}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
