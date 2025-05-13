import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Allows access from other devices
    port: 5173, // Optional: Specify the port
    allowedHosts:['*']
    // allowedHosts: ['1cc1-106-215-183-208.ngrok-free.app'],
    // allowedHosts: ['07e4-2409-40c0-105e-afd5-514a-4a81-b457-7d2.ngrok-free.app'] // Add the host here
  },
})