
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { Product } from '@/components/ProductCard';

// Mock wishlist data
const wishlistData: Product[] = [
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
    id: 3,
    name: 'Organic Whole Milk',
    price: 3.79,
    unit: '1 gallon',
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=1972&auto=format&fit=crop',
    discount: 5,
  },
  {
    id: 8,
    name: 'Organic Bananas',
    price: 1.99,
    unit: 'bunch',
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1543218024-57a70143c369?q=80&w=1935&auto=format&fit=crop',
  },
];

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate API call with mock data
    setTimeout(() => {
      setWishlist(wishlistData);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  const handleRemoveItem = (id: number) => {
    const removedItem = wishlist.find(item => item.id === id);
    setWishlist(wishlist.filter(item => item.id !== id));
    
    if (removedItem) {
      toast({
        title: "Removed from wishlist",
        description: `${removedItem.name} has been removed from your wishlist`,
      });
    }
  };
  
  const handleAddToCart = (product: Product) => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-8">
          <div className="container mx-auto max-w-screen-xl px-4">
            <h1 className="mb-8 text-3xl font-bold">My Wishlist</h1>
            <div className="animate-pulse space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="rounded-lg border p-4 flex">
                  <div className="h-24 w-24 bg-grocery-bg-subtle rounded"></div>
                  <div className="ml-4 flex-1">
                    <div className="h-6 w-1/4 bg-grocery-bg-subtle rounded mb-2"></div>
                    <div className="h-4 w-1/6 bg-grocery-bg-subtle rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto max-w-screen-xl px-4">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">My Wishlist</h1>
            <Link to="/shop">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
          
          {wishlist.length > 0 ? (
            <div className="space-y-4">
              {wishlist.map(item => {
                const discountedPrice = item.discount 
                  ? item.price - (item.price * item.discount / 100) 
                  : item.price;
                
                return (
                  <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center rounded-lg border p-4 hover:bg-grocery-bg-light transition-colors">
                    <Link to={`/product/${item.id}`} className="mr-4 h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-grocery-bg-subtle">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </Link>
                    
                    <div className="mt-4 sm:mt-0 flex-1">
                      <Link to={`/product/${item.id}`} className="text-lg font-medium hover:text-grocery-accent">
                        {item.name}
                      </Link>
                      <p className="text-sm text-grocery-text-light">{item.unit}</p>
                      <div className="mt-1 flex items-center">
                        {item.discount ? (
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium">${discountedPrice.toFixed(2)}</span>
                            <span className="text-xs text-grocery-text-light line-through">${item.price.toFixed(2)}</span>
                          </div>
                        ) : (
                          <span className="font-medium">${item.price.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 sm:mt-0 flex items-center gap-2 sm:ml-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-grocery-accent text-grocery-accent hover:bg-grocery-accent hover:text-white"
                        onClick={() => handleAddToCart(item)}
                      >
                        <ShoppingCart className="mr-1 h-4 w-4" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(item.id)}
                        className="h-8 w-8 text-gray-500 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 rounded-full bg-grocery-bg-subtle p-4">
                <Heart className="h-8 w-8 text-grocery-accent" />
              </div>
              <h2 className="mb-2 text-xl font-medium">Your wishlist is empty</h2>
              <p className="mb-6 text-grocery-text-light">
                Add items you like to your wishlist and they will appear here
              </p>
              <Link to="/shop">
                <Button className="bg-grocery-accent hover:bg-grocery-accent-hover text-white">
                  Explore Products
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
