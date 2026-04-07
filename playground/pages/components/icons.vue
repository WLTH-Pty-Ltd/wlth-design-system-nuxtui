<script setup lang="ts">
import lucideData from '@iconify-json/lucide/icons.json'

definePageMeta({ layout: 'docs' })

const allIcons = Object.keys(lucideData.icons)
const search = ref('')

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return allIcons
  return allIcons.filter(name => name.includes(q))
})

const copied = ref<string | null>(null)

async function copyName(name: string) {
  const value = `i-lucide-${name}`
  await navigator.clipboard.writeText(value)
  copied.value = name
  setTimeout(() => { copied.value = null }, 1500)
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-10 py-12 space-y-14">

    <!-- Page header -->
    <div class="space-y-1">
      <h1 class="text-2xl font-semibold text-default">Icons</h1>
      <p class="text-sm text-toned">
        Icons are provided by
        <a href="https://lucide.dev" target="_blank" rel="noopener" class="text-royalblue-500 hover:underline">Lucide</a>
        via <code class="font-mono text-xs bg-elevated px-1.5 py-0.5 rounded">@iconify-json/lucide</code> and rendered through Nuxt UI's icon system.
        {{ allIcons.length }} icons available.
      </p>
    </div>

    <!-- ── Usage ──────────────────────────────────────────────── -->
    <div class="space-y-4">
      <div class="space-y-1">
        <h2 class="text-base font-semibold text-default">Usage</h2>
        <p class="text-sm text-toned">Reference icons using the <code class="font-mono text-xs bg-elevated px-1.5 py-0.5 rounded">i-lucide-{name}</code> pattern. Use <code class="font-mono text-xs bg-elevated px-1.5 py-0.5 rounded">&lt;UIcon&gt;</code> to render a standalone icon, or pass the name to any component <code class="font-mono text-xs bg-elevated px-1.5 py-0.5 rounded">icon</code> prop.</p>
      </div>

      <div class="rounded-xl border border-muted overflow-hidden divide-y divide-muted">
        <div class="px-6 py-5 bg-muted space-y-1">
          <p class="text-xs text-toned font-semibold uppercase tracking-widest">Standalone icon</p>
          <code class="font-mono text-xs text-highlighted block">&lt;UIcon name="i-lucide-bell" class="size-5" /&gt;</code>
          <div class="pt-2">
            <UIcon name="i-lucide-bell" class="size-5 text-default" />
          </div>
        </div>
        <div class="px-6 py-5 bg-muted space-y-1">
          <p class="text-xs text-toned font-semibold uppercase tracking-widest">As a component prop</p>
          <code class="font-mono text-xs text-highlighted block">&lt;UButton icon="i-lucide-plus" label="Add item" /&gt;</code>
          <div class="pt-2">
            <UButton icon="i-lucide-plus" label="Add item" variant="soft" size="sm" />
          </div>
        </div>
        <div class="px-6 py-5 bg-muted space-y-1">
          <p class="text-xs text-toned font-semibold uppercase tracking-widest">Sizing</p>
          <code class="font-mono text-xs text-highlighted block">Use Tailwind size utilities: size-3 (12px) · size-4 (16px) · size-5 (20px) · size-6 (24px)</code>
          <div class="flex items-end gap-4 pt-2">
            <UIcon name="i-lucide-star" class="size-3 text-default" />
            <UIcon name="i-lucide-star" class="size-4 text-default" />
            <UIcon name="i-lucide-star" class="size-5 text-default" />
            <UIcon name="i-lucide-star" class="size-6 text-default" />
          </div>
        </div>
      </div>
    </div>

    <USeparator />

    <!-- ── Icon Library ───────────────────────────────────────── -->
    <div class="space-y-6">
      <div class="space-y-1">
        <h2 class="text-base font-semibold text-default">Icon Library</h2>
        <p class="text-sm text-toned">Click any icon to copy its name to the clipboard.</p>
      </div>

      <!-- Search -->
      <UInput
        v-model="search"
        icon="i-lucide-search"
        placeholder="Search icons…"
        class="max-w-xs"
      />

      <p v-if="filtered.length === 0" class="text-sm text-toned">
        No icons match <span class="font-mono">{{ search }}</span>.
      </p>
      <p v-else-if="search" class="text-xs text-toned">
        {{ filtered.length }} result{{ filtered.length === 1 ? '' : 's' }}
      </p>

      <!-- Grid -->
      <div class="grid gap-1" style="grid-template-columns: repeat(auto-fill, minmax(96px, 1fr))">
        <button
          v-for="name in filtered"
          :key="name"
          type="button"
          class="group flex flex-col items-center gap-2 rounded-xl px-2 py-4 text-center transition-colors hover:bg-elevated"
          :class="copied === name ? 'bg-elevated' : ''"
          @click="copyName(name)"
        >
          <UIcon
            :name="`i-lucide-${name}`"
            class="size-5 shrink-0 transition-colors"
            :class="copied === name ? 'text-royalblue-500' : 'text-default'"
          />
          <span
            class="font-mono text-[10px] leading-tight break-all transition-colors"
            :class="copied === name ? 'text-royalblue-500' : 'text-toned group-hover:text-default'"
          >
            {{ copied === name ? 'copied!' : name }}
          </span>
        </button>
      </div>
    </div>

  </div>
</template>
