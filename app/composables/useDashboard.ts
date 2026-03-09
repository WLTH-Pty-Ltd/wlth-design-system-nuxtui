import { createSharedComposable } from '@vueuse/core'

const _useDashboard = () => {
  const route = useRoute()
  const router = useRouter()
  const isNotificationsSlideoverOpen = ref(false)
  const isMobileMenuOpen = ref(false)

  defineShortcuts({
    'g-h': () => router.push('/'),
    'g-i': () => router.push('/inbox'),
    'g-c': () => router.push('/customers'),
    'g-s': () => router.push('/settings'),
    'g-d': () => router.push('/design-system'),
    'n': () => isNotificationsSlideoverOpen.value = !isNotificationsSlideoverOpen.value
  })

  watch(() => route.fullPath, () => {
    isNotificationsSlideoverOpen.value = false
    isMobileMenuOpen.value = false
  })

  return {
    isNotificationsSlideoverOpen,
    isMobileMenuOpen
  }
}

export const useDashboard = createSharedComposable(_useDashboard)
