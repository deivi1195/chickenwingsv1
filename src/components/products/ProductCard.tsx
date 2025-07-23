import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import { Product } from "@/types";
import { Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleFavorite } = useProducts();
  const { addToCart } = useCart();
  
  // Calculate discount percentage
  const discountPercentage = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;
  
  // Handle add to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product.id);
  };
  
  // Handle toggle favorite
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };
  
  return (
    <Card className="overflow-hidden border-0 bg-white hover:bg-gray-50 transition-all duration-300 group relative">
      {/* Product Image with Favorite Button */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Button
          variant="outline"
          size="icon"
          className={`absolute top-2 right-2 rounded-full bg-white ${
            product.isFavorite ? 'text-red-500' : 'text-gray-500'
          }`}
          onClick={handleToggleFavorite}
        >
          <Heart 
            className={`h-4 w-4 ${product.isFavorite ? 'fill-current' : ''}`} 
          />
        </Button>
        
        {/* Discount Tag */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
            -{discountPercentage}%
          </div>
        )}
        
        {/* Quick Add Button - Appears on Hover */}
        <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white py-3 flex justify-center 
                      translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button 
            className="font-medium text-sm flex items-center"
            onClick={handleAddToCart}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              className="mr-2"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            Agregar al Carrito
          </button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        {/* Price */}
        <div className="flex gap-2 mb-1">
          <span className="text-red-600 font-bold">${product.price.toFixed(2)}</span>
          {product.oldPrice && (
            <span className="text-gray-500 line-through text-sm">${product.oldPrice.toFixed(2)}</span>
          )}
        </div>
        
        {/* Title */}
        <h3 className="font-bold text-sm uppercase mb-1">{product.name}</h3>
        
        {/* Rating */}
        <div className="flex mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={i < product.rating ? "orange" : "none"}
              stroke="orange"
              strokeWidth="1.5"
              className="mr-0.5"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>
        
        {/* Add to Cart Button */}
        <Button 
          className="w-full bg-zinc-900 hover:bg-black text-white"
          onClick={handleAddToCart}
        >
          Add To Cart
        </Button>
      </div>
    </Card>
  );
}