import * as React from 'react';
import { Box, Typography } from '../../../atoms';
import { formatCurrency, formatDate } from '../performanceChartFormat/performanceChartFormat';
import {
  DetailsContainer,
  TooltipCard,
  TooltipCardContent,
  TooltipContainer,
  TooltipTriangle,
} from './PerformanceChartTooltip.styles';

export interface PerformanceChartTooltipProps {
  date: Date;
  performance: number;
  contribution: number;
}

export default function PerformanceChartTooltip({
  date,
  performance,
  contribution,
}: PerformanceChartTooltipProps) {
  return (
    <TooltipContainer>
      <TooltipCard variant="outlined" elevation={0}>
        <TooltipCardContent>
          {/* Date */}

          <Typography variant="sh4" color="primary">
            {formatDate(date)}
          </Typography>

          {/* Details */}

          <DetailsContainer>
            {/* Column #1 */}

            <Box display="flex" flexDirection="column">
              <Typography variant="sh4" color="primary">
                • Total:
              </Typography>
              <div>
                <Typography variant="sh4" color="primary" colorShade="light2" display="inline">
                  •{' '}
                </Typography>
                <Typography variant="sh4" display="inline">
                  Contributed:
                </Typography>
              </div>
            </Box>

            {/* Column #2 */}

            <Box display="flex" flexDirection="column">
              <Typography variant="sh4" color="primary" align="right">
                {formatCurrency(performance)}
              </Typography>
              <Typography color="grey" variant="sh4" align="right">
                {formatCurrency(contribution)}
              </Typography>
            </Box>
          </DetailsContainer>
        </TooltipCardContent>
      </TooltipCard>

      <TooltipTriangle />
    </TooltipContainer>
  );
}
