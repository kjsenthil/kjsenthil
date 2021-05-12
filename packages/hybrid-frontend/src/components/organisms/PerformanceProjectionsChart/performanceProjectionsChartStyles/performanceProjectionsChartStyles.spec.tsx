import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import { usePerformanceProjectionsChartStyles } from './performanceProjectionsChartStyles';

describe('usePerformanceProjectionsChartStyles', () => {
  const TestComponent = () => {
    usePerformanceProjectionsChartStyles();

    return <div>Test component</div>;
  };

  test('The hook returns without error and the test component renders without error', () => {
    renderWithTheme(<TestComponent />);

    expect(screen.getByText('Test component')).toBeVisible();
  });
});
