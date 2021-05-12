import formatPercent from './formatPercent';

describe('formatPercent', () => {
  test('The normal percentage formatter works as expected', () => {
    const locale = 'en-GB';

    const testCases = [
      { amount: 1.12345, formatted: '112.35%' },
      { amount: 0.12345, formatted: '12.35%' },
      { amount: 0.012345, formatted: '1.23%' },
      { amount: 0.0012345, formatted: '0.12%' },
      { amount: 0, formatted: '0.00%' },
      { amount: -0.123, formatted: '-12.30%' },
    ];

    testCases.forEach(({ amount, formatted }) => {
      expect(formatPercent(amount, { locale })).toBe(formatted);
    });
  });
});
