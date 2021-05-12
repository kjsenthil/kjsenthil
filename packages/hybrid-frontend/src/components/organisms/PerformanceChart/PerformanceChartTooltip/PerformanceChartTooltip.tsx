import * as React from 'react';
import styled from 'styled-components';
import { Typography, Theme } from '../../../atoms';
import { formatDate } from '../../../../utils/formatters';

export interface PerformanceChartTooltipProps {
  date: Date | null | undefined;
}

const TooltipContainer = styled.div`
  ${({ theme }: { theme: Theme }) => `
    position: relative;
    display: inline-flex;

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

export default function PerformanceChartTooltip({ date }: PerformanceChartTooltipProps) {
  const dateStr = date ? formatDate(date) : '';

  return (
    <TooltipContainer>
      <Typography variant="sh4" color="primary" colorShade="dark2">
        {dateStr.toUpperCase()}
      </Typography>
    </TooltipContainer>
  );
}
