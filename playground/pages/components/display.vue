<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const toItems = (arr: string[]) => arr.map(v => ({ label: v, value: v }))
const sizeItems = toItems(['xs', 'sm', 'md', 'lg', 'xl'])

const avatarSize = ref('md')

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
</script>

<template>
  <div class="max-w-7xl mx-auto px-10 py-12 space-y-14">

    <div class="space-y-1">
      <h1 class="text-2xl font-semibold text-default">Display</h1>
      <p class="text-sm text-toned">Data and content display — cards, avatars, separators, and tables.</p>
    </div>

    <!-- Card -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Card</h2>
        <p class="text-sm text-toned">Surface container with optional header and footer slots.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted">
          <UCard class="max-w-sm">
            <template #header>
              <p class="font-semibold text-default">Card header</p>
            </template>
            <p class="text-sm text-toned">Card body content. Cards are surface containers with optional header and footer slots.</p>
            <template #footer>
              <div class="flex justify-end gap-2">
                <UButton color="neutral" variant="ghost" size="sm" label="Cancel" />
                <UButton color="primary" size="sm" label="Save" />
              </div>
            </template>
          </UCard>
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Avatar -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Avatar</h2>
        <p class="text-sm text-toned">User image with fallback to initials or icon. Supports groups with overflow count.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted flex flex-wrap gap-3 items-center">
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
        <div class="border-t border-muted px-5 py-3 flex flex-wrap gap-3 items-center bg-default">
          <USelect v-model="avatarSize" :items="sizeItems" value-key="value" size="xs" class="w-20" />
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Separator -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Separator</h2>
        <p class="text-sm text-toned">Horizontal divider. Supports plain, labelled, and icon variants.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted">
          <div class="max-w-sm space-y-3">
            <USeparator />
            <USeparator label="or" />
            <USeparator icon="i-lucide-star" />
          </div>
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Table -->
    <section class="space-y-4">
      <div class="space-y-0.5">
        <h2 class="text-base font-semibold text-default">Table</h2>
        <p class="text-sm text-toned">Data table with column definitions and row data.</p>
      </div>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div class="p-6 bg-muted">
          <UTable :columns="tableColumns" :data="tableData" class="max-w-lg" />
        </div>
      </div>
    </section>

  </div>
</template>
