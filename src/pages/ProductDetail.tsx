
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Heart, ShoppingCart, Minus, Plus, ArrowLeft } from 'lucide-react';

// Mock product data
const mockProduct: Product = {
  id: 1,
  name: 'Organic Avocado',
  price: 2.49,
  unit: 'each',
  category: 'Fruits',
  image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=1975&auto=format&fit=crop',
  discount: 10,
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate API call with mock data
    setTimeout(() => {
      setProduct(mockProduct);
      setIsLoading(false);
    }, 1000);
  }, [id]);
  
  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted ? `${product?.name} has been removed from your wishlist` : `${product?.name} has been added to your wishlist`,
    });
  };
  
  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} ${quantity > 1 ? 'items' : 'item'} of ${product?.name} added to your cart`,
    });
  };
  
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-8">
          <div className="container mx-auto max-w-screen-xl px-4">
            <div className="animate-pulse">
              <div className="h-6 w-32 bg-grocery-bg-subtle rounded mb-8"></div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="aspect-square rounded-lg bg-grocery-bg-subtle"></div>
                <div>
                  <div className="h-8 w-3/4 bg-grocery-bg-subtle rounded mb-4"></div>
                  <div className="h-6 w-1/4 bg-grocery-bg-subtle rounded mb-6"></div>
                  <div className="h-4 w-full bg-grocery-bg-subtle rounded mb-2"></div>
                  <div className="h-4 w-full bg-grocery-bg-subtle rounded mb-2"></div>
                  <div className="h-4 w-3/4 bg-grocery-bg-subtle rounded mb-6"></div>
                  <div className="h-10 w-full bg-grocery-bg-subtle rounded mb-4"></div>
                  <div className="h-12 w-full bg-grocery-bg-subtle rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-8">
          <div className="container mx-auto max-w-screen-xl px-4 text-center">
            <h1 className="mb-4 text-2xl font-bold">Product Not Found</h1>
            <p className="mb-6">The product you are looking for does not exist or has been removed.</p>
            <Link to="/shop">
              <Button className="bg-grocery-accent hover:bg-grocery-accent-hover text-white">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const discountedPrice = product.discount 
    ? product.price - (product.price * product.discount / 100) 
    : product.price;
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto max-w-screen-xl px-4">
          <Link 
            to="/shop" 
            className="inline-flex items-center mb-8 text-grocery-accent hover:text-grocery-accent-hover"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Link>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="aspect-square overflow-hidden rounded-lg bg-grocery-bg-subtle">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            
            <div>
              <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
              
              <div className="mb-6 flex items-center">
                {product.discount ? (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-medium">${discountedPrice.toFixed(2)}</span>
                    <span className="text-grocery-text-light line-through">${product.price.toFixed(2)}</span>
                    <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                      {product.discount}% OFF
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-medium">${product.price.toFixed(2)}</span>
                )}
              </div>
              
              <p className="mb-2 text-sm text-grocery-text-light">
                {product.unit}
              </p>
              
              <p className="mb-6 text-grocery-text-light">
                Fresh, locally-sourced organic produce. Farm to table quality that you can taste.
              </p>
              
              <Separator className="mb-6" />
              
              <div className="mb-6 flex items-center">
                <div className="mr-6 flex items-center rounded-md border">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-none border-r"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="flex h-10 w-12 items-center justify-center text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-none border-l"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  className={`h-10 w-10 rounded-full ${isWishlisted ? 'text-red-500 border-red-500' : ''}`}
                  onClick={handleAddToWishlist}
                >
                  <Heart className="h-5 w-5" fill={isWishlisted ? "currentColor" : "none"} />
                </Button>
              </div>
              
              <Button
                onClick={handleAddToCart}
                className="w-full bg-grocery-accent hover:bg-grocery-accent-hover text-white"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              
              <div className="mt-8 text-sm text-grocery-text-light">
                <p className="mb-1">Category: {product.category}</p>
                <p>In Stock: Yes</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
