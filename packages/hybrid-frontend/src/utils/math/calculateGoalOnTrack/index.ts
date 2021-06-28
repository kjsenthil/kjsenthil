const calculateGoalOnTrack = (
  totalProjectedAmountAtRetirement: number,
  totalRequiredAtAgeOfRetirement: number
) =>
  totalRequiredAtAgeOfRetirement === 0
    ? 0
    : totalProjectedAmountAtRetirement / totalRequiredAtAgeOfRetirement;

export default calculateGoalOnTrack;
