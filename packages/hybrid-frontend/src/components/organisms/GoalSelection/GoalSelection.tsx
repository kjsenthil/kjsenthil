import React, { FunctionComponent } from 'react';
import {
  Heading,
  Description,
  GoalTilesLayout,
  GoalTileDoubleWidthWrapper,
} from './GoalSelection.styles';
import GoalTile from '../../molecules/GoalTile';
import { DisabledComponent } from '../../molecules';
import { useBreakpoint } from '../../../hooks';

export interface GoalSelectionProps {
  tiles: {
    name: string;
    iconSrc: string;
    disabled?: boolean;
  }[];
}

/**
 * Basically, if there are 5, 8, 11 etc tiles then ensure the empty tile space is in the top
 * right corner, not the bottom right corner as it would otherwise be by default. Do this by
 * allocating 2/3 of the available width to the second tile.
 */
const renderTiles = (tiles: GoalSelectionProps['tiles'], isDesktop: boolean) =>
  tiles.map((tile, i) => {
    let goalTile = <GoalTile key={tile.name} goalName={tile.name} iconSrc={tile.iconSrc} />;
    if (tile.disabled) {
      goalTile = (
        <DisabledComponent key={tile.name} title="Coming soon">
          {goalTile}
        </DisabledComponent>
      );
    }
    if (isDesktop && tiles.length % 3 === 2 && i === 1) {
      goalTile = (
        <GoalTileDoubleWidthWrapper key={tile.name}>{goalTile}</GoalTileDoubleWidthWrapper>
      );
    }
    return goalTile;
  });

const GoalSelection: FunctionComponent<GoalSelectionProps> = ({ tiles }) => {
  const { isDesktop } = useBreakpoint();

  return (
    <div>
      <Heading variant="h4" component="h2">
        What&apos;s important to you?
      </Heading>
      <Description variant="b2" color="primary" colorShade="dark2">
        Achieve your investment goals by adding them to your life plan.
      </Description>
      <GoalTilesLayout>{renderTiles(tiles, isDesktop)}</GoalTilesLayout>
    </div>
  );
};

export default GoalSelection;
