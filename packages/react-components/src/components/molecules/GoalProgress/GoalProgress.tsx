import * as React from 'react';
import {
  GoalProgressContainer,
  GoalIcon,
  GoalIconContainer,
  LabelContainer,
} from './GoalProgress.styles';
import { ProgressBar, Spacer, Typography } from '../../atoms';

export interface GoalProgressProps {
  iconSrc: string;
  iconAlt?: string;

  label: string;
  remainingYears: number;
  progress: number;
}

const GoalProgress = ({
  iconSrc,
  iconAlt = 'goal image',
  label,
  remainingYears,
  progress,
}: GoalProgressProps) => {
  const yearText = remainingYears > 1 ? 'YEARS' : 'YEAR';

  return (
    <GoalProgressContainer>
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
    </GoalProgressContainer>
  );
};

export default GoalProgress;
