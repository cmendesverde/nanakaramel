# 🍪 NANA KARAMEL — Plan de obra + Prompt Claude Code (v2)

> ## 📍 PUNTO DE RETORNO (léeme primero al volver)
> - **Repo local:** `C:\Users\carlo\nanakaramel`
> - **Preview (pruebas del cliente):** https://nanakaramel-9u9iy2vqw-mendesgrupocreativo-8778s-projects.vercel.app · `/admin` · `/admin/login`
> - **Estado:** Fases 1–3 ✅ completas y desplegadas en preview. SEO escrito y aparcado. Sin Neon, sin dominio, sin datos reales.
> - **Congelado esperando:** aprobación del presupuesto + datos del cliente (dominio, OG, geo/CP, productos, fotos).
> - **Primer paso al retomar (Fase 4):** auth FAIL-CLOSED → crear Neon → `DATABASE_URL` en Vercel → cargar productos/fotos → `vercel --prod`.
> - **Docs hermanas en el repo:** `FASE_4_PLAY.md` (pasos exactos del "play") · `HANDOFF_CLAUDE_CODE.md` · `ADMIN_SETUP.md`.
> - **Admin abierto en preview = intencional** (solo pruebas). Fail-closed solo antes del lanzamiento.

Objetivo de esta fase: **dejar TODO el esqueleto montado** (backend, BD, SEO, auth,
integración) sin esperar al cliente, de modo que al aprobar presupuesto sea solo
**"dale play"**. UX/UI y paleta CERRADAS: no se rediseña nada.

> ## ⏸️ ESTADO ACTUAL — EN ESPERA DE APROBACIÓN DEL PRESUPUESTO
> Esqueleto listo. Fases 1 y 2 hechas (SEO escrito y aparcado). Fase 3 a terminar de
> construir + testear degradación, luego **STOP**. NO se toca Neon ni producción hasta que
> el cliente apruebe.
>
> **Para reanudar (Fase 4 = "play"), necesito:**
> 1. ✅ Aprobación del presupuesto.
> 2. 🔴 Antes del LANZAMIENTO (no del preview): arreglar auth a FAIL-CLOSED. El admin abierto en pruebas es intencional.
> 3. ⏳ Dominio real · imagen OG 1200×630 · coords geo + CP (Google Business Profile).
> 4. ⏳ Productos reales (nombres/desc/precios) → `products.json` + fotos renombradas → `/img/productos/`.
>
> Ya cerrado: teléfono `+34614279238`, WhatsApp real, esquema canónico, auth, decisión de catálogo (inline).

Pendiente del cliente (no bloquea montar el esqueleto):
- Nombres + descripciones + precios de productos → entran en `data/products.json`.
- Fotos reales renombradas según convención → `/img/productos/`.
- Número de WhatsApp real → constante `WA`.
- Aprobación de presupuesto → dispara el despliegue (Fase 4).

---

## 📋 LISTA DE TAREAS (estado vivo)

Leyenda: ✅ hecho · 🔄 en curso · ⏳ pendiente (hacer ya) · 🔒 bloqueado (cliente/aprobación)

### FASE 0 — Decisiones (cerradas)
- [x] ✅ Auditoría del repo
- [x] ✅ Detectado conflicto de 2 esquemas de BD
- [x] ✅ Esquema canónico aprobado (+ `email`, `importe_final`)
- [x] ✅ 4 correcciones acordadas: PATCH único · `ALTER … IF NOT EXISTS` · `updated_at` explícito · `historial {status,ts}` + `CHECK` de status
- [x] ✅ Mapeo de una skill por parte

