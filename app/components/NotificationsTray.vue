<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'
import { PRODUCTS } from '~/composables/useHeader'

const {
  notificationScope,
  filteredNotifications,
  unreadCount,
  markRead,
  markAllRead
} = useHeader()

const isOpen = ref(false)

const scopeItems = [
  { label: 'All activity', value: 'all' },
  { label: 'This product', value: 'product' }
]

const emptyLabel = computed(() =>
  notificationScope.value === 'all'
    ? "You're all caught up."
    : 'Nothing from this product yet.'
)
</script>

<template>
  <USlideover v-model:open="isOpen" side="right" title="Notifications">
    <!-- Trigger: 36×36 dark circle with bell icon + green unread chip -->
    <button
      type="button"
      class="relative size-9 rounded-full bg-lightgrey-900 flex items-center justify-center shrink-0"
      aria-label="Notifications"
    >
      <UIcon name="i-lucide-bell" class="size-4 text-white" />
      <span
        v-if="unreadCount > 0"
        class="absolute top-0 right-0 size-[9px] rounded-full bg-green-400 ring-1 ring-white"
      />
    </button>

    <template #title>
      <div class="flex items-center gap-2">
        <span>Notifications</span>
        <UBadge
          v-if="unreadCount > 0"
          :label="unreadCount"
          color="primary"
          variant="solid"
          size="sm"
          class="rounded-full"
        />
      </div>
    </template>

    <template #body>
      <!-- Scope tabs — full-width strip, breaks out of body padding -->
      <div class="-mx-4 -mt-4 px-4 py-3 border-b border-muted mb-4">
        <UTabs
          v-model="notificationScope"
          :items="scopeItems"
          :content="false"
          size="sm"
          color="secondary"
        />
      </div>

      <!-- Notification list -->
      <div
        v-if="filteredNotifications.length"
        class="divide-y divide-muted -mx-4"
      >
        <component
          :is="notif.url ? resolveComponent('NuxtLink') : 'button'"
          v-for="notif in filteredNotifications"
          :key="notif.id"
          :to="notif.url ?? undefined"
          class="w-full text-left px-4 py-4 hover:bg-elevated transition-colors flex gap-3 items-start"
          @click="markRead(notif.id); isOpen = false"
        >
          <div class="relative shrink-0 mt-0.5">
            <UIcon :name="PRODUCTS[notif.product].icon" class="size-4 text-toned" />
            <span
              v-if="!notif.read"
              class="absolute -top-1 -right-1 size-2 rounded-full bg-error-500"
            />
          </div>
          <div class="min-w-0 flex-1">
            <p :class="['text-sm leading-snug', notif.read ? 'text-toned' : 'font-medium text-highlighted']">
              {{ notif.title }}
            </p>
            <p v-if="notif.body" class="text-xs text-toned mt-0.5 truncate">
              {{ notif.body }}
            </p>
            <p class="text-xs text-toned mt-1">
              {{ formatDistanceToNow(new Date(notif.timestamp), { addSuffix: true }) }}
            </p>
          </div>
        </component>
      </div>

      <!-- Empty state -->
      <div
        v-else
        class="flex flex-col items-center justify-center py-10 text-center gap-2"
      >
        <UIcon name="i-lucide-bell" class="size-8 text-dimmed" />
        <p class="text-sm font-medium text-highlighted">No notifications</p>
        <p class="text-xs text-muted">{{ emptyLabel }}</p>
      </div>
    </template>

    <template v-if="unreadCount > 0" #footer>
      <UButton
        color="primary"
        variant="outline"
        size="md"
        @click="markAllRead()"
      >
        Mark all as read
      </UButton>
    </template>
  </USlideover>
</template>
