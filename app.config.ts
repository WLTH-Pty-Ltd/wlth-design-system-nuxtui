export default defineAppConfig({
  // Product variant config — consuming apps override this to set their context.
  // See app/types/index.d.ts for the full WlthAppConfig type.
  wlth: {
    // Chart color sequence for multi-series charts.
    // Consuming apps can override to reorder or substitute colors.
    chart: {
      colors: ['royalblue', 'darkblue', 'green', 'yellow', 'red'],
    },
  },

  ui: {

    // ─── Palette ──────────────────────────────────────────────────────────────
    // Semantic color aliases mapped to custom palettes defined in tokens.css.
    // These names become the available `color` prop values across all Nuxt UI
    // components (e.g. <UButton color="primary" />).
    colors: {
      primary:   'royalblue',  // CTAs, active nav, brand accents
      secondary: 'darkblue',   // Secondary actions, alternative highlights
      success:   'green',      // Success states, positive confirmations
      info:      'lightgrey',  // Informational alerts, tooltips
      warning:   'yellow',     // Warning states, pending indicators
      error:     'red',        // Error states, destructive actions
      neutral:   'lightgrey',  // Text, borders, surfaces, disabled states
      nav:       'royalblue',  // Nav pill buttons — states overridden by compoundVariants below
      pill:      'royalblue',  // Dropdown pill triggers — ProductSwitcher + EntitySelector
    },


    // ─── Navigation ───────────────────────────────────────────────────────────
    // UButton compoundVariants for the two custom navigation colors:
    //   color="nav"  — horizontal nav pills in ProductNav
    //   color="pill" — pill-shaped dropdown triggers in ProductSwitcher + EntitySelector
    //
    // variant="soft"  → inactive / closed state
    // variant="solid" → active / open state
    button: {
      compoundVariants: [
        {
          // Nav pill — inactive
          color: 'nav',
          variant: 'soft',
          class: 'bg-(--ui-bg-elevated) text-lightgrey-900 hover:bg-lightgrey-400 hover:text-lightgrey-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royalblue-300 rounded-full hover:scale-102 transition-transform',
        },
        {
          // Nav pill — active / current page
          color: 'nav',
          variant: 'solid',
          class: 'bg-royalblue-500 text-white hover:bg-royalblue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royalblue-300 rounded-full hover:scale-102 transition-transform',
        },
        {
          // Dropdown pill trigger — closed / default
          color: 'pill',
          variant: 'soft',
          class: 'flex items-center gap-1.5 rounded-[24px] border border-lightgrey-600 px-3 py-1.5 text-sm bg-transparent hover:bg-lightgrey-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royalblue-300 transition-colors',
        },
        {
          // Dropdown pill trigger — open (dropdown is visible)
          color: 'pill',
          variant: 'solid',
          class: 'flex items-center gap-1.5 rounded-[24px] border-2 border-(--ui-border-highlighted) px-3 py-1.5 text-sm bg-(--ui-bg-accented) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royalblue-300 transition-colors',
        },
      ],
    },


    // ─── Menus ────────────────────────────────────────────────────────────────

    // UDropdownMenu — action/navigation menu panel and item rows.
    // Used by: ProfileMenu, and any UDropdownMenu with color="pill" triggers.
    //
    // Slots:
    //   content     — the floating panel
    //   group       — wraps each item group
    //   item        — individual row (hover highlight via ::before pseudo)
    //   itemLabel   — row label text
    //   itemTrailing — right-side content (kbd hints, icons)
    //
    // compoundVariants:
    //   active=false — unhovered / unselected row
    //   active=true  — current / highlighted row (non-interactive, visually distinct)
    dropdownMenu: {
      slots: {
        content:      'bg-lightgrey-50 ring-0 border border-lightgrey-300 rounded-xl shadow-xl py-4 px-4',
        group:        'p-1 isolate flex flex-col gap-1',
        item:         'rounded-lg',
        itemLabel:    'text-lightgrey-900 font-medium',
        itemTrailing: 'ms-auto inline-flex gap-1.5 items-center pl-4 text-(--ui-text-highlighted)',
      },
      compoundVariants: [
        {
          // Unhovered / unselected row
          active: false,
          class: {
            item:            'data-highlighted:text-lightgrey-950 data-highlighted:before:bg-lightgrey-200',
            itemLeadingIcon: 'group-data-highlighted:text-(--ui-text-highlighted)',
          },
        },
        {
          // Current / active row — visually distinct, non-interactive
          active: true,
          class: {
            item:            'before:bg-royalblue-50 text-royalblue-500 cursor-default data-disabled:opacity-100',
            itemLeadingIcon: 'text-royalblue-400',
          },
        },
      ],
    },

    // USelect — option picker dropdown panel and item rows.
    // Used by: all <USelect /> instances (forms, playground controls, etc.)
    //
    // Mirrors dropdownMenu panel styling for visual consistency.
    selectMenu: {
      slots: {
        content:      'bg-(--ui-bg-muted) ring-0 border border-(--ui-border-muted) rounded-xl shadow-xl py-2',
        item:         'rounded-lg',
        itemLabel:    'text-lightgrey-900 font-medium',
      },
      compoundVariants: [
        {
          active: false,
          class: {
            item:            'data-highlighted:text-lightgrey-950 data-highlighted:before:bg-(--ui-bg-elevated)',
            itemLeadingIcon: 'group-data-highlighted:text-(--ui-text-highlighted)',
          },
        },
        {
          active: true,
          class: {
            item:            'before:bg-royalblue-50 text-royalblue-500 cursor-default data-disabled:opacity-100',
            itemLeadingIcon: 'text-royalblue-400',
          },
        },
      ],
    },


    // ─── Overlays ─────────────────────────────────────────────────────────────

    // UDrawer — slides in from the bottom or side. Used by: NotificationsTray,
    // MobileMenuDrawer.
    drawer: {
      slots: {
        content: 'bg-white ring-0 border-l border-lightgrey-300 shadow-xl px-4',
      },
    },

    // USlideover — slides in from the right edge. Used by: NotificationsSlideover.
    slideover: {
      slots: {
        content: 'bg-white ring-0 border-r border-lightgrey-300 shadow-xl',
      },
    },


    // ─── Layout ───────────────────────────────────────────────────────────────

    // UTabs — segmented content switcher tab list background.
    tabs: {
      slots: {
        list: 'bg-lightgrey-200',
      },
    },


    // ─── Form controls ────────────────────────────────────────────────────────

  },
})
