<script setup lang="ts">
/**
 * AppChart — Universal chart component for the WLTH design system.
 *
 * Supports:
 *   type="bar"          — Vertical pill bars with pagination
 *   type="stacked-bar"  — Horizontal percentage segments
 *
 * Dataset toggle:
 *   Pass :datasets="[...]" to enable a toggle between multiple fully self-contained datasets.
 *   Each dataset carries its own series, data, and optional KPI total.
 *
 * Slots:
 *   #chip       — Label chip above KPI (e.g. <UBadge>Submitted Applications</UBadge>)
 *   #kpi        — Large KPI number text (e.g. "$2,910.31"). Auto-populated from active dataset total if omitted.
 *   #kpi-label  — Period label beneath KPI (e.g. "this month")
 *   #legend     — Override the default legend
 */

import type { AppChartType, AppChartSeries, AppChartDataPoint, AppChartFormat, AppChartFormatOptions, AppChartDataset } from '../types/index'
import AppChartBar from './chart/AppChartBar.vue'
import AppChartStackedBar from './chart/AppChartStackedBar.vue'

const props = withDefaults(defineProps<{
  /** Chart type */
  type: AppChartType
  /** Series definitions — used when not using datasets prop */
  series?: AppChartSeries[]
  /** Data points — used when not using datasets prop */
  data?: AppChartDataPoint[]
  /** Multiple self-contained datasets — enables the dataset toggle when >1 provided */
  datasets?: AppChartDataset[]
  /** Show the dataset toggle UI. Default: true when datasets has >1 entry */
  showDatasetToggle?: boolean
  /** Number format for value labels. Default: 'number' */
  format?: AppChartFormat
  /** Options for the format (e.g. currency symbol) */
  formatOptions?: AppChartFormatOptions
  /** Bar chart: number of bars visible at once (auto-responsive if omitted) */
  window?: number
  /** Bar chart: override which bar is highlighted (defaults to highest value) */
  activeKey?: string
  /** Bar chart: maximum bar height in pixels */
  maxBarHeight?: number
  /** Bar chart: show pagination footer */
  showPagination?: boolean
  /** Show loading skeleton */
  loading?: boolean
}>(), {
  series: () => [],
  data: () => [],
  format: 'number',
  formatOptions: () => ({}),
  loading: false,
  showPagination: true,
})

const emit = defineEmits<{
  (e: 'select', key: string, values: Record<string, number>): void
}>()

// ─── Dataset toggle ───────────────────────────────────────────────────────────

const activeDatasetId = ref<string | null>(null)

// Initialise active dataset when datasets prop changes
watch(() => props.datasets, (datasets) => {
  if (datasets && datasets.length > 0 && !activeDatasetId.value) {
    activeDatasetId.value = datasets[0].id
  }
}, { immediate: true })

const showToggle = computed(() => {
  if (props.showDatasetToggle === false) return false
  return (props.datasets?.length ?? 0) > 1
})

const activeDataset = computed<AppChartDataset | null>(() => {
  if (!props.datasets || props.datasets.length === 0) return null
  return props.datasets.find(d => d.id === activeDatasetId.value) ?? props.datasets[0] ?? null
})

// Resolved series and data — from active dataset if using datasets, else from direct props
const resolvedSeries = computed<AppChartSeries[]>(() => activeDataset.value?.series ?? props.series)
const resolvedData = computed<AppChartDataPoint[]>(() => activeDataset.value?.data ?? props.data)

</script>

<template>
  <div class="flex flex-col gap-4 w-full">

    <!-- Dataset toggle skeleton -->
    <div v-if="loading && (datasets?.length ?? 0) > 1" class="flex">
      <div class="h-8 w-44 rounded-full bg-lightgrey-400 dark:bg-lightgrey-600 animate-pulse" />
    </div>

    <!-- Dataset toggle — pill switcher above everything -->
    <div v-else-if="showToggle && datasets" class="flex">
      <div class="inline-flex items-center gap-1 bg-elevated rounded-full p-1">
        <button
          v-for="dataset in datasets"
          :key="dataset.id"
          type="button"
          class="text-xs px-3 py-1 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royalblue-300"
          :class="activeDatasetId === dataset.id
            ? 'bg-white dark:bg-white/10 text-royalblue-500 font-semibold shadow-sm'
            : 'text-toned hover:text-default'"
          @click="activeDatasetId = dataset.id"
        >
          {{ dataset.label }}
        </button>
      </div>
    </div>

    <!-- KPI skeleton -->
    <div v-if="loading && ($slots.chip || $slots.kpi || $slots['kpi-label'] || (datasets && datasets.length > 0))" class="flex flex-col gap-2">
      <div v-if="$slots.chip" class="h-5 w-24 rounded-full bg-lightgrey-400 dark:bg-lightgrey-600 animate-pulse" />
      <div class="h-9 md:h-10 w-32 rounded-lg bg-lightgrey-400 dark:bg-lightgrey-600 animate-pulse" />
      <div v-if="$slots['kpi-label']" class="h-4 w-16 rounded bg-lightgrey-400 dark:bg-lightgrey-600 animate-pulse" />
    </div>

    <!-- KPI header area (only renders if any slot is provided or dataset has a total) -->
    <div v-else-if="$slots.chip || $slots.kpi || $slots['kpi-label'] || activeDataset?.total" class="flex flex-col gap-1">
      <div v-if="$slots.chip">
        <slot name="chip" />
      </div>
      <div v-if="$slots.kpi || activeDataset?.total" class="text-3xl md:text-4xl font-semibold text-highlighted leading-tight tracking-tight">
        <slot name="kpi">{{ activeDataset?.total }}</slot>
      </div>
      <div v-if="$slots['kpi-label']" class="text-sm text-muted">
        <slot name="kpi-label" />
      </div>
    </div>

    <!-- Bar chart renderer -->
    <AppChartBar
      v-if="type === 'bar'"
      :series="resolvedSeries"
      :data="resolvedData"
      :format="format"
      :format-options="formatOptions"
      :window="window"
      :active-key="activeKey"
      :max-bar-height="maxBarHeight"
      :loading="loading"
      :show-pagination="showPagination"
      @select="(key, values) => emit('select', key, values)"
    />

    <!-- Stacked bar renderer -->
    <AppChartStackedBar
      v-else-if="type === 'stacked-bar'"
      :series="resolvedSeries"
      :data="resolvedData"
      :format="format"
      :format-options="formatOptions"
      :loading="loading"
    />

  </div>
</template>
