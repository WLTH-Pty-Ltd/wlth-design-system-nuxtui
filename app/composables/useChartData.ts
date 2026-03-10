import type { Ref } from 'vue'
import type { AppChartDataPoint, AppChartSeries, AppChartFormat } from '../types/index'

export interface UseChartDataSeriesConfig<T> {
  /** Series identifier — must match a key you want in AppChartDataPoint.values */
  id: string
  /** Display label for the legend */
  label: string
  /** The field in each source row that holds this series' numeric value */
  valueField: keyof T
  /** Optional Tailwind color name (e.g. 'royalblue') */
  color?: string
}

export interface UseChartDataOptions<T extends Record<string, unknown>> {
  /** Async function that returns the raw data array from any source
   *  (Supabase, HubSpot, $fetch, useFetch result, etc.) */
  source: () => Promise<T[]>
  /** Field in each row used as the unique key (e.g. 'month', 'id') */
  keyField: keyof T
  /** Field in each row used as the display label (e.g. 'monthLabel', 'name') */
  labelField: keyof T
  /** Series definitions — one entry per metric you want to chart */
  series: UseChartDataSeriesConfig<T>[]
  /** Optional: field that provides a highlight color override per row */
  highlightField?: keyof T
  /** Trigger a fetch immediately on composable init. Default: true */
  immediate?: boolean
}

export interface UseChartDataReturn {
  /** Ready-to-bind chart data — pass directly to <AppChart :data="data" /> */
  data: Ref<AppChartDataPoint[]>
  /** Derived series config — pass directly to <AppChart :series="series" /> */
  series: AppChartSeries[]
  /** True while the source fetch is in-flight */
  isLoading: Ref<boolean>
  /** Error from last failed fetch, or null */
  error: Ref<Error | null>
  /** Re-run the source fetch (e.g. on filter change) */
  refresh: () => Promise<void>
}

/**
 * useChartData — connects any async data source to the AppChart component.
 *
 * @example Supabase
 * const { data, series, isLoading } = useChartData({
 *   source: () => supabase.from('rewards').select('month,monthLabel,businessPoints').then(r => r.data ?? []),
 *   keyField: 'month',
 *   labelField: 'monthLabel',
 *   series: [{ id: 'business', label: 'Business Rewards', valueField: 'businessPoints', color: 'royalblue' }]
 * })
 *
 * @example REST / $fetch
 * const { data, series } = useChartData({
 *   source: () => $fetch('/api/payments/monthly'),
 *   keyField: 'periodKey',
 *   labelField: 'periodLabel',
 *   series: [
 *     { id: 'amex',         label: 'Amex',          valueField: 'amexTotal' },
 *     { id: 'mastercard',   label: 'Mastercard',     valueField: 'mastercardTotal' },
 *     { id: 'bankTransfer', label: 'Bank Transfer',  valueField: 'bankTransferTotal' },
 *   ]
 * })
 */
export function useChartData<T extends Record<string, unknown>>(
  options: UseChartDataOptions<T>
): UseChartDataReturn {
  const {
    source,
    keyField,
    labelField,
    series: seriesConfig,
    highlightField,
    immediate = true,
  } = options

  const data = ref<AppChartDataPoint[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  // Derive the AppChartSeries array once — it's static config, not data-dependent
  const series: AppChartSeries[] = seriesConfig.map(s => ({
    id: s.id,
    label: s.label,
    color: s.color,
  }))

  async function refresh() {
    isLoading.value = true
    error.value = null
    try {
      const rows = await source()
      data.value = rows.map(row => {
        const values: Record<string, number> = {}
        for (const s of seriesConfig) {
          const raw = row[s.valueField]
          values[s.id] = typeof raw === 'number' ? raw : Number(raw) || 0
        }
        return {
          key: String(row[keyField]),
          label: String(row[labelField]),
          values,
          highlight: highlightField ? (row[highlightField] as string | undefined) : undefined,
        }
      })
    }
    catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e))
    }
    finally {
      isLoading.value = false
    }
  }

  if (immediate) {
    refresh()
  }

  return { data, series, isLoading, error, refresh }
}
