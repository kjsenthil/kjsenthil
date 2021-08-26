import React, { FunctionComponent } from 'react';
import { Theme } from '@material-ui/core';
import {
  Description,
  GoalDetailsContainer,
  IconContainer,
  GoalStatus,
  HeaderRow,
  Layout,
  Totals,
  Target,
} from './GoalProgressCardDetailed.styles';
import { Link, LinkProps, ProgressBar, Typography, useTheme } from '../../atoms';
import { determineGoalState, GoalState } from './goalState';
import {
  CurrencyPresentationVariant,
  formatCurrency,
  formatPercent,
  PercentPresentationVariant,
} from '../../../utils/formatters';
import { ProgressBarWithLegend } from '../../molecules';
import {
  ProgressBarData,
  ProgressBarLegendValue,
} from '../../molecules/ProgressBarWithLegend/ProgressBarWithLegend';
import { useBreakpoint } from '../../../hooks';

export enum GoalProgressCardStyle {
  'simple',
  'detailed',
}

export interface GoalProgressCardDetailedProps {
  style?: GoalProgressCardStyle;
  name: string;
  iconSrc: string;
  lumpSumDate?: Date;
  startDate?: Date;
  endDate?: Date;
  ageAtLumpSumDate?: number;
  ageAtStartDate?: number;
  ageAtEndDate?: number;
  affordableAmount: number;
  affordableAmountUnderperform?: number;
  targetAmount: number;
  shortfall: number;
  onTrackPercentage: number;
  lumpSum?: number;
  totalAffordableDrawdown?: number;
  remainingAmount?: number;
  accounts?: string[];
}

const GoalLink: FunctionComponent<LinkProps> = ({ href, children }) => (
  <Link special href={href}>
    <Typography variant="sh4" component="span" color="primary" colorShade="light1">
      {children}
    </Typography>
  </Link>
);

const EDIT_GOAL_PATH = '/my-account/goals/life-plan-management';
const DELETE_GOAL_PATH = '/my-account/goals/life-plan-management';
const EMPTY_LEGEND: ProgressBarLegendValue = {
  title: '',
  value: '',
};
const EMPTY_PROGRESS_BAR_DATA = {
  progress: 0,
  legendProps: EMPTY_LEGEND,
};

const getTooltip = (goalState: GoalState, ageAtStartDate?: number, ageAtEndDate?: number) => {
  switch (goalState) {
    case GoalState.NOT_THERE_YET: {
      return 'You haven’t yet reached the starting date of your goal. When you get to your chosen date, we’ll assume you start taking money out as planned.';
    }
    case GoalState.ONGOING: {
      return `You reached the start date you set for your goal when you turned ${ageAtStartDate}. We assume you’re taking your money out as planned. If not, you may like to edit your goal.`;
    }
    case GoalState.FINISHED: {
      return `You reached the end date of your goal when you turned ${ageAtEndDate}. We assume you took your money out as planned. If not, you may like to edit your goal. Or you can delete your goal.`;
    }
    default:
      return '';
  }
};

