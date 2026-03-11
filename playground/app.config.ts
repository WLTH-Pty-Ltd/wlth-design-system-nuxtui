// Playground-specific app config — provides demo nav items so the AppHeader
// preview shows a realistic working state. Consuming apps do the same in their
// own app/app.config.ts.
export default defineAppConfig({
  wlth: {
    product: 'broker',
    navItems: [
      { label: 'Home', isHome: true, to: '/' },
      { label: 'Components', icon: 'i-lucide-layers', to: '/components/bespoke/navigation' },
      { label: 'Tokens', icon: 'i-lucide-palette', to: '/components/tokens' },
      { label: 'Setup', icon: 'i-lucide-book-open', to: '/setup' },
    ],
  },
})
