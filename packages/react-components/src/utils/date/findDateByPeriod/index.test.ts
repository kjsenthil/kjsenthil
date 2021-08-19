import findDateByPeriod from '.';

const dates = [
  '2016-05-09T00:00:00',
  '2016-05-10T00:00:00',
  '2016-03-05T00:00:00',
  '2016-03-11T00:00:00',
  '2016-03-12T00:00:00',
  '2016-01-11T00:00:00',
  '2016-03-15T00:00:00',
  '2016-03-10T00:00:00',
  '2016-03-20T00:00:00',
  '2016-04-01T00:00:00',
  '2016-04-05T00:00:00',
  '2016-06-08T00:00:00',
  '2016-06-07T00:00:00',
  '2016-06-10T00:00:00',
  '2016-06-09T00:00:00',
  '2011-07-11T00:00:00',
];

describe('findDatePeriod', () => {
  it('returns a date from an array by a given number of days with an exact match', () => {
    expect(findDateByPeriod(dates, '1d')).toStrictEqual('2016-06-09T00:00:00');
    expect(findDateByPeriod(dates, '2d')).toStrictEqual('2016-06-08T00:00:00');
    expect(findDateByPeriod(dates, '3d')).toStrictEqual('2016-06-07T00:00:00');
  });

  it('returns the cloest date from an array of a given number of days when no exact match is found', () => {
    expect(findDateByPeriod(dates, '5d')).toStrictEqual('2016-06-07T00:00:00');
    expect(findDateByPeriod(dates, '4d')).toStrictEqual('2016-06-07T00:00:00');
  });

  it('returns a date from an array by a given number of months', () => {
    expect(findDateByPeriod(dates, '1m')).toStrictEqual('2016-05-09T00:00:00');
    expect(findDateByPeriod(dates, '3m')).toStrictEqual('2016-03-05T00:00:00');
    expect(findDateByPeriod(dates, '6m')).toStrictEqual('2016-01-11T00:00:00');
  });

  it('returns a date from an array by a given number of years', () => {
    expect(findDateByPeriod(dates, '1y')).toStrictEqual('2016-01-11T00:00:00');
    expect(findDateByPeriod(dates, '2y')).toStrictEqual('2016-01-11T00:00:00');
    expect(findDateByPeriod(dates, '5y')).toStrictEqual('2011-07-11T00:00:00');
    expect(findDateByPeriod(dates, '9y')).toStrictEqual('2011-07-11T00:00:00');
    expect(findDateByPeriod(dates, '10y')).toStrictEqual('2011-07-11T00:00:00');
  });

  it('returns the only date in an array of 1', () => {
    expect(findDateByPeriod(['2011-07-11T00:00:00'], '1y')).toStrictEqual('2011-07-11T00:00:00');
  });

  it('returns null with an empty array', () => {
    expect(findDateByPeriod([], '1y')).toBeNull();
  });
});
