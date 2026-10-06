import { Link } from 'react-router';
import { Languages, Sparkles, LayoutDashboard } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
}

export function Header({ language, setLanguage }: HeaderProps) {
  const content = {
    en: {
      exploreEvents: 'Explore Events',
      dashboard: 'Go to Dashboard',
    },
    ar: {
      exploreEvents: 'استكشف الفعاليات',
      dashboard: 'لوحة التحكم',
    },
  };

  const t = content[language];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              EventHub
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
            >
              <Languages className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-white">
                {language === 'en' ? 'AR' : 'EN'}
              </span>
            </button>

            {/* CTA Buttons */}
            <Link to="/explore">
              <Button
                variant="outline"
                className="border-purple-500/50 hover:bg-purple-500/10 text-white"
              >
                <Sparkles className="w-4 h-4" />
                {t.exploreEvents}
              </Button>
            </Link>

            <Link to="/dashboard">
              <Button
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/50"
              >
                <LayoutDashboard className="w-4 h-4" />
                {t.dashboard}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
