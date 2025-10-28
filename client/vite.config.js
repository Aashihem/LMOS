import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react( )],
  server: {
    host: true, // Allows access from other devices
    port: 5173, // Optional: Specify the port
    // allowedHosts:['all'],
    // allowedHosts: ['1cc1-106-215-183-208.ngrok-free.app'],
     allowedHosts: ['bebd-2409-40c0-6d-4c9f-10b4-d708-12ef-a823.ngrok-free.app', "http://127.0.0.1:8001/", "http://10.10.115.66:5173/","http://192.168.1.213:5173/"] // Add the host here
  },
})