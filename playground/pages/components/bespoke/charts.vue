<script setup lang="ts">
definePageMeta({ layout: 'docs' })

// ─── Mock data — no API needed ────────────────────────────────────────────────

// Dataset 1: Submitted Applications
const submittedSeries = [
  { id: 'submitted', label: 'Submitted Applications', color: 'royalblue' }
]
const applicationData = [
  { key: 'jan-26',  label: 'Jan 26',  values: { submitted: 3970000 } },
  { key: 'dec-25',  label: 'Dec 25',  values: { submitted: 2360000 } },
  { key: 'nov-25',  label: 'Nov 25',  values: { submitted: 0 } },
  { key: 'oct-25',  label: 'Oct 25',  values: { submitted: 0 } },
  { key: 'sep-25',  label: 'Sept 25', values: { submitted: 661500 } },
  { key: 'aug-25',  label: 'Aug 25',  values: { submitted: 890000 } },
  { key: 'jul-25',  label: 'Jul 25',  values: { submitted: 440000 } },
  { key: 'jun-25',  label: 'Jun 25',  values: { submitted: 0 } },
  { key: 'may-25',  label: 'May 25',  values: { submitted: 620000 } },
  { key: 'apr-25',  label: 'Apr 25',  values: { submitted: 175000 } },
  { key: 'mar-25',  label: 'Mar 25',  values: { submitted: 330000 } },
  { key: 'feb-25',  label: 'Feb 25',  values: { submitted: 540000 } },
  { key: 'jan-25',  label: 'Jan 25',  values: { submitted: 210000 } },
  { key: 'dec-24',  label: 'Dec 24',  values: { submitted: 89000 } },
  { key: 'nov-24',  label: 'Nov 24',  values: { submitted: 0 } },
  { key: 'oct-24',  label: 'Oct 24',  values: { submitted: 0 } },
  { key: 'sep-24',  label: 'Sept 24', values: { submitted: 661500 } },
  { key: 'aug-24',  label: 'Aug 24',  values: { submitted: 412000 } },
]

// Dataset 2: In Flow Applications
const inflowSeries = [
  { id: 'inflow', label: 'In Flow Applications', color: 'royalblue' }
]
const inflowData = [
  { key: 'jan-26',  label: 'Jan 26',  values: { inflow: 2910000 } },
  { key: 'dec-25',  label: 'Dec 25',  values: { inflow: 1840000 } },
  { key: 'nov-25',  label: 'Nov 25',  values: { inflow: 75000 } },
  { key: 'oct-25',  label: 'Oct 25',  values: { inflow: 130000 } },
  { key: 'sep-25',  label: 'Sept 25', values: { inflow: 510000 } },
  { key: 'aug-25',  label: 'Aug 25',  values: { inflow: 640000 } },
  { key: 'jul-25',  label: 'Jul 25',  values: { inflow: 310000 } },
  { key: 'jun-25',  label: 'Jun 25',  values: { inflow: 95000 } },
  { key: 'may-25',  label: 'May 25',  values: { inflow: 480000 } },
  { key: 'apr-25',  label: 'Apr 25',  values: { inflow: 120000 } },
  { key: 'mar-25',  label: 'Mar 25',  values: { inflow: 275000 } },
  { key: 'feb-25',  label: 'Feb 25',  values: { inflow: 390000 } },
  { key: 'jan-25',  label: 'Jan 25',  values: { inflow: 155000 } },
  { key: 'dec-24',  label: 'Dec 24',  values: { inflow: 62000 } },
  { key: 'nov-24',  label: 'Nov 24',  values: { inflow: 45000 } },
  { key: 'oct-24',  label: 'Oct 24',  values: { inflow: 88000 } },
  { key: 'sep-24',  label: 'Sept 24', values: { inflow: 310000 } },
  { key: 'aug-24',  label: 'Aug 24',  values: { inflow: 198000 } },
]

const applicationDatasets = [
  {
    id: 'submitted',
    label: 'Submitted',
    total: '$3.97m',
    series: submittedSeries,
    data: applicationData,
  },
  {
    id: 'inflow',
    label: 'In Flow',
    total: '$2.91m',
    series: inflowSeries,
    data: inflowData,
  },
]

