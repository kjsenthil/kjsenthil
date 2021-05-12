import { d3ValueFormatter } from './d3ValueFormatter';

describe('d3ValueFormatter', () => {
  test('The d3 value formatter works as expected', () => {
    const testCases = [
      { value: -1, formatted: '−£1' },
      { value: 0, formatted: '£0' },
      { value: 1, formatted: '£1' },
      { value: 200, formatted: '£200' },
      { value: 3000, formatted: '£3k' },
      { value: 3555, formatted: '£3.555k' },
      { value: 4000000, formatted: '£4M' },
      { value: 4555555, formatted: '£4.556M' },
      { value: 5000000000, formatted: '£5B' },
      { value: 5555555555, formatted: '£5.556B' },
      { value: 5999999999, formatted: '£6B' },
    ];

    testCases.forEach(({ value, formatted }) => {
      expect(d3ValueFormatter(value)).toBe(formatted);
    });
  });
});
