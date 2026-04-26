import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material', '@emotion/react', '@emotion/styled'],
          router: ['react-router-dom'],
          utils: ['axios', 'react-hot-toast', 'react-type-animation']
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Increase limit to 1000kb
  }
})
