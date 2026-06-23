# MASTER PROMPT — Web de conversión "Nana Karamel Bakery"

> Documento maestro para construir la web. Está dividido en fases. En cada fase se indica **qué skill evocar**, las **tareas** y los **criterios de hecho (DoD)**. Sigue el orden. No saltes la Fase 0.

---

## CONTEXTO DE MARCA (no inventar, usar esto)

**Negocio:** Nana Karamel — Obrador Artesano. Pastelería/galletería artesanal.
**Ubicación:** Avenida Monforte de Lemos, 170 — Barrio del Pilar, Madrid.
**Horario:** Martes a Viernes, 11:00–13:30 y 17:30–20:00.
**Logística:** Solo recogida en tienda. **No hacen envíos.** Cookies sin pedido mínimo. Tartas, mini cookies y extras **por encargo**.
**Tono:** cercano, artesano, vintage, juguetón ("dale rienda suelta a tu imaginación :)"), tratamiento de tú/vosotros.
**Instagram:** @nanakaramelbakery.

### Catálogo real (fuente: menú e imágenes)

**Cookies** (sin pedido mínimo, combinables):
- Clásica — vainilla con chips de chocolate
- Brownie — cacao puro, nueces, chocolate blanco, sal en escamas
- Red Velvet — vainilla y cacao suave rellena de queso crema
- Lotus Cheesecake — especiada (canela y jengibre), rellena de queso crema, crema de Lotus y Lotus triturada
- Ferrero — cacao suave rellena de Nutella, rebozada con avellanas
- Peanut Lover — cacahuete, chocolate con leche, cacahuetes caramelizados con miel y sal
- **Cookie Especial del Mes** (destacado rotativo; ej. junio = "Piña Colada")

**Mini Cookies** (por encargo): Clásica, Brownie, Surtido de Pastas de Mantequilla.

**Tartas** (por encargo, consultar tamaños): Red Velvet, Zanahoria, Chocolate, Queso (vasca), Mousse de Limón, Tiramisú, Tres Leches, Brownie, **Vintage / Personalizadas**. Extra: mensaje con chocolate (no en tamaño pequeño).

**Productos Extra** (por encargo): Empanada Gallega, Empanadillas Individuales, Alfajores Argentinos, Rollo de Canela, Focaccia.

**Tarta de queso** — producto estrella destacado en redes.

### Sistema de diseño (extraído del feed — respetar exacto)

```
TOKENS DE COLOR
--granate     #7A1228   /* logo, titulares, texto principal de marca */
--granate-2   #8E1B30   /* hover/variación */
--crema       #FAF2DC   /* fondo base de toda la web */
--crema-2     #F3E8CC   /* tarjetas, secciones alternas */
--rosa        #F2A8B8   /* acentos, resaltados tipo subrayado marcador */
--mostaza     #E79A2B   /* CTA secundario / etiquetas "del mes" / piña colada */
--marron      #C0875A   /* detalle cálido en titulares decorativos */
--tinta       #3A1418   /* texto largo legible (granate muy oscuro, no negro puro) */
```

```
TIPOGRAFÍA (2-3 roles)
Display retro grueso  → estilo "Cooper Black"/slab redondeada para H1/H2 y nombre de marca.
                         Sustituto web fiable: "Frijole"/"Bevan"/"Cooper" (o self-host de Cooper).
Script cursivo        → para nombres de producto (Clásica, Brownie…), tipo "Lobster Two" / "Pacifico".
Sans condensada bold  → para etiquetas, avisos y microcopy en MAYÚSCULAS
                         ("PRODUCTOS DISPONIBLES PARA RECOGER EN TIENDA"), tipo "Oswald"/"Anton".
Body                  → serif suave legible para descripciones, tipo "Fraunces"/"DM Serif".
```

```
LENGUAJE VISUAL
- Marcos decorativos vintage en granate sobre crema (esquinas ornamentales en cabeceras).
- Subrayados "marcador" rosa bajo palabras clave.
- Ilustraciones line-art granate (tartas, manos, cámara, bocadillo de chat).
- Bordes redondeados suaves, sombras mínimas, estética "stamp"/sello.
- Logo: abuelita ("nana") con gorro de chef y gafas cat-eye sobre círculo granate.
```

---

## OBJETIVO ÚNICO DE LA PÁGINA
Convertir la visita en un **pedido por WhatsApp**. Todo el diseño sirve a ese clic. Métrica norte: % de visitas que abren WhatsApp con un carrito/encargo precargado.

---

# FASES

## FASE 0 — Descubrimiento y plan de diseño
**Skill a evocar:** `frontend-design`

