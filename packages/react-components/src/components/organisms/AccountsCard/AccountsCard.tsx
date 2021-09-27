import React from 'react';
import { InvestmentAccount } from '../../../services';
import { Divider, Grid, Spacer, Typography } from '../../atoms';
import {
  CurrencyPresentationVariant,
  formatCurrency,
  formatPercent,
  PercentPresentationVariant,
} from '../../../utils/formatters';
import { AccountReturn, StyledActionIcon } from '../AccountsTable/AccountsTable.styles';
import { Table, TableBody, TableFooter, TagBox } from '../../molecules';
import {
  AccountsCardContainer,
  AccountsCardTableCell,
  AccountsCardTableRow,
  AccountsCardTableRowContents,
  AccountsCardTableFooterContents,
  AccountsCardTableCellHeader,
} from './AccountsCard.styles';
import { PartialPick } from '../../../utils/common';

export interface AccountsCardProps {
  data: (Pick<InvestmentAccount, 'id' | 'accountName'> &
    PartialPick<
      InvestmentAccount,
      | 'accountTotalHoldings'
      | 'accountCash'
      | 'accountLifetimeReturn'
      | 'accountTotalNetContribution'
    >)[];
  footerChildren?: React.ReactNode;
}

const renderCellHeader = (title) => (
  <AccountsCardTableCellHeader container item xs={12} alignItems="center">
    <Grid item xs={11}>
      <Typography variant="sh3" color="primary">
        {title}
      </Typography>
    </Grid>
    <Grid item xs={1}>
      <StyledActionIcon color="primary" name="arrowHeadRight" />
    </Grid>
  </AccountsCardTableCellHeader>
);

const renderAccountItem = (title, value) => (
  <AccountsCardTableCell container item xs={6}>
    <Grid container item xs justifyContent="space-between" direction="column">
      <Grid item>
        <Typography variant="sh4" color="primary" colorShade="dark2">
          {title}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="b4" color="primary" colorShade="dark2">
          {formatCurrency(value, CurrencyPresentationVariant.ACTUAL_TOPLINE)}
        </Typography>
      </Grid>
    </Grid>
  </AccountsCardTableCell>
);

const renderLifetimeReturn = (title, value, percentage) => (
  <AccountsCardTableCell item xs={6}>
    <Typography variant="sh4" color="primary" colorShade="dark2">
      {title}
    </Typography>
    <AccountReturn>
      <Typography variant="sh4" color="primary" colorShade="dark2">
        {formatCurrency(value, CurrencyPresentationVariant.ACTUAL_TOPLINE)}
      </Typography>

      <Spacer x={2} />
      <TagBox
        variant="percentage"
        formatter={(val: number) => formatPercent(val, PercentPresentationVariant.ACTUAL_TOPLINE)}
      >
        {percentage / 100}
      </TagBox>
    </AccountReturn>
  </AccountsCardTableCell>
);

const renderFooter = (children) => (
  <TableFooter>
    <AccountsCardTableFooterContents>
      <Divider orientation="horizontal" color="grey" />
      <Spacer y={0.75} />
      {children}
    </AccountsCardTableFooterContents>
  </TableFooter>
);

export default function AccountsCard({ data, footerChildren }: AccountsCardProps) {
  return (
    <AccountsCardContainer>
      <Table aria-label="accounts table">
        <TableBody>
          {data &&
            data.map((row) => (
              <AccountsCardTableRow
                key={`row-${row.accountName}-${row.id}`}
                data-testid={`row-${row.accountName}-${row.id}`}
              >
                <AccountsCardTableRowContents item container xs={12}>
                  {renderCellHeader(row.accountName)}
                  {row.accountCash !== undefined && renderAccountItem('CASH', row.accountCash)}
                  {row.accountTotalNetContribution !== undefined &&
                    renderAccountItem('NET CONTRIBUTION', row.accountTotalNetContribution)}
                  {row.accountTotalHoldings !== undefined &&
                    renderAccountItem('TOTAL VALUE', row.accountTotalHoldings)}
                  {row.accountLifetimeReturn !== undefined &&
                    renderLifetimeReturn(
                      'LIFETIME RETURN',
                      row.accountLifetimeReturn.value,
                      row.accountLifetimeReturn.percent
                    )}
                </AccountsCardTableRowContents>
              </AccountsCardTableRow>
            ))}
        </TableBody>
        {footerChildren !== undefined && renderFooter(footerChildren)}
      </Table>
    </AccountsCardContainer>
  );
}
