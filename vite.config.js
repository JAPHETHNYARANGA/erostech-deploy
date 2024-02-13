import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      // '/customers': 'http://localhost:3000',
      // // '/users': 'http://localhost:3000',
      // '/api': 'http://localhost:3000',
      // '/member_details': 'http://localhost:3000',
      // '/invoices': 'http://localhost:3000',
      // '/loading_depots': 'http://localhost:3000',
      // '/proforma_invoices': 'http://localhost:3000',
      // '/mainlines': 'http://localhost:3000',
      // '/proforma_invoice_rows': 'http://localhost:3000',
      // '/gatepasses': 'http://localhost:3000',
      // '/entries': 'http://localhost:3000',
      
    }
  }
   
})
