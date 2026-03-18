<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

definePageMeta({ layout: 'docs' })

const UCheckbox = resolveComponent('UCheckbox')
const UBadge = resolveComponent('UBadge')

const toItems = (arr: string[]) => arr.map(v => ({ label: v, value: v }))

// ─── Data ─────────────────────────────────────────────────────────────────────

type RowStatus = 'Active' | 'Inactive' | 'Pending'

interface ClientRow {
  id: number
  client: string
  portfolio: string
  aum: string
  status: RowStatus
  updated: string
}

const statusColor: Record<RowStatus, 'success' | 'warning' | 'neutral'> = {
  Active: 'success',
  Pending: 'warning',
  Inactive: 'neutral',
}

const allData: ClientRow[] = [
  { id: 1,  client: 'Harrington Family Trust',   portfolio: 'Growth',       aum: '$4,820,000',  status: 'Active',   updated: '12 Mar 2026' },
  { id: 2,  client: 'Meridian Capital Group',     portfolio: 'Balanced',     aum: '$12,350,000', status: 'Active',   updated: '11 Mar 2026' },
  { id: 3,  client: 'Okafor Superannuation',      portfolio: 'Conservative', aum: '$980,000',    status: 'Pending',  updated: '10 Mar 2026' },
  { id: 4,  client: 'Whitmore & Sons LLC',        portfolio: 'High Growth',  aum: '$7,100,000',  status: 'Active',   updated: '9 Mar 2026'  },
  { id: 5,  client: 'Nguyen Family Office',       portfolio: 'Income',       aum: '$2,250,000',  status: 'Inactive', updated: '7 Mar 2026'  },
  { id: 6,  client: 'Stratford Ventures',         portfolio: 'Growth',       aum: '$5,640,000',  status: 'Active',   updated: '6 Mar 2026'  },
  { id: 7,  client: 'Patel Wealth Partners',      portfolio: 'Balanced',     aum: '$3,390,000',  status: 'Pending',  updated: '4 Mar 2026'  },
  { id: 8,  client: 'Elmwood Foundation',         portfolio: 'Conservative', aum: '$1,775,000',  status: 'Active',   updated: '1 Mar 2026'  },
  { id: 9,  client: 'Calloway Retirement Fund',   portfolio: 'Income',       aum: '$8,920,000',  status: 'Active',   updated: '28 Feb 2026' },
  { id: 10, client: 'Thornton Asset Mgmt',        portfolio: 'High Growth',  aum: '$6,480,000',  status: 'Inactive', updated: '25 Feb 2026' },
  { id: 11, client: 'Blackwell Private Equity',   portfolio: 'Growth',       aum: '$14,100,000', status: 'Active',   updated: '22 Feb 2026' },
  { id: 12, client: 'Sandoval Family Trust',      portfolio: 'Balanced',     aum: '$2,960,000',  status: 'Pending',  updated: '18 Feb 2026' },
  { id: 13, client: 'Forsythe Capital Partners',  portfolio: 'Growth',       aum: '$9,150,000',  status: 'Active',   updated: '17 Feb 2026' },
  { id: 14, client: 'Kimura Investment Group',    portfolio: 'Income',       aum: '$3,720,000',  status: 'Active',   updated: '15 Feb 2026' },
  { id: 15, client: 'Beaumont Family Office',     portfolio: 'Conservative', aum: '$1,340,000',  status: 'Pending',  updated: '13 Feb 2026' },
  { id: 16, client: 'Aldridge Superannuation',    portfolio: 'Balanced',     aum: '$5,090,000',  status: 'Active',   updated: '11 Feb 2026' },
  { id: 17, client: 'Pemberton Wealth Mgmt',      portfolio: 'High Growth',  aum: '$11,200,000', status: 'Inactive', updated: '8 Feb 2026'  },
  { id: 18, client: 'Russo Private Equity',       portfolio: 'Growth',       aum: '$7,830,000',  status: 'Active',   updated: '6 Feb 2026'  },
  { id: 19, client: 'Vance Retirement Fund',      portfolio: 'Income',       aum: '$4,410,000',  status: 'Active',   updated: '3 Feb 2026'  },
  { id: 20, client: 'Sterling Asset Mgmt',        portfolio: 'Balanced',     aum: '$6,670,000',  status: 'Pending',  updated: '1 Feb 2026'  },
  { id: 21, client: 'Nakamura Family Trust',      portfolio: 'Conservative', aum: '$2,180,000',  status: 'Active',   updated: '29 Jan 2026' },
  { id: 22, client: 'Holloway Capital Group',     portfolio: 'High Growth',  aum: '$15,400,000', status: 'Active',   updated: '27 Jan 2026' },
  { id: 23, client: 'Donnelly Superannuation',    portfolio: 'Growth',       aum: '$3,560,000',  status: 'Inactive', updated: '24 Jan 2026' },
  { id: 24, client: 'Ashworth Private Clients',   portfolio: 'Balanced',     aum: '$8,290,000',  status: 'Active',   updated: '22 Jan 2026' },
  { id: 25, client: 'Liang Wealth Partners',      portfolio: 'Income',       aum: '$1,920,000',  status: 'Pending',  updated: '20 Jan 2026' },
  { id: 26, client: 'Montrose Family Office',     portfolio: 'Growth',       aum: '$10,750,000', status: 'Active',   updated: '17 Jan 2026' },
  { id: 27, client: 'Cavanaugh Investments',      portfolio: 'Conservative', aum: '$4,030,000',  status: 'Active',   updated: '15 Jan 2026' },
  { id: 28, client: 'Reyes Capital Partners',     portfolio: 'High Growth',  aum: '$6,110,000',  status: 'Inactive', updated: '13 Jan 2026' },
  { id: 29, client: 'Windsor Retirement Trust',   portfolio: 'Balanced',     aum: '$2,740,000',  status: 'Active',   updated: '10 Jan 2026' },
  { id: 30, client: 'Fairfax Asset Group',        portfolio: 'Income',       aum: '$9,380,000',  status: 'Pending',  updated: '8 Jan 2026'  },
  { id: 31, client: 'Osei Family Superannuation', portfolio: 'Growth',       aum: '$5,250,000',  status: 'Active',   updated: '6 Jan 2026'  },
  { id: 32, client: 'Thornbury Wealth Mgmt',      portfolio: 'Conservative', aum: '$3,870,000',  status: 'Active',   updated: '3 Jan 2026'  },
  { id: 33, client: 'Carleton Private Equity',    portfolio: 'High Growth',  aum: '$13,600,000', status: 'Active',   updated: '31 Dec 2025' },
  { id: 34, client: 'Yamamoto Family Office',     portfolio: 'Balanced',     aum: '$7,450,000',  status: 'Pending',  updated: '29 Dec 2025' },
  { id: 35, client: 'Brixton Capital Group',      portfolio: 'Income',       aum: '$2,090,000',  status: 'Inactive', updated: '24 Dec 2025' },
  { id: 36, client: 'Elsworth Retirement Fund',   portfolio: 'Growth',       aum: '$4,660,000',  status: 'Active',   updated: '22 Dec 2025' },
]

