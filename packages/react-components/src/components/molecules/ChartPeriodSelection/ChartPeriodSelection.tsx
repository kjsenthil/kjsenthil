import * as React from 'react';
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
          data-testid="chart period selection"
          key={String(period)}
          onClick={() => {
            setCurrentPeriod(period);
          }}
          selected={period === currentPeriod}
          wrap="nowrap"
          size="small"
          variant={period === currentPeriod ? 'contained' : undefined}
        >
          {periodTextDisplay(period)}
        </StyledPeriodSelectionButton>
      ))}
    </Container>
  );
}
