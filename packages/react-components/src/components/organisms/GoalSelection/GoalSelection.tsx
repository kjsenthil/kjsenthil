import * as React from 'react';
import { Description, Heading } from './GoalSelection.styles';
import GoalTilesContainer, {
  GoalTilesContainerProps,
} from './GoalTilesContainer/GoalTilesContainer';
import { GoalSelectionTile } from './types';

export interface GoalSelectionProps {
  tiles: GoalSelectionTile[];

  goalTilesContainerBreakpointsPx?: GoalTilesContainerProps['breakpointsPx'];
}

export default function GoalSelection({
  tiles,
  goalTilesContainerBreakpointsPx,
}: GoalSelectionProps) {
  return (
    <div>
      <Heading variant="h4" component="h2">
        What&apos;s important to you?
      </Heading>
      <Description variant="b2" color="primary" colorShade="dark2">
        Achieve your investment goals by adding them to your life plan.
      </Description>
      <GoalTilesContainer tiles={tiles} breakpointsPx={goalTilesContainerBreakpointsPx} />
    </div>
  );
}
