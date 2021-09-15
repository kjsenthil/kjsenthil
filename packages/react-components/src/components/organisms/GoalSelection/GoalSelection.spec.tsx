import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import { GoalSelection } from '../index';

describe('GoalSelection', () => {
  const tiles = [1, 2, 3, 4, 5].map((i) => ({
    name: `Goal ${i}`,
    iconSrc: 'test.png',
    category: i,
  }));

  it('Should render all the goal tiles', () => {
    renderWithTheme(
      <GoalSelection
        tiles={tiles}
        goalTilesContainerBreakpointsPx={{ oneColumn: 1, twoColumns: 2 }}
      />
    );

    tiles.forEach((tile) => expect(screen.getByText(tile.name)).toBeInTheDocument());
  });
});
