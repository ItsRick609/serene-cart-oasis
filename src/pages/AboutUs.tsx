
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Info } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto max-w-screen-lg px-4">
          <div className="text-center mb-12">
            <Info className="mx-auto h-16 w-16 text-grocery-accent mb-4" />
            <h1 className="text-4xl font-bold text-gray-800">About FreshGrocer</h1>
            <p className="mt-4 text-lg text-gray-600">Your trusted partner for fresh and quality groceries.</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Story</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Founded in 2024, FreshGrocer started with a simple mission: to make fresh, high-quality groceries accessible to everyone. We believe that good food is the foundation of a healthy and happy life. Our journey began in a small local market, and thanks to our loyal customers, we've grown into a beloved online grocery store.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  We partner with local farmers and trusted suppliers to source the freshest produce, dairy, meats, and pantry staples. Our commitment to quality means every item you receive is carefully selected and packed with care.
                </p>
                <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-4">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  To provide our community with the freshest, highest-quality groceries, exceptional customer service, and a convenient shopping experience that promotes healthy living. We aim to be more than just a grocery store; we want to be a part of your family's well-being.
                </p>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop" 
                  alt="Fresh produce" 
                  className="rounded-lg shadow-md object-cover h-96 w-full"
                />
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Why Choose Us?</h2>
              <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-gray-100 rounded-lg">
                  <h3 className="text-xl font-medium text-grocery-accent mb-2">Quality First</h3>
                  <p className="text-gray-600">We never compromise on the quality of our products.</p>
                </div>
                <div className="p-6 bg-gray-100 rounded-lg">
                  <h3 className="text-xl font-medium text-grocery-accent mb-2">Locally Sourced</h3>
                  <p className="text-gray-600">Supporting local farmers and communities.</p>
                </div>
                <div className="p-6 bg-gray-100 rounded-lg">
                  <h3 className="text-xl font-medium text-grocery-accent mb-2">Convenient Delivery</h3>
                  <p className="text-gray-600">Freshness delivered right to your doorstep.</p>
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

export default AboutUs;
