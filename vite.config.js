// vite.config.js
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import serverApp from './server/index.js';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'dayone-api-server',
      configureServer(server) {
        // Mount Express API directly into Vite dev server middleware
        server.middlewares.use(serverApp);
      }
    }
  ],
  server: {
    port: 5173,
    host: true
  }
});
