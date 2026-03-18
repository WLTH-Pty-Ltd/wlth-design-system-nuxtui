<script setup lang="ts">
const route = useRoute()

const gettingStarted = [
  { label: 'Introduction', to: '/' },
  { label: 'Getting Started', to: '/setup' },
]

const components = [
  { label: 'Actions', to: '/components/actions' },
  { label: 'Forms', to: '/components/forms' },
  { label: 'Feedback', to: '/components/feedback' },
  { label: 'Overlays', to: '/components/overlays' },
  { label: 'Navigation', to: '/components/navigation' },
  { label: 'Display', to: '/components/display' },
  { label: 'Tables', to: '/components/tables' },
  { label: 'Colors', to: '/components/colors' },
  { label: 'Tokens', to: '/components/tokens' },
]

const bespoke = [
  { label: 'App Header', to: '/components/bespoke/navigation' },
  { label: 'Charts', to: '/components/bespoke/charts' },
  { label: 'Pagination', to: '/components/bespoke/pagination' },
  { label: 'Segmented Control', to: '/components/bespoke/segmented-control' },
]

function isActive(path: string) {
  return route.path === path
}
</script>

<template>
  <div class="flex min-h-screen bg-default">
      <!-- Sidebar -->
      <aside class="w-60 shrink-0 border-r border-muted flex flex-col bg-muted">
        <!-- Nav -->
        <nav class="flex-1 overflow-y-auto py-12 px-6 space-y-6">
          <!-- Getting Started -->
          <div class="space-y-0.5">
            <p class="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-widest text-dimmed">
              Getting Started
            </p>
            <NuxtLink
              v-for="item in gettingStarted"
              :key="item.to"
              :to="item.to"
              class="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors"
              :class="isActive(item.to)
                ? 'bg-royalblue-50 text-royalblue-600 font-medium'
                : 'text-toned hover:bg-elevated hover:text-default'"
            >
              {{ item.label }}
            </NuxtLink>
          </div>

          <!-- Components -->
          <div class="space-y-0.5">
            <p class="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-widest text-dimmed">
              Components
            </p>
            <NuxtLink
              v-for="item in components"
              :key="item.to"
              :to="item.to"
              class="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors"
              :class="isActive(item.to)
                ? 'bg-royalblue-50 text-royalblue-600 font-medium'
                : 'text-toned hover:bg-elevated hover:text-default'"
            >
              {{ item.label }}
            </NuxtLink>
          </div>

          <!-- Bespoke -->
          <div class="space-y-0.5">
            <p class="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-widest text-dimmed">
              Bespoke
            </p>
            <NuxtLink
              v-for="item in bespoke"
              :key="item.to"
              :to="item.to"
              class="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors"
              :class="isActive(item.to)
                ? 'bg-royalblue-50 text-royalblue-600 font-medium'
                : 'text-toned hover:bg-elevated hover:text-default'"
            >
              {{ item.label }}
            </NuxtLink>
          </div>
        </nav>
      </aside>

      <!-- Main content -->
      <div class="flex-1 min-w-0">
        <slot />
      </div>
  </div>
</template>
