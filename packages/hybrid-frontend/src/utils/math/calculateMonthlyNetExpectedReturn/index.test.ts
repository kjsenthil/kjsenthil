import calculateMonthlyNetExpectedReturn from '.';

describe('calculateMonthlyNetExpectedReturn', () => {
  it.each`
    annualNetExpectedReturn | result
    ${0.0567}               | ${0.004606481068812007}
    ${0.0395}               | ${0.003233535660337905}
    ${0.0954}               | ${0.007622201653593841}
  `(
    'calculates monthly net expected return given annualNetExpectedReturn of $annualNetExpectedReturn',
    ({ annualNetExpectedReturn, result }: { annualNetExpectedReturn: number; result: number }) => {
      expect(
        calculateMonthlyNetExpectedReturn({
          annualNetExpectedReturn,
        })
      ).toStrictEqual(result);
    }
  );
});
