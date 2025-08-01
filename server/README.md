# Servidor para Envío Automático de WhatsApp

Este servidor proporciona una API para enviar mensajes de WhatsApp automáticamente utilizando Twilio cuando un cliente realiza un pedido en la aplicación Chicken Wings.

## Requisitos Previos

1. Node.js y npm instalados
2. Una cuenta en Twilio (puedes crear una cuenta gratuita en [twilio.com](https://www.twilio.com))
3. Activar el Sandbox de WhatsApp en Twilio o tener un número de WhatsApp Business aprobado

## Configuración

1. Instala las dependencias:

```bash
npm install
```

2. Configura las variables de entorno:

Renombra el archivo `.env.example` a `.env` y completa con tus credenciales de Twilio:

```
TWILIO_ACCOUNT_SID=tu_account_sid_aqui
TWILIO_AUTH_TOKEN=tu_auth_token_aqui
TWILIO_PHONE_NUMBER=tu_numero_de_whatsapp_aqui
PORT=3001
```

- `TWILIO_ACCOUNT_SID` y `TWILIO_AUTH_TOKEN`: Puedes encontrarlos en el [Dashboard de Twilio](https://www.twilio.com/console)
- `TWILIO_PHONE_NUMBER`: Tu número de WhatsApp en formato E.164 (sin el prefijo "whatsapp:")

## Ejecución

Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

Para iniciar el servidor en modo producción:

```bash
npm start
```

## Endpoints

### Enviar mensaje de WhatsApp

**URL**: `/api/send-whatsapp`

**Método**: `POST`

**Cuerpo de la solicitud**:

```json
{
  "customerName": "Nombre del Cliente",
  "customerID": "12345678",
  "customerPhone": "5804120237348",
  "customerAddress": "Dirección del cliente",
  "products": [
    {
      "name": "Producto 1",
      "price": 10.99,
      "quantity": 2
    }
  ],
  "total": 21.98
}
```

**Respuesta exitosa**:

```json
{
  "success": true,
  "messageSid": "SM123456789"
}
```

**Respuesta de error**:

```json
{
  "success": false,
  "message": "Error al enviar mensaje de WhatsApp",
  "error": "Detalles del error"
}
```

### Verificar estado del servidor

**URL**: `/api/status`

**Método**: `GET`

**Respuesta**:

```json
{
  "status": "ok",
  "message": "Servidor funcionando correctamente"
}
```

## Notas Importantes

1. Para usar el Sandbox de WhatsApp de Twilio, los destinatarios deben haber optado por recibir mensajes enviando un mensaje con el código de unión al número del Sandbox.

2. Si estás utilizando un número de WhatsApp Business, asegúrate de que esté aprobado por WhatsApp y configurado correctamente en Twilio.

3. Para enviar mensajes fuera de la ventana de 24 horas después de la última interacción del usuario, debes usar plantillas de mensajes aprobadas por WhatsApp.