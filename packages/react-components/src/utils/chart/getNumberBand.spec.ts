import getNumberBand, { GetNumberBandProps } from './getNumberBand';

const testCases = [
  [{ min: 60_000, max: 80_000, step: 5_000 }, [60_000, 65_000, 70_000, 75_000, 80_000]],
  [{ min: 1_000, max: 1_000, step: 1_000 }, [1_000]],
];

describe('getNumberBand', () => {
  test.each(testCases)('it works as expected for test case %#', (props, expected) => {
    expect(getNumberBand(props as GetNumberBandProps)).toEqual(expected);
  });
});
