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

  // Light: last :root block that has --ui-* vars (skip the palette :root)
  // Strategy: find all :root blocks, use the one(s) that contain --ui-
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
</script>

<template>
  <div class="max-w-7xl mx-auto px-10 py-12 space-y-14">

    <div class="space-y-1">
      <h1 class="text-2xl font-semibold text-default">Tokens</h1>
      <p class="text-sm text-toned">Semantic CSS custom properties — backgrounds, text, and borders for light and dark mode.</p>
    </div>

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

  </div>
</template>
