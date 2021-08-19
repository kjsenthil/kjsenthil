import * as React from 'react';
import { Legend } from '../../../molecules';
import { Container } from './PerformanceChartSummaryPanel.styles';
import {
  formatCurrency,
  formatPercent,
  CurrencyPresentationVariant,
  PercentPresentationVariant,
} from '../../../../utils/formatters';

export interface PerformanceChartSummaryPanelProps {
  totalPerformance: number;
  totalNetContributions: number;

  totalReturn: number;
  totalReturnPercentage: number;
}

const currencyFormatter = (val: number) => formatCurrency(val, CurrencyPresentationVariant.CHART);
const percentFormatter = (val: number) => formatPercent(val, PercentPresentationVariant.CHART);

export default function PerformanceChartSummaryPanel({
  totalPerformance,
  totalNetContributions,
  totalReturn,
  totalReturnPercentage,
}: PerformanceChartSummaryPanelProps) {
  return (
    <Container>
      <Legend
        title="Total value"
        value={totalPerformance}
        valueFormatter={currencyFormatter}
        chartIndicatorProps={{ variant: 'solid' }}
      />

      <Legend
        title="Net Contributed"
        value={totalNetContributions}
        valueFormatter={currencyFormatter}
        chartIndicatorProps={{ variant: 'dashed-4', color: 'secondary' }}
      />

      <Legend
        title="Total return"
        value={totalReturn}
        valueFormatter={currencyFormatter}
        percentageChange={totalReturnPercentage}
        percentageFormatter={percentFormatter}
      />
    </Container>
  );
}
