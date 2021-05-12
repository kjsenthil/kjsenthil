import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import PerformanceChartTooltip from './PerformanceChartTooltip';

describe('PerformanceChartTooltip', () => {
  const locale = 'en-GB';

  const date1 = new Date(2020, 0, 1);
  const date2 = new Date();

  const testCases: [Date, string][] = [
    [
      date1,
      date1.toLocaleString(locale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    ],
    [date2, 'Today'],
  ];

  test.each<[Date, string]>(testCases)(
    'The tooltip renders correctly when date is %p',
    (date, expected: string) => {
      renderWithTheme(<PerformanceChartTooltip date={date} />);

      expect(screen.getByText(expected, { exact: false })).toBeVisible();
    }
  );
});
