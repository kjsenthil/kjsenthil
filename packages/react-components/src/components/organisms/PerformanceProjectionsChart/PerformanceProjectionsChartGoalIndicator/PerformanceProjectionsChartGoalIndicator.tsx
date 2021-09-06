import * as React from 'react';
import { Typography } from '../../../atoms';
import PerformanceProjectionsChartGoalIndicatorContainer from './PerformanceProjectionsChartGoalIndicatorContainer/PerformanceProjectionsChartGoalIndicatorContainer';

export interface PerformanceProjectionsChartGoalIndicatorProps {
  // Determine the position of the indicator, in px, relative to top left
  top?: number;
  left?: number;

  label: string;
}

export default function PerformanceProjectionsChartGoalIndicator({
  top,
  left,
  label,
}: PerformanceProjectionsChartGoalIndicatorProps) {
  return (
    <PerformanceProjectionsChartGoalIndicatorContainer top={top} left={left}>
      <Typography
        noWrap
        spaceNoWrap
        variant="sh4"
        color="primary"
        colorShade="dark2"
        align="center"
      >
        {label}
      </Typography>
    </PerformanceProjectionsChartGoalIndicatorContainer>
  );
}
