<script setup lang="ts">
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import type { AppChartSeries, AppChartDataPoint, AppChartFormat, AppChartFormatOptions } from '../../types/index'
import { formatChartValue } from '../../composables/useChartFormat'

// ─── Props ─────────────────────────────────────────────────────────────────

const props = withDefaults(defineProps<{
  series: AppChartSeries[]
  data: AppChartDataPoint[]
  format?: AppChartFormat
  formatOptions?: AppChartFormatOptions
  /** Bars visible at one time. Auto-reduces to 3 on mobile if not set. */
  window?: number
  /** Key of the currently active/highlighted bar. Defaults to last data point. */
  activeKey?: string
  /** Maximum bar height in pixels */
  maxBarHeight?: number
  loading?: boolean
}>(), {
  format: 'number',
  formatOptions: () => ({}),
  maxBarHeight: 200,
  loading: false,
})

const emit = defineEmits<{
  (e: 'select', key: string, values: Record<string, number>): void
}>()

// ─── Color sequence ─────────────────────────────────────────────────────────

const appConfig = useAppConfig()
const colorSequence = computed<string[]>(
  () => (appConfig.wlth as any)?.chart?.colors ?? ['royalblue', 'darkblue', 'green', 'yellow', 'red']
)

// Map series id → resolved Tailwind color name
const seriesColorMap = computed(() => {
  const map: Record<string, string> = {}
  props.series.forEach((s, i) => {
    map[s.id] = s.color ?? colorSequence.value[i % colorSequence.value.length] ?? 'lightgrey'
  })
  return map
})

// ─── Responsive window size ──────────────────────────────────────────────────

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('md')

const windowSize = computed(() => {
  if (props.window !== undefined) return props.window
  return isMobile.value ? 3 : 5
})

// ─── Pagination ──────────────────────────────────────────────────────────────

const pageIndex = ref(0)

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.data.length / windowSize.value))
)

const visibleData = computed(() => {
  const start = pageIndex.value * windowSize.value
  return props.data.slice(start, start + windowSize.value)
})

// Reset to last page when data or window size changes so the active bar is visible
watch([() => props.data, windowSize], () => {
  pageIndex.value = Math.max(0, totalPages.value - 1)
}, { immediate: true })

function prevPage() {
  if (pageIndex.value > 0) pageIndex.value--
}
function nextPage() {
  if (pageIndex.value < totalPages.value - 1) pageIndex.value++
}

// ─── Active bar ──────────────────────────────────────────────────────────────

const resolvedActiveKey = computed(() => {
  if (props.activeKey !== undefined) return props.activeKey
  return props.data[props.data.length - 1]?.key ?? null
})

// ─── Bar height calculation ───────────────────────────────────────────────────

const maxValue = computed(() => {
  // Use max across the entire dataset (not just visible window) for stable scaling
  let max = 0
  for (const point of props.data) {
    for (const id of Object.keys(point.values)) {
      const v = point.values[id] ?? 0
      if (v > max) max = v
    }
  }
  return max
})

function barHeight(value: number): number {
  if (maxValue.value === 0) return 8 // min height when all zeros
  const ratio = value / maxValue.value
  const computed = Math.round(ratio * props.maxBarHeight)
  return Math.max(computed, 8) // minimum 8px so zero bars remain visible
}

// ─── Bar color resolution ─────────────────────────────────────────────────────

function barColorClass(point: AppChartDataPoint, seriesId: string): string {
  // Priority: highlight → active → series color
  if (point.highlight) {
    return colorToClass(point.highlight)
  }
  if (point.key === resolvedActiveKey.value) {
    return 'bg-royalblue-600'
  }
  const color = seriesColorMap.value[seriesId] ?? 'lightgrey'
  // Active series of an inactive bar — use muted shade
  return colorToMutedClass(color)
}

function colorToClass(color: string): string {
  const map: Record<string, string> = {
    royalblue: 'bg-royalblue-600',
    darkblue:  'bg-darkblue-600',
    green:     'bg-green-500',
    yellow:    'bg-yellow-400',
    red:       'bg-red-500',
    lightgrey: 'bg-lightgrey-400',
  }
  return map[color] ?? `bg-${color}-500`
}

function colorToMutedClass(color: string): string {
  const map: Record<string, string> = {
    royalblue: 'bg-lightgrey-300',
    darkblue:  'bg-lightgrey-300',
    green:     'bg-lightgrey-300',
    yellow:    'bg-lightgrey-300',
    red:       'bg-lightgrey-300',
    lightgrey: 'bg-lightgrey-300',
  }
  return map[color] ?? 'bg-lightgrey-300'
}

// ─── Legend ──────────────────────────────────────────────────────────────────

