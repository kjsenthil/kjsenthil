import { DEFAULT_LOCALE } from './locale';

function isDateToday(date: Date): boolean {
  const today = new Date();

  return today.toLocaleDateString() === date.toLocaleDateString();
}

export default function formatDate(
  date: Date,
  { locale, opts }: { locale?: string; opts?: Intl.DateTimeFormatOptions } = {
    locale: DEFAULT_LOCALE,
  }
): string {
  if (isDateToday(date)) return 'Today';

  return date.toLocaleString(locale ?? DEFAULT_LOCALE, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...opts,
  });
}
