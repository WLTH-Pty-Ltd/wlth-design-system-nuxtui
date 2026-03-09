import { createSharedComposable, useLocalStorage } from '@vueuse/core'
import type { EntityOption, HubNotification, Product, ProductId } from '~/types'

export const MOCK_ENTITIES: EntityOption[] = [
  { id: 'entity-1', name: 'Acme Corp', avatar: { src: '/images/entity%20avatars/Crypto%20Logos/Helium.png', alt: 'Acme Corp' } },
  { id: 'entity-2', name: 'Globex Holdings', avatar: { src: '/images/entity%20avatars/Crypto%20Logos/Polkadot.png', alt: 'Globex Holdings' } },
  { id: 'entity-3', name: 'Initech', avatar: { src: '/images/entity%20avatars/Crypto%20Logos/Shiba%20Inu%20SHIB.png', alt: 'Initech' } }
]

export const MOCK_USER = {
  name: 'Benjamin Canac',
  email: 'ben@wlth.com',
  initials: 'BC'
}

export const PRODUCTS: Record<ProductId, Product> = {
  broker: {
    id: 'broker',
    label: 'Broker',
    icon: 'i-lucide-briefcase',
    baseUrl: '/products/broker',
    navItems: [
      { label: 'Home', isHome: true },
      { label: 'Products', icon: 'i-lucide-package' },
      { label: 'Applications', icon: 'i-lucide-file-text' },
      { label: 'Support', icon: 'i-lucide-life-buoy' }
    ],
    entitySelectorState: 'active'
  },
  pay: {
    id: 'pay',
    label: 'Pay',
    icon: 'i-lucide-credit-card',
    baseUrl: '/products/pay',
    navItems: [
      { label: 'Home', isHome: true },
      { label: 'Payments', icon: 'i-lucide-credit-card' },
      { label: 'Payees', icon: 'i-lucide-users' },
      { label: 'Cards', icon: 'i-lucide-wallet' }
    ],
    entitySelectorState: 'active'
  },
  shareholder: {
    id: 'shareholder',
    label: 'Shareholder',
    icon: 'i-lucide-trending-up',
    baseUrl: '/products/shareholder',
    navItems: [
      { label: 'Home', isHome: true },
      { label: 'Documents', icon: 'i-lucide-folder' },
      { label: 'Transactions', icon: 'i-lucide-arrow-left-right' }
    ],
    entitySelectorState: 'active'
  },
  dashboard: {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'i-lucide-layout-dashboard',
    baseUrl: '/products/dashboard',
    navItems: [
      { label: 'Home', isHome: true }
    ],
    entitySelectorState: 'active'
  },
  customer: {
    id: 'customer',
    label: 'Customer',
    icon: 'i-lucide-user',
    baseUrl: '/products/customer',
    navItems: [
      { label: 'Home', isHome: true }
    ],
    entitySelectorState: 'reserved'
  }
}

const MOCK_NOTIFICATIONS: HubNotification[] = [
  {
    id: 'notif-1',
    product: 'broker',
    entityId: 'entity-1',
    title: 'New client onboarding complete',
    body: 'Acme Corp has completed their onboarding.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    read: false
  },
  {
    id: 'notif-2',
    product: 'pay',
    entityId: 'entity-1',
    title: 'Payment of $12,400 received',
    body: 'Globex Holdings sent a payment.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false
  },
  {
    id: 'notif-3',
    product: 'broker',
    entityId: 'entity-2',
    title: 'Portfolio rebalanced',
    body: 'Automatic rebalancing completed for Globex Holdings.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    read: true
  },
  {
    id: 'notif-4',
    product: 'shareholder',
    entityId: 'entity-1',
    title: 'Distribution scheduled',
    body: 'Q1 distribution has been scheduled.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    read: true
  },
  {
    id: 'notif-5',
    product: 'pay',
    entityId: 'entity-3',
    title: 'Recipient verified',
    body: 'Initech recipient account verified.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    read: true
  }
]

const _useHeader = () => {
  const route = useRoute()

  // Persisted state (localStorage)
  const currentEntityId = useLocalStorage('wlth-entity-id', 'entity-1')
  const roles = useLocalStorage<string[]>('wlth-roles', ['admin'])
  const notificationScope = useLocalStorage<'all' | 'product'>('wlth-notification-scope', 'all')

  // Session state
  const currentProductId = ref<ProductId>('broker')
  const notifications = ref<HubNotification[]>([...MOCK_NOTIFICATIONS])
  const activeLabel = ref('Home')
  watch(currentProductId, () => { activeLabel.value = 'Home' })

  // Computed
  const currentProduct = computed(() => PRODUCTS[currentProductId.value])
  const currentEntity = computed(
    () => MOCK_ENTITIES.find(e => e.id === currentEntityId.value) ?? MOCK_ENTITIES[0]!
  )
  const filteredNotifications = computed(() =>
    notificationScope.value === 'all'
      ? notifications.value
      : notifications.value.filter(n => n.product === currentProductId.value)
  )
  const unreadCount = computed(() =>
    filteredNotifications.value.filter(n => !n.read).length
  )

  // Read ?product and ?entityId query params on first mount
  onMounted(() => {
    const { entityId, product } = route.query
    if (entityId && typeof entityId === 'string') {
      currentEntityId.value = entityId
    }
    if (product && typeof product === 'string' && product in PRODUCTS) {
      currentProductId.value = product as ProductId
    }
  })

  function switchProduct(id: ProductId) {
    if (import.meta.client) {
      window.open(`${PRODUCTS[id].baseUrl}?entityId=${currentEntityId.value}`, '_blank')
    }
  }

  function setEntity(id: string) {
    currentEntityId.value = id
  }

  function markRead(id: string) {
    const n = notifications.value.find(n => n.id === id)
    if (n) n.read = true
  }

  function markAllRead() {
    filteredNotifications.value.forEach(n => { n.read = true })
  }

  return {
    currentProductId,
    currentEntityId,
    roles,
    notificationScope,
    notifications,
    currentProduct,
    currentEntity,
    filteredNotifications,
    unreadCount,
    activeLabel,
    switchProduct,
    setEntity,
    markRead,
    markAllRead
  }
}

export const useHeader = createSharedComposable(_useHeader)
