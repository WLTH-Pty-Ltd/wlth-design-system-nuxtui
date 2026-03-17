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

  </div>
</template>
