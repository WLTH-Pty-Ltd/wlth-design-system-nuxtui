<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const toItems = (arr: string[]) => arr.map(v => ({ label: v, value: v }))
const sizeItems = toItems(['xs', 'sm', 'md', 'lg', 'xl'])

const config = reactive({
  loading: false,
  showNumbers: false,
  size: 'md',
  totalPages: 6,
})

const page = ref(1)

watch(() => config.totalPages, () => { page.value = 1 })

const propsRows = [
  { prop: 'page / v-model:page', type: 'number', def: '1', desc: 'The current page number. Use v-model:page for two-way binding.' },
  { prop: 'total', type: 'number', def: '—', desc: 'Required. Total number of pages.' },
  { prop: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", def: "'md'", desc: 'Controls dot/number size and spacing.' },
  { prop: 'show-numbers', type: 'boolean', def: 'false', desc: 'Switches from dot indicators to numbered buttons. Use when users need to jump to a specific page.' },
  { prop: 'loading', type: 'boolean', def: 'false', desc: 'Dims the control and disables interaction while page data is loading.' },
]

const emitsRows = [
  { emit: 'update:page', payload: 'number', desc: 'Emitted when the user navigates to a different page. Also emitted when dots are clicked directly.' },
]

const codeSnippet = computed(() => {
  const props: string[] = ['  v-model:page="page"', `  :total="${config.totalPages}"`]
  if (config.size !== 'md')    props.push(`  size="${config.size}"`)
  if (config.showNumbers)      props.push('  show-numbers')
  if (config.loading)          props.push('  loading')
  return `<AppPagination\n${props.join('\n')}\n/>`
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-10 py-12 space-y-10">

    <div class="space-y-1">
      <h1 class="text-2xl font-semibold text-default">AppPagination</h1>
      <p class="text-sm text-toned">
        WLTH standard pagination control. Dot indicators by default — the active dot marks the current page.
        Enable numbered mode for large datasets where users need to jump to a specific page.
      </p>
    </div>

    <!-- Config panel -->
    <UCard variant="soft" :ui="{ root: 'rounded-xl bg-muted', body: 'p-4' }">
      <div class="flex flex-wrap items-center gap-x-6 gap-y-4">
        <div class="flex flex-wrap items-center gap-x-5 gap-y-3">
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <AppSwitch v-model="config.loading" size="sm" />
            <span class="text-xs text-toned">Loading</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <AppSwitch v-model="config.showNumbers" size="sm" />
            <span class="text-xs text-toned">Numbers</span>
          </label>
        </div>
        <div class="w-px h-8 bg-muted hidden sm:block" />
        <div class="flex items-center gap-2">
          <span class="text-xs text-muted">Size</span>
          <USelect v-model="config.size" :items="sizeItems" value-key="value" size="xs" class="w-20" />
        </div>
        <div class="w-px h-8 bg-muted hidden sm:block" />
        <div class="space-y-1.5 min-w-36">
          <div class="flex items-center justify-between gap-4">
            <p class="text-xs text-muted">Pages</p>
            <span class="text-xs font-mono text-toned">{{ config.totalPages }}</span>
          </div>
          <input
            v-model.number="config.totalPages"
            type="range"
            min="2"
            max="20"
            step="1"
            class="w-full accent-royalblue-500"
          />
        </div>
      </div>
    </UCard>

    <!-- Preview -->
    <div class="rounded-xl border border-muted overflow-hidden">
      <div class="p-6 bg-muted">
        <div class="max-w-sm">
          <AppPagination
            v-model:page="page"
            :total="config.totalPages"
            :size="config.size"
            :loading="config.loading"
            :show-numbers="config.showNumbers"
          />
        </div>
      </div>
      <div class="border-t border-muted px-5 py-3 bg-default">
        <p class="text-xs text-toned">
          Page <span class="font-mono text-default">{{ page }}</span> of <span class="font-mono text-default">{{ config.totalPages }}</span>
        </p>
      </div>
    </div>

    <AppCodeBlock :code="codeSnippet" />

    <!-- Props -->
    <div class="space-y-3">
      <h2 class="text-base font-semibold text-default">Props</h2>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="grid grid-cols-[1.5fr_1fr_1fr_2fr] text-[11px] font-semibold uppercase tracking-wider text-dimmed bg-muted px-4 py-2.5 border-b border-muted">
          <span>Prop</span><span>Type</span><span>Default</span><span>Description</span>
        </div>
        <div
          v-for="(row, i) in propsRows"
          :key="row.prop"
          class="grid grid-cols-[1.5fr_1fr_1fr_2fr] gap-x-3 items-start px-4 py-3 text-xs"
          :class="i !== 0 ? 'border-t border-muted' : ''"
        >
          <code class="font-mono text-royalblue-500">{{ row.prop }}</code>
          <code class="font-mono text-toned">{{ row.type }}</code>
          <code class="font-mono text-toned">{{ row.def }}</code>
          <span class="text-toned leading-relaxed">{{ row.desc }}</span>
        </div>
      </div>
    </div>

    <!-- Emits -->
    <div class="space-y-3">
      <h2 class="text-base font-semibold text-default">Events</h2>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="grid grid-cols-[1fr_1fr_2fr] text-[11px] font-semibold uppercase tracking-wider text-dimmed bg-muted px-4 py-2.5 border-b border-muted">
          <span>Event</span><span>Payload</span><span>Description</span>
        </div>
        <div
          v-for="(row, i) in emitsRows"
          :key="row.emit"
          class="grid grid-cols-[1fr_1fr_2fr] gap-x-3 items-start px-4 py-3 text-xs"
          :class="i !== 0 ? 'border-t border-muted' : ''"
        >
          <code class="font-mono text-royalblue-500">{{ row.emit }}</code>
          <code class="font-mono text-toned">{{ row.payload }}</code>
          <span class="text-toned leading-relaxed">{{ row.desc }}</span>
        </div>
      </div>
    </div>

    <!-- When to use dots vs numbers -->
    <div class="space-y-3">
      <h2 class="text-base font-semibold text-default">Dots vs numbers</h2>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div
          v-for="(row, i) in [
            { mode: 'Dots (default)', when: 'Use when the total page count is small (2–8) and the user navigates sequentially — charts, image galleries, card carousels.' },
            { mode: 'Numbers (show-numbers)', when: 'Use when the page count is large or users need to jump to a specific page — data tables, search results, long lists.' },
          ]"
          :key="row.mode"
          class="flex items-start gap-4 px-5 py-4 text-xs"
          :class="i !== 0 ? 'border-t border-muted' : ''"
        >
          <code class="font-mono text-royalblue-500 shrink-0 w-36">{{ row.mode }}</code>
          <span class="text-toned leading-relaxed">{{ row.when }}</span>
        </div>
      </div>
    </div>

    <!-- Table integration example -->
    <div class="space-y-3">
      <h2 class="text-base font-semibold text-default">Using with a table</h2>
      <p class="text-sm text-toned">The most common use case is paginating a <code class="text-xs font-mono bg-elevated px-1 py-0.5 rounded">UTable</code>. Slice your data client-side, or pass the page number to your API call.</p>
      <pre class="text-xs font-mono bg-elevated rounded-lg px-4 py-3 overflow-x-auto leading-relaxed text-default"><code>const PAGE_SIZE = 10
const page = ref(1)
const allRows = ref([/* ... your data */])

const totalPages = computed(() => Math.ceil(allRows.value.length / PAGE_SIZE))
const pageRows   = computed(() =>
  allRows.value.slice((page.value - 1) * PAGE_SIZE, page.value * PAGE_SIZE)
)</code></pre>
      <pre class="text-xs font-mono bg-elevated rounded-lg px-4 py-3 overflow-x-auto leading-relaxed text-default"><code>&lt;UTable :rows="pageRows" :columns="columns" /&gt;
&lt;AppPagination v-model:page="page" :total="totalPages" show-numbers /&gt;</code></pre>
      <p class="text-xs text-toned">For server-side pagination, watch <code class="font-mono bg-elevated px-1 py-0.5 rounded">page</code> and re-fetch on change:</p>
      <pre class="text-xs font-mono bg-elevated rounded-lg px-4 py-3 overflow-x-auto leading-relaxed text-default"><code>watch(page, async (newPage) => {
  rows.value = await $fetch('/api/clients', { query: { page: newPage, limit: PAGE_SIZE } })
})</code></pre>
    </div>

  </div>
</template>
