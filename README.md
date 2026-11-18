# abgframe.com

Web de ABGFRAME, agencia web para arquitectura, interiorismo, construcción, reformas, promotoras e inmobiliarias.

- Astro 5, sin frameworks de cliente: el JavaScript es el mínimo para las piezas interactivas (`src/scripts/site.ts`).
- Marca v2: Archivo (en `public/fonts`, recortada a latín), papel/hormigón/tinta y azul acero. Fuente de verdad: `../brand/brand.html`.
- Textos en español e inglés: cada vista está en `src/views/` y recibe `lang`; las rutas viven en `src/i18n.ts`.
- Formulario: Formspree `meerbynw`. Analítica: GTM-PQ76T6V6.
- Despliegue: Netlify desde `main`. Redirecciones y cabeceras en `public/_redirects` y `public/_headers`.

```sh
npm install
npm run dev     # http://localhost:4321
npm run build   # genera dist/
```
