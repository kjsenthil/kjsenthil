import MockDate from 'mockdate';
import getPerformanceProjectionsChartTooltipText from './getPerformanceProjectionsChartTooltipText';

describe('getPerformanceProjectionsChartTooltipText', () => {
  MockDate.set('2020-01-01'); // "Today"'s date

  const testCases: [
    Date, // Tooltip date
    number | undefined, // Age as at today
    string // Expected tooltip text
  ][] = [
    [new Date(2023, 0, 1), 30, 'AGE 33'],
    [new Date(2021, 0, 1), 30, 'AGE 31'],
    [new Date(2020, 0, 1), 30, 'TODAY'],
    [new Date(2020, 0, 1), undefined, 'TODAY'],
    [new Date(2021, 0, 1), undefined, '2021'],
    [new Date(2023, 0, 1), undefined, '2023'],
  ];

  test.each(testCases)(
    "it returns the correct tooltip text when today is 01/01/2020, tooltip year is %i and today's age is %p",
    (tooltipDate, todayAge, expected) => {
      expect(
        getPerformanceProjectionsChartTooltipText({
          tooltipDate,
          todayAge,
        })
      ).toBe(expected);
    }
  );
});
