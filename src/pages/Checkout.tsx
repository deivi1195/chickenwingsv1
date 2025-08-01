import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "El nombre es requerido" }),
  lastName: z.string().min(2, { message: "El apellido es requerido" }),
  idNumber: z.string().min(7, { message: "La cédula debe tener al menos 7 dígitos" }),
  phone: z.string().min(8, { message: "El teléfono es requerido" }),
  address: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      idNumber: "",
      phone: "",
      address: ""
    }
  });

  const { register, handleSubmit, formState: { errors } } = form;

  const onSubmit = (data: FormValues) => {
    console.log("Datos del formulario:", data);
    console.log("Productos:", cartItems);
    
    // Aquí iría la lógica para enviar el pedido
    // Por ahora, solo mostramos el mensaje de éxito
    setIsSubmitted(true);
    clearCart();
    
    // Limpiar el formulario
    form.reset();
  };

  if (cartItems.length === 0 && !isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="relative bg-red-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Finalizar Compra</h1>
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Finalizar Compra</h1>
          <p className="text-xl opacity-90">Completa tus datos para continuar</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {isSubmitted ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <Alert className="mb-6">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <AlertTitle className="text-xl font-bold">¡Pedido Enviado!</AlertTitle>
                <AlertDescription className="mt-2 text-gray-700">
                  Te notificaremos por WhatsApp los datos de pago en breve.
                </AlertDescription>
              </Alert>
              <Button asChild>
                <Link to="/shop">Volver a la tienda</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Información Personal</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre *
                      </label>
                      <Input 
                        id="firstName"
                        {...register("firstName")}
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Apellido *
                      </label>
                      <Input 
                        id="lastName"
                        {...register("lastName")}
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Cédula de Identidad *
                      </label>
                      <Input 
                        id="idNumber"
                        type="number"
                        {...register("idNumber")}
                        className={errors.idNumber ? "border-red-500" : ""}
                      />
                      {errors.idNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.idNumber.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono *
                      </label>
                      <Input 
                        id="phone"
                        type="tel"
                        {...register("phone")}
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Dirección de envío
                      </label>
                      <Input 
                        id="address"
                        {...register("address")}
                        className={errors.address ? "border-red-500" : ""}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Button type="submit" className="w-full" size="lg">
                      Enviar Pedido
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
