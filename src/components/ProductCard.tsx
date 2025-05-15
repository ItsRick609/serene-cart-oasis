
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Check, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  unit: string;
  category: string;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const { toast } = useToast();
  
  const { id, name, price, image, unit, discount, category } = product;
  const discountedPrice = discount ? price - (price * discount / 100) : price;
  
  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted ? `${name} has been removed from your wishlist` : `${name} has been added to your wishlist`,
    });
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddedToCart(true);
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart`,
    });
    
    // Reset button state after 1.5 seconds
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 1500);
  };
  
  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  };
  
  return (
    <>
      <div className="group relative overflow-hidden rounded-lg border bg-white p-2 transition-all hover:shadow-md">
        <div className="absolute right-2 top-2 z-10">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${isWishlisted ? 'text-red-500' : 'text-gray-400'}`}
            onClick={handleAddToWishlist}
          >
            <Heart className="h-5 w-5" fill={isWishlisted ? "currentColor" : "none"} />
          </Button>
        </div>

        <Link to={`/product/${id}`} className="block">
          <div className="aspect-square overflow-hidden rounded-md bg-grocery-bg-subtle">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
          
          <div className="pt-3">
            <h3 className="font-medium text-sm text-grocery-text line-clamp-1">{name}</h3>
            <p className="text-xs text-grocery-text-light">{unit}</p>
            
            <div className="mt-2 flex items-center justify-between">
              <div>
                {discount ? (
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium">${discountedPrice.toFixed(2)}</span>
                    <span className="text-xs text-muted-foreground line-through">${price.toFixed(2)}</span>
                  </div>
                ) : (
                  <span className="font-medium">${price.toFixed(2)}</span>
                )}
              </div>
              
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-md border-grocery-accent hover:bg-grocery-accent hover:text-white"
                  onClick={handleQuickView}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className={`h-8 rounded-md border-grocery-accent hover:bg-grocery-accent hover:text-white ${
                    isAddedToCart ? 'bg-grocery-accent text-white' : ''
                  }`}
                  onClick={handleAddToCart}
                  disabled={isAddedToCart}
                >
                  {isAddedToCart ? (
                    <Check className="h-4 w-4 mr-1" />
                  ) : (
                    <ShoppingCart className="h-4 w-4 mr-1" />
                  )}
                  {isAddedToCart ? 'Added' : 'Add'}
                </Button>
              </div>
            </div>
          </div>
        </Link>
      </div>
      
      <Dialog open={showQuickView} onOpenChange={setShowQuickView}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">{name}</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="aspect-square overflow-hidden rounded-lg bg-grocery-bg-subtle">
              <img
                src={image}
                alt={name}
                className="h-full w-full object-cover"
              />
            </div>
            
            <div>
              <div className="mb-3">
                {discount ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-medium">${discountedPrice.toFixed(2)}</span>
                    <span className="text-grocery-text-light line-through">${price.toFixed(2)}</span>
                    <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                      {discount}% OFF
                    </span>
                  </div>
                ) : (
                  <span className="text-xl font-medium">${price.toFixed(2)}</span>
                )}
              </div>
              
              <p className="mb-2 text-sm">{unit}</p>
              <p className="mb-2 text-sm">Category: {category}</p>
              
              <p className="mb-4 text-grocery-text-light">
                Fresh, locally-sourced {category.toLowerCase()}. Farm to table quality that you can taste.
              </p>
              
              <div className="mt-4 flex gap-2">
                <Button
                  className="flex-1 bg-grocery-accent hover:bg-grocery-accent-hover text-white"
                  onClick={(e) => {
                    handleAddToCart(e);
                    setShowQuickView(false);
                  }}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                
                <Button
                  variant="outline"
                  className={`px-4 ${isWishlisted ? 'text-red-500 border-red-500' : ''}`}
                  onClick={handleAddToWishlist}
                >
                  <Heart className="h-4 w-4" fill={isWishlisted ? "currentColor" : "none"} />
                </Button>
              </div>
              
              <div className="mt-4">
                <Link 
                  to={`/product/${id}`}
                  className="text-sm text-grocery-accent hover:underline"
                  onClick={() => setShowQuickView(false)}
                >
                  View full details
                </Link>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
