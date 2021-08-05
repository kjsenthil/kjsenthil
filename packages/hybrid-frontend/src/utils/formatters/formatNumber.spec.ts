import formatNumber from './formatNumber';
import { NumberPresentationVariant } from './types';

type TestCase = [NumberPresentationVariant, number, string];

function testFunction(variant: NumberPresentationVariant, amount: number, expected: string) {
  // Non-plus/minus case
  expect(formatNumber(amount, variant)).toBe(expected);

  // With-plus/minus cases
  if (amount >= 0) {
    expect(
      formatNumber(amount, variant, {
        displayPlus: true,
      })
    ).toBe(`+${expected}`);
    expect(
      formatNumber(amount, variant, {
        displayPlus: true,
        injectSpaceAfterPlusMinus: true,
      })
    ).toBe(`+ ${expected}`);
  } else {
    expect(
      formatNumber(amount, variant, {
        displayPlus: true,
      })
    ).toBe(expected);
    expect(
      formatNumber(amount, variant, {
        displayPlus: true,
        injectSpaceAfterPlusMinus: true,
      })
    ).toBe(`- ${expected.slice(1)}`);
  }
}

describe('formatNumber', () => {
  describe('actual inline unit (viewing mode) variant', () => {
    const testCases: TestCase[] = [
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_VIEWING, -1000.555, '-1,000.6'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_VIEWING, -1.999, '-2.0'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_VIEWING, -1.666, '-1.7'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_VIEWING, -1.555, '-1.6'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_VIEWING, -1.444, '-1.4'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_VIEWING, -1, '-1.0'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_VIEWING, 0, '0.0'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_VIEWING, 1, '1.0'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_VIEWING, 1.444, '1.4'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_VIEWING, 1.555, '1.6'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_VIEWING, 1.666, '1.7'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_VIEWING, 1.999, '2.0'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_VIEWING, 1000.555, '1,000.6'],
    ];

    test.each(testCases)(
      'it works as expected for variant %p and amount %p',
      (variant, amount, expected) => {
        testFunction(variant, amount, expected);
      }
    );
  });

  describe('actual inline unit (placing trade mode) variant', () => {
    const testCases: TestCase[] = [
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, 0, '0'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, -1, '-1'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, -1.4, '-1.4'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, -1.5, '-1.5'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, -1.6, '-1.6'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, -1.9, '-1.9'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, -1.44, '-1.44'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, -1.55, '-1.55'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, -1.66, '-1.66'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, -1.99, '-1.99'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, -1.444, '-1.444'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, -1.555, '-1.555'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, -1.666, '-1.666'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, -1.999, '-1.999'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, -1.4444, '-1.444'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, -1.5555, '-1.556'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, -1.6666, '-1.667'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, -1.9994, '-1.999'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, -1.9995, '-2'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, -1000.555555, '-1,000.556'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, 1, '1'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, 1.4, '1.4'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, 1.5, '1.5'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, 1.6, '1.6'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, 1.9, '1.9'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, 1.44, '1.44'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, 1.55, '1.55'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, 1.66, '1.66'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, 1.99, '1.99'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, 1.444, '1.444'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, 1.555, '1.555'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, 1.666, '1.666'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, 1.999, '1.999'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, 1.4444, '1.444'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, 1.5555, '1.556'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, 1.6666, '1.667'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, 1.9994, '1.999'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, 1.9995, '2'],
      [NumberPresentationVariant.ACTUAL_INLINE_UNIT_PLACING_TRADE, 1000.555555, '1,000.556'],
    ];

    test.each(testCases)(
      'it works as expected for variant %p and amount %p',
      (variant, amount, expected) => {
        testFunction(variant, amount, expected);
      }
    );
  });

  describe('user input variant', () => {
    const testCases: TestCase[] = [
      [NumberPresentationVariant.USER_INPUT, -1000.5555, '-1,000.5555'],
      [NumberPresentationVariant.USER_INPUT, -1.44, '-1.44'],
      [NumberPresentationVariant.USER_INPUT, -1, '-1'],
      [NumberPresentationVariant.USER_INPUT, 0, '0'],
      [NumberPresentationVariant.USER_INPUT, 1, '1'],
      [NumberPresentationVariant.USER_INPUT, 1.44, '1.44'],
      [NumberPresentationVariant.USER_INPUT, 1000.5555, '1,000.5555'],
    ];

    test.each(testCases)(
      'it works as expected for variant %p and amount %p',
      (variant, amount, expected) => {
        testFunction(variant, amount, expected);
      }
    );
  });

  describe('"default" variant', () => {
    it('works as expected for variant default', () => {
      // By default, no rules are applied. So the formatted string follow
      // Intl.NumberFormat's defaults (unless we override them):
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat

      expect(formatNumber(555555.555, NumberPresentationVariant.DEFAULT)).toBe('555,555.555');
      expect(formatNumber(-555555.555, NumberPresentationVariant.DEFAULT)).toBe('-555,555.555');

      expect(
        formatNumber(555555.555, NumberPresentationVariant.DEFAULT, {
          opts: {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          },
        })
      ).toBe('555,556');
      expect(
        formatNumber(-555555.555, NumberPresentationVariant.DEFAULT, {
          opts: {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          },
        })
      ).toBe('-555,556');
    });
  });
});
