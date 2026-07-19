# Resumen — Retoques finales

## Tarea 1 — Hero móvil: más espacio vertical
**Commit:** `fix(hero): más espacio vertical en móvil`

- Añadido `className="hero-section"` al `<section>` principal de `Hero.tsx`
- Añadida regla CSS en `@media (max-width: 767px)`:
  - `min-height: 88vh` — el hero ocupa ~88% de la pantalla en móvil
  - `justify-content: center` — el contenido queda centrado verticalmente

---

## Tarea 2 — Menú móvil: botón X visible al cerrar
**Commit:** `fix(navbar-mobile): X de cerrar visible por encima del menú desplegado`

- `PillNav.css` → `.pill-nav-container`: `z-index: 99` → `z-index: 1000`
  - El contenedor del navbar queda por encima del `.mobile-menu-popover` (`z-index: 998`)
- `.mobile-menu-button`: añadido `border: 1px solid rgba(242,240,237,0.15)` para que el círculo del botón destaque sobre el fondo negro del menú

---

## Tarea 3 — PillNav: efecto glass con borde naranja
**Commit:** `feat(navbar): efecto glass con borde naranja en PillNav y CTA`

- `PillNav.css` → `.pill-nav-items`:
  - Fondo: `rgba(8,8,8,0.55)` + `backdrop-filter: blur(20px) saturate(140%)`
  - Borde naranja sutil: `1px solid rgba(209,65,36,0.22)`
  - Sombra interior y exterior para profundidad
- `Navbar.tsx` → botón CTA "Presupuesto":
  - Fondo: `rgba(209,65,36,0.85)` + `backdrop-filter`
  - Borde: `1px solid rgba(242,240,237,0.15)`
  - Hover → color sólido `#D14124` para feedback claro

---

## Tarea 4 — Unificar CTAs: todos los botones de presupuesto abren el modal
**Commit:** `feat(cta): unificar botones de presupuesto — todos abren el modal`

- `Hero.tsx`:
  - Import `useState` + `FormularioPresupuestoModal`
  - Estado `modalOpen`
  - `<a href="/contacto">` → `<button onClick={() => setModalOpen(true)}>`
  - Modal renderizado dentro del componente

- `ProblemaHome.tsx` (ticket "Coste de tenerla: Pregúntanos"):
  - Import `useState` + `FormularioPresupuestoModal`
  - Estado `modalOpen`
  - `<a href="/contacto">` → `<button onClick={() => setModalOpen(true)}>`
  - Modal renderizado dentro del componente
  - Selector CSS responsive actualizado de `> a` a `> button`

---

## Verificación

- `npm run build` → **0 errores**, 13 páginas generadas
- La página `/contacto` sigue accesible desde el menú de navegación
- NO se ha hecho push (pendiente de GitHub Desktop)
