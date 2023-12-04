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
console.log('Paths:', paths);

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['swiper-container', 'swiper-slide'].includes(tag),
        },
      },
    }),
    ViteSitemap({
      baseUrl: 'https://www.physio-bewegungswerk.ch',
      paths: paths,
    }),
  ],
  build: {
    rollupOptions: {
      plugins: [],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    },
  },
});
