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
  to?: string              // NuxtLink route for in-app navigation
  href?: string            // external href for cross-app navigation
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
  url?: string
}

// ── WLTH Chart types ──────────────────────────────────────────────────────

export type AppChartType = 'bar' | 'stacked-bar'

export type AppChartFormat = 'currency' | 'number' | 'percent' | ((v: number) => string)

export interface AppChartSeries {
  /** Unique identifier — matches keys in AppChartDataPoint.values */
  id: string
  /** Display label shown in the legend */
  label: string
  /** Tailwind color name (e.g. 'royalblue', 'green'). Defaults to chart color sequence. */
  color?: string
}

export interface AppChartDataPoint {
  /** Unique key per x-position (e.g. 'sept-25') */
  key: string
  /** Display label shown below the bar (e.g. 'Sept 25') */
  label: string
  /** Values keyed by series id (e.g. { business: 128, velocity: 60 }) */
  values: Record<string, number>
  /** Optional: overrides bar color for this data point (e.g. 'yellow' for warning/min state).
   *  Consuming app sets this based on its own business logic. */
  highlight?: string
}

export interface AppChartFormatOptions {
  /** Currency symbol prefix. Defaults to '$'. */
  currency?: string
}

/** A fully self-contained dataset for use with the AppChart dataset toggle. */
export interface AppChartDataset {
  /** Unique identifier for this dataset */
  id: string
  /** Label shown on the toggle button (e.g. 'Submitted Applications') */
  label: string
  /** Optional pre-formatted KPI value shown when this dataset is active (e.g. '$3.97m') */
  total?: string
  /** Series definitions for this dataset */
  series: AppChartSeries[]
  /** Data points for this dataset */
  data: AppChartDataPoint[]
}

declare module '@nuxt/schema' {
  interface AppConfigInput {
    wlth?: {
      /** Which product this app is — sets the default header context. */
      product?: ProductId
      /** Override the product's nav items with app-specific routes. */
      navItems?: ProductNavItem[]
      /** Chart component configuration */
      chart?: {
        /** Color sequence for multi-series charts. Tailwind color names.
         *  Defaults to ['royalblue', 'darkblue', 'green', 'yellow', 'red'] */
        colors?: string[]
      }
    }
  }
}
