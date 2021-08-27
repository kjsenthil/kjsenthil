import React from 'react';
import { formatCurrency, CurrencyPresentationVariant } from '../../../utils/formatters';
import { Divider, Grid, Spacer } from '../../atoms';
import { Legend } from '../../molecules';
import { SummaryCard, SummaryOfTotalsWrapper } from './AccountSummaryPanel.styles';
import IsaAllowance from '../IsaAllowance';
import { AccountType } from '../../../constants';
import { useBreakpoint } from '../../../hooks';

export interface AccountSummaryValuesProps {
  cashValue: number;
  investmentValue: number;
  totalValue: number;
  accountType?: string;
  isaTitle?: string;
  isaContribution?: number;
  isaAllowance?: number;
}

const currencyFormatter = (val: number) =>
  formatCurrency(val, CurrencyPresentationVariant.ACTUAL_TOPLINE);

const AccountSummaryPanel = ({
  cashValue,
  investmentValue,
  totalValue,
  accountType,
  isaTitle = '',
  isaContribution = 0,
  isaAllowance = 0,
}: AccountSummaryValuesProps) => {
  const { isMobile } = useBreakpoint();

  const renderVerticalDivider = (
    <>
      <Spacer x={20} />
      <Divider orientation="vertical" y={4} />
      <Spacer x={20} />
    </>
  );
  return (
    <SummaryCard isMobile={isMobile}>
      <SummaryOfTotalsWrapper
        isMobile={isMobile}
        item
        xs={isMobile ? 12 : 6}
        spacing={2}
        wrap="nowrap"
        justifyContent="flex-start"
        container
      >
        <Grid item xs={isMobile ? 6 : 4}>
          <Legend
            title="Cash"
            value={cashValue}
            valueFormatter={currencyFormatter}
            valueSizeVariant="h5"
          />
        </Grid>
        {isMobile || <Grid item>{renderVerticalDivider}</Grid>}
        <Grid item xs={isMobile ? 6 : 4}>
          <Legend
            title="Investments"
            value={investmentValue}
            valueFormatter={currencyFormatter}
            valueSizeVariant="h5"
          />
        </Grid>
        {isMobile || <Grid item>{renderVerticalDivider}</Grid>}

        <Grid item xs={isMobile ? 12 : 4}>
          <Legend
            title="Total"
            value={totalValue}
            valueFormatter={currencyFormatter}
            valueSizeVariant="h5"
          />
        </Grid>
      </SummaryOfTotalsWrapper>
      {accountType === AccountType.ISA && (
        <SummaryOfTotalsWrapper
          isMobile={isMobile}
          item
          xs={isMobile ? 12 : 6}
          wrap="nowrap"
          justifyContent="flex-end"
          container
        >
          <Grid container item xs={isMobile ? 12 : 8}>
            <IsaAllowance
              title={isaTitle}
              contributions={isaContribution}
              totalAllowance={isaAllowance}
            />
          </Grid>
        </SummaryOfTotalsWrapper>
      )}
    </SummaryCard>
  );
};

export default AccountSummaryPanel;
