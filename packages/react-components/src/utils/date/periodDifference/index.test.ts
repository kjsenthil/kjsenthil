import periodDifference from '.';

describe('periodDifference', () => {
  test('Period start is after date', () => {
    const date = '2010-01-01';
    const period = '5y';
    expect(periodDifference(date, period)).toBeGreaterThan(0);
  });

  test('Period start is before date', () => {
    const date = '3000-01-01';
    const period = '1y';
    expect(periodDifference(date, period)).toBeLessThan(0);
  });

  test('Period not recognised returns null', () => {
    const date = '2020-01-01';
    const period = '4t';
    expect(periodDifference(date, period)).toBeNull();
  });
});
