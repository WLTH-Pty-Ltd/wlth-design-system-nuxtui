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

// ── Form field states demo ─────────────────────────────────────────────────
const fieldDemoValue = ref('')
const fieldDemoSelect = ref('')

// ── Full form validation demo ──────────────────────────────────────────────
import * as z from 'zod'

const schema = z.object({
  name:  z.string().min(1, 'Full name is required'),
  email: z.string().email('Enter a valid email address'),
  role:  z.string().min(1, 'Please select a role'),
  terms: z.boolean().refine(v => v === true, 'You must accept the terms'),
})

type FormState = z.output<typeof schema>

const formState = reactive<Partial<FormState>>({
  name:  undefined,
  email: undefined,
  role:  undefined,
  terms: undefined,
})

const formSubmitted = ref(false)

async function onSubmit() {
  formSubmitted.value = true
}

const roleItems = ['Admin', 'Viewer', 'Editor']

const inputCode = computed(() => `<UInput color="${inputColor.value}" size="${inputSize.value}" placeholder="Plain input" />`)
const textareaCode = computed(() => `<UTextarea color="${textareaColor.value}" size="${textareaSize.value}" placeholder="Enter text..." />`)
const selectCode = computed(() => `<USelect color="${selectColor.value}" size="${selectSize.value}" :items="items" placeholder="Choose an option" />`)
const checkboxCode = computed(() => `<UCheckbox color="${checkboxColor.value}" size="${checkboxSize.value}" label="Option" />`)
const radioCode = computed(() => `<URadioGroup color="${radioColor.value}" size="${radioSize.value}" v-model="value" :items="items" />`)
const switchCode = computed(() => `<AppSwitch color="${switchColor.value}" size="${switchSize.value}" v-model="value" label="Toggle me" />`)
const sliderCode = computed(() => `<USlider color="${sliderColor.value}" size="${sliderSize.value}" v-model="value" />`)
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
      <AppCodeBlock :code="inputCode" />
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
      <AppCodeBlock :code="textareaCode" />
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
      <AppCodeBlock :code="selectCode" />
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
      <AppCodeBlock :code="checkboxCode" />
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
      <AppCodeBlock :code="radioCode" />
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
          <AppSwitch v-model="switchValue" :color="switchColor" :size="switchSize" label="Toggle me" />
          <AppSwitch :color="switchColor" :size="switchSize" label="Disabled" disabled />
        </div>
        <div class="border-t border-muted px-5 py-3 flex flex-wrap gap-3 items-center bg-muted">
          <USelect v-model="switchColor" :items="colorItems" value-key="value" size="xs" class="w-32" />
          <USelect v-model="switchSize" :items="sizeItems" value-key="value" size="xs" class="w-20" />
        </div>
      </div>
      <AppCodeBlock :code="switchCode" />
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
      <AppCodeBlock :code="sliderCode" />
    </section>

    <USeparator />

    <!-- Form Field Layout -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Form field layout</h2>
        <p class="text-sm text-toned">
          Wrap any input in <code class="text-xs font-mono bg-elevated px-1 py-0.5 rounded">UFormField</code>
          to get a label, hint text, required indicator, and error message — all consistently positioned.
        </p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted flex flex-wrap gap-6 items-start">
          <!-- Label only -->
          <UFormField label="Full name">
            <UInput placeholder="Jane Smith" class="w-56" />
          </UFormField>
          <!-- Label + hint -->
          <UFormField label="Email address" hint="We'll never share your email">
            <UInput type="email" placeholder="jane@example.com" class="w-56" />
          </UFormField>
          <!-- Required -->
          <UFormField label="Company" required>
            <UInput placeholder="Acme Corp" class="w-56" />
          </UFormField>
          <!-- Error state -->
          <UFormField label="Username" error="This username is already taken">
            <UInput model-value="janesmith" color="error" class="w-56" />
          </UFormField>
        </div>
      </div>
      <pre class="text-xs font-mono bg-elevated rounded-lg px-4 py-3 overflow-x-auto leading-relaxed text-default"><code>&lt;!-- Label + hint --&gt;
&lt;UFormField label="Email address" hint="We'll never share your email"&gt;
  &lt;UInput type="email" placeholder="jane@example.com" /&gt;
&lt;/UFormField&gt;

&lt;!-- Required field (adds asterisk) --&gt;
&lt;UFormField label="Company" required&gt;
  &lt;UInput placeholder="Acme Corp" /&gt;
&lt;/UFormField&gt;

&lt;!-- Error state --&gt;
&lt;UFormField label="Username" error="This username is already taken"&gt;
  &lt;UInput model-value="janesmith" color="error" /&gt;
