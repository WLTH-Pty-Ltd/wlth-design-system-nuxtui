<script setup lang="ts">
definePageMeta({ layout: 'docs' })

import { useToast } from '#imports'

const toast = useToast()

const toItems = (arr: string[]) => arr.map(v => ({ label: v, value: v }))

const colorItems = toItems(['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'])
const sizeItems = toItems(['xs', 'sm', 'md', 'lg', 'xl'])
const alertVariantItems = toItems(['solid', 'subtle', 'outline', 'soft'])

const alertColor = ref('primary')
const alertVariant = ref('subtle')

const toastColor = ref('primary')
function fireToast() {
  toast.add({
    title: 'Toast notification',
    description: `This is a ${toastColor.value} toast.`,
    color: toastColor.value as 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral'
  })
}

const progressColor = ref('primary')
const progressSize = ref('md')
const progressValue = ref(65)

const alertCode = computed(() => `<UAlert\n  color="${alertColor.value}"\n  variant="${alertVariant.value}"\n  title="Alert title"\n  description="Additional context here."\n  icon="i-lucide-info"\n/>`)
const toastCode = computed(() => `const toast = useToast()\ntoast.add({\n  title: 'Notification',\n  description: 'Message here.',\n  color: '${toastColor.value}'\n})`)
const progressCode = computed(() => `<UProgress :value="value" color="${progressColor.value}" size="${progressSize.value}" />`)
</script>

<template>
  <div class="max-w-7xl mx-auto px-10 py-12 space-y-14">

    <div class="space-y-1">
      <h1 class="text-2xl font-semibold text-default">Feedback</h1>
      <p class="text-sm text-toned">Status communication — alerts, toasts, progress bars, and loading states.</p>
    </div>

    <!-- Alert -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Alert</h2>
        <p class="text-sm text-toned">Inline status messages. Supports all semantic colors and 4 variants.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted">
          <UAlert
            :color="alertColor"
            :variant="alertVariant"
            title="Alert title"
            description="This is the alert description providing additional context."
            icon="i-lucide-info"
            class="max-w-lg"
          />
        </div>
        <div class="border-t border-muted px-5 py-3 flex flex-wrap gap-3 items-center bg-muted">
          <USelect v-model="alertColor" :items="colorItems" value-key="value" size="xs" class="w-32" />
          <USelect v-model="alertVariant" :items="alertVariantItems" value-key="value" size="xs" class="w-32" />
        </div>
      </div>
      <AppCodeBlock :code="alertCode" />
    </section>

    <USeparator />

    <!-- Toast -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Toast</h2>
        <p class="text-sm text-toned">Temporary notification overlays triggered programmatically via <code class="text-xs font-mono bg-elevated px-1 py-0.5 rounded">useToast()</code>.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted flex flex-wrap gap-3 items-center">
          <UButton :color="toastColor" variant="outline" size="sm" label="Fire toast" icon="i-lucide-bell" @click="fireToast" />
        </div>
        <div class="border-t border-muted px-5 py-3 flex flex-wrap gap-3 items-center bg-muted">
          <USelect v-model="toastColor" :items="colorItems" value-key="value" size="xs" class="w-32" />
        </div>
      </div>
      <AppCodeBlock :code="toastCode" />
    </section>

    <USeparator />

    <!-- Progress -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Progress</h2>
        <p class="text-sm text-toned">Linear progress indicator. Drag the slider below to adjust value.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted space-y-4">
          <UProgress :value="progressValue" :color="progressColor" :size="progressSize" class="w-64" />
          <USlider v-model="progressValue" class="w-64" />
        </div>
        <div class="border-t border-muted px-5 py-3 flex flex-wrap gap-3 items-center bg-muted">
          <USelect v-model="progressColor" :items="colorItems" value-key="value" size="xs" class="w-32" />
          <USelect v-model="progressSize" :items="sizeItems" value-key="value" size="xs" class="w-20" />
        </div>
      </div>
      <AppCodeBlock :code="progressCode" />
    </section>

    <USeparator />

    <!-- Skeleton -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Skeleton</h2>
        <p class="text-sm text-toned">Loading placeholder that mimics content structure.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted">
          <div class="space-y-2 w-64">
            <USkeleton class="h-4 w-3/4" />
            <USkeleton class="h-4 w-full" />
            <USkeleton class="h-4 w-1/2" />
            <div class="flex gap-2 items-center pt-1">
              <USkeleton class="size-8 rounded-full shrink-0" />
              <USkeleton class="h-4 flex-1" />
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
