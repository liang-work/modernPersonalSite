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
