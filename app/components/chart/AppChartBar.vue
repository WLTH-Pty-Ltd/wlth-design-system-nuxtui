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
  /** Key of the currently active/highlighted bar. Defaults to highest value data point. */
  activeKey?: string
  /** Maximum bar height in pixels */
  maxBarHeight?: number
  loading?: boolean
  /** Show pagination footer. Default: true */
  showPagination?: boolean
  /** Show legend (multi-series only). Default: true */
  showLegend?: boolean
}>(), {
  format: 'number',
  formatOptions: () => ({}),
  maxBarHeight: 200,
  loading: false,
  showPagination: true,
  showLegend: true,
})

const emit = defineEmits<{
  (e: 'select', key: string, values: Record<string, number>): void
  (e: 'update:page', index: number): void
}>()

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

// ─── Responsive window size ──────────────────────────────────────────────────

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('md')

const windowSize = computed(() => {
  if (props.window !== undefined) return props.window
  // Mobile renders every bar and scrolls horizontally (see template) — no
  // windowing — so no quarter is hidden behind pagination on a small screen.
  return isMobile.value ? props.data.length : 5
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

watch([() => props.data, windowSize], () => {
  pageIndex.value = 0
}, { immediate: true })

watch(pageIndex, (val) => {
  animated.value = false
  localActiveKey.value = null
  nextTick(() => requestAnimationFrame(() => { animated.value = true }))
  emit('update:page', val)
})

function prevPage() {
  if (pageIndex.value > 0) pageIndex.value--
}
function nextPage() {
  if (pageIndex.value < totalPages.value - 1) pageIndex.value++
}

// Bridge for AppPagination (1-based) ↔ internal pageIndex (0-based)
const paginationPage = computed({
  get: () => pageIndex.value + 1,
  set: (val: number) => { pageIndex.value = val - 1 },
})

// ─── Active bar ───────────────────────────────────────────────────────────────
// Priority: localActiveKey (user clicked) → prop override → highest value bar

const localActiveKey = ref<string | null>(null)

// Reset local selection when dataset changes
watch(() => props.data, () => {
  localActiveKey.value = null
})

const resolvedActiveKey = computed(() => {
  if (localActiveKey.value !== null) return localActiveKey.value
  if (props.activeKey !== undefined) return props.activeKey
  // Auto-highlight the highest value bar on the current page
  let maxVal = -Infinity
  let maxKey: string | null = null
  for (const point of visibleData.value) {
    const total = Object.values(point.values).reduce((a, b) => a + b, 0)
    if (total > maxVal) {
      maxVal = total
      maxKey = point.key
    }
  }
  return maxKey ?? visibleData.value[visibleData.value.length - 1]?.key ?? null
})

function handleBarClick(point: AppChartDataPoint) {
  localActiveKey.value = point.key
  emit('select', point.key, point.values)
}

// ─── Bar height calculation ───────────────────────────────────────────────────

const maxValue = computed(() => {
  let max = 0
  for (const point of visibleData.value) {
    for (const id of Object.keys(point.values)) {
      const v = point.values[id] ?? 0
      if (v > max) max = v
    }
  }
  return max
})

function barHeight(value: number): number {
  if (value === 0) return 0
  if (maxValue.value === 0) return 8
  const ratio = value / maxValue.value
  const MIN_RATIO = 0.15
  return Math.round(Math.max(ratio, MIN_RATIO) * props.maxBarHeight)
}

// ─── Bar color ────────────────────────────────────────────────────────────────

// For active multi-series groups: rank each series bar by value descending.
// Rank 0 (highest) → royalblue-500, rank 1 → royalblue-300 (3+ series only), rest → grey.
const activeGroupValueRanks = computed<Record<string, number>>(() => {
  if (!resolvedActiveKey.value) return {}
  const point = visibleData.value.find(p => p.key === resolvedActiveKey.value)
  if (!point) return {}
  const sorted = props.series
    .map(s => ({ id: s.id, val: point.values[s.id] ?? 0 }))
    .sort((a, b) => b.val - a.val)
  return Object.fromEntries(sorted.map((e, i) => [e.id, i]))
})

function barColorClass(point: AppChartDataPoint, seriesId: string): string {
  if (point.highlight) return colorToClass(point.highlight)
  if (point.key !== resolvedActiveKey.value) return 'bg-lightgrey-700 hover:bg-lightgrey-600'
  const rank = activeGroupValueRanks.value[seriesId] ?? 0
  if (rank === 0) return 'bg-royalblue-500 hover:bg-royalblue-400'
  if (rank === 1 && props.series.length > 2) return 'bg-royalblue-300 hover:bg-royalblue-200'
  return 'bg-lightgrey-700 hover:bg-lightgrey-600'
}

function colorToClass(color: string): string {
  const map: Record<string, string> = {
    royalblue: 'bg-royalblue-500 hover:bg-royalblue-400',
    darkblue:  'bg-darkblue-600 hover:bg-darkblue-500',
    green:     'bg-green-500 hover:bg-green-400',
    yellow:    'bg-yellow-400 hover:bg-yellow-300',
    red:       'bg-red-500 hover:bg-red-400',
    lightgrey: 'bg-lightgrey-700 hover:bg-lightgrey-600',
  }
  return map[color] ?? `bg-${color}-500`
}

// ─── Legend ──────────────────────────────────────────────────────────────────

function legendDotClass(color: string): string {
  const map: Record<string, string> = {
    royalblue: 'bg-royalblue-500',
    darkblue:  'bg-darkblue-600',
    green:     'bg-green-500',
    yellow:    'bg-yellow-400',
    red:       'bg-red-500',
    lightgrey: 'bg-lightgrey-700',
  }
  return map[color] ?? `bg-${color}-500`
}

// ─── Hover tooltip ────────────────────────────────────────────────────────────

const hoveredKey = ref<string | null>(null)

function onBarEnter(key: string) { hoveredKey.value = key }
function onBarLeave() { hoveredKey.value = null }

// ─── Mount animation ──────────────────────────────────────────────────────────

const animated = ref(false)

// Bars scroll horizontally on mobile — always start pinned to the first (left)
// bar so the newest data point is what loads into view, not a mid-scroll offset.
const barsScroller = ref<HTMLElement | null>(null)
function resetScroll() {
  nextTick(() => { if (barsScroller.value) barsScroller.value.scrollLeft = 0 })
}

onMounted(() => {
  resetScroll()
  nextTick(() => requestAnimationFrame(() => { animated.value = true }))
})

watch(() => props.data, () => {
  animated.value = false
  resetScroll()
  nextTick(() => requestAnimationFrame(() => { animated.value = true }))
})

// ─── Keyboard navigation ──────────────────────────────────────────────────────

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft') { e.preventDefault(); prevPage() }
  if (e.key === 'ArrowRight') { e.preventDefault(); nextPage() }
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const skeletonHeights = [120, 60, 180, 40, 150, 90, 130, 70, 160, 45, 110, 85]
</script>

<template>
  <div class="flex flex-col gap-4 w-full outline-none" tabindex="0" @keydown="onKeyDown">

    <!-- Loading skeleton -->
    <div v-if="loading" class="flex items-end justify-between gap-2 md:gap-4 w-full" :style="`height: ${maxBarHeight + 60}px`">
      <div
        v-for="(h, i) in skeletonHeights.slice(0, windowSize)"
        :key="i"
        class="flex flex-col items-center gap-2 flex-1 min-w-0"
      >
        <div
          class="w-full max-w-12 rounded-full bg-lightgrey-400 dark:bg-lightgrey-600 animate-pulse"
          :style="{ height: `${h}px`, animationDelay: `${i * 80}ms` }"
        />
        <div
          class="h-4 w-3/4 rounded bg-lightgrey-400 dark:bg-lightgrey-600 animate-pulse"
          :style="{ animationDelay: `${i * 80}ms` }"
        />
        <div
          class="h-5 w-full rounded-md bg-lightgrey-400 dark:bg-lightgrey-600 animate-pulse"
          :style="{ animationDelay: `${i * 80}ms` }"
        />
      </div>
    </div>

    <!-- Empty state -->
    <div
      v-else-if="data.length === 0"
      class="flex flex-col items-center justify-center gap-1.5 w-full"
      :style="`height: ${maxBarHeight + 60}px`"
    >
      <p class="text-sm font-medium text-toned">Nothing to show here yet</p>
      <p class="text-xs text-muted">Data will appear once it's available</p>
    </div>

    <!-- Chart bars — scrolls horizontally on mobile so every bar stays readable -->
    <div
      v-else
      ref="barsScroller"
      class="flex items-end gap-3 md:gap-4 w-full overflow-x-auto md:overflow-x-visible md:justify-between"
      :style="`height: ${maxBarHeight + 60}px`"
    >
      <div
        v-for="(point, index) in visibleData"
        :key="point.key"
        class="flex flex-col items-center gap-2 min-w-[56px] shrink-0 md:flex-1 md:min-w-0 md:shrink"
      >
        <!-- Single-series bar -->
        <template v-if="series.length === 1">
          <!-- Relative wrapper so tooltip can be positioned above the bar -->
          <div
            class="relative w-full flex justify-center"
            @mouseenter="onBarEnter(point.key)"
            @mouseleave="onBarLeave"
          >
            <!-- Per-bar tooltip -->
            <Transition
              enter-active-class="transition-all duration-150 ease-out"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-100 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <div
                v-if="hoveredKey === point.key"
                class="absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 z-20 pointer-events-none"
              >
                <div class="flex items-center gap-1.5 bg-elevated border border-muted text-xs rounded-lg px-2.5 py-1.5 shadow-sm whitespace-nowrap">
                  <span class="text-toned">{{ point.label }}</span>
                  <span class="font-semibold text-default">
                    {{ formatChartValue(point.values[series[0].id] ?? 0, format, formatOptions) }}
                  </span>
                </div>
                <!-- Caret -->
                <div class="flex justify-center">
                  <div class="w-2 h-1.5 overflow-hidden">
                    <div class="w-2 h-2 bg-elevated border-b border-r border-muted rotate-45 -translate-y-1 mx-auto" />
                  </div>
                </div>
              </div>
            </Transition>

            <button
              type="button"
              class="w-full max-w-12 rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royalblue-300 cursor-pointer"
              :class="barColorClass(point, series[0].id)"
              :style="{
                height: animated ? `${barHeight(point.values[series[0].id] ?? 0)}px` : '0px',
                opacity: animated ? '1' : '0',
                transition: `height 0.55s cubic-bezier(0.34, 1.2, 0.64, 1) ${index * 55}ms, opacity 0.3s ease ${index * 55}ms, background-color 150ms ease`,
              }"
              :aria-label="`${series[0].label}: ${formatChartValue(point.values[series[0].id] ?? 0, format, formatOptions)} for ${point.label}`"
              @click="handleBarClick(point)"
            />
          </div>
        </template>

        <!-- Multi-series: grouped bars side by side -->
        <template v-else>
          <div
            class="relative flex items-end gap-1 cursor-pointer"
            @mouseenter="onBarEnter(point.key)"
            @mouseleave="onBarLeave"
            @click="handleBarClick(point)"
          >
            <!-- Per-group tooltip -->
            <Transition
              enter-active-class="transition-all duration-150 ease-out"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-100 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <div
                v-if="hoveredKey === point.key"
                class="absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 z-20 pointer-events-none"
              >
                <div class="flex flex-col gap-0.5 bg-elevated border border-muted text-xs rounded-lg px-2.5 py-1.5 shadow-sm whitespace-nowrap">
                  <div class="text-toned mb-0.5">{{ point.label }}</div>
                  <div v-for="s in series" :key="s.id" class="flex items-center gap-1.5">
                    <span class="inline-block size-2 rounded-full shrink-0" :class="legendDotClass(s.color ?? 'lightgrey')" />
                    <span class="text-toned">{{ s.label }}:</span>
                    <span class="font-semibold text-default">{{ formatChartValue(point.values[s.id] ?? 0, format, formatOptions) }}</span>
                  </div>
                </div>
                <div class="flex justify-center">
                  <div class="w-2 h-1.5 overflow-hidden">
                    <div class="w-2 h-2 bg-elevated border-b border-r border-muted rotate-45 -translate-y-1 mx-auto" />
                  </div>
                </div>
              </div>
            </Transition>

            <div
              v-for="(s, sIndex) in series"
              :key="s.id"
              class="w-4 md:w-5 rounded-full transition-colors duration-150"
              :class="barColorClass(point, s.id)"
              :style="{
                height: animated ? `${barHeight(point.values[s.id] ?? 0)}px` : '0px',
                opacity: animated ? '1' : '0',
                transition: `height 0.55s cubic-bezier(0.34, 1.2, 0.64, 1) ${(index * series.length + sIndex) * 40}ms, opacity 0.3s ease ${(index * series.length + sIndex) * 40}ms, background-color 150ms ease`,
              }"
            />
          </div>
        </template>

        <!-- Value label — always present for layout; hidden for inactive multi-series groups -->
        <span
          class="text-xs font-semibold px-2 py-0.5 rounded-md w-full text-center truncate text-toned transition-opacity duration-150"
          :class="{ 'invisible': series.length > 1 && point.key !== resolvedActiveKey }"
        >
          {{ formatChartValue(
            series.length === 1
              ? (point.values[series[0].id] ?? 0)
              : Object.values(point.values).reduce((a, b) => a + b, 0),
            format,
            formatOptions
          ) }}
        </span>

        <!-- Date label -->
        <span class="text-xs px-2 py-0.5 rounded-md bg-elevated text-toned w-full text-center truncate">
          {{ point.label }}
        </span>
      </div>
    </div>

    <!-- Pagination footer — always rendered (v-show) to prevent height jump -->
    <div
      v-show="showPagination"
      class="pt-3 border-t border-muted"
    >
      <AppPagination v-model:page="paginationPage" :total="totalPages" :loading="loading" />
    </div>

    <!-- Legend (multi-series only) -->
    <div v-if="loading && series.length > 1 && showLegend" class="flex flex-wrap items-center gap-x-4 gap-y-2">
      <div
        v-for="i in series.length"
        :key="i"
        class="h-3 w-20 rounded bg-lightgrey-400 dark:bg-lightgrey-600 animate-pulse"
        :style="{ animationDelay: `${i * 80}ms` }"
      />
    </div>
    <div v-else-if="series.length > 1 && showLegend" class="flex flex-wrap items-center gap-x-4 gap-y-2">
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
