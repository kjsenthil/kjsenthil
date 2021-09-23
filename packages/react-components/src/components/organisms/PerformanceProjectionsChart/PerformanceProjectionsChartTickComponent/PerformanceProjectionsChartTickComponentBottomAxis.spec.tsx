import MockDate from 'mockdate';
import { getAgeText } from './PerformanceProjectionsChartTickComponentBottomAxis';

describe('PerformanceProjectionsChartTickComponentBottomAxis', () => {
  MockDate.set('2020-01-01');

  describe('getAgeText function', () => {
    const getAgeTextCases: Array<[number | undefined, number, string]> = [
      [new Date().getFullYear(), 30, 'AGE 30'],
      [new Date().getFullYear() + 10, 30, 'AGE 40'],
      [undefined, 30, 'AGE UNKNOWN'],
    ];

    test.each(getAgeTextCases)(
      "The function to calculate user's age works correctly when formattedValue is %p and today's age is %i",
      (tickYear, todayAge, expectedAgeText) => {
        const ageText = getAgeText({ tickYear, todayAge });

        expect(ageText).toBe(expectedAgeText);
      }
    );
  });

  const getAgeTextCasesShowAgeNumbersOnly: Array<[number | undefined, number, string]> = [
    [new Date().getFullYear(), 30, '30'],
    [new Date().getFullYear() + 10, 30, '40'],
    [undefined, 30, 'UNKNOWN'],
  ];

  test.each(getAgeTextCasesShowAgeNumbersOnly)(
    "The function to calculate user's age works correctly when formattedValue is %p and today's age is %i and only age numbers are shown",
    (tickYear, todayAge, expectedAgeText) => {
      const ageText = getAgeText({ tickYear, todayAge, showAgeNumberOnly: true });

      expect(ageText).toBe(expectedAgeText);
    }
  );
});
