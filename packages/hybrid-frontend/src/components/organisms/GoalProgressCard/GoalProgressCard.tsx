import * as React from 'react';
import { formatCurrency } from '../../../utils/formatters';
import { ProgressBar, Spacer, Tooltip, Typography } from '../../atoms';
import {
  GoalProgressStyledCard,
  DetailsContainer,
  GoalIcon,
  CardBody,
  IconContainer,
  CardFooter,
  GoalValues,
  InfoIcon,
  StyledIconButton,
} from './GoalProgressCard.styles';

export interface GoalProgressCardProps {
  accountTypes: string[];
  currentValue: number;
  goalValue: number;
  iconSrc: string;
  iconAlt?: string;
  title: string;
  tooltipText: string;
  underperformValue: number;
}

const GoalProgressCard = ({
  accountTypes,
  currentValue,
  underperformValue,
  goalValue,
  iconSrc,
  iconAlt = 'goal image',
  title,
  tooltipText,
}: GoalProgressCardProps) => {
  const numberFormatOptions = { opts: { minimumFractionDigits: 0 } };
  const formattedCurrentValue = formatCurrency(currentValue, numberFormatOptions);
  const formattedUnderperformValue = formatCurrency(underperformValue, numberFormatOptions);
  const formattedGoalValue = formatCurrency(goalValue, numberFormatOptions);
  const onTrackPercentage = Math.round((currentValue / goalValue) * 100);

  return (
    <GoalProgressStyledCard>
      <CardBody>
        <IconContainer>
          <GoalIcon src={iconSrc} alt={iconAlt} />
        </IconContainer>

        <DetailsContainer>
          <Typography variant="h5">{title}</Typography>

          <Spacer y={0.5} />

          <Typography color="primary" colorShade="dark2">
            {"You're on track to have "}
            <b>{onTrackPercentage}%</b>
            {' of your target.'}
          </Typography>
          <Typography color="primary" colorShade="dark2" display="inline">
            {"That's "}
            <b>{formattedCurrentValue}</b>
            {' to spend each month, or '}
            <b>{formattedUnderperformValue}</b>
            {' if markets underperform.'}
          </Typography>
          <Tooltip title={tooltipText}>
            <StyledIconButton aria-label="Goal Progress Info" size="small">
              <InfoIcon name="infoCircleIcon" />
            </StyledIconButton>
          </Tooltip>
        </DetailsContainer>
      </CardBody>

      <CardFooter>
        <GoalValues>
          <Typography color="primary" colorShade="dark2" variant="h3">
            {formattedCurrentValue}
          </Typography>
          <Typography color="grey" colorShade="dark1" variant="b2">
            / {formattedGoalValue}
          </Typography>
        </GoalValues>
        <Typography color="secondary" variant="sh4">
          {accountTypes.join(' + ')}
        </Typography>
      </CardFooter>

      <Spacer y={0.75} />

      <ProgressBar progress={onTrackPercentage / 100} />
    </GoalProgressStyledCard>
  );
};

export default GoalProgressCard;