// Bar — Multi-Series: rewards
const rewardSeries = [
  { id: 'business',  label: 'Business Rewards', color: 'royalblue' },
  { id: 'velocity',  label: 'Velocity',          color: 'darkblue'  },
  { id: 'frequent',  label: 'Frequent Flyer'                         },
]

const rewardData2025 = [
  { key: 'jan-26',  label: 'Jan 26',  values: { business: 4280, velocity: 3452, frequent: 5134 } },
  { key: 'dec-25',  label: 'Dec 25',  values: { business: 505,  velocity: 200,  frequent: 350  } },
  { key: 'nov-25',  label: 'Nov 25',  values: { business: 210,  velocity: 90,   frequent: 190  } },
  { key: 'oct-25',  label: 'Oct 25',  values: { business: 340,  velocity: 120,  frequent: 280  } },
  { key: 'sept-25', label: 'Sept 25', values: { business: 128,  velocity: 60,   frequent: 126  } },
  { key: 'aug-25',  label: 'Aug 25',  values: { business: 175,  velocity: 78,   frequent: 180  } },
  { key: 'jul-25',  label: 'Jul 25',  values: { business: 150,  velocity: 65,   frequent: 160  } },
  { key: 'jun-25',  label: 'Jun 25',  values: { business: 130,  velocity: 55,   frequent: 140  } },
  { key: 'may-25',  label: 'May 25',  values: { business: 110,  velocity: 48,   frequent: 115  } },
  { key: 'apr-25',  label: 'Apr 25',  values: { business: 95,   velocity: 42,   frequent: 105  } },
  { key: 'mar-25',  label: 'Mar 25',  values: { business: 80,   velocity: 35,   frequent: 90   } },
  { key: 'feb-25',  label: 'Feb 25',  values: { business: 65,   velocity: 30,   frequent: 70   } },
]

const rewardData2024 = [
  { key: 'jan-25',  label: 'Jan 25',  values: { business: 2840, velocity: 2100, frequent: 3410 } },
  { key: 'dec-24',  label: 'Dec 24',  values: { business: 310,  velocity: 130,  frequent: 220  } },
  { key: 'nov-24',  label: 'Nov 24',  values: { business: 145,  velocity: 60,   frequent: 130  } },
  { key: 'oct-24',  label: 'Oct 24',  values: { business: 210,  velocity: 85,   frequent: 175  } },
  { key: 'sept-24', label: 'Sept 24', values: { business: 80,   velocity: 40,   frequent: 95   } },
  { key: 'aug-24',  label: 'Aug 24',  values: { business: 120,  velocity: 52,   frequent: 130  } },
  { key: 'jul-24',  label: 'Jul 24',  values: { business: 100,  velocity: 44,   frequent: 110  } },
  { key: 'jun-24',  label: 'Jun 24',  values: { business: 85,   velocity: 38,   frequent: 95   } },
  { key: 'may-24',  label: 'May 24',  values: { business: 70,   velocity: 30,   frequent: 80   } },
  { key: 'apr-24',  label: 'Apr 24',  values: { business: 60,   velocity: 25,   frequent: 68   } },
  { key: 'mar-24',  label: 'Mar 24',  values: { business: 50,   velocity: 22,   frequent: 55   } },
  { key: 'feb-24',  label: 'Feb 24',  values: { business: 40,   velocity: 18,   frequent: 45   } },
]

const rewardDatasets = [
  { id: '2025', label: '2025', total: '12,563', series: rewardSeries, data: rewardData2025 },
  { id: '2024', label: '2024', total: '8,421',  series: rewardSeries, data: rewardData2024 },
]

// Stacked Bar: payments
const paymentSeries = [
  { id: 'amex',         label: 'Amex',         color: 'royalblue' },
  { id: 'mastercard',   label: 'Mastercard',   color: 'darkblue'  },
  { id: 'bankTransfer', label: 'Bank Transfer'                     },
]

const paymentDataMonth = [
  { key: 'this-month', label: '', values: { amex: 25, mastercard: 12, bankTransfer: 63 } }
]

const paymentDataYear = [
  { key: 'this-year', label: '', values: { amex: 10, mastercard: 60, bankTransfer: 30 } }
]

