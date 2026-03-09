<script setup lang="ts">
definePageMeta({ layout: 'docs' })
</script>

<template>
  <div class="max-w-7xl mx-auto px-10 py-16 space-y-12">

    <!-- Hero -->
    <div class="space-y-4">
      <div class="flex items-center gap-3">
        <span class="text-3xl font-semibold tracking-tight text-default">WLTH Design System</span>
        <UBadge variant="subtle" color="primary" label="v1.0.0" />
      </div>
      <p class="text-base text-toned max-w-xl leading-relaxed">
        A versioned Nuxt layer providing the complete WLTH brand design system — tokens, fonts, semantic variables, Nuxt UI component defaults, and bespoke navigation components. Extend it in any Nuxt project to inherit the full system.
      </p>
      <div class="flex flex-wrap gap-2 pt-1">
        <UBadge variant="subtle" color="neutral" size="lg" label="Nuxt 4" />
        <UBadge variant="subtle" color="neutral" size="lg" label="Nuxt UI v4" />
        <UBadge variant="subtle" color="neutral" size="lg" label="Tailwind v4" />
        <UBadge variant="subtle" color="neutral" size="lg" label="SuisseIntl" />
      </div>
    </div>

    <USeparator />

    <!-- Navigation cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <NuxtLink to="/setup" class="group rounded-xl border border-muted bg-muted p-6 space-y-3 hover:border-royalblue-400 hover:bg-elevated transition-all">
        <div class="w-10 h-10 rounded-lg bg-royalblue-50 flex items-center justify-center">
          <UIcon name="i-lucide-book-open" class="text-royalblue-500 text-lg" />
        </div>
        <div>
          <p class="font-semibold text-default group-hover:text-royalblue-600 transition-colors">Getting Started</p>
          <p class="text-sm text-toned mt-0.5">Installation, consumption, and release workflow</p>
        </div>
        <div class="flex items-center gap-1 text-xs text-royalblue-500 font-medium">
          Read the docs <UIcon name="i-lucide-arrow-right" class="text-sm" />
        </div>
      </NuxtLink>

      <NuxtLink to="/components/actions" class="group rounded-xl border border-muted bg-muted p-6 space-y-3 hover:border-royalblue-400 hover:bg-elevated transition-all">
        <div class="w-10 h-10 rounded-lg bg-royalblue-50 flex items-center justify-center">
          <UIcon name="i-lucide-layout-grid" class="text-royalblue-500 text-lg" />
        </div>
        <div>
          <p class="font-semibold text-default group-hover:text-royalblue-600 transition-colors">Component Library</p>
          <p class="text-sm text-toned mt-0.5">Nuxt UI components styled with WLTH tokens</p>
        </div>
        <div class="flex items-center gap-1 text-xs text-royalblue-500 font-medium">
          Browse components <UIcon name="i-lucide-arrow-right" class="text-sm" />
        </div>
      </NuxtLink>
    </div>

    <!-- Quick overview -->
    <div class="space-y-4">
      <h2 class="text-sm font-semibold text-default">What's included</h2>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div
          v-for="(item, i) in [
            { icon: 'i-lucide-palette', label: 'Design tokens', desc: 'Royal Blue, Dark Blue, Light Grey, Green, Yellow, Red — 11 shades each' },
            { icon: 'i-lucide-type', label: 'SuisseIntl fonts', desc: '8 weights (Thin → Black) + SuisseIntlMono loaded from assets.wlth.com' },
            { icon: 'i-lucide-sliders', label: 'Semantic variables', desc: '--ui-bg, --ui-text, --ui-border and variants for light + dark mode' },
            { icon: 'i-lucide-component', label: 'Nuxt UI defaults', desc: 'Button (nav/pill), DropdownMenu, Drawer, Slideover, Tabs — all pre-configured' },
            { icon: 'i-lucide-layout-dashboard', label: 'Bespoke navigation', desc: 'AppHeader, ProductSwitcher, ProductNav, EntitySelector + composables' },
          ]"
          :key="item.label"
          class="flex items-start gap-4 px-5 py-3.5"
          :class="i !== 0 ? 'border-t border-muted' : ''"
        >
          <div class="w-8 h-8 rounded-lg bg-elevated flex items-center justify-center shrink-0 mt-0.5">
            <UIcon :name="item.icon" class="text-toned text-sm" />
          </div>
          <div class="min-w-0">
            <p class="text-sm font-medium text-default">{{ item.label }}</p>
            <p class="text-xs text-toned mt-0.5">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
