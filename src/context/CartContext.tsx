import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from '@/types';
import { CartService } from '@/lib/services';

// Define the context type
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

// Create the context with default values
const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartTotal: 0,
  cartCount: 0,
});

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  // State for cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = () => {
      const items = CartService.getCartItems();
      setCartItems(items);
      setCartTotal(CartService.getCartTotal());
      setCartCount(CartService.getCartCount());
    };

    loadCart();
    
    // Add event listener to update cart when localStorage changes in another tab
    window.addEventListener('storage', loadCart);
    
    return () => {
      window.removeEventListener('storage', loadCart);
    };
  }, []);

  // Add item to cart
  const addToCart = (productId: number) => {
    CartService.addToCart(productId);
    setCartItems(CartService.getCartItems());
    setCartTotal(CartService.getCartTotal());
    setCartCount(CartService.getCartCount());
  };

  // Remove item from cart
  const removeFromCart = (productId: number) => {
    CartService.removeFromCart(productId);
    setCartItems(CartService.getCartItems());
    setCartTotal(CartService.getCartTotal());
    setCartCount(CartService.getCartCount());
  };

  // Update item quantity
  const updateQuantity = (productId: number, quantity: number) => {
    CartService.updateQuantity(productId, quantity);
    setCartItems(CartService.getCartItems());
    setCartTotal(CartService.getCartTotal());
    setCartCount(CartService.getCartCount());
  };

  // Clear cart
  const clearCart = () => {
    CartService.clearCart();
    setCartItems([]);
    setCartTotal(0);
    setCartCount(0);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        cartTotal, 
        cartCount 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};