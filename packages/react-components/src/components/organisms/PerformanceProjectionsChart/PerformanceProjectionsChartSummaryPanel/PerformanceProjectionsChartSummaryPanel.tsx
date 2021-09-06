import * as React from 'react';
import { formatCurrency, CurrencyPresentationVariant } from '../../../../utils/formatters';
import { Legend } from '../../../molecules';
import {
  LegendsContainer,
  SummaryPanelContainer,
} from './PerformanceProjectionsChartSummaryPanel.styles';
import LikelyRangeToggle from './LikelyRangeToggle';
import { useBreakpoint } from '../../../../hooks';

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

  // If true, will not display numbers next to the legends
  noHover?: boolean;
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
  noHover,
}: PerformanceProjectionsChartSummaryPanelProps) {
  const { isMobile } = useBreakpoint();

  return (
    <SummaryPanelContainer isMobile={isMobile}>
      <LegendsContainer isMobile={isMobile}>
        <Legend
          title="Projected value"
          value={noHover ? undefined : performance}
          valueFormatter={currencyFormatter}
          chartIndicatorProps={{ variant: 'solid', color: 'tertiary' }}
        />

        {contributions !== undefined && (
          <Legend
            title="Net contribution"
            value={noHover ? undefined : contributions}
            valueFormatter={currencyFormatter}
            chartIndicatorProps={{
              variant: isMobile ? 'dashed-2' : 'dashed-4',
              color: 'secondary',
            }}
            tooltip="Contributions minus withdrawals"
          />
        )}

        {performanceTargetNotMet !== undefined && (
          <Legend
            title="Target value"
            value={noHover ? undefined : performanceTargetNotMet}
            valueFormatter={currencyFormatter}
            chartIndicatorProps={{ variant: isMobile ? 'dashed-2' : 'dashed-3', color: 'gold' }}
          />
        )}

        {showLikelyRangeLegend &&
          performanceLowEnd !== undefined &&
          performanceHighEnd !== undefined && (
            <Legend
              title="Likely range"
              value={noHover ? undefined : [performanceLowEnd, performanceHighEnd]}
              valueFormatter={currencyFormatter}
              chartIndicatorProps={{ variant: 'solid', color: 'tertiary', colorShade: 'light2' }}
              tooltip="The future is uncertain, so ‘likely range’ shows a spectrum of possible outcomes for how much money you could have over time. There’s a 10% chance you could end up with less but there’s also a 10% chance you could end up with more."
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
