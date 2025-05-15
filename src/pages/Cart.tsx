
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight } from 'lucide-react';
import { Product } from '@/components/ProductCard';

interface CartItem extends Product {
  quantity: number;
}

// Mock cart data
const cartData: CartItem[] = [
  {
    id: 2,
    name: 'Fresh Strawberries',
    price: 4.99,
    unit: 'basket (250g)',
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=2070&auto=format&fit=crop',
    quantity: 1,
  },
  {
    id: 4,
    name: 'Sourdough Bread',
    price: 4.50,
    unit: '1 loaf (500g)',
    category: 'Bakery',
    image: 'https://images.unsplash.com/photo-1555951015-6da1bcbb304d?q=80&w=1972&auto=format&fit=crop',
    quantity: 2,
  },
  {
    id: 6,
    name: 'Organic Baby Spinach',
    price: 3.49,
    unit: 'bag (200g)',
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=2080&auto=format&fit=crop',
    discount: 15,
    quantity: 1,
  },
];

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate API call with mock data
    setTimeout(() => {
      setCart(cartData);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  const handleRemoveItem = (id: number) => {
    const removedItem = cart.find(item => item.id === id);
    setCart(cart.filter(item => item.id !== id));
    
    if (removedItem) {
      toast({
        title: "Removed from cart",
        description: `${removedItem.name} has been removed from your cart`,
      });
    }
  };
  
  const handleQuantityChange = (id: number, change: number) => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    setCart(updatedCart);
  };
  
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = item.discount
        ? item.price - (item.price * item.discount / 100)
        : item.price;
      return total + (price * item.quantity);
    }, 0);
  };
  
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = cart.length > 0 ? 5.00 : 0;
    return subtotal + shipping;
  };
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-8">
          <div className="container mx-auto max-w-screen-xl px-4">
            <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>
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
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <Link to="/shop">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
          
          {cart.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="space-y-4">
                  {cart.map(item => {
                    const discountedPrice = item.discount 
                      ? item.price - (item.price * item.discount / 100) 
                      : item.price;
                    
                    const itemTotal = discountedPrice * item.quantity;
                    
                    return (
                      <div key={item.id} className="flex rounded-lg border p-4 hover:bg-grocery-bg-light transition-colors">
                        <Link to={`/product/${item.id}`} className="mr-4 h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-grocery-bg-subtle">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </Link>
                        
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between">
                            <Link to={`/product/${item.id}`} className="text-lg font-medium hover:text-grocery-accent">
                              {item.name}
                            </Link>
                            <span className="ml-4 font-medium">
                              ${itemTotal.toFixed(2)}
                            </span>
                          </div>
                          
                          <p className="text-sm text-grocery-text-light">{item.unit}</p>
                          
                          {item.discount ? (
                            <div className="mt-1 flex items-center gap-1.5">
                              <span className="text-sm">${discountedPrice.toFixed(2)} each</span>
                              <span className="text-xs text-grocery-text-light line-through">${item.price.toFixed(2)}</span>
                            </div>
                          ) : (
                            <span className="mt-1 text-sm">${item.price.toFixed(2)} each</span>
                          )}
                          
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => handleQuantityChange(item.id, -1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="mx-2 w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => handleQuantityChange(item.id, 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-gray-500 hover:text-red-500"
                            >
                              <Trash2 className="mr-1 h-4 w-4" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="lg:col-span-4">
                <div className="rounded-lg border bg-white p-6 shadow-sm">
                  <h2 className="mb-4 text-lg font-medium">Order Summary</h2>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-grocery-text-light">Subtotal</span>
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-grocery-text-light">Shipping</span>
                      <span>$5.00</span>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex items-center justify-between font-medium">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Link to="/checkout">
                    <Button 
                      size="lg"
                      className="mt-6 w-full bg-grocery-accent hover:bg-grocery-accent-hover text-white"
                    >
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 rounded-full bg-grocery-bg-subtle p-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8 text-grocery-accent">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="mb-2 text-xl font-medium">Your cart is empty</h2>
              <p className="mb-6 text-grocery-text-light">
                Looks like you haven't added any products to your cart yet
              </p>
              <Link to="/shop">
                <Button className="bg-grocery-accent hover:bg-grocery-accent-hover text-white">
                  Start Shopping
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

export default Cart;
