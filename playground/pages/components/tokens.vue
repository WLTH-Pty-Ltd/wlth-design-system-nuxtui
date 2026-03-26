<script setup lang="ts">
import tokensCSS from '../../../assets/css/tokens.css?raw'

definePageMeta({ layout: 'docs' })

// ---------------------------------------------------------------------------
// Parse tokens.css at import time (Vite ?raw → HMR on save)
// ---------------------------------------------------------------------------

/** Extract all --color-*: #hex pairs from the entire CSS source */
function buildPaletteMap(css: string): Record<string, string> {
  const map: Record<string, string> = {}
  const re = /(--color-[\w-]+)\s*:\s*(#[0-9a-fA-F]{3,8})/g
  let m
  while ((m = re.exec(css)) !== null) {
    map[m[1]] = m[2]
  }
  return map
}

/** Extract the content of a CSS block matching a given selector string */
function extractBlock(css: string, selector: string): string {
  const idx = css.indexOf(selector)
  if (idx === -1) return ''
  const start = css.indexOf('{', idx)
  if (start === -1) return ''
  let depth = 0
  let end = start
  for (let i = start; i < css.length; i++) {
    if (css[i] === '{') depth++
    else if (css[i] === '}') { depth--; if (depth === 0) { end = i; break } }
  }
  return css.slice(start + 1, end)
}

/** Parse --ui-* declarations from a block into { name → rawValue } */
function parseUiVars(block: string): Record<string, string> {
  const map: Record<string, string> = {}
  const re = /(--ui-[\w-]+)\s*:\s*([^;]+);/g
  let m
  while ((m = re.exec(block)) !== null) {
    map[m[1].trim()] = m[2].trim()
  }
  return map
}

/** Resolve a raw CSS value to { alias, hex } using the palette map */
function resolve(raw: string, palette: Record<string, string>): { alias: string; hex: string } {
  const varMatch = raw.match(/var\((--color-([\w-]+))\)/)
  if (varMatch) {
    const cssVar = varMatch[1]   // e.g. --color-lightgrey-700
    const alias  = varMatch[2]   // e.g. lightgrey-700
    return { alias, hex: palette[cssVar] ?? '' }
  }
  // Raw hex
  if (raw.startsWith('#')) {
    return { alias: raw === '#ffffff' ? 'white' : raw, hex: raw }
  }
  return { alias: raw, hex: '' }
}

const GROUPS: { label: string; prefix: string }[] = [
  { label: 'Backgrounds', prefix: '--ui-bg' },
  { label: 'Text',        prefix: '--ui-text' },
  { label: 'Borders',     prefix: '--ui-border' },
]

function parseTokens(css: string) {
  const palette = buildPaletteMap(css)

  const allRootBlocks: string[] = []
  const rootRe = /:root\s*\{/g
  let rm
  while ((rm = rootRe.exec(css)) !== null) {
    const start = rm.index + rm[0].length - 1
    let depth = 0, end = start
    for (let i = start; i < css.length; i++) {
      if (css[i] === '{') depth++
      else if (css[i] === '}') { depth--; if (depth === 0) { end = i; break } }
    }
    allRootBlocks.push(css.slice(start + 1, end))
  }
  const uiRootBlock = allRootBlocks.find(b => b.includes('--ui-')) ?? ''
  const lightVars = parseUiVars(uiRootBlock)

  const darkBlock = extractBlock(css, '.dark')
  const darkVars  = parseUiVars(darkBlock)

  return GROUPS.map(({ label, prefix }) => {
    const tokenNames = Object.keys(lightVars).filter(k => k.startsWith(prefix))
    return {
      label,
      tokens: tokenNames.map(name => ({
        name,
        light: resolve(lightVars[name],            palette),
        dark:  resolve(darkVars[name] ?? lightVars[name], palette),
      })),
    }
  })
}

const semanticTokenGroups = parseTokens(tokensCSS)

// ---------------------------------------------------------------------------
// Static token data
// ---------------------------------------------------------------------------

const radiusTokens = [
  { token: '--ui-radius-xs',   value: '0.25rem',  px: '4px',    note: 'Tightest corner — checkboxes, small chips, badges' },
  { token: '--ui-radius-sm',   value: '0.5rem',   px: '8px',    note: 'Compact — tags, inline elements' },
  { token: '--ui-radius-md',   value: '0.75rem',  px: '12px',   note: 'Default input and button corner' },
  { token: '--ui-radius-lg',   value: '1rem',     px: '16px',   note: 'Cards, table containers' },
  { token: '--ui-radius-xl',   value: '1.25rem',  px: '20px',   note: 'Panels, dropdown menus' },
  { token: '--ui-radius-2xl',  value: '1.5rem',   px: '24px',   note: 'Modals, large surface containers' },
  { token: '--ui-radius-3xl',  value: '2rem',     px: '32px',   note: 'Slideovers, drawers (--ui-radius default)' },
  { token: '--ui-radius-full', value: '9999px',   px: '9999px', note: 'Pills, avatar chips, circular buttons' },
]

const shadowTokens = [
  { token: '--ui-shadow-sm',  uses: 'Subtle lift — chips, small UI elements, secondary cards' },
  { token: '--ui-shadow-md',  uses: 'Medium depth — dropdown menus, select panels' },
  { token: '--ui-shadow-lg',  uses: 'Prominent depth — popovers, date pickers, floating toolbars' },
  { token: '--ui-shadow-xl',  uses: 'Strong lift — modals, slideovers, drawers' },
  { token: '--ui-shadow-2xl', uses: 'Maximum depth — fullscreen overlays, command palettes' },
]

const zIndexTokens = [
  { token: '--ui-z-base',     value: '0',   uses: 'Default document flow' },
  { token: '--ui-z-raised',   value: '10',  uses: 'Slightly elevated — sticky table headers, floating labels' },
  { token: '--ui-z-dropdown', value: '100', uses: 'Dropdown menus, select panels, autocomplete' },
  { token: '--ui-z-sticky',   value: '200', uses: 'Sticky page headers, pinned sidebars' },
  { token: '--ui-z-overlay',  value: '300', uses: 'Overlay/backdrop behind modals' },
  { token: '--ui-z-modal',    value: '400', uses: 'Modals, slideovers, drawers' },
  { token: '--ui-z-toast',    value: '500', uses: 'Toast notifications' },
  { token: '--ui-z-tooltip',  value: '600', uses: 'Tooltips — always on top of everything' },
]

const spacingTokens = [
  { step: '0',  rem: '0',       px: '0' },
  { step: '1',  rem: '0.25rem', px: '4px' },
  { step: '2',  rem: '0.5rem',  px: '8px' },
  { step: '3',  rem: '0.75rem', px: '12px' },
  { step: '4',  rem: '1rem',    px: '16px' },
  { step: '5',  rem: '1.25rem', px: '20px' },
  { step: '6',  rem: '1.5rem',  px: '24px' },
  { step: '7',  rem: '1.75rem', px: '28px' },
  { step: '8',  rem: '2rem',    px: '32px' },
  { step: '9',  rem: '2.25rem', px: '36px' },
  { step: '10', rem: '2.5rem',  px: '40px' },
  { step: '12', rem: '3rem',    px: '48px' },
  { step: '14', rem: '3.5rem',  px: '56px' },
  { step: '16', rem: '4rem',    px: '64px' },
  { step: '20', rem: '5rem',    px: '80px' },
  { step: '24', rem: '6rem',    px: '96px' },
]
</script>

<template>
  <div class="max-w-7xl mx-auto px-10 py-12 space-y-14">

    <div class="space-y-1">
      <h1 class="text-2xl font-semibold text-default">Tokens</h1>
      <p class="text-sm text-toned">Semantic CSS custom properties — use these instead of raw palette values. Covers colour, radius, shadow, z-index, and spacing.</p>
    </div>

    <!-- ── Semantic colour tokens ───────────────────────────── -->
    <div class="space-y-10">
      <div v-for="group in semanticTokenGroups" :key="group.label" class="space-y-3">
        <h2 class="text-base font-semibold text-default">{{ group.label }}</h2>

        <div class="grid items-center gap-4 px-1 text-xs text-toned font-mono" style="grid-template-columns: 2rem 14rem 1fr 1fr">
          <span />
          <span>Token</span>
          <span>Light</span>
          <span>Dark</span>
        </div>

        <div class="rounded-xl border border-muted overflow-hidden divide-y divide-muted">
          <div
            v-for="token in group.tokens"
            :key="token.name"
            class="grid items-center gap-4 px-4 py-3 bg-muted hover:bg-elevated transition-colors"
            style="grid-template-columns: 2rem 14rem 1fr 1fr"
          >
            <div
              class="w-7 h-7 rounded-md border border-muted shrink-0"
              :style="{ backgroundColor: `var(${token.name})` }"
            />
            <span class="font-mono text-xs text-highlighted truncate">{{ token.name }}</span>
            <div class="flex items-center gap-2 min-w-0">
              <div class="w-5 h-5 rounded shrink-0 border border-muted" :style="{ backgroundColor: token.light.hex }" />
              <div class="min-w-0">
                <p class="font-mono text-xs text-default truncate">{{ token.light.hex }}</p>
                <p class="font-mono text-[10px] text-toned truncate">{{ token.light.alias }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2 min-w-0">
              <div class="w-5 h-5 rounded shrink-0 border border-muted" :style="{ backgroundColor: token.dark.hex }" />
              <div class="min-w-0">
                <p class="font-mono text-xs text-default truncate">{{ token.dark.hex }}</p>
                <p class="font-mono text-[10px] text-toned truncate">{{ token.dark.alias }}</p>
              </div>
            </div>
          </div>
        </div>

        <USeparator v-if="group.label !== 'Borders'" />
      </div>
    </div>

    <USeparator />

    <!-- ── Border Radius ────────────────────────────────────── -->
    <div class="space-y-4">
      <div class="space-y-1">
        <h2 class="text-base font-semibold text-default">Border Radius</h2>
        <p class="text-sm text-toned">Defined in <code class="font-mono text-xs bg-elevated px-1.5 py-0.5 rounded">tokens.css</code> and mapped to <code class="font-mono text-xs bg-elevated px-1.5 py-0.5 rounded">--ui-radius-*</code>. Use Tailwind's <code class="font-mono text-xs bg-elevated px-1.5 py-0.5 rounded">rounded-*</code> utilities or reference the CSS variable directly.</p>
      </div>

      <div class="grid gap-4 px-1 text-xs text-toned font-mono" style="grid-template-columns: 12rem 5rem 5rem 2.5rem 1fr">
        <span>Token</span>
        <span>Value</span>
        <span>px</span>
        <span>Preview</span>
        <span>Use case</span>
      </div>

      <div class="rounded-xl border border-muted overflow-hidden divide-y divide-muted">
        <div
          v-for="r in radiusTokens"
          :key="r.token"
          class="grid items-center gap-4 px-4 py-3 bg-muted hover:bg-elevated transition-colors"
          style="grid-template-columns: 12rem 5rem 5rem 2.5rem 1fr"
        >
          <span class="font-mono text-xs text-highlighted">{{ r.token }}</span>
          <span class="font-mono text-xs text-toned">{{ r.value }}</span>
          <span class="font-mono text-xs text-toned">{{ r.px }}</span>
          <div
            class="w-7 h-7 bg-royalblue-500 shrink-0"
            :style="{ borderRadius: `var(${r.token})` }"
          />
          <span class="text-xs text-toned">{{ r.note }}</span>
        </div>
      </div>
    </div>

    <USeparator />

    <!-- ── Shadows ───────────────────────────────────────────── -->
    <div class="space-y-4">
      <div class="space-y-1">
        <h2 class="text-base font-semibold text-default">Shadows</h2>
        <p class="text-sm text-toned">Defined as <code class="font-mono text-xs bg-elevated px-1.5 py-0.5 rounded">--ui-shadow-*</code> in <code class="font-mono text-xs bg-elevated px-1.5 py-0.5 rounded">tokens.css</code>. Use via <code class="font-mono text-xs bg-elevated px-1.5 py-0.5 rounded">box-shadow: var(--ui-shadow-xl)</code> or Tailwind's <code class="font-mono text-xs bg-elevated px-1.5 py-0.5 rounded">shadow-*</code> utilities for rough equivalents.</p>
      </div>

      <div class="rounded-xl border border-muted overflow-hidden divide-y divide-muted">
        <div
          v-for="s in shadowTokens"
          :key="s.token"
          class="grid items-center gap-6 px-4 py-4 bg-muted hover:bg-elevated transition-colors"
          style="grid-template-columns: 12rem 6rem 1fr"
        >
          <span class="font-mono text-xs text-highlighted">{{ s.token }}</span>
          <div class="w-16 h-14 bg-elevated rounded-lg flex items-center justify-center shrink-0">
            <div
              class="w-9 h-9 rounded-xl bg-white"
              :style="{ boxShadow: `var(${s.token})` }"
            />
          </div>
          <span class="text-xs text-toned">{{ s.uses }}</span>
        </div>
      </div>
    </div>

    <USeparator />

    <!-- ── Z-index ───────────────────────────────────────────── -->
    <div class="space-y-4">
      <div class="space-y-1">
        <h2 class="text-base font-semibold text-default">Z-Index</h2>
        <p class="text-sm text-toned">Semantic layer scale defined as <code class="font-mono text-xs bg-elevated px-1.5 py-0.5 rounded">--ui-z-*</code>. Always reference these tokens instead of arbitrary numeric z-index values to keep stacking order consistent.</p>
      </div>

      <div class="grid gap-4 px-1 text-xs text-toned font-mono" style="grid-template-columns: 12rem 5rem 1fr">
        <span>Token</span>
        <span>Value</span>
        <span>Use case</span>
      </div>

      <div class="rounded-xl border border-muted overflow-hidden divide-y divide-muted">
        <div
          v-for="z in zIndexTokens"
          :key="z.token"
          class="grid items-center gap-4 px-4 py-3 bg-muted hover:bg-elevated transition-colors"
          style="grid-template-columns: 12rem 5rem 1fr"
        >
          <span class="font-mono text-xs text-highlighted">{{ z.token }}</span>
          <span class="font-mono text-xs text-toned">{{ z.value }}</span>
          <span class="text-xs text-toned">{{ z.uses }}</span>
        </div>
      </div>
    </div>

    <USeparator />

    <!-- ── Spacing ───────────────────────────────────────────── -->
    <div class="space-y-4">
      <div class="space-y-1">
        <h2 class="text-base font-semibold text-default">Spacing</h2>
        <p class="text-sm text-toned">All spacing is on a strict 4px grid. Only use these steps for <code class="font-mono text-xs bg-elevated px-1.5 py-0.5 rounded">p-*</code>, <code class="font-mono text-xs bg-elevated px-1.5 py-0.5 rounded">m-*</code>, <code class="font-mono text-xs bg-elevated px-1.5 py-0.5 rounded">gap-*</code>, and sizing utilities — fractional steps (0.5, 1.5, 2.5 etc.) are off-grid and should not be used.</p>
      </div>

      <div class="grid gap-4 px-1 text-xs text-toned font-mono" style="grid-template-columns: 5rem 6rem 5rem 1fr">
        <span>Step</span>
        <span>rem</span>
        <span>px</span>
        <span>Visual</span>
      </div>

      <div class="rounded-xl border border-muted overflow-hidden divide-y divide-muted">
        <div
          v-for="s in spacingTokens"
          :key="s.step"
          class="grid items-center gap-4 px-4 py-2.5 bg-muted hover:bg-elevated transition-colors"
          style="grid-template-columns: 5rem 6rem 5rem 1fr"
        >
          <span class="font-mono text-xs text-highlighted">{{ s.step }}</span>
          <span class="font-mono text-xs text-toned">{{ s.rem }}</span>
          <span class="font-mono text-xs text-toned">{{ s.px }}</span>
          <div
            class="h-3 bg-royalblue-400 rounded-sm shrink-0 max-w-xs"
            :style="{ width: s.px === '0' ? '2px' : s.px }"
          />
        </div>
      </div>
    </div>

  </div>
</template>
