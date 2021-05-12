import formatDate from './formatDate';

const locale = 'en-GB';

function format(date: Date) {
  return date.toLocaleString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

describe('performanceChartFormat', () => {
  const testCases: Array<[Date, string]> = [
    [new Date(2020, 0, 1), format(new Date(2020, 0, 1))],
    [new Date(), 'Today'],
  ];

  test.each<[Date, string]>(testCases)(
    'The date formatter works as expected when date is %p',
    (date, expected) => {
      expect(formatDate(date, { locale })).toBe(expected);
    }
  );
});
