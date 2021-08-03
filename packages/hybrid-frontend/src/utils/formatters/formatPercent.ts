import { DEFAULT_LOCALE } from './locale';
import prependValuePlusMinus from './prependValuePlusMinus';

export default function formatPercent(
  value: number,
  {
    locale,
    displayPlus,
    injectSpaceAfterPlusMinus,
    opts,
  }: {
    locale?: string;
    opts?: Intl.NumberFormatOptions;
    displayPlus?: boolean;
    injectSpaceAfterPlusMinus?: boolean;
  } = {
    locale: DEFAULT_LOCALE,
  }
): string {
  const formattedValue = Math.abs(value).toLocaleString(locale ?? DEFAULT_LOCALE, {
    style: 'percent',
    minimumFractionDigits: 1,
    ...opts,
  });

  return prependValuePlusMinus(formattedValue, value, !!displayPlus, !!injectSpaceAfterPlusMinus);
}
