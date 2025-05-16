
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AddProductForm from '@/components/AddProductForm';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AddProductPage = () => {
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login?message=You must be logged in to add products.'); // Redirect if not logged in
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/login?message=You have been logged out. Please login again to add products.');
      } else {
        setUser(session?.user ?? null);
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  if (!user) {
    // This case should ideally be handled by the redirect, but as a fallback:
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-8">
          <div className="container mx-auto max-w-screen-md px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
            <p className="mb-6">You need to be logged in to add new products.</p>
            <Button onClick={() => navigate('/login')} className="bg-grocery-accent hover:bg-grocery-accent-hover text-white">
              Go to Login
            </Button>
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
        <div className="container mx-auto max-w-screen-md px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Add New Product</h1>
            <p className="mt-2 text-grocery-text-light">
              Fill in the details below to add a new product to the store.
            </p>
          </div>
          <AddProductForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddProductPage;
