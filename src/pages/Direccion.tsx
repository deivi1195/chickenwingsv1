import { useEffect, useRef, useState } from 'react';
import Header from "@/components/layout/Header";

// Declaración de tipos para Google Maps
declare global {
  interface Window {
    google?: {
      maps: any;
    };
    initMap?: () => void;
  }
}

export default function Direccion() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  // Cargar el script de Google Maps
  useEffect(() => {
    if (!apiKey) {
      console.error('Google Maps API key no encontrada');
      return;
    }

    // Verificar si ya está cargado
    if (window.google?.maps) {
      setMapLoaded(true);
      return;
    }

    // Verificar si ya hay un script cargando
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      console.log('Google Maps script ya está cargando');
      return;
    }
    
    // Crear el script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      console.log('Google Maps script cargado correctamente');
      setMapLoaded(true);
    };
    
    script.onerror = (error) => {
      console.error('Error cargando Google Maps:', error);
    };
    
    document.head.appendChild(script);
    
    return () => {
      // No remover el script para evitar problemas de recarga
    };
  }, [apiKey]);
  
  // Estilos para el contenedor del mapa
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestra Ubicación</h1>
          <p className="text-xl opacity-90">Visítanos en nuestro restaurante</p>
        </div>
      </div>

      {/* Mapa y Dirección */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Encuéntranos</h2>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Mapa */}
                <div className="h-full">
                  <div style={mapContainerStyle} ref={mapRef}>
                    {mapLoaded ? (
                      <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0, borderRadius: '0.5rem' }}
                        src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=10.1396149,-67.9349519&zoom=15`}
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-100 rounded">
                        <p>Cargando mapa...</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Información de contacto */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Dirección</h3>
                    <p className="text-gray-600">43Q8+R2V Flor Amarillo, Carabobo</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Horario de atención</h3>
                    <p className="text-gray-600">Martes a Domingo: 12:00 PM - 11:00 PM</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Teléfono</h3>
                    <p className="text-gray-600">+57 123 456 7890</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Correo electrónico</h3>
                    <p className="text-gray-600">info@chickenwings.com</p>
                  </div>
                  
                  <div className="pt-4">
                    <a 
                      href="https://maps.google.com/maps/dir//10.1396149,-67.9349519/@10.1396149,-67.9349519,18z" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-300"
                    >
                      Cómo llegar
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} ChickenWings. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
