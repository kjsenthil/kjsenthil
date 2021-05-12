import formatCurrency from './formatCurrency';

describe('formatCurrency', () => {
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
});
