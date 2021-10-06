import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import PerformanceChartTickComponentBottomAxis from './PerformanceChartTickComponentBottomAxis';
import { useChartStyles } from '../../../../hooks';

describe('PerformanceChartTickComponentBottomAxis', () => {
  // PerformanceChartTickComponent needs to receive chartStyles as a prop
  const ComponentWithChartStyles = () => {
    const chartStyles = useChartStyles();

    return (
      <PerformanceChartTickComponentBottomAxis
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