// ─── Per-tab configuration ────────────────────────────────────────────────────

const barSingleConfig = reactive({
  showTitle: true,
  showDatasetToggle: true,
  showPagination: true,
  loading: false,
  empty: false,
  maxBarHeight: 180,
  window: 5,
})

const barMultiConfig = reactive({
  showTitle: true,
  showDatasetToggle: true,
  showPagination: true,
  showLegend: true,
  loading: false,
  empty: false,
  maxBarHeight: 160,
  window: 7,
})

const stackedConfig = reactive({
  showTitle: true,
  loading: false,
  empty: false,
})

// ─── Breakpoint presets ───────────────────────────────────────────────────────

const breakpointPresets = [
  { label: 'Mobile',  icon: 'i-lucide-smartphone', window: 3, maxWidth: '375px' },
  { label: 'Tablet',  icon: 'i-lucide-tablet',     window: 5, maxWidth: '768px' },
  { label: 'Desktop', icon: 'i-lucide-monitor',    window: 7, maxWidth: null    },
]

const barSingleBreakpoint = computed(() =>
  breakpointPresets.find(bp => bp.window === barSingleConfig.window) ?? null
)

const barMultiBreakpoint = computed(() =>
  breakpointPresets.find(bp => bp.window === barMultiConfig.window) ?? null
)

// ─── Tabs ─────────────────────────────────────────────────────────────────────

const chartTabs = [
  { label: 'Bar — Single Series', value: 'bar-single',    slot: 'bar-single'    },
  { label: 'Bar — Multi-Series',  value: 'bar-multi',     slot: 'bar-multi'     },
  { label: 'Stacked Bar',         value: 'stacked-bar',   slot: 'stacked-bar'   },
  { label: 'Props Reference',     value: 'props',         slot: 'props'         },
]

// ─── Interaction ─────────────────────────────────────────────────────────────

const lastSelected = ref<{ key: string; values: Record<string, number> } | null>(null)

function onSelect(key: string, values: Record<string, number>) {
  lastSelected.value = { key, values }
}

// ─── Docs metadata ────────────────────────────────────────────────────────────

const components = [
  {
    name: 'AppChart',
    file: 'app/components/AppChart.vue',
    desc: 'Entry-point wrapper. Routes to the correct renderer based on type. Provides KPI slot layout, dataset toggle, and loading/empty skeleton coordination.'
  },
  {
    name: 'AppChartBar',
    file: 'app/components/chart/AppChartBar.vue',
    desc: 'Vertical pill bar renderer. Per-page normalisation, highest-value highlight, responsive window, pagination, hover tooltips, spring animation, keyboard nav.'
  },
  {
    name: 'AppChartStackedBar',
    file: 'app/components/chart/AppChartStackedBar.vue',
    desc: 'Horizontal segmented bar renderer. Each series becomes a percentage-width segment. Includes hover tooltips and a legend.'
  },
]

const propsRows = [
  { prop: 'type',              type: "'bar' | 'stacked-bar'",            def: '—',              desc: 'Required. Chart type to render.' },
  { prop: 'series',            type: 'AppChartSeries[]',                 def: '[]',             desc: 'Series definitions. Used when not using datasets prop.' },
  { prop: 'data',              type: 'AppChartDataPoint[]',              def: '[]',             desc: 'Data points. Used when not using datasets prop.' },
  { prop: 'datasets',          type: 'AppChartDataset[]',               def: '—',              desc: 'Self-contained datasets with own series, data, and optional total. Enables dataset toggle when >1 provided.' },
  { prop: 'showDatasetToggle', type: 'boolean',                          def: 'true',           desc: 'Show/hide the dataset toggle pill switcher.' },
  { prop: 'format',            type: "'currency' | 'number' | 'percent' | fn", def: "'number'", desc: 'Value label format.' },
  { prop: 'formatOptions',     type: 'AppChartFormatOptions',            def: '{}',             desc: "Options for format (e.g. { currency: '£' })." },
  { prop: 'window',            type: 'number',                           def: '5 (3 mobile)',   desc: 'Bar chart: bars visible at once.' },
  { prop: 'activeKey',         type: 'string',                           def: 'highest value',  desc: 'Bar chart: override the highlighted bar key.' },
  { prop: 'maxBarHeight',      type: 'number',                           def: '200',            desc: 'Bar chart: max bar height in px.' },
  { prop: 'showPagination',    type: 'boolean',                          def: 'true',           desc: 'Bar chart: show/hide pagination footer.' },
  { prop: 'showLegend',        type: 'boolean',                          def: 'true',           desc: 'Bar chart: show/hide the multi-series legend.' },
  { prop: 'loading',           type: 'boolean',                          def: 'false',          desc: 'Show loading skeleton.' },
]

