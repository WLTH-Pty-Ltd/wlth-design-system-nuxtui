<script setup lang="ts">
const route = useRoute()
const colorMode = useColorMode()
const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (val) => { colorMode.preference = val ? 'dark' : 'light' },
})

const gettingStarted = [
  { label: 'Introduction', to: '/' },
  { label: 'Getting Started', to: '/setup' },
]

const foundations = [
  { label: 'Colors', to: '/components/colors' },
  { label: 'Tokens', to: '/components/tokens' },
  { label: 'Typography', to: '/components/typography' },
]

const components = [
  { label: 'Actions', to: '/components/actions' },
  { label: 'Forms', to: '/components/forms' },
  { label: 'Feedback', to: '/components/feedback' },
  { label: 'Overlays', to: '/components/overlays' },
  { label: 'Navigation', to: '/components/navigation' },
  { label: 'Display', to: '/components/display' },
  { label: 'Tables', to: '/components/tables' },
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
      <aside class="w-60 shrink-0 border-r border-muted flex flex-col bg-muted sticky top-0 h-screen">
        <!-- Logo + dark mode toggle -->
        <div class="px-6 py-8 shrink-0 flex items-center justify-between">
          <svg width="80" height="19" viewBox="0 0 80 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="WLTH" class="h-4 select-none">
            <path d="M6.7765 15.7156L11.4968 0.00566123H15.0306L19.6717 15.6895L23.8111 0.00566123H26.6327L21.3315 18.5507H18.0356L13.2632 2.39017L8.41146 18.5507H5.06227L0 0.00566123H2.82155L6.7765 15.7156ZM33.5439 0V16.1583H44.3592V18.5507H30.942V0H33.5439ZM59.5052 2.39244H52.646V18.5507H50.0453V2.39244H43.1103V0H59.5052V2.39244ZM65.856 8.07857H77.3992V0H80V18.5507H77.3992V10.4722H65.856V18.5507H63.254V0H65.856V8.07857Z" fill="#292E3A" />
          </svg>
          <button
            type="button"
            class="p-1.5 rounded-lg hover:bg-elevated transition-colors text-toned hover:text-default"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="isDark = !isDark"
          >
            <UIcon :name="isDark ? 'i-lucide-sun' : 'i-lucide-moon'" class="size-4" />
          </button>
        </div>
        <!-- Nav -->
        <nav class="flex-1 overflow-y-auto pb-12 px-6 space-y-6">
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

          <!-- Foundations -->
          <div class="space-y-0.5">
            <p class="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-widest text-dimmed">
              Foundations
            </p>
            <NuxtLink
              v-for="item in foundations"
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
