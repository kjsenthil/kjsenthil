import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import PerformanceChartTooltip from './PerformanceChartTooltip';

describe('PerformanceChartTooltip', () => {
  const testCases: [Date, string][] = [
    [new Date(2020, 0, 1), '1 Jan 2020'],
    [new Date(), 'Today'],
  ];

  test.each<[Date, string]>(testCases)(
    'The tooltip renders correctly when date is %p',
    (date, expected: string) => {
      renderWithTheme(<PerformanceChartTooltip date={date} />);

      expect(screen.getByText(expected, { exact: false })).toBeVisible();
    }
  );

  test('The tooltip renders', () => {});
});
