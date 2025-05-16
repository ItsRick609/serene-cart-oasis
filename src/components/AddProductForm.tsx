
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; // Assuming you might want a description field later, or for other text areas. For now, not used.
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const productFormSchema = z.object({
  name: z.string().min(3, { message: 'Product name must be at least 3 characters.' }),
  price: z.coerce.number().positive({ message: 'Price must be a positive number.' }),
  unit: z.string().min(1, { message: 'Unit is required (e.g., kg, piece, liter).' }),
  category: z.string().min(3, { message: 'Category must be at least 3 characters.' }),
  image_url: z.string().url({ message: 'Please enter a valid image URL.' }).optional().or(z.literal('')),
  discount: z.coerce.number().int().min(0).max(100).optional().nullable(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

const AddProductForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      price: 0,
      unit: '',
      category: '',
      image_url: '',
      discount: null,
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const { error } = await supabase.from('products').insert([
        {
          name: data.name,
          price: data.price,
          unit: data.unit,
          category: data.category,
          image_url: data.image_url || null, // Ensure empty string becomes null
          discount: data.discount,
        },
      ]);

      if (error) {
        throw error;
      }

      toast({
        title: 'Product Added!',
        description: `${data.name} has been successfully added to the store.`,
      });
      form.reset();
      // Optionally navigate to shop page or product page
      // navigate('/shop'); 
    } catch (error: any) {
      console.error('Error adding product:', error);
      toast({
        title: 'Error Adding Product',
        description: error.message || 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Organic Apples" {...field} />
              </FormControl>
              <FormDescription>The full name of the product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="e.g., 2.99" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., per lb, each, 500g pack" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Fruits, Vegetables, Dairy" {...field} />
              </FormControl>
              <FormDescription>The category this product belongs to.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormDescription>Direct link to the product image.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount (%)</FormLabel>
              <FormControl>
                <Input type="number" step="1" min="0" max="100" placeholder="e.g., 10 for 10% (optional)" {...field} onChange={e => field.onChange(e.target.value === '' ? null : parseInt(e.target.value))} />
              </FormControl>
              <FormDescription>Optional discount percentage (0-100).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="bg-grocery-accent hover:bg-grocery-accent-hover text-white" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Adding Product...' : 'Add Product'}
        </Button>
      </form>
    </Form>
  );
};

export default AddProductForm;
