import { CurrentGoals, GoalCategory, GoalStatus } from '../types';

const filterGoals = (goals: CurrentGoals) => {
  const foundCategories: Array<GoalCategory> = [];
  return goals
    .reverse()
    .filter((goal) => {
      if (
        goal.fields.status !== GoalStatus.CANCELLED &&
        !foundCategories.includes(goal.fields.category)
      ) {
        foundCategories.push(goal.fields.category);
        return true;
      }

      return false;
    })
    .reverse();
};

export default filterGoals;
