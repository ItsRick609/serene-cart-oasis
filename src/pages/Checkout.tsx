
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, CreditCard, Check } from 'lucide-react';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  // Mock cart summary data
  const cartItems = [
    {
      name: 'Fresh Strawberries',
      quantity: 1,
      price: 4.99,
    },
    {
      name: 'Sourdough Bread',
      quantity: 2,
      price: 9.00,
    },
    {
      name: 'Organic Baby Spinach',
      quantity: 1,
      price: 2.97, // After discount
    },
  ];
  
  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const shipping = 5.00;
  const total = subtotal + shipping;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      toast({
        title: "Order placed successfully!",
        description: "Your order has been confirmed. Thank you for shopping with us!",
      });
      
      // Redirect to order confirmation page (in a real app)
      // history.push('/order-confirmation');
      setIsProcessing(false);
    }, 2000);
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto max-w-screen-xl px-4">
          <div className="mb-8 flex items-center">
            <Link to="/cart" className="mr-4 inline-flex items-center text-grocery-accent hover:text-grocery-accent-hover">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Link>
            <h1 className="text-2xl font-bold">Checkout</h1>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit}>
                {/* Contact Information */}
                <div className="mb-8 rounded-lg border p-6">
                  <h2 className="mb-4 text-xl font-medium">Contact Information</h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" required />
                    </div>
                  </div>
                </div>
                
                {/* Shipping Address */}
                <div className="mb-8 rounded-lg border p-6">
                  <h2 className="mb-4 text-xl font-medium">Shipping Address</h2>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input id="address" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apt">Apartment, suite, etc. (optional)</Label>
                      <Input id="apt" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select>
                          <SelectTrigger id="state">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="al">Alabama</SelectItem>
                            <SelectItem value="ak">Alaska</SelectItem>
                            <SelectItem value="az">Arizona</SelectItem>
                            <SelectItem value="ca">California</SelectItem>
                            <SelectItem value="co">Colorado</SelectItem>
                            <SelectItem value="ct">Connecticut</SelectItem>
                            {/* Add more states as needed */}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Delivery Instructions (optional)</Label>
                      <Textarea id="notes" placeholder="Any special instructions for delivery" />
                    </div>
                  </div>
                </div>
                
                {/* Payment Method */}
                <div className="mb-8 rounded-lg border p-6">
                  <h2 className="mb-4 text-xl font-medium">Payment Method</h2>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-grocery-bg-light">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label htmlFor="credit-card" className="flex items-center cursor-pointer">
                        <CreditCard className="mr-2 h-5 w-5" />
                        Credit or Debit Card
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-grocery-bg-light">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex items-center cursor-pointer">
                        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9.315 5.005c-1.373.09-2.937.693-3.378 3.012-.775 3.957 2.05 5.03 5.36 5.03h.02l-.18.10c-.254 1.308-1.52 6.72-1.52 6.72H5.808L4 13.073v-.096l.387-1.912h1.02c1.855.02 3.371-.439 3.816-2.924.448-2.486-.908-3.17-1.984-3.17-.109 0-.314-.004-.567.008l.698-3.518 8.08-.005-.57.281L14.453 5l-5.138.005zM16.5 2C20.5 2 22 4.667 20.98 8.725c-1.02 4.06-3.3 5.392-7.3 5.392h-1.5l-1.5 7H5.5l4-20h7z" />
                        </svg>
                        PayPal
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-grocery-bg-light">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex items-center cursor-pointer">
                        <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Cash on Delivery
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  {paymentMethod === 'credit-card' && (
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiration Date</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" required />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="name-on-card">Name on Card</Label>
                        <Input id="name-on-card" required />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    size="lg"
                    className="bg-grocery-accent hover:bg-grocery-accent-hover text-white"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        Complete Order
                        <Check className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
            
            <div className="lg:col-span-5">
              <div className="sticky top-20 rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-medium">Order Summary</h2>
                
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="ml-1 text-grocery-text-light">× {item.quantity}</span>
                      </div>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-grocery-text-light">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-grocery-text-light">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
