import React from 'react';
import { formatCurrency } from '../../../utils/formatters';
import { Grid, Spacer, Divider, useMediaQuery, useTheme } from '../../atoms';
import { Legend } from '../../molecules';
import { SummaryCard, SummaryOfTotalsWrapper } from './AccountSummaryPanel.styles';

export interface AccountSummaryValuesProps {
  cashValue: number;
  investmentValue: number;
  totalValue: number;
}

const AccountSummaryPanel = ({
  cashValue,
  investmentValue,
  totalValue,
}: AccountSummaryValuesProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm' as any));

  const renderVerticalDivider = (
    <>
      <Spacer x={3} />
      <Divider orientation="vertical" y={4} />
      <Spacer x={3} />
    </>
  );

  return (
    <SummaryCard>
      <SummaryOfTotalsWrapper
        isMobile={isMobile}
        item
        xs={isMobile ? 12 : 8}
        container
        spacing={2}
        wrap="nowrap"
        justify="flex-start"
      >
        <Grid item xs={isMobile ? 6 : undefined}>
          <Legend
            title="Cash"
            value={cashValue}
            valueFormatter={formatCurrency}
            valueSizeVariant="h5"
          />
        </Grid>
        {isMobile || <Grid item>{renderVerticalDivider}</Grid>}
        <Grid item xs={isMobile ? 6 : undefined}>
          <Legend
            title="Investments"
            value={investmentValue}
            valueFormatter={formatCurrency}
            valueSizeVariant="h5"
          />
        </Grid>
        {isMobile || <Grid item>{renderVerticalDivider}</Grid>}

        <Grid item xs={isMobile ? 12 : undefined}>
          <Legend
            title="Total"
            value={totalValue}
            valueFormatter={formatCurrency}
            valueSizeVariant="h5"
          />
        </Grid>
      </SummaryOfTotalsWrapper>
      {/* TODO - ISA allowance to come here if account is ISA */}
    </SummaryCard>
  );
};

export default AccountSummaryPanel;
