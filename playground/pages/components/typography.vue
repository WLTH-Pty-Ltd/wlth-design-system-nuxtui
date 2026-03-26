<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const typeScale = [
  { class: 'text-xs',   rem: '0.75rem',  px: '12px', leading: '1rem',    leadingClass: 'leading-4',    uses: 'Timestamps, labels, helper text, badges' },
  { class: 'text-sm',   rem: '0.875rem', px: '14px', leading: '1.25rem', leadingClass: 'leading-5',    uses: 'Body text, table cells, form labels, nav items' },
  { class: 'text-base', rem: '1rem',     px: '16px', leading: '1.5rem',  leadingClass: 'leading-6',    uses: 'Default body, descriptions, card content' },
  { class: 'text-lg',   rem: '1.125rem', px: '18px', leading: '1.75rem', leadingClass: 'leading-7',    uses: 'Panel titles, slideover headings, modal titles' },
  { class: 'text-xl',   rem: '1.25rem',  px: '20px', leading: '1.75rem', leadingClass: 'leading-7',    uses: 'Section headings, page sub-titles' },
  { class: 'text-2xl',  rem: '1.5rem',   px: '24px', leading: '2rem',    leadingClass: 'leading-8',    uses: 'Page titles, docs headings' },
  { class: 'text-3xl',  rem: '1.875rem', px: '30px', leading: '2.25rem', leadingClass: 'leading-9',    uses: 'Hero headings, marketing headlines' },
  { class: 'text-4xl',  rem: '2.25rem',  px: '36px', leading: '2.5rem',  leadingClass: 'leading-10',   uses: 'Display headings, large hero text' },
]

const weights = [
  { class: 'font-normal',   value: '400', name: 'Regular',  uses: 'Long-form body text, descriptions' },
  { class: 'font-medium',   value: '500', name: 'Medium',   uses: 'Emphasised body, active nav items, subtle labels' },
  { class: 'font-semibold', value: '600', name: 'SemiBold', uses: 'Headings, titles, table headers, badges — the primary weight for UI' },
  { class: 'font-bold',     value: '700', name: 'Bold',     uses: 'Strong emphasis only — use sparingly' },
]

const suisseWeights = [
  { weight: '100', name: 'Thin' },
  { weight: '200', name: 'Light' },
  { weight: '300', name: 'Book' },
  { weight: '400', name: 'Regular' },
  { weight: '500', name: 'Medium' },
  { weight: '600', name: 'SemiBold' },
  { weight: '700', name: 'Bold' },
  { weight: '900', name: 'Black' },
]
</script>

