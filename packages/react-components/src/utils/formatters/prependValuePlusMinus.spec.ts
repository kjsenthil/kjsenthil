import prependValuePlusMinus from './prependValuePlusMinus';

describe('prependValuePlusMinus', () => {
  it('injects a + or - with (or without) space before the formatted value when specified', () => {
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
      expect(
        prependValuePlusMinus({
          formattedValue: formatted,
          value,
          displayPlus: true,
          injectSpaceAfterPlusMinus: true,
        })
      ).toBe(withPlusMinus);

      expect(
        prependValuePlusMinus({
          formattedValue: formatted,
          value,
          displayPlus: true,
          injectSpaceAfterPlusMinus: false,
        })
      ).toBe(withPlusMinusNoSpace);
    });
  });

  it(`doesn't inject a + or before the formatted value if intended`, () => {
    expect(
      prependValuePlusMinus({
        formattedValue: '£0.00',
        value: 0,
        displayPlus: false,
        injectSpaceAfterPlusMinus: false,
      })
    ).toBe('£0.00');
  });
});
