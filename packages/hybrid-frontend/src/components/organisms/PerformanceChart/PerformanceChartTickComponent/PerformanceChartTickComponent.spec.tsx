import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import PerformanceChartTickComponent from './PerformanceChartTickComponent';
import useChartStyles from '../../../../hooks/ChartHooks/useChartStyles';

describe('PerformanceChartTickComponent', () => {
  // PerformanceChartTickComponent needs to receive chartStyles as a prop
  const ComponentWithChartStyles = () => {
    const chartStyles = useChartStyles();

    return (
      <PerformanceChartTickComponent chartStyles={chartStyles} x={0} y={0} formattedValue="1000" />
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
