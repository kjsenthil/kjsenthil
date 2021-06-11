import calculateDateAfterYears from '.';

describe('calculateDateAfterYears', () => {
  it('adds x years to a date and returns the new date', () => {
    expect(calculateDateAfterYears(new Date(1977, 1, 1), 2)).toStrictEqual(new Date(1979, 1, 1));
  });

  it('subtracts x years from a date and returns the new date', () => {
    expect(calculateDateAfterYears(new Date(1977, 1, 1), -2)).toStrictEqual(new Date(1975, 1, 1));
  });
});
