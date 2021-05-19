import { DEFAULT_LOCALE } from './locale';

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

  const space = injectSpaceAfterPlusMinus ? ' ' : '';

  if (value < 0) {
    return `-${space}${formattedValue}`;
  }

  if (displayPlus && value >= 0) {
    return `+${space}${formattedValue}`;
  }

  return formattedValue;
}
