import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import ViteSitemap from 'vite-plugin-sitemap';


const paths = [
  { path: '/', lastmod: new Date(), priority: 1.0, changefreq: 'yearly' },
  { path: '/kontakt', lastmod: new Date(), priority: 0.8, changefreq: 'yearly' },
  { path: '/uberuns', lastmod: new Date(), priority: 0.8, changefreq: 'yearly' },
  { path: '/news', lastmod: new Date(), priority: 0.6, changefreq: 'monthly' },
  { path: '/behandlungstechniken', lastmod: new Date(), priority: 0.7, changefreq: 'yearly' },
];

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['swiper-container', 'swiper-slide'].includes(tag),
        },
      },
    }),
  ],
  build: {
    rollupOptions: {
      plugins: [
        ViteSitemap({
          baseUrl: 'https://www.physio-bewegungswerk.ch',
          paths: paths,
        }),
      ],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    },
  },
});
