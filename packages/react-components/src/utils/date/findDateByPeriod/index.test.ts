import findDateByPeriod from '.';

import testDates from './test-dates.json';

describe('findDateByPeriod', () => {
  const testCases = [
    ['5y', '2016-05-13T00:00:00'],
    ['4y', '2017-04-13T00:00:00'],
    ['3y', '2018-04-13T00:00:00'],
    ['2y', '2019-04-12T00:00:00'],
    ['1y', '2020-04-13T00:00:00'],
    ['6m', '2020-10-13T00:00:00'],
    ['3m', '2021-01-13T00:00:00'],
    ['2m', '2021-02-12T00:00:00'],
    ['1m', '2021-03-12T00:00:00'],
    ['5w', '2021-03-09T00:00:00'],
    ['4w', '2021-03-16T00:00:00'],
    ['3w', '2021-03-23T00:00:00'],
    ['2w', '2021-03-30T00:00:00'],
    ['1w', '2021-04-06T00:00:00'],
    ['9d', '2021-04-02T00:00:00'],
    ['8d', '2021-04-05T00:00:00'],
    ['7d', '2021-04-06T00:00:00'],
    ['6d', '2021-04-07T00:00:00'],
    ['5d', '2021-04-08T00:00:00'],
    ['4d', '2021-04-09T00:00:00'],
    ['3d', '2021-04-12T00:00:00'],
    ['2d', '2021-04-12T00:00:00'],
    ['1d', '2021-04-12T00:00:00'],
  ];

  test.each(testCases)(
    'Using mock historical performance API data, it finds the correct start date for period %p',
    (period, expected) => {
      // The 'testDates' array is extracted from an actual historical performance API call
      expect(findDateByPeriod(testDates, period)).toBe(expected);
    }
  );

  // Edge cases

  it('returns the only date in an array of 1', () => {
    expect(findDateByPeriod(['2011-07-11T00:00:00'], '1y')).toStrictEqual('2011-07-11T00:00:00');
  });

  it('returns null with an empty array', () => {
    expect(findDateByPeriod([], '1y')).toBeNull();
  });
});
