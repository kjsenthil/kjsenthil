import * as React from 'react';
import { Legend } from '../../../molecules';
import {
  LegendsContainer,
  SummaryPanelContainer,
} from './PerformanceProjectionsChartSummaryPanel.styles';
import { formatCurrency } from '../../../../utils/formatters';
import LikelyRangeToggle from './LikelyRangeToggle';

export interface PerformanceProjectionsChartSummaryPanelProps {
  performance: number;
  performanceLowEnd: number;
  performanceHighEnd: number;
  contributions: number;

  // Only available if the goal is not met
  performanceTargetNotMet: number | undefined;

  // Used by the Likely Range toggle
  showLikelyRange: boolean;
  toggleLikelyRange: () => void;
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
  showLikelyRange,
  toggleLikelyRange,
}: PerformanceProjectionsChartSummaryPanelProps) {
  return (
    <SummaryPanelContainer>
      <LegendsContainer>
        <Legend
          title="Projected value"
          value={performance}
          valueFormatter={formatCurrency}
          chartIndicatorProps={{ variant: 'solid', color: 'tertiary' }}
        />

        <Legend
          title="Likely range"
          value={[performanceLowEnd, performanceHighEnd]}
          valueFormatter={(val) => formatCurrency(val, valueFormatterOptions)}
          chartIndicatorProps={{ variant: 'rectangle', color: 'tertiary' }}
          tooltip="The future is uncertain, so ‘likely range’ shows a spectrum of possible outcomes for how much money you could have over time. There’s a 10% chance you could end up with less but there’s also a 10% chance you could end up with more."
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
          tooltip="Contributions minus withdrawals"
        />
      </LegendsContainer>

      <LikelyRangeToggle showLikelyRange={showLikelyRange} toggleLikelyRange={toggleLikelyRange} />
    </SummaryPanelContainer>
  );
}
