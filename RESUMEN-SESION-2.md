# Resumen Sesión 2 — ABG Frame Web v2

Fecha: 2026-06-14  
Rama: home-v2-autonomo

## Tareas completadas

### T1 — Ticket CTA en ProblemaHome ✓
- Añadido bloque tipo "ticket de recibo" después del párrafo "Trabaja para ti las 24 horas..."
- Card oscura con línea gradiente roja superior, texto "Coste de no tener una web: Incalculable" y botón "Solicitar presupuesto →"
- Commit: `feat(home): ticket CTA después de "tu web no es un escaparate"`

### T2 — Efectos visuales en ElTimeline (Antes/Después) ✓
- Reescritura completa con `useScroll` + `useTransform` para efectos de scroll
- Glow radial rojo animado de fondo
- Divisor vertical con gradiente animado
- Shimmer de barrido en la columna "Después"
- Blur reveal (`filter: blur`) en entradas de lista
- Commit: `feat(home): Antes/Después con efectos visuales y shimmer`

### T3 — Reseñas más compactas ✓
- Padding sección: `clamp(5rem, 10vw, 8rem)` → `clamp(3.5rem, 7vw, 6rem)`
- Texto reseña: `clamp(1.3rem, 2.5vw, 2rem)` → `clamp(1rem, 1.6vw, 1.35rem)`, maxWidth 720px
- minHeight carrusel: `280px` → `200px`
- Indicadores: marginTop `3rem` → `2rem`, paddingTop `2rem` → `1.5rem`
- Nombre autor: `1.1rem` → `0.95rem`
- Commit: `style(resenas): carrusel más compacto y ergonómico`

### T4 — Rediseño /servicios con bento cards + precios ✓
- Nuevo componente: `src/components/servicios/ServiciosBento.tsx`
- 3 cards con glow effect en hover, layout bento `auto-fit minmax(320px, 1fr)`
- Precios: "Desde 2.000€" / "Desde 350€/mes" / "Desde 4.500€ + 450€/mes"
- Nota explicativa de precios con borde izquierdo rojo
- `servicios.astro` actualizado para usar `ServiciosBento client:visible`
- Commit: `feat(servicios): bento cards con glow + precios desde 2.000€`

### T5 — /el-sistema HERO más claro ✓
- Lista de servicios actualizada: 4 bullets separados incluyendo "Meta Ads opcional (publicidad de pago)"
- Texto descriptivo actualizado: "Meta Ads disponible como complemento opcional"
- Eliminadas referencias que mezclaban Social Media + Meta Ads en un solo bullet
- Commit: `feat(sistema): hero clarificado, separación servicios + Meta Ads opcional`

### T6 — Blog: nuevo título + 2 entradas nuevas ✓
- H1 del blog: "Marketing digital sin filtros" → "Conversaciones sin filtros"
- Nueva entrada destacada: `web-premium-vs-plantilla.md` (7 min, featured: true)
- Nueva entrada: `cuando-saber-redisenar-web.md` (6 min, featured: false)
- Commit: `feat(blog): nuevo título + 2 entradas nuevas sobre web premium y rediseño`

### T7 — Datos de contacto actualizados ✓
- Email: `hola@abgframe.com` → `contacto@abgframe.com` en:
  - `src/pages/contacto.astro` (schema JSON-LD)
  - `src/layouts/Layout.astro` (schema JSON-LD global)
  - `src/components/contacto/Contacto.tsx` (link visible)
- `@alvarobergillos` añadido en `src/components/sobre/Equipo.tsx` con enlace a Instagram
- `@abgframe` en footer ya estaba correcto (`FinalCTA.tsx`)
- Commit: `feat(contacto): email contacto@abgframe.com + @alvarobergillos en sobre nosotros`

## Verificación
- `npm run build` — 0 errores, 13 páginas generadas
- Sin push (pendiente vía GitHub Desktop)
- 0 menciones a Google Ads en contenido nuevo
- Sin restricción geográfica en entradas de blog
