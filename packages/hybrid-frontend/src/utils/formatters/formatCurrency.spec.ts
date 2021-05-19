import formatCurrency from './formatCurrency';

describe('formatCurrency', () => {
  it('works as expected', () => {
    const currencyCode = 'GBP';
    const locale = 'en-GB';

    const testCases = [
      { amount: 0, formatted: '£0.00' },
      { amount: -1, formatted: '-£1.00' },
      { amount: 12345, formatted: '£12,345.00' },
      { amount: 12345.678, formatted: '£12,345.68' },
    ];

    testCases.forEach(({ amount, formatted }) => {
      expect(formatCurrency(amount, { currencyCode, locale })).toBe(formatted);
    });
  });

  it('injects a + or - with space before the formatted value', () => {
    const currencyCode = 'GBP';
    const locale = 'en-GB';

    const testCases = [
      { amount: 0, formatted: '+ £0.00' },
      { amount: -1, formatted: '- £1.00' },
      { amount: -12345, formatted: '- £12,345.00' },
      { amount: 12345, formatted: '+ £12,345.00' },
    ];

    testCases.forEach(({ amount, formatted }) => {
      expect(
        formatCurrency(amount, {
          currencyCode,
          locale,
          displayPlus: true,
          injectSpaceAfterPlusMinus: true,
        })
      ).toBe(formatted);
    });
  });
});
