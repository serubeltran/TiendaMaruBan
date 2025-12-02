import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Minificación y optimización
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    // Code splitting para mejorar caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar librerías grandes
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'bootstrap-vendor': ['react-bootstrap'],
        },
      },
    },
    // Optimizaciones de chunk
    chunkSizeWarningLimit: 500,
    sourcemap: false,
  },
})
