import * as React from 'react';
import { Legend } from '../../../molecules';
import { Container } from './PerformanceChartSummaryPanel.styles';
import { formatCurrency, formatPercent } from '../../../../utils/formatters';

export interface PerformanceChartSummaryPanelProps {
  totalPerformance: number;
  totalContributions: number;

  totalReturn: number;
  totalReturnPct: number;
}

export default function PerformanceChartSummaryPanel({
  totalPerformance,
  totalContributions,
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
        title="Total Contributed"
        value={totalContributions}
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
