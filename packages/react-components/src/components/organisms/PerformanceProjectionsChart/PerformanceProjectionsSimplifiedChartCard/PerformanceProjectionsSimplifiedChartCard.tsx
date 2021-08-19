import * as React from 'react';
import { GoalProgress, MainCard } from '../../../molecules';
import { Button, ButtonProps, Icon, Spacer, Typography } from '../../../atoms';
import { GoalProgressProps } from '../../../molecules/GoalProgress';
import { InfoBox } from './PerformanceProjectionsSimplifiedChartCard.styles';
import {
  formatCurrency,
  formatPercent,
  CurrencyPresentationVariant,
  PercentPresentationVariant,
} from '../../../../utils/formatters';
import PerformanceProjectionsSimplifiedChart, {
  PerformanceProjectionsSimplifiedChartProps,
} from '../PerformanceProjectionsSimplifiedChart';
import { getPossessiveSuffix } from '../../../../utils/string';

export interface PerformanceProjectionsSimplifiedChartCardProps {
  userFirstName: string;
  retirementAge: number;
  retirementPerformance: number;
  retirementPerformancePercentage: number;
  goalProgressProps?: GoalProgressProps;
  chartProps: PerformanceProjectionsSimplifiedChartProps;
}

function CardButton(rest: ButtonProps) {
  return (
    <Button variant="contained" startIcon={<Icon name="smiley" fontSize="inherit" />} {...rest}>
      Manage my life plan
    </Button>
  );
}

export default function PerformanceProjectionsSimplifiedChartCard({
  userFirstName,
  retirementPerformance,
  retirementPerformancePercentage,
  retirementAge,
  goalProgressProps,
  chartProps,
}: PerformanceProjectionsSimplifiedChartCardProps) {
  const formattedRetirementPerformance = formatCurrency(
    retirementPerformance,
    CurrencyPresentationVariant.PROJECTION
  );
  const formattedRetirementPerformancePercentage = formatPercent(
    retirementPerformancePercentage,
    PercentPresentationVariant.PROJECTION
  );

  return (
    <MainCard
      title={`${userFirstName}${getPossessiveSuffix(userFirstName)} life plan`}
      renderActionEl={() => <CardButton />}
    >
      <InfoBox>
        <Typography variant="b2" color="grey" colorShade="dark1">
          {"You're on track to have "}
          <b>{formattedRetirementPerformancePercentage}</b>
          {" of your target by the time you're "}
          <b>{retirementAge}</b>.
          {retirementPerformancePercentage > 1 && (
            <>
              {" That's a surplus of "}
              <b>{formattedRetirementPerformance}</b>.
            </>
          )}
        </Typography>
      </InfoBox>

      <Spacer y={30 / 8} />

      {goalProgressProps && <GoalProgress {...goalProgressProps} />}

      <PerformanceProjectionsSimplifiedChart {...chartProps} />
    </MainCard>
  );
}
