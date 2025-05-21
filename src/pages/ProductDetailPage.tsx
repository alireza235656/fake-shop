
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '../lib/api';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '../store/useCartStore';
import { toast } from 'sonner';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const addItem = useCartStore(state => state.addItem);
  
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(Number(id)),
    enabled: !!id,
  });

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      toast.success('محصول به سبد خرید اضافه شد', {
        description: product.title,
        action: {
          label: 'مشاهده سبد',
          onClick: () => window.location.href = '/cart'
        }
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 bg-gray-100 animate-pulse h-96 rounded-lg"></div>
          <div className="md:w-1/2">
            <div className="bg-gray-100 animate-pulse h-12 w-3/4 mb-4 rounded"></div>
            <div className="bg-gray-100 animate-pulse h-6 w-1/4 mb-6 rounded"></div>
            <div className="bg-gray-100 animate-pulse h-32 w-full mb-6 rounded"></div>
            <div className="bg-gray-100 animate-pulse h-12 w-1/3 mb-4 rounded"></div>
            <div className="bg-gray-100 animate-pulse h-12 w-1/2 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <p className="text-center text-lg">محصول یافت نشد.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2">
          <div className="bg-white rounded-lg shadow-md p-8">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-auto max-h-96 object-contain mx-auto"
            />
          </div>
        </div>
        
        {/* Product Details */}
        <div className="md:w-1/2">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.title}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center text-amber-500 mr-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  size={18} 
                  fill={star <= Math.round(product.rating.rate) ? "currentColor" : "none"} 
                  className="mr-1"
                />
              ))}
              <span className="text-gray-600 ml-2">
                {product.rating.rate} ({product.rating.count} نظر)
              </span>
            </div>
          </div>
          
          <div className="text-2xl font-bold text-shop-accent mb-6">
            {new Intl.NumberFormat('fa-IR').format(product.price)} تومان
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">توضیحات:</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">ویژگی‌ها:</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check size={18} className="text-green-500 mr-2" />
                <span>گارانتی اصالت و سلامت فیزیکی کالا</span>
              </li>
              <li className="flex items-center">
                <Check size={18} className="text-green-500 mr-2" />
                <span>ارسال سریع و مطمئن</span>
              </li>
              <li className="flex items-center">
                <Check size={18} className="text-green-500 mr-2" />
                <span>امکان پرداخت در محل (در برخی از شهرها)</span>
              </li>
            </ul>
          </div>
          
          <div className="flex space-x-4 space-x-reverse">
            <Button 
              className="bg-shop-accent text-white hover:bg-shop-accent/90 px-6 py-2 rounded flex items-center"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={18} className="ml-2" />
              افزودن به سبد خرید
            </Button>
            
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded">
              افزودن به علاقه‌مندی‌ها
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
