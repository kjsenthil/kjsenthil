import * as React from 'react';
import { Typography, ProgressBar } from '../../../atoms';
import { Container } from './PerformanceProjectionsChartGoalIndicator.styles';
import GoalImage from './GoalImage';

export interface PerformanceProjectionsChartGoalIndicatorProps {
  // Determine the position of the indicator, in px, relative to top left
  top?: number | undefined;
  left?: number | undefined;

  label: string;
  icon: string;
  progress: number;
}

export default function PerformanceProjectionsChartGoalIndicator({
  top,
  left,
  label,
  icon,
  progress,
}: PerformanceProjectionsChartGoalIndicatorProps) {
  return (
    <Container top={top} left={left}>
      <Typography variant="sh4" color="grey" align="center">
        {label}
      </Typography>

      <ProgressBar progress={progress} />
      <GoalImage imageSrc={icon} />
    </Container>
  );
}
