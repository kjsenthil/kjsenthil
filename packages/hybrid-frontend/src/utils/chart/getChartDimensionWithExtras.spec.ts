import getChartDimensionWithExtras from './getChartDimensionWithExtras';

describe('getChartDimensionWithExtras', () => {
  it('works as intended', () => {
    const chartDimension = {
      width: 100,
      height: 200,
      margin: {
        left: 10,
        right: 20,
        top: 30,
        bottom: 40,
      },
    };

    expect(getChartDimensionWithExtras(chartDimension)).toEqual({
      ...chartDimension,
      innerWidth: 70, // width - left margin - right margin
      innerHeight: 130, // height - top margin - bottom margin
    });
  });
});
