import * as React from 'react';
import { Typography } from '../../../atoms';
import { Container, StyledPeriodSelectionButton } from './PerformanceChartPeriodSelection.styles';
import { PerformanceDataPeriod } from '../../../../services/performance/constants';

export const periodButtonLabel: Record<PerformanceDataPeriod, string> = {
  [PerformanceDataPeriod['1M']]: '1m',
  [PerformanceDataPeriod['3M']]: '3m',
  [PerformanceDataPeriod['6M']]: '6m',
  [PerformanceDataPeriod['1Y']]: '1y',
  [PerformanceDataPeriod.ALL_TIME]: 'All Time',
};

export interface PerformanceChartPeriodSelectionProps {
  currentPeriod: PerformanceDataPeriod;
  setCurrentPeriod: (newPeriod: PerformanceDataPeriod) => void;
}

export default function PerformanceChartPeriodSelection({
  currentPeriod,
  setCurrentPeriod,
}: PerformanceChartPeriodSelectionProps) {
  return (
    <Container>
      {Object.values(PerformanceDataPeriod).map((period) => (
        <StyledPeriodSelectionButton
          key={period}
          onClick={() => setCurrentPeriod(period)}
          selected={period === currentPeriod}
        >
          <Typography variant="sh3" color="primary">
            {periodButtonLabel[period]}
          </Typography>
        </StyledPeriodSelectionButton>
      ))}
    </Container>
  );
}
