
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast"; // Corrected import path

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters."}),
  message: z.string().min(10, { message: "Message must be at least 10 characters." })
});

type ContactFormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log(data);
    // Here you would typically send the data to a backend or email service
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
    });
    form.reset();
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto max-w-screen-lg px-4">
          <div className="text-center mb-12">
            <Mail className="mx-auto h-16 w-16 text-grocery-accent mb-4" />
            <h1 className="text-4xl font-bold text-gray-800">Get In Touch</h1>
            <p className="mt-4 text-lg text-gray-600">We'd love to hear from you! Send us a message or find our contact details below.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">Send Us a Message</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Enquiry about fresh vegetables" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your message..." className="min-h-[120px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-grocery-accent hover:bg-grocery-accent-hover text-white">
                    Send Message
                  </Button>
                </form>
              </Form>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">Contact Information</h2>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-grocery-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-700">Address</h3>
                    <p>123 Grocery Street</p>
                    <p>Fresh City, FC 12345</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-grocery-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-700">Phone</h3>
                    <a href="tel:+1234567890" className="hover:text-grocery-accent">(123) 456-7890</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-grocery-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-700">Email</h3>
                    <a href="mailto:info@freshgrocer.com" className="hover:text-grocery-accent">info@freshgrocer.com</a>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                 <h3 className="text-xl font-semibold text-gray-700 mb-3">Business Hours</h3>
                 <p className="text-gray-600">Monday - Friday: 9:00 AM - 7:00 PM</p>
                 <p className="text-gray-600">Saturday: 10:00 AM - 5:00 PM</p>
                 <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
