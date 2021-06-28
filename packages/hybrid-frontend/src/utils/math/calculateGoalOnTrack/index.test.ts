import calculateGoalOnTrack from '.';

describe('calculateGoalOnTrack', () => {
  it.each`
    totalProjectedAmountAtRetirement | totalRequiredAtAgeOfRetirement | result
    ${100000}                        | ${100000}                      | ${1}
    ${50000}                         | ${100000}                      | ${0.5}
    ${110000}                        | ${100000}                      | ${1.1}
    ${100000}                        | ${0}                           | ${0}
  `(
    'returns a ratio $totalProjectedAmountAtRetirement to $totalRequiredAtAgeOfRetirement resulting in $result',
    ({
      totalProjectedAmountAtRetirement,
      totalRequiredAtAgeOfRetirement,
      result,
    }: {
      totalProjectedAmountAtRetirement: number;
      totalRequiredAtAgeOfRetirement: number;
      result: number;
    }) => {
      expect(
        calculateGoalOnTrack(totalProjectedAmountAtRetirement, totalRequiredAtAgeOfRetirement)
      ).toStrictEqual(result);
    }
  );
});
