# Convención de imágenes de producto — Nana Karamel

## Dónde van
Todas las fotos de producto en: `/img/productos/`

## Nomenclatura
El nombre del archivo = el campo `id` del producto en `data/products.json`, en kebab-case.

Ejemplos:
- producto `"id": "tarta-chocolate-biscoff"` → `/img/productos/tarta-chocolate-biscoff.webp`
- producto `"id": "cookie-lotus"` → `/img/productos/cookie-lotus.webp`

## Formato y tamaño
| Parámetro | Valor |
|---|---|
| Formato principal | **WebP** |
| Formato fallback | JPG (mismo nombre, extensión `.jpg`) |
| Lado largo | ~1200 px |
| Peso máximo | < 300 KB |
| Proporción | Libre (recomendado 4:3 o 1:1) |
| Fondo | Preferiblemente blanco o crema #FFF6E0 |

## Flujo
1. El cliente entrega las fotos con cualquier nombre.
2. Renombrarlas según el `id` del producto en `products.json`.
3. Convertir a WebP (herramienta recomendada: squoosh.app o cwebp).
4. Dejar el JPG como fallback con el mismo nombre.
5. Subir ambos archivos a `/img/productos/`.
