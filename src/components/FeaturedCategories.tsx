
import { useState, useEffect } from 'react';
import CategoryCard, { Category } from '@/components/CategoryCard';

const FeaturedCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call with mock data
    setTimeout(() => {
      setCategories([
        {
          id: 1,
          name: 'Fresh Fruits',
          image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=1950&auto=format&fit=crop',
          productCount: 45,
        },
        {
          id: 2,
          name: 'Fresh Vegetables',
          image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?q=80&w=1932&auto=format&fit=crop',
          productCount: 38,
        },
        {
          id: 3,
          name: 'Dairy & Eggs',
          image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1974&auto=format&fit=crop',
          productCount: 24,
        },
        {
          id: 4,
          name: 'Bakery',
          image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=1932&auto=format&fit=crop',
          productCount: 32,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  if (isLoading) {
    return (
      <section className="py-12">
        <div className="container mx-auto max-w-screen-xl px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold">Shop by Category</h2>
            <p className="mt-2 text-grocery-text-light">Explore our wide range of products</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-40 rounded-lg bg-grocery-bg-subtle"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-12">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <p className="mt-2 text-grocery-text-light">Explore our wide range of products</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
