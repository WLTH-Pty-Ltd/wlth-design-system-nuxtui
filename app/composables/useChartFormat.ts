import type { AppChartFormat, AppChartFormatOptions } from '../types/index'

/**
 * Format a numeric value for chart display.
 *
 * 'currency'  — abbreviates large numbers with a currency symbol prefix
 *               e.g. 1234567 → "$1.23m", 661500 → "$661.5k", 42 → "$42"
 *
 * 'number'    — comma-separated integer
 *               e.g. 12563 → "12,563"
 *
 * 'percent'   — appends % (value is already a percentage, not a fraction)
 *               e.g. 25 → "25%", 12.5 → "12.5%"
 *
 * function    — custom formatter, called directly
 */
export function formatChartValue(
  value: number,
  format: AppChartFormat = 'number',
  options: AppChartFormatOptions = {}
): string {
  if (typeof format === 'function') {
    return format(value)
  }

  if (format === 'percent') {
    const rounded = Math.round(value * 10) / 10
    return `${rounded}%`
  }

  if (format === 'number') {
    return value.toLocaleString('en-AU', { maximumFractionDigits: 0 })
  }

  // currency
  const symbol = options.currency ?? '$'
  if (value === 0) return `${symbol}0`

  const abs = Math.abs(value)
  const sign = value < 0 ? '-' : ''

  if (abs >= 1_000_000_000) {
    const n = abs / 1_000_000_000
    return `${sign}${symbol}${trimTrailingZero(n.toFixed(2))}b`
  }
  if (abs >= 1_000_000) {
    const n = abs / 1_000_000
    return `${sign}${symbol}${trimTrailingZero(n.toFixed(2))}m`
  }
  if (abs >= 1_000) {
    const n = abs / 1_000
    return `${sign}${symbol}${trimTrailingZero(n.toFixed(1))}k`
  }

  return `${sign}${symbol}${abs}`
}

function trimTrailingZero(s: string): string {
  // "1.00" → "1", "1.50" → "1.5", "1.23" → "1.23"
  return s.replace(/\.?0+$/, '')
}

/**
 * Composable wrapper — returns a memoised formatter bound to the given format + options.
 * Useful when the same format is applied many times in a component.
 */
export function useChartFormat(format: AppChartFormat = 'number', options: AppChartFormatOptions = {}) {
  return (value: number) => formatChartValue(value, format, options)
}