// ─── Skeleton helpers ─────────────────────────────────────────────────────────

const skeletonBase = 'bg-lightgrey-400 dark:bg-lightgrey-600 animate-pulse rounded'

const cellWidths: Record<string, string[]> = {
  id:        ['w-5',  'w-4',  'w-5'],
  client:    ['w-40', 'w-32', 'w-44', 'w-36', 'w-28'],
  portfolio: ['w-20', 'w-24', 'w-16'],
  aum:       ['w-20', 'w-24', 'w-18'],
  status:    ['w-14', 'w-16', 'w-14'],
  updated:   ['w-24', 'w-20', 'w-28'],
}

function skeletonHeaderBlock(width = 'w-16') {
  return h('div', { class: `h-3 ${width} ${skeletonBase}` })
}

function skeletonCellBlock(key: string, rowIndex: number) {
  const pool = cellWidths[key] ?? ['w-20']
  const w = pool[rowIndex % pool.length]
  return h('div', { class: `h-3.5 ${w} ${skeletonBase}` })
}

// ─── Columns ──────────────────────────────────────────────────────────────────

const baseColumns: TableColumn<ClientRow>[] = [
  { accessorKey: 'id',        header: '#' },
  { accessorKey: 'client',    header: 'Client' },
  { accessorKey: 'portfolio', header: 'Portfolio' },
  { accessorKey: 'aum',       header: 'AUM' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => h(UBadge, {
      variant: 'subtle',
      color: statusColor[row.getValue('status') as RowStatus],
    }, () => row.getValue('status')),
  },
  { accessorKey: 'updated', header: 'Last Updated' },
]

