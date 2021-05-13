import monthDifference from '.';

describe('monthDifference', () => {
  test('Month difference between two dates', () => {
    const date1 = '2020-06-20';
    const date2 = '2020-01-10';
    expect(monthDifference(date1, date2)).toBe(5);
  });
});
