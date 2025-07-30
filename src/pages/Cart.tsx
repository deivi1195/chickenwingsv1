import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import Header from "@/components/layout/Header";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [delivery, setDelivery] = useState(true);
  const deliveryFee = 5.99; // Costo de envío

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handlePromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para aplicar código de promoción
    console.log("Aplicando código de promoción:", promoCode);
  };

  const subtotal = cartTotal;
  const total = delivery ? subtotal + deliveryFee : subtotal;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <div className="relative bg-red-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Carrito de Compras</h1>
            <p className="text-xl opacity-90">Tu carrito está vacío</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden p-8 text-center">
              <p className="text-gray-600 mb-6">No hay productos en tu carrito de compras.</p>
              <Button asChild>
                <Link to="/shop">Continuar Comprando</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Carrito de Compras</h1>
          <p className="text-xl opacity-90">Revisa y confirma tu pedido</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-2">Producto</th>
                      <th className="text-right py-4 px-2">Precio</th>
                      <th className="text-center py-4 px-2">Cantidad</th>
                      <th className="text-right py-4 px-2">Subtotal</th>
                      <th className="text-right py-4 px-2">Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="font-medium">{item.name}</span>
                          </div>
                        </td>
                        
                        <td className="text-right py-4 px-2">
                          ${item.price.toFixed(2)}
                        </td>
                        
                        <td className="py-4 px-2">
                          <div className="flex items-center justify-center">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <Input 
                              type="number" 
                              className="w-16 text-center mx-2 h-8" 
                              value={item.quantity}
                              min="1"
                              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                            />
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </td>
                        
                        <td className="text-right py-4 px-2">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                        
                        <td className="text-right py-4 px-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-destructive hover:text-destructive/90"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Código de Promoción y Actualizar Carrito */}
              <div className="flex flex-col md:flex-row justify-between gap-4 mt-8">
                <form onSubmit={handlePromoCode} className="flex gap-2">
                  <Input 
                    placeholder="Código de promoción" 
                    className="max-w-xs" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button type="submit" variant="outline">
                    Aplicar
                  </Button>
                </form>
                <Button variant="outline">
                  Actualizar Carrito
                </Button>
              </div>
              
              {/* Resumen del Pedido */}
              <div className="mt-12 border-t pt-8">
                <h2 className="text-2xl font-bold mb-6">Resumen del Pedido</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="space-y-6">
                    <div className="flex justify-between max-w-xs ml-auto">
                      <span className="mr-8">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between border-t pt-4 max-w-xs ml-auto">
                      <div className="flex items-center gap-2">
                        
                        <label htmlFor="delivery" className="text-sm font-medium">
                          Envío
                        </label>
                        <Checkbox 
                          id="delivery" 
                          checked={delivery}
                          onCheckedChange={(checked) => setDelivery(checked === true)}
                        />
                      </div>
                      <span>{delivery ? `$${deliveryFee.toFixed(2)}` : '$0.00'}</span>
                    </div>
                    
                    <div className="flex justify-between text-lg font-bold border-t pt-4 max-w-xs ml-auto">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-end mt-6">
                      <Button asChild size="lg">
                        <Link to="/checkout">Proceder al Pago</Link>
                      </Button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
