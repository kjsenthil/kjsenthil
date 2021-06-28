import { useSelector } from 'react-redux';
import {
  ProjectionsChartGoalDatum,
  goalDataForChart,
  GoalDefaults,
  GoalCategory,
} from '../../services/goal';
import useBasicInfo from '../useBasicInfo';
import useGoals from '../useGoals';
import { calculateDateAfterYears } from '../../utils/date';
import { RootState } from '../../store';
import { calculateGoalOnTrack } from '../../utils/math';

export interface GoalDataForChart {
  goalCategory: GoalCategory;
  shouldFallbackToUncategorized?: boolean;
  fallbackGoalData?: {
    objectiveFrequencyEndAge: number;
  };
}

const useGoalsDataForChart = (
  {
    goalCategory: category,
    shouldFallbackToUncategorized = false,
    fallbackGoalData,
  }: GoalDataForChart = { goalCategory: GoalCategory.RETIREMENT }
): ProjectionsChartGoalDatum[] => {
  // TODO: replace with actual API data when it's ready
  let goals = [
    {
      fields: { category, ...fallbackGoalData },
    },
  ];

  if (!fallbackGoalData) {
    const goalsFromState = useGoals() || [];
    goals = goalsFromState.filter(({ fields }) => fields.category === category);
    if (shouldFallbackToUncategorized && goals.length === 0) {
      goals = goalsFromState.filter(({ fields }) => fields.category === GoalCategory.UNCATEGORIZED);
    }
  }

  const { dateOfBirth } = useBasicInfo();

  /**
   * The current goalCurrentProjections and goalTargetProjections assume retirement goal.
   * We might need to refactor the redux state to store projections per goal.
   */
  const { goalTargetProjections, goalCurrentProjections } = useSelector(
    (state: RootState) => state
  );

  return goals.map(({ fields }) => ({
    ...goalDataForChart[fields.category],
    date: calculateDateAfterYears(
      dateOfBirth,
      fields.objectiveFrequencyEndAge || GoalDefaults.DRAW_DOWN_END_AGE
    ),
    progress: calculateGoalOnTrack(
      goalCurrentProjections?.data?.projectedGoalAgeTotal || 0,
      goalTargetProjections?.data?.targetGoalAmount || 0
    ),
    targetAmount: goalCurrentProjections?.data?.projectedGoalAgeTotal || 0,
  }));
};

export default useGoalsDataForChart;
