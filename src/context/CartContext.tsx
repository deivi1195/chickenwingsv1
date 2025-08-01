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
  notification: { show: boolean; message: string };
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
  notification: { show: false, message: '' },
});

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  // State for cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [notification, setNotification] = useState({ show: false, message: '' });

  // Show notification
  const showNotification = (message: string) => {
    setNotification({ show: true, message });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 1000);
  };

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
    showNotification('Producto agregado al carrito');
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
        cartCount,
        notification
      }}
    >
      {children}
      {notification.show && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <path d="m9 11 3 3L22 4"/>
          </svg>
          <span>{notification.message}</span>
        </div>
      )}
    </CartContext.Provider>
  );
};