const selectionColumn: TableColumn<ClientRow> = {
  id: 'select',
  header: ({ table }) => h(UCheckbox, {
    'modelValue': table.getIsSomePageRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected(),
    'onUpdate:modelValue': (value: boolean | 'indeterminate') => table.toggleAllPageRowsSelected(!!value),
    'aria-label': 'Select all',
  }),
  cell: ({ row }) => h(UCheckbox, {
    'modelValue': row.getIsSelected(),
    'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
    'aria-label': 'Select row',
  }),
  enableSorting: false,
  enableHiding: false,
}

// ─── Config ───────────────────────────────────────────────────────────────────

const config = reactive({
  loading: false,
  loadingColor: 'primary',
  loadingAnimation: 'carousel',
  sticky: false,
  stickyPosition: 'header' as 'header' | 'footer' | 'true',
  rowSelection: false,
  showFooter: false,
  showSummary: false,
  showHeader: false,
  showPagination: false,
  paginationShowNumbers: false,
  paginationSize: 'md',
  headerVariant: 'primary' as 'primary' | 'secondary',
  // Toolbar options (active when showHeader is true)
  toolbarSearch: true,
  toolbarTitle: false,
  toolbarTitleText: 'Clients',
  toolbarFilter: false,
  toolbarSort: false,
  toolbarColumns: false,
  toolbarExport: false,
  toolbarSegment: false,
  toolbarSegmentOptions: ['All', 'Individuals', 'Business'],
  activeSegment: 'All',
})

const loadingColorItems    = toItems(['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'])
const loadingAnimItems     = toItems(['carousel', 'carousel-inverse', 'swing', 'elastic'])
const stickyPositionItems  = toItems(['header', 'footer', 'true'])
const paginationSizeItems  = toItems(['xs', 'sm', 'md', 'lg', 'xl'])
const headerVariantItems   = toItems(['primary', 'secondary'])

// ─── Demo filter chips ─────────────────────────────────────────────────────────

const demoFilterPool = [
  { label: 'Status', value: 'Active' },
  { label: 'Status', value: 'Pending' },
  { label: 'Portfolio', value: 'Growth' },
  { label: 'Portfolio', value: 'Income' },
]

const demoActiveFilters = ref<{ label: string; value: string }[]>([])

function addDemoFilter() {
  const unused = demoFilterPool.filter(o =>
    !demoActiveFilters.value.some(f => f.label === o.label && f.value === o.value)
  )
  if (unused.length) demoActiveFilters.value.push(unused[0])
}

function removeFilter(f: { label: string; value: string }) {
  demoActiveFilters.value = demoActiveFilters.value.filter(a => a !== f)
}

function clearFilters() { demoActiveFilters.value = [] }

// th is always the sub-header (bg-elevated); toolbar row carries the variant colour
const tableUI = computed(() => ({ th: '!bg-elevated !text-toned py-3' }))

const toolbarClass = computed(() =>
  config.headerVariant === 'primary' ? 'bg-royalblue-500 text-white' : 'bg-darkblue-800 text-white'
)

// ─── Search & pagination ──────────────────────────────────────────────────────

const searchQuery = ref('')
const currentPage = ref(1)
const PAGE_SIZE = 12

