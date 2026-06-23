# Nana Karamel — Despliegue en Vercel + Neon

Web pública (`/`) intacta + panel privado (`/admin`) con pedidos en base de datos Neon.
La web pública **sigue funcionando igual**: envía por WhatsApp **y** guarda el pedido en la BD.

## Archivos del proyecto
```
/
├── index.html          → web pública (no tocar el diseño)
├── admin/index.html     → panel administrativo (/admin)
├── api/orders.js        → función serverless: GET/POST/PATCH pedidos
├── db/schema.sql        → tabla "orders" para Neon
├── vercel.json          → rewrites + cleanUrls
├── package.json         → dependencia @neondatabase/serverless
├── wordmark.png, logo*.png, favicon.png, logo-data.js → marca
```

## 1. Crear la base de datos (Neon)
1. Entra en https://neon.tech → **New Project**.
2. Copia la **connection string** (empieza por `postgresql://...`).
3. (Opcional) En la consola SQL de Neon pega `db/schema.sql` y ejecútalo.
   Si no lo haces, la tabla se crea sola en la primera llamada a `/api/orders`.

## 2. Variable de entorno en Vercel
En el proyecto de Vercel → **Settings → Environment Variables**:
```
DATABASE_URL = postgresql://...   (la connection string de Neon)
```
Marca los 3 entornos (Production, Preview, Development).

## 3. Desplegar
Desde la carpeta del proyecto:
```bash
npm install          # instala @neondatabase/serverless
vercel --prod        # o: git push  (si el repo está conectado a Vercel)
```

## 4. Conectar la web pública a la BD (opcional pero recomendado)
La web ya abre WhatsApp. Para que **además** registre el pedido, añade esta llamada
en el handler que dispara el envío (función `openWA` / confirmación de pedido):

```js
// justo antes o después de abrir WhatsApp:
fetch('/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    customer: nombre || null,
    phone: telefono || null,
    items: lineasCarrito,        // [{id,name,qty,cat}]
    cake: tartaConfig || null,   // {comensales,edad,idea,bizcocho,buttercream,color}
    pickup_date: fechaRecogida,  // 'YYYY-MM-DD' o null
    pickup_note: 'hora a concretar por WhatsApp',
    total_units: unidades,
    message: textoWhatsApp
  })
}).catch(() => {});               // si falla, el cliente igual va a WhatsApp
```
> Es **no destructivo**: si la BD falla, el `.catch` evita romper la experiencia.
> El cliente siempre llega a WhatsApp.

## 5. Endpoints del panel
- `GET  /api/orders`           → lista de pedidos (panel los pinta en Kanban/Calendario).
- `POST /api/orders`           → alta de pedido (web pública + alta manual del panel).
- `PATCH /api/orders?id=123`   → cambia `status` o `pickup_date` (arrastrar en Kanban).

Estados: `nuevo · confirmado · en_preparacion · listo · entregado · cancelado`.

## Notas
- El panel `/admin` funciona con datos locales (localStorage) aunque la BD no esté lista;
  al configurar `DATABASE_URL` empieza a leer/escribir en Neon.
- **Año fijo 2026**; el cliente elige día y mes, la hora se pacta por WhatsApp.
- Cambia el número de WhatsApp en el sitio público (constante `WA`) por el real.