### FASE 1 — Esqueleto backend ✅ COMPLETADA
- [x] ✅ `db/schema.sql` canónico + `ALTER … IF NOT EXISTS` + `CHECK` + índices
- [x] ✅ `api/orders.js` → GET (protegido) + POST (abierto), `_lib`, columnas nuevas
- [x] ✅ `api/orders/[id].js` → ruta ÚNICA PATCH/DELETE, esquema canónico, `historial {status,ts}`
- [x] ✅ `api/_lib/db.js` (cliente Neon + ensureTable) + `api/_lib/auth.js` (HMAC, requireAdmin)
- [x] ✅ `api/admin-auth.js` → login/verify/logout cookie HttpOnly
- [x] ✅ `admin/login.html` → login con tokens de marca
- [x] ✅ `.env.example`, `data/products.json` (6 placeholders), `data/CONVENCION_IMAGENES.md`
- [x] ✅ `vercel.json` (rewrite /admin/login) + `.gitignore` (node_modules, .env, .env.local)
- [ ] ⏳ Confirmar: POST de `orders.js` ABIERTO · HMAC con `SESSION_SECRET` propio

### FASE 2 — Esqueleto SEO (ESCRITO, pendiente de aplicar con correcciones)
- [x] ✅ Propuesta SEO completa y APROBADA (telephone real, addressRegion, robots, sitemap, JSON-LD Product ItemList)
- [ ] ⏳ **Añadir `<html lang="es">`** (WCAG AA + SEO) — verificar si el compilado lo tiene
- [ ] ⏳ **Captura móvil antes/después** del `viewport` (puede alterar maquetación)
- [ ] ⏳ Regenerar `lastmod` del sitemap en cada despliegue (no fijo)
- [ ] 🔒 OG image real 1200×630 (sin ella, no publicar SEO) — CLIENTE
- [ ] 🔒 Dominio real (hoy placeholder `nanakaramel.com`) — CLIENTE
- [x] ✅ Teléfono JSON-LD `telephone` = `+34614279238` (móvil = WhatsApp, confirmado). Formato E.164 en JSON-LD; visible si aplica como `+34 614 27 92 38`.
- [ ] 🔒 Coords geo + CP exactos del Google Business Profile
- [ ] ⏳ Aplicar en `index.html` SOLO tras las 3 correcciones + datos reales

### FASE 3 — Integración (montar el cableado, confirmar antes de tocar los .dc.html)
- [ ] ⏳ Web pública: `POST /api/orders` no destructivo al enviar por WhatsApp (try/catch silencioso)
- [ ] ⏳ Panel `/admin`: `GET /api/orders` (Kanban/calendario) + `PATCH` (arrastrar / fecha)
### FASE 3 — Integración ✅ COMPLETADA (sin tocar HTML compilado del render)
- [x] ✅ Web pública: interceptor `window.open` → `POST /api/orders` silencioso
- [x] ✅ Panel: `syncFromApi()` conectado a la API real + `pushApi` (estado/importeFinal/notaInterna)
- [x] ✅ Degradación: WhatsApp abre aunque falle el POST · panel cae a localStorage
- [x] ✅ Decisión catálogo: inline; `products.json` (22 placeholders con IDs reales) = referencia + fuente JSON-LD
- [x] ✅ `FASE_4_PLAY.md` creado (checklist exacto para el "play")
- [x] ✅ COMMIT + PUSH + DEPLOY PREVIEW hecho (sin Neon). Preview: `nanakaramel-9u9iy2vqw-…vercel.app`
- [x] ✅ DECISIÓN Carlos: admin ABIERTO a propósito en el preview de pruebas (sin dominio, sin BD, sin datos reales — para que el cliente lo testee y pida cambios). NO se toca ahora.
- [ ] 🔴 **Solo ANTES DEL LANZAMIENTO oficial (no del preview):** invertir auth a FAIL-CLOSED (sin secretos → denegar) + test + `ADMIN_PASSWORD`/`SESSION_SECRET` en Vercel. Requisito previo a conectar Neon en Fase 4.
- [x] ✅ Constante `WA` = número de WhatsApp REAL (ya puesto, confirmado por Carlos)
- [x] ✅ DECISIÓN catálogo: **inline** (find-replace quirúrgico al recompilar). `data/products.json` = fuente de verdad; el inline se deriva de él y se actualizan juntos en el mismo commit.

### FASE 4 — Despliegue ("PLAY" al aprobar presupuesto)
- [ ] 🔒 Crear BD Neon + `DATABASE_URL` en Vercel (Production, Preview, Development)
- [ ] 🔒 Ejecutar esquema canónico en Neon
- [ ] 🔒 Cargar `data/products.json` real + fotos en `/img/productos/`
- [ ] 🔒 `vercel --prod` → URL pública + URL `/admin`
- [ ] 🔒 Verificación e2e: pedido prueba → llega a WhatsApp y aparece en panel

