import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { SearchSection } from '../components/SearchSection';
import { FeaturedEvents } from '../components/FeaturedEvents';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';

interface HomePageProps {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
}

export function HomePage({ language, setLanguage }: HomePageProps) {
  return (
    <>
      <Header language={language} setLanguage={setLanguage} />
      <HeroSection language={language} />
      <SearchSection language={language} />
      <FeaturedEvents language={language} />
      <CTASection language={language} />
      <Footer language={language} />
    </>
  );
}