const getProgressBarData = (
  goalState: GoalState,
  target: number,
  affordable: number,
  lumpSum?: number,
  affordableDrawdown?: number,
  ageAtStartDate?: number,
  ageAtEndDate?: number,
  remainingAmount?: number
): ProgressBarData[] => {
  // If the goal is finished, just show a 100% complete progress bar.
  if (goalState === GoalState.FINISHED) {
    return [
      EMPTY_PROGRESS_BAR_DATA,
      {
        progress: 100,
        legendProps: EMPTY_LEGEND,
      },
    ];
  }

  const progressBarData: ProgressBarData[] = [];
  let total = target;

  if (lumpSum && goalState === GoalState.NOT_THERE_YET) {
    progressBarData.push({
      progress: lumpSum / total,
      legendProps: {
        title: 'Lump sum',
        value: lumpSum,
        chartIndicatorProps: {
          variant: 'solid',
          color: 'tertiary',
          colorShade: 'dark1',
        },
      },
    });
  } else {
    if (lumpSum) total -= lumpSum;

    // If we don't add this, the "affordable" section will be the wrong colour.
    // It's easier to insert an empty lump sum section than to change the default progress bar
    // background colours.
    progressBarData.push(EMPTY_PROGRESS_BAR_DATA);
  }

  if (affordableDrawdown) {
    let legendProps = EMPTY_LEGEND;
    if (lumpSum || remainingAmount) {
      legendProps = {
        // N.B. An en-dash (–) is used here, not a hyphen (-)
        title: `From age ${ageAtStartDate}–${ageAtEndDate}`,
        value: affordableDrawdown,
        chartIndicatorProps: {
          variant: 'solid',
          color: 'tertiary',
          colorShade: 'main',
        },
      };
    }
    progressBarData.push({
      progress: affordableDrawdown / total,
      legendProps,
    });
  } else {
    progressBarData.push({
      progress: affordable / total,
      legendProps: EMPTY_LEGEND,
    });
  }

  if (remainingAmount) {
    progressBarData.push({
      progress: remainingAmount / total,
      legendProps: {
        title: 'Remaining',
        value: remainingAmount,
        chartIndicatorProps: {
          variant: 'solid',
          color: 'tertiary',
          colorShade: 'light2',
        },
      },
    });
  }

  return progressBarData;
};

const renderDescription = (
  goalState: GoalState,
  onTrackPercentage: number,
  percentageFormatter: (n: number) => string,
  currencyFormatter: (n: number) => string,
  shortfall: number,
  affordableAmount?: number,
  affordableAmountUnderperform?: number
) => {
  const onTrackPercentageFormatted = percentageFormatter(onTrackPercentage);
  let secondSentence;

  if (goalState === GoalState.FINISHED) {
    return (
      <>
        Your goal has now finished. If your plans have changed, you can still{' '}
        <GoalLink href={EDIT_GOAL_PATH}>edit</GoalLink> or{' '}
        <GoalLink href={DELETE_GOAL_PATH}>delete</GoalLink> this goal.
      </>
    );
  }

  if (affordableAmount && affordableAmountUnderperform) {
    const affordableAmountFormatted = currencyFormatter(affordableAmount);
    const affordableAmountUnderperformFormatted = currencyFormatter(affordableAmountUnderperform);
    secondSentence = (
      <>
        {' '}
        That&apos;s <strong>{affordableAmountFormatted}</strong> or{' '}
        <strong>{affordableAmountUnderperformFormatted}</strong> if markets underperform.
      </>
    );
  } else if (shortfall < 0) {
    const shortfallFormatted = currencyFormatter(-shortfall);
    secondSentence = (
      <>
        {' '}
        That&apos;s a shortfall of <strong>{shortfallFormatted}</strong>.
      </>
    );
  }

  return (
    <>
      You&apos;re on track to have <strong>{onTrackPercentageFormatted}</strong> of your target.
      {secondSentence}
    </>
  );
};

const renderProgressBar = (
  style: GoalProgressCardStyle,
  theme: Theme,
  isMobile: boolean,
  progressBarData: ProgressBarData[],
  currencyFormatter: (n: number) => string,
  targetLegend?: {
    title: string;
    value: number;
  }
) => {
  switch (style) {
    case GoalProgressCardStyle.detailed: {
      const height = isMobile ? theme.spacing(3.5) : theme.spacing(2);
      return (
        <ProgressBarWithLegend
          height={height}
          borderRadius={theme.spacing(0.5)}
          progressBarData={progressBarData}
          currencyFormatter={currencyFormatter}
          groupLegendValues
          targetLegend={targetLegend}
        />
      );
    }
    case GoalProgressCardStyle.simple: {
      const progress = progressBarData.map((data) => data.progress);
      return (
        <ProgressBar
          height={theme.spacing(3.5)}
          borderRadius={theme.spacing(1)}
          progress={progress}
        />
      );
    }
    default:
      return null;
  }
};

