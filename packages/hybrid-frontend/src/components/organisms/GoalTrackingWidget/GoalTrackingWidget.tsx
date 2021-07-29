import * as React from 'react';
import { formatPercent, formatCurrency } from '../../../utils/formatters';
import {
  Grid,
  Typography,
  Spacer,
  Card,
  Icon,
  Divider,
  useTheme,
  useMediaQuery,
} from '../../atoms';
import { TypographyWithTooltip } from '../../molecules';
import ProgressBarWithLegend, {
  ProgressBarWithLegendProps,
} from '../../molecules/ProgressBarWithLegend';
import { GoalTrackingCardContent } from './GoalTrackingWidget.styles';

export interface GoalTrackingWidgetProps
  extends Omit<ProgressBarWithLegendProps, 'currencyFormatter'> {
  target: number;
  onTrack: number;
  totalProjected: number;
  drawdownStartAge: number;
  surplusOrShortfall: number;
  drawdownEndAge: number;
  drawdownMonthlyIncome: number;
}

const GoalTrackingWidget = ({
  target,
  totalProjected,
  onTrack,
  drawdownStartAge,
  surplusOrShortfall,
  drawdownEndAge,
  drawdownMonthlyIncome,
  progressBarData,
}: GoalTrackingWidgetProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs' as any));

  return (
    <Card variant="outlined">
      <GoalTrackingCardContent>
        <Grid container direction="column" spacing={0}>
          <Grid item container spacing={2} wrap="nowrap" justify="flex-start" xs={12}>
            {isMobile || (
              <Grid item>
                <Icon name="infoCircleIcon" color="secondary" />
              </Grid>
            )}
            <Grid item container direction="column" xs={12}>
              <Grid item direction="row" container alignItems="center">
                <Spacer x={1} />
                <Typography color="primary" colorShade="dark2" variant="h3">
                  {formatCurrency(totalProjected)}
                </Typography>
                <span>{'\u00a0\u00a0/\u00a0\u00a0'}</span>
                <Typography color="grey" colorShade="dark1" variant="sh3">
                  {formatCurrency(target)}
                </Typography>
              </Grid>
              <Spacer y={2} />
              <Grid item container direction="row" alignItems="center">
                <Spacer x={1} />
                <TypographyWithTooltip
                  tooltip="Some description"
                  typographyProps={{ color: 'grey', colorShade: 'dark1' }}
                >
                  You&#39;re on track to have{' '}
                  {formatPercent(onTrack, { opts: { minimumFractionDigits: 0 } })} of your target.
                  That&#39;s a {onTrack > 1 ? `surplus` : `shortfall`} of
                  {'\u00a0'}
                  {formatCurrency(Math.abs(surplusOrShortfall))}.
                </TypographyWithTooltip>
              </Grid>
              <Spacer y={2} />
              <ProgressBarWithLegend
                progressBarData={progressBarData}
                currencyFormatter={formatCurrency}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Spacer y={2} />
          <Divider />
          <Spacer y={2} />
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" wrap="nowrap" spacing={2} justify="flex-start">
            {isMobile || (
              <Grid item>
                <Spacer x={3} />
              </Grid>
            )}
            <Grid item container direction="column" xs={12}>
              <TypographyWithTooltip
                tooltip="Some description"
                typographyProps={{ color: 'grey', colorShade: 'dark1' }}
              >
                You&#39;re likely to have {formatCurrency(drawdownMonthlyIncome)} to spend each
                month between ages {drawdownStartAge} - {drawdownEndAge}.
              </TypographyWithTooltip>
              <Spacer y={2} />
            </Grid>
          </Grid>
        </Grid>
      </GoalTrackingCardContent>
    </Card>
  );
};

export default GoalTrackingWidget;
