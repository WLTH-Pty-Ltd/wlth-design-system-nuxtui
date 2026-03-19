<script setup lang="ts">
// AppHeader — three-zone header matching navigatoin.pen design.
// Background: #f4f4f4, height: 100px desktop / 80px tablet / 64px mobile, no border-bottom.
// Left:   WLTH logo + ProductSwitcher (product badge pill) + hamburger (mobile only)
// Center: ProductNav (nav pill, tablet+ only)
// Right:  HeaderUtilityCluster (entity · notifications · avatar pill)
const { isMobileMenuOpen } = useDashboard()
</script>

<template>
  <header class="h-16 md:h-20 lg:h-[100px] bg-default shrink-0">
    <div class="max-w-7xl mx-auto w-full h-full flex items-center px-4 md:px-8 lg:px-16 gap-3 md:gap-4">
      <!-- WLTH wordmark (inlined — no public asset dependency for consumers) -->
      <svg width="80" height="19" viewBox="0 0 80 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="WLTH" class="h-5 shrink-0 select-none">
        <path d="M6.7765 15.7156L11.4968 0.00566123H15.0306L19.6717 15.6895L23.8111 0.00566123H26.6327L21.3315 18.5507H18.0356L13.2632 2.39017L8.41146 18.5507H5.06227L0 0.00566123H2.82155L6.7765 15.7156ZM33.5439 0V16.1583H44.3592V18.5507H30.942V0H33.5439ZM59.5052 2.39244H52.646V18.5507H50.0453V2.39244H43.1103V0H59.5052V2.39244ZM65.856 8.07857H77.3992V0H80V18.5507H77.3992V10.4722H65.856V18.5507H63.254V0H65.856V8.07857Z" fill="#292E3A" />
      </svg>

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
    </div>
  </header>
</template>
