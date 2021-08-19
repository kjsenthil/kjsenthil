import * as React from 'react';
import { GoalSelection as GoalSelectionOrganism } from '@tsw/react-components';
import { goalSelectionAllTiles, LifePlanLayoutView } from '../config/config';

export interface GoalSelectionProps {
  currentView: LifePlanLayoutView;
}

export default function GoalSelection({ currentView }: GoalSelectionProps) {
  const tiles = goalSelectionAllTiles.filter(({ name }) => name !== currentView);

  return <GoalSelectionOrganism tiles={tiles} />;
}
