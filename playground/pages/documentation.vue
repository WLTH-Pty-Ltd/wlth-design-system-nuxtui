<script setup lang="ts">
import { useToast } from '#imports'

const toast = useToast()

const colors = ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'neutral']
const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
const buttonVariants = ['solid', 'outline', 'ghost', 'subtle', 'soft', 'link']
const badgeVariants = ['solid', 'subtle', 'outline', 'soft']
const alertVariants = ['solid', 'subtle', 'outline', 'soft']

// Button
const buttonColor = ref('primary')
const buttonSize = ref('md')
const buttonVariant = ref('solid')

// Badge
const badgeColor = ref('primary')
const badgeSize = ref('md')
const badgeVariant = ref('subtle')

// Chip
const chipColor = ref('primary')
const chipSize = ref('md')

// Alert
const alertColor = ref('primary')
const alertVariant = ref('subtle')

// Input
const inputColor = ref('primary')
const inputSize = ref('md')
const inputValue = ref('')

// Textarea
const textareaColor = ref('primary')
const textareaSize = ref('md')
const textareaValue = ref('')

// Select
const selectColor = ref('primary')
const selectSize = ref('md')
const selectValue = ref('')
const selectItems = ['Option A', 'Option B', 'Option C', 'Option D']

// Checkbox
const checkboxColor = ref('primary')
const checkboxSize = ref('md')

// Radio
const radioColor = ref('primary')
const radioSize = ref('md')
const radioValue = ref('option-a')
const radioItems = [
  { label: 'Option A', value: 'option-a' },
  { label: 'Option B', value: 'option-b' },
  { label: 'Option C', value: 'option-c' }
]

// Switch
const switchColor = ref('primary')
const switchSize = ref('md')
const switchValue = ref(false)

// Slider
const sliderColor = ref('primary')
const sliderSize = ref('md')
const sliderValue = ref(50)

// Phone (AU)
const phoneValue = ref('')
const phoneError = computed(() => {
  if (!phoneValue.value) return ''
  const stripped = phoneValue.value.replace(/[\s\-]/g, '')
  return /^04\d{8}$/.test(stripped) ? '' : 'Enter a valid Australian mobile number (04XX XXX XXX)'
})

// Progress
const progressColor = ref('primary')
const progressSize = ref('md')
const progressValue = ref(65)

// Avatar
const avatarSize = ref('md')

// Pagination
const paginationPage = ref(3)
const paginationColor = ref('primary')
const paginationSize = ref('md')

// Demo Tabs (inside Navigation section)
const tabsColor = ref('primary')
const tabsSize = ref('md')
const tabsVariant = ref('pill')
const demoTabItems = [
  { label: 'Tab One', value: 'one' },
  { label: 'Tab Two', value: 'two' },
  { label: 'Tab Three', value: 'three' }
]

// Accordion
const accordionItems = [
  { value: 'q1', label: 'What is Nuxt UI?', content: 'Nuxt UI is a comprehensive UI component library for Nuxt 3 and 4, built on top of Reka UI and Tailwind CSS.' },
  { value: 'q2', label: 'How does theming work?', content: 'Theming is handled via CSS custom properties defined in @theme blocks and mapped to semantic color tokens in app.config.ts.' },
  { value: 'q3', label: 'Can I customise components?', content: 'Yes — every component accepts a `ui` prop for fine-grained style overrides using Tailwind Variants.' }
]

// Overlays
const modalOpen = ref(false)
const slideoverOpen = ref(false)
const dropdownItems = [[
  { label: 'Edit', icon: 'i-lucide-pencil' },
  { label: 'Duplicate', icon: 'i-lucide-copy' }
], [
  { label: 'Delete', icon: 'i-lucide-trash', color: 'error' as const }
]]

// Toast
const toastColor = ref('primary')
function fireToast() {
  toast.add({
    title: 'Toast notification',
    description: `This is a ${toastColor.value} toast.`,
    color: toastColor.value as 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral'
  })
}

// Table — Nuxt UI v4 uses `data` + accessorKey/header format
const tableColumns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'role', header: 'Role' },
  { accessorKey: 'status', header: 'Status' }
]
const tableData = [
  { id: 1, name: 'Alice Martin', role: 'Designer', status: 'Active' },
  { id: 2, name: 'Bob Chen', role: 'Engineer', status: 'Active' },
  { id: 3, name: 'Carol White', role: 'Product', status: 'Inactive' }
]

// Color palettes — mirrors @theme static in main.css
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

// Returns white text for dark swatches, dark text for light ones
function swatchTextColor(shadeIndex: number): string {
  return shadeIndex >= 5 ? '#ffffff' : '#1a1a1a'
}

