import calculateAbsoluteFloorDiff from '.';

describe('calculateAbsoluteFloorDiff', () => {
  it('calculates the absolute value of difference between two dates', () => {
    expect(calculateAbsoluteFloorDiff('2011-09-09', '2011-09-11', 'day')).toStrictEqual(2);
    expect(calculateAbsoluteFloorDiff('2011-09-11', '2011-09-09', 'day')).toStrictEqual(2);
    expect(calculateAbsoluteFloorDiff('2011-09-09', '2011-08-09', 'month')).toStrictEqual(1);
    expect(calculateAbsoluteFloorDiff('2011-08-09', '2011-09-09', 'month')).toStrictEqual(1);
  });

  it('returns the floor of the absolute diff between two dates', () => {
    expect(
      calculateAbsoluteFloorDiff('2011-09-09T00:00:00', '2011-09-11T23:59:59', 'day')
    ).toStrictEqual(2);
    expect(
      calculateAbsoluteFloorDiff('2011-09-11T23:59:59', '2011-09-09T00:00:00', 'day')
    ).toStrictEqual(2);
    expect(
      calculateAbsoluteFloorDiff('2011-08-09T00:00:00', '2011-10-08T23:59:59', 'month')
    ).toStrictEqual(1);
    expect(
      calculateAbsoluteFloorDiff('2011-10-08T23:59:59', '2011-08-09T00:00:00', 'month')
    ).toStrictEqual(1);
  });
});
