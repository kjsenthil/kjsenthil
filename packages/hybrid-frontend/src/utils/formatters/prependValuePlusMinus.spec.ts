import prependValuePlusMinus from './prependValuePlusMinus';

describe('prependValuePlusMinus', () => {
  it('injects a + or - with space before the formatted value', () => {
    const testCases = [
      { formatted: '£0.00', value: 0, withPlusMinus: '+ £0.00', withPlusMinusNoSpace: '+£0.00' },
      { formatted: '£1.00', value: -1, withPlusMinus: '- £1.00', withPlusMinusNoSpace: '-£1.00' },
      {
        formatted: '£12,345.00',
        value: -12345,
        withPlusMinus: '- £12,345.00',
        withPlusMinusNoSpace: '-£12,345.00',
      },
      {
        formatted: '£12,345.00',
        value: 12345,
        withPlusMinus: '+ £12,345.00',
        withPlusMinusNoSpace: '+£12,345.00',
      },
    ];

    testCases.forEach(({ formatted, value, withPlusMinus, withPlusMinusNoSpace }) => {
      expect(prependValuePlusMinus(formatted, value, true, true)).toBe(withPlusMinus);
      expect(prependValuePlusMinus(formatted, value, true, false)).toBe(withPlusMinusNoSpace);
    });

    expect(prependValuePlusMinus('£0.00', 0, false, false)).toBe('£0.00');
  });
});
