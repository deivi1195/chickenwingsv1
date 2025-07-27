import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Menu, X, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

// Importar la imagen
const chickenWingsLogo = "/images/chickenwingssinfondo.png";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems, cartTotal, cartCount, removeFromCart } = useCart();
  
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
            MENU
          </Link>          
          {/* <Link to="/pages" className="font-semibold text-sm hover:text-red-600 transition-colors">
            HORARIOS
          </Link> */}
          <Link to="/cart" className="font-semibold text-sm hover:text-red-600 transition-colors">
            CARRITO
          </Link>
          <Link to="/direccion" className="font-semibold text-sm hover:text-red-600 transition-colors">
            UBICACION
          </Link>
        </nav>
        
        <div className="flex items-center space-x-2">
          {/* Carrito con Hover */}
          <HoverCard openDelay={100} closeDelay={200}>
            <HoverCardTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 p-0" align="end" sideOffset={10}>
              <div className="p-4">
                <h3 className="font-semibold mb-4">Tu Carrito</h3>
                {cartItems.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">No hay productos en el carrito</p>
                ) : (
                  <>
                    <div className="max-h-60 overflow-y-auto space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between border-b pb-2">
                          <div className="flex items-center gap-3">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-12 h-12 rounded-md object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{item.name}</p>
                              <p className="text-sm text-gray-500">
                                ${item.price.toFixed(2)} x {item.quantity}
                              </p>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFromCart(item.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between font-semibold mb-4">
                        <span>Total:</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      <Button className="w-full bg-red-600 hover:bg-red-700" asChild>
                        <Link to="/cart">Ver Carrito</Link>
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </HoverCardContent>
          </HoverCard>

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
                <nav className="flex-1 p-6 space-y-4">
                  <Link 
                    to="/" 
                    className="block py-2 hover:text-red-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Inicio
                  </Link>
                  <Link 
                    to="/shop" 
                    className="block py-2 hover:text-red-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Menú
                  </Link>
                  <Link 
                    to="/direccion" 
                    className="block py-2 hover:text-red-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Ubicación
                  </Link>
                </nav>
                
                {/* Carrito en menú móvil */}
                <div className="border-t p-6 mt-auto">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Tu Carrito</h4>
                    {cartItems.length === 0 ? (
                      <p className="text-sm text-gray-500">No hay productos en el carrito</p>
                    ) : (
                      <>
                        <div className="space-y-4 max-h-60 overflow-y-auto">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between border-b pb-2">
                              <div className="flex items-center gap-3">
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="w-12 h-12 rounded-md object-cover"
                                />
                                <div>
                                  <p className="font-medium text-sm">{item.name}</p>
                                  <p className="text-sm text-gray-500">
                                    ${item.price.toFixed(2)} x {item.quantity}
                                  </p>
                                </div>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-destructive"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-2 pt-2">
                          <div className="flex justify-between text-sm">
                            <span>Subtotal:</span>
                            <span>${cartTotal.toFixed(2)}</span>
                          </div>
                          <Button 
                            className="w-full bg-red-600 hover:bg-red-700 mt-2"
                            asChild
                          >
                            <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>
                              Ver Carrito
                            </Link>
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
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