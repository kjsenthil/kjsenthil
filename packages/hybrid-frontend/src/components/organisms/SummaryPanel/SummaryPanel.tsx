import * as React from 'react';
import { formatCurrency, formatPercent } from '../../../utils/formatters';
import { Divider, Spacer, Grid, useTheme, useMediaQuery } from '../../atoms';
import { Legend, LegendProps } from '../../molecules';
import { SummaryCard, SummaryWrapper, SummaryOfTotalsWrapper } from './SummaryPanel.styles';

export interface SummaryValuesProps {
  totalValue: number;
  totalNetContributions: number;

  totalReturn: number;
  totalReturnPercentage: number;

  periodBasedReturn?: {
    value: number;
    percent: number;
    label: string;
  };
}

const legendProps: Record<string, Pick<LegendProps, 'title' | 'tooltip'>> = {
  lifetimeReturn: {
    title: 'LIFETIME RETURN',
    tooltip:
      'Lifetime return shows how well your investments have performed since you have held them on Bestinvest. This includes both growth and income returns.',
  },
  periodBasedReturn: {
    title: 'LAST 5 YEARS RETURN',
    tooltip:
      'Return figure relates to the gain or loss over the specified period including the impact of fees',
  },
  totalValue: {
    title: 'TOTAL VALUE',
    tooltip: 'Total value  = Investments plus cash',
  },
  netContribution: {
    title: 'NET CONTRIBUTIONS',
    tooltip: 'Contributions minus withdrawals',
  },
};

export default function SummaryPanel({
  totalValue,
  totalNetContributions,
  totalReturn,
  totalReturnPercentage,
  periodBasedReturn,
}: SummaryValuesProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm' as any));

  const renderVerticalDivider = (
    <>
      <Spacer x={3} />
      <Divider orientation="vertical" y={4} />
      <Spacer x={3} />
    </>
  );

  const renderTotalReturn = (
    <Legend
      {...legendProps.lifetimeReturn}
      value={totalReturn}
      valueFormatter={(val: number) => formatCurrency(val, { displayPlus: true })}
      valueSizeVariant="sh1"
      percentageChange={totalReturnPercentage}
      percentageFormatter={formatPercent}
    />
  );

  const renderPeriodBasedreturn = periodBasedReturn ? (
    <>
      {isMobile || renderVerticalDivider}
      <Legend
        {...legendProps.periodBasedReturn}
        title={periodBasedReturn.label}
        value={periodBasedReturn.value}
        valueFormatter={(val: number) => formatCurrency(val, { displayPlus: true })}
        valueSizeVariant="sh1"
        percentageChange={periodBasedReturn.percent}
        percentageFormatter={formatPercent}
      />
    </>
  ) : (
    <>
      {isMobile || renderVerticalDivider}
      {renderTotalReturn}
    </>
  );

  return (
    <SummaryCard>
      <SummaryWrapper isMobile={isMobile} container spacing={3} justify="space-between">
        <SummaryOfTotalsWrapper
          isMobile={isMobile && !!periodBasedReturn}
          item
          xs={isMobile ? 12 : 8}
          container
          spacing={2}
          wrap="nowrap"
          justify="flex-start"
        >
          <Grid item xs={isMobile ? 12 : undefined}>
            <Legend
              {...legendProps.totalValue}
              value={totalValue}
              valueFormatter={formatCurrency}
              valueSizeVariant="h5"
            />
          </Grid>
          <Grid
            item
            container
            xs={!!periodBasedReturn || isMobile ? 12 : 6}
            wrap="nowrap"
            alignItems="center"
            spacing={2}
            alignContent="flex-start"
            zeroMinWidth
            justify={isMobile ? 'space-between' : 'flex-start'}
          >
            <>
              {isMobile || <Grid item>{renderVerticalDivider}</Grid>}
              <Grid item xs={isMobile ? 6 : undefined}>
                <Legend
                  {...legendProps.netContribution}
                  value={totalNetContributions}
                  valueFormatter={formatCurrency}
                  valueSizeVariant="sh1"
                />
              </Grid>
              {isMobile || <Grid item>{renderVerticalDivider}</Grid>}
              <Grid item xs={isMobile ? 6 : undefined}>
                {!!periodBasedReturn && renderTotalReturn}
              </Grid>
            </>
          </Grid>
        </SummaryOfTotalsWrapper>

        {isMobile && <Divider orientation="horizontal" />}
        <Grid
          item
          container
          xs={isMobile ? 12 : 4}
          direction="row"
          justify={isMobile ? 'flex-start' : 'flex-end'}
          alignItems="center"
          wrap="nowrap"
        >
          {renderPeriodBasedreturn}
        </Grid>
      </SummaryWrapper>
    </SummaryCard>
  );
}
