import * as React from 'react';
import {
  GoalDisplayContainer,
  GoalIcon,
  GoalIconContainer,
  LabelContainer,
} from './GoalDisplay.styles';
import { ProgressBar, Spacer, Typography } from '../../../atoms';

export interface GoalDisplayProps {
  iconSrc: string;
  iconAlt?: string;

  label: string;
  remainingYears: number;
  progress: number;
}

export default function GoalDisplay({
  iconSrc,
  iconAlt = 'goal image',
  label,
  remainingYears,
  progress,
}: GoalDisplayProps) {
  const yearText = remainingYears > 1 ? 'YEARS' : 'YEAR';

  return (
    <GoalDisplayContainer>
      <GoalIconContainer>
        <GoalIcon src={iconSrc} alt={iconAlt} />
      </GoalIconContainer>

      <LabelContainer>
        <Typography variant="b2" color="primary" colorShade="dark2">
          {label}
        </Typography>

        <Spacer x={3} />

        <Typography variant="b3" color="grey">{`IN ${remainingYears} ${yearText}`}</Typography>
      </LabelContainer>

      <ProgressBar progress={progress} />
    </GoalDisplayContainer>
  );
}
