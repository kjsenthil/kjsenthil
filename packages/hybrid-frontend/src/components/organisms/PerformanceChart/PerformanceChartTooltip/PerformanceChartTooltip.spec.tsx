import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import PerformanceChartTooltip from './PerformanceChartTooltip';

describe('PerformanceChartTooltip', () => {
  const date = new Date(2020, 0, 1);
  const performance = 1000.123;
  const contribution = 2500.456;

  test('The tooltip renders', () => {
    renderWithTheme(
      <PerformanceChartTooltip date={date} performance={performance} contribution={contribution} />
    );

    expect(screen.getByText('January 2020', { exact: false })).toBeVisible();
    expect(screen.getByText('£1,000.12')).toBeVisible();
    expect(screen.getByText('£2,500.46')).toBeVisible();
  });
});
