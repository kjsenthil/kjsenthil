import * as React from 'react';
import { useMediaQuery } from '../../../atoms';
import { GoalTile, DisabledComponent } from '../../../molecules';
import MaybeLink from './MaybeLink';
import { GoalSelectionTile } from '../types';
import { GoalTilesLayout } from '../GoalSelection.styles';

export interface GoalTilesContainerProps {
  tiles: GoalSelectionTile[];

  breakpointsPx?: {
    oneColumn: number;
    twoColumns: number;
  };
}

// These numbers are based on (see details in GoalTilesLayout styled component):
// - Each goal selection tile having a width of 394px
// - The goal selection container has column gaps of 28px
const defaultBreakpointsPx = {
  oneColumn: 863,
  twoColumns: 1397,
};

const renderTiles = (tiles: GoalSelectionTile[]) =>
  tiles.map((tile) => {
    let goalTile = (
      <MaybeLink key={tile.name} to={tile.href}>
        <GoalTile goalName={tile.name} iconSrc={tile.iconSrc} />
      </MaybeLink>
    );

    if (tile.disabled) {
      goalTile = (
        <DisabledComponent key={tile.name} title="Coming soon">
          {goalTile}
        </DisabledComponent>
      );
    }

    // For other views, we leave all tiles flowing automatically
    return goalTile;
  });

/**
 * The goal tile containers renders a grid of goal selection tiles. The tricky
 * details is the top-right corner of the grid is always empty if the amount of
 * goal tiles is an odd number. There is no out-of-the-box CSS solution for this
 * layout yet (as far as we can see). Thus, we opted to:
 * - Only allowing either 1, 2, or 3 columns, using screen width to determine
 *   how many columns should be used. This works because the goal selection
 *   tiles have fixed width
 *   - Note: it's better to use container width media queries rather than screen
 *     width, but this is not widely supported yet (https://caniuse.com/css-container-queries).
 * - Manually adding an empty div to either the 2nd or 3rd position in the goal
 *   selection tile list, depending on the columns count and the goal tiles
 *   count.
 */
export default function GoalTilesContainer({
  tiles,
  breakpointsPx = defaultBreakpointsPx,
}: GoalTilesContainerProps) {
  const isOneColumn = useMediaQuery(`(max-width: ${breakpointsPx.oneColumn}px)`);
  const isTwoColumns = useMediaQuery(`(max-width: ${breakpointsPx.twoColumns}px)`);

  const tileElements = renderTiles(tiles);

  // This should be a string that can fit into this CSS statement:
  // "repeat(<columnsCount>, minMax(x, x))"
  let columnsCount = 'auto-fit';

  // We only need the empty block top right corner thing when the amount of goal
  // tiles is odd.
  const needEmptyBlock = tiles.length % 2 === 1;

  if (isOneColumn) {
    columnsCount = '1';
  } else if (isTwoColumns) {
    if (needEmptyBlock) {
      // The second item should be an empty block so that there is a blank space
      // at the top right corner
      tileElements.splice(1, 0, <div key="empty-block" />);

      // Render 2 columns
      columnsCount = '2';
    } else {
      columnsCount = 'auto-fit';
    }
  } else if (needEmptyBlock) {
    // The third item should be an empty block so that there is a blank space at
    // the top right corner.
    tileElements.splice(2, 0, <div key="empty-block" />);

    // Render 3 columns
    columnsCount = '3';
  }

  return <GoalTilesLayout columnsCount={`${columnsCount}`}>{tileElements}</GoalTilesLayout>;
}
