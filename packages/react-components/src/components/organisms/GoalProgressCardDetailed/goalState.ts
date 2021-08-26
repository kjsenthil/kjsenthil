export enum GoalState {
  NOT_THERE_YET = 'Not there yet',
  ONGOING = 'Ongoing',
  FINISHED = 'Finished',
}

export const determineGoalState = (startDate?: Date, endDate?: Date): GoalState => {
  if (endDate && endDate.getTime() < Date.now()) return GoalState.FINISHED;
  if (startDate && startDate.getTime() < Date.now()) return GoalState.ONGOING;
  return GoalState.NOT_THERE_YET;
};
