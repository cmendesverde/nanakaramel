# 🍪 NANA KARAMEL — Paquete de proyecto y handoff a Claude Code

> ⚠️ **DOCUMENTO HISTÓRICO** — Describe el estado inicial del proyecto (antes de Fases 1–3).
> El estado actual y la lista de tareas viva están en **`PROMPT_CLAUDE_CODE.md`** (fuente de verdad).
> Los pasos exactos del "play" (Fase 4) están en **`FASE_4_PLAY.md`**.

Este documento contiene **todo el contexto** del proyecto + **dos prompts listos para copiar/pegar**:
- **PROMPT A** → para arrancar un chat nuevo (aquí, en la herramienta de diseño) con todo el contexto.
- **PROMPT B** → para pegar en **Claude Code** y que conecte backend, base de datos y Vercel.

---

## 📦 Qué es este proyecto

Web de conversión para **Nana Karamel**, obrador artesano de cookies y tartas en el Barrio del Pilar (Madrid).
Objetivo: que el cliente arme su pedido y lo cierre por **WhatsApp** (no hay pago online; solo recogida en tienda).

Incluye:
1. **Web pública** (`index.html`) — catálogo, carrito, configurador de tartas en 3 pasos, todo desemboca en un mensaje de WhatsApp.
2. **Panel `/admin`** (`admin/index.html`) — dashboard de pedidos: inicio con KPIs, Kanban arrastrable (7 estados), calendario de recogidas, clientes, ficha de pedido y alta manual.
3. **Backend serverless** (`api/orders.js`) + **base de datos Neon** (`db/schema.sql`) — para guardar y gestionar pedidos.

---

## 🗂️ Archivos del proyecto

| Archivo | Qué es |
|---|---|
| `index.html` | **Web pública** compilada (un solo archivo, fuentes/logo embebidos). Desplegable tal cual. |
| `admin/index.html` | **Panel administrativo** compilado. Sirve en `/admin`. |
| `Nana Karamel.dc.html` | Código fuente editable de la web pública (Design Component). |
| `Admin Dashboard.dc.html` | Código fuente editable del panel. |
| `api/orders.js` | Función serverless Vercel: `GET/POST/PATCH` de pedidos contra Neon. |
| `db/schema.sql` | Esquema de la tabla `orders` (Postgres/Neon). |
| `vercel.json` | Config Vercel (cleanUrls + rewrite `/admin`). |
| `package.json` | Dependencia `@neondatabase/serverless`. |
| `ADMIN_SETUP.md` | Guía paso a paso de despliegue (Neon + Vercel). |
| `logo-data.js`, `logo.png`, `logo-line.png`, `wordmark.png`, `favicon.png` | Marca (logo embebido + favicon). |
| `support.js` | Runtime de los Design Components (no tocar). |

> Los `.dc.html` son el **código fuente**; los `index.html` / `admin/index.html` son su **compilado**. Si editas el fuente hay que recompilar.

---

## 🎨 Identidad de marca (tokens)

- **Granate** `#7A1228` (primario) · hover `#8E1B30` · oscuro `#5a0d1e`
- **Crema fondo** `#FFF6E0` (igualado al círculo del logo) · crema sección `#F3E8CC`
- **Texto** `#3A1418` · marrón apunte `#8a5a2b` · ocre `#C0875A`
- **Rosa** `#F4A9B4` / `#F6DCE2` (acentos, badges)
- **Verde salvia WhatsApp** `#94A487` (TODO lo de WhatsApp va en este verde, no en granate) · oscuro `#566b4c`
- **Tipografías**: títulos `Lilita One` (display) + `Lobster Two` (script), cuerpo `Lora`, etiquetas `Oswald`.

---

## ⚙️ Reglas de negocio clave

- **Solo recogida en tienda. No hay envíos. No hay pago online.**
- El pedido se cierra **por WhatsApp** (número demo actual: cambiar la constante `WA` por el real).
- **Configurador de tarta (3 pasos):** comensales (con opción "Personalizado" → campo libre), idea/referencia (la foto se adjunta en el chat de WhatsApp, NO se sube en la web), sabor (bizcocho + buttercream + color, con opción "Otro" → campo libre).
- **No** trabajan con fondant ni impresiones en cartulina.
- **Recogida:** año fijo **2026**; el cliente elige solo **día y mes**; la **hora se pacta por WhatsApp**.
- **Horario real (Google):** Mar–Vie 11:00–13:30 y 17:30–20:00 · Sáb 11:00–13:30 · Dom y Lun cerrado. Si el cliente elige un día cerrado, salta un aviso.
- Dirección: **Avenida Monforte de Lemos, 170 — Barrio del Pilar, Madrid**.

---

## 🔌 Estado del backend (lo que falta conectar)

`api/orders.js` ya está escrito (crea la tabla sola, expone `GET/POST/PATCH`). **Lo que falta** es trabajo de integración real, que es justo lo que harás en Claude Code:

1. Crear proyecto **Neon** y poner `DATABASE_URL` en variables de entorno de Vercel.
2. Desplegar en Vercel (`vercel --prod` o git push).
3. **Conectar la web pública**: al enviar el pedido por WhatsApp, hacer también un `POST /api/orders` (el cuerpo de ejemplo está en `ADMIN_SETUP.md`). Es no destructivo: si la BD falla, el cliente igual llega a WhatsApp.
4. **Conectar el panel** a `GET /api/orders` y a `PATCH /api/orders?id=…` (cambiar estado al arrastrar en el Kanban / fecha de recogida). Hoy el panel funciona con datos locales (localStorage) como fallback.
5. Añadir **autenticación** sencilla al `/admin` (hoy es abierto).

