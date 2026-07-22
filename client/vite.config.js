/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg', 'company-logo.jpeg'],
    manifest: {
      name: 'Techno Drone Robotics',
      short_name: 'TDR',
      description: 'Pioneering autonomous drone technology for aerial mapping, inspection, surveillance, and industrial applications.',
      theme_color: '#0B1E3D',
      background_color: '#0B1E3D',
      icons: [
        { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' },
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,gif,webp,woff2}'],
      runtimeCaching: [
        { urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i, handler: 'CacheFirst', options: { cacheName: 'unsplash-images', expiration: { maxEntries: 50, maxAgeSeconds: 86400 * 30 } } },
        { urlPattern: /^https:\/\/api\.*/i, handler: 'NetworkFirst', options: { cacheName: 'api-cache' } },
      ],
    },
  })],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: true,
  },
  server: {
    port: 3000,
    proxy: { '/api': 'http://localhost:5000' },
  },
  build: {
    outDir: 'dist',
  },
});
