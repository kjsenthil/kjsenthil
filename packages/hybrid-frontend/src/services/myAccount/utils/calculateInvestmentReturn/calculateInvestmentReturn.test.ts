import calculateInvestmentReturn from './calculateInvestmentReturn';

const performanceData = [
  { value: 50, date: new Date(2017, 1, 1) },
  { value: 0, date: new Date(2017, 10, 1) },
  { value: 1000, date: new Date(2018, 1, 1) },
  { value: 2000, date: new Date(2019, 1, 1) },
  { value: 3000, date: new Date(2020, 1, 1) },
];

const contributionData = [
  { value: 200, date: new Date(2017, 1, 1) },
  { value: 0, date: new Date(2017, 10, 1) },
  { value: 200, date: new Date(2018, 1, 1) },
  { value: 200, date: new Date(2019, 1, 1) },
  { value: 200, date: new Date(2020, 1, 1) },
];

describe('calculateInvestmentReturn', () => {
  it('returns the total return value and percent', () => {
    const value = 3000 - 200 - (50 - 200);
    const percent = value / 50;

    expect(calculateInvestmentReturn(performanceData, contributionData)).toStrictEqual({
      value,
      percent,
    });
  });

  it('returns 0 for percent if performance value is 0', () => {
    expect(
      calculateInvestmentReturn(
        [{ value: 0, date: new Date(2017, 1, 1) }],
        [{ value: 200, date: new Date(2017, 1, 1) }]
      )
    ).toStrictEqual({
      value: 0,
      percent: 0,
    });
  });

  it('returns the total return value and non zero percent if the first performance value is 0', () => {
    const expectedValue = 3000 - 200 - (50 - 200);
    const expectedPercent = expectedValue / 50;
    expect(
      calculateInvestmentReturn(
        [
          { value: 0, date: new Date(2016, 1, 1) },
          { value: 50, date: new Date(2017, 1, 1) },
          { value: 1000, date: new Date(2018, 1, 1) },
          { value: 2000, date: new Date(2019, 1, 1) },
          { value: 3000, date: new Date(2020, 1, 1) },
        ],
        [
          { value: 0, date: new Date(2016, 1, 1) },
          { value: 200, date: new Date(2017, 1, 1) },
          { value: 200, date: new Date(2018, 1, 1) },
          { value: 200, date: new Date(2019, 1, 1) },
          { value: 200, date: new Date(2020, 1, 1) },
        ]
      )
    ).toStrictEqual({
      value: expectedValue,
      percent: expectedPercent,
    });
  });

  it('returns 0 for value and percent for empty data', () => {
    expect(calculateInvestmentReturn([], contributionData)).toStrictEqual({
      value: 0,
      percent: 0,
    });

    expect(calculateInvestmentReturn(performanceData, [])).toStrictEqual({
      value: 0,
      percent: 0,
    });

    expect(calculateInvestmentReturn([], [])).toStrictEqual({
      value: 0,
      percent: 0,
    });
  });
  it('returns zero if all performance value is 0', () => {
    const expectedValue = 0;
    const expectedPercent = 0;
    expect(
      calculateInvestmentReturn(
        [
          { value: 0, date: new Date(2016, 1, 1) },
          { value: 0, date: new Date(2016, 1, 1) },
          { value: 0, date: new Date(2016, 1, 1) },
        ],
        [
          { value: 0, date: new Date(2016, 1, 1) },
          { value: 0, date: new Date(2016, 1, 1) },
          { value: 0, date: new Date(2016, 1, 1) },
        ]
      )
    ).toStrictEqual({
      value: expectedValue,
      percent: expectedPercent,
    });
  });
});