const filteredData = computed(() => {
  let data = allData

  // Segment filter (demo mapping: Individuals → Conservative/Income, Business → Growth/High Growth/Balanced)
  if (config.toolbarSegment && config.activeSegment !== 'All') {
    const individualPortfolios = ['Conservative', 'Income']
    const businessPortfolios   = ['Growth', 'High Growth', 'Balanced']
    if (config.activeSegment === 'Individuals')
      data = data.filter(r => individualPortfolios.includes(r.portfolio))
    else if (config.activeSegment === 'Business')
      data = data.filter(r => businessPortfolios.includes(r.portfolio))
  }

  // Search filter
  if (config.showHeader && config.toolbarSearch && searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    data = data.filter(row =>
      row.client.toLowerCase().includes(q) ||
      row.portfolio.toLowerCase().includes(q) ||
      row.status.toLowerCase().includes(q)
    )
  }

  return data
})

const pageCount = computed(() => Math.max(1, Math.ceil(filteredData.value.length / PAGE_SIZE)))

// Windowed pagination for the footer bar (mirrors AppPagination logic)
const paginationVisiblePages = computed(() => {
  const blockStart = Math.floor((currentPage.value - 1) / 5) * 5 + 1
  const blockEnd = Math.min(blockStart + 4, pageCount.value)
  return Array.from({ length: blockEnd - blockStart + 1 }, (_, i) => blockStart + i)
})
const paginationBlockStart = computed(() => paginationVisiblePages.value[0])
const paginationBlockEnd = computed(() => paginationVisiblePages.value[paginationVisiblePages.value.length - 1])
function paginationJumpBack() { currentPage.value = Math.max(1, paginationBlockStart.value - 5) }
function paginationJumpForward() { currentPage.value = Math.min(pageCount.value, paginationBlockEnd.value + 1) }

const paginationNumBtnClass = computed(() => {
  const map: Record<string, string> = {
    xs: 'w-5 h-5 text-[10px]', sm: 'w-6 h-6 text-xs', md: 'w-7 h-7 text-xs',
    lg: 'w-8 h-8 text-sm', xl: 'w-9 h-9 text-sm',
  }
  return map[config.paginationSize] ?? map['md']
})

const displayData = computed(() => {
  if (!config.showPagination) return filteredData.value
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filteredData.value.slice(start, start + PAGE_SIZE)
})

// Reset page when search changes or pagination is toggled off
// Turning off footer also hides pagination
watch(searchQuery, () => { currentPage.value = 1 })
watch(() => config.showPagination, (val) => { if (!val) currentPage.value = 1 })
watch(() => config.showHeader, (val) => { if (!val) { searchQuery.value = ''; demoActiveFilters.value = [] } })
watch(() => config.toolbarSegment, (val) => { if (!val) config.activeSegment = 'All' })
watch(() => config.activeSegment, () => { currentPage.value = 1 })
watch(() => config.showFooter, (val) => {
  if (val) { config.showSummary = true }
  else { config.showSummary = false; config.showPagination = false }
})

// Footer bar summary — reflects currently filtered/visible data
const footerClientLabel = computed(() => {
  const n = filteredData.value.length
  return `${n} Client${n !== 1 ? 's' : ''}`
})

const footerAUM = computed(() => {
  const total = filteredData.value.reduce((sum, row) => {
    return sum + Number(row.aum.replace(/[$,]/g, ''))
  }, 0)
  return `$${(total / 1_000_000).toFixed(2)}m`
})

// ─── Code snippet ─────────────────────────────────────────────────────────────

const codeSnippet = computed(() => {
  const props: string[] = ['  :columns="columns"', '  :data="data"']

  if (config.loading) {
    props.push('  loading')
    if (config.loadingColor !== 'primary') props.push(`  loading-color="${config.loadingColor}"`)
    if (config.loadingAnimation !== 'carousel') props.push(`  loading-animation="${config.loadingAnimation}"`)
  }
  if (config.sticky) {
    const val = config.stickyPosition === 'true' ? true : config.stickyPosition
    props.push(`  :sticky="${val}"`)
  }
  if (config.rowSelection) props.push('  v-model:rowSelection="rowSelection"')
  // th is always bg-elevated via app.config defaults

  let code = `<UTable\n${props.join('\n')}\n/>`

  if (config.showHeader) {
    code = `<!-- Search -->\n<UInput v-model="query" placeholder="Search…" icon="i-lucide-search" />\n\n` + code
  }

  if (config.showFooter) {
    const footerParts: string[] = []
    if (config.showSummary) footerParts.push('<!-- Summary text -->')
    if (config.showPagination) footerParts.push('<AppPagination v-model:page="page" :total="pageCount" />')
    if (config.rowSelection)   footerParts.push('<!-- Row selection count -->')
    if (footerParts.length) {
      code += `\n\n<!-- Footer bar -->\n<div class="flex items-center gap-4">\n${footerParts.map(l => `  ${l}`).join('\n')}\n</div>`
    }
  }

  return code
})

