import * as React from 'react';
import { PerformanceChartPeriod } from '../data/utils';
import { changePerformanceDataPeriod, usePerformanceDataContext } from '../data/dataContext';
import { Typography } from '../../../atoms';
import { Container, StyledPeriodSelectionButton } from './PerformanceChartPeriodSelection.styles';

export const periodButtonLabel: Record<PerformanceChartPeriod, string> = {
  [PerformanceChartPeriod['1M']]: '1m',
  [PerformanceChartPeriod['3M']]: '3m',
  [PerformanceChartPeriod['6M']]: '6m',
  [PerformanceChartPeriod['1Y']]: '1y',
  [PerformanceChartPeriod.ALL_TIME]: 'All Time',
};

export default function PerformanceChartPeriodSelection() {
  const {
    state: { dataPeriod },
    dispatch,
  } = usePerformanceDataContext();

  return (
    <Container>
      {Object.values(PerformanceChartPeriod).map((period) => (
        <StyledPeriodSelectionButton
          key={period}
          onClick={() => dispatch(changePerformanceDataPeriod(period))}
          selected={period === dataPeriod}
        >
          <Typography variant="sh3" color="primary">
            {periodButtonLabel[period]}
          </Typography>
        </StyledPeriodSelectionButton>
      ))}
    </Container>
  );
}
