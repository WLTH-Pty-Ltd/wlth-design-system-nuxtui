/**
 * Generates playground/assets/icon-categories.json
 *
 * Fetches per-icon metadata from the Lucide GitHub repo and builds a map of
 * { category: [iconName, ...] }. Run with:
 *
 *   node scripts/generate-icon-categories.mjs
 *
 * Set GITHUB_TOKEN env var to avoid GitHub rate limits (60 req/hr anonymous).
 * The script batches requests 20 at a time so it stays well within limits.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const iconsData = JSON.parse(
  readFileSync(resolve(ROOT, 'node_modules/@iconify-json/lucide/icons.json'), 'utf8')
)
const iconNames = Object.keys(iconsData.icons).sort()

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const headers = {
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'wlth-design-system',
  ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
}

const BASE_URL = 'https://raw.githubusercontent.com/lucide-icons/lucide/main/icons'

async function fetchIconMeta(name) {
  const url = `${BASE_URL}/${name}.json`
  const res = await fetch(url, { headers })
  if (!res.ok) return null
  return res.json()
}

async function fetchBatch(names) {
  return Promise.all(names.map(async (name) => {
    const meta = await fetchIconMeta(name)
    return { name, categories: meta?.categories ?? [] }
  }))
}

const BATCH_SIZE = 20
const categoryMap = {}
let done = 0

console.log(`Fetching metadata for ${iconNames.length} icons in batches of ${BATCH_SIZE}…`)

for (let i = 0; i < iconNames.length; i += BATCH_SIZE) {
  const batch = iconNames.slice(i, i + BATCH_SIZE)
  const results = await fetchBatch(batch)

  for (const { name, categories } of results) {
    for (const cat of categories) {
      if (!categoryMap[cat]) categoryMap[cat] = []
      categoryMap[cat].push(name)
    }
  }

  done += batch.length
  process.stdout.write(`\r  ${done}/${iconNames.length}`)
}

console.log('\nDone.')

// Sort categories alphabetically, and icons within each category
const sorted = Object.fromEntries(
  Object.entries(categoryMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([cat, icons]) => [cat, icons.sort()])
)

const outDir = resolve(ROOT, 'playground/assets')
mkdirSync(outDir, { recursive: true })
const outPath = resolve(outDir, 'icon-categories.json')
writeFileSync(outPath, JSON.stringify(sorted, null, 2))

const catCount = Object.keys(sorted).length
const iconsCategorised = new Set(Object.values(sorted).flat()).size
console.log(`Wrote ${catCount} categories covering ${iconsCategorised} icons → ${outPath}`)
