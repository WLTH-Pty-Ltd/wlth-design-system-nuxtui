<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const toItems = (arr: string[]) => arr.map(v => ({ label: v, value: v }))

const colorItems = toItems(['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'])
const sizeItems = toItems(['xs', 'sm', 'md', 'lg', 'xl'])

const inputColor = ref('primary')
const inputSize = ref('md')
const inputValue = ref('')

const textareaColor = ref('primary')
const textareaSize = ref('md')
const textareaValue = ref('')

const selectColor = ref('primary')
const selectSize = ref('md')
const selectValue = ref('')
const selectItems = ['Option A', 'Option B', 'Option C', 'Option D']

const checkboxColor = ref('primary')
const checkboxSize = ref('md')

const radioColor = ref('primary')
const radioSize = ref('md')
const radioValue = ref('option-a')
const radioItems = [
  { label: 'Option A', value: 'option-a' },
  { label: 'Option B', value: 'option-b' },
  { label: 'Option C', value: 'option-c' }
]

const switchColor = ref('primary')
const switchSize = ref('md')
const switchValue = ref(false)

const sliderColor = ref('primary')
const sliderSize = ref('md')
const sliderValue = ref(50)

const phoneValue = ref('')
const phoneError = computed(() => {
  if (!phoneValue.value) return ''
  const stripped = phoneValue.value.replace(/[\s\-]/g, '')
  return /^04\d{8}$/.test(stripped) ? '' : 'Enter a valid Australian mobile number (04XX XXX XXX)'
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-10 py-12 space-y-14">

    <div class="space-y-1">
      <h1 class="text-2xl font-semibold text-default">Forms</h1>
      <p class="text-sm text-toned">Input controls — text fields, selects, checkboxes, toggles, and more.</p>
    </div>

    <!-- Input -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Input</h2>
        <p class="text-sm text-toned">Single-line text entry. Supports icons, disabled state, and all semantic colors.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted flex flex-wrap gap-3 items-start">
          <UInput v-model="inputValue" :color="inputColor" :size="inputSize" placeholder="Plain input" class="w-52" />
          <UInput v-model="inputValue" :color="inputColor" :size="inputSize" placeholder="With icon" icon="i-lucide-search" class="w-52" />
          <UInput v-model="inputValue" :color="inputColor" :size="inputSize" placeholder="Disabled" disabled class="w-52" />
        </div>
        <div class="border-t border-muted px-5 py-3 flex flex-wrap gap-3 items-center bg-muted">
          <USelect v-model="inputColor" :items="colorItems" value-key="value" size="xs" class="w-32" />
          <USelect v-model="inputSize" :items="sizeItems" value-key="value" size="xs" class="w-20" />
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Textarea -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Textarea</h2>
        <p class="text-sm text-toned">Multi-line text entry.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted">
          <UTextarea v-model="textareaValue" :color="textareaColor" :size="textareaSize" placeholder="Enter text..." class="w-full max-w-sm" />
        </div>
        <div class="border-t border-muted px-5 py-3 flex flex-wrap gap-3 items-center bg-muted">
          <USelect v-model="textareaColor" :items="colorItems" value-key="value" size="xs" class="w-32" />
          <USelect v-model="textareaSize" :items="sizeItems" value-key="value" size="xs" class="w-20" />
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Select -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Select</h2>
        <p class="text-sm text-toned">Dropdown option picker.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted">
          <USelect v-model="selectValue" :color="selectColor" :size="selectSize" :items="selectItems" placeholder="Choose an option" class="w-52" />
        </div>
        <div class="border-t border-muted px-5 py-3 flex flex-wrap gap-3 items-center bg-muted">
          <USelect v-model="selectColor" :items="colorItems" value-key="value" size="xs" class="w-32" />
          <USelect v-model="selectSize" :items="sizeItems" value-key="value" size="xs" class="w-20" />
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Checkbox -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Checkbox</h2>
        <p class="text-sm text-toned">Binary toggle with label. Supports indeterminate state.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted flex flex-wrap gap-4 items-center">
          <UCheckbox :color="checkboxColor" :size="checkboxSize" label="Unchecked" :default-value="false" />
          <UCheckbox :color="checkboxColor" :size="checkboxSize" label="Checked" :default-value="true" />
          <UCheckbox :color="checkboxColor" :size="checkboxSize" label="Disabled" disabled />
        </div>
        <div class="border-t border-muted px-5 py-3 flex flex-wrap gap-3 items-center bg-muted">
          <USelect v-model="checkboxColor" :items="colorItems" value-key="value" size="xs" class="w-32" />
          <USelect v-model="checkboxSize" :items="sizeItems" value-key="value" size="xs" class="w-20" />
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Radio Group -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Radio Group</h2>
        <p class="text-sm text-toned">Single-choice selector from a set of options.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted">
          <URadioGroup v-model="radioValue" :color="radioColor" :size="radioSize" :items="radioItems" />
        </div>
        <div class="border-t border-muted px-5 py-3 flex flex-wrap gap-3 items-center bg-muted">
          <USelect v-model="radioColor" :items="colorItems" value-key="value" size="xs" class="w-32" />
          <USelect v-model="radioSize" :items="sizeItems" value-key="value" size="xs" class="w-20" />
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Switch -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Switch</h2>
        <p class="text-sm text-toned">On/off toggle control.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted flex flex-wrap gap-4 items-center">
          <USwitch v-model="switchValue" :color="switchColor" :size="switchSize" label="Toggle me" />
          <USwitch :color="switchColor" :size="switchSize" label="Disabled" disabled />
        </div>
        <div class="border-t border-muted px-5 py-3 flex flex-wrap gap-3 items-center bg-muted">
          <USelect v-model="switchColor" :items="colorItems" value-key="value" size="xs" class="w-32" />
          <USelect v-model="switchSize" :items="sizeItems" value-key="value" size="xs" class="w-20" />
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Slider -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Slider</h2>
        <p class="text-sm text-toned">Range input for numeric values.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted">
          <USlider v-model="sliderValue" :color="sliderColor" :size="sliderSize" class="w-64" />
        </div>
        <div class="border-t border-muted px-5 py-3 flex flex-wrap gap-3 items-center bg-muted">
          <USelect v-model="sliderColor" :items="colorItems" value-key="value" size="xs" class="w-32" />
          <USelect v-model="sliderSize" :items="sizeItems" value-key="value" size="xs" class="w-20" />
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Phone Number (AU) -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Phone Number (AU)</h2>
        <p class="text-sm text-toned">Australian mobile number input pattern with live validation.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted flex flex-wrap gap-6 items-start">
          <UFormField label="Mobile Number" hint="Enter your 10-digit mobile number">
            <UButtonGroup class="w-64">
              <UButton color="neutral" variant="outline" trailing-icon="i-lucide-chevron-down" class="shrink-0">
                🇦🇺 +61
              </UButton>
              <UInput type="tel" placeholder="04XX XXX XXX" class="flex-1 min-w-0" />
            </UButtonGroup>
          </UFormField>
          <UFormField label="Mobile Number" :error="phoneError" :hint="!phoneError ? 'Enter your 10-digit mobile number' : undefined">
            <UButtonGroup class="w-64">
              <UButton color="neutral" variant="outline" trailing-icon="i-lucide-chevron-down" class="shrink-0">
                🇦🇺 +61
              </UButton>
              <UInput v-model="phoneValue" type="tel" placeholder="04XX XXX XXX" :color="phoneError ? 'error' : 'primary'" class="flex-1 min-w-0" />
            </UButtonGroup>
          </UFormField>
        </div>
      </div>
    </section>

  </div>
</template>
