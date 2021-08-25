import convertToOrdinal from './convertToOrdinal';

const testCases = [
  { index: 1, ordinal: '1st' },
  { index: 2, ordinal: '2nd' },
  { index: 3, ordinal: '3rd' },
  { index: 4, ordinal: '4th' },
  { index: 5, ordinal: '5th' },
  { index: 10, ordinal: '10th' },
  { index: 11, ordinal: '11th' },
  { index: 101, ordinal: '101st' },
  { index: 111, ordinal: '111th' },
];

describe('convertToOrdinal', () => {
  testCases.forEach(({ index, ordinal }) => {
    it(`converts ${index} to ${ordinal}`, () => {
      expect(convertToOrdinal(index)).toStrictEqual(ordinal);
    });
  });
});
