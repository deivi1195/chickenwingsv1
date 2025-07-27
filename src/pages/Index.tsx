import { useRef, useEffect } from 'react';
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProductCard from "@/components/products/ProductCard";
import { useProducts } from "@/context/ProductContext";

export default function Index() {
  const { products } = useProducts();
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Get featured products (first 4 products)
  const featuredProducts = products.slice(0, 4);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.marginTop = '100vh';
      contentRef.current.style.position = 'relative';
    }
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section - Fijo */}
      <section className="fixed top-0 left-0 w-full h-screen -z-10">
        <div 
          className="w-full h-full bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('/src/assets/foods/hero-bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
      </section>
      
      {/* Contenido que se desliza sobre el hero */}
      <div ref={contentRef} className="z-10">
        {/* Features Section */}
        <section className="py-16 bg-gray-200">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-7">¿Antojo de alitas?</h2>
              <p className="text-gray-600 max-w-3xl text-2xl font-bold mx-auto mb-4">
              ¡Llegaste al lugar indicado! En ChickeWings, transformamos las alitas de pollo en una experiencia inolvidable.
              </p>
              <p className="text-gray-600 max-w-3xl text-2xl font-bold mx-auto">
              Prepárate para descubrir sabores explosivos, texturas crujientes y una variedad que te hará volver por más.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    className="text-red-600"
                  >
                    <path d="M12 2c-3.1 0-6 2.4-6 5.5 0 4.5 6 8.5 6 8.5s6-4 6-8.5c0-3.1-2.9-5.5-6-5.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Easy To Order</h3>
                <p className="text-gray-600">
                  You only need a few steps to order your food through our website or app
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    className="text-red-600"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Fastest Delivery</h3>
                <p className="text-gray-600">
                  We deliver your order as fast as possible to your doorstep
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    className="text-red-600"
                  >
                    <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
                    <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Best Quality</h3>
                <p className="text-gray-600">
                  We use only the best ingredients to prepare your meals
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className="py-16 bg-gray-200">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Popular Items</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Most ordered items by our customers
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="text-center">
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <Link to="/shop">View All Products</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Download Our Mobile App</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get exclusive offers and order on the go with our mobile application
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-red-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-2"
                >
                  <path d="M17.928 2.073a12 12 0 0 0-11.856 0A11.83 11.83 0 0 0 .008 11.57c.06 2.655.97 5.23 2.607 7.34l.001.001c1.797 2.326 4.42 3.953 7.43 4.61a12 12 0 0 0 3.908 0c3.01-.657 5.633-2.284 7.43-4.61l.001-.001a11.83 11.83 0 0 0 2.607-7.34c-.06-3.653-1.62-7.123-4.064-9.497zM12 8a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z" />
                </svg>
                App Store
              </Button>
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-red-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-2"
                >
                  <path d="m12 6.54 8.027 4.62L12 15.78 3.973 11.16 12 6.54zM2.182 9.755v6.43l8.637 4.976V14.76L2.182 9.755zm19.636 0-8.637 5.005v6.401l8.637-4.976v-6.43z" />
                </svg>
                Google Play
              </Button>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-gray-100 py-8">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-gray-500"> 2025 FoodKing. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}