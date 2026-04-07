<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const toItems = (arr: string[]) => arr.map(v => ({ label: v, value: v }))

const variantItems = toItems(['default', 'primary', 'secondary', 'ghost'])
const sizeItems    = toItems(['xs', 'sm', 'md', 'lg'])
const countItems   = Array.from({ length: 9 }, (_, i) => ({ label: String(i + 2), value: i + 2 }))

// Pool of demo options — user can dial up to 10
const optionPool = ['All', 'Active', 'Pending', 'Inactive', 'Archived', 'Draft', 'Review', 'Approved', 'Rejected', 'Closed']

const config = reactive({
  variant: 'default' as 'default' | 'primary' | 'secondary' | 'ghost',
  size: 'sm' as 'xs' | 'sm' | 'md' | 'lg',
  count: 3,
})

const propsRows = [
  { prop: 'modelValue / v-model', type: 'string', def: '—', desc: 'The currently selected value. Should match the value field of one of the options.' },
  { prop: 'options', type: "string[] | { label: string; value: string }[]", def: '—', desc: 'Required. Segment options. Pass a plain string array as a shorthand — each string is used as both label and value.' },
  { prop: 'variant', type: "'default' | 'primary' | 'secondary' | 'ghost'", def: "'default'", desc: 'Visual style. Use ghost on coloured backgrounds (e.g. the royalblue header).' },
  { prop: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", def: "'sm'", desc: 'Controls text size and padding of each segment.' },
]

const activeOptions = computed(() => optionPool.slice(0, config.count))

// Reset selected value if it falls outside the current options
const valueConfig    = ref('All')
const valueDefault   = ref('All')
const valuePrimary   = ref('All')
const valueSecondary = ref('All')
const valueGhost     = ref('All')

watch(activeOptions, (opts) => {
  if (!opts.includes(valueConfig.value)) valueConfig.value = opts[0]
})

const codeSnippet = computed(() => {
  const optStr = JSON.stringify(activeOptions.value)
  const props: string[] = ['  v-model="selected"', `  :options="${optStr}"`]
  if (config.variant !== 'default') props.push(`  variant="${config.variant}"`)
  if (config.size !== 'sm')         props.push(`  size="${config.size}"`)
  return `<AppSegmentedControl\n${props.join('\n')}\n/>`
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-10 py-12 space-y-10">

    <div class="space-y-1">
      <h1 class="text-2xl font-semibold text-default">Segmented Control</h1>
      <p class="text-sm text-toned">Compact inline toggle for switching between a small set of mutually exclusive options. Used in table toolbars, filter bars, and view switchers.</p>
    </div>

    <!-- Config panel -->
    <UCard variant="soft" :ui="{ root: 'rounded-xl bg-(--ui-bg-muted)', body: 'p-4' }">
      <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
        <div class="flex items-center gap-2">
          <span class="text-xs text-muted">Variant</span>
          <USelect v-model="config.variant" :items="variantItems" value-key="value" size="xs" class="w-28" />
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs text-muted">Size</span>
          <USelect v-model="config.size" :items="sizeItems" value-key="value" size="xs" class="w-20" />
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs text-muted">Segments</span>
          <USelect v-model="config.count" :items="countItems" value-key="value" size="xs" class="w-16" />
        </div>
      </div>
    </UCard>

    <!-- Configurable preview -->
    <div class="rounded-xl overflow-hidden">
      <div
        class="p-8 flex items-center justify-center"
        :class="config.variant === 'ghost' ? 'bg-royalblue-500' : 'bg-muted'"
      >
        <AppSegmentedControl
          v-model="valueConfig"
          :options="activeOptions"
          :variant="config.variant"
          :size="config.size"
        />
      </div>
    </div>

    <AppCodeBlock :code="codeSnippet" />

    <!-- Usage guideline -->
    <UAlert
      icon="i-lucide-info"
      color="neutral"
      variant="soft"
      title="Recommended usage"
      description="2–4 segments works best for readability and touch targets. While up to 10 are supported, more than 5 will feel cramped at smaller sizes. For longer option sets, consider a select or filter dropdown instead."
    />

    <!-- All variants -->
    <div class="space-y-3">
      <h2 class="text-base font-semibold text-default">Variants</h2>
      <div class="grid gap-3">

        <!-- default -->
        <div class="rounded-xl overflow-hidden border border-muted">
          <div class="px-4 py-2 bg-muted border-b border-muted">
            <span class="text-xs text-toned font-mono">default — neutral active pill, light background</span>
          </div>
          <div class="p-6 bg-default flex items-center gap-6">
            <AppSegmentedControl v-model="valueDefault" :options="['All', 'Individuals', 'Business']" variant="default" />
            <span class="text-xs text-toned">Selected: {{ valueDefault }}</span>
          </div>
        </div>

        <!-- primary -->
        <div class="rounded-xl overflow-hidden border border-muted">
          <div class="px-4 py-2 bg-muted border-b border-muted">
            <span class="text-xs text-toned font-mono">primary — royalblue active pill, light background</span>
          </div>
          <div class="p-6 bg-default flex items-center gap-6">
            <AppSegmentedControl v-model="valuePrimary" :options="['All', 'Individuals', 'Business']" variant="primary" />
            <span class="text-xs text-toned">Selected: {{ valuePrimary }}</span>
          </div>
        </div>

        <!-- secondary -->
        <div class="rounded-xl overflow-hidden border border-muted">
          <div class="px-4 py-2 bg-muted border-b border-muted">
            <span class="text-xs text-toned font-mono">secondary — darkblue active pill, light background</span>
          </div>
          <div class="p-6 bg-default flex items-center gap-6">
            <AppSegmentedControl v-model="valueSecondary" :options="['All', 'Individuals', 'Business']" variant="secondary" />
            <span class="text-xs text-toned">Selected: {{ valueSecondary }}</span>
          </div>
        </div>

        <!-- ghost -->
        <div class="rounded-xl overflow-hidden border border-muted">
          <div class="px-4 py-2 bg-muted border-b border-muted">
            <span class="text-xs text-toned font-mono">ghost — solid white active pill, for coloured backgrounds</span>
          </div>
          <div class="p-6 bg-royalblue-500 flex items-center gap-6">
            <AppSegmentedControl v-model="valueGhost" :options="['All', 'Individuals', 'Business']" variant="ghost" />
            <span class="text-xs text-white/70">Selected: {{ valueGhost }}</span>
          </div>
        </div>

      </div>
    </div>

    <!-- Props -->
    <div class="space-y-3">
      <h2 class="text-base font-semibold text-default">Props</h2>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="grid grid-cols-[1.5fr_1.5fr_1fr_2fr] text-[11px] font-semibold uppercase tracking-wider text-dimmed bg-muted px-4 py-2.5 border-b border-muted">
          <span>Prop</span><span>Type</span><span>Default</span><span>Description</span>
        </div>
        <div
          v-for="(row, i) in propsRows"
          :key="row.prop"
          class="grid grid-cols-[1.5fr_1.5fr_1fr_2fr] gap-x-3 items-start px-4 py-3 text-xs"
          :class="i !== 0 ? 'border-t border-muted' : ''"
        >
          <code class="font-mono text-royalblue-500">{{ row.prop }}</code>
          <code class="font-mono text-toned">{{ row.type }}</code>
          <code class="font-mono text-toned">{{ row.def }}</code>
          <span class="text-toned leading-relaxed">{{ row.desc }}</span>
        </div>
      </div>
    </div>

    <!-- Options format -->
    <div class="space-y-3">
      <h2 class="text-base font-semibold text-default">Options format</h2>
      <p class="text-sm text-toned">Pass a plain string array as a shorthand when label and value are the same. Use the object form when you need different display text and underlying values.</p>
      <div class="space-y-2">
        <p class="text-xs font-semibold text-dimmed uppercase tracking-wider">String shorthand</p>
        <pre class="text-xs font-mono bg-elevated rounded-lg px-4 py-3 overflow-x-auto leading-relaxed text-default"><code>&lt;AppSegmentedControl v-model="view" :options="['All', 'Active', 'Pending']" /&gt;</code></pre>
      </div>
      <div class="space-y-2">
        <p class="text-xs font-semibold text-dimmed uppercase tracking-wider">Object form</p>
        <pre class="text-xs font-mono bg-elevated rounded-lg px-4 py-3 overflow-x-auto leading-relaxed text-default"><code>&lt;AppSegmentedControl
  v-model="status"
  :options="[
    { label: 'All clients',    value: 'all'      },
    { label: 'Active only',    value: 'active'   },
    { label: 'Pending review', value: 'pending'  },
  ]"
/&gt;</code></pre>
      </div>
    </div>

    <!-- Sizes -->
    <div class="space-y-3">
      <h2 class="text-base font-semibold text-default">Sizes</h2>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-default flex flex-wrap items-center gap-6">
          <div v-for="size in ['xs', 'sm', 'md', 'lg']" :key="size" class="flex flex-col items-start gap-2">
            <span class="text-xs text-muted font-mono">{{ size }}</span>
            <AppSegmentedControl :model-value="'All'" :options="['All', 'Individuals', 'Business']" variant="primary" :size="(size as any)" @update:model-value="() => {}" />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
