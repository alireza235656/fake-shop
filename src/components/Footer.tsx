
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-shop-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">فروشگاه عسکری</h3>
            <p className="text-gray-300 text-sm">
              فروشگاه عسکری ، مرجع خرید آنلاین با تضمین کیفیت و قیمت مناسب. ما همواره به دنبال ارائه بهترین محصولات با بالاترین کیفیت هستیم.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-4">دسترسی سریع</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">خانه</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors">محصولات</Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-300 hover:text-white transition-colors">دسته‌بندی‌ها</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">درباره ما</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-4">خدمات مشتریان</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">سوالات متداول</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-white transition-colors">شیوه‌های ارسال</Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-white transition-colors">بازگرداندن کالا</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">تماس با ما</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-4">تماس با ما</h3>
            <address className="text-gray-300 not-italic">
              <p className="mb-2">تهران، خیابان سهروردی شمالی</p>
              <p className="mb-2">شماره تماس: 09121837052</p>
              <p>ایمیل: info@test.com</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
          <p>© 1404 فروشگاه عسکری - تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
