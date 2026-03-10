<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const toItems = (arr: string[]) => arr.map(v => ({ label: v, value: v }))

const colorItems = toItems(['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'])
const sizeItems = toItems(['xs', 'sm', 'md', 'lg', 'xl'])
const buttonVariantItems = toItems(['solid', 'outline', 'soft', 'subtle', 'ghost', 'link'])
const badgeVariantItems = toItems(['solid', 'subtle', 'outline', 'soft'])

const buttonColor = ref('primary')
const buttonSize = ref('md')
const buttonVariant = ref('solid')

const badgeColor = ref('primary')
const badgeSize = ref('md')
const badgeVariant = ref('subtle')

const chipColor = ref('primary')
const chipSize = ref('md')
</script>

<template>
  <div class="max-w-7xl mx-auto px-10 py-12 space-y-14">

    <div class="space-y-1">
      <h1 class="text-2xl font-semibold text-default">Actions</h1>
      <p class="text-sm text-toned">Interactive elements — buttons, badges, chips, and keyboard shortcuts.</p>
    </div>

    <!-- Button -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Button</h2>
        <p class="text-sm text-toned">Primary interactive element. Supports all semantic colors, 6 variants, and 5 sizes.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted flex flex-wrap gap-3 items-center">
          <UButton :color="buttonColor" :variant="buttonVariant" :size="buttonSize" label="Button" />
          <UButton :color="buttonColor" :variant="buttonVariant" :size="buttonSize" label="With icon" icon="i-lucide-star" />
          <UButton :color="buttonColor" :variant="buttonVariant" :size="buttonSize" icon="i-lucide-star" square />
          <UButton :color="buttonColor" :variant="buttonVariant" :size="buttonSize" label="Loading" loading />
          <UButton :color="buttonColor" :variant="buttonVariant" :size="buttonSize" label="Disabled" disabled />
        </div>
        <div class="border-t border-muted px-5 py-3 flex flex-wrap gap-3 items-center bg-muted">
          <USelect v-model="buttonColor" :items="colorItems" value-key="value" size="xs" class="w-32" />
          <USelect v-model="buttonVariant" :items="buttonVariantItems" value-key="value" size="xs" class="w-32" />
          <USelect v-model="buttonSize" :items="sizeItems" value-key="value" size="xs" class="w-20" />
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Badge -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Badge</h2>
        <p class="text-sm text-toned">Status labels and counters. Supports colors, variants, and icons.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted flex flex-wrap gap-3 items-center">
          <UBadge :color="badgeColor" :variant="badgeVariant" :size="badgeSize" label="Badge" />
          <UBadge :color="badgeColor" :variant="badgeVariant" :size="badgeSize" label="With icon" icon="i-lucide-circle-check" />
          <UBadge :color="badgeColor" :variant="badgeVariant" :size="badgeSize" label="42" />
        </div>
        <div class="border-t border-muted px-5 py-3 flex flex-wrap gap-3 items-center bg-muted">
          <USelect v-model="badgeColor" :items="colorItems" value-key="value" size="xs" class="w-32" />
          <USelect v-model="badgeVariant" :items="badgeVariantItems" value-key="value" size="xs" class="w-32" />
          <USelect v-model="badgeSize" :items="sizeItems" value-key="value" size="xs" class="w-20" />
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Chip -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Chip</h2>
        <p class="text-sm text-toned">Indicator overlay attached to another element — for notifications or counts.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted flex flex-wrap gap-5 items-center">
          <UChip :color="chipColor" :size="chipSize">
            <UButton color="neutral" variant="outline" size="sm" label="Notification" />
          </UChip>
          <UChip :color="chipColor" :size="chipSize" text="3">
            <UAvatar src="https://i.pravatar.cc/40?img=1" size="sm" />
          </UChip>
        </div>
        <div class="border-t border-muted px-5 py-3 flex flex-wrap gap-3 items-center bg-muted">
          <USelect v-model="chipColor" :items="colorItems" value-key="value" size="xs" class="w-32" />
          <USelect v-model="chipSize" :items="sizeItems" value-key="value" size="xs" class="w-20" />
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Kbd -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Kbd</h2>
        <p class="text-sm text-toned">Keyboard shortcut indicators.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted flex flex-wrap gap-2 items-center">
          <UKbd>⌘</UKbd>
          <UKbd>K</UKbd>
          <span class="text-muted text-sm">or</span>
          <UKbd>G</UKbd>
          <UKbd>D</UKbd>
          <span class="text-muted text-sm">Design System</span>
        </div>
      </div>
    </section>

  </div>
</template>
