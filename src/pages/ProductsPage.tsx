
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchCategories, Product } from '../lib/api';
import ProductCard from '../components/ProductCard';
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = products?.filter(product => {
    // Filter by search term
    const matchesSearch = searchTerm === '' || 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by categories
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(product.category);
    
    // Filter by price
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const maxPrice = products ? Math.max(...products.map(p => p.price)) : 1000;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">محصولات</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">فیلترها</h2>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">جستجو</label>
              <Input
                type="text"
                placeholder="نام محصول..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">دسته‌بندی</h3>
              {categoriesLoading ? (
                <div className="animate-pulse h-20 bg-gray-200 rounded"></div>
              ) : (
                <div className="space-y-2">
                  {categories?.map((category) => (
                    <div key={category} className="flex items-center space-x-2 space-x-reverse text-right">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category === "men's clothing" ? "لباس مردانه" :
                         category === "women's clothing" ? "لباس زنانه" :
                         category === "electronics" ? "الکترونیک" :
                         category === "jewelery" ? "جواهرات" : category}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-3">قیمت</h3>
              <Slider
                defaultValue={[0, maxPrice]}
                min={0}
                max={maxPrice}
                step={1}
                value={[priceRange[0], priceRange[1]]}
                onValueChange={(value) => setPriceRange([value[0], value[1]])}
                className="mb-4"
              />
              <div className="flex items-center justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="lg:w-3/4">
          {productsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="bg-gray-100 animate-pulse rounded-lg h-80"></div>
              ))}
            </div>
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">هیچ محصولی یافت نشد.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
