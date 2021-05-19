import * as React from 'react';
import { Divider } from '../../../atoms';
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
        chartIndicatorProps={{ variant: 'double-solid' }}
      />

      <Divider />

      <Legend
        title="Likely range"
        value={[performanceLowEnd, performanceHighEnd]}
        valueFormatter={(val) => formatCurrency(val, valueFormatterOptions)}
        chartIndicatorProps={{ variant: 'gradient', color: 'tertiary' }}
      />

      {performanceTargetNotMet !== undefined && (
        <>
          <Divider />

          <Legend
            title="Target value"
            value={performanceTargetNotMet}
            valueFormatter={(val) => formatCurrency(val, valueFormatterOptions)}
            chartIndicatorProps={{ variant: 'dotted', color: 'gold' }}
          />
        </>
      )}

      <Divider />

      <Legend
        title="Contributions"
        value={contributions}
        valueFormatter={formatCurrency}
        chartIndicatorProps={{ variant: 'dotted', color: 'grey' }}
      />
    </Container>
  );
}
