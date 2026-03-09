<script setup lang="ts">
const { currentProduct, activeLabel, switchProduct } = useHeader()
</script>

<template>
  <!-- Nav pill -->
  <nav class="flex items-center gap-2 rounded-full bg-white px-3 py-2">
    <template
      v-for="item in currentProduct.navItems"
      :key="item.label"
    >
      <!-- Home: icon-only square button -->
      <UButton
        v-if="item.isHome"
        color="nav"
        :variant="activeLabel === item.label ? 'solid' : 'soft'"
        square
        size="lg"
        aria-label="Home"
        @click="activeLabel = item.label"
      >
        <UIcon name="i-lucide-house" class="size-4" />
      </UButton>

      <!-- Cross-product link: icon + hidden text on tablet, opens new tab -->
      <UButton
        v-else-if="item.isCrossProduct"
        color="nav"
        variant="soft"
        size="md"
        @click="switchProduct('broker')"
      >
        <UIcon :name="item.icon ?? 'i-lucide-arrow-up-right'" class="size-4" />
        <span class="hidden lg:inline">{{ item.label }}</span>
      </UButton>

      <!-- Regular nav item: text label, chevron only if dropdown -->
      <UButton
        v-else
        color="nav"
        :variant="activeLabel === item.label ? 'solid' : 'soft'"
        size="md"
        @click="activeLabel = item.label"
      >
        {{ item.label }}
        <UIcon v-if="item.hasDropdown" name="i-lucide-chevron-down" class="size-4" />
      </UButton>
    </template>
  </nav>
</template>
