# 🍪 Nana Karamel — Informe de procesado de productos

## ✅ Procesado correctamente (7 cookies)
Las 7 fotos venían a **5:4 exacto (1402×1122)** — el cliente las hizo bien. Optimizadas a 1200×960 WebP (+ fallback JPG), renombradas por `id`, en `/img/productos/`.

| Producto | id | Foto origen | Precio | WebP |
|---|---|---|---|---|
| Clásica | `clasica` | Clásica.png | 3,95€ | 73 KB |
| Brownie | `brownie` | Brownie.png | 3,95€ | 60 KB |
| Red Velvet | `red-velvet` | Red-Velvet.png | 3,95€ | 80 KB |
| Lotus Cheesecake | `lotus-cheesecake` | Lotus-Cheesecake.png | 3,95€ | 102 KB |
| Peanut Lover | `peanut-lover` | Cookie-Peanut-Lover.png | 3,95€ | 116 KB |
| Ferrero | `ferrero` | Ferrero.png | 3,95€ | 93 KB |
| Piña Colada *(sabor del mes)* | `sabor-del-mes` | Piña-Colada.png | 3,95€ | 38 KB |

Todas: oferta **3,75€ a partir de 5 uds**, unidad `ud`, `disponible: true`.

---

## ⚠️ Decisiones / cosas a revisar (3)

1. **"Piña Colada" = "Sabor del Mes".** En el Word la 7ª cookie es "Sabor del Mes" (sin foto), y "Piña Colada" es la única foto sin nombre en la lista. Deduzco que Piña Colada es el sabor del mes actual, así que la mapeé al `id` estable `sabor-del-mes` (marcada como destacada). **Confírmame.** El mes que viene solo cambian nombre + foto + descripción; el `id` se queda.

2. **Las descripciones las redacté yo.** Los Word traen nombres y precios, pero **no descripciones de las cookies**. Escribí una por cookie (tono "de barrio", 1 línea) para que no quede vacío — pero son borradores, **revísalas y ajústalas** o pídeselas al cliente.

3. **Hay que reconciliar los `id` con el `products.json` que generó Claude Code** (los 22 placeholders del catálogo). No tengo ese archivo aquí. Pásamelo y cuadro estos 7 `id` contra los suyos; si alguno no coincide, te lo marco.

---

## 📋 Pendiente (en los Word pero SIN foto en este lote)
El Word trae el **menú completo**, no solo cookies. Esto NO está en el `products.json` (no hay fotos y/o va por otra vía):
- **Mini cookies** (clásicas, brownie, pastas de mantequilla vainilla/cacao, surtido) — con opción de topping.
- **Tartas** de porción / medianas / grandes — estas van por el **configurador de tartas + WhatsApp**, no como tarjeta de catálogo.
- **Tartas vintage/personalizadas** — opciones de forma, bizcocho, crema, relleno, extras (todo el árbol del configurador).
- **Productos extra**: empanada gallega, empanadilla, alfajor, rollo de canela, focaccia, brownie (tamaños/porciones).
- **Extra "Mensaje de Chocolate" (5€):** el cliente sugiere meterlo como **opción extra dentro de cada tarta** que lo admite, no como producto suelto. De acuerdo con esa lectura.

Cuando lleguen fotos/decisiones de estos, mismo proceso.
