const calculateDesiredAmountAtEndOfRetirement = ({
  laterLifeLeftOver,
  monthlyNetExpectedReturn,
  drawdownPeriodLengthMonths,
}: {
  laterLifeLeftOver: number;
  monthlyNetExpectedReturn: number;
  drawdownPeriodLengthMonths: number;
}): number => laterLifeLeftOver / (1 + monthlyNetExpectedReturn) ** drawdownPeriodLengthMonths;

export default calculateDesiredAmountAtEndOfRetirement;
