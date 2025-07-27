import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import CartItem from "../cart/CartItem";

// Importar la imagen
const chickenWingsLogo = "/images/chickenwingssinfondo.png";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems, cartTotal, cartCount } = useCart();
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="h-16 w-18">
            <img 
              src={chickenWingsLogo} 
              alt="ChickenWings Logo" 
              className="h-full w-full object-contain"
            />
          </div>
          <span className="text-xl font-bold uppercase">ChickenWings</span>
        </Link>
        
        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/" className="font-semibold text-sm hover:text-red-600 transition-colors" 
                onClick={() => window.scrollTo(0, 0)}>
            INICIO
          </Link>
          <Link to="/shop" className="font-semibold text-sm hover:text-red-600 transition-colors" 
                onClick={() => window.scrollTo(0, 0)}>
            ORDENA
          </Link>
          <Link to="/blog" className="font-semibold text-sm hover:text-red-600 transition-colors">
            BLOG
          </Link>
          <Link to="/pages" className="font-semibold text-sm hover:text-red-600 transition-colors">
            HORARIOS
          </Link>
          <Link to="/direccion" className="font-semibold text-sm hover:text-red-600 transition-colors">
            DIRECCION
          </Link>
        </nav>
        
        <div className="flex items-center space-x-2">
          {/* Carrito */}
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
              <div className="h-full flex flex-col">
                <h3 className="text-lg font-semibold mb-6">Tu Carrito</h3>
                <div className="flex-1 overflow-y-auto">
                  {cartItems.length === 0 ? (
                    <p className="text-center text-gray-500 mt-8">Tu carrito está vacío</p>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <CartItem key={item.id} item={item} />
                      ))}
                    </div>
                  )}
                </div>
                {cartItems.length > 0 && (
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between text-lg font-semibold mb-4">
                      <span>Total:</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      Pagar Ahora
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Botón de menú móvil */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold">Menú</h3>
                </div>
                <nav className="flex-1 p-6 space-y-2">
                  <Link 
                    to="/" 
                    className="flex items-center p-4 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <span className="font-medium">INICIO</span>
                  </Link>
                  <Link 
                    to="/shop" 
                    className="flex items-center p-4 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <span className="font-medium">ORDENA</span>
                  </Link>
                  <Link 
                    to="/blog" 
                    className="flex items-center p-4 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="font-medium">BLOG</span>
                  </Link>
                  <Link 
                    to="/pages" 
                    className="flex items-center p-4 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="font-medium">HORARIOS</span>
                  </Link>
                  <Link 
                    to="/direccion" 
                    className="flex items-center p-4 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="font-medium">DIRECCIÓN</span>
                  </Link>
                </nav>
                <div className="p-6 border-t">
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    CONTACTANOS
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Botón de contacto (solo escritorio) */}
          <Button className="hidden md:flex bg-red-600 hover:bg-red-700">
            CONTACTANOS
          </Button>
        </div>
      </div>
    </header>
  );
}