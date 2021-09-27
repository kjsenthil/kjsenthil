import * as React from 'react';
import { useBreakpoint } from '../../../hooks';
import {
  formatCurrency,
  formatPercent,
  CurrencyPresentationVariant,
  PercentPresentationVariant,
} from '../../../utils/formatters';
import { Box, Divider, Spacer, Grid, Typography } from '../../atoms';
import { Legend } from '../../molecules';
import { SummaryCard, SummaryCardCell, SummaryCardContent } from './SummaryPanel.styles';
import { DataPeriodTooltip, StaticTooltips } from '../../../constants/tooltips';
import { formatDate } from '../../../utils/date';

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
  mobileFooterChildren?: React.ReactNode;
}

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
  mobileFooterChildren,
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
      title="ANNUALISED RETURN"
      tooltip={isMobile ? undefined : StaticTooltips.annualisedReturn}
      value={annualisedReturnPercentage}
      valueFormatter={percentFormatterWithSign}
      valueSizeVariant="h4"
      spaceNoWrap={false}
    />
  );

  const renderNetContributions = (
    <Legend
      title="NET CONTRIBUTION"
      tooltip={isMobile ? undefined : StaticTooltips.netContribution}
      value={totalNetContributions}
      valueFormatter={currencyFormatter}
      valueSizeVariant="h4"
      spaceNoWrap={false}
    />
  );

  const renderLifetimeReturn = (
    <Legend
      title="LIFETIME RETURN"
      tooltip={isMobile ? undefined : StaticTooltips.lifetimeReturn}
      value={lifetimeReturn}
      valueFormatter={currencyFormatterWithSign}
      valueSizeVariant="h4"
      percentageChange={lifetimeReturnPercentage}
      percentageFormatter={percentFormatterWithSignElseHyphen}
      percentageNewLine={isMobile}
      spaceNoWrap={false}
    />
  );

  const renderPeriodBasedReturn = periodBasedReturn && (
    <>
      {isMobile || renderVerticalDivider(false)}
      <Legend
        title={`LAST ${periodBasedReturn.dataPeriod.toUpperCase()} RETURN`}
        value={periodBasedReturn.value}
        tooltip={isMobile ? undefined : DataPeriodTooltip(periodBasedReturn.dataPeriod)}
        valueFormatter={currencyFormatterWithSign}
        valueSizeVariant="h4"
        percentageChange={periodBasedReturn.percent}
        percentageFormatter={percentFormatterWithSign}
        percentageNewLine={isMobile}
        spaceNoWrap={false}
      />
    </>
  );

  return (
    <>
      <SummaryCard isMobile={isMobile}>
        {isMobile ? (
          <SummaryCardContent container xs={12} justifyContent="space-between">
            <SummaryCardCell item xs={6}>
              {renderNetContributions}
            </SummaryCardCell>

            <SummaryCardCell item xs={6}>
              {renderLifetimeReturn}
            </SummaryCardCell>

            <SummaryCardCell item xs={6}>
              {renderAnnualisedReturn}
            </SummaryCardCell>

            <SummaryCardCell item xs={6}>
              {renderPeriodBasedReturn}
            </SummaryCardCell>

            {mobileFooterChildren !== undefined && (
              <SummaryCardCell item xs={12}>
                <Divider orientation="horizontal" />
                <Spacer y={1} />
                {mobileFooterChildren}
                <Spacer y={1} />
              </SummaryCardCell>
            )}
          </SummaryCardContent>
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
      {isMobile && (
        <Box px={1.25} pt={1}>
          <Typography fontStyle="italic" variant="i1" color="grey" colorShade="dark1">
            Fund values as at {formatDate(new Date(), 'DD/MM/YYYY')}, based on mid price, 15 minutes
            delayed pricing for listed securities.
          </Typography>
        </Box>
      )}
    </>
  );
}
