import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://fluffy-fiesta-rv97p9r64w425w94-5173.app.github.dev',
        changeOrigin: true,
        secure: false,  // Allow self-signed SSL certificates
      },
    },
  },
});
