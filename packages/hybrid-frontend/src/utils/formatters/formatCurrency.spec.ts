import formatCurrency from './formatCurrency';
import { CurrencyPresentationVariant } from './types';

type TestCase = [CurrencyPresentationVariant, number, string];

function testFunction(variant: CurrencyPresentationVariant, amount: number, expected: string) {
  // Non-plus/minus case
  expect(formatCurrency(amount, variant)).toBe(expected);

  // With-plus/minus cases
  if (amount >= 0) {
    expect(
      formatCurrency(amount, variant, {
        displayPlus: true,
      })
    ).toBe(`+${expected}`);
    expect(
      formatCurrency(amount, variant, {
        displayPlus: true,
        injectSpaceAfterPlusMinus: true,
      })
    ).toBe(`+ ${expected}`);
  } else {
    expect(
      formatCurrency(amount, variant, {
        displayPlus: true,
      })
    ).toBe(expected);
    expect(
      formatCurrency(amount, variant, {
        displayPlus: true,
        injectSpaceAfterPlusMinus: true,
      })
    ).toBe(`- £${expected.slice(2)}`);
  }
}

describe('formatCurrency', () => {
  describe('chart monetary variant', () => {
    const testCases: TestCase[] = [
      [CurrencyPresentationVariant.CHART, -1000.5, '-£1,000'],
      [CurrencyPresentationVariant.CHART, -1.99, '-£1'],
      [CurrencyPresentationVariant.CHART, -1.66, '-£1'],
      [CurrencyPresentationVariant.CHART, -1.55, '-£1'],
      [CurrencyPresentationVariant.CHART, -1.44, '-£1'],
      [CurrencyPresentationVariant.CHART, -1, '-£1'],
      [CurrencyPresentationVariant.CHART, 0, '£0'],
      [CurrencyPresentationVariant.CHART, 1, '£1'],
      [CurrencyPresentationVariant.CHART, 1.44, '£1'],
      [CurrencyPresentationVariant.CHART, 1.55, '£1'],
      [CurrencyPresentationVariant.CHART, 1.66, '£1'],
      [CurrencyPresentationVariant.CHART, 1.99, '£1'],
      [CurrencyPresentationVariant.CHART, 1000.5, '£1,000'],
    ];

    test.each(testCases)(
      'it works as expected for variant %p and amount %p',
      (variant, amount, expected) => {
        testFunction(variant, amount, expected);
      }
    );
  });

  describe('actual topline monetary variant', () => {
    const testCases: TestCase[] = [
      [CurrencyPresentationVariant.ACTUAL_TOPLINE, -1000.5, '-£1,000'],
      [CurrencyPresentationVariant.ACTUAL_TOPLINE, -1.99, '-£1'],
      [CurrencyPresentationVariant.ACTUAL_TOPLINE, -1.66, '-£1'],
      [CurrencyPresentationVariant.ACTUAL_TOPLINE, -1.55, '-£1'],
      [CurrencyPresentationVariant.ACTUAL_TOPLINE, -1.45, '-£1'],
      [CurrencyPresentationVariant.ACTUAL_TOPLINE, -1, '-£1'],
      [CurrencyPresentationVariant.ACTUAL_TOPLINE, 0, '£0'],
      [CurrencyPresentationVariant.ACTUAL_TOPLINE, 1, '£1'],
      [CurrencyPresentationVariant.ACTUAL_TOPLINE, 1.45, '£1'],
      [CurrencyPresentationVariant.ACTUAL_TOPLINE, 1.55, '£1'],
      [CurrencyPresentationVariant.ACTUAL_TOPLINE, 1.66, '£1'],
      [CurrencyPresentationVariant.ACTUAL_TOPLINE, 1.99, '£1'],
      [CurrencyPresentationVariant.ACTUAL_TOPLINE, 1000.5, '£1,000'],
    ];

    test.each(testCases)(
      'it works as expected for variant %p and amount %p',
      (variant, amount, expected) => {
        testFunction(variant, amount, expected);
      }
    );
  });

  describe('actual inline monetary variant', () => {
    const testCases: TestCase[] = [
      [CurrencyPresentationVariant.ACTUAL_INLINE, -1000.555, '-£1,000.55'],
      [CurrencyPresentationVariant.ACTUAL_INLINE, -1.999, '-£1.99'],
      [CurrencyPresentationVariant.ACTUAL_INLINE, -1.666, '-£1.66'],
      [CurrencyPresentationVariant.ACTUAL_INLINE, -1.555, '-£1.55'],
      [CurrencyPresentationVariant.ACTUAL_INLINE, -1.444, '-£1.44'],
      [CurrencyPresentationVariant.ACTUAL_INLINE, -1, '-£1.00'],
      [CurrencyPresentationVariant.ACTUAL_INLINE, 0, '£0.00'],
      [CurrencyPresentationVariant.ACTUAL_INLINE, 1, '£1.00'],
      [CurrencyPresentationVariant.ACTUAL_INLINE, 1.444, '£1.44'],
      [CurrencyPresentationVariant.ACTUAL_INLINE, 1.555, '£1.55'],
      [CurrencyPresentationVariant.ACTUAL_INLINE, 1.666, '£1.66'],
      [CurrencyPresentationVariant.ACTUAL_INLINE, 1.999, '£1.99'],
      [CurrencyPresentationVariant.ACTUAL_INLINE, 1000.555, '£1,000.55'],
    ];

    test.each(testCases)(
      'it works as expected for variant %p and amount %p',
      (variant, amount, expected) => {
        testFunction(variant, amount, expected);
      }
    );
  });

  describe('projection monetary variant', () => {
    const testCases: TestCase[] = [
      [CurrencyPresentationVariant.PROJECTION, 0, '£0'],
      [CurrencyPresentationVariant.PROJECTION, -1, '-£1'],
      [CurrencyPresentationVariant.PROJECTION, -1.55, '-£2'],
      [CurrencyPresentationVariant.PROJECTION, -999, '-£999'],
      [CurrencyPresentationVariant.PROJECTION, -999.9, '-£1,000'],
      [CurrencyPresentationVariant.PROJECTION, -1000, '-£1,000'],
      [CurrencyPresentationVariant.PROJECTION, -1005, '-£1,000'],
      [CurrencyPresentationVariant.PROJECTION, -1006, '-£1,010'],
      [CurrencyPresentationVariant.PROJECTION, -5555, '-£5,550'],
      [CurrencyPresentationVariant.PROJECTION, -9995, '-£9,990'],
      [CurrencyPresentationVariant.PROJECTION, -9996, '-£10,000'],
      [CurrencyPresentationVariant.PROJECTION, -55450, '-£55,400'],
      [CurrencyPresentationVariant.PROJECTION, -55451, '-£55,500'],
      [CurrencyPresentationVariant.PROJECTION, -99950, '-£99,900'],
      [CurrencyPresentationVariant.PROJECTION, -99951, '-£100,000'],
      [CurrencyPresentationVariant.PROJECTION, -999_500, '-£999,000'],
      [CurrencyPresentationVariant.PROJECTION, -999_501, '-£1,000,000'],
      [CurrencyPresentationVariant.PROJECTION, -555_555_500, '-£555,555,000'],
      [CurrencyPresentationVariant.PROJECTION, -555_555_501, '-£555,556,000'],
      [CurrencyPresentationVariant.PROJECTION, -555_555_499.99, '-£555,555,000'],
      [CurrencyPresentationVariant.PROJECTION, -555_555_501.01, '-£555,556,000'],
      [CurrencyPresentationVariant.PROJECTION, 1, '£1'],
      [CurrencyPresentationVariant.PROJECTION, 1.55, '£2'],
      [CurrencyPresentationVariant.PROJECTION, 999, '£999'],
      [CurrencyPresentationVariant.PROJECTION, 999.9, '£1,000'],
      [CurrencyPresentationVariant.PROJECTION, 1000, '£1,000'],
      [CurrencyPresentationVariant.PROJECTION, 1004, '£1,000'],
      [CurrencyPresentationVariant.PROJECTION, 1005, '£1,010'],
      [CurrencyPresentationVariant.PROJECTION, 5555, '£5,560'],
      [CurrencyPresentationVariant.PROJECTION, 9994, '£9,990'],
      [CurrencyPresentationVariant.PROJECTION, 9995, '£10,000'],
      [CurrencyPresentationVariant.PROJECTION, 55449, '£55,400'],
      [CurrencyPresentationVariant.PROJECTION, 55450, '£55,500'],
      [CurrencyPresentationVariant.PROJECTION, 99949, '£99,900'],
      [CurrencyPresentationVariant.PROJECTION, 99950, '£100,000'],
      [CurrencyPresentationVariant.PROJECTION, 999_499, '£999,000'],
      [CurrencyPresentationVariant.PROJECTION, 999_500, '£1,000,000'],
      [CurrencyPresentationVariant.PROJECTION, 555_555_499, '£555,555,000'],
      [CurrencyPresentationVariant.PROJECTION, 555_555_500, '£555,556,000'],
      [CurrencyPresentationVariant.PROJECTION, 555_555_499.01, '£555,555,000'],
      [CurrencyPresentationVariant.PROJECTION, 555_555_500.01, '£555,556,000'],
    ];

    test.each(testCases)(
      'it works as expected for variant %p and amount %p',
      (variant, amount, expected) => {
        testFunction(variant, amount, expected);
      }
    );
  });

  describe('user input monetary variant', () => {
    const testCases: TestCase[] = [
      [CurrencyPresentationVariant.USER_INPUT, -1000.5555, '-£1,000.5555'],
      [CurrencyPresentationVariant.USER_INPUT, -1.44, '-£1.44'],
      [CurrencyPresentationVariant.USER_INPUT, -1, '-£1'],
      [CurrencyPresentationVariant.USER_INPUT, 0, '£0'],
      [CurrencyPresentationVariant.USER_INPUT, 1, '£1'],
      [CurrencyPresentationVariant.USER_INPUT, 1.44, '£1.44'],
      [CurrencyPresentationVariant.USER_INPUT, 1000.5555, '£1,000.5555'],
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

      expect(formatCurrency(555555.555, CurrencyPresentationVariant.DEFAULT)).toBe('£555,555.56');
      expect(formatCurrency(-555555.555, CurrencyPresentationVariant.DEFAULT)).toBe('-£555,555.56');

      expect(
        formatCurrency(555555.555, CurrencyPresentationVariant.DEFAULT, {
          opts: {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          },
        })
      ).toBe('£555,556');
      expect(
        formatCurrency(-555555.555, CurrencyPresentationVariant.DEFAULT, {
          opts: {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          },
        })
      ).toBe('-£555,556');
    });
  });
});
