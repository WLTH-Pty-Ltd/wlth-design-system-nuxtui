<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { MOCK_ENTITIES } from '~/composables/useHeader'

const { currentEntity, setEntity } = useHeader()

const isOpen = ref(false)

const dropdownItems = computed<DropdownMenuItem[][]>(() => [
  MOCK_ENTITIES.map(entity => ({
    label: entity.name,
    avatar: entity.avatar ?? { alt: entity.name },
    active: currentEntity.value.id === entity.id,
    disabled: currentEntity.value.id === entity.id,
    onSelect: () => setEntity(entity.id)
  }))
])
</script>

<template>
  <!-- Inner entity pill — rendered directly inside HeaderUtilityCluster right pill -->
  <UDropdownMenu
    v-model:open="isOpen"
    :items="dropdownItems"
    :content="{ align: 'start', collisionPadding: 8 }"
  >
    <template #item-trailing>
      <UIcon
        name="i-lucide-arrow-left-right"
        class="size-4 opacity-0 group-data-highlighted:opacity-100 transition-opacity"
      />
    </template>
    <UButton color="pill" :variant="isOpen ? 'solid' : 'soft'">
      <UAvatar v-bind="currentEntity.avatar ?? { alt: currentEntity.name }" size="xs" class="shrink-0" />
      <span class="hidden lg:inline text-sm font-medium text-lightgrey-900 whitespace-nowrap leading-none">
        {{ currentEntity.name }}
      </span>
      <UIcon name="i-lucide-chevron-down" class="size-4 text-lightgrey-900 shrink-0 transition-transform duration-200" :class="isOpen && 'rotate-180'" />
    </UButton>
  </UDropdownMenu>
</template>
