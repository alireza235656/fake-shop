
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../lib/api';
import { useCartStore } from '../store/useCartStore';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success('محصول به سبد خرید اضافه شد', {
      description: product.title,
      action: {
        label: 'مشاهده سبد',
        onClick: () => window.location.href = '/cart'
      }
    });
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden product-card-shadow transition-all hover:shadow-lg">
      <Link to={`/product/${product.id}`}>
        <div className="product-image-container h-64">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-contain p-4"
          />
        </div>
        
        <div className="p-4">
          <h3 className="text-shop-text font-medium text-sm line-clamp-1">{product.title}</h3>
          
          <div className="flex items-center mt-2 text-amber-500">
            <Star size={16} fill="currentColor" />
            <span className="ml-1 text-xs">{product.rating.rate}</span>
            <span className="text-gray-400 text-xs ml-2">({product.rating.count} نظر)</span>
          </div>
          
          <div className="mt-3 flex items-center justify-between">
            <p className="font-bold text-shop-text">
              {new Intl.NumberFormat('fa-IR').format(product.price)} تومان
            </p>
            
            <button 
              onClick={handleAddToCart}
              className="bg-shop-accent text-white p-2 rounded-full hover:bg-shop-accent/90 transition-colors"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
