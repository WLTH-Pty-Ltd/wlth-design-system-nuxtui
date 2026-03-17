// WLTH Design System — Nuxt Layer
// Extend this layer in any Nuxt app to inherit the full WLTH design system:
// fonts, color tokens, semantic UI variables, and Nuxt UI component defaults.
//
// Usage in consuming app's nuxt.config.ts:
//   extends: ['@wlth/design-system']
//
// ⚠️  Nuxt 4 srcDir note:
// Because this layer has an app/ directory, Nuxt 4 sets srcDir = app/ for the
// layer. All auto-discovered files (app.config, components, composables, etc.)
// MUST live inside app/. Files at the layer root are NOT scanned.
// - Correct: app/app.config.ts
// - Ignored: app.config.ts  ← Nuxt never sees it, ui.* overrides silently fail
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@vueuse/nuxt'],
  css: [fileURLToPath(new URL('./assets/css/tokens.css', import.meta.url))],
  colorMode: {
    preference: 'light'
  }
})