Estados de pedido: `nuevo · confirmado · en_preparacion · listo · entregado · cancelado`.

---
---

# 🟢 PROMPT A — para arrancar un CHAT NUEVO (herramienta de diseño)

> Copia esto en un chat nuevo y **adjunta todos los archivos del proyecto** (descarga el zip de abajo y súbelo, o adjunta los `.dc.html`, `index.html`, `admin/index.html`, `api/orders.js`, `db/schema.sql`, `ADMIN_SETUP.md`, `package.json`, `vercel.json` y los logos).

```
Retomo el proyecto "Nana Karamel" — web de conversión para un obrador artesano de
cookies y tartas en Madrid (Barrio del Pilar). Te adjunto todos los archivos.

Contexto:
- Web pública (index.html / fuente Nana Karamel.dc.html): catálogo, carrito,
  configurador de tartas en 3 pasos; todo desemboca en un mensaje de WhatsApp.
  Solo recogida en tienda, sin pago online. Recogida: año fijo 2026, el cliente
  elige día y mes, la hora se pacta por WhatsApp.
- Panel /admin (admin/index.html / fuente Admin Dashboard.dc.html): dashboard de
  pedidos con inicio (KPIs), Kanban arrastrable de 7 estados, calendario de
  recogidas, clientes, ficha de pedido y alta manual. Hoy con datos en localStorage.
- Backend: api/orders.js (serverless Vercel, GET/POST/PATCH contra Neon) y
  db/schema.sql (tabla orders). Pendiente de conectar de verdad.

Marca: granate #7A1228, crema #FFF6E0/#F3E8CC, rosa #F4A9B4, verde salvia #94A487
para TODO lo de WhatsApp. Títulos Lilita One + Lobster Two, cuerpo Lora, etiquetas
Oswald. No inventes colores ni tipografías nuevas.

Trabaja siempre sobre los .dc.html (código fuente) y recompila a index.html /
admin/index.html. NO rediseñes lo aprobado salvo que te lo pida.

Hoy quiero: [DESCRIBE AQUÍ LO QUE NECESITAS].
```

---
---

# 🔵 PROMPT B — para pegar en CLAUDE CODE

> Copia esto en Claude Code dentro de la carpeta del proyecto (con los archivos ya dentro).

```
Soy el responsable de "Nana Karamel", un obrador de cookies y tartas en Madrid.
Este repo contiene una web pública ya terminada y aprobada + un panel /admin, y
quiero que conectes el backend real sin tocar el diseño.

ARQUITECTURA ACTUAL
- index.html → web pública (un solo archivo, fuentes y logo embebidos). NO modificar
  su diseño, estilos, colores, tipografías, catálogo, carrito, configurador de tartas
  ni el flujo de pedido por WhatsApp.
- admin/index.html → panel administrativo (sirve en /admin): inicio con KPIs, Kanban
  de pedidos (estados: nuevo, confirmado, en_preparacion, listo, entregado, cancelado),
  calendario de recogidas, clientes, ficha de pedido y alta manual. Hoy lee/escribe en
  localStorage como fallback.
- api/orders.js → función serverless (GET lista, POST alta, PATCH ?id= actualiza
  estado/fecha). Crea la tabla sola si no existe.
- db/schema.sql → esquema de la tabla "orders" en Postgres/Neon.
- vercel.json y package.json (dependencia @neondatabase/serverless) ya están.

REGLAS DE NEGOCIO
- Solo recogida en tienda, sin pago online; el pedido se cierra por WhatsApp.
- Recogida: año fijo 2026, el cliente elige día y mes; la hora se pacta por WhatsApp.
- Horario: Mar–Vie 11:00–13:30 y 17:30–20:00, Sáb 11:00–13:30, Dom y Lun cerrado.

LO QUE NECESITO QUE HAGAS (no destructivo, sin romper la web pública):
1. Crear/configurar la base de datos Neon y dejar DATABASE_URL como variable de
   entorno en Vercel (los 3 entornos). Ejecutar db/schema.sql.
2. Conectar la web pública: al enviar el pedido por WhatsApp, hacer además un
   POST /api/orders con el pedido (cuerpo de ejemplo en ADMIN_SETUP.md). Si la BD
   falla, el cliente debe llegar igualmente a WhatsApp (try/catch silencioso).
3. Conectar el panel /admin a la API: GET /api/orders para pintar pedidos y
   PATCH /api/orders?id=… al arrastrar en el Kanban o cambiar la fecha de recogida.
4. Añadir autenticación básica al /admin (login simple por contraseña o Vercel
   password protection); hoy está abierto.
5. Desplegar a producción en Vercel y darme la URL pública y la de /admin.

Antes de tocar nada: revisa la estructura, dime exactamente qué archivos crearás y
cuáles modificarás, y espera mi OK. Lee ADMIN_SETUP.md, tiene la guía de despliegue.
```

---

## ✅ Checklist rápida antes de empezar en Claude Code
- [ ] Tener cuenta en **Neon** (neon.tech) y copiar la connection string.
- [ ] Tener el proyecto conectado a **Vercel** (o `npm i -g vercel`).
- [ ] Cambiar el **número de WhatsApp** demo por el real (constante `WA` en el fuente).
- [ ] `npm install` para instalar `@neondatabase/serverless`.
