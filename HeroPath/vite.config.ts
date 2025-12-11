import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Vite Configuration
 * 
 * Vite is the build tool and development server for this project.
 * This configuration file defines how Vite should process and bundle the application.
 * 
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  // React plugin enables Fast Refresh and JSX/TSX transformation
  plugins: [react()],
})
