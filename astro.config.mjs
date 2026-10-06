import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import path from 'path';

export default defineConfig({
  site: 'https://abgframe.com',
  integrations: [react(), sitemap({ filter: (page) => !page.includes('/el-sistema') && !page.includes('/demos/') && !page.includes('/yates-alicante') })],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('./src')
      }
    }
  },
});
