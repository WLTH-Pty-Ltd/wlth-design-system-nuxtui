<script setup lang="ts">
// AppHeader — three-zone header matching navigatoin.pen design.
// Background: #f4f4f4, height: 100px desktop / 80px tablet / 64px mobile, no border-bottom.
// Left:   WLTH logo + ProductSwitcher (product badge pill) + hamburger (mobile only)
// Center: ProductNav (nav pill, tablet+ only)
// Right:  HeaderUtilityCluster (entity · notifications · avatar pill)
const { isMobileMenuOpen } = useDashboard()
</script>

<template>
  <header class="h-16 md:h-20 lg:h-[100px] bg-default flex items-center px-4 md:px-8 lg:px-16 gap-3 md:gap-4 shrink-0">
    <!-- WLTH wordmark -->
    <img src="/images/wlth_logo.svg" alt="WLTH" class="h-5 shrink-0 select-none" />

    <!-- Product badge pill: tablet+ only -->
    <div class="hidden md:flex">
      <ProductSwitcher />
    </div>

    <!-- Nav pill: tablet + desktop only (>=md) -->
    <div class="hidden md:flex">
      <ProductNav />
    </div>

    <!-- Spacer pushes utility cluster to right -->
    <div class="flex-1" />

    <!-- Right utility pill (entity · bell · avatar) -->
    <HeaderUtilityCluster />

    <!-- Hamburger: mobile only (<md), after bell -->
    <UButton
      class="flex md:hidden"
      color="neutral"
      variant="ghost"
      square
      size="md"
      icon="i-lucide-menu"
      aria-label="Open menu"
      @click="isMobileMenuOpen = true"
    />

    <!-- Mobile nav drawer (mounted once, shown via isMobileMenuOpen state) -->
    <ClientOnly>
      <MobileMenuDrawer />
    </ClientOnly>
  </header>
</template>
