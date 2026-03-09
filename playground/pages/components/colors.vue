<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const colorPalettes = [
  {
    name: 'Royal Blue',
    semantic: 'primary',
    token: 'royalblue',
    shades: [
      { shade: '50', hex: '#eef2ff' },
      { shade: '100', hex: '#d9e2ff' },
      { shade: '200', hex: '#b3c8ff' },
      { shade: '300', hex: '#7fa6f5' },
      { shade: '400', hex: '#4e78e3' },
      { shade: '500', hex: '#1445c7' },
      { shade: '600', hex: '#0f3aa8' },
      { shade: '700', hex: '#0c2e88' },
      { shade: '800', hex: '#09256f' },
      { shade: '900', hex: '#061d59' },
      { shade: '950', hex: '#03133b' }
    ]
  },
  {
    name: 'Dark Blue',
    semantic: 'secondary',
    token: 'darkblue',
    shades: [
      { shade: '50', hex: '#f6f7f8' },
      { shade: '100', hex: '#edeff0' },
      { shade: '200', hex: '#d2d5d8' },
      { shade: '300', hex: '#b5bac0' },
      { shade: '400', hex: '#8e959e' },
      { shade: '500', hex: '#292e3a' },
      { shade: '600', hex: '#1f232d' },
      { shade: '700', hex: '#181c24' },
      { shade: '800', hex: '#10141b' },
      { shade: '900', hex: '#0a0e12' },
      { shade: '950', hex: '#06090d' }
    ]
  },
  {
    name: 'Green',
    semantic: 'success',
    token: 'green',
    shades: [
      { shade: '50', hex: '#e9fbf3' },
      { shade: '100', hex: '#c8f6e1' },
      { shade: '200', hex: '#a2efcb' },
      { shade: '300', hex: '#74e4af' },
      { shade: '400', hex: '#42d992' },
      { shade: '500', hex: '#04ca72' },
      { shade: '600', hex: '#03b667' },
      { shade: '700', hex: '#029e59' },
      { shade: '800', hex: '#02864b' },
      { shade: '900', hex: '#016f3d' },
      { shade: '950', hex: '#005a31' }
    ]
  },
  {
    name: 'Yellow',
    semantic: 'warning',
    token: 'yellow',
    shades: [
      { shade: '50', hex: '#fffbeb' },
      { shade: '100', hex: '#fef3c7' },
      { shade: '200', hex: '#fde68a' },
      { shade: '300', hex: '#fcd34d' },
      { shade: '400', hex: '#fbbf24' },
      { shade: '500', hex: '#f59e0b' },
      { shade: '600', hex: '#d97706' },
      { shade: '700', hex: '#b45309' },
      { shade: '800', hex: '#92400e' },
      { shade: '900', hex: '#78350f' },
      { shade: '950', hex: '#451a03' }
    ]
  },
  {
    name: 'Red',
    semantic: 'error',
    token: 'red',
    shades: [
      { shade: '50', hex: '#fef2f2' },
      { shade: '100', hex: '#fee2e2' },
      { shade: '200', hex: '#fecaca' },
      { shade: '300', hex: '#fca5a5' },
      { shade: '400', hex: '#f87171' },
      { shade: '500', hex: '#ef4444' },
      { shade: '600', hex: '#dc2626' },
      { shade: '700', hex: '#b91c1c' },
      { shade: '800', hex: '#991b1b' },
      { shade: '900', hex: '#7f1d1d' },
      { shade: '950', hex: '#450a0a' }
    ]
  },
  {
    name: 'Light Grey',
    semantic: 'neutral / info',
    token: 'lightgrey',
    shades: [
      { shade: '50', hex: '#ffffff' },
      { shade: '100', hex: '#f7f8f8' },
      { shade: '200', hex: '#f4f4f4' },
      { shade: '300', hex: '#eceff0' },
      { shade: '400', hex: '#dde2e3' },
      { shade: '500', hex: '#ccd3d5' },
      { shade: '600', hex: '#b8c5ca' },
      { shade: '700', hex: '#8d9aa1' },
      { shade: '800', hex: '#7a8890' },
      { shade: '900', hex: '#4c5a68' },
      { shade: '950', hex: '#292e3a' }
    ]
  }
]

function swatchTextColor(shadeIndex: number): string {
  return shadeIndex >= 5 ? '#ffffff' : '#1a1a1a'
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-10 py-12 space-y-14">

    <div class="space-y-1">
      <h1 class="text-2xl font-semibold text-default">Colors</h1>
      <p class="text-sm text-toned">WLTH brand color palettes — 6 scales, 11 shades each, mapped to semantic roles.</p>
    </div>

    <div class="space-y-10">
      <div v-for="palette in colorPalettes" :key="palette.token" class="space-y-3">
        <div class="flex items-baseline gap-3">
          <p class="text-sm font-semibold text-default">{{ palette.name }}</p>
          <UBadge variant="subtle" color="neutral" size="xs" :label="palette.semantic" />
          <span class="text-xs text-toned font-mono">--color-{{ palette.token }}-*</span>
        </div>
        <div class="flex gap-1 flex-wrap">
          <div
            v-for="(swatch, i) in palette.shades"
            :key="swatch.shade"
            class="flex flex-col rounded-md overflow-hidden"
            style="width: 72px"
          >
            <div
              class="h-12 flex items-end justify-start px-1.5 pb-1"
              :style="{ backgroundColor: swatch.hex, color: swatchTextColor(i) }"
            >
              <span class="text-[10px] font-mono font-semibold leading-none opacity-80">{{ swatch.shade }}</span>
            </div>
            <div class="px-1.5 py-1 bg-muted border border-muted border-t-0 rounded-b-md">
              <p class="text-[9px] font-mono text-toned leading-tight">{{ swatch.hex }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
