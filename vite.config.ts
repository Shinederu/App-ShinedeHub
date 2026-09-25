import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600
  },
  server: {
    // Native Windows file events are unreliable on the P: network share.
    watch: {
      usePolling: process.platform === 'win32',
      interval: 500
    },
    fs: {
      allow: ['..']
    }
  },
  resolve: {
    // Shared source modules must use this app's React, not a second copy.
    dedupe: ['react', 'react-dom'],
    alias: [
      { find: '@', replacement: path.resolve(import.meta.dirname, 'src') },
      { find: '@pages', replacement: path.resolve(import.meta.dirname, 'src/pages') },
      { find: '@comp', replacement: path.resolve(import.meta.dirname, 'src/components') },
      { find: '@shinederu/auth-core', replacement: path.resolve(import.meta.dirname, '../Module-Auth-Core/src/index.ts') },
      { find: '@shinederu/auth-react', replacement: path.resolve(import.meta.dirname, '../Module-Auth-React/src/index.ts') }
    ]
  }
});
