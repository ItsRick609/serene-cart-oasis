
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import FeaturedCategories from '@/components/FeaturedCategories';
import FeatureHighlights from '@/components/FeatureHighlights';
import Newsletter from '@/components/Newsletter';

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedCategories />
        <FeaturedProducts />
        <FeatureHighlights />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
