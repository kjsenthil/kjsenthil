const monthlyCompoundInterestMultiplier = ({
  monthlyNetExpectedReturn,
  drawdownPeriodLengthMonths,
}: {
  monthlyNetExpectedReturn: number;
  drawdownPeriodLengthMonths: number;
}): number =>
  (1 + monthlyNetExpectedReturn) *
  ((1 - (1 + monthlyNetExpectedReturn) ** -drawdownPeriodLengthMonths) / monthlyNetExpectedReturn);

export default monthlyCompoundInterestMultiplier;
