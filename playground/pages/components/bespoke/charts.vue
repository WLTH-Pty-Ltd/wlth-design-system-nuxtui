<script setup lang="ts">
definePageMeta({ layout: 'docs' })

// ─── Mock data — no API needed ────────────────────────────────────────────────

// Bar chart: broker submitted applications (18 months of history)
const applicationSeries = [
  { id: 'submitted', label: 'Submitted Applications', color: 'royalblue' }
]

const applicationData = [
  { key: 'aug-24', label: 'Aug 24', values: { submitted: 412000 } },
  { key: 'sep-24', label: 'Sept 24', values: { submitted: 661500 } },
  { key: 'oct-24', label: 'Oct 24', values: { submitted: 0 } },
  { key: 'nov-24', label: 'Nov 24', values: { submitted: 0 } },
  { key: 'dec-24', label: 'Dec 24', values: { submitted: 89000 } },
  { key: 'jan-25', label: 'Jan 25', values: { submitted: 210000 } },
  { key: 'feb-25', label: 'Feb 25', values: { submitted: 540000 } },
  { key: 'mar-25', label: 'Mar 25', values: { submitted: 330000 } },
  { key: 'apr-25', label: 'Apr 25', values: { submitted: 175000 } },
  { key: 'may-25', label: 'May 25', values: { submitted: 620000 } },
  { key: 'jun-25', label: 'Jun 25', values: { submitted: 0 } },
  { key: 'jul-25', label: 'Jul 25', values: { submitted: 440000 } },
  { key: 'aug-25', label: 'Aug 25', values: { submitted: 890000 } },
  { key: 'sep-25', label: 'Sept 25', values: { submitted: 661500 } },
  { key: 'oct-25', label: 'Oct 25', values: { submitted: 0 } },
  { key: 'nov-25', label: 'Nov 25', values: { submitted: 0 } },
  { key: 'dec-25', label: 'Dec 25', values: { submitted: 2360000 } },
  { key: 'jan-26', label: 'Jan 26', values: { submitted: 3970000 } },
]

// Bar chart: rewards — multi-series (business, velocity, frequent flyer)
const rewardSeries = [
  { id: 'business',  label: 'Business Rewards', color: 'royalblue' },
  { id: 'velocity',  label: 'Velocity',          color: 'darkblue'  },
  { id: 'frequent',  label: 'Frequent Flyer'                         },
]

const rewardData = [
  { key: 'sept-25', label: 'Sept 25', values: { business: 128,  velocity: 60,   frequent: 126  } },
  { key: 'oct-25',  label: 'Oct 25',  values: { business: 340,  velocity: 120,  frequent: 280  } },
  { key: 'nov-25',  label: 'Nov 25',  values: { business: 210,  velocity: 90,   frequent: 190  } },
  { key: 'dec-25',  label: 'Dec 25',  values: { business: 505,  velocity: 200,  frequent: 350  } },
  { key: 'jan-26',  label: 'Jan 26',  values: { business: 4280, velocity: 3452, frequent: 5134 } },
]

