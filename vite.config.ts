import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('/node_modules/') && !id.includes('\\node_modules\\')) return;
          const p = id.replace(/\\/g, '/');
          // Order matters: check analytics before react (its path contains "react")
          if (p.includes('/node_modules/@vercel/analytics/')) return 'vendor-analytics';
          if (p.includes('/node_modules/firebase/') || p.includes('/node_modules/@firebase/')) return 'vendor-firebase';
          if (
            p.includes('/node_modules/react/') ||
            p.includes('/node_modules/react-dom/') ||
            p.includes('/node_modules/scheduler/')
          ) return 'vendor-react';
        },
      },
    },
  },
  plugins: [
    react(),
    visualizer({
      filename: 'stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
