import calculateMonthlyCompoundInterestMultiplier from '.';

describe('calculateMonthlyCompoundInterestMultiplier', () => {
  it.each`
    monthlyNetExpectedReturn | drawdownPeriodLengthMonths | result
    ${0.0032}                | ${343}                     | ${208.71068793570777}
    ${0.0058}                | ${64}                      | ${53.64622382775703}
    ${0.0024}                | ${235}                     | ${179.88345450752178}
  `(
    'calculates monthly compound interest multiplier given monthly expected return of $mothlyNetExpectedReturn and a drawdown period length in months: $drawdownPeriodLengthMonths',
    ({
      monthlyNetExpectedReturn,
      drawdownPeriodLengthMonths,
      result,
    }: {
      monthlyNetExpectedReturn: number;
      drawdownPeriodLengthMonths: number;
      result: number;
    }) => {
      expect(
        calculateMonthlyCompoundInterestMultiplier({
          monthlyNetExpectedReturn,
          drawdownPeriodLengthMonths,
        })
      ).toStrictEqual(result);
    }
  );
});
