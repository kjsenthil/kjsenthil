import {
  d3TimeFormatter,
  d3ValueFormatter,
  formatCurrency,
  formatDate,
  formatPercent,
} from './performanceChartFormat';

describe('performanceChartFormat', () => {
  test('The d3 value formatter works as expected', () => {
    const testCases = [
      { value: -1, formatted: '−£1' },
      { value: 0, formatted: '£0' },
      { value: 1, formatted: '£1' },
      { value: 200, formatted: '£200' },
      { value: 3000, formatted: '£3k' },
      { value: 3555, formatted: '£3.555k' },
      { value: 4000000, formatted: '£4M' },
      { value: 4555555, formatted: '£4.556M' },
      { value: 5000000000, formatted: '£5B' },
      { value: 5555555555, formatted: '£5.556B' },
      { value: 5999999999, formatted: '£6B' },
    ];

    testCases.forEach(({ value, formatted }) => {
      expect(d3ValueFormatter(value)).toBe(formatted);
    });
  });

  test('The d3 time formatter works as expected', () => {
    const date = new Date(2020, 0, 1);

    // The formatter will return a space-padded string for single-digit dates
    // mainly to help visually align chart ticks
    expect(d3TimeFormatter.DATE_AND_MONTH(date)).toBe(' 1 JAN');

    expect(d3TimeFormatter.MONTH_ONLY(date)).toBe('JAN');
    expect(d3TimeFormatter.YEAR_AND_MONTH(date)).toBe('JAN 2020');
    expect(d3TimeFormatter.YEAR_ONLY(date)).toBe('2020');
  });

  test('The normal date formatter works as expected', () => {
    const locale = 'en-GB';

    const date = new Date(2020, 0, 1);
    const dateToday = new Date();

    const formattedDate = date.toLocaleString(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    expect(formatDate(date, { locale })).toBe(formattedDate);
    expect(formatDate(dateToday, { locale })).toBe('Today');
  });

  test('The normal currency formatter works as expected', () => {
    const currencyCode = 'GBP';
    const locale = 'en-GB';

    const testCases = [
      { amount: 12345, formatted: '£12,345.00' },
      { amount: 12345.678, formatted: '£12,345.68' },
    ];

    testCases.forEach(({ amount, formatted }) => {
      expect(formatCurrency(amount, currencyCode, { locale })).toBe(formatted);
    });
  });

  test('The normal percentage formatter works as expected', () => {
    const locale = 'en-GB';

    const testCases = [
      { amount: 1.12345, formatted: '112.35%' },
      { amount: 0.12345, formatted: '12.35%' },
      { amount: 0.012345, formatted: '1.23%' },
      { amount: 0.0012345, formatted: '0.12%' },
    ];

    testCases.forEach(({ amount, formatted }) => {
      expect(formatPercent(amount, { locale })).toBe(formatted);
    });
  });
});
