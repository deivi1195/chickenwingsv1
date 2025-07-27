// Services to handle backend functionality with localStorage
import { Product, CartItem } from '@/types';
import { products as initialProducts } from '@/data/products';

// Service for handling products
export const ProductService = {
  // Get all products, with optional filtering by category
  getProducts: (category: string = 'all'): Product[] => {
    // Try to get products from localStorage first
    let products = JSON.parse(localStorage.getItem('products') || 'null');
    
    // If no products in localStorage, use the initial products data
    //if (!products) {
      products = initialProducts;
      localStorage.setItem('products', JSON.stringify(products));
 //   }
    
    // Filter by category if specified
    if (category && category !== 'all') {
      return products.filter((product: Product) => product.category === category);
    }
    
    return products;
  },
  
  // Toggle favorite status for a product
  toggleFavorite: (productId: number): void => {
    const products = ProductService.getProducts();
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        return { ...product, isFavorite: !product.isFavorite };
      }
      return product;
    });
    
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  },
  
  // Get product by ID
  getProductById: (productId: number): Product | undefined => {
    const products = ProductService.getProducts();
    return products.find(product => product.id === productId);
  }
};

// Service for handling shopping cart
export const CartService = {
  // Get cart items
  getCartItems: (): CartItem[] => {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  },
  
  // Add item to cart
  addToCart: (productId: number): void => {
    const product = ProductService.getProductById(productId);
    if (!product) return;
    
    const cartItems = CartService.getCartItems();
    const existingItem = cartItems.find(item => item.id === productId);
    
    if (existingItem) {
      // If item already exists, increase quantity
      const updatedCart = cartItems.map(item => 
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      // Add new item with quantity 1
      const newCart = [...cartItems, { ...product, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  },
  
  // Remove item from cart
  removeFromCart: (productId: number): void => {
    const cartItems = CartService.getCartItems();
    const updatedCart = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  },
  
  // Update item quantity
  updateQuantity: (productId: number, quantity: number): void => {
    if (quantity <= 0) {
      CartService.removeFromCart(productId);
      return;
    }
    
    const cartItems = CartService.getCartItems();
    const updatedCart = cartItems.map(item => 
      item.id === productId ? { ...item, quantity } : item
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  },
  
  // Clear cart
  clearCart: (): void => {
    localStorage.setItem('cart', JSON.stringify([]));
  },
  
  // Get cart total
  getCartTotal: (): number => {
    const cartItems = CartService.getCartItems();
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
  
  // Get cart count (total number of items)
  getCartCount: (): number => {
    const cartItems = CartService.getCartItems();
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }
};