// ─── Derived columns ──────────────────────────────────────────────────────────

const activeColumns = computed<TableColumn<ClientRow>[]>(() => {
  if (config.loading) {
    const skeletonCols = baseColumns.map(col => ({
      ...col,
      header: () => skeletonHeaderBlock(),
      cell: ({ row }: { row: { index: number } }) =>
        skeletonCellBlock((col as any).accessorKey ?? '', row.index),
    }))

    if (config.rowSelection) {
      return [
        {
          id: 'select',
          header: () => h('div', { class: `h-4 w-4 rounded ${skeletonBase}` }),
          cell: () => h('div', { class: `h-4 w-4 rounded ${skeletonBase}` }),
          enableSorting: false,
        },
        ...skeletonCols,
      ]
    }
    return skeletonCols
  }

  if (config.rowSelection) return [selectionColumn, ...baseColumns]
  return baseColumns
})

const stickyProp = computed(() => {
  if (!config.sticky) return false
  return config.stickyPosition === 'true' ? true : config.stickyPosition
})

// ─── Row selection state ──────────────────────────────────────────────────────

const rowSelection = ref<Record<string, boolean>>({})
const tableRef = useTemplateRef('tableRef')

const selectedCount = computed(() =>
  tableRef.value?.tableApi?.getFilteredSelectedRowModel().rows.length ?? 0
)
const totalCount = computed(() =>
  tableRef.value?.tableApi?.getFilteredRowModel().rows.length ?? 0
)

// ─── Footer bar visibility ────────────────────────────────────────────────────

const showFooterBar = computed(() => config.rowSelection || config.showFooter)
</script>

