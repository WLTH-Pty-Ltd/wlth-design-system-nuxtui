<script setup lang="ts">
/**
 * AppChart — Universal chart component for the WLTH design system.
 *
 * Supports:
 *   type="bar"          — Vertical pill bars with pagination
 *   type="stacked-bar"  — Horizontal percentage segments
 *
 * Slots:
 *   #chip       — Label chip above KPI (e.g. <UBadge>SubmittedApplications</UBadge>)
 *   #kpi        — Large KPI number text (e.g. "$2,910.31")
 *   #kpi-label  — Period label beneath KPI (e.g. "this month")
 *   #legend     — Override the default legend
 *
 * @example Bar chart (rewards)
 * <AppChart
 *   type="bar"
 *   :series="[{ id: 'business', label: 'Business Rewards', color: 'royalblue' }]"
 *   :data="rewardsData"
 *   format="number"
 * >
 *   <template #chip><UBadge>Business Rewards</UBadge></template>
 *   <template #kpi>291</template>
 *   <template #kpi-label>this month</template>
 * </AppChart>
 *
 * @example Stacked bar (payments)
 * <AppChart
 *   type="stacked-bar"
 *   :series="[
 *     { id: 'amex',         label: 'Amex',         color: 'royalblue' },
 *     { id: 'mastercard',   label: 'Mastercard',   color: 'darkblue'  },
 *     { id: 'bankTransfer', label: 'Bank Transfer' },
 *   ]"
 *   :data="[{ key: 'month', label: '', values: { amex: 25, mastercard: 12, bankTransfer: 63 } }]"
 *   format="percent"
 * >
 *   <template #kpi>$2,910.31</template>
 *   <template #kpi-label>this month</template>
 * </AppChart>
 */

import type { AppChartType, AppChartSeries, AppChartDataPoint, AppChartFormat, AppChartFormatOptions } from '../types/index'
import AppChartBar from './chart/AppChartBar.vue'
import AppChartStackedBar from './chart/AppChartStackedBar.vue'

const props = withDefaults(defineProps<{
  /** Chart type */
  type: AppChartType
  /** Series definitions (id, label, optional color) */
  series: AppChartSeries[]
  /** Data points to render */
  data: AppChartDataPoint[]
  /** Number format for value labels. Default: 'number' */
  format?: AppChartFormat
  /** Options for the format (e.g. currency symbol) */
  formatOptions?: AppChartFormatOptions
  /** Bar chart: number of bars visible at once (auto-responsive if omitted) */
  window?: number
  /** Bar chart: override which bar is highlighted (defaults to last) */
  activeKey?: string
  /** Bar chart: maximum bar height in pixels */
  maxBarHeight?: number
  /** Show loading skeleton */
  loading?: boolean
}>(), {
  format: 'number',
  formatOptions: () => ({}),
  loading: false,
})

const emit = defineEmits<{
  /** Emitted when a bar is clicked. key = data point key, values = series values map */
  (e: 'select', key: string, values: Record<string, number>): void
}>()

</script>

<template>
  <div class="flex flex-col gap-4 w-full">

    <!-- KPI header area (only renders if any slot is provided) -->
    <div v-if="$slots.chip || $slots.kpi || $slots['kpi-label']" class="flex flex-col gap-1">
      <div v-if="$slots.chip">
        <slot name="chip" />
      </div>
      <div v-if="$slots.kpi" class="text-3xl md:text-4xl font-semibold text-highlighted leading-tight tracking-tight">
        <slot name="kpi" />
      </div>
      <div v-if="$slots['kpi-label']" class="text-sm text-muted">
        <slot name="kpi-label" />
      </div>
    </div>

    <!-- Bar chart renderer -->
    <AppChartBar
      v-if="type === 'bar'"
      :series="series"
      :data="data"
      :format="format"
      :format-options="formatOptions"
      :window="window"
      :active-key="activeKey"
      :max-bar-height="maxBarHeight"
      :loading="loading"
      @select="(key, values) => emit('select', key, values)"
    />

    <!-- Stacked bar renderer -->
    <AppChartStackedBar
      v-else-if="type === 'stacked-bar'"
      :series="series"
      :data="data"
      :format="format"
      :format-options="formatOptions"
      :loading="loading"
    />

  </div>
</template>
