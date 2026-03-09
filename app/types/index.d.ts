import type { AvatarProps, DropdownMenuItem } from '@nuxt/ui'


export type EntitySelectorState = 'active' | 'locked' | 'reserved'

export interface EntityOption {
  id: string
  name: string
  avatar?: AvatarProps
}

export interface HeaderEntity {
  name: string
  state: EntitySelectorState
  options?: EntityOption[]
}

export interface UtilityClusterUser {
  name: string
  avatar?: AvatarProps
  email?: string
}

export interface UtilityClusterProps {
  entity?: HeaderEntity
  notificationCount?: number
  user?: UtilityClusterUser
  appMenuItems?: DropdownMenuItem[][]
}

export type UserStatus = 'subscribed' | 'unsubscribed' | 'bounced'
export type SaleStatus = 'paid' | 'failed' | 'refunded'

export interface User {
  id: number
  name: string
  email: string
  avatar?: AvatarProps
  status: UserStatus
  location: string
}

export interface Mail {
  id: number
  unread?: boolean
  from: User
  subject: string
  body: string
  date: string
}

export interface Member {
  name: string
  username: string
  role: 'member' | 'owner'
  avatar: AvatarProps
}

export interface Stat {
  title: string
  icon: string
  value: number | string
  variation: number
  formatter?: (value: number) => string
}

export interface Sale {
  id: string
  date: string
  status: SaleStatus
  email: string
  amount: number
}

export interface Notification {
  id: number
  unread?: boolean
  sender: User
  body: string
  date: string
}

export type Period = 'daily' | 'weekly' | 'monthly'

export interface Range {
  start: Date
  end: Date
}

// ── WLTH Hub header types ──────────────────────────────────────────────────

export type ProductId = 'broker' | 'pay' | 'shareholder' | 'dashboard' | 'customer'

export interface ProductNavItem {
  label: string
  icon?: string            // lucide icon name for tablet/mobile icon-only rendering
  isHome?: boolean         // renders as icon-only house button
  isCrossProduct?: boolean // opens cross-product switch in new tab
  hasDropdown?: boolean    // shows a chevron indicator when item has a dropdown menu
}

export interface Product {
  id: ProductId
  label: string
  icon: string
  baseUrl: string
  navItems: ProductNavItem[]
  entitySelectorState: EntitySelectorState
}

export interface HubNotification {
  id: string
  product: ProductId
  entityId: string
  title: string
  body?: string
  timestamp: string
  read: boolean
}
