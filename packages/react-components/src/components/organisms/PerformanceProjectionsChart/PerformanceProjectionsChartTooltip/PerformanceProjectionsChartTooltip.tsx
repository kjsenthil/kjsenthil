import * as React from 'react';
import styled from 'styled-components';
import { Theme, Typography } from '../../../atoms';

export interface PerformanceChartTooltipProps {
  date: Date;
  todayAge: number | undefined;
}

const TooltipContainer = styled.div`
  ${({ theme }: { theme: Theme }) => `
    position: relative;
    
    display: inline-flex;
    flex-direction: column;

    padding: ${theme.spacing(0.75)}px ${theme.spacing(1.25)}px;
    border-radius: 4px;
    background-color: ${theme.palette.grey['100']};

    /* This only makes sense in the context of the performance chart. It 
       re-centers the tooltip on the mouse's position */
    transform: translate(-50%, 0);
    
    text-align: center;
    white-space: nowrap;
  `}
`;

export default function PerformanceProjectionsChartTooltip({
  date,
  todayAge,
}: PerformanceChartTooltipProps) {
  const todayYear = new Date().getFullYear();
  const tooltipYear = date.getFullYear();

  const yearStr = todayYear === tooltipYear ? 'TODAY' : tooltipYear;

  const ageStr =
    todayAge !== undefined ? `Age ${todayAge + tooltipYear - todayYear}` : 'Age unknown';

  return (
    <TooltipContainer>
      <Typography variant="sh4" color="primary" colorShade="dark2">
        {yearStr}
      </Typography>
      <Typography variant="sh4" color="primary" colorShade="dark2">
        {ageStr}
      </Typography>
    </TooltipContainer>
  );
}
