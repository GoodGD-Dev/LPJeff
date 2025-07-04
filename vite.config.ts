import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {},
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@sections': path.resolve(__dirname, './src/sections'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@ui': path.resolve(__dirname, './src/ui')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
