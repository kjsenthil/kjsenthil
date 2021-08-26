import { determineGoalState, GoalState } from './goalState';

describe('Determine goal state', () => {
  const distantPast = new Date(Date.now() - 90000);
  const past = new Date(Date.now() - 10000);
  const future = new Date(Date.now() + 10000);
  const distantFuture = new Date(Date.now() + 90000);

  it.each`
    startDate      | endDate          | goalState
    ${null}        | ${null}          | ${GoalState.NOT_THERE_YET}
    ${null}        | ${past}          | ${GoalState.FINISHED}
    ${null}        | ${future}        | ${GoalState.NOT_THERE_YET}
    ${distantPast} | ${past}          | ${GoalState.FINISHED}
    ${past}        | ${future}        | ${GoalState.ONGOING}
    ${future}      | ${distantFuture} | ${GoalState.NOT_THERE_YET}
  `(
    'should be $goalState when goal starts on $startDate and ends on $endDate',
    ({
      startDate,
      endDate,
      goalState,
    }: {
      startDate?: Date;
      endDate?: Date;
      goalState: GoalState;
    }) => {
      expect(determineGoalState(startDate, endDate)).toBe(goalState);
    }
  );
});
