# Nana Karamel — FASE 4: "DALE PLAY"

> **Contexto y estado del proyecto:** ver `PROMPT_CLAUDE_CODE.md` (fuente de verdad).
> Fases 1–3 completadas. Este documento cubre únicamente los pasos del despliegue final.

Ejecutar solo cuando el cliente apruebe el presupuesto.
Cada paso con riesgo Rojo: ejecutar uno a uno, esperar confirmación.

---

## Checklist previa (antes de ejecutar nada)

- [ ] Datos de SEO completos: dominio real, CP exacto, coordenadas geo, imagen OG 1200×630
- [ ] Número de WhatsApp confirmado: ya es +34 614 279 238 (constante WA en .dc.html)
- [ ] Nombres y precios reales en `data/products.json`
- [ ] Fotos de producto en `/img/productos/` (ver `data/CONVENCION_IMAGENES.md`)

---

## Paso 1 — Crear proyecto Neon 🔴

1. Entra en https://neon.tech → **New Project** → nombre: `nana-karamel`
2. Copia la **connection string**: `postgresql://user:pass@host.neon.tech/neondb?sslmode=require`
3. En la consola SQL de Neon ejecuta `db/schema.sql` (o lo crea solo la primera llamada a `/api/orders`)

## Paso 2 — DATABASE_URL en Vercel 🔴

En el proyecto Vercel (ya enlazado: `nanakaramel`) → **Settings → Environment Variables**:

| Variable | Valor | Entornos |
|---|---|---|
| `DATABASE_URL` | `postgresql://...` | Production, Preview, Development |
| `ADMIN_PASSWORD` | (contraseña segura, min. 16 chars) | Production, Preview |

> Desde CLI: `vercel env add DATABASE_URL` (pide el valor y los entornos)

## Paso 3 — FASE 2 SEO (si ya tienes dominio + datos geo) 🟡

Confirmar con Carlos antes de aplicar. Necesitas:
- Dominio real (sustituye `DOMINIO-REAL.com` en la propuesta)
- Código postal exacto de Avda. Monforte de Lemos 170
- Coordenadas GPS del Google Business Profile
- Imagen OG 1200×630 → guardar como `og-image.jpg` en raíz del proyecto

Cuando tengas todo: aplicar la propuesta de SEO de `index.html` + crear `robots.txt` + `sitemap.xml`.

## Paso 4 — npm install 🟢

```bash
cd C:\Users\carlo\nanakaramel
npm install
```

## Paso 5 — Verificación local 🟢

```bash
vercel dev
```

Prueba:
1. Abre http://localhost:3000 — web pública funciona
2. Haz un pedido de prueba → abre WhatsApp → comprueba que aparece en http://localhost:3000/admin
3. En el panel /admin → Login con ADMIN_PASSWORD → ve a Pedidos → confirmar que el pedido aparece
4. Arrastra a "Confirmado" → verifica que el estado cambia en el panel

## Paso 6 — Despliegue a producción 🔴

```bash
vercel --prod
```

Confirmar URL pública y URL /admin en el output.

## Paso 7 — Verificación e2e en producción 🟡

1. Abre la URL pública → pedido de prueba → WhatsApp
2. Abre URL /admin → login → verificar que el pedido aparece en Kanban

---

## Configuración de auth del panel /admin

El panel usa contraseña compartida (cookie HttpOnly, válida 2 días):
- Login en: `/admin/login`
- Contraseña: la configurada en `ADMIN_PASSWORD` en Vercel
- Si `ADMIN_PASSWORD` no está configurada, el acceso es libre (solo en dev)

**Para producción: configurar ADMIN_PASSWORD siempre.**

---

## Arquitectura final desplegada

```
/ (index.html)          → web pública + integración WA→BD
/admin (admin/index.html) → panel Kanban, auth por cookie
/admin/login            → página de login
/api/orders             → GET (lista, auth) + POST (alta, open)
/api/orders/:id         → PATCH + DELETE (auth)
/api/admin-auth         → login / verify / logout
```
