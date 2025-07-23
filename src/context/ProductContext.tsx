import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types';
import { ProductService } from '@/lib/services';
import { categories } from '@/data/products';

// Define the context type
interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  categories: { id: string; name: string }[];
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
  toggleFavorite: (productId: number) => void;
  totalResults: number;
}

// Create the context with default values
const ProductContext = createContext<ProductContextType>({
  products: [],
  filteredProducts: [],
  categories: [],
  currentCategory: 'all',
  setCurrentCategory: () => {},
  toggleFavorite: () => {},
  totalResults: 0
});

// Custom hook to use the product context
export const useProducts = () => useContext(ProductContext);

// Provider component
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  // State for products and filtering
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentCategory, setCurrentCategory] = useState('all');

  // Load products on mount
  useEffect(() => {
    loadProducts();
    
    // Add event listener to update products when localStorage changes in another tab
    window.addEventListener('storage', loadProducts);
    
    return () => {
      window.removeEventListener('storage', loadProducts);
    };
  }, []);

  // Load products function
  const loadProducts = () => {
    const allProducts = ProductService.getProducts();
    setProducts(allProducts);
    filterProducts(allProducts, currentCategory);
  };

  // Filter products when category changes
  useEffect(() => {
    filterProducts(products, currentCategory);
  }, [currentCategory, products]);

  // Function to filter products by category
  const filterProducts = (products: Product[], category: string) => {
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  // Toggle favorite status for a product
  const toggleFavorite = (productId: number) => {
    ProductService.toggleFavorite(productId);
    loadProducts();
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        categories,
        currentCategory,
        setCurrentCategory,
        toggleFavorite,
        totalResults: filteredProducts.length
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};