// Page tabs — `slot` must match the template slot name used below
const tabCategories = [
  { label: 'Setup', value: 'setup', slot: 'content-setup' },
  { label: 'Actions', value: 'actions', slot: 'content-actions' },
  { label: 'Forms', value: 'forms', slot: 'content-forms' },
  { label: 'Feedback', value: 'feedback', slot: 'content-feedback' },
  { label: 'Overlays', value: 'overlays', slot: 'content-overlays' },
  { label: 'Navigation', value: 'navigation', slot: 'content-navigation' },
  { label: 'Display', value: 'display', slot: 'content-display' },
  { label: 'Colors', value: 'colors', slot: 'content-colors' },
  { label: 'Tokens', value: 'tokens', slot: 'content-tokens' }
]
const activeTab = ref('setup')

// Semantic token groups — mirrors :root and .dark overrides in main.css
const semanticTokenGroups = [
  {
    label: 'Backgrounds',
    tokens: [
      { name: '--ui-bg',          light: { alias: 'lightgrey-100', hex: '#f7f8f8' }, dark: { alias: 'lightgrey-900', hex: '#4c5a68' } },
      { name: '--ui-bg-muted',    light: { alias: 'lightgrey-50',  hex: '#ffffff'  }, dark: { alias: 'lightgrey-800', hex: '#7a8890' } },
      { name: '--ui-bg-elevated', light: { alias: 'darkblue-400',  hex: '#8e959e'  }, dark: { alias: 'lightgrey-800', hex: '#7a8890' } },
      { name: '--ui-bg-accented', light: { alias: 'lightgrey-200', hex: '#f4f4f4'  }, dark: { alias: 'lightgrey-700', hex: '#8d9aa1' } },
      { name: '--ui-bg-inverted', light: { alias: 'lightgrey-800', hex: '#7a8890'  }, dark: { alias: 'white',         hex: '#ffffff' } }
    ]
  },
  {
    label: 'Text',
    tokens: [
      { name: '--ui-text-dimmed',      light: { alias: 'lightgrey-500', hex: '#ccd3d5' }, dark: { alias: 'lightgrey-500', hex: '#ccd3d5' } },
      { name: '--ui-text-muted',       light: { alias: 'lightgrey-600', hex: '#b8c5ca' }, dark: { alias: 'lightgrey-400', hex: '#dde2e3' } },
      { name: '--ui-text-toned',       light: { alias: 'lightgrey-900', hex: '#4c5a68' }, dark: { alias: 'lightgrey-300', hex: '#eceff0' } },
      { name: '--ui-text',             light: { alias: 'lightgrey-950', hex: '#292e3a' }, dark: { alias: 'lightgrey-200', hex: '#f4f4f4' } },
      { name: '--ui-text-highlighted', light: { alias: 'royalblue-500', hex: '#1445c7' }, dark: { alias: 'white',         hex: '#ffffff' } },
      { name: '--ui-text-inverted',    light: { alias: 'white',         hex: '#ffffff' }, dark: { alias: 'lightgrey-900', hex: '#4c5a68' } }
    ]
  },
  {
    label: 'Borders',
    tokens: [
      { name: '--ui-border',          light: { alias: 'lightgrey-900', hex: '#4c5a68' }, dark: { alias: 'lightgrey-800', hex: '#7a8890' } },
      { name: '--ui-border-muted',    light: { alias: 'lightgrey-600', hex: '#b8c5ca' }, dark: { alias: 'lightgrey-700', hex: '#8d9aa1' } },
      { name: '--ui-border-accented', light: { alias: 'lightgrey-950', hex: '#292e3a' }, dark: { alias: 'lightgrey-700', hex: '#8d9aa1' } },
      { name: '--ui-border-inverted', light: { alias: 'lightgrey-900', hex: '#4c5a68' }, dark: { alias: 'white',         hex: '#ffffff' } }
    ]
  }
]
</script>

