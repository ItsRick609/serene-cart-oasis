
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ShoppingCart,
  Heart,
  User,
  Search,
  Menu,
  X
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose 
} from '@/components/ui/sheet';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-grocery-bg-light">
      <div className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        <div className="flex items-center">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                <nav className="grid gap-6 pt-6">
                  <SheetClose asChild>
                    <Link to="/" className="text-lg font-medium hover:text-grocery-accent">Home</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/shop" className="text-lg font-medium hover:text-grocery-accent">Shop</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/categories" className="text-lg font-medium hover:text-grocery-accent">Categories</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/about" className="text-lg font-medium hover:text-grocery-accent">About Us</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/contact" className="text-lg font-medium hover:text-grocery-accent">Contact</Link>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          )}

          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold">FreshGrocer</span>
          </Link>

          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-6 text-sm">
              <Link to="/" className="font-medium hover:text-grocery-accent">Home</Link>
              <Link to="/shop" className="font-medium hover:text-grocery-accent">Shop</Link>
              <Link to="/categories" className="font-medium hover:text-grocery-accent">Categories</Link>
              <Link to="/about" className="font-medium hover:text-grocery-accent">About Us</Link>
              <Link to="/contact" className="font-medium hover:text-grocery-accent">Contact</Link>
            </nav>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {!isMobile && !isSearchOpen ? (
            <Button variant="ghost" size="icon" onClick={toggleSearch} aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
          ) : null}
          
          {(isSearchOpen || isMobile) && (
            <div className="relative">
              <Input 
                type="search" 
                placeholder="Search products..." 
                className="w-[200px] md:w-[300px]" 
              />
              {!isMobile && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 top-0" 
                  onClick={toggleSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
          
          <Link to="/wishlist">
            <Button variant="ghost" size="icon" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>
          
          <Link to="/account">
            <Button variant="ghost" size="icon" aria-label="Account">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