---

## 🗺️ Skill por parte
| Parte | Skill |
|---|---|
| Auditoría / arranque / reconciliación | `impeccable` |
| BD Neon + env vars + despliegue | `deploy-to-vercel` |
| API serverless (`orders.js`, `[id].js`, auth) | Vercel Eng. suite + `impeccable` |
| SEO (meta, JSON-LD, sitemap) | `ui-ux-pro-max` (auditoría meta) + `impeccable` |
| Integración web/panel | `impeccable` |
| Tests | `tdd` |
| Verificación e2e navegador | `agent-browser` + MCP Playwright |
| Auditoría visual (nada se rompe + WCAG AA) | `ui-ux-pro-max` (solo auditar) |

---

## ✅ PROMPT PARA CLAUDE CODE (pegar en la carpeta del proyecto)

```
Soy el responsable de "Nana Karamel", obrador de cookies y tartas en Madrid (Barrio
del Pilar). Repo con web pública YA APROBADA + panel /admin. FASE ACTUAL: dejar TODO
el esqueleto montado (backend, BD, SEO, auth, integración) SIN desplegar todavía, para
que al aprobar presupuesto el cliente sea solo "dale play". NO toques diseño, estilos,
colores, tipografías ni el flujo de pedido por WhatsApp.

== REGLA DE ORO ==
UX/UI y paleta CERRADAS. Trabajas sobre los .dc.html (fuente) y recompilas a
index.html / admin/index.html. Cualquier cambio visual = parar y preguntar. Los cambios
de SEO son SOLO en <head> (no visuales): muéstramelos antes de aplicarlos.

== PROTOCOLO (mi CLAUDE.md global) ==
Riesgo Verde=auto, Ámbar=confirmar, Rojo=un comando cada vez. BD y producción = Rojo
SIEMPRE (apruebo comando a comando, nunca "don't ask again"). npm run build local antes
de cada push. Frontera cliente/servidor estricta. Respuestas en español, directas.

== USA UNA SKILL POR PARTE (skills globales) ==
Auditoría/reconciliación → impeccable · BD+env+deploy → deploy-to-vercel · API serverless
→ Vercel Eng. suite + impeccable · SEO → ui-ux-pro-max + impeccable · integración →
impeccable · tests → tdd · e2e navegador → agent-browser + MCP Playwright · auditoría
visual (solo comprobar que nada se rompe, WCAG AA) → ui-ux-pro-max.

== ESQUEMA CANÓNICO YA APROBADO (úsalo tal cual) ==
Tabla única "orders":
  id BIGSERIAL PK · ref TEXT UNIQUE · customer TEXT · phone TEXT · email TEXT ·
  items JSONB DEFAULT '[]' · cake JSONB · pickup_date DATE · pickup_note TEXT ·
  total_units INT DEFAULT 0 · status TEXT DEFAULT 'nuevo' · source TEXT DEFAULT 'web' ·
  message TEXT · importe_final NUMERIC(10,2) · nota_interna TEXT ·
  historial JSONB DEFAULT '[]' · created_at TIMESTAMPTZ DEFAULT now() ·
  updated_at TIMESTAMPTZ DEFAULT now()
Estados: nuevo|confirmado|en_preparacion|listo|entregado|cancelado

== 4 CORRECCIONES OBLIGATORIAS (evitan que el conflicto vuelva) ==
1. PATCH ÚNICO: GET lista + POST alta van en api/orders.js; PATCH/DELETE de un pedido
   SOLO en api/orders/[id].js. Nada de dos rutas PATCH.
2. ALTER IDEMPOTENTE: además de CREATE TABLE IF NOT EXISTS, añade
   ALTER TABLE orders ADD COLUMN IF NOT EXISTS … para email, importe_final,
   nota_interna, historial, updated_at (por si la tabla ya existe en Neon).
3. updated_at EXPLÍCITO: todo PATCH hace SET … updated_at = now().
4. historial COHERENTE: entradas {status, ts} (no {estado,…}). Añade
   CHECK (status IN ('nuevo','confirmado','en_preparacion','listo','entregado','cancelado')).

== LO QUE MONTAS AHORA (Fases 1 y 2 completas; Fase 3 cableada; Fase 4 NO) ==
FASE 1 — backend:
- db/schema.sql canónico (con CHECK + ALTER IF NOT EXISTS + índices).
- api/orders.js: GET + POST con columnas nuevas, updated_at.
- api/orders/[id].js: reescritura completa al esquema canónico, ruta única PATCH/DELETE.
- api/admin-auth.js: middleware (contraseña por env ADMIN_PASSWORD o token).
- admin/login.html: login mínimo, mismos tokens de marca, sin rediseñar el panel.
- .env.example: DATABASE_URL, ADMIN_PASSWORD.
- data/products.json: placeholder con esta estructura por item:
  { "id":"slug-kebab", "nombre":"", "categoria":"tarta|cookie", "descripcion":"",
    "precio":0, "unidad":"ud", "img":"/img/productos/slug-kebab.webp",
    "destacado":false, "disponible":true }
- data/CONVENCION_IMAGENES.md: las fotos del cliente van a /img/productos/, nombre =
  id del producto en kebab-case, WebP (fallback JPG), lado largo ~1200px, <300KB.

FASE 2 — SEO (solo <head>/archivos, no visual, confírmamelo antes de aplicar):
- robots.txt + sitemap.xml.
- Meta en <head> de index: title, description, canonical, Open Graph, Twitter Card.
- JSON-LD schema.org "Bakery": nombre Nana Karamel, dirección "Avenida Monforte de
  Lemos 170, Barrio del Pilar, Madrid", openingHours (Mar–Vie 11:00–13:30,17:30–20:00;
  Sáb 11:00–13:30; Dom/Lun cerrado), telephone (placeholder hasta tener el real),
  priceRange "€€". Plantilla JSON-LD "Product" lista para rellenar con products.json.

FASE 3 — integración (cablear, NO romper):
- Web pública: al disparar WhatsApp, además POST /api/orders (try/catch silencioso; si
  la BD falla el cliente llega IGUAL a WhatsApp). Cuerpo de ejemplo en ADMIN_SETUP.md.
- Panel: leer de GET /api/orders y PATCH al arrastrar/cambiar fecha, con localStorage
  como fallback si no hay DATABASE_URL.
- DECISIÓN PARA MÍ (no decidas tú): ¿el catálogo de la web pública debe RENDERIZARSE
  desde data/products.json (más fácil de actualizar, pero toca el render del catálogo)
  o mantenemos los productos inline y solo sustituyo valores cuando lleguen? Recomiéndame
  una y espera mi OK antes de tocar el catálogo.

FASE 4 — NO la ejecutes todavía. Déjala lista y documentada (crear Neon, DATABASE_URL en
los 3 entornos, ejecutar schema, cargar products.json + fotos, vercel --prod). Te aviso
yo con "dale play".

== NO TOCAR ==
index.html y admin/index.html salvo recompilación desde sus .dc.html; support.js;
vercel.json; logo-data.js; imágenes existentes. El diseño aprobado no se altera.

== ANTES DE EMPEZAR ==
Lee HANDOFF_CLAUDE_CODE.md y ADMIN_SETUP.md. Dime EXACTAMENTE qué archivos creas y
cuáles modificas, empieza por la skill impeccable, y NO ejecutes nada de riesgo Rojo
(BD/producción) sin mi OK comando a comando. Arranca por db/schema.sql y la reescritura
de api/orders/[id].js.
```

---

## 📌 Recordatorios de marca (no inventar)
Granate `#7A1228` · crema `#FFF6E0`/`#F3E8CC` · rosa `#F4A9B4` · verde salvia `#94A487`
(todo WhatsApp). Títulos Lilita One + Lobster Two · cuerpo Lora · etiquetas Oswald.
Trabajar sobre `.dc.html` y recompilar. No tocar `support.js`. BD/producción = Rojo.
