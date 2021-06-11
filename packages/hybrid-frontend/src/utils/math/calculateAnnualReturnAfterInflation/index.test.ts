import calculateAnnualReturnAfterInflation from '.';

describe('calculateAnnualReturnAfterInflation', () => {
  it.each`
    inflation | timePeriodInYears | annualIncome | result
    ${2}      | ${20}             | ${50000}     | ${33648.56665540287}
    ${2}      | ${25}             | ${70000}     | ${42667.160936979526}
    ${2}      | ${14}             | ${100000}    | ${75787.50245882894}
  `(
    'calculates annual income of $result in tomorrows money for the desired $annualIncome p.a at $inflation% for the time period of $timePeriodInYears years',
    ({
      inflation,
      timePeriodInYears,
      annualIncome,
      result,
    }: {
      inflation: number;
      timePeriodInYears: number;
      annualIncome: number;
      result: number;
    }) => {
      expect(
        calculateAnnualReturnAfterInflation({
          inflation: inflation / 100,
          timePeriodInYears,
          annualIncome,
        })
      ).toStrictEqual(result);
    }
  );
});
