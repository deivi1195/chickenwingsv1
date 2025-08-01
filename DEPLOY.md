# Guía de Despliegue Manual en Netlify con Backend

Esta guía te ayudará a desplegar tu aplicación Chicken Wings en Netlify y configurar el backend para que funcione correctamente.

## Preparación del Frontend para Producción

### 1. Configurar la URL del Backend

Antes de construir la aplicación para producción, debes modificar la URL del backend en el archivo `src/pages/Checkout.tsx`. Actualmente está configurada para desarrollo local (`http://localhost:3001`).

```javascript
// Cambiar esto:
const response = await fetch('http://localhost:3001/api/send-whatsapp', {

// Por la URL de tu backend en producción:
const response = await fetch('https://tu-backend-url.com/api/send-whatsapp', {
```

### 2. Construir el Frontend

Ejecuta el siguiente comando para construir la versión de producción del frontend:

```bash
npm run build
```

Esto generará una carpeta `dist` con los archivos optimizados para producción.

## Despliegue en Netlify

### 1. Crear una cuenta en Netlify

Si aún no tienes una cuenta en Netlify, regístrate en [netlify.com](https://www.netlify.com/).

### 2. Despliegue Manual

1. Inicia sesión en tu cuenta de Netlify
2. Ve al dashboard y haz clic en "Add new site" > "Deploy manually"
3. Arrastra y suelta la carpeta `dist` generada en el paso anterior
4. Espera a que se complete el despliegue

### 3. Configurar Redirecciones para SPA

Para que las rutas de React funcionen correctamente, necesitas crear un archivo `_redirects` en la carpeta `public` antes de construir la aplicación:

```
/* /index.html 200
```

Esto redirigirá todas las rutas a index.html, permitiendo que React Router maneje las rutas.

Alternativamente, puedes configurar esto en Netlify después del despliegue:

1. Ve a "Site settings" > "Build & deploy" > "Continuous deployment"
2. En la sección "Post processing", haz clic en "Edit settings"
3. Activa "Pretty URLs" y "Asset optimization"
4. En "Redirect & rewrite rules", agrega la regla: `/* /index.html 200`

## Despliegue del Backend

Para que tu aplicación funcione completamente, necesitas desplegar el backend en un servicio que soporte Node.js. Aquí hay algunas opciones:

### Opción 1: Render.com

1. Crea una cuenta en [render.com](https://render.com/)
2. Crea un nuevo Web Service
3. Conecta tu repositorio de GitHub o sube manualmente el código
4. Configura el servicio:
   - Build Command: `npm install`
   - Start Command: `node index.js`
5. Agrega las variables de entorno (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER)
6. Despliega el servicio

### Opción 2: Railway.app

1. Crea una cuenta en [railway.app](https://railway.app/)
2. Crea un nuevo proyecto
3. Selecciona "Deploy from GitHub" o sube manualmente el código
4. Configura las variables de entorno
5. Railway detectará automáticamente que es una aplicación Node.js

### Opción 3: Heroku

1. Crea una cuenta en [heroku.com](https://www.heroku.com/)
2. Instala Heroku CLI
3. Crea un archivo `Procfile` en la raíz del directorio del servidor con el contenido: `web: node index.js`
4. Inicializa un repositorio Git si aún no lo has hecho
5. Ejecuta los siguientes comandos:

```bash
heroku login
heroku create
git add .
git commit -m "Preparación para despliegue en Heroku"
git push heroku master
heroku config:set TWILIO_ACCOUNT_SID=tu_account_sid TWILIO_AUTH_TOKEN=tu_auth_token TWILIO_PHONE_NUMBER=tu_numero_whatsapp
```

## Configuración CORS en el Backend

Para que el frontend pueda comunicarse con el backend, debes configurar CORS correctamente en el archivo `server/index.js`:

```javascript
// Cambiar esto:
app.use(cors());

// Por esto para permitir solo tu dominio de Netlify:
app.use(cors({
  origin: 'https://tu-sitio-netlify.netlify.app',
  methods: ['GET', 'POST'],
  credentials: true
}));
```

## Verificación del Despliegue

1. Visita tu sitio en Netlify (https://tu-sitio-netlify.netlify.app)
2. Navega a la tienda y agrega productos al carrito
3. Completa el formulario de checkout
4. Verifica que el mensaje de WhatsApp se envíe correctamente

## Solución de Problemas

### El mensaje de WhatsApp no se envía

1. Verifica las variables de entorno en tu servicio de backend
2. Revisa los logs del servidor para identificar errores
3. Asegúrate de que la URL del backend en el frontend sea correcta
4. Verifica que CORS esté configurado correctamente

### Errores 404 en las rutas de React

Asegúrate de haber configurado correctamente las redirecciones en Netlify como se explicó anteriormente.

### Problemas con las API de Twilio

Verifica que tu cuenta de Twilio esté activa y que las credenciales sean correctas. Si estás usando el Sandbox de WhatsApp, asegúrate de que el número destinatario haya optado por recibir mensajes.