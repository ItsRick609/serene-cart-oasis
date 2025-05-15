
import { Truck, Clock, ShoppingCart, Heart } from 'lucide-react';

const features = [
  {
    icon: <Truck className="h-8 w-8" />,
    title: 'Fast Delivery',
    description: 'Get your groceries delivered same-day to your doorstep.',
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: 'Shop 24/7',
    description: 'Order anytime, day or night, at your convenience.',
  },
  {
    icon: <ShoppingCart className="h-8 w-8" />,
    title: 'Easy Shopping',
    description: 'User-friendly interface for a seamless shopping experience.',
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: 'Fresh Guarantee',
    description: 'All products guaranteed fresh or your money back.',
  },
];

const FeatureHighlights = () => {
  return (
    <section className="bg-grocery-bg-subtle py-12">
      <div className="container mx-auto max-w-screen-xl px-4">
        <h2 className="mb-12 text-center text-2xl font-bold">Why Choose Us</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-grocery-bg-subtle text-grocery-accent">
                {feature.icon}
              </div>
              <h3 className="mb-2 font-medium">{feature.title}</h3>
              <p className="text-sm text-grocery-text-light">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
