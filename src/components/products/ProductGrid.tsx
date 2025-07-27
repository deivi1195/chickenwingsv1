import { useProducts } from "@/context/ProductContext";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const { filteredProducts, categories, currentCategory, setCurrentCategory, totalResults } = useProducts();
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filter Header */}
      {/* <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg"> */}

      <div className="mb-6 flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">


      <h1 className="text-4xl font-bold text-black text-center">ORDENA AHORA</h1>
        {/* <div className="flex items-center gap-2 mb-4 sm:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          <span className="text-sm text-gray-500 font-medium">Filtering</span>
          <span className="text-sm ml-4">
            Showing <span className="font-bold">1-{filteredProducts.length}</span> of {totalResults} Results
          </span>
        </div> */}
        
        <div className="flex items-center gap-4">
          {/* Sorting Options - Could be expanded in a real app */}
          {/* <div className="flex items-center">
            <span className="text-sm mr-2">Sort By:</span>
            <select className="text-sm border rounded-md py-1 px-2">
              <option value="price">Price</option>
              <option value="name">Name</option>
              <option value="rating">Rating</option>
            </select>
          </div> */}
          
          {/* View Options */}
          {/* <div className="flex gap-2">
            <button className="p-1 bg-red-600 text-white rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
            </button>
            <button className="p-1 border rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="8" x2="21" y1="6" y2="6" />
                <line x1="8" x2="21" y1="12" y2="12" />
                <line x1="8" x2="21" y1="18" y2="18" />
                <line x1="3" x2="3.01" y1="6" y2="6" />
                <line x1="3" x2="3.01" y1="12" y2="12" />
                <line x1="3" x2="3.01" y1="18" y2="18" />
              </svg>
            </button>
          </div> */}
        </div>
      </div>
      
      {/* Category Tabs */}
      {/* <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setCurrentCategory(category.id)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                currentCategory === category.id
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div> */}
      
      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 px-2">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}