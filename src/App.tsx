import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import Direccion from './pages/Direccion';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProductProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/direccion" element={<Direccion />} />
              <Route path="*" element={<NotFound />} />              
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </ProductProvider>
  </QueryClientProvider>
);

export default App;
