<script setup lang="ts">
// AppSwitch — wraps USwitch with WLTH default styling.
// Bakes in the off-state track colour so it is always visible on card
// backgrounds in both light and dark mode, without relying on CSS merge order.

const model = defineModel<boolean>()

const props = defineProps<{
  color?: string
  size?: string
  label?: string
  description?: string
  disabled?: boolean
  loading?: boolean
  loadingIcon?: string
  checkedIcon?: string
  uncheckedIcon?: string
  id?: string
  name?: string
  required?: boolean
  value?: string
  defaultValue?: boolean
  ui?: Record<string, unknown>
}>()
</script>

<template>
  <USwitch
    v-model="model"
    v-bind="props"
    :ui="{
      base: 'data-[state=unchecked]:bg-(--ui-bg-inverted)!',
      ...props.ui,
    }"
  />
</template>
