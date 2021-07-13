import * as React from 'react';
import { formatCurrency, formatPercent } from '../../../utils/formatters';
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
  onTrackPercentage: number;
  accountValues: Array<{
    label: string;
    value: number;
  }>;
  goalValue: number;
  shortfallValue: number;
  shortfallUnderperformValue: number;
  title: string;
  iconSrc: string;
  iconAlt?: string;
  tooltipText: string;
}

const GoalProgressCard = ({
  onTrackPercentage,
  accountValues,
  goalValue,
  shortfallValue,
  shortfallUnderperformValue,
  iconSrc,
  iconAlt = 'goal image',
  title,
  tooltipText,
}: GoalProgressCardProps) => {
  const totalAccountValue = accountValues.reduce((total, { value }) => total + value, 0);

  const numberFormatOptions = { opts: { minimumFractionDigits: 0 } };

  const formattedOnTrackPercentage = formatPercent(onTrackPercentage, numberFormatOptions);
  const formattedTotalAccountValue = formatCurrency(totalAccountValue, numberFormatOptions);
  const formattedGoalValue = formatCurrency(goalValue, numberFormatOptions);
  const formattedShortfallValue = formatCurrency(shortfallValue, numberFormatOptions);
  const formattedShortfallUnderperformValue = formatCurrency(
    shortfallUnderperformValue,
    numberFormatOptions
  );

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
            <b>{formattedOnTrackPercentage}</b>
            {' of your target.'}
          </Typography>
          <Typography color="primary" colorShade="dark2" display="inline">
            {"That's a shortfall of "}
            <b>{formattedShortfallValue}</b>
            {`, or ${formattedShortfallUnderperformValue}`}
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
            {formattedTotalAccountValue}
          </Typography>
          <Typography color="grey" colorShade="dark1" variant="b2">
            <b>/ {formattedGoalValue}</b>
          </Typography>
        </GoalValues>
        <Spacer y={1} />
        <ProgressBar progress={accountValues.map(({ value }) => value / goalValue)} />
        <Spacer y={0.5} />
        <Typography color="secondary" variant="sh4" align="right">
          {accountValues.map(({ label }) => label).join(' + ')}
        </Typography>
      </CardFooter>
    </GoalProgressStyledCard>
  );
};

export default GoalProgressCard;
