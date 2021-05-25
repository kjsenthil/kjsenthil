import { DEFAULT_LOCALE } from './locale';

export default function formatPercent(
  value: number,
  { locale, opts }: { locale?: string; opts?: Intl.NumberFormatOptions } = {
    locale: DEFAULT_LOCALE,
  }
): string {
  return value.toLocaleString(locale ?? DEFAULT_LOCALE, {
    style: 'percent',
    minimumFractionDigits: 2,
    ...opts,
  });
}
