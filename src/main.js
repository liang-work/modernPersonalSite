import { createApp } from 'vue'
import App from './App.vue'
import config from '@config/site.config.json'
import './styles/global.css'

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

function setRootVar(name, value) {
  document.documentElement.style.setProperty(name, value)
}

const app = createApp(App)

app.mount('#app')

document.title = config.site.title

const metaDesc = document.querySelector('meta[name="description"]')
if (metaDesc) {
  metaDesc.setAttribute('content', config.site.description)
} else {
  const el = document.createElement('meta')
  el.setAttribute('name', 'description')
  el.setAttribute('content', config.site.description)
  document.head.appendChild(el)
}

const metaKeywords = document.querySelector('meta[name="keywords"]')
if (!metaKeywords) {
  const el = document.createElement('meta')
  el.setAttribute('name', 'keywords')
  el.setAttribute('content', config.site.keywords)
  document.head.appendChild(el)
}

const favicon = document.querySelector('link[rel="icon"]')
if (favicon) {
  favicon.setAttribute('href', config.site.favicon)
} else {
  const el = document.createElement('link')
  el.setAttribute('rel', 'icon')
  el.setAttribute('href', config.site.favicon)
  document.head.appendChild(el)
}

document.documentElement.setAttribute('lang', config.site.lang)

const rgb = hexToRgb(config.accent)
if (rgb) {
  setRootVar('--accent', config.accent)
  setRootVar('--accent-glow', `rgba(${rgb.r},${rgb.g},${rgb.b},0.35)`)
  setRootVar('--accent-subtle', `rgba(${rgb.r},${rgb.g},${rgb.b},0.08)`)
  setRootVar(
    '--accent-hover',
    `rgba(${Math.max(0, rgb.r - 30)},${Math.max(0, rgb.g - 30)},${Math.max(0, rgb.b - 30)})`
  )
}

setRootVar('--bg-primary', config.background.color)

if (config.background.image) {
  setRootVar('--bg-image', `url(${config.background.image})`)
}
