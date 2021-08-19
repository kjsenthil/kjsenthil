import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import PerformanceProjectionsChartTooltip from './PerformanceProjectionsChartTooltip';

describe('PerformanceProjectionsChartTooltip', () => {
  const dateYearsAndAges = [
    [new Date().getFullYear(), 30],
    [2020, 30],
    [2020, undefined],
  ];

  test.each(dateYearsAndAges)(
    "The tooltip renders correctly when year is %i and today's age is %i",
    (dateYear, todayAge) => {
      const today = new Date();
      const date = new Date(dateYear as number, 0, 1);

      const dateStr = today.getFullYear() === dateYear ? 'TODAY' : `${dateYear}`;

      const dateAge =
        todayAge === undefined ? 'unknown' : todayAge + (date.getFullYear() - today.getFullYear());

      renderWithTheme(<PerformanceProjectionsChartTooltip date={date} todayAge={todayAge} />);

      expect(screen.getByText(dateStr)).toBeVisible();
      expect(screen.getByText(`Age ${dateAge}`)).toBeVisible();
    }
  );
});
