# WLTH Pay — UX Patterns & UI Configuration Reference

> WLTH Pay (`pay.wlth.com`) is the north star product for the WLTH ecosystem.
> This document captures the design patterns, component conventions, and configuration
> that all WLTH products should follow for a consistent cross-product experience.
>
> Stack: Nuxt 4 + Nuxt UI v4 + `@wlth/design-system` (Nuxt layer)

---

## Table of Contents

1. [Project Setup](#1-project-setup)
2. [Layout Architecture](#2-layout-architecture)
3. [Design Tokens](#3-design-tokens)
4. [Typography](#4-typography)
5. [Spacing & Sizing](#5-spacing--sizing)
6. [Colour Usage](#6-colour-usage)
7. [Buttons](#7-buttons)
8. [Badges](#8-badges)
9. [Icons](#9-icons)
10. [Page Structure](#10-page-structure)
11. [Data Tables](#11-data-tables)
12. [Modals](#12-modals)
13. [Drawers (Slideover)](#13-drawers-slideover)
14. [Forms & Inputs](#14-forms--inputs)
15. [Status Patterns](#15-status-patterns)
16. [Alert & Notification Patterns](#16-alert--notification-patterns)
17. [Loading States](#17-loading-states)
18. [Responsive Patterns](#18-responsive-patterns)
19. [Animation](#19-animation)
20. [Component Patterns](#20-component-patterns)

---

## 1. Project Setup

### nuxt.config.ts

```ts
export default defineNuxtConfig({
  extends: ['@wlth/design-system'],   // always extend the design system layer
  modules: ['@nuxt/ui'],
  compatibilityDate: '2025-01-01',
  colorMode: {
    preference: 'light'               // force light mode — dark mode is not in scope
  },
  components: {
    dirs: [
      { path: '~/components', pathPrefix: false }  // name components by filename only, no path prefix
    ]
  }
})
```

### app.config.ts

Every product must declare its `wlth.product` key and `navItems`. The `product` key controls which product is active in the design system header. `navItems` populates `ProductNav`.

```ts
export default defineAppConfig({
  wlth: {
    product: 'pay',                   // must match a ProductId in useHeader()
    navItems: [
      { label: 'Home',     isHome: true,                 to: '/dashboard' },
      { label: 'Payments', icon: 'i-lucide-credit-card', to: '/payments' },
      { label: 'Payees',   icon: 'i-lucide-users',       to: '/payees' },
      { label: 'Cards',    icon: 'i-lucide-wallet',      to: '/cards' },
    ]
  }
})
```

- `isHome: true` — marks the item that the home icon in the nav should link to
- Settings is **not** a nav item — it lives in the avatar dropdown (`ProfileMenu`)
- Icons are always `i-lucide-*`

---

## 2. Layout Architecture

The app uses a **fixed-height, no-page-scroll** layout. The browser window never scrolls — only panels inside it do.

### default.vue

```html
<div class="flex flex-col h-screen overflow-hidden">
  <AppPageLoader />
  <AppHeader />

  <!-- Optional: product-level banner (KYC status, announcements) -->
  <div v-if="bannerConfig" class="w-full px-4 py-2.5 flex items-center justify-center gap-3 text-sm ...">
    ...
  </div>

  <main class="flex-1 min-h-0 max-w-7xl mx-auto w-full overflow-y-auto">
    <slot />
  </main>

  <!-- Global overlays mounted here, not inside pages -->
  <AlertsDrawer />
  <OnboardingWelcomeModal />
</div>
```

**Rules:**
- `h-screen overflow-hidden` on the root div — locks total height to the viewport
- `flex-1 min-h-0 overflow-y-auto` on `<main>` — gives it a definite height and its own scroll
- **Never use `min-h-screen`** on a page or layout element — it breaks the height constraint
- Global overlays (modals, drawers) are mounted in the layout, not inside pages

### Full-height pages (dashboard, payments, payees, cards)

Pages that should fill the viewport without scrolling:

```html
<div class="flex flex-col gap-6 p-3 lg:p-4 h-full overflow-hidden">
  <!-- header row -->
  <div class="flex items-center justify-between gap-4"> ... </div>

  <!-- growing list area -->
  <div class="flex-1 min-h-0">
    ...
  </div>
</div>
```

- `h-full overflow-hidden flex flex-col` on the outer div
- The growing section gets `flex-1 min-h-0`
- The list/table inside that section gets `h-full`

### Scrolling pages (settings, forms)

Long-form content pages do not use `h-full` — they scroll naturally via `<main>`'s `overflow-y-auto`. No special height classes needed.

---

## 3. Design Tokens

Tokens come from `@wlth/design-system/assets/css/tokens.css`. Use the semantic token classes — never hardcode hex values or arbitrary colours.

### Surfaces

| Class | Purpose |
|---|---|
| `bg-default` | Page/app background |
| `bg-muted` | Subtle containers, alternating rows, form inputs |
| `bg-elevated` | Cards, panels lifted off the background |
| `bg-accented` | Highlighted containers (active state, hover) |

### Semantic colours

| Class | Use |
|---|---|
| `bg-primary/5` | Very light primary tint (info notices) |
| `bg-primary/10` | Subtle primary tint (avatars, icons) |
| `bg-primary/20` | Medium primary tint |
| `bg-error/10` | Error/destructive context |
| `bg-warning/10` | Warning context |
| `bg-success/10` | Success context |

---

## 4. Typography

Font: **SuisseIntl** (self-hosted via the design system layer — no action needed in consuming apps).

### Text colour tokens

Always use semantic tokens, never `text-gray-*` or arbitrary colours.

| Class | Use |
|---|---|
| `text-default` | Primary text — body copy, headings, values |
| `text-toned` | Secondary text — labels, helper text, captions |
| `text-dimmed` | Tertiary — disabled, placeholder |
| `text-highlighted` | Emphasis — active states |
| `text-primary` | Brand primary colour |
| `text-error` | Error states |
| `text-warning` | Warning states |
| `text-success` | Success states |

### Type scale

```html
<!-- Page heading -->
<h1 class="text-2xl font-semibold text-default">Payments</h1>

<!-- Page subtitle -->
<p class="text-sm text-toned mt-1">Manage and track all your supplier payments</p>

<!-- Section label (uppercase, spaced) -->
<p class="text-xs font-medium text-toned uppercase tracking-wide">Card details</p>

<!-- Metric value -->
<p class="text-xl font-bold text-default">$42,300</p>

<!-- Body text -->
<p class="text-sm text-default">Payment processed successfully.</p>

<!-- Helper / caption -->
<p class="text-xs text-toned">Funds settle within 1–2 business days</p>
```

---

## 5. Spacing & Sizing

### Gap (flex/grid)

| Class | Use |
|---|---|
| `gap-2` | Compact — icon + label, tight groups |
| `gap-3` | Medium — related items |
| `gap-4` | Standard — between sections within a container |
| `gap-6` | Large — between major page sections |

### Padding

| Class | Use |
|---|---|
| `p-3` | Compact containers |
| `p-4` | Standard all-sides padding |
| `p-5` | Cards, elevated containers |
| `p-6` | Drawers, modals |
| `px-4 py-3` | Standard horizontal containers (headers, toolbars) |

### Border radius

| Class | Use |
|---|---|
| `rounded-lg` | Small elements (inputs, small chips) |
| `rounded-xl` | Primary — containers, notices, list items |
| `rounded-2xl` | Cards, metric tiles, large containers |
| `rounded-3xl` | Outer wrappers (settings panel, large sections) |
| `rounded-full` | Circles — avatars, icon containers, pill buttons |

### Icon sizing

```html
<UIcon name="i-lucide-check-circle" class="size-3.5" />  <!-- inline with text -->
<UIcon name="i-lucide-check-circle" class="size-4" />    <!-- standard -->
<UIcon name="i-lucide-check-circle" class="size-5" />    <!-- prominent -->
<UIcon name="i-lucide-check-circle" class="size-6" />    <!-- section header -->
<UIcon name="i-lucide-check-circle" class="size-8" />    <!-- empty state -->
```

Always add `shrink-0` when an icon sits inside a flex row with text.

---

## 6. Colour Usage

### Semantic colour → use

| Colour | When to use |
|---|---|
| `primary` | CTAs, links, active state, brand moments |
| `neutral` | Secondary actions, cancel buttons, ghost controls |
| `error` | Destructive actions, failures, form errors |
| `warning` | Caution, in-progress, attention needed |
| `success` | Completed, verified, paid |
| `info` | Scheduled, informational notices |

### Notice/banner backgrounds

Always pair semantic backgrounds with matching icon colours:

```html
<!-- Info / scheduled -->
<div class="flex gap-3 p-3 rounded-xl bg-primary/5">
  <UIcon name="i-lucide-info" class="size-4 text-primary shrink-0 mt-0.5" />
  ...
</div>

<!-- Warning / in-progress -->
<div class="flex gap-3 p-3 rounded-xl bg-warning/10">
  <UIcon name="i-lucide-alert-triangle" class="size-4 text-warning shrink-0 mt-0.5" />
  ...
</div>

<!-- Error / failed -->
<div class="flex gap-3 p-3 rounded-xl bg-error/10">
  <UIcon name="i-lucide-x-circle" class="size-4 text-error shrink-0 mt-0.5" />
  ...
</div>

<!-- Success -->
<div class="flex gap-3 p-3 rounded-xl bg-success/10">
  <UIcon name="i-lucide-check-circle" class="size-4 text-success shrink-0 mt-0.5" />
  ...
</div>
```

> **Never assemble Tailwind class names dynamically** (e.g. `` `bg-${color}/10` ``). Tailwind's content scanner can't see these and they'll be missing from the production CSS bundle. Always use a static lookup map:
>
> ```ts
> const bgMap = { warning: 'bg-warning/10', error: 'bg-error/10', info: 'bg-primary/5' }
> ```

---

## 7. Buttons

### Hierarchy

| Intent | Color + Variant |
|---|---|
| Primary CTA | `color="primary"` (default variant) |
| Secondary / cancel | `color="neutral" variant="soft"` |
| Ghost / icon-only | `color="neutral" variant="ghost"` |
| Destructive | `color="error"` |
| Destructive secondary | `color="error" variant="ghost"` |
| Outline / bordered | `color="neutral" variant="outline"` |

### Sizes

| Size | Use |
|---|---|
| `xs` | Icon-only close/dismiss buttons |
| `sm` | Toolbar actions, filter controls |
| `md` | Default — drawer/modal footers |
| `lg` | Primary page CTAs |

### Patterns

```html
<!-- Primary page action -->
<UButton color="primary" icon="i-lucide-plus" to="/payments/new">
  Make payment
</UButton>

<!-- Disabled with explanation -->
<UTooltip text="Available once your account is verified" :disabled="canTransact">
  <UButton color="primary" :disabled="!canTransact" :to="canTransact ? '/payments/new' : undefined">
    Make payment
  </UButton>
</UTooltip>

<!-- Paired footer buttons (modal/drawer) — always equal width -->
<div class="flex gap-3">
  <UButton variant="soft" color="neutral" class="flex-1" @click="close">Cancel</UButton>
  <UButton color="primary" class="flex-1" @click="submit">Confirm</UButton>
</div>

<!-- Destructive paired footer -->
<div class="flex gap-3">
  <UButton variant="soft" color="neutral" class="flex-1" @click="close">Cancel</UButton>
  <UButton color="error" class="flex-1" @click="remove">Remove</UButton>
</div>

<!-- Icon-only dismiss -->
<UButton variant="ghost" color="neutral" icon="i-lucide-x" size="xs" @click="close" />
```

---

## 8. Badges

Always use `variant="soft"` — it's the only badge variant used across the product.

```html
<!-- Status -->
<UBadge color="success" variant="soft" label="Paid" icon="i-lucide-check-circle" />
<UBadge color="warning" variant="soft" label="Processing" icon="i-lucide-loader" />
<UBadge color="error"   variant="soft" label="Failed" icon="i-lucide-x-circle" />
<UBadge color="info"    variant="soft" label="Scheduled" icon="i-lucide-calendar-clock" />
<UBadge color="neutral" variant="soft" label="Cancelled" />

<!-- State labels -->
<UBadge color="primary"  variant="soft" size="xs" label="Primary" />
<UBadge color="success"  variant="soft" size="xs" label="Verified" />
<UBadge color="warning"  variant="soft" size="xs" label="Expiring soon" />
<UBadge color="neutral"  variant="soft" size="xs" label="Coming soon" />
```

### Status badge component pattern

For any entity with multiple statuses, create a dedicated badge component with a static config map:

```ts
const config: Record<MyStatus, { color: BadgeColor; label: string; icon: string }> = {
  active:   { color: 'success', label: 'Active',   icon: 'i-lucide-check-circle' },
  pending:  { color: 'warning', label: 'Pending',  icon: 'i-lucide-clock' },
  inactive: { color: 'neutral', label: 'Inactive', icon: 'i-lucide-circle' },
  failed:   { color: 'error',   label: 'Failed',   icon: 'i-lucide-x-circle' },
}

const cfg = computed(() => config[props.status] ?? { color: 'neutral', label: props.status, icon: 'i-lucide-circle' })
```

```html
<UBadge :color="cfg.color" variant="soft" :label="cfg.label" :icon="cfg.icon" />
```

---

## 9. Icons

All icons use the Lucide library via `@iconify-json/lucide`. Always prefix with `i-lucide-`.

### Common icon vocabulary

| Icon | Use |
|---|---|
| `i-lucide-plus` | Add / create |
| `i-lucide-x` | Close / dismiss |
| `i-lucide-check-circle` | Success / complete |
| `i-lucide-x-circle` | Failed / error |
| `i-lucide-alert-circle` | Warning / overdue |
| `i-lucide-alert-triangle` | Caution / action required |
| `i-lucide-loader` / `i-lucide-loader-2` | Processing / loading |
| `i-lucide-calendar-clock` | Scheduled |
| `i-lucide-ban` | Cancelled / blocked |
| `i-lucide-shield-check` | Verified |
| `i-lucide-search` | Search |
| `i-lucide-sliders-horizontal` | Filters |
| `i-lucide-arrow-up-down` | Sortable column |
| `i-lucide-arrow-up` / `i-lucide-arrow-down` | Sort direction |
| `i-lucide-chevron-right` | Navigation, expand |
| `i-lucide-download` | Export / download |
| `i-lucide-copy` | Copy to clipboard |
| `i-lucide-trash-2` | Delete |

### Avatar / icon containers

```html
<!-- Small avatar (initials) -->
<div class="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-semibold text-xs">
  A
</div>

<!-- Medium icon container -->
<div class="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
  <UIcon name="i-lucide-credit-card" class="size-5 text-primary" />
</div>

<!-- Large icon container (modal/confirm header) -->
<div class="size-12 rounded-xl bg-error/10 flex items-center justify-center shrink-0">
  <UIcon name="i-lucide-trash-2" class="size-6 text-error" />
</div>
```

---

## 10. Page Structure

### Standard list page

```html
<div class="flex flex-col gap-6 p-3 lg:p-4 h-full overflow-hidden">

  <!-- Page header -->
  <div class="flex items-center justify-between gap-4">
    <div>
      <h1 class="text-2xl font-semibold text-default">Page Title</h1>
      <p class="text-sm text-toned mt-1">Subtitle describing the page</p>
    </div>
    <UButton color="primary" icon="i-lucide-plus">Primary action</UButton>
  </div>

  <!-- Optional: alert banners (RFI, warnings) -->
  <div v-if="alerts.length" class="flex flex-col gap-3">
    <AlertBanner v-for="alert in alerts" :key="alert.id" :alert="alert" />
  </div>

  <!-- Optional: metric cards -->
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
    <DashboardMetricCard v-for="..." ... />
  </div>

  <!-- Growing list area -->
  <div class="flex-1 min-h-0">
    <div class="hidden md:block h-full">
      <MyListA class="h-full" />   <!-- desktop table -->
    </div>
    <div class="md:hidden h-full flex flex-col">
      <MyListB class="h-full" />   <!-- mobile card list -->
    </div>
  </div>

  <!-- Overlays (mounted here, not in layout) -->
  <MyDetailDrawer />
  <NuxtPage />  <!-- child route modals -->

</div>
```

### Metric card

```html
<div class="bg-muted rounded-2xl px-4 py-3 flex flex-col gap-1">
  <p class="text-xs font-medium text-toned uppercase tracking-wide">Label</p>
  <p class="text-xl font-bold text-default">$42,300</p>
  <p class="text-xs text-toned">Subtitle</p>
  <!-- optional action link -->
  <button class="text-xs text-primary font-medium hover:underline text-left" @click="...">
    View payments
  </button>
</div>
```

### Settings page (sidebar + content)

```html
<div class="p-3 lg:p-4 h-full overflow-hidden flex flex-col">
  <div class="rounded-3xl overflow-hidden bg-elevated flex flex-1 min-h-0">

    <!-- Sidebar -->
    <div class="w-56 shrink-0 border-r border-muted flex flex-col gap-2 p-8 overflow-y-auto">
      <button
        v-for="item in sections"
        :key="item.id"
        class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors"
        :class="activeSection === item.id ? 'bg-primary/10 text-primary font-medium' : 'text-toned hover:bg-muted hover:text-default'"
        @click="scrollTo(item.id)"
      >
        <UIcon :name="item.icon" class="size-4 shrink-0" />
        {{ item.label }}
      </button>
    </div>

    <!-- Scrollable content -->
    <div ref="contentEl" class="flex-1 min-w-0 overflow-y-auto p-8 flex flex-col gap-10">
      <section v-for="section in sections" :key="section.id" :id="section.id">
        ...
      </section>
    </div>

  </div>
</div>
```

---

## 11. Data Tables

Use `UTable` from Nuxt UI v4. **Never enable internal TanStack sorting** — sort state must live in the composable and be applied to the full dataset before pagination.

### Column definition

```ts
import type { TableColumn } from '@nuxt/ui'

const columns: TableColumn<MyType>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    meta: { class: { th: 'w-[30%]' } },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    meta: { class: { th: 'w-[15%] text-right', td: 'text-right' } },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    meta: { class: { th: 'w-[15%]' } },
  },
  {
    id: 'actions',
    header: '',
    enableSorting: false,
    meta: { class: { th: 'w-[10%]' } },
  },
]

const tableUI = { base: 'table-fixed', th: '!bg-elevated !text-toned py-3' }
```

### Table template

```html
<UTable
  :data="payments"
  :columns="columns"
  :ui="tableUI"
  :sorting="sorting"
  sticky="header"
  class="flex-1 min-h-0"
  @update:sorting="setSorting"
  @select="(_, row) => selectItem(row.original)"
>
  <!-- Sortable column header -->
  <template #name-header="{ column }">
    <button
      class="flex items-center gap-2 hover:text-default transition-colors"
      @click="column.getToggleSortingHandler()?.($event)"
    >
      Name
      <UIcon
        :name="column.getIsSorted() === 'asc' ? 'i-lucide-arrow-up'
             : column.getIsSorted() === 'desc' ? 'i-lucide-arrow-down'
             : 'i-lucide-arrow-up-down'"
        class="size-3.5"
        :class="column.getIsSorted() ? 'text-primary' : 'text-toned'"
      />
    </button>
  </template>

  <!-- Avatar + name cell -->
  <template #name-cell="{ row }">
    <div class="flex items-center gap-3">
      <div class="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-semibold text-xs">
        {{ row.original.name.charAt(0).toUpperCase() }}
      </div>
      <span class="font-medium text-default">{{ row.original.name }}</span>
    </div>
  </template>

  <!-- Loading + empty state -->
  <template #empty>
    <div class="flex flex-col items-center justify-center py-16 gap-4">
      <template v-if="loading">
        <div class="size-12 rounded-full bg-muted animate-pulse" />
        <div class="flex flex-col items-center gap-2">
          <div class="h-4 w-32 rounded bg-muted animate-pulse" />
          <div class="h-3 w-48 rounded bg-muted animate-pulse" />
        </div>
      </template>
      <template v-else>
        <UIcon name="i-lucide-search-x" class="size-8 text-toned" />
        <div class="text-center">
          <p class="font-semibold text-default">No results found</p>
          <p class="text-sm text-toned mt-1">Try adjusting your filters</p>
        </div>
        <UButton color="neutral" variant="ghost" size="sm" @click="resetFilters">Clear filters</UButton>
      </template>
    </div>
  </template>
</UTable>
```

### Sorting architecture

Sort state lives in the composable, not TanStack. This ensures sort applies to the full dataset, not just the current page.

```ts
// In the composable
const sort = useState<{ id: string; desc: boolean } | null>('items.sort', () => null)

const sortedItems = computed(() => {
  if (!sort.value) return filteredItems.value
  const { id, desc } = sort.value
  return filteredItems.value.slice().sort((a, b) => {
    const av = a[id], bv = b[id]
    if (av < bv) return desc ? 1 : -1
    if (av > bv) return desc ? -1 : 1
    return 0
  })
})

const sorting = computed(() => sort.value ? [sort.value] : [])
function setSorting(val: { id: string; desc: boolean }[] | undefined) {
  sort.value = val?.[0] ?? null
  currentPage.value = 1  // reset to page 1 on sort change
}
```

---

## 12. Modals

Use `UModal`. Content goes in the `#content` slot for full control.

### Confirmation modal (destructive action)

```html
<UModal v-model:open="isOpen" title="Remove item">
  <template #content>
    <div class="p-6 flex flex-col gap-6">
      <div class="flex items-start gap-4">
        <div class="size-12 rounded-xl bg-error/10 flex items-center justify-center shrink-0">
          <UIcon name="i-lucide-trash-2" class="size-6 text-error" />
        </div>
        <div>
          <p class="font-semibold text-default">Remove item?</p>
          <p class="text-sm text-toned mt-1">This action cannot be undone.</p>
        </div>
      </div>
      <div class="flex gap-3">
        <UButton variant="soft" color="neutral" class="flex-1" @click="isOpen = false">Cancel</UButton>
        <UButton color="error" class="flex-1" @click="confirm">Remove</UButton>
      </div>
    </div>
  </template>
</UModal>
```

### Multi-step flow modal

```html
<UModal
  v-model:open="open"
  :dismissible="!isMidFlow"
  :fullscreen="isMobile"
>
  <!-- Step progress indicator -->
  <!-- Step router (v-if per step) -->
  <!-- Back / Next footer buttons -->
</UModal>
```

- Free close on step 1 (`:dismissible="true"`)
- Confirm abandon with "discard / continue later" options on step 2+

---

## 13. Drawers (Slideover)

Use `USlideover` with `side="right"`. Always use `#content` for full layout control (header + scrollable body + footer).

```html
<USlideover v-model:open="isOpen" side="right">
  <template #content>
    <div class="flex flex-col h-full">

      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-5 border-b border-muted shrink-0">
        <h2 class="font-semibold text-default">Drawer Title</h2>
        <UButton variant="ghost" color="neutral" icon="i-lucide-x" size="xs" @click="isOpen = false" />
      </div>

      <!-- Scrollable body -->
      <div class="flex flex-col gap-6 px-6 py-6 flex-1 overflow-y-auto">

        <!-- Section pattern -->
        <div class="flex flex-col gap-3">
          <p class="text-xs font-semibold text-toned uppercase tracking-wide">Section Label</p>
          <div class="rounded-2xl bg-muted p-5 flex flex-col gap-4">
            <!-- content -->
          </div>
        </div>

      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t border-muted flex gap-2 shrink-0">
        <UButton variant="soft" color="neutral" class="flex-1" @click="isOpen = false">Cancel</UButton>
        <UButton color="primary" class="flex-1" @click="submit">Save</UButton>
      </div>

    </div>
  </template>
</USlideover>
```

### Detail drawer pattern (read-only)

For viewing entity details (payments, payees, etc.), the footer contains contextual actions (cancel, retry, download) and the body contains labelled field rows:

```html
<!-- Field row -->
<div class="flex items-center justify-between py-3 border-b border-muted last:border-0">
  <span class="text-sm text-toned">Label</span>
  <span class="text-sm font-medium text-default">Value</span>
</div>
```

---

## 14. Forms & Inputs

### Nuxt UI inputs

Use Nuxt UI form components for standard fields:

```html
<UInput
  v-model="search"
  placeholder="Search…"
  icon="i-lucide-search"
  size="sm"
  color="neutral"
  variant="subtle"
/>

<USelect
  v-model="status"
  :items="statusOptions"
  value-key="value"
  label-key="label"
  placeholder="All statuses"
/>
```

> In Nuxt UI v4, use `items` (not `options`) on `USelect`, and use `value-key` / `label-key` for object arrays.

### Custom inputs

For inputs not covered by Nuxt UI components (e.g. card number formatting, custom masks):

```html
<!-- Text input -->
<input
  v-model="value"
  type="text"
  placeholder="Placeholder"
  class="w-full h-10 rounded-lg bg-muted px-3 text-sm text-default placeholder:text-dimmed focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
/>

<!-- Textarea -->
<textarea
  v-model="value"
  rows="3"
  class="w-full rounded-lg bg-muted px-3 py-3 text-sm text-default placeholder:text-dimmed focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors resize-none"
/>
```

### Form section pattern (in a drawer or page)

```html
<div class="flex flex-col gap-3">
  <p class="text-xs font-semibold text-toned uppercase tracking-wide">Section title</p>
  <div class="rounded-2xl bg-muted p-5 flex flex-col gap-4">
    <div class="flex flex-col gap-1.5">
      <label class="text-xs font-medium text-toned">Field label</label>
      <UInput v-model="value" placeholder="..." />
    </div>
  </div>
</div>
```

---

## 15. Status Patterns

### Inline status notices (in detail views)

Used in drawers and detail panels to communicate the current state of an entity. Always `rounded-xl` with semantic background.

```html
<!-- In-approval / action required -->
<div class="flex gap-3 p-3 rounded-xl bg-warning/10">
  <UIcon name="i-lucide-file-search" class="size-4 text-warning shrink-0 mt-0.5" />
  <div class="flex-1 min-w-0">
    <p class="text-sm font-medium text-default">Action required</p>
    <p class="text-sm text-toned mt-0.5">Description of what the user needs to do.</p>
  </div>
</div>

<!-- Scheduled -->
<div class="flex gap-3 p-3 rounded-xl bg-primary/5">
  <UIcon name="i-lucide-calendar-clock" class="size-4 text-primary shrink-0 mt-0.5" />
  <p class="text-sm text-default">
    Scheduled to send on <strong>{{ date }}</strong>
  </p>
</div>

<!-- Processing -->
<div class="flex gap-3 p-3 rounded-xl bg-warning/10">
  <UIcon name="i-lucide-loader" class="size-4 text-warning shrink-0 mt-0.5" />
  <p class="text-sm text-default">Processing — typically settles within 1–2 business days.</p>
</div>

<!-- Failed -->
<div class="flex gap-3 p-3 rounded-xl bg-error/10">
  <UIcon name="i-lucide-x-circle" class="size-4 text-error shrink-0 mt-0.5" />
  <div class="flex-1 min-w-0">
    <p class="text-sm font-medium text-default">Failed</p>
    <p class="text-sm text-toned mt-0.5">This could not be processed.</p>
  </div>
</div>

<!-- Cancelled -->
<div class="flex gap-3 p-3 rounded-xl bg-muted">
  <UIcon name="i-lucide-ban" class="size-4 text-toned shrink-0 mt-0.5" />
  <p class="text-sm text-toned">This was cancelled and will not be processed.</p>
</div>
```

---

## 16. Alert & Notification Patterns

WLTH Pay has two alert systems. Both must be wired up in every product.

### 1. `useAlerts()` — compliance / action-required alerts

Alerts are non-dismissable compliance notices (RFI, verification, account issues). They surface in three places:

**Inline banner on the relevant page:**
```html
<div v-if="rfiAlerts.length" class="flex flex-col gap-3">
  <AlertBanner v-for="alert in rfiAlerts" :key="alert.id" :alert="alert" />
</div>
```

**`AlertsDrawer`** — must be mounted in `default.vue`:
```html
<AlertsDrawer />
```

**Bell icon (via bridge plugin)** — create `plugins/alerts-notifications.client.ts` to sync `useAlerts()` into `useHeader().notifications`:
```ts
export default defineNuxtPlugin(() => {
  const { alerts } = useAlerts()
  const { notifications } = useHeader()

  watchEffect(() => {
    for (const alert of alerts.value) {
      if (!alert.id.startsWith('rfi_')) continue
      const notifId = `alert_${alert.id}`
      if (notifications.value.some(n => n.id === notifId)) continue
      notifications.value.unshift({
        id: notifId,
        product: 'pay',           // set to this product's id
        entityId: 'entity-1',
        title: alert.title,
        body: alert.description,
        timestamp: new Date().toISOString(),
        read: false,
      })
    }
  })
})
```

### 2. `useHeader()` notifications — activity / product notifications

General activity notifications managed by the design system (payment received, onboarding complete, etc.). These appear in the bell icon `NotificationsTray` automatically via `AppHeader`.

---

## 17. Loading States

All list views and metric grids show skeleton placeholders while data loads. Never show empty state before data has loaded.

### List empty slot (UTable)

```html
<template #empty>
  <div class="flex flex-col items-center justify-center py-16 gap-4">
    <template v-if="loading">
      <div class="size-12 rounded-full bg-muted animate-pulse" />
      <div class="flex flex-col items-center gap-2">
        <div class="h-4 w-32 rounded bg-muted animate-pulse" />
        <div class="h-3 w-48 rounded bg-muted animate-pulse" />
      </div>
    </template>
    <template v-else-if="error">
      <UIcon name="i-lucide-alert-circle" class="size-8 text-error" />
      <p class="text-sm text-toned">{{ error }}</p>
    </template>
    <template v-else>
      <UIcon name="i-lucide-search-x" class="size-8 text-toned" />
      <div class="text-center">
        <p class="font-semibold text-default">No results found</p>
        <p class="text-sm text-toned mt-1">Try adjusting your filters</p>
      </div>
      <UButton color="neutral" variant="ghost" size="sm" @click="resetFilters">Clear filters</UButton>
    </template>
  </div>
</template>
```

### Metric card skeletons

```html
<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
  <template v-if="loading">
    <div v-for="n in 4" :key="n" class="rounded-2xl bg-muted animate-pulse h-24" />
  </template>
  <template v-else>
    <!-- actual cards -->
  </template>
</div>
```

---

## 18. Responsive Patterns

### Desktop table / mobile card list (A/B pattern)

Dense tables don't work on small screens. Every list has two variants — the desktop table and a mobile card list. **No horizontal scrolling ever.**

```html
<div class="hidden md:block h-full">
  <MyListA class="h-full" />   <!-- UTable, full columns, sorting -->
</div>
<div class="md:hidden h-full flex flex-col">
  <MyListB class="h-full" />   <!-- stacked card layout, no table -->
</div>
```

The mobile `B` variant root must be `h-full`, and its table container `flex-1 min-h-0`. The wrapper `md:hidden` div must be `h-full flex flex-col`.

### Responsive grid

```html
<!-- 2 col mobile → 4 col desktop -->
<div class="grid grid-cols-2 lg:grid-cols-4 gap-4"> ... </div>

<!-- Padding: tighter on mobile -->
<div class="p-3 lg:p-4"> ... </div>
```

### Hiding on mobile

```html
<span class="hidden md:inline">Full label</span>
<span class="md:hidden">Short</span>
```

---

## 19. Animation

### Loader/spinner

```html
<UIcon name="i-lucide-loader-2" class="size-4 animate-spin text-primary" />
```

### Skeleton pulse

```html
<div class="h-4 w-32 rounded bg-muted animate-pulse" />
```

### Hover transitions

All interactive elements use `transition-colors`:

```html
<button class="... hover:bg-accented transition-colors">...</button>
<NuxtLink class="... hover:text-default transition-colors">...</NuxtLink>
```

### Custom animations

Only use custom keyframe animations when Tailwind utilities don't cover the need. Always include `prefers-reduced-motion` guards:

```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-6px); }
}
.animate-float { animation: float 3s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .animate-float { animation: none; }
}
```

---

## 20. Component Patterns

### Shared composable (SSR-safe state)

All shared state uses `createSharedComposable` + `useState`. This is SSR-safe and requires no Pinia.

```ts
export const useMyFeature = createSharedComposable(() => {
  const items = useState<MyType[]>('myfeature.items', () => [])
  const loading = useState('myfeature.loading', () => false)

  async function init() {
    if (!import.meta.client) return
    if (loading.value) return
    loading.value = true
    try {
      items.value = await $fetch<MyType[]>('/api/my-items')
    } finally {
      loading.value = false
    }
  }

  return { items, loading, init }
})
```

When the backend is ready, the only change is swapping the `useState` initialiser for a `useFetch` call — no component changes needed.

### Props and emits

```ts
// Typed props
const props = defineProps<{
  item: MyType
  size?: 'sm' | 'md' | 'lg'
}>()

// Typed emits
const emit = defineEmits<{
  select: [item: MyType]
  close: []
}>()

// Two-way binding (open state for modals/drawers)
const open = defineModel<boolean>('open', { default: false })
```

### Script-first component order

```vue
<script setup lang="ts">
// always first
</script>

<template>
  <!-- second -->
</template>

<!-- no <style> blocks — Tailwind only -->
```

### Dynamic class lookup maps

Never assemble Tailwind classes dynamically. Always use a static map:

```ts
// ✅ correct
const bgMap: Record<Severity, string> = {
  warning: 'bg-warning/10',
  error:   'bg-error/10',
  info:    'bg-primary/5',
}

// ❌ wrong — Tailwind scanner can't see these
const bg = `bg-${severity}/10`
```

---

## Quick Reference

| Pattern | Rule |
|---|---|
| Layout | `h-screen overflow-hidden` root, `flex-1 min-h-0 overflow-y-auto` on `<main>` |
| Pages | `h-full overflow-hidden flex flex-col` on outer div, `flex-1 min-h-0` on growing section |
| No scroll | Never `min-h-screen`. Never horizontal scroll. |
| Overlays | Mount in layout (`default.vue`), not in pages |
| Colours | Semantic tokens only — never hardcoded hex |
| Dynamic classes | Static lookup maps, never template literals |
| Badges | Always `variant="soft"` |
| Sorting | Composable-level, not TanStack internal |
| Mobile lists | A (table) + B (cards) variants, hidden/shown with `md:` breakpoint |
| State | `createSharedComposable` + `useState` — no Pinia |
| Tailwind values | Design token scale only — no arbitrary `[]` values outside token set |
