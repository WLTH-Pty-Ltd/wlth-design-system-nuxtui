<script setup lang="ts">
// DashboardMetricCard — compact KPI tile for dashboards.
// Shows a label, a primary value, and either a trend-coloured change
// (change + trend) or a plain subtitle. Trend classes use static lookup
// maps so they survive Tailwind's content scan.

defineProps<{
  label: string
  value: string | number
  /** Formatted delta text, e.g. "+18% vs Q4 2025". Pair with `trend`. */
  change?: string
  /** Trend direction — drives the colour and icon of `change`. */
  trend?: 'up' | 'down'
  /** Shown instead of change/trend when there is no trend direction. */
  subtitle?: string
}>()

const trendColor: Record<'up' | 'down', string> = {
  up: 'text-success',
  down: 'text-error',
}

const trendIcon: Record<'up' | 'down', string> = {
  up: 'i-lucide-trending-up',
  down: 'i-lucide-trending-down',
}
</script>

<template>
  <div class="bg-muted rounded-2xl px-4 py-3 flex flex-col gap-1">
    <p class="text-xs font-medium text-toned uppercase tracking-wide">{{ label }}</p>
    <p class="text-xl font-bold text-default tabular-nums">{{ value }}</p>

    <p v-if="subtitle" class="text-xs text-toned">{{ subtitle }}</p>

    <div v-else-if="change && trend" class="flex items-center gap-1" :class="trendColor[trend]">
      <UIcon :name="trendIcon[trend]" class="size-3.5 shrink-0" />
      <span class="text-xs font-medium">{{ change }}</span>
    </div>
  </div>
</template>
