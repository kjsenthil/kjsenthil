import { DEFAULT_LOCALE } from './locale';
import prependValuePlusMinus from './prependValuePlusMinus';
import { CommonFormatNumberConfig, CurrencyPresentationVariant, FractionDigits } from './types';

export interface FormatCurrencyConfig extends CommonFormatNumberConfig {
  currencyCode?: string;
}

const fractionDigits: Partial<Record<CurrencyPresentationVariant, FractionDigits>> = {
  [CurrencyPresentationVariant.CHART]: {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  },
  [CurrencyPresentationVariant.ACTUAL_TOPLINE]: {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  },
  [CurrencyPresentationVariant.ACTUAL_INLINE]: {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  },
  [CurrencyPresentationVariant.PROJECTION]: {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  },
  [CurrencyPresentationVariant.USER_INPUT]: {
    maximumFractionDigits: 20,
    minimumFractionDigits: 0,
  },
};

/**
 * Format a number as a currency in accordance with the rounding rules defined
 * in: https://tilneygroup.atlassian.net/wiki/spaces/DH/pages/2125922313/Rounding+Rules
 */
export default function formatCurrency(
  value: number,
  variant: CurrencyPresentationVariant,
  {
    locale = DEFAULT_LOCALE,
    opts,
    currencyCode = 'GBP',
    displayPlus,
    injectSpaceAfterPlusMinus,
  }: FormatCurrencyConfig = {}
): string {
  let valueToBeFormatted = value;

  const formatterOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: currencyCode,
    ...fractionDigits[variant],
    ...opts,
  };

  switch (variant) {
    case CurrencyPresentationVariant.CHART: {
      // Round down to no decimal places.
      valueToBeFormatted = Math.trunc(valueToBeFormatted);

      break;
    }

    case CurrencyPresentationVariant.ACTUAL_TOPLINE: {
      // Round down to no decimal places.
      valueToBeFormatted = Math.trunc(valueToBeFormatted);

      break;
    }

    case CurrencyPresentationVariant.ACTUAL_INLINE: {
      // Round down to 2 decimal places.

      valueToBeFormatted =
        valueToBeFormatted > 0
          ? Math.floor(valueToBeFormatted * 100) / 100
          : Math.ceil(valueToBeFormatted * 100) / 100;

      break;
    }

    case CurrencyPresentationVariant.PROJECTION: {
      // Round to the nearest 1, 10, 100, 1000 depending on the amount

      // Working with an absolute value allows us to determine the 1000 - 10,000
      // - 100,000 range easier.
      const absoluteValue = Math.abs(valueToBeFormatted);

      let roundToNearestX = 1;
      if (absoluteValue >= 100_000) {
        roundToNearestX = 1000;
      } else if (absoluteValue >= 10_000) {
        roundToNearestX = 100;
      } else if (absoluteValue >= 1000) {
        roundToNearestX = 10;
      }

      valueToBeFormatted = Math.round(valueToBeFormatted / roundToNearestX) * roundToNearestX;

      break;
    }

    default: {
      // Do nothing
    }
  }

  const formatter = new Intl.NumberFormat(locale, formatterOptions);

  // We format the absolute value because we want to add "+" or "-" in a custom
  // way
  const formattedValue = formatter.format(Math.abs(valueToBeFormatted));

  return prependValuePlusMinus({
    formattedValue,
    value: valueToBeFormatted,
    displayPlus,
    injectSpaceAfterPlusMinus,
  });
}
