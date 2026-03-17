<script setup lang="ts">
defineProps<{ code: string }>()

const copied = ref(false)

async function copy(code: string) {
  await navigator.clipboard.writeText(code)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div class="relative rounded-xl bg-darkblue-900 overflow-hidden">
    <button
      type="button"
      class="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs text-lightgrey-400 hover:text-white hover:bg-darkblue-700 transition-colors cursor-pointer"
      @click="copy(code)"
    >
      <UIcon :name="copied ? 'i-lucide-check' : 'i-lucide-copy'" class="size-3.5" />
      {{ copied ? 'Copied' : 'Copy' }}
    </button>
    <pre class="p-5 pt-10 text-xs leading-relaxed font-mono text-lightgrey-300 overflow-x-auto">{{ code }}</pre>
  </div>
</template>
