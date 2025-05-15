
import { useState, useEffect } from 'react';
import ProductCard, { Product } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call with mock data
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          name: 'Organic Avocado',
          price: 2.49,
          unit: 'each',
          category: 'Fruits',
          image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=1975&auto=format&fit=crop',
          discount: 10,
        },
        {
          id: 2,
          name: 'Fresh Strawberries',
          price: 4.99,
          unit: 'basket (250g)',
          category: 'Fruits',
          image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=2070&auto=format&fit=crop',
        },
        {
          id: 3,
          name: 'Organic Whole Milk',
          price: 3.79,
          unit: '1 gallon',
          category: 'Dairy',
          image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=1972&auto=format&fit=crop',
          discount: 5,
        },
        {
          id: 4,
          name: 'Sourdough Bread',
          price: 4.50,
          unit: '1 loaf (500g)',
          category: 'Bakery',
          image: 'https://images.unsplash.com/photo-1555951015-6da1bcbb304d?q=80&w=1972&auto=format&fit=crop',
        },
        {
          id: 5,
          name: 'Free-Range Eggs',
          price: 5.29,
          unit: 'dozen',
          category: 'Dairy',
          image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?q=80&w=1974&auto=format&fit=crop',
        },
        {
          id: 6,
          name: 'Organic Baby Spinach',
          price: 3.49,
          unit: 'bag (200g)',
          category: 'Vegetables',
          image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=2080&auto=format&fit=crop',
          discount: 15,
        },
        {
          id: 7,
          name: 'Atlantic Salmon Fillet',
          price: 12.99,
          unit: 'per lb',
          category: 'Seafood',
          image: 'https://images.unsplash.com/photo-1499125562588-29fb8a56b5d5?q=80&w=1932&auto=format&fit=crop',
        },
        {
          id: 8,
          name: 'Organic Bananas',
          price: 1.99,
          unit: 'bunch',
          category: 'Fruits',
          image: 'https://images.unsplash.com/photo-1543218024-57a70143c369?q=80&w=1935&auto=format&fit=crop',
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
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <p className="mt-2 text-grocery-text-light">Our handpicked selection of quality products</p>
          </div>
          <div className="product-grid animate-pulse">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="rounded-lg border p-2">
                <div className="aspect-square rounded-md bg-grocery-bg-subtle"></div>
                <div className="mt-3 h-4 w-3/4 rounded-full bg-grocery-bg-subtle"></div>
                <div className="mt-2 h-4 w-1/2 rounded-full bg-grocery-bg-subtle"></div>
              </div>
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
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <p className="mt-2 text-grocery-text-light">Our handpicked selection of quality products</p>
        </div>
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button 
            variant="outline"
            size="lg"
            className="border-grocery-accent text-grocery-accent hover:bg-grocery-accent hover:text-white"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
