import MockDate from 'mockdate';
import formatDate from '.';

const frozenTodaysDate = '2021-12-21';

describe('performanceChartFormat', () => {
  beforeEach(() => {
    MockDate.set('2021-12-21');
  });

  afterEach(() => {
    MockDate.reset();
  });

  it.each`
    date                     | format           | humanize | expected
    ${new Date(2020, 0, 1)}  | ${'MMM D, YYYY'} | ${true}  | ${'Jan 1, 2020'}
    ${new Date(2020, 0, 1)}  | ${'YYYY-MM-DD'}  | ${true}  | ${'2020-01-01'}
    ${new Date(2020, 11, 1)} | ${'DD/MM/YYYY'}  | ${true}  | ${'01/12/2020'}
    ${'today'}               | ${'YYYY-MM-DD'}  | ${true}  | ${'Today'}
    ${'today'}               | ${'YYYY-MM-DD'}  | ${false} | ${frozenTodaysDate}
  `(
    'The date formatter works as expected when date is $date and format is $format',
    ({
      date,
      format,
      humanize,
      expected,
    }: {
      date: Date | 'today';
      format: string;
      humanize: boolean;
      expected: string;
    }) => {
      // new Date cannot be mocked unless it's inside 'it' block
      expect(formatDate(date === 'today' ? new Date() : date, format, humanize)).toBe(expected);
    }
  );
});
