import formatPercent from './formatPercent';
import { PercentPresentationVariant } from './types';

type TestCase = [PercentPresentationVariant, number, string];

function testFunction(variant: PercentPresentationVariant, amount: number, expected: string) {
  // Non-plus/minus case
  expect(formatPercent(amount, variant)).toBe(expected);

  // With-plus/minus cases
  if (amount >= 0) {
    expect(
      formatPercent(amount, variant, {
        displayPlus: true,
      })
    ).toBe(`+${expected}`);
    expect(
      formatPercent(amount, variant, {
        displayPlus: true,
        injectSpaceAfterPlusMinus: true,
      })
    ).toBe(`+ ${expected}`);
  } else {
    expect(
      formatPercent(amount, variant, {
        displayPlus: true,
      })
    ).toBe(expected);
    expect(
      formatPercent(amount, variant, {
        displayPlus: true,
        injectSpaceAfterPlusMinus: true,
      })
    ).toBe(`- ${expected.slice(1)}`);
  }
}

describe('formatPercent', () => {
  describe('chart percentage variant', () => {
    const testCases: TestCase[] = [
      [PercentPresentationVariant.CHART, -100.505, '-10,050.5%'],
      [PercentPresentationVariant.CHART, -1.9999, '-200.0%'],
      [PercentPresentationVariant.CHART, -1.6666, '-166.7%'],
      [PercentPresentationVariant.CHART, -1.5555, '-155.6%'],
      [PercentPresentationVariant.CHART, -1.4444, '-144.4%'],
      [PercentPresentationVariant.CHART, -0.7555, '-75.6%'],
      [PercentPresentationVariant.CHART, -0.7444, '-74.4%'],
      [PercentPresentationVariant.CHART, -0.01, '-1.0%'],
      [PercentPresentationVariant.CHART, 0, '0.0%'],
      [PercentPresentationVariant.CHART, 0.01, '1.0%'],
      [PercentPresentationVariant.CHART, 0.7444, '74.4%'],
      [PercentPresentationVariant.CHART, 0.7555, '75.6%'],
      [PercentPresentationVariant.CHART, 1.4444, '144.4%'],
      [PercentPresentationVariant.CHART, 1.5555, '155.6%'],
      [PercentPresentationVariant.CHART, 1.6666, '166.7%'],
      [PercentPresentationVariant.CHART, 1.9999, '200.0%'],
      [PercentPresentationVariant.CHART, 100.505, '10,050.5%'],
    ];

    test.each(testCases)(
      'it works as expected for variant %p and amount %p',
      (variant, amount, expected) => {
        testFunction(variant, amount, expected);
      }
    );
  });

  describe('actual topline percentage variant', () => {
    const testCases: TestCase[] = [
      [PercentPresentationVariant.ACTUAL_TOPLINE, -100.505, '-10,050.5%'],
      [PercentPresentationVariant.ACTUAL_TOPLINE, -1.9999, '-200.0%'],
      [PercentPresentationVariant.ACTUAL_TOPLINE, -1.6666, '-166.7%'],
      [PercentPresentationVariant.ACTUAL_TOPLINE, -1.5555, '-155.6%'],
      [PercentPresentationVariant.ACTUAL_TOPLINE, -1.4444, '-144.4%'],
      [PercentPresentationVariant.ACTUAL_TOPLINE, -0.7555, '-75.6%'],
      [PercentPresentationVariant.ACTUAL_TOPLINE, -0.7444, '-74.4%'],
      [PercentPresentationVariant.ACTUAL_TOPLINE, -0.01, '-1.0%'],
      [PercentPresentationVariant.ACTUAL_TOPLINE, 0, '0.0%'],
      [PercentPresentationVariant.ACTUAL_TOPLINE, 0.01, '1.0%'],
      [PercentPresentationVariant.ACTUAL_TOPLINE, 0.7444, '74.4%'],
      [PercentPresentationVariant.ACTUAL_TOPLINE, 0.7555, '75.6%'],
      [PercentPresentationVariant.ACTUAL_TOPLINE, 1.4444, '144.4%'],
      [PercentPresentationVariant.ACTUAL_TOPLINE, 1.5555, '155.6%'],
      [PercentPresentationVariant.ACTUAL_TOPLINE, 1.6666, '166.7%'],
      [PercentPresentationVariant.ACTUAL_TOPLINE, 1.9999, '200.0%'],
      [PercentPresentationVariant.ACTUAL_TOPLINE, 100.505, '10,050.5%'],
    ];

    test.each(testCases)(
      'it works as expected for variant %p and amount %p',
      (variant, amount, expected) => {
        testFunction(variant, amount, expected);
      }
    );
  });

  describe('actual inline percentage variant', () => {
    const testCases: TestCase[] = [
      [PercentPresentationVariant.ACTUAL_INLINE, -100.505, '-10,050.5%'],
      [PercentPresentationVariant.ACTUAL_INLINE, -1.9999, '-200.0%'],
      [PercentPresentationVariant.ACTUAL_INLINE, -1.6666, '-166.7%'],
      [PercentPresentationVariant.ACTUAL_INLINE, -1.5555, '-155.6%'],
      [PercentPresentationVariant.ACTUAL_INLINE, -1.4444, '-144.4%'],
      [PercentPresentationVariant.ACTUAL_INLINE, -0.7555, '-75.6%'],
      [PercentPresentationVariant.ACTUAL_INLINE, -0.7444, '-74.4%'],
      [PercentPresentationVariant.ACTUAL_INLINE, -0.01, '-1.0%'],
      [PercentPresentationVariant.ACTUAL_INLINE, 0, '0.0%'],
      [PercentPresentationVariant.ACTUAL_INLINE, 0.01, '1.0%'],
      [PercentPresentationVariant.ACTUAL_INLINE, 0.7444, '74.4%'],
      [PercentPresentationVariant.ACTUAL_INLINE, 0.7555, '75.6%'],
      [PercentPresentationVariant.ACTUAL_INLINE, 1.4444, '144.4%'],
      [PercentPresentationVariant.ACTUAL_INLINE, 1.5555, '155.6%'],
      [PercentPresentationVariant.ACTUAL_INLINE, 1.6666, '166.7%'],
      [PercentPresentationVariant.ACTUAL_INLINE, 1.9999, '200.0%'],
      [PercentPresentationVariant.ACTUAL_INLINE, 100.505, '10,050.5%'],
    ];

    test.each(testCases)(
      'it works as expected for variant %p and amount %p',
      (variant, amount, expected) => {
        testFunction(variant, amount, expected);
      }
    );
  });

  describe('projection percentage variant', () => {
    const testCases: TestCase[] = [
      [PercentPresentationVariant.PROJECTION, -100.505, '-10,051%'],
      [PercentPresentationVariant.PROJECTION, -1.9999, '-200%'],
      [PercentPresentationVariant.PROJECTION, -1.6666, '-167%'],
      [PercentPresentationVariant.PROJECTION, -1.5555, '-156%'],
      [PercentPresentationVariant.PROJECTION, -1.4444, '-144%'],
      [PercentPresentationVariant.PROJECTION, -0.7555, '-76%'],
      [PercentPresentationVariant.PROJECTION, -0.7444, '-74%'],
      [PercentPresentationVariant.PROJECTION, -0.01, '-1%'],
      [PercentPresentationVariant.PROJECTION, 0, '0%'],
      [PercentPresentationVariant.PROJECTION, 0.01, '1%'],
      [PercentPresentationVariant.PROJECTION, 0.7444, '74%'],
      [PercentPresentationVariant.PROJECTION, 0.7555, '76%'],
      [PercentPresentationVariant.PROJECTION, 1.4444, '144%'],
      [PercentPresentationVariant.PROJECTION, 1.5555, '156%'],
      [PercentPresentationVariant.PROJECTION, 1.6666, '167%'],
      [PercentPresentationVariant.PROJECTION, 1.9999, '200%'],
      [PercentPresentationVariant.PROJECTION, 100.505, '10,051%'],
    ];

    test.each(testCases)(
      'it works as expected for variant %p and amount %p',
      (variant, amount, expected) => {
        testFunction(variant, amount, expected);
      }
    );
  });

  describe('user input percentage variant', () => {
    const testCases: TestCase[] = [
      [PercentPresentationVariant.USER_INPUT, -100.505, '-10,050.5%'],
      [PercentPresentationVariant.USER_INPUT, -100, '-10,000%'],
      [PercentPresentationVariant.USER_INPUT, -1.9999, '-199.99%'],
      [PercentPresentationVariant.USER_INPUT, -0.01, '-1%'],
      [PercentPresentationVariant.USER_INPUT, 0, '0%'],
      [PercentPresentationVariant.USER_INPUT, 0.01, '1%'],
      [PercentPresentationVariant.USER_INPUT, 1.9999, '199.99%'],
      [PercentPresentationVariant.USER_INPUT, 100, '10,000%'],
      [PercentPresentationVariant.USER_INPUT, 100.505, '10,050.5%'],
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

      expect(formatPercent(0.755, PercentPresentationVariant.DEFAULT)).toBe('76%');
      expect(formatPercent(-0.755, PercentPresentationVariant.DEFAULT)).toBe('-76%');

      expect(
        formatPercent(0.755, PercentPresentationVariant.DEFAULT, {
          opts: {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          },
        })
      ).toBe('75.500%');
      expect(
        formatPercent(-0.755, PercentPresentationVariant.DEFAULT, {
          opts: {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          },
        })
      ).toBe('-75.500%');
    });
  });
});
