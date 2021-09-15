import { GoalSelectionTile } from '@tswdts/react-components/src/components/organisms/GoalSelection/types';
import { GoalCategory } from '../../../../services/goal';
import { GoalCreationLimits, GoalSelectionTileConfig } from './config';

export interface GetGoalSelectionTilesProps {
  goalsData: { category: GoalCategory }[];
  goalSelectionTilesConfig: GoalSelectionTileConfig[];
  goalCreationLimits?: GoalCreationLimits;
}

/**
 * Not all goal tiles will be shown all the time by the GoalSelection component.
 * This is because certain goal categories is limited to being created N times
 * only.
 *
 * This function returns the necessary data for the tiles that will be rendered
 * by the GoalSelection component.
 */
export default function getGoalSelectionTiles({
  goalsData,
  goalSelectionTilesConfig,
  goalCreationLimits,
}: GetGoalSelectionTilesProps): GoalSelectionTile[] {
  if (!goalCreationLimits || goalsData.length === 0) {
    // If there are no limitations on goal creation, or if no goals have been
    // created yet, then we return the full set of goalSelectionTilesConfig so
    // that the GoalSelection component can render all goal creation tiles.

    return goalSelectionTilesConfig;
  }

  // First, we create an object to track the number of times that a goal of each
  // limited category has been created.
  const goalCreationLimitCounts: GoalCreationLimits = {};

  // We also need an array that contains all goal categories that have been
  // created too many times
  const goalCategoriesThatHaveReachedCreationLimit: GoalCategory[] = [];

  goalsData.forEach(({ category }) => {
    if (goalCreationLimits[category]) {
      // The amount of times a goal of this category can be created is limited.

      if (goalCreationLimitCounts[category]) {
        goalCreationLimitCounts[category]! += 1;
      } else {
        goalCreationLimitCounts[category] = 1;
      }

      if (goalCreationLimitCounts[category]! >= goalCreationLimits[category]!) {
        // The amount of times a goal of this category can be created has
        // reached the limit!
        goalCategoriesThatHaveReachedCreationLimit.push(category);
      }
    }
  });

  // Finally, we filter out all goal categories that have reached the creation
  // limit from the data to be provided to the GoalSelection component.
  return goalSelectionTilesConfig.filter(
    ({ category }) => !goalCategoriesThatHaveReachedCreationLimit.includes(category)
  );
}
