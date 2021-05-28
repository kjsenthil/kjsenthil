import * as React from 'react';
import { MainCard } from '../../../molecules';
import { Button, ButtonProps, Icon, Spacer, Typography } from '../../../atoms';
import GoalDisplay, { GoalDisplayProps } from '../GoalDisplay/GoalDisplay';
import { InfoBox } from './PerformanceProjectionsSimplifiedChartCard.styles';
import { formatCurrency, formatPercent } from '../../../../utils/formatters';
import PerformanceProjectionsSimplifiedChart, {
  PerformanceProjectionsSimplifiedChartProps,
} from '../PerformanceProjectionsSimplifiedChart';
import { getPossessiveSuffix } from '../../../../utils/string';

export interface PerformanceProjectionsSimplifiedChartCardProps {
  userFirstName: string;
  retirementAge: number;
  retirementPerformance: number;
  retirementPerformancePercentage: number;

  goalDisplayProps: GoalDisplayProps;

  chartProps: PerformanceProjectionsSimplifiedChartProps;
}

function CardButton(rest: ButtonProps) {
  return (
    <Button variant="contained" startIcon={<Icon name="smiley" fontSize="inherit" {...rest} />}>
      Manage my life plan
    </Button>
  );
}

export default function PerformanceProjectionsSimplifiedChartCard({
  userFirstName,
  retirementPerformance,
  retirementPerformancePercentage,
  retirementAge,
  goalDisplayProps,
  chartProps,
}: PerformanceProjectionsSimplifiedChartCardProps) {
  const formattedRetirementPerformance = formatCurrency(retirementPerformance, {
    opts: {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  });
  const formattedRetirementPerformancePercentage = formatPercent(retirementPerformancePercentage, {
    opts: {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  });

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

      <GoalDisplay {...goalDisplayProps} />

      <PerformanceProjectionsSimplifiedChart {...chartProps} />
    </MainCard>
  );
}
