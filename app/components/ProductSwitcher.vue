<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { PRODUCTS } from '~/composables/useHeader'
import type { ProductId } from '~/types'

const { currentProductId, switchProduct } = useHeader()

const isOpen = ref(false)

const items = computed<DropdownMenuItem[][]>(() => [
  (Object.values(PRODUCTS) as (typeof PRODUCTS)[ProductId][]).map(product => ({
    label: product.label,
    icon: product.icon,
    active: currentProductId.value === product.id,
    disabled: currentProductId.value === product.id,
    onSelect: () => switchProduct(product.id)
  }))
])
</script>

<template>
  <!-- Outer pill -->
  <UDropdownMenu
    v-model:open="isOpen"
    :items="items"
    :content="{ align: 'start', collisionPadding: 8 }"
  >
    <template #item-trailing>
      <UIcon
        name="i-lucide-chevron-right"
        class="size-4 opacity-0 group-data-highlighted:opacity-100 transition-opacity"
      />
    </template>
    <button
      type="button"
      class="flex items-center rounded-full bg-white px-3 py-2 cursor-pointer hover:bg-neutral-50 transition-colors"
    >
      <!-- Inner badge pill with product name -->
      <UButton color="pill" :variant="isOpen ? 'solid' : 'soft'" as="span">
        <UIcon :name="PRODUCTS[currentProductId].icon" class="size-[18px] shrink-0" />
        <span class="text-sm font-medium whitespace-nowrap leading-none">
          {{ PRODUCTS[currentProductId].label }}
        </span>
        <UIcon name="i-lucide-chevron-down" class="size-4 text-lightgrey-700 shrink-0 transition-transform duration-200" :class="isOpen && 'rotate-180'" />
      </UButton>
    </button>
  </UDropdownMenu>
</template>
