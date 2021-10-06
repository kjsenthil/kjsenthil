import getBufferNumber from './getBufferNumber';

const testCases = [
  [2_000, 500],
  [999, 50],
  [90, 5],
  [1, 5],
];

describe('getBufferNumber', () => {
  test.each(testCases)('it works as expected when the number is %p', (props, expected) => {
    expect(getBufferNumber(props)).toBe(expected);
  });
});
