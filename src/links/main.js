import { createApp } from 'vue'
import App from './App.vue'
import config from '@config/site.config.json'
import linksConfig from '@config/links.config.json'
import '../styles/global.css'

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return r ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) } : null
}

const accentRgb = hexToRgb(config.accent)
if (accentRgb) {
  const root = document.documentElement
  root.style.setProperty('--accent', config.accent)
  root.style.setProperty('--accent-glow', `rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.35)`)
  root.style.setProperty('--accent-subtle', `rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.08)`)
  root.style.setProperty('--accent-hover', `rgba(${Math.max(0, accentRgb.r - 30)},${Math.max(0, accentRgb.g - 30)},${Math.max(0, accentRgb.b - 30)})`)
}

document.documentElement.style.setProperty('--bg-primary', config.background.color)
if (config.background.image) {
  document.documentElement.style.setProperty('--bg-image', `url(${config.background.image})`)
}

createApp(App).mount('#app')
