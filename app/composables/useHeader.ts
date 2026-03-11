import { createSharedComposable, useLocalStorage } from '@vueuse/core'
import type { EntityOption, HubNotification, Product, ProductId } from '~/types'

export const MOCK_ENTITIES: EntityOption[] = [
  { id: 'entity-1', name: 'Acme Corp' },
  { id: 'entity-2', name: 'Globex Holdings' },
  { id: 'entity-3', name: 'Initech' }
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
    navItems: [],
    entitySelectorState: 'active'
  },
  pay: {
    id: 'pay',
    label: 'Pay',
    icon: 'i-lucide-credit-card',
    baseUrl: '/products/pay',
    navItems: [],
    entitySelectorState: 'active'
  },
  shareholder: {
    id: 'shareholder',
    label: 'Shareholder',
    icon: 'i-lucide-trending-up',
    baseUrl: '/products/shareholder',
    navItems: [],
    entitySelectorState: 'active'
  },
  dashboard: {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'i-lucide-layout-dashboard',
    baseUrl: '/products/dashboard',
    navItems: [],
    entitySelectorState: 'active'
  },
  customer: {
    id: 'customer',
    label: 'Customer',
    icon: 'i-lucide-user',
    baseUrl: '/products/customer',
    navItems: [],
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
  const appConfig = useAppConfig()

  // Persisted state (localStorage)
  const currentEntityId = useLocalStorage('wlth-entity-id', 'entity-1')
  const roles = useLocalStorage<string[]>('wlth-roles', ['admin'])
  const notificationScope = useLocalStorage<'all' | 'product'>('wlth-notification-scope', 'all')

  // Session state — default product comes from app config (consuming app sets wlth.product)
  const configProduct = (appConfig.wlth as { product?: ProductId } | undefined)?.product
  const currentProductId = ref<ProductId>(configProduct ?? 'broker')
  const notifications = ref<HubNotification[]>([...MOCK_NOTIFICATIONS])
  const activeLabel = ref('Home')
  watch(currentProductId, () => { activeLabel.value = 'Home' })

  // Computed — merge app-config navItem overrides (with real routes) over the defaults
  const currentProduct = computed(() => {
    const base = PRODUCTS[currentProductId.value]
    const configNavItems = (appConfig.wlth as { navItems?: typeof base.navItems } | undefined)?.navItems
    if (configNavItems?.length) {
      return { ...base, navItems: configNavItems }
    }
    return base
  })
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