<template>
  <UDashboardPanel id="design-system">
    <template #header>
      <UDashboardNavbar title="Design System">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
        <template #right>
          <UColorModeSwitch />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="p-6 space-y-8 max-w-5xl">
        <UTabs v-model="activeTab" :items="tabCategories" color="primary">
          <!-- ============================================================
               ACTIONS TAB
               ============================================================ -->
          <template #content-actions>
            <div class="pt-6 space-y-10">
              <!-- Button -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Button
                </p>
                <div class="flex flex-wrap gap-2 items-center">
                  <USelect
                    v-model="buttonColor"
                    :items="colors"
                    size="xs"
                    class="w-32"
                  />
                  <USelect
                    v-model="buttonVariant"
                    :items="buttonVariants"
                    size="xs"
                    class="w-32"
                  />
                  <USelect
                    v-model="buttonSize"
                    :items="sizes"
                    size="xs"
                    class="w-20"
                  />
                </div>
                <div class="flex flex-wrap gap-2 items-center">
                  <UButton
                    :color="buttonColor"
                    :variant="buttonVariant"
                    :size="buttonSize"
                    label="Button"
                  />
                  <UButton
                    :color="buttonColor"
                    :variant="buttonVariant"
                    :size="buttonSize"
                    label="With icon"
                    icon="i-lucide-star"
                  />
                  <UButton
                    :color="buttonColor"
                    :variant="buttonVariant"
                    :size="buttonSize"
                    icon="i-lucide-star"
                    square
                  />
                  <UButton
                    :color="buttonColor"
                    :variant="buttonVariant"
                    :size="buttonSize"
                    label="Loading"
                    loading
                  />
                  <UButton
                    :color="buttonColor"
                    :variant="buttonVariant"
                    :size="buttonSize"
                    label="Disabled"
                    disabled
                  />
                </div>
              </div>

              <USeparator />

              <!-- Badge -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Badge
                </p>
                <div class="flex flex-wrap gap-2 items-center">
                  <USelect
                    v-model="badgeColor"
                    :items="colors"
                    size="xs"
                    class="w-32"
                  />
                  <USelect
                    v-model="badgeVariant"
                    :items="badgeVariants"
                    size="xs"
                    class="w-32"
                  />
                  <USelect
                    v-model="badgeSize"
                    :items="sizes"
                    size="xs"
                    class="w-20"
                  />
                </div>
                <div class="flex flex-wrap gap-2 items-center">
                  <UBadge
                    :color="badgeColor"
                    :variant="badgeVariant"
                    :size="badgeSize"
                    label="Badge"
                  />
                  <UBadge
                    :color="badgeColor"
                    :variant="badgeVariant"
                    :size="badgeSize"
                    label="With icon"
                    icon="i-lucide-circle-check"
                  />
                  <UBadge
                    :color="badgeColor"
                    :variant="badgeVariant"
                    :size="badgeSize"
                    label="42"
                  />
                </div>
              </div>

              <USeparator />

              <!-- Chip -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Chip
                </p>
                <div class="flex flex-wrap gap-2 items-center">
                  <USelect
                    v-model="chipColor"
                    :items="colors"
                    size="xs"
                    class="w-32"
                  />
                  <USelect
                    v-model="chipSize"
                    :items="sizes"
                    size="xs"
                    class="w-20"
                  />
                </div>
                <div class="flex flex-wrap gap-3 items-center">
                  <UChip :color="chipColor" :size="chipSize">
                    <UButton
                      color="neutral"
                      variant="outline"
                      size="sm"
                      label="Notification"
                    />
                  </UChip>
                  <UChip :color="chipColor" :size="chipSize" text="3">
                    <UAvatar src="https://i.pravatar.cc/40?img=1" size="sm" />
                  </UChip>
                </div>
              </div>

              <USeparator />

              <!-- Kbd -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Kbd
                </p>
                <div class="flex flex-wrap gap-2 items-center">
                  <UKbd>⌘</UKbd>
                  <UKbd>K</UKbd>
                  <span class="text-muted text-sm">or</span>
                  <UKbd>G</UKbd>
                  <UKbd>D</UKbd>
                  <span class="text-muted text-sm">Design System</span>
                </div>
              </div>
            </div>
          </template>

          <!-- ============================================================
               FORMS TAB
               ============================================================ -->
          <template #content-forms>
            <div class="pt-6 space-y-10">
              <!-- Input -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Input
                </p>
                <div class="flex flex-wrap gap-2 items-center">
                  <USelect
                    v-model="inputColor"
                    :items="colors"
                    size="xs"
                    class="w-32"
                  />
                  <USelect
                    v-model="inputSize"
                    :items="sizes"
                    size="xs"
                    class="w-20"
                  />
                </div>
                <div class="flex flex-wrap gap-3 items-start">
                  <UInput
                    v-model="inputValue"
                    :color="inputColor"
                    :size="inputSize"
                    placeholder="Plain input"
                    class="w-52"
                  />
                  <UInput
                    v-model="inputValue"
                    :color="inputColor"
                    :size="inputSize"
                    placeholder="With icon"
                    icon="i-lucide-search"
                    class="w-52"
                  />
                  <UInput
                    v-model="inputValue"
                    :color="inputColor"
                    :size="inputSize"
                    placeholder="Disabled"
                    disabled
                    class="w-52"
                  />
                </div>
              </div>

              <USeparator />

              <!-- Textarea -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Textarea
                </p>
                <div class="flex flex-wrap gap-2 items-center">
                  <USelect
                    v-model="textareaColor"
                    :items="colors"
                    size="xs"
                    class="w-32"
                  />
                  <USelect
                    v-model="textareaSize"
                    :items="sizes"
                    size="xs"
                    class="w-20"
                  />
                </div>
                <UTextarea
                  v-model="textareaValue"
                  :color="textareaColor"
                  :size="textareaSize"
                  placeholder="Enter text..."
                  class="w-full max-w-sm"
                />
              </div>

              <USeparator />

              <!-- Select -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Select
                </p>
                <div class="flex flex-wrap gap-2 items-center">
                  <USelect
                    v-model="selectColor"
                    :items="colors"
                    size="xs"
                    class="w-32"
                  />
                  <USelect
                    v-model="selectSize"
                    :items="sizes"
                    size="xs"
                    class="w-20"
                  />
                </div>
                <USelect
                  v-model="selectValue"
                  :color="selectColor"
                  :size="selectSize"
                  :items="selectItems"
                  placeholder="Choose an option"
                  class="w-52"
                />
              </div>

              <USeparator />

              <!-- Checkbox -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Checkbox
                </p>
                <div class="flex flex-wrap gap-2 items-center">
                  <USelect
                    v-model="checkboxColor"
                    :items="colors"
                    size="xs"
                    class="w-32"
                  />
                  <USelect
                    v-model="checkboxSize"
                    :items="sizes"
                    size="xs"
                    class="w-20"
                  />
                </div>
                <div class="flex flex-wrap gap-4 items-center">
                  <UCheckbox
                    :color="checkboxColor"
                    :size="checkboxSize"
                    label="Unchecked"
                    :default-value="false"
                  />
                  <UCheckbox
                    :color="checkboxColor"
                    :size="checkboxSize"
                    label="Checked"
                    :default-value="true"
                  />
                  <UCheckbox
                    :color="checkboxColor"
                    :size="checkboxSize"
                    label="Disabled"
                    disabled
                  />
                </div>
              </div>

              <USeparator />

              <!-- Radio Group -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Radio Group
                </p>
                <div class="flex flex-wrap gap-2 items-center">
                  <USelect
                    v-model="radioColor"
                    :items="colors"
                    size="xs"
                    class="w-32"
                  />
                  <USelect
                    v-model="radioSize"
                    :items="sizes"
                    size="xs"
                    class="w-20"
                  />
                </div>
                <URadioGroup
                  v-model="radioValue"
                  :color="radioColor"
                  :size="radioSize"
                  :items="radioItems"
                />
              </div>

              <USeparator />

              <!-- Switch -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Switch
                </p>
                <div class="flex flex-wrap gap-2 items-center">
                  <USelect
                    v-model="switchColor"
                    :items="colors"
                    size="xs"
                    class="w-32"
                  />
                  <USelect
                    v-model="switchSize"
                    :items="sizes"
                    size="xs"
                    class="w-20"
                  />
                </div>
                <div class="flex flex-wrap gap-4 items-center">
                  <USwitch
                    v-model="switchValue"
                    :color="switchColor"
                    :size="switchSize"
                    label="Toggle me"
                  />
                  <USwitch
                    :color="switchColor"
                    :size="switchSize"
                    label="Disabled"
                    disabled
                  />
                </div>
              </div>

              <USeparator />

              <!-- Slider -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Slider
                </p>
                <div class="flex flex-wrap gap-2 items-center">
                  <USelect
                    v-model="sliderColor"
                    :items="colors"
                    size="xs"
                    class="w-32"
                  />
                  <USelect
                    v-model="sliderSize"
                    :items="sizes"
                    size="xs"
                    class="w-20"
                  />
                </div>
                <USlider
                  v-model="sliderValue"
                  :color="sliderColor"
                  :size="sliderSize"
                  class="w-64"
                />
              </div>

              <USeparator />

              <!-- Australian Mobile Phone Input -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Phone Number (AU)
                </p>
                <div class="flex flex-wrap gap-6 items-start">
                  <!-- Static default -->
                  <UFormField label="Mobile Number" hint="Enter your 10-digit mobile number">
                    <UButtonGroup class="w-64">
                      <UButton
                        color="neutral"
                        variant="outline"
                        trailing-icon="i-lucide-chevron-down"
                        class="shrink-0"
                      >
                        🇦🇺 +61
                      </UButton>
                      <UInput
                        type="tel"
                        placeholder="04XX XXX XXX"
                        class="flex-1 min-w-0"
                      />
                    </UButtonGroup>
                  </UFormField>

                  <!-- Interactive with live validation -->
                  <UFormField
                    label="Mobile Number"
                    :error="phoneError"
                    :hint="!phoneError ? 'Enter your 10-digit mobile number' : undefined"
                  >
                    <UButtonGroup class="w-64">
                      <UButton
                        color="neutral"
                        variant="outline"
                        trailing-icon="i-lucide-chevron-down"
                        class="shrink-0"
                      >
                        🇦🇺 +61
                      </UButton>
                      <UInput
                        v-model="phoneValue"
                        type="tel"
                        placeholder="04XX XXX XXX"
                        :color="phoneError ? 'error' : 'primary'"
                        class="flex-1 min-w-0"
                      />
                    </UButtonGroup>
                  </UFormField>
                </div>
              </div>
            </div>
          </template>

          <!-- ============================================================
               FEEDBACK TAB
               ============================================================ -->
          <template #content-feedback>
            <div class="pt-6 space-y-10">
              <!-- Alert -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Alert
                </p>
                <div class="flex flex-wrap gap-2 items-center">
                  <USelect
                    v-model="alertColor"
                    :items="colors"
                    size="xs"
                    class="w-32"
                  />
                  <USelect
                    v-model="alertVariant"
                    :items="alertVariants"
                    size="xs"
                    class="w-32"
                  />
                </div>
                <UAlert
                  :color="alertColor"
                  :variant="alertVariant"
                  title="Alert title"
                  description="This is the alert description providing additional context."
                  icon="i-lucide-info"
                  class="max-w-lg"
                />
              </div>

              <USeparator />

              <!-- Toast -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Toast
                </p>
                <div class="flex flex-wrap gap-2 items-center">
                  <USelect
                    v-model="toastColor"
                    :items="colors"
                    size="xs"
                    class="w-32"
                  />
                  <UButton
                    :color="toastColor"
                    variant="outline"
                    size="sm"
                    label="Fire toast"
                    icon="i-lucide-bell"
                    @click="fireToast"
                  />
                </div>
              </div>

              <USeparator />

              <!-- Progress -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Progress
                </p>
                <div class="flex flex-wrap gap-2 items-center">
                  <USelect
                    v-model="progressColor"
                    :items="colors"
                    size="xs"
                    class="w-32"
                  />
                  <USelect
                    v-model="progressSize"
                    :items="sizes"
                    size="xs"
                    class="w-20"
                  />
                </div>
                <UProgress
                  :value="progressValue"
                  :color="progressColor"
                  :size="progressSize"
                  class="w-64"
                />
                <USlider v-model="progressValue" class="w-64" />
              </div>

              <USeparator />

              <!-- Skeleton -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Skeleton
                </p>
                <div class="space-y-2 w-64">
                  <USkeleton class="h-4 w-3/4" />
                  <USkeleton class="h-4 w-full" />
                  <USkeleton class="h-4 w-1/2" />
                  <div class="flex gap-2 items-center pt-1">
                    <USkeleton class="size-8 rounded-full shrink-0" />
                    <USkeleton class="h-4 flex-1" />
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- ============================================================
               OVERLAYS TAB
               ============================================================ -->
          <template #content-overlays>
            <div class="pt-6 space-y-10">
              <!-- Modal -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Modal
                </p>
                <UButton
                  variant="outline"
                  color="neutral"
                  label="Open modal"
                  icon="i-lucide-layout"
                  @click="modalOpen = true"
                />
                <UModal
                  v-model:open="modalOpen"
                  title="Modal title"
                  description="This is the modal description."
                >
                  <template #body>
                    <p class="text-muted text-sm">
                      Modal body content goes here. You can place any components inside.
                    </p>
                  </template>
                  <template #footer>
                    <div class="flex justify-end gap-2">
                      <UButton
                        color="neutral"
                        variant="outline"
                        label="Cancel"
                        @click="modalOpen = false"
                      />
                      <UButton color="primary" label="Confirm" @click="modalOpen = false" />
                    </div>
                  </template>
                </UModal>
              </div>

              <USeparator />

              <!-- Slideover -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Slideover
                </p>
                <UButton
                  variant="outline"
                  color="neutral"
                  label="Open slideover"
                  icon="i-lucide-panel-right"
                  @click="slideoverOpen = true"
                />
                <USlideover
                  v-model:open="slideoverOpen"
                  title="Slideover title"
                  description="Content slides in from the side."
                >
                  <template #body>
                    <p class="text-muted text-sm">
                      Slideover body content. Useful for detail panels and forms.
                    </p>
                  </template>
                </USlideover>
              </div>

              <USeparator />

              <!-- Tooltip -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Tooltip
                </p>
                <div class="flex flex-wrap gap-3">
                  <UTooltip text="This is a tooltip">
                    <UButton color="neutral" variant="outline" label="Hover me" />
                  </UTooltip>
                  <UTooltip text="With shortcut" :shortcuts="['⌘', 'K']">
                    <UButton color="neutral" variant="outline" label="With shortcut" />
                  </UTooltip>
                </div>
              </div>

              <USeparator />

              <!-- Popover -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Popover
                </p>
                <UPopover>
                  <UButton
                    color="neutral"
                    variant="outline"
                    label="Open popover"
                    icon="i-lucide-info"
                  />
                  <template #content>
                    <div class="p-3 space-y-1 max-w-xs">
                      <p class="text-sm font-semibold">
                        Popover heading
                      </p>
                      <p class="text-xs text-muted">
                        This is additional context shown in a floating panel.
                      </p>
                    </div>
                  </template>
                </UPopover>
              </div>

              <USeparator />

              <!-- Dropdown Menu -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Dropdown Menu
                </p>
                <UDropdownMenu :items="dropdownItems">
                  <UButton
                    color="neutral"
                    variant="outline"
                    label="Actions"
                    trailing-icon="i-lucide-chevron-down"
                  />
                </UDropdownMenu>
              </div>
            </div>
          </template>

          <!-- ============================================================
               NAVIGATION TAB
               ============================================================ -->
          <template #content-navigation>
            <div class="pt-6 space-y-10">
              <!-- Tabs -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Tabs
                </p>
                <div class="flex flex-wrap gap-2 items-center">
                  <USelect
                    v-model="tabsColor"
                    :items="colors"
                    size="xs"
                    class="w-32"
                  />
                  <USelect
                    v-model="tabsSize"
                    :items="sizes"
                    size="xs"
                    class="w-20"
                  />
                  <USelect
                    v-model="tabsVariant"
                    :items="['pill', 'link', 'underline']"
                    size="xs"
                    class="w-28"
                  />
                </div>
                <UTabs
                  :items="demoTabItems"
                  :color="tabsColor"
                  :size="tabsSize"
                  :variant="tabsVariant"
                  class="max-w-sm"
                />
              </div>

              <USeparator />

              <!-- Breadcrumb -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Breadcrumb
                </p>
                <UBreadcrumb
                  :items="[
                    { label: 'Home', to: '/' },
                    { label: 'Design System', to: '/design-system' },
                    { label: 'Navigation' }
                  ]"
                />
              </div>

              <USeparator />

              <!-- Pagination -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Pagination
                </p>
                <div class="flex flex-wrap gap-2 items-center">
                  <USelect
                    v-model="paginationColor"
                    :items="colors"
                    size="xs"
                    class="w-32"
                  />
                  <USelect
                    v-model="paginationSize"
                    :items="sizes"
                    size="xs"
                    class="w-20"
                  />
                </div>
                <UPagination
                  v-model:page="paginationPage"
                  :total="100"
                  :color="paginationColor"
                  :size="paginationSize"
                />
              </div>

              <USeparator />

              <!-- Accordion -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Accordion
                </p>
                <UAccordion :items="accordionItems" class="max-w-lg" />
              </div>

              <USeparator />

              <!-- Collapsible -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Collapsible
                </p>
                <UCollapsible class="max-w-sm space-y-2">
                  <UButton
                    color="neutral"
                    variant="outline"
                    label="Toggle details"
                    trailing-icon="i-lucide-chevron-down"
                    block
                  />
                  <template #content>
                    <UCard>
                      <p class="text-sm text-muted">
                        Hidden content that reveals on toggle.
                      </p>
                    </UCard>
                  </template>
                </UCollapsible>
              </div>
            </div>
          </template>

          <!-- ============================================================
               DISPLAY TAB
               ============================================================ -->
          <template #content-display>
            <div class="pt-6 space-y-10">
              <!-- Card -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Card
                </p>
                <UCard class="max-w-sm">
                  <template #header>
                    <p class="font-semibold">
                      Card header
                    </p>
                  </template>
                  <p class="text-sm text-muted">
                    Card body content. Cards are surface containers with optional header and footer slots.
                  </p>
                  <template #footer>
                    <div class="flex justify-end gap-2">
                      <UButton
                        color="neutral"
                        variant="ghost"
                        size="sm"
                        label="Cancel"
                      />
                      <UButton color="primary" size="sm" label="Save" />
                    </div>
                  </template>
                </UCard>
              </div>

              <USeparator />

              <!-- Avatar -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Avatar
                </p>
                <div class="flex flex-wrap gap-2 items-center">
                  <USelect
                    v-model="avatarSize"
                    :items="sizes"
                    size="xs"
                    class="w-20"
                  />
                </div>
                <div class="flex flex-wrap gap-3 items-center">
                  <UAvatar :size="avatarSize" src="https://i.pravatar.cc/80?img=1" alt="User 1" />
                  <UAvatar :size="avatarSize" src="https://i.pravatar.cc/80?img=5" alt="User 2" />
                  <UAvatar :size="avatarSize" alt="No Image" />
                  <UAvatar :size="avatarSize" icon="i-lucide-user" />
                  <UAvatarGroup :size="avatarSize" :max="3">
                    <UAvatar src="https://i.pravatar.cc/80?img=10" />
                    <UAvatar src="https://i.pravatar.cc/80?img=11" />
                    <UAvatar src="https://i.pravatar.cc/80?img=12" />
                    <UAvatar src="https://i.pravatar.cc/80?img=13" />
                  </UAvatarGroup>
                </div>
              </div>

              <USeparator />

              <!-- Separator -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Separator
                </p>
                <div class="max-w-sm space-y-3">
                  <USeparator />
                  <USeparator label="or" />
                  <USeparator icon="i-lucide-star" />
                </div>
              </div>

              <USeparator />

              <!-- Table -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  Table
                </p>
                <UTable :columns="tableColumns" :data="tableData" class="max-w-lg" />
              </div>
            </div>
          </template>

          <!-- ============================================================
               SETUP TAB
               ============================================================ -->
          <template #content-setup>
            <div class="pt-6 space-y-10">

              <!-- Overview -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">Overview</p>
                <div class="rounded-xl border border-default bg-elevated p-5 space-y-2">
                  <p class="text-sm font-semibold">@wlth/design-system</p>
                  <p class="text-sm text-toned">A Nuxt layer providing the complete WLTH brand design system — custom color palettes, SuisseIntl fonts, semantic UI variables, and Nuxt UI component defaults. Consumed by extending this layer in any Nuxt project.</p>
                  <div class="flex flex-wrap gap-2 pt-1">
                    <UBadge variant="subtle" color="neutral" size="xs" label="Nuxt 4" />
                    <UBadge variant="subtle" color="neutral" size="xs" label="Nuxt UI v4" />
                    <UBadge variant="subtle" color="neutral" size="xs" label="Tailwind v4" />
                    <UBadge variant="subtle" color="primary" size="xs" label="v1.0.0" />
                  </div>
                </div>
              </div>

              <USeparator />

              <!-- GitHub -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">Repository</p>
                <div class="rounded-xl border border-default bg-elevated p-5 flex items-center justify-between gap-4">
                  <div class="flex items-center gap-3 min-w-0">
                    <UIcon name="i-lucide-github" class="text-lg shrink-0 text-toned" />
                    <span class="font-mono text-sm text-highlighted truncate">github.com/rhyeezus/wlth-design-system</span>
                  </div>
                  <UButton
                    size="xs"
                    variant="outline"
                    color="neutral"
                    label="Open"
                    icon="i-lucide-external-link"
                    trailing
                    to="https://github.com/rhyeezus/wlth-design-system"
                    target="_blank"
                  />
                </div>
              </div>

              <USeparator />

              <!-- Installation -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">Installation</p>
                <p class="text-sm text-toned">Add the design system to any Nuxt project as a git dependency, then extend it in your Nuxt config.</p>

                <div class="space-y-2">
                  <p class="text-xs text-dimmed font-mono">1. package.json</p>
                  <pre class="rounded-xl bg-[var(--color-darkblue-900)] text-[var(--color-lightgrey-100)] text-xs font-mono p-5 overflow-x-auto leading-relaxed">{
  "dependencies": {
    "@wlth/design-system": "github:rhyeezus/wlth-design-system#v1.0.0"
  }
}</pre>
                </div>

                <div class="space-y-2">
                  <p class="text-xs text-dimmed font-mono">2. nuxt.config.ts</p>
                  <pre class="rounded-xl bg-[var(--color-darkblue-900)] text-[var(--color-lightgrey-100)] text-xs font-mono p-5 overflow-x-auto leading-relaxed">export default defineNuxtConfig({
  extends: ['@wlth/design-system']
})</pre>
                </div>

                <div class="space-y-2">
                  <p class="text-xs text-dimmed font-mono">3. Install</p>
                  <pre class="rounded-xl bg-[var(--color-darkblue-900)] text-[var(--color-lightgrey-100)] text-xs font-mono p-5 overflow-x-auto leading-relaxed">npm install</pre>
                </div>

                <UAlert
                  icon="i-lucide-info"
                  color="info"
                  variant="subtle"
                  title="Pinned versions"
                  description="Consuming apps pin to a specific git tag (e.g. #v1.0.0). The layer is immutable at that tag — upgrade by bumping the tag in your package.json."
                />
              </div>

              <USeparator />

              <!-- What ships to consumers -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">What ships to consumers</p>
                <p class="text-sm text-toned">Only these files are included when a project installs this layer. The <span class="font-mono text-xs">playground/</span> directory (this page) is excluded.</p>
                <div class="rounded-xl border border-default overflow-hidden">
                  <div
                    v-for="(file, i) in [
                      { path: 'nuxt.config.ts', desc: 'Layer entry point — what consuming apps extend' },
                      { path: 'app.config.ts', desc: 'Semantic color mapping + Nuxt UI component defaults' },
                      { path: 'assets/css/tokens.css', desc: 'Custom color palettes, SuisseIntl fonts, --ui-* semantic variables' },
                      { path: 'app/', desc: 'Shared components/layouts (empty until layer components are added)' },
                    ]"
                    :key="file.path"
                    class="flex items-start gap-4 px-5 py-3.5"
                    :class="i !== 0 ? 'border-t border-default' : ''"
                  >
                    <UIcon name="i-lucide-file" class="mt-0.5 shrink-0 text-toned" />
                    <div class="min-w-0">
                      <p class="font-mono text-xs text-highlighted">{{ file.path }}</p>
                      <p class="text-xs text-toned mt-0.5">{{ file.desc }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <USeparator />

              <!-- Release workflow -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">Release workflow</p>
                <p class="text-sm text-toned">All changes go through a pull request on GitHub. Once merged to <span class="font-mono text-xs">main</span>, a new version tag is created — consuming apps stay on their pinned version until they choose to upgrade.</p>
                <div class="rounded-xl border border-default overflow-hidden">
                  <div
                    v-for="(step, i) in [
                      { n: '1', label: 'Feature branch', desc: 'Create a branch from main for your changes' },
                      { n: '2', label: 'Pull request', desc: 'Open a PR → review → merge to main' },
                      { n: '3', label: 'Bump version', desc: 'Update version in package.json (semver: patch / minor / major)' },
                      { n: '4', label: 'Tag the release', desc: 'git tag vX.Y.Z && git push origin vX.Y.Z' },
                      { n: '5', label: 'Consumers upgrade', desc: 'Update the pinned tag in their package.json and run npm install' },
                    ]"
                    :key="step.n"
                    class="flex items-start gap-4 px-5 py-3.5"
                    :class="i !== 0 ? 'border-t border-default' : ''"
                  >
                    <div class="w-6 h-6 rounded-full bg-royalblue-500 text-white flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                      {{ step.n }}
                    </div>
                    <div class="min-w-0">
                      <p class="text-sm font-medium">{{ step.label }}</p>
                      <p class="text-xs text-toned font-mono mt-0.5">{{ step.desc }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <USeparator />

              <!-- Local dev -->
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">Local development</p>
                <p class="text-sm text-toned">Run the playground to preview and test design system changes before publishing.</p>
                <pre class="rounded-xl bg-[var(--color-darkblue-900)] text-[var(--color-lightgrey-100)] text-xs font-mono p-5 overflow-x-auto leading-relaxed"># From the design system root
npm run dev
# → opens playground at localhost:3000/documentation</pre>
              </div>

            </div>
          </template>

          <!-- ============================================================
               COLORS TAB
               ============================================================ -->
          <template #content-colors>
            <div class="pt-6 space-y-10">
              <div
                v-for="palette in colorPalettes"
                :key="palette.token"
                class="space-y-2"
              >
                <!-- Palette header -->
                <div class="flex items-baseline gap-3">
                  <p class="text-sm font-semibold">
                    {{ palette.name }}
                  </p>
                  <UBadge
                    variant="subtle"
                    color="neutral"
                    size="xs"
                    :label="palette.semantic"
                  />
                  <span class="text-xs text-muted font-mono">--color-{{ palette.token }}-*</span>
                </div>

                <!-- Swatches row -->
                <div class="flex gap-1 flex-wrap">
                  <div
                    v-for="(swatch, i) in palette.shades"
                    :key="swatch.shade"
                    class="flex flex-col rounded-md overflow-hidden"
                    style="width: 72px"
                  >
                    <!-- Color block -->
                    <div
                      class="h-12 flex items-end justify-start px-1.5 pb-1"
                      :style="{ backgroundColor: swatch.hex, color: swatchTextColor(i) }"
                    >
                      <span class="text-[10px] font-mono font-semibold leading-none opacity-80">
                        {{ swatch.shade }}
                      </span>
                    </div>
                    <!-- Hex label -->
                    <div class="px-1.5 py-1 bg-muted border border-muted border-t-0 rounded-b-md">
                      <p class="text-[9px] font-mono text-muted leading-tight">
                        {{ swatch.hex }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- ============================================================
               TOKENS TAB
               ============================================================ -->
          <template #content-tokens>
            <div class="pt-6 space-y-10">
              <div
                v-for="group in semanticTokenGroups"
                :key="group.label"
                class="space-y-3"
              >
                <p class="text-xs font-semibold uppercase tracking-widest text-muted">
                  {{ group.label }}
                </p>

                <!-- Column headers -->
                <div class="grid items-center gap-4 px-1 text-xs text-dimmed font-mono" style="grid-template-columns: 2rem 14rem 1fr 1fr">
                  <span />
                  <span>Token</span>
                  <span>Light</span>
                  <span>Dark</span>
                </div>

                <div class="space-y-1">
                  <div
                    v-for="token in group.tokens"
                    :key="token.name"
                    class="grid items-center gap-4 rounded-lg px-1 py-1.5 hover:bg-accented/50 transition-colors"
                    style="grid-template-columns: 2rem 14rem 1fr 1fr"
                  >
                    <!-- Live swatch — resolves to current color mode value -->
                    <div
                      class="w-8 h-8 rounded-md border border-default shrink-0"
                      :style="{ backgroundColor: `var(${token.name})` }"
                    />

                    <!-- Token name -->
                    <span class="font-mono text-xs text-highlighted truncate">{{ token.name }}</span>

                    <!-- Light value -->
                    <div class="flex items-center gap-2 min-w-0">
                      <div
                        class="w-5 h-5 rounded shrink-0 border border-default"
                        :style="{ backgroundColor: token.light.hex }"
                      />
                      <div class="min-w-0">
                        <p class="font-mono text-xs text-toned truncate">{{ token.light.hex }}</p>
                        <p class="font-mono text-[10px] text-dimmed truncate">{{ token.light.alias }}</p>
                      </div>
                    </div>

                    <!-- Dark value -->
                    <div class="flex items-center gap-2 min-w-0">
                      <div
                        class="w-5 h-5 rounded shrink-0 border border-default"
                        :style="{ backgroundColor: token.dark.hex }"
                      />
                      <div class="min-w-0">
                        <p class="font-mono text-xs text-toned truncate">{{ token.dark.hex }}</p>
                        <p class="font-mono text-[10px] text-dimmed truncate">{{ token.dark.alias }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <USeparator v-if="group.label !== 'Borders'" />
              </div>
            </div>
          </template>
        </UTabs>
      </div>
    </template>
  </UDashboardPanel>
</template>
