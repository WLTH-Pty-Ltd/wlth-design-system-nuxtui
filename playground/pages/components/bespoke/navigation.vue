<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const subComponents = [
  {
    name: 'AppHeader',
    file: 'app/components/AppHeader.vue',
    desc: 'Root header shell. Three-zone layout: left (logo + product switcher), center (nav pill), right (utility cluster). Height adapts from 64px mobile → 80px tablet → 100px desktop.'
  },
  {
    name: 'ProductSwitcher',
    file: 'app/components/ProductSwitcher.vue',
    desc: 'Pill button showing the active product label. Opens a dropdown to switch between Broker, Pay, Shareholder, Dashboard, and Customer — each opening in a new tab at the product\'s base URL.'
  },
  {
    name: 'ProductNav',
    file: 'app/components/ProductNav.vue',
    desc: 'Horizontal pill nav bar (tablet+ only) rendering the active product\'s navItems. Tracks active label via useHeader composable.'
  },
  {
    name: 'EntitySelector',
    file: 'app/components/EntitySelector.vue',
    desc: 'Displays the current entity avatar and name. Opens a dropdown to switch entities. Persists selection to localStorage via useHeader.'
  },
  {
    name: 'HeaderUtilityCluster',
    file: 'app/components/HeaderUtilityCluster.vue',
    desc: 'Right-side pill grouping entity selector, notifications tray, and user avatar. Composed from EntitySelector, NotificationsTray, and ProfileMenu.'
  },
  {
    name: 'ProfileMenu',
    file: 'app/components/ProfileMenu.vue',
    desc: 'User avatar button with dropdown showing name, email, role switcher, and sign out. Reads from MOCK_USER in useHeader.'
  },
  {
    name: 'NotificationsTray',
    file: 'app/components/NotificationsTray.vue',
    desc: 'Bell icon with unread count badge. Opens NotificationsSlideover. Reads filtered notifications from useHeader.'
  },
  {
    name: 'NotificationsSlideover',
    file: 'app/components/NotificationsSlideover.vue',
    desc: 'Slideover listing all notifications with read/unread state, mark-all-read, and scope toggle (all products vs current product).'
  },
  {
    name: 'MobileMenuDrawer',
    file: 'app/components/MobileMenuDrawer.vue',
    desc: 'Full-height drawer for mobile (<md). Shows product switcher, nav items, entity selector, and profile — everything hidden behind the hamburger menu.'
  },
  {
    name: 'AppPageLoader',
    file: 'app/components/AppPageLoader.vue',
    desc: 'Thin progress bar at the top of the page driven by usePageLoader composable. Triggered on route navigation start/end.'
  }
]
</script>

<template>
  <div class="max-w-7xl mx-auto px-10 py-12 space-y-14">

    <div class="space-y-1">
      <h1 class="text-2xl font-semibold text-default">App Header</h1>
      <p class="text-sm text-toned">Bespoke navigation system — product switcher, nav pill, entity selector, and utility cluster. Driven by the <code class="text-xs font-mono bg-elevated px-1 py-0.5 rounded">useHeader</code> composable.</p>
    </div>

    <!-- Live preview -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Live preview</h2>
        <p class="text-sm text-toned">Full-width render of the AppHeader component with mock data. Use the product switcher and entity selector to see state changes.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <AppHeader />
      </div>
    </section>

    <USeparator />

    <!-- Sub-component breakdown -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Sub-components</h2>
        <p class="text-sm text-toned">The header is composed from these individual components, all auto-imported by the layer.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div
          v-for="(comp, i) in subComponents"
          :key="comp.name"
          class="flex items-start gap-4 px-5 py-4"
          :class="i !== 0 ? 'border-t border-muted' : ''"
        >
          <div class="w-8 h-8 rounded-lg bg-royalblue-50 flex items-center justify-center shrink-0 mt-0.5">
            <UIcon name="i-lucide-component" class="text-royalblue-500 text-sm" />
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <p class="text-sm font-semibold text-default">{{ comp.name }}</p>
              <span class="font-mono text-[10px] text-toned bg-elevated px-1.5 py-0.5 rounded">{{ comp.file }}</span>
            </div>
            <p class="text-xs text-toned mt-1 leading-relaxed">{{ comp.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Composables -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Composables</h2>
        <p class="text-sm text-toned">Shared state and logic provided by the layer.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="flex items-start gap-4 px-5 py-4">
          <div class="w-8 h-8 rounded-lg bg-royalblue-50 flex items-center justify-center shrink-0 mt-0.5">
            <UIcon name="i-lucide-zap" class="text-royalblue-500 text-sm" />
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <p class="text-sm font-semibold text-default">useHeader</p>
              <span class="font-mono text-[10px] text-toned bg-elevated px-1.5 py-0.5 rounded">app/composables/useHeader.ts</span>
            </div>
            <p class="text-xs text-toned mt-1 leading-relaxed">Shared composable (createSharedComposable) managing current product, current entity, notifications, roles, and actions. Persists entity and scope to localStorage via VueUse.</p>
          </div>
        </div>
        <div class="flex items-start gap-4 px-5 py-4 border-t border-muted">
          <div class="w-8 h-8 rounded-lg bg-royalblue-50 flex items-center justify-center shrink-0 mt-0.5">
            <UIcon name="i-lucide-zap" class="text-royalblue-500 text-sm" />
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <p class="text-sm font-semibold text-default">useDashboard</p>
              <span class="font-mono text-[10px] text-toned bg-elevated px-1.5 py-0.5 rounded">app/composables/useDashboard.ts</span>
            </div>
            <p class="text-xs text-toned mt-1 leading-relaxed">Manages mobile menu open state and sidebar collapsed state. Used by AppHeader to trigger the MobileMenuDrawer.</p>
          </div>
        </div>
        <div class="flex items-start gap-4 px-5 py-4 border-t border-muted">
          <div class="w-8 h-8 rounded-lg bg-royalblue-50 flex items-center justify-center shrink-0 mt-0.5">
            <UIcon name="i-lucide-zap" class="text-royalblue-500 text-sm" />
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <p class="text-sm font-semibold text-default">usePageLoader</p>
              <span class="font-mono text-[10px] text-toned bg-elevated px-1.5 py-0.5 rounded">app/composables/usePageLoader.ts</span>
            </div>
            <p class="text-xs text-toned mt-1 leading-relaxed">Controls the AppPageLoader progress bar. Call start() on navigation begin and finish() on navigation end.</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
