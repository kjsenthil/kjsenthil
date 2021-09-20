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
import { DataPeriodTooltip, StaticTooltips } from '../../../constants/tooltips';

export interface SummaryPanelProps {
  totalNetContributions: number;
  lifetimeReturn: number;
  lifetimeReturnPercentage: number;
  totalValue?: number;
  annualisedReturnPercentage?: number;
  periodBasedReturn?: {
    value: number;
    percent: number;
    dataPeriod: string;
  };
}

const legendProps: Record<string, Pick<LegendProps, 'title' | 'tooltip'>> = {
  netContribution: {
    title: 'NET CONTRIBUTION',
    tooltip: StaticTooltips.netContribution,
  },
  lifetimeReturn: {
    title: 'LIFETIME RETURN',
    tooltip: StaticTooltips.lifetimeReturn,
  },
  annualisedReturn: {
    title: 'ANNUALISED RETURN',
    tooltip: StaticTooltips.annualisedReturn,
  },
  // Period based return calculated inline due to being dynamic for selected period
};

const percentFormatterWithSign = (val: number) =>
  formatPercent(val, PercentPresentationVariant.ACTUAL_TOPLINE, {
    displayPlus: true,
    injectSpaceAfterPlusMinus: true,
  });

const percentFormatterWithSignElseHyphen = (val: number) =>
  val === 0
    ? '-'
    : formatPercent(val, PercentPresentationVariant.ACTUAL_TOPLINE, {
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

  const renderVerticalDivider = (spaceAround: boolean) => (
    <>
      {spaceAround && <Spacer x={10} />}
      <Divider orientation="vertical" y={4} marginY={1} />
      {spaceAround ? <Spacer x={10} /> : <Spacer x={5} />}
    </>
  );

  const renderAnnualisedReturn = (
    <Legend
      {...legendProps.annualisedReturn}
      value={annualisedReturnPercentage}
      valueFormatter={percentFormatterWithSign}
      valueSizeVariant="h4"
    />
  );

  const renderNetContributions = (
    <Legend
      {...legendProps.netContribution}
      value={totalNetContributions}
      valueFormatter={currencyFormatter}
      valueSizeVariant="h4"
    />
  );

  const renderLifetimeReturn = (
    <Legend
      {...legendProps.lifetimeReturn}
      value={lifetimeReturn}
      valueFormatter={currencyFormatterWithSign}
      valueSizeVariant="h4"
      percentageChange={lifetimeReturnPercentage}
      percentageFormatter={percentFormatterWithSignElseHyphen}
      percentageNewLine={isMobile}
    />
  );

  const renderPeriodBasedReturn = periodBasedReturn && (
    <>
      {isMobile || renderVerticalDivider(false)}
      <Legend
        title={`LAST ${periodBasedReturn.dataPeriod.toUpperCase()} RETURN`}
        value={periodBasedReturn.value}
        tooltip={DataPeriodTooltip(periodBasedReturn.dataPeriod)}
        valueFormatter={currencyFormatterWithSign}
        valueSizeVariant="h4"
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
            {renderPeriodBasedReturn}
          </Grid>
        </Grid>
      ) : (
        <Grid container justifyContent="space-between" alignContent="center">
          <Grid item xs={8}>
            <Grid container justifyContent="flex-start">
              <Grid item>{renderNetContributions}</Grid>

              <Grid item>{renderVerticalDivider(true)}</Grid>

              <Grid item>{renderLifetimeReturn}</Grid>

              <Grid item>{renderVerticalDivider(true)}</Grid>

              <Grid item>{renderAnnualisedReturn}</Grid>
            </Grid>
          </Grid>

          <Grid item xs={4} container justifyContent="flex-end" alignItems="center" wrap="nowrap">
            {renderPeriodBasedReturn}
          </Grid>
        </Grid>
      )}
    </SummaryCard>
  );
}