const renderAccounts = (accounts: string[]) => {
  let accountsText = accounts.slice(0, 3).join(' + ');
  if (accounts.length > 3) accountsText += ` + ${accounts.length - 3}`;
  return accountsText;
};

const GoalProgressCardDetailed: FunctionComponent<GoalProgressCardDetailedProps> = ({
  style = GoalProgressCardStyle.detailed,
  name,
  iconSrc,
  lumpSumDate,
  startDate,
  endDate,
  ageAtLumpSumDate,
  ageAtStartDate,
  ageAtEndDate,
  affordableAmount,
  affordableAmountUnderperform,
  targetAmount,
  shortfall,
  onTrackPercentage,
  lumpSum,
  totalAffordableDrawdown,
  remainingAmount,
  accounts,
}) => {
  const theme = useTheme();
  const { isMobile } = useBreakpoint();

  const currencyFormatter = (val: number) =>
    formatCurrency(val, CurrencyPresentationVariant.ACTUAL_TOPLINE);
  const percentageFormatter = (val: number) =>
    formatPercent(val, PercentPresentationVariant.PROJECTION);

  const startDateForStatus = lumpSumDate || startDate;
  const goalState = determineGoalState(startDateForStatus, endDate);
  const startingAgeForStatus = ageAtLumpSumDate || ageAtStartDate;
  const affordableAmountFormatted = currencyFormatter(affordableAmount);
  const targetAmountFormatted = currencyFormatter(targetAmount);

  const progressBarData = getProgressBarData(
    goalState,
    targetAmount,
    affordableAmount,
    lumpSum,
    totalAffordableDrawdown,
    ageAtStartDate,
    ageAtEndDate,
    remainingAmount
  );

  const targetLegend = isMobile
    ? undefined
    : {
        title: 'Target',
        value: targetAmount,
      };

  const width = style === GoalProgressCardStyle.simple ? '604px' : undefined;

  return (
    <Layout isMobile={isMobile} goalState={goalState} {...{ width }}>
      <IconContainer isMobile={isMobile} iconSrc={iconSrc} />
      <GoalDetailsContainer isMobile={isMobile} cardStyle={style}>
        <HeaderRow>
          <Typography variant="h5">{name}</Typography>
          {style === GoalProgressCardStyle.simple && accounts ? (
            <Typography variant="sh4" color="secondary">
              {renderAccounts(accounts)}
            </Typography>
          ) : null}
        </HeaderRow>
        <GoalStatus
          tooltip={getTooltip(goalState, startingAgeForStatus, ageAtEndDate) || ''}
          typographyProps={{ color: 'grey' }}
        >
          {goalState}
        </GoalStatus>
        <Totals>
          <Typography variant="sh1" color="tertiary">
            {affordableAmountFormatted}
          </Typography>
          <Typography variant="sh3" color="grey" colorShade="dark1">
            / {targetAmountFormatted}
          </Typography>
        </Totals>
        <Description
          variant="b2"
          color="primary"
          colorShade="dark2"
          $isMobile={isMobile}
          $cardStyle={style}
        >
          {renderDescription(
            goalState,
            onTrackPercentage,
            percentageFormatter,
            currencyFormatter,
            shortfall,
            affordableAmount,
            affordableAmountUnderperform
          )}
        </Description>
        {isMobile && style === GoalProgressCardStyle.detailed && (
          <Target>
            <Typography variant="sh4" color="grey" colorShade="dark1">
              Target
            </Typography>
            <Typography variant="sh4" color="primary" colorShade="dark2">
              {targetAmountFormatted}
            </Typography>
          </Target>
        )}
        {renderProgressBar(
          style,
          theme,
          isMobile,
          progressBarData,
          currencyFormatter,
          targetLegend
        )}
      </GoalDetailsContainer>
    </Layout>
  );
};

export default GoalProgressCardDetailed;
