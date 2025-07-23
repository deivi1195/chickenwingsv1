import Header from "@/components/layout/Header";
import ProductGrid from "@/components/products/ProductGrid";

export default function Shop() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      {/* Hero Banner */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Our Menu</h1>
          <div className="flex items-center text-sm text-gray-500">
            <a href="/" className="hover:text-red-600">Home</a>
            <span className="mx-2">/</span>
            <span className="text-gray-800">Shop</span>
          </div>
        </div>
      </div>
      
      {/* Products Section */}
      <div className="flex-1">
        <ProductGrid />
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-500">© 2025 FoodKing. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}