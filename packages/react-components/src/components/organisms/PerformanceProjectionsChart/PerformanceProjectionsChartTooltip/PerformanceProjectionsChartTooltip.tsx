import * as React from 'react';
import { Typography } from '../../../atoms';
import { TooltipContainer } from './PerformanceProjectionsChartTooltip.styles';
import getPerformanceProjectionsChartTooltipText from './getPerformanceProjectionsChartTooltipText';

export interface PerformanceChartTooltipProps {
  date: Date;
  todayAge: number | undefined;
}

export default function PerformanceProjectionsChartTooltip({
  date,
  todayAge,
}: PerformanceChartTooltipProps) {
  const tooltipText = getPerformanceProjectionsChartTooltipText({
    tooltipDate: date,
    todayAge,
  });

  return (
    <TooltipContainer>
      <Typography variant="sh5" color="primary" colorShade="dark2">
        {tooltipText}
      </Typography>
    </TooltipContainer>
  );
}
