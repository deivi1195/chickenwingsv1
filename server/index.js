require('dotenv').config();
const express = require('express');
const cors = require('cors');
const twilio = require('twilio');

// Configuración del servidor
const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Verificar que las variables de entorno estén configuradas
if (!accountSid || !authToken || !twilioPhoneNumber) {
  console.warn('Advertencia: Faltan variables de entorno de Twilio o no son válidas. El servidor funcionará en modo de demostración sin enviar mensajes reales.');
}

// Variable para controlar si estamos en modo de demostración
const demoMode = !accountSid || !authToken || !twilioPhoneNumber || accountSid.indexOf('AC') !== 0;

// Inicializar cliente de Twilio solo si no estamos en modo de demostración
let client;
if (!demoMode) {
  try {
    client = twilio(accountSid, authToken);
    console.log('Cliente de Twilio inicializado correctamente');
  } catch (error) {
    console.warn('Error al inicializar cliente de Twilio, funcionando en modo de demostración:', error.message);
  }
}

// Ruta para enviar mensajes de WhatsApp
app.post('/api/send-whatsapp', async (req, res) => {
  try {
    const { customerName, customerID, customerPhone, customerAddress, products, total } = req.body;
    
    if (!customerPhone) {
      return res.status(400).json({ success: false, message: 'El número de teléfono del cliente es requerido' });
    }
    
    // Formatear los productos
    const productsText = products.map(item => {
      return `- ${item.name} x${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`;
    }).join('\n');
    
    // Crear el mensaje completo
    const message = `*NUEVO PEDIDO*\n\n*Cliente:* ${customerName}\n*Cédula:* ${customerID}\n*Teléfono:* ${customerPhone}\n*Dirección:* ${customerAddress || 'Sin dirección especificada'}\n\n*PRODUCTOS:*\n${productsText}\n\n*TOTAL:* $${total.toFixed(2)}`;
    
    // Si estamos en modo de demostración, simular el envío del mensaje
    if (demoMode) {
      console.log('MODO DEMOSTRACIÓN: Simulando envío de mensaje de WhatsApp');
      console.log('Mensaje que se enviaría:', message);
      console.log('Destinatario:', customerPhone);
      
      // Simular un SID de mensaje
      const fakeSid = 'DEMO_' + Date.now();
      
      // Responder con éxito simulado
      return res.status(200).json({ 
        success: true, 
        messageSid: fakeSid,
        demoMode: true,
        message: 'Mensaje simulado en modo de demostración'
      });
    }
    
    // Enviar mensaje de WhatsApp usando Twilio (solo si no estamos en modo de demostración)
    const twilioMessage = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,  // Formato requerido por Twilio para WhatsApp
      to: `whatsapp:+${customerPhone.replace(/\D/g, '')}` // Asegurarse de que solo haya dígitos y agregar el prefijo whatsapp:
    });
    
    console.log(`Mensaje enviado con SID: ${twilioMessage.sid}`);
    res.status(200).json({ success: true, messageSid: twilioMessage.sid });
    
  } catch (error) {
    console.error('Error al enviar mensaje de WhatsApp:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al enviar mensaje de WhatsApp', 
      error: error.message 
    });
  }
});

// Ruta para verificar que el servidor esté funcionando
app.get('/api/status', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Servidor funcionando correctamente' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});