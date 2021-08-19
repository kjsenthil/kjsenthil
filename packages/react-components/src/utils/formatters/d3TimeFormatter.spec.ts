import { d3TimeFormatter } from './d3TimeFormatter';

describe('d3TimeFormatter', () => {
  test('The d3 time formatter works as expected', () => {
    const date = new Date(2020, 0, 1);

    // The formatter will return a space-padded string for single-digit dates
    // mainly to help visually align chart ticks
    expect(d3TimeFormatter.DATE_AND_MONTH(date)).toBe(' 1 JAN');

    expect(d3TimeFormatter.MONTH_ONLY(date)).toBe('JAN');
    expect(d3TimeFormatter.YEAR_AND_MONTH(date)).toBe('JAN 2020');
    expect(d3TimeFormatter.YEAR_ONLY(date)).toBe('2020');
  });
});