<template>
  <div class="max-w-7xl mx-auto px-10 py-12 space-y-10">

    <div class="space-y-1">
      <h1 class="text-2xl font-semibold text-default">Table</h1>
      <p class="text-sm text-toned">Data table powered by TanStack Table. Supports loading states, sticky headers, row selection, search, pagination, and custom cell renderers.</p>
    </div>

    <!-- Config panel -->
    <UCard variant="soft" :ui="{ root: 'rounded-xl bg-(--ui-bg-muted)', body: 'p-4' }">
      <div class="space-y-4">

        <!-- Row 1: Primary toggles + header variant (always visible) -->
        <div class="flex flex-wrap items-center gap-x-5 gap-y-3">
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <AppSwitch v-model="config.loading" size="sm" />
            <span class="text-xs text-toned">Loading</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <AppSwitch v-model="config.sticky" size="sm" />
            <span class="text-xs text-toned">Sticky</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <AppSwitch v-model="config.rowSelection" size="sm" />
            <span class="text-xs text-toned">Row selection</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <AppSwitch v-model="config.showHeader" size="sm" />
            <span class="text-xs text-toned">Header</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <AppSwitch v-model="config.showFooter" size="sm" />
            <span class="text-xs text-toned">Footer</span>
          </label>
          <div class="w-px h-6 bg-muted hidden sm:block" />
          <div class="flex items-center gap-2">
            <span class="text-xs text-muted">Header</span>
            <USelect v-model="config.headerVariant" :items="headerVariantItems" value-key="value" size="xs" class="w-28" />
          </div>
        </div>

        <!-- Sub-row: Loading options -->
        <div v-if="config.loading" class="flex flex-wrap items-center gap-4 pl-5 border-l-2 border-muted">
          <span class="text-xs text-muted w-14 shrink-0">Loading</span>
          <div class="flex items-center gap-2">
            <span class="text-xs text-muted">Color</span>
            <USelect v-model="config.loadingColor" :items="loadingColorItems" value-key="value" size="xs" class="w-32" />
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-muted">Animation</span>
            <USelect v-model="config.loadingAnimation" :items="loadingAnimItems" value-key="value" size="xs" class="w-40" />
          </div>
        </div>

        <!-- Sub-row: Sticky options -->
        <div v-if="config.sticky" class="flex items-center gap-4 pl-5 border-l-2 border-muted">
          <span class="text-xs text-muted w-14 shrink-0">Sticky</span>
          <div class="flex items-center gap-2">
            <span class="text-xs text-muted">Position</span>
            <USelect v-model="config.stickyPosition" :items="stickyPositionItems" value-key="value" size="xs" class="w-28" />
          </div>
        </div>

        <!-- Sub-row: Toolbar options -->
        <div v-if="config.showHeader" class="flex flex-wrap items-center gap-x-5 gap-y-3 pl-5 border-l-2 border-muted">
          <span class="text-xs text-muted w-14 shrink-0">Header</span>
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <AppSwitch v-model="config.toolbarSearch" size="sm" />
            <span class="text-xs text-toned">Search</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <AppSwitch v-model="config.toolbarTitle" size="sm" />
            <span class="text-xs text-toned">Title</span>
          </label>
          <UInput v-if="config.toolbarTitle" v-model="config.toolbarTitleText" size="xs" class="w-32" />
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <AppSwitch v-model="config.toolbarSegment" size="sm" />
            <span class="text-xs text-toned">Segments</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <AppSwitch v-model="config.toolbarFilter" size="sm" />
            <span class="text-xs text-toned">Filter</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <AppSwitch v-model="config.toolbarSort" size="sm" />
            <span class="text-xs text-toned">Sort</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <AppSwitch v-model="config.toolbarColumns" size="sm" />
            <span class="text-xs text-toned">Columns</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <AppSwitch v-model="config.toolbarExport" size="sm" />
            <span class="text-xs text-toned">Export</span>
          </label>
          <button
            v-if="config.toolbarFilter"
            type="button"
            class="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-toned border border-muted hover:bg-elevated transition-colors cursor-pointer"
            @click="addDemoFilter"
          >
            <UIcon name="i-lucide-plus" class="size-3" />
            Add demo filter
          </button>
        </div>

        <!-- Sub-row: Footer options -->
        <div v-if="config.showFooter" class="flex flex-wrap items-center gap-x-5 gap-y-3 pl-5 border-l-2 border-muted">
          <span class="text-xs text-muted w-14 shrink-0">Footer</span>
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <AppSwitch v-model="config.showSummary" size="sm" />
            <span class="text-xs text-toned">Summary</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <AppSwitch v-model="config.showPagination" size="sm" />
            <span class="text-xs text-toned">Pagination</span>
          </label>
          <template v-if="config.showPagination">
            <label class="flex items-center gap-2 cursor-pointer select-none">
              <AppSwitch v-model="config.paginationShowNumbers" size="sm" />
              <span class="text-xs text-toned">Numbers</span>
            </label>
            <div class="flex items-center gap-2">
              <span class="text-xs text-muted">Size</span>
              <USelect v-model="config.paginationSize" :items="paginationSizeItems" value-key="value" size="xs" class="w-20" />
            </div>
          </template>
        </div>

      </div>
    </UCard>

    <!-- Preview -->
    <div class="rounded-3xl overflow-hidden">

      <!-- Toolbar -->
      <div v-if="config.showHeader" class="px-5 py-3.5 border-b border-muted flex items-center gap-4" :class="toolbarClass">

        <!-- Left zone: title + segment tabs -->
        <div class="flex items-center gap-3">
          <p v-if="config.toolbarTitle" class="text-sm font-semibold text-white">
            {{ config.toolbarTitleText }}
          </p>
          <AppSegmentedControl
            v-if="config.toolbarSegment"
            v-model="config.activeSegment"
            :options="config.toolbarSegmentOptions"
            variant="ghost"
            size="sm"
          />
        </div>

        <!-- Spacer -->
        <div class="flex-1" />

        <!-- Right zone: search + action buttons -->
        <div class="flex items-center gap-2">
          <UInput
            v-if="config.toolbarSearch"
            v-model="searchQuery"
            placeholder="Search…"
            icon="i-lucide-search"
            size="sm"
            color="neutral"
            variant="subtle"
            class="w-56"
          />
          <div v-if="config.toolbarFilter || config.toolbarSort || config.toolbarColumns || config.toolbarExport" class="flex items-center gap-0.5 ml-1">
            <UTooltip v-if="config.toolbarFilter" text="Filter">
              <UButton color="neutral" variant="ghost" icon="i-lucide-sliders-horizontal" size="sm" square class="text-white/70 hover:text-white hover:bg-white/10" />
            </UTooltip>
            <UTooltip v-if="config.toolbarSort" text="Sort">
              <UButton color="neutral" variant="ghost" icon="i-lucide-arrow-up-down" size="sm" square class="text-white/70 hover:text-white hover:bg-white/10" />
            </UTooltip>
            <UTooltip v-if="config.toolbarColumns" text="Columns">
              <UButton color="neutral" variant="ghost" icon="i-lucide-columns-3" size="sm" square class="text-white/70 hover:text-white hover:bg-white/10" />
            </UTooltip>
            <UTooltip v-if="config.toolbarExport" text="Export">
              <UButton color="neutral" variant="ghost" icon="i-lucide-download" size="sm" square class="text-white/70 hover:text-white hover:bg-white/10" />
            </UTooltip>
          </div>
        </div>

      </div>

      <!-- Active filter strip (only when filter chips are present) -->
      <div
        v-if="config.showHeader && demoActiveFilters.length"
        class="px-5 py-2.5 border-b border-muted flex items-center gap-2 flex-wrap"
        :class="toolbarClass"
      >
        <button
          v-for="f in demoActiveFilters"
          :key="`${f.label}-${f.value}`"
          type="button"
          class="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors bg-white/20 text-white hover:bg-white/30"
          @click="removeFilter(f)"
        >
          {{ f.label }}: {{ f.value }}
          <UIcon name="i-lucide-x" class="size-3" />
        </button>
        <button
          type="button"
          class="ml-auto text-xs cursor-pointer transition-colors text-white/70 hover:text-white"
          @click="clearFilters"
        >Clear all</button>
      </div>

      <!-- Table — height always fixed on UTable so its overflow-auto root is the scroll container -->
      <div :class="config.showPagination ? 'min-h-[568px]' : ''">
        <UTable
          ref="tableRef"
          v-model:rowSelection="rowSelection"
          :columns="activeColumns"
          :data="displayData"
          :loading="config.loading"
          :loading-color="config.loadingColor"
          :loading-animation="config.loadingAnimation"
          :sticky="stickyProp"
          :ui="tableUI"
          class="h-[568px]"
        />
      </div>

      <!-- Footer bar -->
      <div v-if="showFooterBar" class="border-t border-muted px-5 py-3 bg-elevated flex items-center gap-4">

        <!-- Summary ON + Pagination ON: [summary | dots | controls] -->
        <template v-if="config.showSummary && config.showPagination">
          <p class="flex-1 text-xs text-toned shrink-0">{{ footerClientLabel }} · {{ footerAUM }}</p>
          <template v-if="pageCount > 1">
            <div class="flex items-center gap-1.5">
              <button
                v-for="i in pageCount" :key="i" type="button"
                class="rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royalblue-300"
                :class="i === currentPage ? 'w-4 h-1.5 bg-royalblue-500' : 'w-1.5 h-1.5 bg-lightgrey-700 hover:bg-lightgrey-600'"
                :aria-label="`Go to page ${i}`" @click="currentPage = i"
              />
            </div>
            <div class="flex-1 flex items-center justify-end gap-1">
              <UButton :size="config.paginationSize" color="secondary" variant="outline" icon="i-lucide-chevron-left" :disabled="currentPage <= 1" square class="rounded-full!" @click="currentPage > 1 && currentPage--" />
              <template v-if="config.paginationShowNumbers">
                <button v-if="paginationBlockStart > 1" type="button" :class="[paginationNumBtnClass, 'flex items-center justify-center rounded-full border border-darkblue-300 text-darkblue-600 transition-colors cursor-pointer hover:bg-darkblue-50']" @click="paginationJumpBack">…</button>
                <button v-for="i in paginationVisiblePages" :key="i" type="button" class="flex items-center justify-center rounded-full border transition-colors cursor-pointer" :class="[paginationNumBtnClass, i === currentPage ? 'bg-royalblue-500 text-white border-royalblue-500' : 'text-darkblue-600 border-darkblue-300 hover:bg-darkblue-50']" @click="currentPage = i">{{ i }}</button>
                <button v-if="paginationBlockEnd < pageCount" type="button" :class="[paginationNumBtnClass, 'flex items-center justify-center rounded-full border border-darkblue-300 text-darkblue-600 transition-colors cursor-pointer hover:bg-darkblue-50']" @click="paginationJumpForward">…</button>
              </template>
              <UButton :size="config.paginationSize" color="secondary" variant="outline" icon="i-lucide-chevron-right" :disabled="currentPage >= pageCount" square class="rounded-full!" @click="currentPage < pageCount && currentPage++" />
              <span v-if="config.rowSelection" class="ml-3 text-xs text-toned">{{ selectedCount }} of {{ totalCount }} selected</span>
            </div>
          </template>
        </template>

        <!-- Summary ON + Pagination OFF: [summary | row selection] -->
        <template v-else-if="config.showSummary">
          <p class="flex-1 text-xs text-toned">{{ footerClientLabel }} · {{ footerAUM }}</p>
          <p v-if="config.rowSelection" class="text-xs text-toned">{{ selectedCount }} of {{ totalCount }} selected</p>
        </template>

        <!-- Summary OFF + Pagination ON: [dots | controls] — only rendered when multiple pages exist -->
        <template v-else-if="config.showPagination && pageCount > 1">
          <div class="flex items-center gap-1.5">
            <button
              v-for="i in pageCount" :key="i" type="button"
              class="rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royalblue-300"
              :class="i === currentPage ? 'w-4 h-1.5 bg-royalblue-500' : 'w-1.5 h-1.5 bg-lightgrey-700 hover:bg-lightgrey-600'"
              :aria-label="`Go to page ${i}`" @click="currentPage = i"
            />
          </div>
          <div class="flex-1 flex items-center justify-end gap-1">
            <UButton :size="config.paginationSize" color="secondary" variant="outline" icon="i-lucide-chevron-left" :disabled="currentPage <= 1" square class="rounded-full!" @click="currentPage > 1 && currentPage--" />
            <template v-if="config.paginationShowNumbers">
              <button v-if="paginationBlockStart > 1" type="button" :class="[paginationNumBtnClass, 'flex items-center justify-center rounded-full border border-darkblue-300 text-darkblue-600 transition-colors cursor-pointer hover:bg-darkblue-50']" @click="paginationJumpBack">…</button>
              <button v-for="i in paginationVisiblePages" :key="i" type="button" class="flex items-center justify-center rounded-full border transition-colors cursor-pointer" :class="[paginationNumBtnClass, i === currentPage ? 'bg-royalblue-500 text-white border-royalblue-500' : 'text-darkblue-600 border-darkblue-300 hover:bg-darkblue-50']" @click="currentPage = i">{{ i }}</button>
              <button v-if="paginationBlockEnd < pageCount" type="button" :class="[paginationNumBtnClass, 'flex items-center justify-center rounded-full border border-darkblue-300 text-darkblue-600 transition-colors cursor-pointer hover:bg-darkblue-50']" @click="paginationJumpForward">…</button>
            </template>
            <UButton :size="config.paginationSize" color="secondary" variant="outline" icon="i-lucide-chevron-right" :disabled="currentPage >= pageCount" square class="rounded-full!" @click="currentPage < pageCount && currentPage++" />
            <span v-if="config.rowSelection" class="ml-3 text-xs text-toned">{{ selectedCount }} of {{ totalCount }} selected</span>
          </div>
        </template>

        <!-- Row selection only (footer off or no pagination) -->
        <template v-else>
          <p class="text-xs text-toned">{{ selectedCount }} of {{ totalCount }} selected</p>
        </template>

      </div>

    </div>

    <AppCodeBlock :code="codeSnippet" />

  </div>
</template>
