<script setup lang="ts">
interface Option {
  label: string
  value: string
}

const props = withDefaults(defineProps<{
  options: (string | Option)[]
  modelValue?: string
  variant?: 'default' | 'primary' | 'secondary' | 'ghost'
  size?: 'xs' | 'sm' | 'md' | 'lg'
}>(), {
  variant: 'default',
  size: 'sm',
})

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const normalised = computed(() =>
  props.options.slice(0, 10).map(o => typeof o === 'string' ? { label: o, value: o } : o)
)

const containerClass = computed(() => ({
  default:   'bg-muted',
  primary:   'bg-muted',
  secondary: 'bg-muted',
  ghost:     'bg-white/10',
}[props.variant]))

function pillClass(value: string) {
  const isActive = value === props.modelValue
  const variants = {
    // Light background — neutral active pill
    default:   isActive ? 'bg-white text-default shadow-sm'      : 'text-toned hover:text-default',
    // Light background — brand colour active pill
    primary:   isActive ? 'bg-royalblue-500 text-white shadow-sm' : 'text-toned hover:text-default',
    secondary: isActive ? 'bg-darkblue-800 text-white shadow-sm'  : 'text-toned hover:text-default',
    // Coloured background — solid white pill for clear contrast
    ghost:     isActive ? 'bg-white text-default shadow-sm'      : 'text-white/70 hover:text-white',
  }
  return variants[props.variant]
}

const sizeClass = computed(() => ({
  xs: 'px-2.5 py-0.5 text-xs',
  sm: 'px-3 py-1 text-xs',
  md: 'px-3.5 py-1.5 text-sm',
  lg: 'px-4 py-2 text-sm',
}[props.size]))
</script>

<template>
  <div class="inline-flex items-center gap-0.5 rounded-full p-0.5" :class="containerClass">
    <button
      v-for="opt in normalised"
      :key="opt.value"
      type="button"
      class="rounded-full font-medium transition-colors cursor-pointer"
      :class="[sizeClass, pillClass(opt.value)]"
      @click="emit('update:modelValue', opt.value)"
    >{{ opt.label }}</button>
  </div>
</template>
