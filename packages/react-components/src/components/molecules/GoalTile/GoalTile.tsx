import React, { FunctionComponent } from 'react';
import { GoalIcon, GoalLabel, GoalTileContainer } from './GoalTile.styles';
import { StyleableComponent } from '../../../types';

export interface GoalTileProps extends StyleableComponent {
  goalName: string;
  iconSrc: string;
  iconAlt?: string;
}

const GoalTile: FunctionComponent<GoalTileProps> = ({
  goalName,
  iconAlt = `${goalName} goal icon`,
  iconSrc,
  className,
}) => (
  <GoalTileContainer className={className}>
    <GoalIcon src={iconSrc} alt={iconAlt} />
    <GoalLabel variant="sh1">{goalName}</GoalLabel>
  </GoalTileContainer>
);

export default GoalTile;
