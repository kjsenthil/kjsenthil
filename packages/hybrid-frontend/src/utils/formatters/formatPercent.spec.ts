import formatPercent from './formatPercent';

describe('formatPercent', () => {
  test('that standard formatter works as expected', () => {
    const locale = 'en-GB';

    const testCases = [
      { amount: 1.12345, formatted: '112.3%' },
      { amount: 0.12345, formatted: '12.3%' },
      { amount: 0.012345, formatted: '1.2%' },
      { amount: 0.0012345, formatted: '0.1%' },
      { amount: 0, formatted: '0.0%' },
      { amount: -0.123, formatted: '-12.3%' },
    ];

    testCases.forEach(({ amount, formatted }) => {
      expect(formatPercent(amount, { locale })).toBe(formatted);
    });
  });

  it('injects a + or - with space before the formatted value', () => {
    const locale = 'en-GB';

    const testCases = [
      { amount: 1.12345, formatted: '+ 112.3%' },
      { amount: 0.12345, formatted: '+ 12.3%' },
      { amount: 0.012345, formatted: '+ 1.2%' },
      { amount: 0.0012345, formatted: '+ 0.1%' },
      { amount: 0, formatted: '+ 0.0%' },
      { amount: -0.123, formatted: '- 12.3%' },
    ];

    testCases.forEach(({ amount, formatted }) => {
      expect(
        formatPercent(amount, {
          locale,
          displayPlus: true,
          injectSpaceAfterPlusMinus: true,
        })
      ).toBe(formatted);
    });
  });
});
