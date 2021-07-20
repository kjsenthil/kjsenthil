import * as React from 'react';
import { Typography } from '../../atoms';
import { Container, StyledPeriodSelectionButton } from './ChartPeriodSelection.styles';

type PerformanceDataPeriod<T> = Record<string, T>;

export interface ChartPeriodSelectionProps<T> {
  currentPeriod: T;
  setCurrentPeriod: (newPeriod: T) => void;
  periodTextDisplay?: (period: T) => string;
  performanceDataPeriod: PerformanceDataPeriod<T>;
}

export default function ChartPeriodSelection<T = string>({
  currentPeriod,
  setCurrentPeriod,
  periodTextDisplay = (period) => String(period),
  performanceDataPeriod,
}: ChartPeriodSelectionProps<T>) {
  return (
    <Container>
      {Object.values(performanceDataPeriod).map((period) => (
        <StyledPeriodSelectionButton
          key={String(period)}
          onClick={() => {
            setCurrentPeriod(period);
          }}
          selected={period === currentPeriod}
          color="default"
        >
          <Typography
            variant="sh3"
            color={period === currentPeriod ? 'white' : 'primary'}
            colorShade="dark2"
          >
            {periodTextDisplay(period)}
          </Typography>
        </StyledPeriodSelectionButton>
      ))}
    </Container>
  );
}
