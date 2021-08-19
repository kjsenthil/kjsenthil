import * as React from 'react';
import {
  formatCurrency,
  formatPercent,
  CurrencyPresentationVariant,
  PercentPresentationVariant,
} from '../../../utils/formatters';
import {
  Card,
  Divider,
  Grid,
  Icon,
  Spacer,
  Typography,
  useMediaQuery,
  useTheme,
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

const currencyFormatter = (val: number) =>
  formatCurrency(val, CurrencyPresentationVariant.PROJECTION);

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
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Card variant="outlined">
      <GoalTrackingCardContent>
        <Grid container direction="column" spacing={0}>
          <Grid item container spacing={2} wrap="nowrap" justifyContent="flex-start" xs={12}>
            {isMobile || (
              <Grid item>
                <Icon name="infoCircleIcon" color="secondary" />
              </Grid>
            )}
            <Grid item container direction="column" xs={12}>
              <Grid item direction="row" container alignItems="center">
                <Spacer x={1} />
                <Typography color="primary" colorShade="dark2" variant="h3">
                  {currencyFormatter(totalProjected)}
                </Typography>
                <span>{'\u00a0\u00a0/\u00a0\u00a0'}</span>
                <Typography color="grey" colorShade="dark1" variant="sh3">
                  {currencyFormatter(target)}
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
                  {formatPercent(onTrack, PercentPresentationVariant.PROJECTION)} of your target.
                  That&#39;s a {onTrack > 1 ? `surplus` : `shortfall`} of
                  {'\u00a0'}
                  {currencyFormatter(Math.abs(surplusOrShortfall))}.
                </TypographyWithTooltip>
              </Grid>
              <Spacer y={2} />
              <ProgressBarWithLegend
                progressBarData={progressBarData}
                currencyFormatter={currencyFormatter}
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
          <Grid container direction="row" wrap="nowrap" spacing={2} justifyContent="flex-start">
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
                You&#39;re likely to have {currencyFormatter(drawdownMonthlyIncome)} to spend each
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
