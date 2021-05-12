import { DEFAULT_LOCALE } from './locale';

export default function formatCurrency(
  value: number,
  currencyCode = 'GBP',
  { locale, opts }: { locale?: string; opts?: Intl.NumberFormatOptions } = {
    locale: DEFAULT_LOCALE,
  }
): string {
  return value.toLocaleString(locale ?? DEFAULT_LOCALE, {
    style: 'currency',
    currency: currencyCode,
    ...opts,
  });
}
