import { DEFAULT_LOCALE } from './locale';
import prependValuePlusMinus from './prependValuePlusMinus';

export default function formatCurrency(
  value: number,
  {
    locale = DEFAULT_LOCALE,
    opts,
    currencyCode = 'GBP',
    displayPlus,
    injectSpaceAfterPlusMinus,
  }: {
    locale?: string;
    opts?: Intl.NumberFormatOptions;
    currencyCode?: string;
    displayPlus?: boolean;
    injectSpaceAfterPlusMinus?: boolean;
  } = {}
): string {
  const formattedValue = Math.abs(value).toLocaleString(locale ?? DEFAULT_LOCALE, {
    style: 'currency',
    currency: currencyCode,
    ...opts,
  });

  return prependValuePlusMinus(formattedValue, value, !!displayPlus, !!injectSpaceAfterPlusMinus);
}
