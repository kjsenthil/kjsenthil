import getPerformanceChartAxisLeftTickValues, {
  GetPerformanceChartAxisBottomTicksProps,
} from './getPerformanceChartAxisLeftTickValues';

const testCases = [
  [
    { minChartValue: 1_234, maxChartValue: 52_324, bandsCount: 4 },
    [1_000, 17_000, 33_000, 49_000, 65_000],
  ],
];

describe('getPerformanceChartAxisLeftTickValues', () => {
  test.each(testCases)('it works as expected for test case %#', (props, expected) => {
    expect(
      getPerformanceChartAxisLeftTickValues(props as GetPerformanceChartAxisBottomTicksProps)
    ).toEqual(expected);
  });
});
