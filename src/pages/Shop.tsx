import Header from "@/components/layout/Header";
import ProductGrid from "@/components/products/ProductGrid";

export default function Shop() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      {/* Hero Banner */}
      <div className="relative bg-cover bg-center h-64" style={{ backgroundImage: "url('/src/assets/foods/mosaico-lineart.png')" }}>
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
          <h1 className="text-4xl font-bold text-white mb-2">Nuestro Menú</h1>
          {/* <div className="flex items-center text-sm text-white">
            <a href="/" className="hover:text-red-400">Inicio</a>
            <span className="mx-2">/</span>
            <span className="text-white font-medium">Menú</span>
          </div> */}
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
            <p className="text-gray-500"> 2025 ChickenWings. Todos los Derechos Reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}