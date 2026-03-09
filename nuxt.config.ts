// WLTH Design System — Nuxt Layer
// Extend this layer in any Nuxt app to inherit the full WLTH design system:
// fonts, color tokens, semantic UI variables, and Nuxt UI component defaults.
//
// Usage in consuming app's nuxt.config.ts:
//   extends: ['@wlth/design-system']
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@vueuse/nuxt'],
  css: [fileURLToPath(new URL('./assets/css/tokens.css', import.meta.url))],
  colorMode: {
    preference: 'light'
  }
})