function legendDotClass(color: string): string {
  return colorToClass(color)
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────

function tooltipText(point: AppChartDataPoint): string {
  return props.series
    .map(s => `${s.label}: ${formatChartValue(point.values[s.id] ?? 0, props.format, props.formatOptions)}`)
    .join('\n')
}

// ─── Skeleton bars (loading state) ───────────────────────────────────────────

const skeletonHeights = [120, 60, 180, 40, 150]
</script>

<template>
  <div class="flex flex-col gap-4 w-full">

    <!-- Loading skeleton -->
    <div v-if="loading" class="flex items-end justify-center gap-4 w-full" :style="`height: ${maxBarHeight + 60}px`">
      <div
        v-for="(h, i) in skeletonHeights.slice(0, windowSize)"
        :key="i"
        class="w-10 rounded-full animate-pulse bg-lightgrey-100"
        :style="`height: ${h}px`"
      />
    </div>

    <!-- Empty state -->
    <div
      v-else-if="data.length === 0"
      class="flex items-center justify-center w-full py-12 text-sm"
      :style="`min-height: ${maxBarHeight}px`"
    >
      <span class="text-muted">No data available</span>
    </div>

    <!-- Chart bars -->
    <div v-else class="flex items-end justify-between gap-2 md:gap-4 w-full" :style="`min-height: ${maxBarHeight}px`">
      <div
        v-for="point in visibleData"
        :key="point.key"
        class="flex flex-col items-center gap-2 flex-1 min-w-0"
      >
        <!-- Single-series bar (most common case) -->
        <template v-if="series.length === 1">
          <UTooltip
            :text="formatChartValue(point.values[series[0].id] ?? 0, format, formatOptions)"
            :delay-duration="100"
          >
            <button
              type="button"
              class="w-full max-w-12 rounded-full transition-all duration-150 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royalblue-300 cursor-pointer"
              :class="barColorClass(point, series[0].id)"
              :style="`height: ${barHeight(point.values[series[0].id] ?? 0)}px`"
              :aria-label="`${series[0].label}: ${formatChartValue(point.values[series[0].id] ?? 0, format, formatOptions)} for ${point.label}`"
              @click="emit('select', point.key, point.values)"
            />
          </UTooltip>
        </template>

        <!-- Multi-series: grouped bars side by side -->
        <template v-else>
          <UTooltip :delay-duration="100">
            <template #default>
              <div
                class="flex items-end gap-1 cursor-pointer"
                @click="emit('select', point.key, point.values)"
              >
                <div
                  v-for="s in series"
                  :key="s.id"
                  class="w-4 md:w-5 rounded-full transition-all duration-150 hover:brightness-110"
                  :class="barColorClass(point, s.id)"
                  :style="`height: ${barHeight(point.values[s.id] ?? 0)}px`"
                />
              </div>
            </template>
            <template #text>
              <div class="flex flex-col gap-0.5 text-xs">
                <span v-for="s in series" :key="s.id">
                  {{ s.label }}: {{ formatChartValue(point.values[s.id] ?? 0, format, formatOptions) }}
                </span>
              </div>
            </template>
          </UTooltip>
        </template>

        <!-- Value label chip -->
        <span
          class="text-xs font-semibold px-2 py-0.5 rounded-md w-full text-center truncate transition-colors"
          :class="point.key === resolvedActiveKey ? 'text-royalblue-600' : 'text-muted'"
        >
          {{ formatChartValue(
            series.length === 1
              ? (point.values[series[0].id] ?? 0)
              : Object.values(point.values).reduce((a, b) => a + b, 0),
            format,
            formatOptions
          ) }}
        </span>

        <!-- Date/category label chip -->
        <span
          class="text-xs px-2 py-0.5 rounded-md bg-elevated text-muted w-full text-center truncate"
        >
          {{ point.label }}
        </span>
      </div>
    </div>

    <!-- Pagination footer -->
    <div
      v-if="data.length > windowSize"
      class="flex items-center justify-between pt-3 border-t border-muted"
    >
      <p class="text-sm text-muted">
        Showing
        <span class="font-semibold text-default">{{ Math.min((pageIndex + 1) * windowSize, data.length) }}</span>
        of
        <span class="font-semibold text-royalblue-600">{{ data.length }}</span>
      </p>
      <div class="flex gap-2">
        <UButton
          size="xs"
          color="neutral"
          variant="outline"
          icon="i-lucide-chevron-left"
          :disabled="pageIndex === 0"
          aria-label="Previous"
          square
          @click="prevPage"
        />
        <UButton
          size="xs"
          color="neutral"
          variant="outline"
          icon="i-lucide-chevron-right"
          :disabled="pageIndex >= totalPages - 1"
          aria-label="Next"
          square
          @click="nextPage"
        />
      </div>
    </div>

    <!-- Legend -->
    <div v-if="series.length > 1" class="flex flex-wrap items-center gap-x-4 gap-y-2">
      <div v-for="s in series" :key="s.id" class="flex items-center gap-1.5">
        <span
          class="inline-block size-3 rounded-full shrink-0"
          :class="legendDotClass(s.color ?? colorSequence[series.indexOf(s) % colorSequence.length] ?? 'lightgrey')"
        />
        <span class="text-xs text-muted">{{ s.label }}</span>
      </div>
    </div>

  </div>
</template>