**Tareas**
1. Fijar el sujeto, audiencia y job único de la página (ya está arriba — confírmalo).
2. Construir el token system (color/tipo/layout/signature) partiendo de los tokens de arriba; **no** caer en el default "crema + serif + terracota" genérico: aquí el granate intenso + script de producto + sellos vintage es la firma, llévala al límite con disciplina.
3. Definir el **elemento firma** memorable: p. ej. la "Cookie del Mes" como héroe con flechas anotadas line-art, o la torre de cookies en sección abierta (corte) con etiquetas script.
4. Wireframe ASCII de home + flujo de pedido antes de tocar código.
5. Crítica del plan contra el brief; revisar lo que suene a plantilla.

**DoD:** plan de 1 página con paleta (hex nombrados), 3 roles tipográficos, concepto de layout y firma justificada.

---

## FASE 1 — Arquitectura de información y contenido
**Skill a evocar:** `frontend-design` (sección de *writing*)

**Mapa de la home (one-page con anclas + páginas de apoyo):**
1. **Hero** — nombre + claim ("Obrador artesano en Madrid") + foto producto + CTA primario "Pedir por WhatsApp" + CTA secundario "Ver menú". Aviso visible: *Recogida en tienda · No enviamos*.
2. **Destacado de la semana / mes** — Cookie del Mes y Tarta estrella (queso vasca), con badge mostaza.
3. **Menú online** (cookies, tartas, extras) navegable y filtrable.
4. **Pide tu tarta personalizada** — flujo guiado de 3 pasos (comensales → idea → sabor).
5. **Carrito / WhatsApp** — resumen del pedido que se envía como mensaje.
6. **Cómo funciona** — reserva y recoge, horario, mapa.
7. **Footer** — dirección, horario, IG, logo.

**Microcopy (regla):** voz activa, sentence case salvo etiquetas de marca en mayúscula, sin relleno. Botón dice lo que hace ("Añadir al pedido", "Enviar por WhatsApp"). Estados vacíos y errores con dirección, no disculpas.

**DoD:** copy real escrito para cada sección y cada producto (usa las descripciones del menú, no lorem).

---

## FASE 2 — Diseño visual y maquetación (build)
**Skill a evocar:** `frontend-design`

**Stack sugerido:** una sola página `index.html` con HTML + CSS + JS vanilla (o React si se prefiere componentizar). Self-host de fuentes o Google Fonts con los sustitutos indicados. Sin librerías pesadas.

**Tareas de UI**
- Implementar tokens como variables CSS (`:root`).
- Cabeceras con marco ornamental vintage (SVG en granate, reutilizable como componente).
- Tarjeta de producto: nombre en script, descripción en body, alérgenos/etiqueta, botón "Añadir al pedido", control de cantidad.
- Badge "Del mes" en mostaza; subrayados marcador rosa en palabras clave.
- Ilustraciones line-art como SVG inline (ligeras, granate).
- **Carrito** flotante persistente (botón burbuja con contador), panel lateral/bottom-sheet en móvil.

**Cuidado técnico (del skill):** vigilar especificidad de selectores CSS para que paddings/márgenes entre secciones no se cancelen. Gastar la audacia en un solo sitio (la firma); el resto, callado.

**DoD:** home maquetada, fiel a la paleta y tipografías, firma visible, sin look de plantilla.

---

## FASE 3 — Funcionalidad de conversión (el núcleo)
**Skill a evocar:** `frontend-design` + lógica JS propia

### 3A. Menú online navegable
- Categorías: Cookies / Mini Cookies / Tartas / Extras.
- Filtros rápidos por chips (p. ej. "sin pedido mínimo", "por encargo", "del mes").
- Cada ítem tiene botón **Añadir al pedido**.

### 3B. Carrito tipo compra → WhatsApp
- Estado del carrito en memoria (JS state; **no usar localStorage si corre en entorno con esa restricción** — usar estado en memoria o, en producción propia, localStorage).
- Cantidades, eliminar, subtotal de unidades (sin pasarela de pago: el pedido se cierra por WhatsApp).
- Botón **"Enviar pedido por WhatsApp"** que abre:
  `https://wa.me/<NUMERO_E164>?text=<mensaje_codificado>`
- El mensaje se autogenera, legible y ordenado. Plantilla:

```
Hola Nana Karamel 👋 Quiero hacer un pedido para recoger:

COOKIES
• 2× Lotus Cheesecake
• 1× Ferrero
TARTAS (encargo)
• 1× Tarta de Queso vasca — tamaño: [a consultar]

Nombre: ___
Día/hora de recogida: ___
¿Algún mensaje en chocolate?: ___

(enviado desde la web)
```

- Validar que el carrito no esté vacío; deshabilitar botón si lo está, con texto guía.

