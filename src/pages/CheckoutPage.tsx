
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, type CheckoutFormValues } from '../lib/validation';
import { useCartStore } from '../store/useCartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const CheckoutPage: React.FC = () => {
  const { items, totalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      postalCode: '',
      phone: '',
    }
  });

  const onSubmit = (data: CheckoutFormValues) => {
    // Simulate checkout process
    setTimeout(() => {
      toast.success('سفارش شما با موفقیت ثبت شد', {
        description: 'به زودی با شما تماس خواهیم گرفت.',
      });
      clearCart();
      navigate('/');
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">سبد خرید شما خالی است</h1>
        <p className="mb-8">برای خرید محصولات، به فروشگاه بازگردید.</p>
        <Button asChild>
          <a href="/products">مشاهده محصولات</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">تکمیل خرید</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">اطلاعات ارسال</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نام</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نام خانوادگی</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>آدرس</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>شهر</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>کد پستی</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>شماره تماس</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full bg-shop-accent hover:bg-shop-accent/90">
                  ثبت سفارش و پرداخت
                </Button>
              </form>
            </Form>
          </div>
        </div>
        
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">خلاصه سبد خرید</h2>
            
            <div className="divide-y">
              {items.map((item) => (
                <div key={item.id} className="py-4 flex">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-sm font-medium line-clamp-1">{item.title}</h4>
                    <div className="flex justify-between mt-1">
                      <span className="text-gray-500 text-sm">تعداد: {item.quantity}</span>
                      <span className="font-medium">{new Intl.NumberFormat('fa-IR').format(item.price * item.quantity)} تومان</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between mb-2">
                <span>قیمت کل:</span>
                <span className="font-medium">{new Intl.NumberFormat('fa-IR').format(totalPrice())} تومان</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>هزینه ارسال:</span>
                <span className="font-medium">رایگان</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                <span>مجموع:</span>
                <span>{new Intl.NumberFormat('fa-IR').format(totalPrice())} تومان</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
