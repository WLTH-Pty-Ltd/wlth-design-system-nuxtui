<script setup lang="ts">
import type { AppChartSeries, AppChartDataPoint, AppChartFormat, AppChartFormatOptions } from '../../types/index'
import { formatChartValue } from '../../composables/useChartFormat'

// ─── Props ─────────────────────────────────────────────────────────────────

const props = withDefaults(defineProps<{
  series: AppChartSeries[]
  /** Each data point is one full bar row. Values should be percentages summing to ~100. */
  data: AppChartDataPoint[]
  format?: AppChartFormat
  formatOptions?: AppChartFormatOptions
  loading?: boolean
}>(), {
  format: 'percent',
  formatOptions: () => ({}),
  loading: false,
})

// ─── Color sequence ─────────────────────────────────────────────────────────

const appConfig = useAppConfig()
const colorSequence = computed<string[]>(
  () => (appConfig.wlth as any)?.chart?.colors ?? ['royalblue', 'darkblue', 'green', 'yellow', 'red']
)

const seriesColorMap = computed(() => {
  const map: Record<string, string> = {}
  props.series.forEach((s, i) => {
    map[s.id] = s.color ?? colorSequence.value[i % colorSequence.value.length] ?? 'lightgrey'
  })
  return map
})

function segmentBgClass(seriesId: string): string {
  const color = seriesColorMap.value[seriesId] ?? 'lightgrey'
  const map: Record<string, string> = {
    royalblue: 'bg-royalblue-600',
    darkblue:  'bg-lightgrey-400',
    green:     'bg-green-500',
    yellow:    'bg-yellow-400',
    red:       'bg-red-500',
    lightgrey: 'bg-lightgrey-300',
  }
  return map[color] ?? `bg-${color}-500`
}

function legendDotClass(color: string): string {
  return segmentBgClass(color)
}

// ─── Segment width calculation ────────────────────────────────────────────────

/** Min px width so tiny segments remain visible */
const MIN_SEGMENT_PX = 8

function segmentWidthStyle(point: AppChartDataPoint, seriesId: string): string {
  const value = point.values[seriesId] ?? 0
  if (value <= 0) return `width: 0px; min-width: 0px`
  // Percentage string — let the bar normalize naturally
  return `width: ${value}%; min-width: ${MIN_SEGMENT_PX}px`
}

// ─── Label position ────────────────────────────────────────────────────────

function segmentLabelColor(seriesId: string): string {
  const color = seriesColorMap.value[seriesId] ?? 'lightgrey'
  const active: Record<string, string> = {
    royalblue: 'text-royalblue-600',
    green:     'text-green-600',
    yellow:    'text-yellow-600',
    red:       'text-red-600',
  }
  return active[color] ?? 'text-muted'
}
</script>

<template>
  <div class="flex flex-col gap-3 w-full">

    <!-- Loading skeleton -->
    <div v-if="loading" class="w-full h-4 rounded-full animate-pulse bg-lightgrey-100" />

    <!-- Empty state -->
    <div v-else-if="data.length === 0" class="flex items-center justify-center py-8 w-full">
      <span class="text-sm text-muted">No data available</span>
    </div>

    <!-- One stacked bar per data point -->
    <div v-else class="flex flex-col gap-6 w-full">
      <div v-for="point in data" :key="point.key" class="flex flex-col gap-2 w-full">

        <!-- Bar track -->
        <div class="flex w-full h-4 rounded-full overflow-hidden bg-lightgrey-100">
          <UTooltip
            v-for="s in series"
            :key="s.id"
            :text="`${s.label}: ${formatChartValue(point.values[s.id] ?? 0, format, formatOptions)}`"
            :delay-duration="100"
          >
            <div
              class="h-full transition-all duration-300 first:rounded-l-full last:rounded-r-full"
              :class="segmentBgClass(s.id)"
              :style="segmentWidthStyle(point, s.id)"
              :aria-label="`${s.label}: ${formatChartValue(point.values[s.id] ?? 0, format, formatOptions)}`"
            />
          </UTooltip>
        </div>

        <!-- Segment labels below the bar -->
        <div class="flex w-full">
          <div
            v-for="s in series"
            :key="s.id"
            class="text-xs font-semibold truncate"
            :class="segmentLabelColor(s.id)"
            :style="segmentWidthStyle(point, s.id)"
          >
            <span v-if="(point.values[s.id] ?? 0) > 0">
              {{ formatChartValue(point.values[s.id] ?? 0, format, formatOptions) }}
            </span>
          </div>
        </div>

      </div>
    </div>

    <!-- Legend -->
    <div class="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 border-t border-muted">
      <div v-for="(s, i) in series" :key="s.id" class="flex items-center gap-1.5">
        <span
          class="inline-block h-2 w-5 rounded-full shrink-0"
          :class="legendDotClass(s.color ?? colorSequence[i % colorSequence.length] ?? 'lightgrey')"
        />
        <span class="text-xs text-muted">{{ s.label }}</span>
      </div>
    </div>

  </div>
</template>
