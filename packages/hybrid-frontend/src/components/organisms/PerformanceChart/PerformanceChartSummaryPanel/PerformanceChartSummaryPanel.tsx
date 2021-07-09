import * as React from 'react';
import { Legend } from '../../../molecules';
import { Container } from './PerformanceChartSummaryPanel.styles';
import { formatCurrency, formatPercent } from '../../../../utils/formatters';

export interface PerformanceChartSummaryPanelProps {
  totalPerformance: number;
  totalNetContributions: number;

  totalReturn: number;
  totalReturnPct: number;
}

export default function PerformanceChartSummaryPanel({
  totalPerformance,
  totalNetContributions,
  totalReturn,
  totalReturnPct,
}: PerformanceChartSummaryPanelProps) {
  return (
    <Container>
      <Legend
        title="Total value"
        value={totalPerformance}
        valueFormatter={formatCurrency}
        chartIndicatorProps={{ variant: 'solid' }}
      />

      <Legend
        title="Net Contributed"
        value={totalNetContributions}
        valueFormatter={formatCurrency}
        chartIndicatorProps={{ variant: 'dashed-4', color: 'secondary' }}
      />

      <Legend
        title="Total return"
        value={totalReturn}
        valueFormatter={formatCurrency}
        percentageChange={totalReturnPct}
        percentageFormatter={formatPercent}
      />
    </Container>
  );
}
