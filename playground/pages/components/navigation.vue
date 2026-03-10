<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const toItems = (arr: string[]) => arr.map(v => ({ label: v, value: v }))

const colorItems = toItems(['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'])
const sizeItems = toItems(['xs', 'sm', 'md', 'lg', 'xl'])
const tabsVariantItems = toItems(['pill', 'link', 'underline'])

const tabsColor = ref('primary')
const tabsSize = ref('md')
const tabsVariant = ref('pill')
const demoTabItems = [
  { label: 'Tab One', value: 'one' },
  { label: 'Tab Two', value: 'two' },
  { label: 'Tab Three', value: 'three' }
]

const paginationPage = ref(3)
const paginationColor = ref('primary')
const paginationSize = ref('md')

const accordionItems = [
  { value: 'q1', label: 'What is Nuxt UI?', content: 'Nuxt UI is a comprehensive UI component library for Nuxt 3 and 4, built on top of Reka UI and Tailwind CSS.' },
  { value: 'q2', label: 'How does theming work?', content: 'Theming is handled via CSS custom properties defined in @theme blocks and mapped to semantic color tokens in app.config.ts.' },
  { value: 'q3', label: 'Can I customise components?', content: 'Yes — every component accepts a `ui` prop for fine-grained style overrides using Tailwind Variants.' }
]
</script>

<template>
  <div class="max-w-7xl mx-auto px-10 py-12 space-y-14">

    <div class="space-y-1">
      <h1 class="text-2xl font-semibold text-default">Navigation</h1>
      <p class="text-sm text-toned">Structural navigation — tabs, breadcrumbs, pagination, accordions, and collapsibles.</p>
    </div>

    <!-- Tabs -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Tabs</h2>
        <p class="text-sm text-toned">Segmented content switcher. Supports pill, link, and underline variants.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted">
          <UTabs :items="demoTabItems" :color="tabsColor" :size="tabsSize" :variant="tabsVariant" class="max-w-sm" />
        </div>
        <div class="border-t border-muted px-5 py-3 flex flex-wrap gap-3 items-center bg-muted">
          <USelect v-model="tabsColor" :items="colorItems" value-key="value" size="xs" class="w-32" />
          <USelect v-model="tabsVariant" :items="tabsVariantItems" value-key="value" size="xs" class="w-28" />
          <USelect v-model="tabsSize" :items="sizeItems" value-key="value" size="xs" class="w-20" />
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Breadcrumb -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Breadcrumb</h2>
        <p class="text-sm text-toned">Hierarchical path indicator for deep navigation structures.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted">
          <UBreadcrumb
            :items="[
              { label: 'Home', to: '/' },
              { label: 'Design System', to: '/components/actions' },
              { label: 'Navigation' }
            ]"
          />
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Pagination -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Pagination</h2>
        <p class="text-sm text-toned">Page navigation control for large datasets.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted">
          <UPagination v-model:page="paginationPage" :total="100" :color="paginationColor" :size="paginationSize" />
        </div>
        <div class="border-t border-muted px-5 py-3 flex flex-wrap gap-3 items-center bg-muted">
          <USelect v-model="paginationColor" :items="colorItems" value-key="value" size="xs" class="w-32" />
          <USelect v-model="paginationSize" :items="sizeItems" value-key="value" size="xs" class="w-20" />
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Accordion -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Accordion</h2>
        <p class="text-sm text-toned">Expandable content sections. Supports single and multiple open panels.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted">
          <UAccordion :items="accordionItems" class="max-w-lg" />
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Collapsible -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Collapsible</h2>
        <p class="text-sm text-toned">Simple show/hide wrapper triggered by any child element.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted">
          <UCollapsible class="max-w-sm space-y-2">
            <UButton color="neutral" variant="outline" label="Toggle details" trailing-icon="i-lucide-chevron-down" block />
            <template #content>
              <UCard>
                <p class="text-sm text-toned">Hidden content that reveals on toggle.</p>
              </UCard>
            </template>
          </UCollapsible>
        </div>
      </div>
    </section>

  </div>
</template>
