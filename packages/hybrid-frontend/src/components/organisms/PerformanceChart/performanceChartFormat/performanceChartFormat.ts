import { formatLocale } from 'd3-format';
import { timeFormatLocale } from 'd3-time-format';

export const d3Locale = formatLocale({
  decimal: '.',
  thousands: ',',
  grouping: [3],
  currency: ['£', ''],
});

const d3ValueFormatterDefault = d3Locale.format('$.4~s');

// By default, the 's' option provides SI suffixes, so billions will be
// shortened to 'G' (for 'Giga'). We want billions to be shortened to 'B', hence
// the additional code on top of the default d3 formatter.
// More here: https://github.com/d3/d3-format#locale_formatPrefix
export const d3ValueFormatter = (...args: Parameters<typeof d3ValueFormatterDefault>): string =>
  d3ValueFormatterDefault(...args).replace(/G/, 'B');

export const d3TimeLocale = timeFormatLocale({
  dateTime: '%a %e %b %X %Y',
  date: '%d/%m/%Y',
  time: '%H:%M:%S',
  periods: ['AM', 'PM'],
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  shortMonths: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
});

export enum D3TimeFormatterType {
  DATE_AND_MONTH = 'DATE_AND_MONTH',
  MONTH_ONLY = 'MONTH_ONLY',
  'YEAR_AND_MONTH' = 'YEAR_AND_MONTH',
  YEAR_ONLY = 'YEAR_ONLY',
}

export const d3TimeFormatter: Record<D3TimeFormatterType, (d: Date) => string> = {
  DATE_AND_MONTH: d3TimeLocale.format('%e %b'),
  MONTH_ONLY: d3TimeLocale.format('%b'),
  YEAR_AND_MONTH: d3TimeLocale.format('%b %Y'),
  YEAR_ONLY: d3TimeLocale.format('%Y'),
};

const DEFAULT_LOCALE = 'en-GB';

function isDateToday(date: Date): boolean {
  const today = new Date();

  return today.toLocaleDateString() === date.toLocaleDateString();
}

export function formatDate(
  date: Date,
  { locale, opts }: { locale: string; opts?: Intl.DateTimeFormatOptions } = {
    locale: DEFAULT_LOCALE,
  }
): string {
  if (date === null || date === undefined) return '';

  if (isDateToday(date)) return 'Today';

  return date.toLocaleString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...opts,
  });
}

export function formatCurrency(
  value: number,
  currencyCode = 'GBP',
  { locale, opts }: { locale: string; opts?: Intl.NumberFormatOptions } = { locale: DEFAULT_LOCALE }
): string {
  if (value === null || value === undefined) return '';

  return value.toLocaleString(locale, {
    style: 'currency',
    currency: currencyCode,
    ...opts,
  });
}

export function formatPercent(
  value: number,
  { locale, opts }: { locale: string; opts?: Intl.NumberFormatOptions } = { locale: DEFAULT_LOCALE }
): string {
  if (value === null || value === undefined) return '';

  return value.toLocaleString(locale, {
    style: 'percent',
    minimumFractionDigits: 2,
    ...opts,
  });
}
