
import React from 'react';
import { X, Plus, Minus, Trash } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />
      
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out animate-slide-in">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold">سبد خرید</h2>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
              <X size={24} />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              <p className="text-lg text-gray-500 mb-4">سبد خرید شما خالی است</p>
              <Button onClick={onClose} className="bg-shop-accent hover:bg-shop-accent/90">
                ادامه خرید
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4">
                {items.map((item) => (
                  <div key={item.id} className="flex border-b py-4">
                    <div className="w-20 h-20 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 px-4">
                      <h3 className="text-sm font-medium line-clamp-2">{item.title}</h3>
                      <p className="text-shop-accent font-semibold mt-1">
                        {new Intl.NumberFormat('fa-IR').format(item.price)} تومان
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 mb-2"
                      >
                        <Trash size={16} />
                      </button>
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-2 py-1 hover:bg-gray-100"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-2 py-1 min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold">مجموع:</span>
                  <span className="font-bold text-lg">
                    {new Intl.NumberFormat('fa-IR').format(totalPrice())} تومان
                  </span>
                </div>
                <div className="space-y-2">
                  <Link
                    to="/checkout"
                    className="block w-full bg-shop-accent text-white py-3 px-4 rounded text-center font-medium hover:bg-shop-accent/90"
                    onClick={onClose}
                  >
                    تسویه حساب
                  </Link>
                  <button
                    onClick={onClose}
                    className="block w-full bg-transparent border border-shop-primary text-shop-primary py-3 px-4 rounded text-center font-medium hover:bg-shop-primary/5"
                  >
                    ادامه خرید
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
