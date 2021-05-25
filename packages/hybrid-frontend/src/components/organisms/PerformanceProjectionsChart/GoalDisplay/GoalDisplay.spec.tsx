import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import GoalDisplay from './GoalDisplay';

describe('GoalDisplay', () => {
  test('The component renders correctly when remaining years are plural', () => {
    renderWithTheme(<GoalDisplay iconSrc="" label="Retire" remainingYears={50} progress={0.5} />);

    expect(screen.getByAltText('goal image')).toBeVisible();
    expect(screen.getByText('Retire')).toBeVisible();
    expect(screen.getByText('IN 50 YEARS')).toBeVisible();
  });

  test('The component renders correctly when remaining year is 1', () => {
    renderWithTheme(
      <GoalDisplay
        iconSrc=""
        iconAlt="some image"
        label="Retire"
        remainingYears={1}
        progress={0.5}
      />
    );

    expect(screen.getByAltText('some image')).toBeVisible();
    expect(screen.getByText('Retire')).toBeVisible();
    expect(screen.getByText('IN 1 YEAR')).toBeVisible();
  });
});
