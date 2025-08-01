# Chicken Wings - Aplicación de Pedidos con Envío Automático por WhatsApp

Esta aplicación permite a los clientes realizar pedidos de comida y envía automáticamente los detalles del pedido por WhatsApp al negocio utilizando la API de Twilio.

## Tecnologías Utilizadas

Este proyecto está construido con:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Node.js y Express (backend)
- Twilio API para WhatsApp

## Estructura del Proyecto

- **Frontend**: Aplicación React con Vite y TypeScript
- **Backend**: Servidor Node.js con Express que maneja el envío de mensajes de WhatsApp

## Requisitos Previos

1. Node.js y npm instalados
2. Una cuenta en Twilio (puedes crear una cuenta gratuita en [twilio.com](https://www.twilio.com))
3. Activar el Sandbox de WhatsApp en Twilio o tener un número de WhatsApp Business aprobado

## Configuración

### 1. Instalar dependencias

Para instalar todas las dependencias tanto del frontend como del backend, ejecuta:

```bash
npm run install:all
```

### 2. Configurar variables de entorno del servidor

En la carpeta `server`, copia el archivo `.env.example` a `.env` y completa con tus credenciales de Twilio:

```
TWILIO_ACCOUNT_SID=tu_account_sid_aqui
TWILIO_AUTH_TOKEN=tu_auth_token_aqui
TWILIO_PHONE_NUMBER=tu_numero_de_whatsapp_aqui
PORT=3001
```

## Comandos

### Ejecutar solo el frontend

```bash
npm run dev
```

### Ejecutar solo el backend

```bash
npm run server
```

### Ejecutar frontend y backend simultáneamente

```bash
npm run dev:all
```

### Construir para producción

```bash
npm run build
```

## Funcionalidades

- Catálogo de productos
- Carrito de compras
- Formulario de pedido
- Envío automático de detalles del pedido por WhatsApp al negocio

## Flujo de la Aplicación

1. El cliente agrega productos al carrito
2. El cliente completa el formulario de pedido con sus datos personales
3. Al enviar el formulario, la aplicación envía los datos al servidor backend
4. El servidor utiliza la API de Twilio para enviar automáticamente un mensaje de WhatsApp con los detalles del pedido al número del negocio
5. El cliente recibe una confirmación de que su pedido ha sido enviado
