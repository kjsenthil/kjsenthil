import * as React from 'react';
import {
  formatCurrency,
  CurrencyPresentationVariant,
  formatPercent,
  PercentPresentationVariant,
} from '../../../utils/formatters';
import { ProgressBar, Spacer, Typography } from '../../atoms';
import { GoalLifePlanCard, TypographyWithTooltip } from '../../molecules';
import {
  CardBody,
  CardFooter,
  DetailsContainer,
  GoalIcon,
  GoalValues,
  IconContainer,
} from './GoalProgressCard.styles';

export interface GoalProgressCardProps {
  onTrackPercentage: number;
  affordableValues: number[];
  goalValue: number;
  shortfallValue: number;
  shortfallUnderperformValue: number;
  title: string;
  iconSrc: string;
  iconAlt?: string;
  tooltipText: string;
  investmentAccounts: string[];
  navigateToEditGoalPage: () => void;
}

const GoalProgressCard = ({
  onTrackPercentage,
  affordableValues,
  goalValue,
  shortfallValue,
  shortfallUnderperformValue,
  iconSrc,
  iconAlt = 'goal image',
  title,
  tooltipText,
  investmentAccounts,
  navigateToEditGoalPage,
}: GoalProgressCardProps) => {
  const totalAffordableValue = affordableValues.reduce((total, value) => total + value, 0);

  const formattedOnTrackPercentage = formatPercent(
    onTrackPercentage,
    PercentPresentationVariant.PROJECTION
  );
  const formattedTotalAccountValue = formatCurrency(
    totalAffordableValue,
    CurrencyPresentationVariant.PROJECTION
  );
  const formattedGoalValue = formatCurrency(goalValue, CurrencyPresentationVariant.USER_INPUT);

  // We're using the absolute value here always because whether shortfall value
  // is negative or positive is represented by the wording "surplus" or
  // "shortfall".
  const formattedShortfallValue = formatCurrency(
    Math.abs(shortfallValue),
    CurrencyPresentationVariant.PROJECTION
  );
  const formattedShortfallUnderperformValue = formatCurrency(
    Math.abs(shortfallUnderperformValue),
    CurrencyPresentationVariant.PROJECTION
  );

  return (
    <GoalLifePlanCard handleClick={navigateToEditGoalPage}>
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

          <TypographyWithTooltip
            typographyProps={{
              display: 'inline',
              color: 'primary',
              colorShade: 'dark2',
            }}
            tooltip={tooltipText}
          >
            {`That's a ${shortfallValue < 0 ? 'surplus' : 'shortfall'} of `}
            <b>{formattedShortfallValue}</b>
            {`, or ${formattedShortfallUnderperformValue}`}
            {' if markets underperform.'}
          </TypographyWithTooltip>
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
        <ProgressBar
          progress={affordableValues.map((affordableValue) =>
            goalValue ? affordableValue / goalValue : 0
          )}
        />
        <Spacer y={0.5} />
        <Typography color="secondary" variant="sh4" align="right">
          {investmentAccounts.join(' + ')}
        </Typography>
      </CardFooter>
    </GoalLifePlanCard>
  );
};

export default GoalProgressCard;
