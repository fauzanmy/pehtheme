import { defineConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';
import nunjucks from 'vite-plugin-nunjucks';
import siteData from './src/data/site.json';

const root = resolve(__dirname, 'src/pages');

export default defineConfig({
  root,
  base: '/',
  plugins: [
    tailwindcss(),
    nunjucks({
      templatesDir: resolve(__dirname, 'src'),
      variables: {
        'index.html': siteData,
        'about/index.html': siteData,
        'contact/index.html': siteData,
        'services/index.html': siteData,
        'page/index.html': siteData,
      },
    }),
  ],
  server: {
    host: true,
    allowedHosts: ['code-server.lan', '192.168.69.69', 'localhost'],
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.njk'),
        about: resolve(root, 'about/index.njk'),
        contact: resolve(root, 'contact/index.njk'),
        services: resolve(root, 'services/index.njk'),
        page: resolve(root, 'page/index.njk'),
      },
    },
  },
});