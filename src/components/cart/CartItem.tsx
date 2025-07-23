import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { CartItem as CartItemType } from "@/types";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  
  // Increase quantity
  const increaseQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };
  
  // Decrease quantity
  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };
  
  return (
    <div className="flex gap-4">
      {/* Product image */}
      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
        <img 
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Product details */}
      <div className="flex-1">
        <h4 className="font-medium">{item.name}</h4>
        <div className="text-sm text-muted-foreground mb-2">
          ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
        </div>
        
        {/* Quantity controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 p-0" 
              onClick={decreaseQuantity}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 p-0" 
              onClick={increaseQuantity}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          {/* Remove button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-red-500" 
            onClick={() => removeFromCart(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}