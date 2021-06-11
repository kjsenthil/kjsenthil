import calculateDesiredAmountAtEndOfRetirement from '.';

describe('calculateDesiredAmountAtEndOfRetirement', () => {
  it.each`
    laterLifeLeftOver | monthlyNetExpectedReturn | drawdownPeriodLengthMonths | result
    ${100000}         | ${0.0032}                | ${400}                     | ${27860.608999196076}
    ${200000}         | ${0.004}                 | ${300}                     | ${60383.20393282334}
    ${300000}         | ${0.0022}                | ${130}                     | ${225449.59625002125}
  `(
    'calculates desired amount at the end of retirement given monthly expected return of $mothlyNetExpectedReturn, later life left over amount of $laterLifeLeftOver a drawdown period length in months: $drawdownPeriodLengthMonths',
    ({
      laterLifeLeftOver,
      monthlyNetExpectedReturn,
      drawdownPeriodLengthMonths,
      result,
    }: {
      laterLifeLeftOver: number;
      monthlyNetExpectedReturn: number;
      drawdownPeriodLengthMonths: number;
      result: number;
    }) => {
      expect(
        calculateDesiredAmountAtEndOfRetirement({
          laterLifeLeftOver,
          monthlyNetExpectedReturn,
          drawdownPeriodLengthMonths,
        })
      ).toStrictEqual(result);
    }
  );
});
