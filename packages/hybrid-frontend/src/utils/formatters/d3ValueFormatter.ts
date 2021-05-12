import { formatLocale } from 'd3-format';

export const d3Locale = formatLocale({
  decimal: '.',
  thousands: ',',
  grouping: [3],
  currency: ['£', ''],
});

const d3ValueFormatterDefault = d3Locale.format('$.4~s');

// By default, the 's' option provides SI suffixes, so billions will be
// shortened to 'G' (for 'Giga'). We want billions to be shortened to 'B', hence
// the additional code on top of the default d3 formatter.
// More here: https://github.com/d3/d3-format#locale_formatPrefix
export const d3ValueFormatter = (...args: Parameters<typeof d3ValueFormatterDefault>): string =>
  d3ValueFormatterDefault(...args).replace(/G/, 'B');
