
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard, { Product } from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, X } from 'lucide-react';

// Mock product data
const productData: Product[] = [
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
  {
    id: 9,
    name: 'Grass-Fed Ground Beef',
    price: 8.99,
    unit: 'per lb',
    category: 'Meat',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 10,
    name: 'Organic Carrots',
    price: 2.29,
    unit: 'bunch',
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?q=80&w=2012&auto=format&fit=crop',
  },
  {
    id: 11,
    name: 'Greek Yogurt',
    price: 4.79,
    unit: '32 oz',
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1937&auto=format&fit=crop',
  },
  {
    id: 12,
    name: 'Organic Honeycrisp Apples',
    price: 3.99,
    unit: 'per lb',
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=2070&auto=format&fit=crop',
    discount: 5,
  },
];

const categories = [
  { id: 'fruits', name: 'Fruits' },
  { id: 'vegetables', name: 'Vegetables' },
  { id: 'dairy', name: 'Dairy' },
  { id: 'bakery', name: 'Bakery' },
  { id: 'meat', name: 'Meat' },
  { id: 'seafood', name: 'Seafood' },
];

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20]);
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    // Simulate API call with mock data
    setTimeout(() => {
      setProducts(productData);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };
  
  const filteredProducts = products
    .filter(product => 
      searchQuery ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) : true
    )
    .filter(product => 
      selectedCategories.length > 0 
        ? selectedCategories.includes(product.category.toLowerCase()) 
        : true
    )
    .filter(product => {
      const discountedPrice = product.discount 
        ? product.price - (product.price * product.discount / 100) 
        : product.price;
      return discountedPrice >= priceRange[0] && discountedPrice <= priceRange[1];
    });
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setPriceRange([0, 20]);
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto max-w-screen-xl px-4">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <h1 className="text-3xl font-bold">Shop All Products</h1>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full max-w-xs pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={toggleFilters}
                className="md:hidden"
                aria-label="Toggle filters"
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-4">
            <aside className={`${showFilters ? 'block' : 'hidden'} md:block`}>
              <div className="sticky top-20 rounded-lg border bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-medium">Filters</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-8 text-sm text-grocery-accent hover:text-grocery-accent-hover"
                  >
                    Clear All
                  </Button>
                </div>
                
                <div className="divide-y">
                  <div className="py-4">
                    <h3 className="mb-3 font-medium">Categories</h3>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`category-${category.id}`}
                            checked={selectedCategories.includes(category.name.toLowerCase())}
                            onCheckedChange={() => handleCategoryChange(category.name.toLowerCase())}
                          />
                          <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="py-4">
                    <h3 className="mb-4 font-medium">Price Range</h3>
                    <Slider
                      defaultValue={[priceRange[0], priceRange[1]]}
                      max={20}
                      step={1}
                      value={[priceRange[0], priceRange[1]]}
                      onValueChange={handlePriceChange}
                      className="mb-4"
                    />
                    <div className="flex items-center justify-between">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}+</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
            
            <div className="md:col-span-3">
              {isLoading ? (
                <div className="product-grid animate-pulse">
                  {[...Array(8)].map((_, index) => (
                    <div key={index} className="rounded-lg border p-2">
                      <div className="aspect-square rounded-md bg-grocery-bg-subtle"></div>
                      <div className="mt-3 h-4 w-3/4 rounded-full bg-grocery-bg-subtle"></div>
                      <div className="mt-2 h-4 w-1/2 rounded-full bg-grocery-bg-subtle"></div>
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="product-grid">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <h2 className="mb-2 text-xl font-medium">No products found</h2>
                  <p className="mb-6 text-grocery-text-light">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button onClick={clearFilters} className="bg-grocery-accent hover:bg-grocery-accent-hover text-white">
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