const composables = [
  {
    name: 'useChartData',
    file: 'app/composables/useChartData.ts',
    desc: 'Connects any async data source (Supabase, HubSpot, $fetch, etc.) to the chart component. Returns reactive data, isLoading, error, and refresh().'
  },
  {
    name: 'useChartFormat / formatChartValue',
    file: 'app/composables/useChartFormat.ts',
    desc: "Formats numeric values for chart labels. Modes: 'currency' ($661.5k, $3.97m), 'number' (12,563), 'percent' (25%), or a custom formatter function."
  },
]
</script>

<template>
  <div class="max-w-7xl mx-auto px-10 py-12 space-y-10">

    <!-- ─── Overview ─────────────────────────────────────────────────────── -->
    <div class="space-y-1">
      <h1 class="text-2xl font-semibold text-default">AppChart</h1>
      <p class="text-sm text-toned">
        Universal chart component for data visualisation across all WLTH products.
        Renders pill-shaped bar charts, horizontal stacked bars, and more — all styled
        with WLTH design tokens and responsive by default. Powered by CSS and Vue; no
        external charting library required.
      </p>
    </div>

    <!-- ─── Chart tabs ───────────────────────────────────────────────────── -->
    <UTabs :items="chartTabs" default-value="bar-single" class="w-full">

      <!-- ── Bar — Single Series ── -->
      <template #bar-single>
        <div class="space-y-4 pt-4">

          <!-- Config panel -->
          <UCard variant="soft" :ui="{ root: 'rounded-xl bg-(--ui-bg-muted)', body: 'p-4' }">
            <div class="flex flex-wrap items-center gap-x-6 gap-y-4">

              <!-- Switches -->
              <div class="flex flex-wrap items-center gap-x-5 gap-y-3">
                <label class="flex items-center gap-2 cursor-pointer select-none">
                  <AppSwitch v-model="barSingleConfig.showTitle" size="sm" />
                  <span class="text-xs text-toned">Title</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer select-none">
                  <AppSwitch v-model="barSingleConfig.showPagination" size="sm" />
                  <span class="text-xs text-toned">Pagination</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer select-none">
                  <AppSwitch v-model="barSingleConfig.showDatasetToggle" size="sm" />
                  <span class="text-xs text-toned">Dataset toggle</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer select-none">
                  <AppSwitch v-model="barSingleConfig.loading" size="sm" />
                  <span class="text-xs text-toned">Loading</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer select-none">
                  <AppSwitch v-model="barSingleConfig.empty" size="sm" />
                  <span class="text-xs text-toned">Empty</span>
                </label>
              </div>

              <div class="w-px h-8 bg-muted hidden sm:block" />

              <!-- Bar height -->
              <div class="space-y-1.5 min-w-36">
                <div class="flex items-center justify-between gap-4">
                  <p class="text-xs text-muted">Bar Height</p>
                  <span class="text-xs font-mono text-toned">{{ barSingleConfig.maxBarHeight }}px</span>
                </div>
                <input v-model.number="barSingleConfig.maxBarHeight" type="range" min="80" max="300" step="10" class="w-full accent-royalblue-500" />
              </div>

              <div class="w-px h-8 bg-muted hidden sm:block" />

              <!-- Breakpoint -->
              <div class="space-y-1.5">
                <div class="flex items-center justify-between gap-4">
                  <p class="text-xs text-muted">Breakpoint</p>
                  <span class="text-xs font-mono text-toned">{{ barSingleConfig.window }} bars</span>
                </div>
                <div class="flex items-center gap-1">
                  <div class="inline-flex items-center gap-1 bg-elevated rounded-full p-1">
                    <button
                      v-for="bp in breakpointPresets"
                      :key="bp.label"
                      type="button"
                      class="flex items-center gap-1.5 text-xs py-1 px-2.5 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royalblue-300 whitespace-nowrap"
                      :class="barSingleConfig.window === bp.window ? 'bg-white dark:bg-white/10 text-royalblue-500 font-semibold shadow-sm' : 'text-toned hover:text-default'"
                      @click="barSingleConfig.window = bp.window"
                    >
                      <span :class="[bp.icon, 'size-3 shrink-0']" />
                      {{ bp.label }}
                    </button>
                  </div>
                  <input v-model.number="barSingleConfig.window" type="range" min="3" max="12" step="1" class="w-24 accent-royalblue-500" />
                </div>
              </div>

            </div>
          </UCard>

          <!-- Preview -->
          <div
            class="transition-all duration-500 ease-in-out"
            :style="barSingleBreakpoint?.maxWidth ? `max-width: ${barSingleBreakpoint.maxWidth}` : ''"
          >
            <div v-if="barSingleBreakpoint" class="flex items-center gap-1.5 mb-2">
              <span :class="[barSingleBreakpoint.icon, 'size-3 text-muted']" />
              <span class="text-xs text-muted">{{ barSingleBreakpoint.label }}<span v-if="barSingleBreakpoint.maxWidth"> · {{ barSingleBreakpoint.maxWidth }}</span></span>
            </div>
            <UCard variant="soft" :ui="{ root: 'rounded-xl bg-(--ui-bg-muted)', body: 'p-4' }">
              <AppChart
                type="bar"
                :title="barSingleConfig.showTitle ? 'Applications' : undefined"
                :datasets="barSingleConfig.empty ? [] : applicationDatasets"
                :show-dataset-toggle="barSingleConfig.showDatasetToggle"
                :show-pagination="barSingleConfig.showPagination"
                :loading="barSingleConfig.loading"
                :max-bar-height="barSingleConfig.maxBarHeight"
                :window="barSingleConfig.window"
                format="currency"
                :format-options="{ currency: '$' }"
                @select="onSelect"
              />
            </UCard>
          </div>

          <!-- Select feedback -->
          <div v-if="lastSelected" class="text-xs text-toned bg-elevated rounded-lg px-3 py-2">
            Selected: <span class="font-mono text-royalblue-500">{{ lastSelected.key }}</span>
            — {{ JSON.stringify(lastSelected.values) }}
          </div>

          <!-- Usage -->
          <div class="space-y-2">
            <p class="text-xs font-mono text-toned uppercase tracking-wider">Usage</p>
            <pre class="text-xs bg-elevated rounded-lg p-4 overflow-auto leading-relaxed"><code>{{ `<AppChart
  type="bar"
  :datasets="[
    {
      id: 'submitted',
      label: 'Submitted',
      total: '$3.97m',
      series: [{ id: 'submitted', label: 'Submitted Applications', color: 'royalblue' }],
      data: submittedData,
    },
    {
      id: 'inflow',
      label: 'In Flow',
      total: '$2.91m',
      series: [{ id: 'inflow', label: 'In Flow Applications', color: 'royalblue' }],
      data: inflowData,
    },
  ]"
  format="currency"
  :format-options="{ currency: '$' }"
  :show-dataset-toggle="true"
  :show-pagination="true"
  @select="(key, values) => console.log(key, values)"
/>

<!-- Highlight override: add highlight to any data point to force its bar colour -->
:data="[
  { key: 'q1', label: 'Q1', values: { val: 420 } },
  { key: 'q2', label: 'Q2', values: { val: 85 }, highlight: 'red' },
]"` }}</code></pre>
          </div>

        </div>
      </template>

      <!-- ── Bar — Multi-Series ── -->
      <template #bar-multi>
        <div class="space-y-4 pt-4">

          <!-- Config panel -->
          <UCard variant="soft" :ui="{ root: 'rounded-xl bg-(--ui-bg-muted)', body: 'p-4' }">
            <div class="flex flex-wrap items-center gap-x-6 gap-y-4">

              <!-- Switches -->
              <div class="flex flex-wrap items-center gap-x-5 gap-y-3">
                <label class="flex items-center gap-2 cursor-pointer select-none">
                  <AppSwitch v-model="barMultiConfig.showTitle" size="sm" />
                  <span class="text-xs text-toned">Title</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer select-none">
                  <AppSwitch v-model="barMultiConfig.showPagination" size="sm" />
                  <span class="text-xs text-toned">Pagination</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer select-none">
                  <AppSwitch v-model="barMultiConfig.showDatasetToggle" size="sm" />
                  <span class="text-xs text-toned">Dataset toggle</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer select-none">
                  <AppSwitch v-model="barMultiConfig.showLegend" size="sm" />
                  <span class="text-xs text-toned">Legend</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer select-none">
                  <AppSwitch v-model="barMultiConfig.loading" size="sm" />
                  <span class="text-xs text-toned">Loading</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer select-none">
                  <AppSwitch v-model="barMultiConfig.empty" size="sm" />
                  <span class="text-xs text-toned">Empty</span>
                </label>
              </div>

              <div class="w-px h-8 bg-muted hidden sm:block" />

              <!-- Bar height -->
              <div class="space-y-1.5 min-w-36">
                <div class="flex items-center justify-between gap-4">
                  <p class="text-xs text-muted">Bar Height</p>
                  <span class="text-xs font-mono text-toned">{{ barMultiConfig.maxBarHeight }}px</span>
                </div>
                <input v-model.number="barMultiConfig.maxBarHeight" type="range" min="80" max="300" step="10" class="w-full accent-royalblue-500" />
              </div>

              <div class="w-px h-8 bg-muted hidden sm:block" />

              <!-- Breakpoint -->
              <div class="space-y-1.5">
                <div class="flex items-center justify-between gap-4">
                  <p class="text-xs text-muted">Breakpoint</p>
                  <span class="text-xs font-mono text-toned">{{ barMultiConfig.window }} bars</span>
                </div>
                <div class="flex items-center gap-1">
                  <div class="inline-flex items-center gap-1 bg-elevated rounded-full p-1">
                    <button
                      v-for="bp in breakpointPresets"
                      :key="bp.label"
                      type="button"
                      class="flex items-center gap-1.5 text-xs py-1 px-2.5 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royalblue-300 whitespace-nowrap"
                      :class="barMultiConfig.window === bp.window ? 'bg-white dark:bg-white/10 text-royalblue-500 font-semibold shadow-sm' : 'text-toned hover:text-default'"
                      @click="barMultiConfig.window = bp.window"
                    >
                      <span :class="[bp.icon, 'size-3 shrink-0']" />
                      {{ bp.label }}
                    </button>
                  </div>
                  <input v-model.number="barMultiConfig.window" type="range" min="3" max="12" step="1" class="w-24 accent-royalblue-500" />
                </div>
              </div>

            </div>
          </UCard>

          <!-- Preview -->
          <div
            class="transition-all duration-500 ease-in-out"
            :style="barMultiBreakpoint?.maxWidth ? `max-width: ${barMultiBreakpoint.maxWidth}` : ''"
          >
            <div v-if="barMultiBreakpoint" class="flex items-center gap-1.5 mb-2">
              <span :class="[barMultiBreakpoint.icon, 'size-3 text-muted']" />
              <span class="text-xs text-muted">{{ barMultiBreakpoint.label }}<span v-if="barMultiBreakpoint.maxWidth"> · {{ barMultiBreakpoint.maxWidth }}</span></span>
            </div>
            <UCard variant="soft" :ui="{ root: 'rounded-xl bg-(--ui-bg-muted)', body: 'p-4' }">
              <AppChart
                type="bar"
                :title="barMultiConfig.showTitle ? 'Reward Points' : undefined"
                :datasets="barMultiConfig.empty ? [] : rewardDatasets"
                :show-dataset-toggle="barMultiConfig.showDatasetToggle"
                :show-pagination="barMultiConfig.showPagination"
                :show-legend="barMultiConfig.showLegend"
                :loading="barMultiConfig.loading"
                :max-bar-height="barMultiConfig.maxBarHeight"
                :window="barMultiConfig.window"
                format="number"
              />
            </UCard>
          </div>

          <!-- Usage -->
          <div class="space-y-2">
            <p class="text-xs font-mono text-toned uppercase tracking-wider">Usage</p>
            <pre class="text-xs bg-elevated rounded-lg p-4 overflow-auto leading-relaxed"><code>{{ `<AppChart
  type="bar"
  title="Reward Points"
  :datasets="[
    {
      id: '2025',
      label: '2025',
      total: '12,563',
      series: [
        { id: 'business', label: 'Business Rewards', color: 'royalblue' },
        { id: 'velocity', label: 'Velocity',          color: 'darkblue'  },
        { id: 'frequent', label: 'Frequent Flyer' },
      ],
      data: rewardData2025,
    },
    {
      id: '2024',
      label: '2024',
      total: '8,421',
      series: [
        { id: 'business', label: 'Business Rewards', color: 'royalblue' },
        { id: 'velocity', label: 'Velocity',          color: 'darkblue'  },
        { id: 'frequent', label: 'Frequent Flyer' },
      ],
      data: rewardData2024,
    },
  ]"
  format="number"
  :show-dataset-toggle="true"
  :show-pagination="true"
  :show-legend="true"
/>` }}</code></pre>
          </div>

        </div>
      </template>

      <!-- ── Stacked Bar ── -->
      <template #stacked-bar>
        <div class="space-y-4 pt-4">

          <!-- Config panel -->
          <UCard variant="soft" :ui="{ root: 'rounded-xl bg-(--ui-bg-muted)', body: 'p-4' }">
            <div class="flex flex-wrap items-center gap-x-5 gap-y-3">
              <label class="flex items-center gap-2 cursor-pointer select-none">
                <AppSwitch v-model="stackedConfig.showTitle" size="sm" />
                <span class="text-xs text-toned">Title</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer select-none">
                <AppSwitch v-model="stackedConfig.loading" size="sm" />
                <span class="text-xs text-toned">Loading</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer select-none">
                <AppSwitch v-model="stackedConfig.empty" size="sm" />
                <span class="text-xs text-toned">Empty</span>
              </label>
            </div>
          </UCard>

          <!-- Preview -->
          <div class="space-y-4">
            <UCard variant="soft" :ui="{ root: 'rounded-xl bg-(--ui-bg-muted)', body: 'p-4' }">
              <AppChart
                type="stacked-bar"
                :title="stackedConfig.showTitle ? 'This Month' : undefined"
                :series="paymentSeries"
                :data="stackedConfig.empty ? [] : paymentDataMonth"
                :loading="stackedConfig.loading"
                format="percent"
              >
                <template #kpi>$2,910.31</template>
                <template #kpi-label>this month</template>
              </AppChart>
            </UCard>
            <UCard variant="soft" :ui="{ root: 'rounded-xl bg-(--ui-bg-muted)', body: 'p-4' }">
              <AppChart
                type="stacked-bar"
                :title="stackedConfig.showTitle ? 'This Year' : undefined"
                :series="paymentSeries"
                :data="stackedConfig.empty ? [] : paymentDataYear"
                :loading="stackedConfig.loading"
                format="percent"
              >
                <template #kpi>$45,742.31</template>
                <template #kpi-label>this year</template>
              </AppChart>
            </UCard>
          </div>

          <!-- Usage -->
          <div class="space-y-2">
            <p class="text-xs font-mono text-toned uppercase tracking-wider">Usage</p>
            <pre class="text-xs bg-elevated rounded-lg p-4 overflow-auto leading-relaxed"><code>{{ `<AppChart
  type="stacked-bar"
  :series="[
    { id: 'amex',         label: 'Amex',         color: 'royalblue' },
    { id: 'mastercard',   label: 'Mastercard',   color: 'darkblue'  },
    { id: 'bankTransfer', label: 'Bank Transfer' },
  ]"
  :data="[{
    key: 'this-month',
    label: '',
    values: { amex: 25, mastercard: 12, bankTransfer: 63 }
  }]"
  format="percent"
>
  <template #kpi>$2,910.31</template>
  <template #kpi-label>this month</template>
</AppChart>` }}</code></pre>
          </div>

        </div>
      </template>

      <!-- ── Props Reference ── -->
      <template #props>
        <div class="pt-4">
          <UCard :ui="{ body: 'p-0' }">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-muted">
                  <th class="text-left px-4 py-3 font-semibold text-default">Prop</th>
                  <th class="text-left px-4 py-3 font-semibold text-default">Type</th>
                  <th class="text-left px-4 py-3 font-semibold text-default">Default</th>
                  <th class="text-left px-4 py-3 font-semibold text-default">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in propsRows" :key="row.prop" class="border-b border-muted last:border-0">
                  <td class="px-4 py-3 font-mono text-xs text-royalblue-500">{{ row.prop }}</td>
                  <td class="px-4 py-3 font-mono text-xs text-toned">{{ row.type }}</td>
                  <td class="px-4 py-3 font-mono text-xs text-toned">{{ row.def }}</td>
                  <td class="px-4 py-3 text-xs text-toned">{{ row.desc }}</td>
                </tr>
              </tbody>
            </table>
          </UCard>
        </div>
      </template>

    </UTabs>

    <!-- ─── Components & Composables ─────────────────────────────────────── -->
    <div class="space-y-6">
      <div class="space-y-3">
        <h2 class="text-lg font-semibold text-default">Components</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <UCard v-for="c in components" :key="c.name" class="space-y-1">
            <p class="font-semibold text-sm text-default">{{ c.name }}</p>
            <p class="text-xs font-mono text-toned">{{ c.file }}</p>
            <p class="text-xs text-toned">{{ c.desc }}</p>
          </UCard>
        </div>
      </div>

      <div class="space-y-3">
        <h2 class="text-lg font-semibold text-default">Composables</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <UCard v-for="c in composables" :key="c.name" class="space-y-1">
            <p class="font-semibold text-sm text-default">{{ c.name }}</p>
            <p class="text-xs font-mono text-toned">{{ c.file }}</p>
            <p class="text-xs text-toned">{{ c.desc }}</p>
          </UCard>
        </div>
      </div>
    </div>

    <!-- ─── Connecting Real Data ──────────────────────────────────────────── -->
    <div class="space-y-4">
      <div class="space-y-1">
        <h2 class="text-lg font-semibold text-default">Connecting Real Data</h2>
        <p class="text-sm text-toned">
          Use <code class="text-xs font-mono bg-elevated px-1 py-0.5 rounded">useChartData</code> to connect
          any API (Supabase, HubSpot, REST) without writing boilerplate. The composable handles
          loading state, errors, and data mapping automatically.
        </p>
      </div>

      <pre class="text-xs bg-elevated rounded-lg p-4 overflow-auto leading-relaxed"><code>{{ `// Supabase example
import { useChartData } from '~/composables/useChartData'
import { useSupabaseClient } from '#imports'

const supabase = useSupabaseClient()

const { data, series, isLoading, refresh } = useChartData({
  source: async () => {
    const { data } = await supabase
      .from('broker_applications')
      .select('period_key, period_label, submitted_count')
      .order('period_key')
    return data ?? []
  },
  keyField: 'period_key',
  labelField: 'period_label',
  series: [
    { id: 'submitted', label: 'Submitted Applications', valueField: 'submitted_count', color: 'royalblue' }
  ]
})

// Then in template:
// <AppChart type="bar" :series="series" :data="data" :loading="isLoading" format="number" />` }}</code></pre>

      <pre class="text-xs bg-elevated rounded-lg p-4 overflow-auto leading-relaxed"><code>{{ `// $fetch / REST example
const { data, series, isLoading } = useChartData({
  source: () => $fetch('/api/payments/monthly'),
  keyField: 'periodKey',
  labelField: 'periodLabel',
  series: [
    { id: 'amex',         label: 'Amex',         valueField: 'amexPct'         },
    { id: 'mastercard',   label: 'Mastercard',   valueField: 'mastercardPct'   },
    { id: 'bankTransfer', label: 'Bank Transfer', valueField: 'bankTransferPct' },
  ]
})` }}</code></pre>
    </div>

  </div>
</template>
