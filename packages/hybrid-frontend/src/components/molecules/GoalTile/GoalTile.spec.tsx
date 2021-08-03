import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import GoalTile, { GoalTileProps } from './GoalTile';

describe('GoalTile', () => {
  const testGoal: GoalTileProps = {
    goalName: 'Buy a Ferrari',
    iconSrc: 'goal-graphic.png',
  };

  it('should render the goal name and icon, with default alt text', () => {
    renderWithTheme(<GoalTile {...testGoal} />);

    expect(screen.getByText(testGoal.goalName)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('alt', `${testGoal.goalName} goal icon`);
  });

  it('should use the provided alt text', () => {
    const alt = 'my goal icon alt text';
    renderWithTheme(<GoalTile {...testGoal} iconAlt={alt} />);

    expect(screen.getByRole('img')).toHaveAttribute('alt', alt);
  });
});
