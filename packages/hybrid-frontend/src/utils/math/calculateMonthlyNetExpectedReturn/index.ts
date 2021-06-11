const calculateMonthlyNetExpectedReturn = ({
  annualNetExpectedReturn,
}: {
  annualNetExpectedReturn: number;
}): number => (1 + annualNetExpectedReturn) ** (1 / 12) - 1;

export default calculateMonthlyNetExpectedReturn;
