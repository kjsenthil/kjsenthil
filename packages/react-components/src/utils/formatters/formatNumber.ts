import { DEFAULT_LOCALE } from './locale';
import prependValuePlusMinus from './prependValuePlusMinus';
import { CommonFormatNumberConfig, FractionDigits, NumberPresentationVariant } from './types';

export type FormatNumberConfig = CommonFormatNumberConfig;

const fractionDigits: Partial<Record<NumberPresentationVariant, FractionDigits>> = {
  [NumberPresentationVariant.ACTUAL_INLINE_UNIT_VIEWING]: {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  },
  [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE]: {
    maximumFractionDigits: 3,
    minimumFractionDigits: 0,
  },
  [NumberPresentationVariant.USER_INPUT]: { maximumFractionDigits: 20, minimumFractionDigits: 0 },
};

/**
 * Format a number in accordance with the rounding rules defined in:
 * https://tilneygroup.atlassian.net/wiki/spaces/DH/pages/2125922313/Rounding+Rules
 */
export default function formatNumber(
  value: number,
  variant: NumberPresentationVariant,
  { locale = DEFAULT_LOCALE, opts, displayPlus, injectSpaceAfterPlusMinus }: FormatNumberConfig = {}
): string {
  const formatterOptions: Intl.NumberFormatOptions = {
    ...fractionDigits[variant],
    ...opts,
  };

  const formatter = new Intl.NumberFormat(locale, formatterOptions);

  // We format the absolute value because we want to add "+" or "-" in a custom
  // way
  const formattedValue = formatter.format(Math.abs(value));

  return prependValuePlusMinus({ formattedValue, value, displayPlus, injectSpaceAfterPlusMinus });
}
