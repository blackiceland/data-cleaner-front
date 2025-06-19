import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    legacy({ targets: ['defaults', 'not IE 11'] }),
    viteSingleFile()
  ]
})
