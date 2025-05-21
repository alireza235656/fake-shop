
import axios from 'axios';

export const BASE_URL = 'https://fakestoreapi.com';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

// API functions
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  return response.data;
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const fetchCategories = async (): Promise<string[]> => {
  const response = await api.get('/products/categories');
  return response.data;
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  const response = await api.get(`/products/category/${category}`);
  return response.data;
};
