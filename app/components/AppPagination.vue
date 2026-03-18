<script setup lang="ts">
/**
 * AppPagination — WLTH standard pagination control.
 *
 * Left: dot indicators — active dot (primary/royalblue) marks the current page.
 * Right: outline prev/next circle buttons (secondary).
 *        When showNumbers is true, numbered circle buttons appear between prev/next.
 *
 * Props:
 *   total        — total number of pages
 *   size         — 'xs' | 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
 *   loading      — show skeleton state
 *   showNumbers  — show numbered page buttons alongside the dots
 *
 * v-model:
 *   page         — current page (1-based)
 */

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const props = defineProps<{
  total: number
  size?: Size
  loading?: boolean
  showNumbers?: boolean
}>()

const page = defineModel<number>('page', { default: 1 })

const resolvedSize = computed<Size>(() => props.size ?? 'md')

// Show at most 5 page numbers in blocks of 5 (1–5, 6–10, 11–15, …)
// The block shifts automatically to always include the current page.
const visiblePages = computed(() => {
  const blockStart = Math.floor((page.value - 1) / 5) * 5 + 1
  const blockEnd = Math.min(blockStart + 4, props.total)
  return Array.from({ length: blockEnd - blockStart + 1 }, (_, i) => blockStart + i)
})

const blockStart = computed(() => visiblePages.value[0])
const blockEnd   = computed(() => visiblePages.value[visiblePages.value.length - 1])

// Jump to previous / next block
function jumpBack()    { page.value = Math.max(1, blockStart.value - 5) }
function jumpForward() { page.value = Math.min(props.total, blockEnd.value + 1) }

// Dimensions for custom number buttons — must be equal w/h for a perfect circle
const numBtnClass = computed(() => {
  const map: Record<Size, string> = {
    xs: 'w-5 h-5 text-[10px]',
    sm: 'w-6 h-6 text-xs',
    md: 'w-7 h-7 text-xs',
    lg: 'w-8 h-8 text-sm',
    xl: 'w-9 h-9 text-sm',
  }
  return map[resolvedSize.value]
})

// Skeleton circle size matches number button size
const skeletonBtnClass = computed(() => {
  const map: Record<Size, string> = {
    xs: 'w-5 h-5',
    sm: 'w-6 h-6',
    md: 'w-7 h-7',
    lg: 'w-8 h-8',
    xl: 'w-9 h-9',
  }
  return map[resolvedSize.value]
})
</script>

<template>
  <div>

    <!-- Skeleton -->
    <template v-if="loading">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center gap-1.5">
          <div
            v-for="i in 4"
            :key="i"
            class="h-1.5 w-1.5 rounded-full bg-lightgrey-400 dark:bg-lightgrey-600 animate-pulse"
            :style="{ animationDelay: `${i * 80}ms` }"
          />
        </div>
        <div class="flex gap-2">
          <div :class="[skeletonBtnClass, 'rounded-full bg-lightgrey-400 dark:bg-lightgrey-600 animate-pulse']" />
          <div :class="[skeletonBtnClass, 'rounded-full bg-lightgrey-400 dark:bg-lightgrey-600 animate-pulse']" style="animation-delay: 80ms" />
        </div>
      </div>
    </template>

    <!-- Real pagination -->
    <template v-else>
      <div class="flex items-center justify-between gap-4 w-full">

        <!-- Left: dots always visible -->
        <div class="flex items-center gap-1.5">
          <button
            v-for="i in total"
            :key="i"
            type="button"
            class="rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royalblue-300"
            :class="i === page
              ? 'w-4 h-1.5 bg-royalblue-500'
              : 'w-1.5 h-1.5 bg-lightgrey-700 hover:bg-lightgrey-600'"
            :aria-label="`Go to page ${i}`"
            @click="page = i"
          />
        </div>

        <!-- Right: prev/next + optional numbered buttons, all circles -->
        <div class="flex items-center gap-1">
          <UButton
            :size="resolvedSize"
            color="secondary"
            variant="outline"
            icon="i-lucide-chevron-left"
            :disabled="page <= 1"
            aria-label="Previous page"
            square
            class="rounded-full!"
            @click="page > 1 && page--"
          />

          <template v-if="showNumbers">
            <!-- Jump to previous block -->
            <button
              v-if="blockStart > 1"
              type="button"
              :class="[numBtnClass, 'flex items-center justify-center rounded-full border border-darkblue-300 text-darkblue-600 transition-colors cursor-pointer hover:bg-darkblue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royalblue-300']"
              aria-label="Jump to previous pages"
              @click="jumpBack"
            >
              …
            </button>

            <button
              v-for="i in visiblePages"
              :key="i"
              type="button"
              class="flex items-center justify-center rounded-full border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royalblue-300"
              :class="[
                numBtnClass,
                i === page
                  ? 'bg-royalblue-500 text-white border-royalblue-500'
                  : 'text-darkblue-600 border-darkblue-300 hover:bg-darkblue-50'
              ]"
              :aria-label="`Go to page ${i}`"
              @click="page = i"
            >
              {{ i }}
            </button>

            <!-- Jump to next block -->
            <button
              v-if="blockEnd < total"
              type="button"
              :class="[numBtnClass, 'flex items-center justify-center rounded-full border border-darkblue-300 text-darkblue-600 transition-colors cursor-pointer hover:bg-darkblue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royalblue-300']"
              aria-label="Jump to next pages"
              @click="jumpForward"
            >
              …
            </button>
          </template>

          <UButton
            :size="resolvedSize"
            color="secondary"
            variant="outline"
            icon="i-lucide-chevron-right"
            :disabled="page >= total"
            aria-label="Next page"
            square
            class="rounded-full!"
            @click="page < total && page++"
          />
        </div>

      </div>
    </template>

  </div>
</template>
