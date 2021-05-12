import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import PerformanceProjectionsChartTickComponentLeftAxis from './PerformanceProjectionsChartTickComponentLeftAxis';
import { usePerformanceProjectionsChartStyles } from '../performanceProjectionsChartStyles/performanceProjectionsChartStyles';

describe('PerformanceProjectionsChartTickComponentLeftAxis', () => {
  // The TickComponent needs to receive chartStyles as a prop
  const ComponentWithChartStyles = () => {
    const chartStyles = usePerformanceProjectionsChartStyles();

    return (
      <PerformanceProjectionsChartTickComponentLeftAxis
        chartStyles={chartStyles}
        x={0}
        y={0}
        formattedValue="1000"
      />
    );
  };

  test('The tick component renders correctly', () => {
    renderWithTheme(
      <svg>
        <ComponentWithChartStyles />
      </svg>
    );

    expect(screen.getByText('1000')).toBeVisible();
  });
});
