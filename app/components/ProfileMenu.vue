<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { MOCK_USER } from '~/composables/useHeader'

const items = computed<DropdownMenuItem[][]>(() => [
  [
    { type: 'label', label: MOCK_USER.name }
  ],
  [
    { label: 'Account', icon: 'i-lucide-user' },
    { label: 'Preferences', icon: 'i-lucide-settings-2' }
  ],
  [
    { label: 'Sign out', icon: 'i-lucide-log-out' }
  ]
])
</script>

<template>
  <!-- 36×36 dark circle with white initials -->
  <UDropdownMenu
    :items="items"
    :content="{ align: 'end', collisionPadding: 8 }"
  >
    <button
      type="button"
      class="size-9 rounded-full bg-darkblue-500 flex items-center justify-center shrink-0"
      aria-label="Profile menu"
    >
      <span class="text-white text-base font-medium leading-none select-none">
        {{ MOCK_USER.initials }}
      </span>
    </button>
  </UDropdownMenu>
</template>
