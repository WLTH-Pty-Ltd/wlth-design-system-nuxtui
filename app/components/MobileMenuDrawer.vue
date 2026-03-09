<script setup lang="ts">
import { PRODUCTS } from '~/composables/useHeader'

const { isMobileMenuOpen } = useDashboard()
const { currentProduct, currentProductId, activeLabel, switchProduct } = useHeader()

const profileOpen = ref(false)
const productOpen = ref(false)

function onNavItem(label: string) {
  activeLabel.value = label
  isMobileMenuOpen.value = false
}
</script>

<template>
  <UDrawer v-model:open="isMobileMenuOpen" direction="right" :handle="false" :ui="{ content: 'w-[95vw] md:w-96 lg:w-lg' }">
    <template #content>
      <div class="flex flex-col h-full w-full">
        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-4 border-b border-muted shrink-0">
          <p class="text-lg font-semibold text-highlighted">
            Menu
          </p>
          <UButton
            icon="i-lucide-x"
            color="info"
            variant="outline"
            size="lg"
            aria-label="Close menu"
            class="rounded-full"
            @click="isMobileMenuOpen = false"
          />
        </div>

        <!-- Profile accordion -->
        <div class="border-b border-muted shrink-0">
          <button
            type="button"
            class="flex items-center gap-3 w-full px-4 py-4 hover:bg-elevated transition-colors"
            @click="profileOpen = !profileOpen"
          >
            <div class="size-9 rounded-full bg-darkblue-500 flex items-center justify-center shrink-0">
              <span class="text-white text-sm font-medium">BC</span>
            </div>
            <span class="text-sm font-medium flex-1 text-left">Benjamin Canac</span>
            <UIcon
              name="i-lucide-chevron-down"
              class="size-4 text-toned transition-transform duration-200"
              :class="profileOpen && 'rotate-180'"
            />
          </button>
          <div v-show="profileOpen" class="pb-2">
            <button
              type="button"
              class="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-elevated transition-colors"
              @click="isMobileMenuOpen = false"
            >
              <UIcon name="i-lucide-user" class="size-4 text-toned shrink-0" />
              Account
            </button>
            <button
              type="button"
              class="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-elevated transition-colors"
              @click="isMobileMenuOpen = false"
            >
              <UIcon name="i-lucide-settings-2" class="size-4 text-toned shrink-0" />
              Preferences
            </button>
            <button
              type="button"
              class="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-elevated transition-colors"
              @click="isMobileMenuOpen = false"
            >
              <UIcon name="i-lucide-log-out" class="size-4 text-toned shrink-0" />
              Sign out
            </button>
          </div>
        </div>

        <!-- Product switcher accordion -->
        <div class="border-b border-muted shrink-0">
          <button
            type="button"
            class="flex items-center gap-3 w-full px-4 py-4 hover:bg-elevated transition-colors"
            @click="productOpen = !productOpen"
          >
            <UIcon :name="PRODUCTS[currentProductId].icon" class="size-4 text-toned shrink-0" />
            <span class="text-sm font-medium flex-1 text-left">{{ PRODUCTS[currentProductId].label }}</span>
            <UIcon
              name="i-lucide-chevron-down"
              class="size-4 text-toned transition-transform duration-200"
              :class="productOpen && 'rotate-180'"
            />
          </button>
          <div v-show="productOpen" class="pb-2">
            <button
              v-for="product in Object.values(PRODUCTS)"
              :key="product.id"
              type="button"
              class="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-elevated transition-colors"
              @click="product.id !== currentProductId ? (switchProduct(product.id), isMobileMenuOpen = false) : productOpen = false"
            >
              <UIcon :name="product.icon" class="size-4 shrink-0" :class="product.id === currentProductId ? 'text-highlighted' : 'text-toned'" />
              <span :class="product.id === currentProductId ? 'font-medium text-highlighted flex-1 text-left' : 'flex-1 text-left'">{{ product.label }}</span>
              <UIcon v-if="product.id === currentProductId" name="i-lucide-check" class="size-4 text-royalblue-500 shrink-0" />
            </button>
          </div>
        </div>

        <!-- Nav items -->
        <nav class="flex flex-col gap-1 px-3 py-4 flex-1 overflow-y-auto">
          <template
            v-for="item in currentProduct.navItems"
            :key="item.label"
          >
            <UButton
              v-if="item.isHome"
              color="nav"
              :variant="activeLabel === item.label ? 'solid' : 'ghost'"
              class="justify-start w-full py-3"
              @click="onNavItem(item.label)"
            >
              <UIcon name="i-lucide-house" class="size-4 shrink-0" />
              Home
            </UButton>

            <UButton
              v-else-if="item.isCrossProduct"
              color="neutral"
              variant="ghost"
              class="justify-start w-full py-3"
              @click="switchProduct('broker'); isMobileMenuOpen = false"
            >
              <UIcon :name="item.icon ?? 'i-lucide-arrow-up-right'" class="size-4 shrink-0" />
              {{ item.label }}
            </UButton>

            <UButton
              v-else
              color="nav"
              :variant="activeLabel === item.label ? 'solid' : 'ghost'"
              class="justify-start w-full py-3"
              @click="onNavItem(item.label)"
            >
              <UIcon :name="item.icon ?? 'i-lucide-circle'" class="size-4 shrink-0" />
              {{ item.label }}
            </UButton>
          </template>
        </nav>

        <!-- Entity selector at bottom (when active) -->
        <div
          v-if="currentProduct.entitySelectorState === 'active'"
          class="px-4 py-4 border-t border-muted shrink-0"
        >
          <EntitySelector />
        </div>
      </div>
    </template>
  </UDrawer>
</template>