&lt;/UFormField&gt;</code></pre>

      <!-- UFormField props -->
      <div class="space-y-2">
        <p class="text-xs font-semibold text-dimmed uppercase tracking-wider">UFormField props</p>
        <div class="rounded-xl border border-muted overflow-hidden">
          <div class="grid grid-cols-[1fr_1fr_2fr] text-[11px] font-semibold uppercase tracking-wider text-dimmed bg-muted px-4 py-2.5 border-b border-muted">
            <span>Prop</span><span>Type</span><span>Description</span>
          </div>
          <div
            v-for="(row, i) in [
              { prop: 'label', type: 'string', desc: 'Field label rendered above the input.' },
              { prop: 'hint', type: 'string', desc: 'Help text rendered below the input in a lighter colour. Hidden when error is set.' },
              { prop: 'error', type: 'string', desc: 'Error message rendered below the input in error colour. Replaces hint when present.' },
              { prop: 'required', type: 'boolean', desc: 'Appends a red asterisk to the label.' },
              { prop: 'name', type: 'string', desc: 'Field name — required when used inside UForm for schema validation.' },
              { prop: 'description', type: 'string', desc: 'Longer descriptive text rendered between the label and the input.' },
            ]"
            :key="row.prop"
            class="grid grid-cols-[1fr_1fr_2fr] gap-x-3 items-start px-4 py-3 text-xs"
            :class="i !== 0 ? 'border-t border-muted' : ''"
          >
            <code class="font-mono text-royalblue-500">{{ row.prop }}</code>
            <code class="font-mono text-toned">{{ row.type }}</code>
            <span class="text-toned leading-relaxed">{{ row.desc }}</span>
          </div>
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Error states -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Error states</h2>
        <p class="text-sm text-toned">
          Set <code class="text-xs font-mono bg-elevated px-1 py-0.5 rounded">color="error"</code> on the input and pass an
          <code class="text-xs font-mono bg-elevated px-1 py-0.5 rounded">error</code> string to <code class="text-xs font-mono bg-elevated px-1 py-0.5 rounded">UFormField</code>
          to show the field in its error state.
        </p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted flex flex-wrap gap-6 items-start">
          <UFormField label="Email" error="Enter a valid email address">
            <UInput model-value="not-an-email" color="error" class="w-56" />
          </UFormField>
          <UFormField label="Message" error="Message cannot be empty">
            <UTextarea model-value="" color="error" placeholder="Enter message..." class="w-56" />
          </UFormField>
          <UFormField label="Country" error="Please select a country">
            <USelect model-value="" color="error" :items="['Australia', 'New Zealand']" placeholder="Select country" class="w-56" />
          </UFormField>
          <UFormField label="Agree to terms" error="You must accept the terms">
            <UCheckbox :default-value="false" color="error" label="I accept the terms and conditions" />
          </UFormField>
        </div>
      </div>
      <pre class="text-xs font-mono bg-elevated rounded-lg px-4 py-3 overflow-x-auto leading-relaxed text-default"><code>&lt;UFormField label="Email" error="Enter a valid email address"&gt;
  &lt;UInput model-value="not-an-email" color="error" /&gt;
&lt;/UFormField&gt;</code></pre>
    </section>

    <USeparator />

    <!-- Form validation -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Form validation</h2>
        <p class="text-sm text-toned">
          <code class="text-xs font-mono bg-elevated px-1 py-0.5 rounded">UForm</code> integrates with
          <a href="https://zod.dev" target="_blank" class="text-royalblue-500 hover:underline">Zod</a> schemas.
          Pass a <code class="text-xs font-mono bg-elevated px-1 py-0.5 rounded">schema</code> and a reactive
          <code class="text-xs font-mono bg-elevated px-1 py-0.5 rounded">state</code> object — Nuxt UI wires up
          per-field errors automatically on submit. Fields must have a
          <code class="text-xs font-mono bg-elevated px-1 py-0.5 rounded">name</code> prop matching the schema key.
        </p>
      </div>

      <!-- Live example -->
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted">
          <UForm :schema="schema" :state="formState" class="space-y-4 max-w-sm" @submit="onSubmit">
            <UFormField label="Full name" name="name" required>
              <UInput v-model="formState.name" placeholder="Jane Smith" class="w-full" />
            </UFormField>
            <UFormField label="Email address" name="email" required>
              <UInput v-model="formState.email" type="email" placeholder="jane@example.com" class="w-full" />
            </UFormField>
            <UFormField label="Role" name="role" required>
              <USelect v-model="formState.role" :items="roleItems" placeholder="Select a role" class="w-full" />
            </UFormField>
            <UFormField name="terms">
              <UCheckbox v-model="formState.terms" label="I accept the terms and conditions" />
            </UFormField>
            <UButton type="submit" label="Submit" color="primary" />
          </UForm>
          <div v-if="formSubmitted" class="mt-4 text-xs text-success-500 font-medium">
            Form submitted successfully.
          </div>
        </div>
      </div>

      <pre class="text-xs font-mono bg-elevated rounded-lg px-4 py-3 overflow-x-auto leading-relaxed text-default"><code>import * as z from 'zod'

const schema = z.object({
  name:  z.string().min(1, 'Full name is required'),
  email: z.string().email('Enter a valid email address'),
  role:  z.string().min(1, 'Please select a role'),
  terms: z.boolean().refine(v => v === true, 'You must accept the terms'),
})

const state = reactive({ name: undefined, email: undefined, role: undefined, terms: undefined })</code></pre>

      <pre class="text-xs font-mono bg-elevated rounded-lg px-4 py-3 overflow-x-auto leading-relaxed text-default"><code>&lt;UForm :schema="schema" :state="state" @submit="onSubmit"&gt;
  &lt;UFormField label="Full name" name="name" required&gt;
    &lt;UInput v-model="state.name" placeholder="Jane Smith" /&gt;
  &lt;/UFormField&gt;
  &lt;UFormField label="Email address" name="email" required&gt;
    &lt;UInput v-model="state.email" type="email" /&gt;
  &lt;/UFormField&gt;
  &lt;UFormField label="Role" name="role" required&gt;
    &lt;USelect v-model="state.role" :items="roleItems" /&gt;
  &lt;/UFormField&gt;
  &lt;UFormField name="terms"&gt;
    &lt;UCheckbox v-model="state.terms" label="I accept the terms and conditions" /&gt;
  &lt;/UFormField&gt;
  &lt;UButton type="submit" label="Submit" /&gt;
&lt;/UForm&gt;</code></pre>

      <UAlert
        icon="i-lucide-info"
        color="neutral"
        variant="subtle"
        title="name prop is required for validation"
        description="Each UFormField must have a name prop that exactly matches its key in the Zod schema. Without it, UForm cannot map validation errors back to the correct field."
      />
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
