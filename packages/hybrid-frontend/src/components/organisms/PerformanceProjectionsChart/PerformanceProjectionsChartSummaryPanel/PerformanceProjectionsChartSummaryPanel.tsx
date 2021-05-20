import * as React from 'react';
import { Legend } from '../../../molecules';
import { Container } from './PerformanceProjectionsChartSummaryPanel.styles';
import { formatCurrency } from '../../../../utils/formatters';

export interface PerformanceProjectionsChartSummaryPanelProps {
  performance: number;
  performanceLowEnd: number;
  performanceHighEnd: number;
  contributions: number;

  // Only available if the goal is not met
  performanceTargetNotMet: number | undefined;
}

const valueFormatterOptions = {
  opts: {
    // Need to set both else Jest will throw an error:
    // https://github.com/andyearnshaw/Intl.js/issues/123
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  },
};

export default function PerformanceProjectionsChartSummaryPanel({
  performance,
  performanceLowEnd,
  performanceHighEnd,
  contributions,
  performanceTargetNotMet,
}: PerformanceProjectionsChartSummaryPanelProps) {
  return (
    <Container>
      <Legend
        title="Past / Projected value"
        value={performance}
        valueFormatter={formatCurrency}
        chartIndicatorProps={{ variant: 'solid' }}
      />

      <Legend
        title="Likely range"
        value={[performanceLowEnd, performanceHighEnd]}
        valueFormatter={(val) => formatCurrency(val, valueFormatterOptions)}
        chartIndicatorProps={{ variant: 'rectangle', color: 'tertiary' }}
      />

      {performanceTargetNotMet !== undefined && (
        <Legend
          title="Target value"
          value={performanceTargetNotMet}
          valueFormatter={(val) => formatCurrency(val, valueFormatterOptions)}
          chartIndicatorProps={{ variant: 'dashed-3', color: 'gold' }}
        />
      )}

      <Legend
        title="Contributions"
        value={contributions}
        valueFormatter={formatCurrency}
        chartIndicatorProps={{ variant: 'dashed-4', color: 'secondary' }}
      />
    </Container>
  );
}
