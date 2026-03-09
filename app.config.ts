export default defineAppConfig({
  ui: {
    // Semantic color mapping — Nuxt UI v4 Design Kit (WLTH).
    // Custom palettes defined via @theme in tokens.css.
    colors: {
      primary: 'royalblue', // CTAs, active nav, brand accents
      secondary: 'darkblue', // Secondary actions, alternative highlights
      success: 'green', // Success states, positive confirmations
      info: 'lightgrey', // Informational alerts, tooltips
      warning: 'yellow', // Warning states, pending indicators
      error: 'red', // Error states, destructive actions
      neutral: 'lightgrey', // Text, borders, surfaces, disabled states
      nav: 'royalblue', // Nav buttons — base palette; states overridden by compoundVariants below
      pill: 'royalblue' // Bordered pill triggers — ProductSwitcher + EntitySelector
    },
    button: {
      // Global nav button — use color="nav" on any UButton for consistent
      // navigation styling. Edit states here to affect all nav buttons.
      compoundVariants: [
        {
          // Inactive nav item
          color: 'nav',
          variant: 'soft',
          class: 'bg-(--ui-bg-elevated) text-lightgrey-900 hover:bg-lightgrey-400 hover:text-lightgrey-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royalblue-300 rounded-full hover:scale-102 transition-transform'
        },
        {
          // Active / selected nav item
          color: 'nav',
          variant: 'solid',
          class: 'bg-royalblue-500 text-white hover:bg-royalblue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royalblue-300 rounded-full hover:scale-102 transition-transform'
        },
        {
          // Pill trigger — closed/default state
          color: 'pill',
          variant: 'soft',
          class: 'flex items-center gap-1.5 rounded-[24px] border border-lightgrey-600 px-3 py-1.5 text-sm bg-transparent hover:bg-lightgrey-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royalblue-300 transition-colors'
        },
        {
          // Pill trigger — open state (dropdown is open)
          color: 'pill',
          variant: 'solid',
          class: 'flex items-center gap-1.5 rounded-[24px] border-2 border-(--ui-border-highlighted) px-3 py-1.5 text-sm bg-(--ui-bg-accented) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royalblue-300 transition-colors'
        }
      ]
    },
    dropdownMenu: {
      // Global dropdown panel + item styling.
      // content  — the popup panel
      // item     — each row (hover highlight lives in the before: pseudo element)
      // itemLabel — the label text
      slots: {
        content: 'bg-lightgrey-50 ring-0 border border-lightgrey-300 rounded-xl shadow-xl py-4 px-4',
        group: 'p-1 isolate flex flex-col gap-1',
        item: 'rounded-lg',
        itemLabel: 'text-lightgrey-900 font-medium',
        itemTrailing: 'ms-auto inline-flex gap-1.5 items-center pl-4 text-(--ui-text-highlighted)',
      },
      compoundVariants: [
        {
          // Unhovered / unselected item
          active: false,
          class: {
            item: 'data-highlighted:text-lightgrey-950 data-highlighted:before:bg-lightgrey-200',
            itemLeadingIcon: 'group-data-highlighted:text-(--ui-text-highlighted)',
          }
        },
        {
          // Current / active item — visually distinct, non-interactive
          active: true,
          class: {
            item: 'before:bg-royalblue-50 text-royalblue-500 cursor-default data-disabled:opacity-100',
            itemLeadingIcon: 'text-royalblue-400',
          }
        }
      ]
    },
    drawer: {
      // UDrawer global styling.
      slots: {
        content: 'bg-white ring-0 border-l border-lightgrey-300 shadow-xl px-4',
      }
    },
    slideover: {
      slots: {
        content: 'bg-white ring-0 border-r border-lightgrey-300 shadow-xl',
      }
    },
    tabs: {
      slots: {
        list: 'bg-lightgrey-200',
      }
    }
  }
})
