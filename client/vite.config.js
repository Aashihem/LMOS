import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Allows access from other devices
    port: 5173, // Optional: Specify the port
    // allowedHosts:['all'],
    // allowedHosts: ['1cc1-106-215-183-208.ngrok-free.app'],
     allowedHosts: ['4b75-103-104-226-58.ngrok-free.app', "http://127.0.0.1:8001/", "http://10.10.118.82:5173/"] // Add the host here
  },
})