import React from 'react';
import { Table, TableBody, TableContainer, TableRow, TagBox } from '../../molecules';
import { formatCurrency, formatPercent } from '../../../utils/formatters';
import { Grid, IconButton, Spacer, Tooltip, Typography } from '../../atoms';
import {
  AccountReturn,
  AccountsTableCell,
  AccountsTableFooter,
  AccountsTableHead,
  AccountsTableHeaderInfo,
  AccountsTableRow,
  StyledActionIcon,
} from './AccountsTable.styles';
import { InvestmentAccount } from '../../../services/myAccount';
import { PerformanceDataPeriod } from '../../../services/performance';

export interface AccountsHeaderCell {
  value: string;
  tooltip?: string;
}

export type AccountsFooterCell = string;

type PartialPick<T, K extends keyof T> = {
  [P in K]?: T[P];
};

export interface AccountsTableProps {
  headerRow: AccountsHeaderCell[];
  dataRow: (Pick<InvestmentAccount, 'id' | 'accountName'> &
    PartialPick<
      InvestmentAccount,
      | 'accountTotalNetContribution'
      | 'accountTotalHoldings'
      | 'accountCash'
      | 'monthlyInvestment'
      | 'periodReturn'
    >)[];
  period: PerformanceDataPeriod;
  footerRow?: AccountsFooterCell[];
}

const AccountsTable = ({ headerRow, dataRow, period, footerRow }: AccountsTableProps) => (
  <TableContainer>
    <Table aria-label="accounts table">
      <AccountsTableHead>
        <TableRow>
          {headerRow &&
            headerRow.map((headerRowItem: AccountsHeaderCell) => (
              <AccountsTableCell key={`${headerRowItem.value}-key`}>
                <Typography variant="sh3" display="inline">
                  {headerRowItem.value}
                </Typography>
                {headerRowItem.tooltip && (
                  <>
                    <Spacer x={0.5} inline />
                    <Tooltip title={headerRowItem.tooltip}>
                      <IconButton aria-label={`${headerRowItem.value} Info`} size="small">
                        <AccountsTableHeaderInfo name="infoCircleIcon" />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </AccountsTableCell>
            ))}
        </TableRow>
      </AccountsTableHead>
      <TableBody>
        {dataRow &&
          dataRow.map((row) => (
            <AccountsTableRow key={row.id}>
              <AccountsTableCell>
                <Typography variant="sh3">{row.accountName}</Typography>
              </AccountsTableCell>

              {row.accountTotalHoldings !== undefined && (
                <AccountsTableCell>
                  <Typography variant="b2" color="primary" colorShade="dark2">
                    {formatCurrency(row.accountTotalHoldings)}
                  </Typography>
                </AccountsTableCell>
              )}

              {row.accountTotalNetContribution !== undefined && (
                <AccountsTableCell>
                  <Typography variant="b2" color="primary" colorShade="dark2">
                    {formatCurrency(row.accountTotalNetContribution)}
                  </Typography>
                </AccountsTableCell>
              )}

              {row.accountCash !== undefined && (
                <AccountsTableCell>
                  <Grid container alignItems="center">
                    <Typography variant="b2" color="primary" colorShade="dark2">
                      {formatCurrency(row.accountCash)}
                    </Typography>
                  </Grid>
                </AccountsTableCell>
              )}

              {row.monthlyInvestment !== undefined && (
                <AccountsTableCell>
                  <Grid container alignItems="center">
                    <Typography variant="b2" color="secondary" colorShade="dark2">
                      {formatCurrency(row.monthlyInvestment)}
                    </Typography>
                  </Grid>
                </AccountsTableCell>
              )}

              {row.periodReturn && row.periodReturn[period] !== undefined && (
                <AccountsTableCell>
                  <AccountReturn>
                    <Typography variant="b2" color="primary" colorShade="dark2" noWrap>
                      {formatCurrency(row.periodReturn[period].value, {
                        displayPlus: true,
                      })}
                    </Typography>

                    <Spacer x={2} />
                    <TagBox variant="percentage" formatter={formatPercent}>
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
  </TableContainer>
);

export default AccountsTable;
