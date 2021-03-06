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
  legendProps?: Record<string, Pick<LegendProps, 'title' | 'tooltip'>>;

  totalPerformance: number;
  totalNetContributions: number;

  totalReturn: number;
  totalReturnPercentage: number;
}

const defaultLegendProps: Record<string, Pick<LegendProps, 'title' | 'tooltip'>> = {
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
  legendProps = defaultLegendProps,
}: PerformanceChartSummaryPanelProps) {
  return (
    <Container>
      {legendProps.totalValue !== undefined && (
        <Legend
          {...legendProps.totalValue}
          value={totalPerformance}
          valueFormatter={currencyFormatter}
          chartIndicatorProps={{ variant: 'solid' }}
        />
      )}

      {legendProps.netContributed !== undefined && (
        <Legend
          {...legendProps.netContributed}
          value={totalNetContributions}
          valueFormatter={currencyFormatter}
          chartIndicatorProps={{ variant: 'dashed-4', color: 'secondary' }}
        />
      )}

      {legendProps.lifetimeReturn !== undefined && (
        <Legend
          {...legendProps.lifetimeReturn}
          value={totalReturn}
          valueFormatter={currencyFormatter}
          percentageChange={totalReturnPercentage}
          percentageFormatter={percentFormatter}
        />
      )}
    </Container>
  );
}
