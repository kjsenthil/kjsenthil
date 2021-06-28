import calculateDateAfterMonths from '.';

describe('calculateDateAfterMonths', () => {
  it('adds x months to a date and returns the new date', () => {
    expect(calculateDateAfterMonths(new Date(1977, 1, 2), 2)).toStrictEqual(new Date(1977, 3, 2));
    expect(calculateDateAfterMonths(new Date(1977, 1, 2), 12)).toStrictEqual(new Date(1978, 1, 2));
  });

  it('adds x months to a date and returns new date setting it to the start of the month', () => {
    expect(calculateDateAfterMonths(new Date(1977, 1, 2), 2, true)).toStrictEqual(
      new Date(1977, 3, 1)
    );
    expect(calculateDateAfterMonths(new Date(1977, 1, 2), 12, true)).toStrictEqual(
      new Date(1978, 1, 1)
    );
  });

  it('subtracts x months from a date and returns the new date', () => {
    expect(calculateDateAfterMonths(new Date(1977, 1, 1), -2)).toStrictEqual(new Date(1976, 11, 1));
  });
});
