import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Páginas que no deben aparecer en Google todavía (la demo llega con P2).
const NOINDEX = ['/demo/', '/en/demo/', '/404'];

export default defineConfig({
  site: 'https://abgframe.com',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  integrations: [
    sitemap({
      filter: (page) => !NOINDEX.some((p) => page.endsWith(p) || page.includes('/demo/')),
      i18n: { defaultLocale: 'es', locales: { es: 'es-ES', en: 'en' } },
    }),
  ],
});
