import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import PerformanceProjectionsChartGoalIndicator from './PerformanceProjectionsChartGoalIndicator';

describe('PerformanceProjectionsChartGoalIndicator', () => {
  test('The goal indicator renders as expected', () => {
    renderWithTheme(
      <PerformanceProjectionsChartGoalIndicator label="Goal Indicator" icon="" progress={0.1} />
    );

    expect(screen.getByText('Goal Indicator')).toBeVisible();
  });
});
