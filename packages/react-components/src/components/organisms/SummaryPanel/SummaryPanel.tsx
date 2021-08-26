import * as React from 'react';
import { useBreakpoint } from '../../../hooks';
import {
  formatCurrency,
  formatPercent,
  CurrencyPresentationVariant,
  PercentPresentationVariant,
} from '../../../utils/formatters';
import { Divider, Spacer, Grid } from '../../atoms';
import { Legend, LegendProps } from '../../molecules';
import { SummaryCard } from './SummaryPanel.styles';

export interface SummaryPanelProps {
  totalNetContributions: number;
  lifetimeReturn: number;
  lifetimeReturnPercentage: number;
  totalValue?: number;
  annualisedReturnPercentage?: number;
  periodBasedReturn?: {
    value: number;
    percent: number;
    label: string;
  };
}

const legendProps: Record<string, Pick<LegendProps, 'title' | 'tooltip'>> = {
  netContribution: {
    title: 'NET CONTRIBUTIONS',
    tooltip: 'Contributions minus withdrawals',
  },
  lifetimeReturn: {
    title: 'LIFETIME RETURN',
    tooltip:
      'Lifetime return shows how well your investments have performed since you have held them on Bestinvest. This includes both growth and income returns.',
  },
  annualisedReturn: {
    title: 'ANNUALISED RETURN',
    tooltip: 'Annualised return is the average amount earned each year over a given time period',
  },
  periodBasedReturn: {
    title: 'LAST 5 YEARS RETURN',
    tooltip:
      'Return figure relates to the gain or loss over the specified period including the impact of fees',
  },
};

const percentFormatterWithSign = (val: number) =>
  formatPercent(val, PercentPresentationVariant.ACTUAL_TOPLINE, {
    displayPlus: true,
    injectSpaceAfterPlusMinus: true,
  });

const currencyFormatter = (val: number) =>
  formatCurrency(val, CurrencyPresentationVariant.ACTUAL_TOPLINE);
const currencyFormatterWithSign = (val: number) =>
  formatCurrency(val, CurrencyPresentationVariant.ACTUAL_TOPLINE, {
    displayPlus: true,
    injectSpaceAfterPlusMinus: true,
  });

export default function SummaryPanel({
  totalNetContributions,
  lifetimeReturn,
  lifetimeReturnPercentage,
  annualisedReturnPercentage,
  periodBasedReturn,
}: SummaryPanelProps) {
  const { isMobile } = useBreakpoint();

  const renderVerticalDivider = (
    <>
      <Spacer x={3} />
      <Divider orientation="vertical" y={4} />
      <Spacer x={3} />
    </>
  );

  const renderAnnualisedReturn = (
    <Legend
      {...legendProps.annualisedReturn}
      value={annualisedReturnPercentage}
      valueFormatter={percentFormatterWithSign}
      valueSizeVariant="h5"
    />
  );

  const renderNetContributions = (
    <Legend
      {...legendProps.netContribution}
      value={totalNetContributions}
      valueFormatter={currencyFormatter}
      valueSizeVariant="h5"
    />
  );

  const renderLifetimeReturn = (
    <Legend
      {...legendProps.lifetimeReturn}
      value={lifetimeReturn}
      valueFormatter={currencyFormatterWithSign}
      valueSizeVariant="h5"
      percentageChange={lifetimeReturnPercentage}
      percentageFormatter={percentFormatterWithSign}
      percentageNewLine={isMobile}
    />
  );

  const renderPeriodBasedreturn = periodBasedReturn && (
    <>
      {isMobile || renderVerticalDivider}
      <Legend
        {...legendProps.periodBasedReturn}
        title={periodBasedReturn.label}
        value={periodBasedReturn.value}
        valueFormatter={currencyFormatterWithSign}
        valueSizeVariant="h5"
        percentageChange={periodBasedReturn.percent}
        percentageFormatter={percentFormatterWithSign}
        percentageNewLine={isMobile}
      />
    </>
  );

  return (
    <SummaryCard>
      {isMobile ? (
        <Grid container spacing={3} justifyContent="space-evenly">
          <Grid item xs={6}>
            {renderNetContributions}
          </Grid>

          <Grid item xs={6}>
            {renderLifetimeReturn}
          </Grid>

          <Grid item xs={6}>
            {renderAnnualisedReturn}
          </Grid>

          <Grid item xs={6}>
            {renderPeriodBasedreturn}
          </Grid>
        </Grid>
      ) : (
        <Grid container justifyContent="space-between" alignContent="center">
          <Grid item xs={8}>
            <Grid container justifyContent="flex-start">
              <Grid item>{renderNetContributions}</Grid>

              <Grid item>{renderVerticalDivider}</Grid>

              <Grid item>{renderLifetimeReturn}</Grid>

              <Grid item>{renderVerticalDivider}</Grid>

              <Grid item>{renderAnnualisedReturn}</Grid>
            </Grid>
          </Grid>

          <Grid item xs={4} container justifyContent="flex-end" alignItems="center" wrap="nowrap">
            {renderPeriodBasedreturn}
          </Grid>
        </Grid>
      )}
    </SummaryCard>
  );
}
