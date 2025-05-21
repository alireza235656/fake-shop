
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

interface NavbarProps {
  toggleCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleCart }) => {
  const totalItems = useCartStore(state => state.totalItems);
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center lg:hidden">
          <button className="text-shop-primary p-2">
            <Menu size={24} />
          </button>
        </div>

        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-shop-primary">
            <span className="text-shop-accent">فروشگاه </span> عسکری
          </Link>
        </div>

        <nav className="hidden lg:block">
          <ul className="flex space-x-8 text-shop-text">
            <li className="px-4">
              <Link to="/" className="font-medium hover:text-shop-accent transition-colors">
                خانه
              </Link>
            </li>
            <li className="px-4">
              <Link to="/products" className="font-medium hover:text-shop-accent transition-colors">
                محصولات
              </Link>
            </li>
            <li className="px-4">
              <Link to="/categories" className="font-medium hover:text-shop-accent transition-colors">
                دسته‌بندی‌ها
              </Link>
            </li>
            <li className="px-4">
              <Link to="/about" className="font-medium hover:text-shop-accent transition-colors">
                درباره ما
              </Link>
            </li>
            <li className="px-4">
              <Link to="/contact" className="font-medium hover:text-shop-accent transition-colors">
                تماس با ما
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center space-x-4">
          <button className="text-shop-text p-2 hover:text-shop-accent transition-colors">
            <Search size={22} />
          </button>
          <Link to="/account" className="text-shop-text p-2 hover:text-shop-accent transition-colors">
            <User size={22} />
          </Link>
          <button 
            className="text-shop-text p-2 hover:text-shop-accent transition-colors relative" 
            onClick={toggleCart}
          >
            <ShoppingCart size={22} />
            {totalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-shop-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems()}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
