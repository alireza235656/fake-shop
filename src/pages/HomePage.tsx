
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchCategories } from '../lib/api';
import ProductCard from '../components/ProductCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';

const HomePage: React.FC = () => {
  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  return (
    <div className="bg-shop-background min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-shop-primary to-shop-primary/90 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pl-8 text-center md:text-right">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              بهترین محصولات را در <span className="text-shop-accent">فروشگاه عسکری</span> پیدا کنید
            </h1>
            <p className="text-lg mb-8 text-gray-100">
              مجموعه‌ای کامل از محصولات با کیفیت و قیمت مناسب، برای سلیقه‌های مختلف
            </p>
            <div className="flex justify-center md:justify-start space-x-4 space-x-reverse">
              <Button className="bg-shop-accent hover:bg-shop-accent/90 text-white px-8 py-3 rounded-lg font-medium text-base">
                مشاهده محصولات
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-shop-primary px-8 py-3 rounded-lg font-medium text-base">
                درباره ما
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
              alt="Shopping" 
              className="rounded-lg shadow-2xl max-w-full mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">محصولات برگزیده</h2>
          
          <div className="mb-10">
            {categoriesLoading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-shop-accent"></div>
              </div>
            ) : (
              <Tabs defaultValue="all" dir="rtl" className="w-full">
                <TabsList className="flex flex-wrap justify-center mb-8">
                  <TabsTrigger value="all">همه</TabsTrigger>
                  {categories?.map((category) => (
                    <TabsTrigger key={category} value={category}>
                      {category === "men's clothing" ? "لباس مردانه" :
                       category === "women's clothing" ? "لباس زنانه" :
                       category === "electronics" ? "الکترونیک" :
                       category === "jewelery" ? "جواهرات" : category}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="all" className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {productsLoading ? (
                      Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="bg-gray-100 animate-pulse rounded-lg h-80"></div>
                      ))
                    ) : (
                      products?.slice(0, 8).map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))
                    )}
                  </div>
                </TabsContent>
                
                {categories?.map((category) => (
                  <TabsContent key={category} value={category} className="mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {productsLoading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className="bg-gray-100 animate-pulse rounded-lg h-80"></div>
                        ))
                      ) : (
                        products?.filter(p => p.category === category)
                          .slice(0, 8)
                          .map((product) => (
                            <ProductCard key={product.id} product={product} />
                          ))
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </div>
          
          <div className="text-center">
            <Button asChild className="bg-shop-secondary hover:bg-shop-secondary/90">
              <a href="/products">مشاهده همه محصولات <ShoppingCart size={16} className="mr-2" /></a>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">چرا فروشگاه عسکری را انتخاب کنید؟</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-shop-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">کیفیت تضمینی</h3>
              <p className="text-gray-600">تمامی محصولات ما دارای گارانتی اصالت و کیفیت هستند.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">ارسال سریع</h3>
              <p className="text-gray-600">ارسال سریع و مطمئن به سراسر کشور با بسته‌بندی استاندارد.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">پرداخت امن</h3>
              <p className="text-gray-600">پرداخت ایمن و مطمئن با درگاه‌های بانکی معتبر.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
