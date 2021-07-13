import * as React from 'react';
import { Box, Typography, useTheme } from '../../atoms';
import { ProgressBarWithLegend, ProgressBarWithLegendProps } from '../../molecules';
import { formatCurrency } from '../../../utils/formatters';
import { GoalPotTrackerContainer } from './GoalPotTracker.styles';

export interface GoalPotTrackerProps {
  title: string;
  potTotal: number | undefined;

  progressBarProps: Omit<ProgressBarWithLegendProps, 'progressBarBackgrounds'>;
}

export default function GoalPotTracker({ title, potTotal, progressBarProps }: GoalPotTrackerProps) {
  const theme = useTheme();

  // When the pot total is undefined, there will be no text after the title
  const formattedRetirementTotal =
    potTotal !== undefined
      ? formatCurrency(potTotal, {
          opts: {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          },
        })
      : '';

  let progressBarBackgrounds: string[] | undefined;
  if (progressBarProps.progressBarData.length === 1) {
    progressBarBackgrounds = [];
    if (progressBarProps.progressBarData[0].legendProps.value === undefined) {
      // This happens when there is no income input yet
      progressBarBackgrounds.push(`${theme.palette.tertiary.light2}`);
    } else {
      // This happens when there is only income input
      progressBarBackgrounds.push(theme.palette.tertiary.main);
    }
  }

  return (
    <GoalPotTrackerContainer>
      <Box>
        <Typography component="span" variant="sh1" color="primary" colorShade="dark2">
          {title}
          {formattedRetirementTotal ? ': ' : ''}
        </Typography>
        <Typography component="span" variant="sh1" color="tertiary">{`${
          formattedRetirementTotal ? `${formattedRetirementTotal}` : ''
        }`}</Typography>
      </Box>

      <Box>
        <ProgressBarWithLegend
          progressBarBackgrounds={progressBarBackgrounds}
          {...progressBarProps}
        />
      </Box>
    </GoalPotTrackerContainer>
  );
}
