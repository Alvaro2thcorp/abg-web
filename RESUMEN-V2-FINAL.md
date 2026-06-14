# ABG Frame V2 — Resumen Final

Fecha: 2026-06-14  
Branch: home-v2-autonomo  
Build: ✅ 0 errores · 13 páginas generadas

**ABG Frame V2 lista para push a producción vía GitHub Desktop**

---

## Tareas completadas (Prompt 2/2)

### 1. Eliminar isotipo 3D decorativo del Hero
**Archivo:** `src/components/Hero.tsx`  
**Commit:** `fix(hero): eliminar isotipo 3D decorativo del fondo`

- Eliminado el bloque `<div>` con `backgroundImage: "url('/images/isotipo-3d.png')"` del fondo del Hero
- El Hero queda limpio: solo PlasmaWave (opacity 0.18) + contenido textual
- El isotipo del Navbar (PillNav) no fue tocado — sigue como logo clicable
- Verificado que ningún otro componente tenía referencias al isotipo decorativo

---

### 2. Fix definitivo responsive Hero — sin espacio en blanco
**Archivo:** `src/components/Hero.tsx`  
**Commit:** `fix(hero): responsive móvil definitivo — sin espacio en blanco`

- `minHeight: "100vh"` → `"auto"` — el hero ya no fuerza altura de pantalla completa
- `justifyContent: "flex-end"` → `"flex-start"` — contenido sube al top, no al bottom
- Padding ajustado: `clamp(5.5rem, 11vh, 8rem) clamp(1.25rem, 5vw, 5rem) clamp(2rem, 5vw, 4rem)`
- Media query móvil actualizado con clases `hero-title-main` / `hero-title-outline` para font-size forzado en 375px

---

### 3. Cambio de paleta global: rojo bisturí → rojo coral cálido
**Commit:** `feat(paleta): rojo bisturí #CC0000 → rojo coral cálido #D14124`

**Color nuevo:** `#D14124` — rojo coral cálido (ligeramente anaranjado, más cercano a marcas de lujo contemporáneas)  
**Hover/dark:** `#A8331C`

#### Archivos modificados (36 en total):

**Componentes principales:**
- `src/components/Hero.tsx`
- `src/components/Navbar.tsx`
- `src/components/FinalCTA.tsx`
- `src/components/ProblemaHome.tsx`
- `src/components/ElTimeline.tsx`
- `src/components/HomeProyectos.tsx`
- `src/components/Resenas.tsx`
- `src/components/HowItWorks.tsx`
- `src/components/WhyABG.tsx`
- `src/components/SectionTransition.tsx`
- `src/components/TechBanner.tsx`
- `src/components/TechBannerServicios.tsx`
- `src/components/FormularioPresupuestoModal.tsx`

**Servicios:**
- `src/components/servicios/ServiciosBento.tsx`
- `src/components/servicios/ServiciosCards.tsx`
- `src/components/servicios/ServiciosCTA.tsx`
- `src/components/servicios/ServiciosHero.tsx`
- `src/components/servicios/ServicioWeb.tsx`
- `src/components/servicios/ServicioSEO.tsx`
- `src/components/servicios/ServicioAds.tsx`
- `src/components/servicios/Precios.tsx`
- `src/components/servicios/SistemaCompleto.tsx`
- `src/components/servicios/SistemaOverview.tsx`

**Otros componentes:**
- `src/components/sistema/SistemaPage.tsx`
- `src/components/sobre/SobreHero.tsx`
- `src/components/sobre/Equipo.tsx`
- `src/components/blog/BlogCard.tsx`
- `src/components/contacto/Contacto.tsx`
- `src/components/proyectos/CasoYatesAlicante.tsx`
- `src/components/reactbits/PillNav.css`

**Layouts y páginas:**
- `src/layouts/Layout.astro` — variable `--accent` actualizada + comentario corregido
- `src/styles/global.css`
- `src/pages/blog/[slug].astro`
- `src/pages/blog/index.astro`
- `src/pages/proyectos/index.astro`
- `src/pages/servicios.astro`

#### Sustituciones realizadas:
- `#CC0000` / `#cc0000` → `#D14124`
- `rgba(204, 0, 0,` → `rgba(209, 65, 36,`
- `rgba(204,0,0,` → `rgba(209,65,36,`
- `#aa0000` → `#A8331C` (hover dark — solo en Navbar)
- Variable `--accent` → `#D14124`

#### Barrido final:
```
grep -rn "#CC0000|#cc0000|rgba(204" src/ → 0 resultados ✅
```

---

## Resumen de commits de la sesión completa (Prompt 1 + Prompt 2)

| Commit | Descripción |
|--------|-------------|
| `a82f1e0` | fix(hero): responsive móvil — padding y tamaños ajustados |
| `98bc606` | feat(navbar-mobile): menú desplegable editorial premium |
| `b0c1ced` | fix(antes-despues): responsive móvil — línea divisoria oculta y tamaños |
| `80136a7` | fix(sobre-hero): responsive móvil — eliminar espacio en blanco |
| `d82aa5d` | feat(sistema): copy actualizado — Pablo Lizón como partner colaborador |
| `2890c98` | fix(responsive): revisión general 375px — ticket, proyectos, footer, reseñas, servicios, logos |
| `e32ccc8` | fix(hero): eliminar isotipo 3D decorativo del fondo |
| `8841957` | fix(hero): responsive móvil definitivo — sin espacio en blanco |
| `d1a38b6` | feat(paleta): rojo bisturí #CC0000 → rojo coral cálido #D14124 |

---

## Estado final

| Check | Estado |
|-------|--------|
| `npm run build` | ✅ 0 errores · 13 páginas |
| Hero limpio (sin isotipo de fondo) | ✅ |
| Hero móvil 375px — sin espacio en blanco | ✅ |
| Paleta coral cálida aplicada globalmente | ✅ |
| Barrido `#CC0000` — 0 restos | ✅ |
| Variable `--accent` actualizada | ✅ |
| Push pendiente | ⏳ Usuario lo hará con GitHub Desktop |
