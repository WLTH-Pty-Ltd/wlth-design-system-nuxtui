<script setup lang="ts">
import { useHeader } from '../../../../app/composables/useHeader'
definePageMeta({ layout: 'docs' })

const { currentProductId } = useHeader()

const productItems = [
  { label: 'Broker',      value: 'broker' },
  { label: 'Pay',         value: 'pay' },
  { label: 'Shareholder', value: 'shareholder' },
  { label: 'Dashboard',   value: 'dashboard' },
  { label: 'Customer',    value: 'customer' }
]

const subComponents = [
  {
    name: 'AppHeader',
    file: 'app/components/AppHeader.vue',
    desc: 'Root header shell. Three-zone layout: left (logo + product switcher), center (nav pill), right (utility cluster). Height adapts from 64px mobile → 80px tablet → 100px desktop.'
  },
  {
    name: 'ProductSwitcher',
    file: 'app/components/ProductSwitcher.vue',
    desc: 'Pill button showing the active product label. Opens a dropdown to switch between all products — each opening in a new tab at the product\'s base URL.'
  },
  {
    name: 'ProductNav',
    file: 'app/components/ProductNav.vue',
    desc: 'Horizontal pill nav bar (tablet+ only) rendering the active product\'s navItems. Supports to/href routing on each item. Tracks active label via useHeader.'
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

const composables = [
  {
    name: 'useHeader',
    file: 'app/composables/useHeader.ts',
    desc: 'Shared composable (createSharedComposable) managing current product, current entity, notifications, roles, and actions. Reads initial product from app.config wlth.product. Persists entity and scope to localStorage via VueUse.'
  },
  {
    name: 'useDashboard',
    file: 'app/composables/useDashboard.ts',
    desc: 'Manages mobile menu open state and sidebar collapsed state. Used by AppHeader to trigger the MobileMenuDrawer.'
  },
  {
    name: 'usePageLoader',
    file: 'app/composables/usePageLoader.ts',
    desc: 'Controls the AppPageLoader progress bar. Call start() on navigation begin and finish() on navigation end.'
  }
]

const products = [
  { id: 'broker',      label: 'Broker',      icon: 'i-lucide-briefcase',        navItems: 'Home, Products, Applications, Support' },
  { id: 'pay',         label: 'Pay',          icon: 'i-lucide-credit-card',      navItems: 'Home, Payments, Payees, Cards' },
  { id: 'shareholder', label: 'Shareholder',  icon: 'i-lucide-trending-up',      navItems: 'Home, Documents, Transactions' },
  { id: 'dashboard',   label: 'Dashboard',    icon: 'i-lucide-layout-dashboard', navItems: 'Home' },
  { id: 'customer',    label: 'Customer',     icon: 'i-lucide-user',             navItems: 'Home' }
]
</script>

<template>
  <div class="max-w-7xl mx-auto px-10 py-12 space-y-14">

    <!-- ─── 1. Overview ─────────────────────────────────────────────────── -->
    <div class="space-y-3">
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-default">App Header</h1>
        <p class="text-sm text-toned">
          Bespoke navigation system shared across all WLTH products. Composed of a product switcher,
          nav pill, entity selector, and utility cluster — all driven by the
          <code class="text-xs font-mono bg-elevated px-1 py-0.5 rounded">useHeader</code> composable.
          Each consuming app configures its product variant once via
          <code class="text-xs font-mono bg-elevated px-1 py-0.5 rounded">app.config.ts</code>.
        </p>
      </div>
      <a
        href="https://pencil-dev-test.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 text-sm font-medium text-royalblue-500 hover:text-royalblue-600 transition-colors"
      >
        <UIcon name="i-lucide-external-link" class="size-4" />
        WLTH Hub — Live Demo
        <span class="text-xs text-toned font-normal">(pencil-dev-test.vercel.app — rename pending)</span>
      </a>
    </div>

    <!-- ─── 2. Preview ───────────────────────────────────────────────────── -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Preview</h2>
        <p class="text-sm text-toned">Live render with mock data. Switch the product variant below to see how the header adapts.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="overflow-hidden">
          <AppHeader />
        </div>
        <div class="border-t border-muted px-5 py-3 flex flex-wrap gap-3 items-center bg-muted">
          <span class="text-xs text-toned">Product variant</span>
          <USelect v-model="currentProductId" :items="productItems" value-key="value" size="xs" class="w-36" />
        </div>
      </div>
    </section>

    <USeparator />

    <!-- ─── 3. Usage ─────────────────────────────────────────────────────── -->
    <section class="space-y-6">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Usage</h2>
        <p class="text-sm text-toned">How to add the header to a consuming app and configure the product variant.</p>
      </div>

      <!-- Step 1: extend the layer -->
      <div class="space-y-2">
        <p class="text-xs font-semibold text-toned uppercase tracking-wider">Step 1 — Extend the design system layer</p>
        <div class="rounded-xl border border-muted overflow-hidden bg-muted">
          <div class="px-5 py-4 space-y-2">
            <p class="text-sm text-toned">In the consuming app's <code class="text-xs font-mono bg-elevated px-1 py-0.5 rounded">nuxt.config.ts</code>, extend the layer:</p>
            <pre class="text-xs font-mono bg-elevated rounded-lg px-4 py-3 overflow-x-auto leading-relaxed text-default"><code>// nuxt.config.ts
export default defineNuxtConfig({
  extends: ['@wlth/design-system']
})</code></pre>
            <p class="text-xs text-toned">All header components and composables are auto-imported — no explicit imports needed.</p>
          </div>
        </div>
      </div>

      <!-- Step 2: configure product variant -->
      <div class="space-y-2">
        <p class="text-xs font-semibold text-toned uppercase tracking-wider">Step 2 — Configure the product variant</p>
        <div class="rounded-xl border border-muted overflow-hidden bg-muted">
          <div class="px-5 py-4 space-y-3">
            <p class="text-sm text-toned">
              Set <code class="text-xs font-mono bg-elevated px-1 py-0.5 rounded">wlth.product</code> to the product ID.
              Provide <code class="text-xs font-mono bg-elevated px-1 py-0.5 rounded">wlth.navItems</code> with real routes
              for this app — these override the design system defaults.
            </p>
            <pre class="text-xs font-mono bg-elevated rounded-lg px-4 py-3 overflow-x-auto leading-relaxed text-default"><code>// app.config.ts
export default defineAppConfig({
  wlth: {
    product: 'pay',
    navItems: [
      { label: 'Home',     isHome: true,                 to: '/' },
      { label: 'Payments', icon: 'i-lucide-credit-card', to: '/payments' },
      { label: 'Payees',   icon: 'i-lucide-users',       to: '/payees' },
      { label: 'Cards',    icon: 'i-lucide-wallet',      to: '/cards' }
    ]
  }
})</code></pre>
            <p class="text-xs text-toned">
              If <code class="text-xs font-mono bg-elevated px-1 py-0.5 rounded">navItems</code> is omitted,
              the header uses the defaults from
              <code class="text-xs font-mono bg-elevated px-1 py-0.5 rounded">useHeader.ts</code>.
              If <code class="text-xs font-mono bg-elevated px-1 py-0.5 rounded">product</code> is omitted,
              it defaults to <code class="text-xs font-mono bg-elevated px-1 py-0.5 rounded">broker</code>.
            </p>
          </div>
        </div>
      </div>

      <!-- Step 3: place the component -->
      <div class="space-y-2">
        <p class="text-xs font-semibold text-toned uppercase tracking-wider">Step 3 — Place the component</p>
        <div class="rounded-xl border border-muted overflow-hidden bg-muted">
          <div class="px-5 py-4 space-y-2">
            <p class="text-sm text-toned">Drop <code class="text-xs font-mono bg-elevated px-1 py-0.5 rounded">&lt;AppHeader /&gt;</code> into your app layout:</p>
            <pre class="text-xs font-mono bg-elevated rounded-lg px-4 py-3 overflow-x-auto leading-relaxed text-default"><code>// layouts/default.vue
&lt;template&gt;
  &lt;div class="flex flex-col min-h-screen"&gt;
    &lt;AppHeader /&gt;
    &lt;main class="flex-1"&gt;
      &lt;slot /&gt;
    &lt;/main&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
          </div>
        </div>
      </div>

      <!-- Available products -->
      <div class="space-y-2">
        <p class="text-xs font-semibold text-toned uppercase tracking-wider">Available product IDs</p>
        <div class="rounded-xl border border-muted overflow-hidden bg-muted">
          <div
            v-for="(product, i) in products"
            :key="product.id"
            class="flex items-center gap-4 px-5 py-3.5"
            :class="i !== 0 ? 'border-t border-muted' : ''"
          >
            <div class="w-7 h-7 rounded-md bg-royalblue-50 flex items-center justify-center shrink-0">
              <UIcon :name="product.icon" class="text-royalblue-500 size-3.5" />
            </div>
            <div class="flex items-center gap-3 flex-1 min-w-0 flex-wrap">
              <p class="text-sm font-semibold text-default w-28 shrink-0">{{ product.label }}</p>
              <code class="font-mono text-[11px] text-royalblue-500 bg-royalblue-50 px-1.5 py-0.5 rounded shrink-0">{{ product.id }}</code>
              <p class="text-xs text-toned">{{ product.navItems }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- NavItem fields -->
      <div class="space-y-2">
        <p class="text-xs font-semibold text-toned uppercase tracking-wider">ProductNavItem fields</p>
        <div class="rounded-xl border border-muted overflow-hidden bg-muted">
          <div class="px-5 py-4">
            <pre class="text-xs font-mono bg-elevated rounded-lg px-4 py-3 overflow-x-auto leading-relaxed text-default"><code>interface ProductNavItem {
  label: string            // Display text
  icon?: string            // Lucide icon (e.g. 'i-lucide-credit-card')
  isHome?: boolean         // Renders as icon-only house button
  isCrossProduct?: boolean // Opens cross-product switch in a new tab
  hasDropdown?: boolean    // Shows a chevron indicator
  to?: string              // NuxtLink route — in-app navigation
  href?: string            // Anchor href — cross-app / external navigation
}</code></pre>
          </div>
        </div>
      </div>
    </section>

    <USeparator />

    <!-- ─── 4. Architecture ──────────────────────────────────────────────── -->
    <section class="space-y-6">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Architecture</h2>
        <p class="text-sm text-toned">The header is composed of smaller components and composables — all auto-imported by the layer. You can use them individually if needed.</p>
      </div>

      <!-- Sub-components -->
      <div class="space-y-2">
        <p class="text-xs font-semibold text-toned uppercase tracking-wider">Components</p>
        <div class="rounded-xl border border-muted overflow-hidden bg-muted">
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
      </div>

      <!-- Composables -->
      <div class="space-y-2">
        <p class="text-xs font-semibold text-toned uppercase tracking-wider">Composables</p>
        <div class="rounded-xl border border-muted overflow-hidden bg-muted">
          <div
            v-for="(comp, i) in composables"
            :key="comp.name"
            class="flex items-start gap-4 px-5 py-4"
            :class="i !== 0 ? 'border-t border-muted' : ''"
          >
            <div class="w-8 h-8 rounded-lg bg-royalblue-50 flex items-center justify-center shrink-0 mt-0.5">
              <UIcon name="i-lucide-zap" class="text-royalblue-500 text-sm" />
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
      </div>
    </section>

    <USeparator />

    <!-- ─── 5. Versioning ────────────────────────────────────────────────── -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Versioning &amp; updates</h2>
        <p class="text-sm text-toned">
          Changes to this design system do <strong class="font-semibold text-default">not</strong> automatically
          propagate to consuming apps. Apps pin to a specific git tag and must opt in to updates.
        </p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="px-5 py-4 border-b border-muted bg-elevated/40">
          <p class="text-xs font-semibold text-toned uppercase tracking-wider">Release workflow</p>
        </div>
        <div class="px-5 py-4 space-y-3">
          <ol class="space-y-2 text-sm text-toned list-none">
            <li class="flex items-start gap-3">
              <span class="w-5 h-5 rounded-full bg-royalblue-100 text-royalblue-600 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">1</span>
              Make and test changes in this repo
            </li>
            <li class="flex items-start gap-3">
              <span class="w-5 h-5 rounded-full bg-royalblue-100 text-royalblue-600 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">2</span>
              Bump <code class="text-xs font-mono bg-elevated px-1 py-0.5 rounded">version</code> in <code class="text-xs font-mono bg-elevated px-1 py-0.5 rounded">package.json</code>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-5 h-5 rounded-full bg-royalblue-100 text-royalblue-600 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">3</span>
              <span>Run <code class="text-xs font-mono bg-elevated px-1 py-0.5 rounded">git tag vX.Y.Z &amp;&amp; git push origin vX.Y.Z</code></span>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-5 h-5 rounded-full bg-royalblue-100 text-royalblue-600 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">4</span>
              <span>In each consuming app: update the pinned tag and run <code class="text-xs font-mono bg-elevated px-1 py-0.5 rounded">npm install</code></span>
            </li>
          </ol>
          <pre class="text-xs font-mono bg-elevated rounded-lg px-4 py-3 overflow-x-auto leading-relaxed text-default"><code>// consuming app — package.json
"@wlth/design-system": "github:rhyeezus/wlth-design-system#v1.1.0"</code></pre>
          <p class="text-xs text-toned">
            During active development, a consuming app can temporarily pin to
            <code class="text-xs font-mono bg-elevated px-1 py-0.5 rounded">#main</code>
            to get changes without releasing — but this is unstable for production.
          </p>
        </div>
      </div>
    </section>

  </div>
</template>
