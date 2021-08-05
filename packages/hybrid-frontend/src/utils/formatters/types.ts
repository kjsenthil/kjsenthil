export interface CommonFormatNumberConfig {
  locale?: string;
  opts?: Intl.NumberFormatOptions;

  displayPlus?: boolean;
  injectSpaceAfterPlusMinus?: boolean;
}

export interface FractionDigits {
  minimumFractionDigits: number;
  maximumFractionDigits: number;
}

// The enums below are based on the rounding rules defined here:
// https://tilneygroup.atlassian.net/wiki/spaces/DH/pages/2125922313/Rounding+Rules
// There is a "DEFAULT" member for each enum to allow us to specify our own
// rounding rules if necessary (no rounding rules are applied when the variant
// is "DEFAULT").

export enum CurrencyPresentationVariant {
  DEFAULT = 'DEFAULT',

  CHART = 'CHART',
  ACTUAL_TOPLINE = 'ACTUAL_TOPLINE',
  ACTUAL_INLINE = 'ACTUAL_INLINE',
  PROJECTION = 'PROJECTION',
  USER_INPUT = 'USER_INPUT',
}

export enum PercentPresentationVariant {
  DEFAULT = 'DEFAULT',

  CHART = 'CHART',
  ACTUAL_TOPLINE = 'ACTUAL_TOPLINE',
  ACTUAL_INLINE = 'ACTUAL_INLINE',
  PROJECTION = 'PROJECTION',
  USER_INPUT = 'USER_INPUT',
}

export enum NumberPresentationVariant {
  DEFAULT = 'DEFAULT',

  ACTUAL_INLINE_UNIT_VIEWING = 'ACTUAL_INLINE_UNIT_VIEWING',
  ACTUAL_INLINE_UNIT_PLACING_TRADE = 'ACTUAL_INLINE_UNIT_PLACING_TRADE',
  USER_INPUT = 'USER_INPUT',
}
