import * as React from 'react';
import { formatCurrency, CurrencyPresentationVariant } from '../../../../utils/formatters';
import { Legend } from '../../../molecules';
import {
  LegendsContainer,
  SummaryPanelContainer,
} from './PerformanceProjectionsChartSummaryPanel.styles';
import LikelyRangeToggle from './LikelyRangeToggle';

export interface PerformanceProjectionsChartSummaryPanelProps {
  performance: number;
  performanceLowEnd?: number;
  performanceHighEnd?: number;
  contributions?: number;

  // Only available if the goal is not met
  performanceTargetNotMet: number | undefined;

  // Used by the Likely Range toggle
  showLikelyRange: boolean;
  toggleLikelyRange?: () => void;

  showLikelyRangeLegend: boolean;
}

const currencyFormatter = (val: number) => formatCurrency(val, CurrencyPresentationVariant.CHART);

export default function PerformanceProjectionsChartSummaryPanel({
  performance,
  performanceLowEnd,
  performanceHighEnd,
  contributions,
  performanceTargetNotMet,
  showLikelyRange,
  toggleLikelyRange,
  showLikelyRangeLegend,
}: PerformanceProjectionsChartSummaryPanelProps) {
  return (
    <SummaryPanelContainer>
      <LegendsContainer>
        <Legend
          title="Projected value"
          value={performance}
          valueFormatter={currencyFormatter}
          chartIndicatorProps={{ variant: 'solid', color: 'tertiary' }}
        />

        {showLikelyRangeLegend &&
          performanceLowEnd !== undefined &&
          performanceHighEnd !== undefined && (
            <Legend
              title="Likely range"
              value={[performanceLowEnd, performanceHighEnd]}
              valueFormatter={currencyFormatter}
              chartIndicatorProps={{ variant: 'rectangle', color: 'tertiary' }}
              tooltip="The future is uncertain, so ‘likely range’ shows a spectrum of possible outcomes for how much money you could have over time. There’s a 10% chance you could end up with less but there’s also a 10% chance you could end up with more."
            />
          )}

        {performanceTargetNotMet !== undefined && (
          <Legend
            title="Target value"
            value={performanceTargetNotMet}
            valueFormatter={currencyFormatter}
            chartIndicatorProps={{ variant: 'dashed-3', color: 'gold' }}
          />
        )}

        {contributions !== undefined && (
          <Legend
            title="Contributions"
            value={contributions}
            valueFormatter={currencyFormatter}
            chartIndicatorProps={{ variant: 'dashed-4', color: 'secondary' }}
            tooltip="Contributions minus withdrawals"
          />
        )}
      </LegendsContainer>
      {toggleLikelyRange && (
        <LikelyRangeToggle
          showLikelyRange={showLikelyRange}
          toggleLikelyRange={toggleLikelyRange}
        />
      )}
    </SummaryPanelContainer>
  );
}
