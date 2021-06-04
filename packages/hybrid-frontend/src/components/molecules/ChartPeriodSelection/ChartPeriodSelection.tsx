import * as React from 'react';
import { Typography } from '../../atoms';
import { Container, StyledPeriodSelectionButton } from './ChartPeriodSelection.styles';

type PerformanceDataPeriod = Record<string, string>;

export interface ChartPeriodSelectionProps {
  currentPeriod: string;
  setCurrentPeriod: (newPeriod: string) => void;
  periodTextDisplay?: (period: string) => string;
  performanceDataPeriod: PerformanceDataPeriod;
}

export default function ChartPeriodSelection({
  currentPeriod,
  setCurrentPeriod,
  periodTextDisplay = (period) => period,
  performanceDataPeriod,
}: ChartPeriodSelectionProps) {
  return (
    <Container>
      {Object.values(performanceDataPeriod).map((period) => (
        <StyledPeriodSelectionButton
          key={period}
          onClick={() => {
            setCurrentPeriod(period);
          }}
          selected={period === currentPeriod}
          color="default"
        >
          <Typography variant="sh3" color="primary">
            {periodTextDisplay(period)}
          </Typography>
        </StyledPeriodSelectionButton>
      ))}
    </Container>
  );
}
