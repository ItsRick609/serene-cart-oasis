
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryCard, { Category } from '@/components/CategoryCard';
import { Skeleton } from '@/components/ui/skeleton';

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call with mock data - reusing categories from FeaturedCategories
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
        {
          id: 5,
          name: 'Meat & Poultry',
          image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=2070&auto=format&fit=crop',
          productCount: 18,
        },
        {
          id: 6,
          name: 'Seafood',
          image: 'https://images.unsplash.com/photo-1499125562588-29fb8a56b5d5?q=80&w=1932&auto=format&fit=crop',
          productCount: 15,
        },
        {
          id: 7,
          name: 'Organic Foods',
          image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1974&auto=format&fit=crop',
          productCount: 28,
        },
        {
          id: 8,
          name: 'Drinks & Beverages',
          image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?q=80&w=1770&auto=format&fit=crop',
          productCount: 36,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto max-w-screen-xl px-4">
          <h1 className="text-3xl font-bold mb-8">All Categories</h1>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="h-40">
                  <Skeleton className="h-full w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map(category => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Categories;
