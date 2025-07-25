import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import CartItem from "../cart/CartItem";

export default function Header() {
  const { cartItems, cartTotal, cartCount } = useCart();
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-red-600 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M3 2h18" />
              <path d="M19 18V6.5a2.5 2.5 0 0 0-5 0V18" />
              <path d="M5 18V6.5a2.5 2.5 0 0 1 5 0V18" />
              <path d="M3 18h18" />
              <path d="M12 22v-4" />
              <path d="M16 6.5a2.5 2.5 0 0 0-5 0" />
            </svg>
          </div>
          <span className="text-xl font-bold uppercase">FoodKing</span>
        </Link>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/" className="font-semibold text-sm hover:text-red-600 transition-colors">
            HOME PAGE
          </Link>
          <Link to="/shop" className="font-semibold text-sm hover:text-red-600 transition-colors">
            SHOP
          </Link>
          <Link to="/blog" className="font-semibold text-sm hover:text-red-600 transition-colors">
            BLOG
          </Link>
          <Link to="/pages" className="font-semibold text-sm hover:text-red-600 transition-colors">
            PAGES
          </Link>
          <Link to="/contact" className="font-semibold text-sm hover:text-red-600 transition-colors">
            CONTACT
          </Link>
        </nav>
        
        {/* Cart and Contact Button */}
        <div className="flex items-center space-x-2">
          {/* Cart Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Shopping Cart</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cartItems.length === 0 ? (
                  <p className="text-center text-muted-foreground">Your cart is empty</p>
                ) : (
                  <>
                    {cartItems.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                    <div className="pt-4 border-t">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">
                        Checkout
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
          
          {/* Contact Button - Only visible on larger screens */}
          <Button className="hidden md:flex bg-red-600 hover:bg-red-700">
            CONTACT US
          </Button>
          
          {/* Mobile menu button */}
          <Button variant="outline" size="icon" className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
}