<template>
  <div class="max-w-7xl mx-auto px-10 py-12 space-y-14">

    <!-- Page header -->
    <div class="space-y-1">
      <h1 class="text-2xl font-semibold text-default">Typography</h1>
      <p class="text-sm text-toned">Font families, type scale, weights, and usage guidance for building consistent product UIs.</p>
    </div>

    <!-- ── Font Families ───────────────────────────────────── -->
    <div class="space-y-6">
      <div class="space-y-1">
        <h2 class="text-base font-semibold text-default">Font Families</h2>
        <p class="text-sm text-toned">Fonts are loaded via <code class="font-mono text-xs bg-elevated px-1.5 py-0.5 rounded">@font-face</code> declarations in <code class="font-mono text-xs bg-elevated px-1.5 py-0.5 rounded">assets/css/tokens.css</code>, sourced from <code class="font-mono text-xs bg-elevated px-1.5 py-0.5 rounded">https://assets.wlth.com/fonts/</code>. Both families use <code class="font-mono text-xs bg-elevated px-1.5 py-0.5 rounded">font-display: swap</code>.</p>
      </div>

      <!-- SuisseIntl -->
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="px-6 py-5 bg-muted border-b border-muted flex items-start justify-between gap-4">
          <div class="space-y-1">
            <p class="font-semibold text-default">SuisseIntl</p>
            <p class="text-xs text-toned font-mono">--font-sans: 'SuisseIntl', system-ui, -apple-system, sans-serif</p>
            <p class="text-xs text-toned">Primary UI font. Use via Tailwind's <span class="font-mono bg-elevated px-1 rounded">font-sans</span> or the default body — all text renders in SuisseIntl unless explicitly overridden.</p>
          </div>
        </div>
        <div class="divide-y divide-muted">
          <div
            v-for="w in suisseWeights"
            :key="w.weight"
            class="grid items-center gap-6 px-6 py-6 bg-muted hover:bg-elevated transition-colors"
            style="grid-template-columns: 4rem 6rem 1fr"
          >
            <span class="font-mono text-xs text-toned">{{ w.weight }}</span>
            <span class="font-mono text-xs text-toned">{{ w.name }}</span>
            <span
              class="text-lg text-default truncate"
              :style="{ fontFamily: 'SuisseIntl', fontWeight: w.weight }"
            >
              The quick brown fox jumps over the lazy dog
            </span>
          </div>
        </div>
      </div>

      <!-- SuisseIntlMono -->
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="px-6 py-5 bg-muted border-b border-muted">
          <p class="font-semibold text-default">SuisseIntlMono</p>
          <p class="text-xs text-toned font-mono mt-1">--font-mono: 'SuisseIntlMono', ui-monospace, monospace</p>
          <p class="text-xs text-toned mt-1">Monospace font. Use via Tailwind's <span class="font-mono bg-elevated px-1 rounded">font-mono</span> for code, tokens, hex values, and technical data. Available at weight 400 only.</p>
        </div>
        <div class="px-6 py-5 bg-muted">
          <span class="font-mono text-lg text-default">The quick brown fox jumps over the lazy dog</span>
        </div>
      </div>
    </div>

    <USeparator />

    <!-- ── Type Scale ──────────────────────────────────────── -->
    <div class="space-y-4">
      <div class="space-y-1">
        <h2 class="text-base font-semibold text-default">Type Scale</h2>
        <p class="text-sm text-toned">Tailwind v4 default scale. Use these classes directly — no custom font-size tokens are defined.</p>
      </div>

      <!-- Column headers -->
      <div
        class="grid gap-4 px-6 text-xs text-toned font-mono"
        style="grid-template-columns: 6rem 3.5rem 3.5rem 6rem 1fr"
      >
        <span>Class</span>
        <span>rem</span>
        <span>px</span>
        <span>Line height</span>
        <span>Use case</span>
      </div>

      <div class="rounded-xl border border-muted overflow-hidden divide-y divide-muted">
        <div
          v-for="row in typeScale"
          :key="row.class"
          class="bg-muted hover:bg-elevated transition-colors"
        >
          <!-- Specimen row -->
          <div class="px-6 pt-5 pb-1">
            <span
              :class="[row.class, 'text-default font-medium leading-none block truncate']"
            >
              Aa — {{ row.class }}
            </span>
          </div>
          <!-- Spec row -->
          <div
            class="grid gap-4 px-6 pb-5 pt-2 items-start"
            style="grid-template-columns: 6rem 3.5rem 3.5rem 6rem 1fr"
          >
            <span class="font-mono text-xs text-highlighted">{{ row.class }}</span>
            <span class="font-mono text-xs text-toned">{{ row.rem }}</span>
            <span class="font-mono text-xs text-toned">{{ row.px }}</span>
            <span class="font-mono text-xs text-toned">{{ row.leading }}</span>
            <span class="text-xs text-toned">{{ row.uses }}</span>
          </div>
        </div>
      </div>
    </div>

    <USeparator />

    <!-- ── Font Weights ────────────────────────────────────── -->
    <div class="space-y-4">
      <div class="space-y-1">
        <h2 class="text-base font-semibold text-default">Font Weights</h2>
        <p class="text-sm text-toned">The four weights used in product UI. SuisseIntl ships all eight weights but only these are in active use.</p>
      </div>

      <div class="grid gap-4 px-6 text-xs text-toned font-mono" style="grid-template-columns: 7rem 3.5rem 6rem 1fr">
        <span>Class</span>
        <span>Value</span>
        <span>Name</span>
        <span>Use case</span>
      </div>

      <div class="rounded-xl border border-muted overflow-hidden divide-y divide-muted">
        <div
          v-for="w in weights"
          :key="w.class"
          class="grid gap-4 px-6 py-6 bg-muted hover:bg-elevated transition-colors items-center"
          style="grid-template-columns: 7rem 3.5rem 6rem 1fr"
        >
          <span class="font-mono text-xs text-highlighted">{{ w.class }}</span>
          <span class="font-mono text-xs text-toned">{{ w.value }}</span>
          <span class="font-mono text-xs text-toned">{{ w.name }}</span>
          <span :class="[w.class, 'text-sm text-default']">{{ w.uses }}</span>
        </div>
      </div>
    </div>

    <USeparator />

    <!-- ── Semantic Text Tokens ────────────────────────────── -->
    <div class="space-y-4">
      <div class="space-y-1">
        <h2 class="text-base font-semibold text-default">Semantic Text Colour Tokens</h2>
        <p class="text-sm text-toned">Use these tokens to set text colour — never use raw palette classes like <span class="font-mono bg-elevated px-1 rounded text-xs">text-lightgrey-900</span> directly. Full token values are documented on the <NuxtLink to="/components/tokens" class="text-royalblue-500 hover:underline">Tokens</NuxtLink> page.</p>
      </div>

      <div class="grid gap-4 px-6 text-xs text-toned font-mono" style="grid-template-columns: 10rem 1fr">
        <span>Class</span>
        <span>Use case</span>
      </div>

      <div class="rounded-xl border border-muted overflow-hidden divide-y divide-muted">
        <div class="grid gap-4 px-6 py-6 bg-muted hover:bg-elevated transition-colors items-center" style="grid-template-columns: 10rem 1fr">
          <span class="font-mono text-xs text-highlighted">text-default</span>
          <span class="text-sm text-default">Primary readable text — headings, body copy, strong labels</span>
        </div>
        <div class="grid gap-4 px-6 py-6 bg-muted hover:bg-elevated transition-colors items-center" style="grid-template-columns: 10rem 1fr">
          <span class="font-mono text-xs text-highlighted">text-toned</span>
          <span class="text-sm text-toned">Secondary text — descriptions, supporting copy, timestamps</span>
        </div>
        <div class="grid gap-4 px-6 py-6 bg-muted hover:bg-elevated transition-colors items-center" style="grid-template-columns: 10rem 1fr">
          <span class="font-mono text-xs text-highlighted">text-muted</span>
          <span class="text-sm text-muted">Tertiary text — placeholders, hint text, disabled labels</span>
        </div>
        <div class="grid gap-4 px-6 py-6 bg-muted hover:bg-elevated transition-colors items-center" style="grid-template-columns: 10rem 1fr">
          <span class="font-mono text-xs text-highlighted">text-dimmed</span>
          <span class="text-sm text-dimmed">Lowest emphasis — watermarks, decorative labels</span>
        </div>
        <div class="grid gap-4 px-6 py-6 bg-muted hover:bg-elevated transition-colors items-center" style="grid-template-columns: 10rem 1fr">
          <span class="font-mono text-xs text-highlighted">text-highlighted</span>
          <span class="text-sm text-highlighted">Brand accent — active states, links, icon labels (royalblue-500)</span>
        </div>
        <div class="grid gap-4 px-6 py-6 bg-muted hover:bg-elevated transition-colors items-center" style="grid-template-columns: 10rem 1fr">
          <div class="font-mono text-xs text-highlighted">text-inverted</div>
          <div class="inline-flex">
            <span class="text-sm text-inverted bg-lightgrey-900 px-2 py-0.5 rounded">Text on dark backgrounds only</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
