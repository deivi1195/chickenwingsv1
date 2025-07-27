import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import { Product } from "@/types";
import { Plus, ShoppingBasket, Utensils } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product.id);
  };
  
  return (
    <div 
      className="h-[32rem] w-80 overflow-hidden rounded-3xl group relative bg-white shadow-[4px_4px_12px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_16px_rgba(0,0,0,0.15)] transition-all duration-300 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fondo que se expande en hover con desvanecimiento */}
      <div className="absolute inset-0 bg-orange-600 origin-top transform scale-y-0 group-hover:scale-y-100 transition-all duration-500 ease-out rounded-2xl opacity-0 group-hover:opacity-100" />
      
      <div className="p-6 flex flex-col items-center h-full relative z-10 mt-7 transition-all duration-500">
        {/* Imagen del producto con efecto de desvanecimiento */}
        <div className="w-48 h-48 rounded-2xl overflow-hidden mt-4 transition-all duration-500 transform group-hover:scale-105">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90"
          />
        </div>
        
        {/* Contenedor para nombre, precio y botón */}
        <div className="flex flex-col items-center space-y-2 flex-grow justify-end w-full mb-12 mt-2 transition-all duration-500">
          {/* Botón de agregar al carrito con efecto fade-in */}
          <div className={`w-full flex justify-center mt-5 transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button
              onClick={handleAddToCart}
              className="bg-red-500 hover:bg-red-600 group-hover:bg-yellow-500 group-hover:text-black text-white py-1 px-8  mb-5 rounded-full text-base font-medium flex items-center justify-center gap-2 transition-all duration-300 whitespace-nowrap transform hover:scale-105"
            >
              <ShoppingBasket className="w-5 h-5" />
              Agregar
            </button>
          </div>

          {/* Nombre del producto con efecto de desvanecimiento */}
          <h3 className="font-medium text-center text-lg line-clamp-2 group-hover:text-white transition-all duration-500 px-2 mt-2">
            {product.name}
          </h3>
          
          {/* Precio con efecto de desvanecimiento */}
          <div className="text-2xl font-bold text-red-600 group-hover:text-white transition-all duration-500">
            ${product.price.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}