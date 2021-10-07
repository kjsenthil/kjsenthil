import React from 'react';
import {
  AccountReturn,
  AccountsIconButton,
  AccountsTableContainer,
  AccountsTableCell,
  AccountsTableFooter,
  AccountsTableHead,
  AccountsTableHeaderInfo,
  AccountsTableRow,
  StyledActionIcon,
} from './AccountsTable.styles';
import { InvestmentAccount, PerformanceDataPeriod } from '../../../services';
import {
  CurrencyPresentationVariant,
  formatCurrency,
  formatPercent,
  PercentPresentationVariant,
} from '../../../utils/formatters';
import { Grid, Spacer, Tooltip, Typography } from '../../atoms';
import { Table, TableBody, TableRow, TagBox } from '../../molecules';
import { PartialPick } from '../../../utils/common';

export interface AccountsHeaderCell {
  value: string;
  tooltip?: string;
}

export type AccountsFooterCell = string;

export interface AccountsTableProps {
  headerRow: AccountsHeaderCell[];
  dataRow: (Pick<InvestmentAccount, 'id' | 'accountName'> &
    PartialPick<
      InvestmentAccount,
      | 'accountTotalHoldings'
      | 'accountCash'
      | 'monthlyInvestment'
      | 'periodReturn'
      | 'accountInvestments'
      | 'accountLifetimeReturn'
      | 'annualisedReturn'
    >)[];
  period: PerformanceDataPeriod;
  footerRow?: AccountsFooterCell[];
}

const formatPercentActualTopline = (val: number) =>
  formatPercent(val, PercentPresentationVariant.ACTUAL_TOPLINE);

const percentFormatterWithSign = (val: number) =>
  formatPercent(val, PercentPresentationVariant.ACTUAL_TOPLINE, {
    displayPlus: true,
    injectSpaceAfterPlusMinus: true,
  });

const formatPercentActualToplineElseHyphen = (val: number) =>
  val === 0 ? '-' : formatPercent(val, PercentPresentationVariant.ACTUAL_TOPLINE);

const AccountsTable = ({ headerRow, dataRow, period, footerRow }: AccountsTableProps) => (
  <AccountsTableContainer>
    <Table aria-label="accounts table">
      <AccountsTableHead>
        <TableRow>
          {headerRow &&
            headerRow.map((headerRowItem: AccountsHeaderCell) => (
              <AccountsTableCell key={`${headerRowItem.value}-key`}>
                <Grid container wrap="nowrap">
                  <Grid
                    container
                    item
                    wrap="nowrap"
                    {...(headerRowItem.value !== 'ACCOUNT' ? { justifyContent: 'flex-end' } : {})}
                  >
                    <Typography variant="sh3" display="inline">
                      {headerRowItem.value}
                    </Typography>
                    {headerRowItem.tooltip && (
                      <>
                        <Spacer x={0.3} inline />
                        <Tooltip title={headerRowItem.tooltip}>
                          <AccountsIconButton
                            aria-label={`${headerRowItem.value} Info`}
                            size="small"
                          >
                            <AccountsTableHeaderInfo name="infoCircleIcon" />
                          </AccountsIconButton>
                        </Tooltip>
                      </>
                    )}
                  </Grid>
                </Grid>
              </AccountsTableCell>
            ))}
        </TableRow>
      </AccountsTableHead>
      <TableBody>
        {dataRow &&
          dataRow.map((row) => (
            <AccountsTableRow key={row.accountName}>
              <AccountsTableCell style={{ textAlign: 'left' }}>
                <Typography variant="sh3">{row.accountName}</Typography>
              </AccountsTableCell>

              {row.accountInvestments !== undefined && (
                <AccountsTableCell>
                  <Typography variant="b4" color="primary" colorShade="dark2">
                    {formatCurrency(
                      row.accountInvestments,
                      CurrencyPresentationVariant.ACTUAL_TOPLINE
                    )}
                  </Typography>
                </AccountsTableCell>
              )}

              {row.accountCash !== undefined && (
                <AccountsTableCell>
                  <Grid container alignItems="center" justifyContent="flex-end">
                    <Typography variant="b4" color="primary" colorShade="dark2">
                      {formatCurrency(row.accountCash, CurrencyPresentationVariant.ACTUAL_TOPLINE)}
                    </Typography>
                  </Grid>
                </AccountsTableCell>
              )}

              {row.accountTotalHoldings !== undefined && (
                <AccountsTableCell>
                  <Typography variant="b4" color="primary" colorShade="dark2">
                    {formatCurrency(
                      row.accountTotalHoldings,
                      CurrencyPresentationVariant.ACTUAL_TOPLINE
                    )}
                  </Typography>
                </AccountsTableCell>
              )}

              {row.monthlyInvestment !== undefined && (
                <AccountsTableCell>
                  <Grid container alignItems="center" justifyContent="flex-end">
                    <Typography variant="b4" color="primary" colorShade="dark2">
                      {formatCurrency(
                        row.monthlyInvestment,
                        CurrencyPresentationVariant.ACTUAL_TOPLINE
                      )}
                    </Typography>
                  </Grid>
                </AccountsTableCell>
              )}

              {row.accountLifetimeReturn !== undefined && (
                <AccountsTableCell>
                  <AccountReturn>
                    <Typography variant="b4" color="primary" colorShade="dark2">
                      {formatCurrency(
                        row.accountLifetimeReturn.value,
                        CurrencyPresentationVariant.ACTUAL_TOPLINE
                      )}
                    </Typography>

                    <Spacer x={2} />
                    <TagBox variant="percentage" formatter={formatPercentActualToplineElseHyphen}>
                      {row.accountLifetimeReturn.percent}
                    </TagBox>
                  </AccountReturn>
                </AccountsTableCell>
              )}

              {row.annualisedReturn !== undefined && (
                <AccountsTableCell>
                  <Grid container justifyContent="flex-end" alignItems="center">
                    <Grid item>
                      <Typography variant="b4" color="primary" colorShade="dark2">
                        {row?.annualisedReturn !== 0
                          ? percentFormatterWithSign(row?.annualisedReturn / 100)
                          : `0%`}
                      </Typography>
                    </Grid>
                  </Grid>
                </AccountsTableCell>
              )}

              {row.periodReturn && row.periodReturn[period] !== undefined && (
                <AccountsTableCell>
                  <AccountReturn>
                    <Typography variant="b4" color="primary" colorShade="dark2" noWrap>
                      {formatCurrency(
                        row.periodReturn[period].value,
                        CurrencyPresentationVariant.ACTUAL_TOPLINE,
                        {
                          displayPlus: true,
                        }
                      )}
                    </Typography>

                    <Spacer x={2} />
                    <TagBox variant="percentage" formatter={formatPercentActualTopline}>
                      {row.periodReturn[period].percent}
                    </TagBox>
                    <StyledActionIcon color="primary" name="arrowHeadRight" />
                  </AccountReturn>
                </AccountsTableCell>
              )}
            </AccountsTableRow>
          ))}
      </TableBody>
      {footerRow && (
        <AccountsTableFooter>
          <TableRow>
            {footerRow.map((footerRowItem: AccountsFooterCell, i) => (
              /* eslint-disable-next-line react/no-array-index-key */
              <AccountsTableCell key={`${footerRowItem}-${i}-key`}>
                <Typography variant="sh3" display="inline">
                  {footerRowItem}
                </Typography>
              </AccountsTableCell>
            ))}
          </TableRow>
        </AccountsTableFooter>
      )}
    </Table>
  </AccountsTableContainer>
);

export default AccountsTable;
