import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { readFileSync, existsSync } from 'fs'

function getProjectEntries() {
  const entriesPath = new URL('./_project-entries.json', import.meta.url)
  if (!existsSync(entriesPath)) return {}
  const list = JSON.parse(readFileSync(entriesPath, 'utf-8'))
  const input = {}
  for (const { slug } of list) {
    const htmlPath = fileURLToPath(new URL(`./project-${slug}.html`, import.meta.url))
    input[`project-${slug}`] = htmlPath
  }
  return input
}

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@config': fileURLToPath(new URL('./config', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL('./index.html', import.meta.url)),
        projects: fileURLToPath(new URL('./projects.html', import.meta.url)),
        ...getProjectEntries(),
      }
    }
  }
})
