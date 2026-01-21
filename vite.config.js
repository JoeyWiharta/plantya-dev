import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
    base: process.env.VITE_ENV === "production" ? "/plantya/" : "/plantya/",  
    // base: "/plantya/", ==== Ato pake ini ====
})

// export default defineConfig({
//   base: process.env.VITE_APP_APIKEY === "production" ? "/sf/" : "/sf/",
//   plugins: [react()],
//   esbuild: {
//     jsxFactory: 'h',
//     jsxFragment: 'Fragment',
//   }
// })
