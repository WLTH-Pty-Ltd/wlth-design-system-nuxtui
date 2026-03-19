<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const modalOpen = ref(false)
const slideoverOpen = ref(false)
const slideoverLeft = ref(false)
const slideoverTop = ref(false)
const slideoverBottom = ref(false)
const slideoverNoClose = ref(false)
const slideoverFooter = ref(false)
const dropdownItems = [[
  { label: 'Edit', icon: 'i-lucide-pencil' },
  { label: 'Duplicate', icon: 'i-lucide-copy' }
], [
  { label: 'Delete', icon: 'i-lucide-trash', color: 'error' as const }
]]
</script>

<template>
  <div class="max-w-7xl mx-auto px-10 py-12 space-y-14">

    <div class="space-y-1">
      <h1 class="text-2xl font-semibold text-default">Overlays</h1>
      <p class="text-sm text-toned">Floating UI elements — modals, slideovers, tooltips, popovers, and dropdowns.</p>
    </div>

    <!-- Modal -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Modal</h2>
        <p class="text-sm text-toned">Centered dialog with header, body, and footer slots.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted">
          <UButton variant="outline" color="neutral" label="Open modal" icon="i-lucide-layout" @click="modalOpen = true" />
          <UModal v-model:open="modalOpen" title="Modal title" description="This is the modal description.">
            <template #body>
              <p class="text-toned text-sm">Modal body content goes here. You can place any components inside.</p>
            </template>
            <template #footer>
              <div class="flex justify-end gap-2">
                <UButton color="surface" variant="solid" label="Cancel" @click="modalOpen = false" />
                <UButton color="primary" label="Confirm" @click="modalOpen = false" />
              </div>
            </template>
          </UModal>
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Slideover -->
    <section class="space-y-6">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Slideover</h2>
        <p class="text-sm text-toned">Panel that slides in from any edge of the screen. Useful for detail views, forms, and contextual panels.</p>
      </div>

      <!-- Default (right) -->
      <div class="space-y-2">
        <p class="text-xs font-semibold text-toned uppercase tracking-wider">Default — slides from right</p>
        <div class="rounded-xl border border-muted overflow-hidden">
          <div class="p-6 bg-muted">
            <UButton variant="outline" color="neutral" label="Open slideover" icon="i-lucide-panel-right" @click="slideoverOpen = true" />
            <USlideover v-model:open="slideoverOpen" title="Slideover title" description="Content slides in from the right.">
              <template #body>
                <p class="text-toned text-sm">Slideover body content. Useful for detail panels and forms.</p>
              </template>
            </USlideover>
          </div>
        </div>
      </div>

      <!-- Sides -->
      <div class="space-y-2">
        <p class="text-xs font-semibold text-toned uppercase tracking-wider">Side</p>
        <div class="rounded-xl border border-muted overflow-hidden">
          <div class="p-6 bg-muted flex flex-wrap gap-3">
            <UButton variant="outline" color="neutral" label="Left" icon="i-lucide-panel-left" @click="slideoverLeft = true" />
            <UButton variant="outline" color="neutral" label="Top" icon="i-lucide-panel-top" @click="slideoverTop = true" />
            <UButton variant="outline" color="neutral" label="Bottom" icon="i-lucide-panel-bottom" @click="slideoverBottom = true" />
            <USlideover v-model:open="slideoverLeft" side="left" title="Left slideover" description="Slides in from the left.">
              <template #body><p class="text-toned text-sm">Left panel content.</p></template>
            </USlideover>
            <USlideover v-model:open="slideoverTop" side="top" title="Top slideover" description="Slides in from the top.">
              <template #body><p class="text-toned text-sm">Top panel content.</p></template>
            </USlideover>
            <USlideover v-model:open="slideoverBottom" side="bottom" title="Bottom slideover" description="Slides in from the bottom.">
              <template #body><p class="text-toned text-sm">Bottom panel content.</p></template>
            </USlideover>
          </div>
        </div>
      </div>

      <!-- Prevent close -->
      <div class="space-y-2">
        <p class="text-xs font-semibold text-toned uppercase tracking-wider">Prevent close</p>
        <div class="rounded-xl border border-muted overflow-hidden">
          <div class="p-6 bg-muted">
            <UButton variant="outline" color="neutral" label="Open (not dismissible)" icon="i-lucide-lock" @click="slideoverNoClose = true" />
            <USlideover v-model:open="slideoverNoClose" :dismissible="false" title="Not dismissible" description="Click outside or press Esc — nothing happens. Use the button to close.">
              <template #body>
                <p class="text-toned text-sm">This slideover can only be closed programmatically.</p>
              </template>
              <template #footer="{ close }">
                <div class="flex justify-end">
                  <UButton color="neutral" variant="outline" label="Close" @click="close" />
                </div>
              </template>
            </USlideover>
          </div>
        </div>
      </div>

      <!-- Footer slot -->
      <div class="space-y-2">
        <p class="text-xs font-semibold text-toned uppercase tracking-wider">With footer</p>
        <div class="rounded-xl border border-muted overflow-hidden">
          <div class="p-6 bg-muted">
            <UButton variant="outline" color="neutral" label="Open with footer" icon="i-lucide-layout-panel-top" @click="slideoverFooter = true" />
            <USlideover v-model:open="slideoverFooter" title="Edit record" description="Make changes and confirm or discard.">
              <template #body>
                <div class="space-y-4">
                  <UFormField label="Name">
                    <UInput placeholder="Enter name" class="w-full" />
                  </UFormField>
                  <UFormField label="Description">
                    <UTextarea placeholder="Enter description" class="w-full" />
                  </UFormField>
                </div>
              </template>
              <template #footer="{ close }">
                <div class="flex justify-end gap-2">
                  <UButton color="neutral" variant="outline" label="Cancel" @click="close" />
                  <UButton color="primary" label="Save changes" @click="close" />
                </div>
              </template>
            </USlideover>
          </div>
        </div>
      </div>

    </section>

    <USeparator />

    <!-- Tooltip -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Tooltip</h2>
        <p class="text-sm text-toned">Contextual hint on hover. Supports keyboard shortcut hints.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted flex flex-wrap gap-3">
          <UTooltip text="This is a tooltip">
            <UButton color="neutral" variant="outline" label="Hover me" />
          </UTooltip>
          <UTooltip text="With shortcut" :shortcuts="['⌘', 'K']">
            <UButton color="neutral" variant="outline" label="With shortcut" />
          </UTooltip>
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Popover -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Popover</h2>
        <p class="text-sm text-toned">Rich floating panel triggered by click. For complex contextual content.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted">
          <UPopover>
            <UButton color="neutral" variant="outline" label="Open popover" icon="i-lucide-info" />
            <template #content>
              <div class="p-3 space-y-1 max-w-xs">
                <p class="text-sm font-semibold text-default">Popover heading</p>
                <p class="text-xs text-toned">This is additional context shown in a floating panel.</p>
              </div>
            </template>
          </UPopover>
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Dropdown Menu -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Dropdown Menu</h2>
        <p class="text-sm text-toned">Action menu with grouped items, icons, and destructive states.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted">
          <UDropdownMenu :items="dropdownItems">
            <UButton color="neutral" variant="outline" label="Actions" trailing-icon="i-lucide-chevron-down" />
          </UDropdownMenu>
        </div>
      </div>
    </section>

  </div>
</template>
