<script setup lang="ts">
// Right utility pill — two layout modes:
//   active entity:   [entity inner-pill + bell] [profile avatar]
//   reserved entity: [bell] [profile avatar]
const { currentProduct } = useHeader()
</script>

<template>
  <div class="flex items-center gap-3 rounded-full bg-white px-2 py-1.5 md:px-3 md:py-2">
    <!-- Entity zone: entity pill hidden on mobile, bell always visible -->
    <template v-if="currentProduct.entitySelectorState === 'active'">
      <div class="hidden md:flex items-center">
        <EntitySelector />
      </div>
      <NotificationsTray />
    </template>

    <!-- No entity: just bell -->
    <NotificationsTray v-else />

    <!-- Profile avatar: tablet+ only (moved into drawer on mobile) -->
    <div class="hidden md:block">
      <ProfileMenu />
    </div>
  </div>
</template>
