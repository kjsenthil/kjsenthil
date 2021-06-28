import yearDifference from '.';

describe('yearDifference', () => {
  test('Year difference between two dates', () => {
    const date1 = '2011-06-20';
    const date2 = '2006-01-10';
    expect(yearDifference(date1, date2)).toBe(5);
  });
});
