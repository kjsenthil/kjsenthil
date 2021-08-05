import { DEFAULT_LOCALE } from './locale';
import prependValuePlusMinus from './prependValuePlusMinus';
import { CommonFormatNumberConfig, FractionDigits, PercentPresentationVariant } from './types';

export type FormatPercentConfig = CommonFormatNumberConfig;

const fractionDigits: Partial<Record<PercentPresentationVariant, FractionDigits>> = {
  [PercentPresentationVariant.CHART]: {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  },
  [PercentPresentationVariant.ACTUAL_TOPLINE]: {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  },
  [PercentPresentationVariant.ACTUAL_INLINE]: {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  },
  [PercentPresentationVariant.PROJECTION]: {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  },
  [PercentPresentationVariant.USER_INPUT]: {
    maximumFractionDigits: 20,
    minimumFractionDigits: 0,
  },
};

/**
 * Format a number as a percentage in accordance with the rounding rules defined
 * in: https://tilneygroup.atlassian.net/wiki/spaces/DH/pages/2125922313/Rounding+Rules
 */
export default function formatPercent(
  value: number,
  variant: PercentPresentationVariant,
  {
    locale = DEFAULT_LOCALE,
    opts,
    displayPlus,
    injectSpaceAfterPlusMinus,
  }: FormatPercentConfig = {}
): string {
  const formatterOptions: Intl.NumberFormatOptions = {
    style: 'percent',
    ...fractionDigits[variant],
    ...opts,
  };

  const formatter = new Intl.NumberFormat(locale, formatterOptions);

  // We format the absolute value because we want to add "+" or "-" in a custom
  // way
  const formattedValue = formatter.format(Math.abs(value));

  return prependValuePlusMinus({
    formattedValue,
    value,
    displayPlus,
    injectSpaceAfterPlusMinus,
  });
}