// Stacked bar: payments — this month
const paymentSeriesMonth = [
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

// ─── Interaction demo ─────────────────────────────────────────────────────────

const lastSelected = ref<{ key: string; values: Record<string, number> } | null>(null)

function onSelect(key: string, values: Record<string, number>) {
  lastSelected.value = { key, values }
}

// ─── Docs metadata ────────────────────────────────────────────────────────────

const components = [
  {
    name: 'AppChart',
    file: 'app/components/AppChart.vue',
    desc: 'Entry-point wrapper component. Routes to the correct renderer based on the type prop. Provides KPI slot layout above the chart.'
  },
  {
    name: 'AppChartBar',
    file: 'app/components/chart/AppChartBar.vue',
    desc: 'Vertical pill bar renderer. Handles scaling, active-bar highlight, responsive window sizing, pagination, hover tooltips, and multi-series grouped bars.'
  },
  {
    name: 'AppChartStackedBar',
    file: 'app/components/chart/AppChartStackedBar.vue',
    desc: 'Horizontal segmented bar renderer. Each series becomes a percentage-width segment. Includes hover tooltips, value labels below each segment, and a legend.'
  },
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
  <div class="max-w-7xl mx-auto px-10 py-12 space-y-14">

    <!-- ─── 1. Overview ──────────────────────────────────────────────────── -->
    <div class="space-y-3">
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-default">AppChart</h1>
        <p class="text-sm text-toned">
          Universal chart component for data visualisation across all WLTH products.
          Renders pill-shaped bar charts, horizontal stacked bars, and more — all styled
          with WLTH design tokens and responsive by default. Powered by CSS and Vue; no
          external charting library required for bar types.
        </p>
      </div>
    </div>

    <!-- ─── 2. Pill Bar Chart — single series ───────────────────────────── -->
    <div class="space-y-4">
      <div class="space-y-1">
        <h2 class="text-lg font-semibold text-default">Bar Chart — Single Series</h2>
        <p class="text-sm text-toned">
          Vertical pill bars with pagination. The last data point is highlighted in royalblue by default.
          Clicking a bar emits a <code class="text-xs font-mono bg-elevated px-1 py-0.5 rounded">select</code> event.
          The window auto-reduces from 5 to 3 on mobile.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Live example -->
        <UCard>
          <AppChart
            type="bar"
            :series="applicationSeries"
            :data="applicationData"
            format="currency"
            :format-options="{ currency: '$' }"
            :max-bar-height="180"
            @select="onSelect"
          >
            <template #chip>
              <UBadge color="primary" variant="solid" class="rounded-full text-xs">
                Submitted Applications
              </UBadge>
            </template>
          </AppChart>
        </UCard>

        <!-- Code -->
        <div class="space-y-2">
          <p class="text-xs font-mono text-toned uppercase tracking-wider">Usage</p>
          <pre class="text-xs bg-elevated rounded-lg p-4 overflow-auto leading-relaxed"><code>{{ `<AppChart
  type="bar"
  :series="[{ id: 'submitted', label: 'Applications', color: 'royalblue' }]"
  :data="applicationData"
  format="currency"
  :format-options="{ currency: '$' }"
  @select="(key, values) => console.log(key, values)"
>
  <template #chip>
    <UBadge>Submitted Applications</UBadge>
  </template>
</AppChart>` }}</code></pre>

          <!-- Select feedback -->
          <div v-if="lastSelected" class="text-xs text-toned bg-elevated rounded-lg px-3 py-2">
            Selected: <span class="font-mono text-royalblue-600">{{ lastSelected.key }}</span>
            — {{ JSON.stringify(lastSelected.values) }}
          </div>
        </div>
      </div>
    </div>

    <!-- ─── 3. Bar Chart — multi-series ─────────────────────────────────── -->
    <div class="space-y-4">
      <div class="space-y-1">
        <h2 class="text-lg font-semibold text-default">Bar Chart — Multi-Series</h2>
        <p class="text-sm text-toned">
          When multiple series are provided, each column renders a group of narrow pills side by side.
          A legend appears below the chart. The active column highlights all its bars.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UCard>
          <AppChart
            type="bar"
            :series="rewardSeries"
            :data="rewardData"
            format="number"
            :max-bar-height="160"
          >
            <template #chip>
              <UBadge color="neutral" variant="subtle" class="rounded-full text-xs">Your Rewards</UBadge>
            </template>
            <template #kpi>12,563</template>
            <template #kpi-label>this year</template>
          </AppChart>
        </UCard>

        <div class="space-y-2">
          <p class="text-xs font-mono text-toned uppercase tracking-wider">Usage</p>
          <pre class="text-xs bg-elevated rounded-lg p-4 overflow-auto leading-relaxed"><code>{{ `<AppChart
  type="bar"
  :series="[
    { id: 'business', label: 'Business Rewards', color: 'royalblue' },
    { id: 'velocity', label: 'Velocity',          color: 'darkblue'  },
    { id: 'frequent', label: 'Frequent Flyer' },
  ]"
  :data="rewardData"
  format="number"
>
  <template #kpi>12,563</template>
  <template #kpi-label>this year</template>
</AppChart>` }}</code></pre>
        </div>
      </div>
    </div>

    <!-- ─── 4. Stacked Bar Chart ──────────────────────────────────────────── -->
    <div class="space-y-4">
      <div class="space-y-1">
        <h2 class="text-lg font-semibold text-default">Stacked Bar — Payments</h2>
        <p class="text-sm text-toned">
          Horizontal segmented bar. Values in each data point are percentages (summing to 100).
          Hover each segment for the full label. Use multiple data points for stacked time rows.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="space-y-4">
          <!-- This month -->
          <UCard>
            <AppChart
              type="stacked-bar"
              :series="paymentSeriesMonth"
              :data="paymentDataMonth"
              format="percent"
            >
              <template #kpi>$2,910.31</template>
              <template #kpi-label>this month</template>
            </AppChart>
          </UCard>

          <!-- This year -->
          <UCard>
            <AppChart
              type="stacked-bar"
              :series="paymentSeriesMonth"
              :data="paymentDataYear"
              format="percent"
            >
              <template #kpi>$45,742.31</template>
              <template #kpi-label>this year</template>
            </AppChart>
          </UCard>
        </div>

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
    </div>

    <!-- ─── 5. Real data with useChartData ────────────────────────────────── -->
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

    <!-- ─── 6. States ─────────────────────────────────────────────────────── -->
    <div class="space-y-4">
      <div class="space-y-1">
        <h2 class="text-lg font-semibold text-default">States</h2>
        <p class="text-sm text-toned">Loading skeleton and empty state render automatically.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="space-y-2">
          <p class="text-xs text-toned font-medium">Loading</p>
          <UCard>
            <AppChart
              type="bar"
              :series="applicationSeries"
              :data="[]"
              loading
            />
          </UCard>
        </div>
        <div class="space-y-2">
          <p class="text-xs text-toned font-medium">Empty</p>
          <UCard>
            <AppChart
              type="bar"
              :series="applicationSeries"
              :data="[]"
            />
          </UCard>
        </div>
        <div class="space-y-2">
          <p class="text-xs text-toned font-medium">Empty (stacked-bar)</p>
          <UCard>
            <AppChart
              type="stacked-bar"
              :series="paymentSeriesMonth"
              :data="[]"
            />
          </UCard>
        </div>
      </div>
    </div>

    <!-- ─── 7. Highlight override ─────────────────────────────────────────── -->
    <div class="space-y-4">
      <div class="space-y-1">
        <h2 class="text-lg font-semibold text-default">Highlight Override</h2>
        <p class="text-sm text-toned">
          Pass <code class="text-xs font-mono bg-elevated px-1 py-0.5 rounded">highlight</code> on
          a data point to override its bar colour — useful for flagging min/max/warning conditions
          based on your own business logic.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UCard>
          <AppChart
            type="bar"
            :series="[{ id: 'val', label: 'Value', color: 'royalblue' }]"
            :data="[
              { key: 'q1', label: 'Q1', values: { val: 420 } },
              { key: 'q2', label: 'Q2', values: { val: 85 }, highlight: 'red' },
              { key: 'q3', label: 'Q3', values: { val: 610 } },
              { key: 'q4', label: 'Q4', values: { val: 990 } },
            ]"
            format="number"
            :max-bar-height="150"
          />
        </UCard>
        <div class="space-y-2">
          <p class="text-xs font-mono text-toned uppercase tracking-wider">Usage</p>
          <pre class="text-xs bg-elevated rounded-lg p-4 overflow-auto leading-relaxed"><code>{{ `// Add highlight to any data point to override its bar colour.
// The consuming app decides when to flag a bar (min, max, threshold, etc.)
:data="[
  { key: 'q1', label: 'Q1', values: { val: 420 } },
  { key: 'q2', label: 'Q2', values: { val: 85 }, highlight: 'red' },
  { key: 'q3', label: 'Q3', values: { val: 610 } },
  { key: 'q4', label: 'Q4', values: { val: 990 } },
]"` }}</code></pre>
        </div>
      </div>
    </div>

    <!-- ─── 8. Props reference ─────────────────────────────────────────────── -->
    <div class="space-y-4">
      <h2 class="text-lg font-semibold text-default">Props Reference</h2>

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
            <tr v-for="row in [
              { prop: 'type', type: `'bar' | 'stacked-bar'`, def: '—', desc: 'Required. Chart type to render.' },
              { prop: 'series', type: 'AppChartSeries[]', def: '—', desc: 'Required. Series definitions with id, label, optional color.' },
              { prop: 'data', type: 'AppChartDataPoint[]', def: '—', desc: 'Required. Data points — key, label, values map, optional highlight.' },
              { prop: 'format', type: `'currency' | 'number' | 'percent' | fn`, def: `'number'`, desc: 'Value label format.' },
              { prop: 'formatOptions', type: 'AppChartFormatOptions', def: '{}', desc: 'Options for format (e.g. { currency: \'£\' }).' },
              { prop: 'window', type: 'number', def: '5 (3 mobile)', desc: 'Bar chart: bars visible at once.' },
              { prop: 'activeKey', type: 'string', def: 'last key', desc: 'Bar chart: override the highlighted bar.' },
              { prop: 'maxBarHeight', type: 'number', def: '200', desc: 'Bar chart: max bar height in px.' },
              { prop: 'loading', type: 'boolean', def: 'false', desc: 'Show loading skeleton.' },
            ]" :key="row.prop" class="border-b border-muted last:border-0">
              <td class="px-4 py-3 font-mono text-xs text-royalblue-600">{{ row.prop }}</td>
              <td class="px-4 py-3 font-mono text-xs text-toned">{{ row.type }}</td>
              <td class="px-4 py-3 font-mono text-xs text-toned">{{ row.def }}</td>
              <td class="px-4 py-3 text-xs text-toned">{{ row.desc }}</td>
            </tr>
          </tbody>
        </table>
      </UCard>
    </div>

    <!-- ─── 9. Sub-components & composables ───────────────────────────────── -->
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

  </div>
</template>
