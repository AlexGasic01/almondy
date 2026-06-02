import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/cal-slots": {
        target: "https://api.cal.com",
        changeOrigin: true,
        rewrite: () => "/v1/slots",
      },
      "/api/cal-book": {
        target: "https://api.cal.com",
        changeOrigin: true,
        rewrite: (path) => {
          const qs = path.split("?")[1] || "";
          return `/v1/bookings${qs ? "?" + qs : ""}`;
        },
      },
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
