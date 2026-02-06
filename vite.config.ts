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
    chunkSizeWarningLimit: 1000,
  },
  plugins: [react(), visualizer({ open: true })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
