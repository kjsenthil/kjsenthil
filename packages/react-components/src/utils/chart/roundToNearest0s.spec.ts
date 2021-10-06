import { roundDownToNearest0s, roundUpToNearest0s } from './roundToNearest0s';

const roundDownTestCases = [
  [11_530, 10_000],
  [11_530.11, 10_000],
  [122_456, 100_000],
  [69_625_785, 60_000_000],
  [499_123_102, 400_000_000],
  [999, 900],
  [99, 90],
  [9, 0],
  [1, 0],
];

describe('roundDownToNearest0s', () => {
  test.each(roundDownTestCases)('it works as expected when the number is %p', (props, expected) => {
    expect(roundDownToNearest0s(props)).toBe(expected);
  });
});

const roundUpTestCases = [
  [11_530, 20_000],
  [11_530.11, 20_000],
  [122_456, 200_000],
  [69_625_785, 70_000_000],
  [401_123_102, 500_000_000],
  [999, 1_000],
  [99, 100],
  [9, 10],
  [1, 10],
];

describe('roundUpToNearest0s', () => {
  test.each(roundUpTestCases)('it works as expected when the number is %p', (props, expected) => {
    expect(roundUpToNearest0s(props)).toBe(expected);
  });
});
