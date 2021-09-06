import * as React from 'react';
import MockDate from 'mockdate';
import { renderWithTheme, screen } from '@tsw/test-util';
import PerformanceProjectionsChartTooltip from './PerformanceProjectionsChartTooltip';

describe('PerformanceProjectionsChartTooltip', () => {
  MockDate.set('2020-01-01');

  it('renders without errors', () => {
    const tooltipDate = new Date('2021-01-01');
    const todayAge = 30;

    renderWithTheme(<PerformanceProjectionsChartTooltip date={tooltipDate} todayAge={todayAge} />);

    expect(screen.getByText('AGE 31')).toBeVisible();
  });
});
