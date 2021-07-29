import {
  GoalCategory,
  goalDataForChart,
  GoalDatum,
  GoalDefaults,
  GoalPayloadValType,
  GoalsApiResponse,
  GoalStatus,
} from '../../services/goal';
import useBasicInfo from '../useBasicInfo';
import useGoals from '../useGoals';
import { calculateDateAfterYears } from '../../utils/date';
import useGoalCurrentProjections from '../useGoalCurrentProjections';

export interface GoalOptionsForChart {
  goalCategory: GoalCategory;
  shouldFallbackToUncategorised?: boolean;
  fallbackGoalData?: {
    description?: string;
    status?: GoalStatus;

    objectiveFrequencyStartAge: number;
    objectiveFrequencyEndAge?: number;
    biRetirementLumpSumDate?: GoalPayloadValType<string, 'Date', 'val'> | null;
  };
}

export interface GoalDataForChart extends GoalDatum {
  category: GoalCategory;
}

const useGoalsDataForChart = ({
  goalCategory: category,
  shouldFallbackToUncategorised = false,
  fallbackGoalData,
}: GoalOptionsForChart): GoalDataForChart[] => {
  const { dateOfBirth } = useBasicInfo({ shouldDispatch: false });

  const goalCurrentProjections = useGoalCurrentProjections();

  // These are needed to check whether the "Lump sum" and "Remaining" goal
  // indicators will be shown or not.
  let remainingAmount = 0;
  let lumpSumAmount = 0;
  if (goalCurrentProjections) {
    remainingAmount = goalCurrentProjections.affordableRemainingAmount;
    lumpSumAmount = goalCurrentProjections.affordableLumpSum;
  }

  const goalsFromState = useGoals(true);

  let filteredGoalsFieldsFromState: Pick<GoalsApiResponse, 'fields'>[] =
    goalsFromState?.filter(({ fields }) => fields.category === category) ?? [];
  if (
    shouldFallbackToUncategorised &&
    filteredGoalsFieldsFromState.length === 0 &&
    goalsFromState
  ) {
    filteredGoalsFieldsFromState = goalsFromState.filter(
      ({ fields }) => fields.category === GoalCategory.UNCATEGORIZED
    );
  } else if (fallbackGoalData) {
    filteredGoalsFieldsFromState = [
      {
        fields: { category, description: '', status: GoalStatus.UNFULFILLED, ...fallbackGoalData },
      },
    ];
  }

  // For each goal, there can be up to 3 goal indicators on the chart:
  // - The "main" indicator: the point when the withdraw period starts.
  // - The "lump sum" indicator: the point when the lump sum withdrawal (if
  //   defined) is made.
  // - The "remaining" indicator: the point when the withdraw period ends (only
  //   shown if there is money remaining).
  const goalsDataForChart: GoalDataForChart[] = [];

  filteredGoalsFieldsFromState.forEach(
    ({
      fields: {
        category: goalCategory,
        objectiveFrequencyStartAge,
        objectiveFrequencyEndAge,
        biRetirementLumpSumDate,
      },
    }) => {
      if (biRetirementLumpSumDate && lumpSumAmount > 0) {
        goalsDataForChart.push({
          // Start with default values...
          ...goalDataForChart[goalCategory],

          category: goalCategory,
          label: 'Lump sum',
          // eslint-disable-next-line no-underscore-dangle
          date: new Date(biRetirementLumpSumDate.val),
          progress: undefined,
        });
      }

      // The "main" indicator always exists
      goalsDataForChart.push({
        // Start with default values...
        ...goalDataForChart[goalCategory],

        category: goalCategory,
        date: calculateDateAfterYears(
          dateOfBirth,
          objectiveFrequencyStartAge ?? GoalDefaults.DRAW_DOWN_START_AGE
        ),
        progress: undefined,
      });

      if (objectiveFrequencyEndAge && remainingAmount > 0) {
        goalsDataForChart.push({
          // Start with default values...
          ...goalDataForChart[goalCategory],

          category: goalCategory,
          label: 'Remaining',
          date: calculateDateAfterYears(dateOfBirth, objectiveFrequencyEndAge),
          progress: undefined,
        });
      }
    }
  );

  return goalsDataForChart;
};

export default useGoalsDataForChart;
