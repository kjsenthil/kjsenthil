import * as React from 'react';
import { Legend, LegendProps } from '../../../molecules';
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

const legendProps: Record<string, Pick<LegendProps, 'title' | 'tooltip'>> = {
  totalValue: {
    title: 'TOTAL VALUE',
    tooltip: 'The total value of your investments and cash.',
  },
  netContributed: {
    title: 'NET CONTRIBUTED',
    tooltip: 'Your total contributions minus any withdrawals you may have made.',
  },
  lifetimeReturn: {
    title: 'LIFETIME RETURN',
    tooltip:
      'This shows how well your investments have performed since you first held them on Bestinvest. It includes both growth and income returns.',
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
