import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://teapisacbenes.com',
  base: '/',
  output: 'static',
  build: {
    assets: 'assets'
  },
  vite: {
    build: {
      cssMinify: true,
      minify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['astro']
          }
        }
      }
    }
  },
  compressHTML: true,
  experimental: {
    optimizeHoistedScript: true
  }
});