### 3C. Tarta personalizada "sin dolor" (3 pasos)
Flujo guiado, un dato por pantalla, basado en la guía real del feed:
1. **Nº de comensales** (rango: 5/6, 10/12… + edad: niños/adultos).
2. **Idea** (texto libre + "subir foto de referencia" opcional; nota: *no copiamos tartas, las usamos como inspiración*).
3. **Sabor** (bizcocho: chocolate/vainilla/limón/red velvet/zanahoria · buttercream: vainilla coloreable o chocolate).
- Aviso fijo: *No trabajamos con fondant ni impresiones en cartulina. Reserva con antelación.*
- Al terminar → vuelca todo al mismo mensaje de WhatsApp. Sin formularios largos: stepper con progreso, botón "Atrás/Siguiente", resumen final editable.

### 3D. Destacados
- Bloque "Esta semana/mes" alimentado por una pequeña config (objeto JS editable) para que cambien sin tocar el layout: cookie del mes, tarta destacada, producto recomendado.

**DoD:** se puede ver el menú, llenar carrito, configurar tarta en 3 pasos y abrir WhatsApp con todo precargado, en móvil y escritorio.

---

## FASE 4 — Responsive, accesibilidad y rendimiento
**Skill a evocar:** `frontend-design` (quality floor)

**Tareas**
- Responsive real hasta 360px: hero, grid de productos (1 col móvil / 2-3 desktop), carrito como bottom-sheet en móvil.
- Foco de teclado visible, navegación por teclado en stepper y carrito.
- `prefers-reduced-motion` respetado (animaciones de carga/hover desactivables).
- Imágenes optimizadas (WebP, lazy-load), SVG inline para ilustraciones.
- Contraste suficiente granate/crema en textos largos (usar `--tinta` para body).
- Sticky CTA de WhatsApp en móvil.

**DoD:** Lighthouse razonable, sin desbordes horizontales, todo operable con teclado.

---

## FASE 5 — Activos de marca de apoyo (entregables paralelos)
Solo si el cliente los pide; cada uno con su skill.

- **Carta/menú descargable PDF** fiel a la web → skill `pdf`.
- **Dossier de marca / guía de estilo** (paleta, tipos, usos del logo, tono) → skill `docx`.
- **Mini deck comercial** para captar encargos de tartas/eventos → skill `pptx`.
- **Hoja de precios / inventario interno** (no público) → skill `xlsx`.
- Si hay que **leer/extraer** de PDFs o imágenes que aporte el cliente → skills `file-reading` / `pdf-reading`.
- Si surge crear una **nueva skill reutilizable** (p. ej. "generador de mensaje WhatsApp") → skill `skill-creator`.
- Cualquier dato sobre productos de Anthropic que aparezca → skill `product-self-knowledge` (probablemente N/A aquí).

---

## FASE 6 — Cierre y handoff
**Skill a evocar:** `frontend-design` (self-critique) + entrega

- Autocrítica final: quitar un adorno (regla Chanel), verificar que la firma es lo único llamativo.
- Sustituir placeholders: `<NUMERO_E164>` (WhatsApp en formato internacional, ej. 34XXXXXXXXX), fotos reales, enlace IG, Google Maps embed de Avenida Monforte de Lemos 170.
- Checklist de conversión: CTA visible siempre, ≤2 clics del producto al WhatsApp, sin pasos muertos.
- Entregar `index.html` (+ assets) y documento de "cómo editar destacados y nº de WhatsApp".

---

## RESUMEN: SKILL POR FASE
| Fase | Skill principal | Entregable |
|---|---|---|
| 0 Descubrimiento | frontend-design | Plan de diseño + tokens |
| 1 Contenido/IA | frontend-design (writing) | Mapa + copy real |
| 2 Visual/maquetación | frontend-design | Home maquetada |
| 3 Conversión | frontend-design + JS | Menú + carrito WhatsApp + tarta 3 pasos |
| 4 Responsive/A11y | frontend-design | Web pulida y accesible |
| 5 Activos apoyo | pdf / docx / pptx / xlsx / file-reading | Menú PDF, guía marca, deck… |
| 6 Cierre | frontend-design | Handoff + checklist conversión |

---

## REGLAS INNEGOCIABLES
1. **Misma paleta y tipografías** que el feed. Nada de azules, nada de sans neutra genérica en titulares.
2. **WhatsApp es el destino de toda conversión.** No pasarela de pago, no carrito que "compra": carrito que **arma el mensaje**.
3. **Recogida en tienda, sin envíos** — comunicarlo sin que frene la conversión.
4. **Tarta personalizada en 3 pasos**, jamás un formulario largo.
5. **Responsive y accesible** como suelo de calidad, no como extra.
6. Tono Nana: cercano, artesano, juguetón. Cero corporativismo.
