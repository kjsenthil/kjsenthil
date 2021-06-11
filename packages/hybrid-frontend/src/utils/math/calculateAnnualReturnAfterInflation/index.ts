const calculateAnnualReturnAfterInflation = ({
  inflation,
  timePeriodInYears,
  annualIncome,
}: {
  inflation: number;
  timePeriodInYears: number;
  annualIncome: number;
}): number => annualIncome * (1 / (1 + inflation) ** timePeriodInYears);

export default calculateAnnualReturnAfterInflation;
