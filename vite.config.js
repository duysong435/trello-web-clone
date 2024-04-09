import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr()
  ],
  // envPrefix: {
  //   API_URL: process.env.REACT_APP_API_URL,
  //   SECRET_KEY: process.env.REACT_APP_SECRET_KEY
  // },
  //  base: "./",
  resolve: {
    alias: [
      { find: '~', replacement: '/src' }
    ]
  }
})
