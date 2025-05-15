
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grocery-bg-subtle">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop"
          alt="Fresh produce"
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-grocery-bg-light/90 to-transparent" />
      </div>
      
      <div className="container relative mx-auto flex min-h-[500px] max-w-screen-xl flex-col items-start justify-center px-4 py-16 sm:py-24">
        <h1 className="mb-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Fresh Groceries <br />
          <span className="text-white">Delivered to Your Door</span>
        </h1>
        
        <p className="mb-8 max-w-lg text-lg text-grocery-text-light">
          Shop our selection of high-quality, locally-sourced produce and groceries with convenient home delivery.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            className="bg-grocery-accent hover:bg-grocery-accent-hover text-white"
            onClick={() => navigate('/shop')}
          >
            Shop Now
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-grocery-accent text-grocery-accent hover:bg-grocery-accent hover:text-white"
            onClick={() => navigate('/categories')}
          >
            Browse Categories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

