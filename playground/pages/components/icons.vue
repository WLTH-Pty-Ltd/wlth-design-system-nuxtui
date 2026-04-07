<script setup lang="ts">
definePageMeta({ layout: 'docs' })

import iconCategories from '~/assets/icon-categories.json'
import iconsData from '@iconify-json/lucide/icons.json'

const allIconNames = new Set(Object.keys(iconsData.icons))
const categorisedIcons = new Set(Object.values(iconCategories as Record<string, string[]>).flat())

const sections = [
  ...(Object.entries(iconCategories) as [string, string[]][])
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([cat, icons]) => ({
      id: cat,
      label: cat.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      icons: icons.filter(n => allIconNames.has(n)).sort(),
    })),
  {
    id: 'uncategorised',
    label: 'Uncategorised',
    icons: [...allIconNames].filter(n => !categorisedIcons.has(n)).sort(),
  },
].filter(s => s.icons.length > 0)

const search = ref('')

const filteredSections = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return sections
  return sections
    .map(s => ({ ...s, icons: s.icons.filter(n => n.includes(q)) }))
    .filter(s => s.icons.length > 0)
})

const totalFiltered = computed(() => filteredSections.value.reduce((n, s) => n + s.icons.length, 0))

const activeSection = ref(sections[0]?.id ?? '')
const jumpSelectEl = ref<HTMLSelectElement | null>(null)

const copied = ref<string | null>(null)
async function copy(name: string) {
  await navigator.clipboard.writeText(`i-lucide-${name}`)
  copied.value = name
  setTimeout(() => { copied.value = null }, 1500)
}

function jumpTo(id: string) {
  if (!id) return
  document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  if (jumpSelectEl.value) jumpSelectEl.value.value = ''
}

function onScroll() {
  for (const s of [...filteredSections.value].reverse()) {
    const el = document.getElementById(`cat-${s.id}`)
    if (el && el.getBoundingClientRect().top <= 100) {
      activeSection.value = s.id
      return
    }
  }
  if (filteredSections.value[0]) activeSection.value = filteredSections.value[0].id
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <div class="max-w-7xl mx-auto px-10 py-12 space-y-12">

    <!-- Header -->
    <div class="space-y-1">
      <h1 class="text-2xl font-semibold text-default">Icons</h1>
      <p class="text-sm text-toned">
        The design system uses <a href="https://lucide.dev" target="_blank" class="text-royalblue-500 hover:underline">Lucide</a>
        as its icon library, provided via the <code class="text-xs bg-muted px-1 py-0.5 rounded font-mono">@iconify-json/lucide</code>
        package and rendered through Nuxt UI's <code class="text-xs bg-muted px-1 py-0.5 rounded font-mono">&lt;UIcon&gt;</code> component.
      </p>
    </div>

    <!-- Usage -->
    <div class="space-y-4">
      <h2 class="text-base font-semibold text-default">Usage</h2>
      <p class="text-sm text-toned">Reference icons using the <code class="text-xs bg-muted px-1 py-0.5 rounded font-mono">i-lucide-{name}</code> pattern.</p>
      <div class="rounded-xl border border-muted bg-muted/50 p-6 space-y-4">
        <div class="space-y-2">
          <p class="text-xs font-semibold text-dimmed uppercase tracking-wider">Template</p>
          <pre class="text-xs font-mono bg-elevated rounded-lg px-4 py-3 text-default overflow-x-auto">&lt;UIcon name="i-lucide-bell" class="size-5" /&gt;</pre>
        </div>
        <div class="space-y-2">
          <p class="text-xs font-semibold text-dimmed uppercase tracking-wider">Component prop</p>
          <pre class="text-xs font-mono bg-elevated rounded-lg px-4 py-3 text-default overflow-x-auto">&lt;UButton icon="i-lucide-plus" label="Add item" /&gt;</pre>
        </div>
        <div class="space-y-2">
          <p class="text-xs font-semibold text-dimmed uppercase tracking-wider">Sizing — use Tailwind size-* classes</p>
          <div class="flex items-end gap-6">
            <div v-for="s in ['size-3', 'size-4', 'size-5', 'size-6', 'size-8', 'size-10']" :key="s" class="flex flex-col items-center gap-1.5">
              <UIcon name="i-lucide-star" :class="[s, 'text-default']" />
              <span class="text-[10px] font-mono text-toned">{{ s }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Browse -->
    <div class="space-y-0">

      <!-- Sticky toolbar -->
      <div class="sticky top-0 z-10 bg-default border-b border-muted py-3 flex items-center gap-3">
        <UInput
          v-model="search"
          placeholder="Search icons…"
          icon="i-lucide-search"
          size="sm"
          class="flex-1"
        />
        <div class="flex items-center gap-2 shrink-0">
          <span class="text-xs text-dimmed">{{ totalFiltered }} icons</span>
          <select
            v-if="!search"
            ref="jumpSelectEl"
            class="jump-select text-xs bg-elevated border border-muted rounded-lg px-2.5 py-1.5 text-default cursor-pointer hover:border-default transition-colors"
            @change="(e) => { jumpTo((e.target as HTMLSelectElement).value) }"
          >
            <option value="">Jump to category…</option>
            <option v-for="s in sections" :key="s.id" :value="s.id">{{ s.label }}</option>
          </select>
        </div>
      </div>

      <!-- Icon sections -->
      <div class="space-y-10 pt-8">
        <div
          v-for="section in filteredSections"
          :key="section.id"
          :id="`cat-${section.id}`"
          class="space-y-3 scroll-mt-16"
        >
          <div class="flex items-baseline gap-2 border-b border-muted pb-2">
            <p class="text-sm font-semibold text-default">{{ section.label }}</p>
            <span class="text-xs text-dimmed">{{ section.icons.length }}</span>
          </div>
          <div class="grid gap-1" style="grid-template-columns: repeat(auto-fill, minmax(88px, 1fr))">
            <button
              v-for="name in section.icons"
              :key="name"
              type="button"
              class="group flex flex-col items-center gap-1.5 rounded-lg p-2.5 text-center transition-colors hover:bg-muted border border-transparent hover:border-muted"
              :title="`i-lucide-${name}`"
              @click="copy(name)"
            >
              <UIcon
                :name="`i-lucide-${name}`"
                class="size-5 shrink-0 transition-colors"
                :class="copied === name ? 'text-royalblue-500' : 'text-default group-hover:text-royalblue-500'"
              />
              <span
                class="text-[10px] font-mono leading-tight break-all transition-colors"
                :class="copied === name ? 'text-royalblue-500' : 'text-toned'"
              >
                {{ copied === name ? 'copied!' : name }}
              </span>
            </button>
          </div>
        </div>

        <div v-if="filteredSections.length === 0" class="py-16 text-center text-sm text-toned">
          No icons match "<span class="font-mono">{{ search }}</span>"
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.jump-select {
  appearance: none;
  padding-right: 1.5rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 6px center;
}
</style>
