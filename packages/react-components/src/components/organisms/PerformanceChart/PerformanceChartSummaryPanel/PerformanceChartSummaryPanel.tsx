import * as React from 'react';
import { Legend, LegendProps } from '../../../molecules';
import { Container } from './PerformanceChartSummaryPanel.styles';
import {
  formatCurrency,
  formatPercent,
  CurrencyPresentationVariant,
  PercentPresentationVariant,
} from '../../../../utils/formatters';
import { StaticTooltips } from '../../../../constants/tooltips';

export interface PerformanceChartSummaryPanelProps {
  totalPerformance: number;
  totalNetContributions: number;

  totalReturn: number;
  totalReturnPercentage: number;
}

const legendProps: Record<string, Pick<LegendProps, 'title' | 'tooltip'>> = {
  totalValue: {
    title: 'TOTAL VALUE',
    tooltip: StaticTooltips.totalValue,
  },
  netContributed: {
    title: 'NET CONTRIBUTION',
    tooltip: StaticTooltips.netContribution,
  },
  lifetimeReturn: {
    title: 'LIFETIME RETURN',
    tooltip: StaticTooltips.lifetimeReturn,
  },
};

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
        {...legendProps.totalValue}
        value={totalPerformance}
        valueFormatter={currencyFormatter}
        chartIndicatorProps={{ variant: 'solid' }}
      />

      <Legend
        {...legendProps.netContributed}
        value={totalNetContributions}
        valueFormatter={currencyFormatter}
        chartIndicatorProps={{ variant: 'dashed-4', color: 'secondary' }}
      />

      <Legend
        {...legendProps.lifetimeReturn}
        value={totalReturn}
        valueFormatter={currencyFormatter}
        percentageChange={totalReturnPercentage}
        percentageFormatter={percentFormatter}
      />
    </Container>
  );
}
