import React from 'react';
import { Table, TableBody, TableContainer, TableRow, TagBox } from '../../molecules';
import { formatCurrency, formatPercent } from '../../../utils/formatters';
import { Grid, Icon, IconButton, Spacer, Tooltip, Typography } from '../../atoms';
import {
  AccountsTableCell,
  AccountsTableFooter,
  AccountsTableHead,
  AccountsTableHeaderInfo,
} from './AccountsTable.styles';
import { Breakdown } from '../../../services/myAccount';

export interface AccountsHeaderCell {
  value: string;
  tooltip?: string;
}

export type AccountsFooterCell = string;

export interface AccountsTableProps {
  headerRow: AccountsHeaderCell[];
  dataRow: Breakdown[];
  footerRow?: AccountsFooterCell[];
}

const AccountsTable = ({ headerRow, dataRow, footerRow }: AccountsTableProps) => (
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
          dataRow.map((row: Breakdown) => (
            <TableRow key={row.id}>
              <AccountsTableCell>
                <Typography variant="sh4">{row.accountName}</Typography>
              </AccountsTableCell>

              {row.accountTotalHoldings !== undefined && (
                <AccountsTableCell>
                  <Typography variant="b2" color="primary">
                    {formatCurrency(row.accountTotalHoldings)}
                  </Typography>
                </AccountsTableCell>
              )}

              <AccountsTableCell>
                <Typography variant="b2" color="primary">
                  {formatCurrency(row.accountTotalContribution)}
                </Typography>
              </AccountsTableCell>

              {row.accountCash !== undefined && (
                <AccountsTableCell>
                  <Grid container alignItems="center">
                    <Typography variant="b2" color="primary">
                      {formatCurrency(row.accountCash)}
                    </Typography>
                  </Grid>
                </AccountsTableCell>
              )}

              {row.monthlyInvestment !== undefined && (
                <AccountsTableCell>
                  <Grid container alignItems="center">
                    <Typography variant="b2" color="secondary">
                      {formatCurrency(row.monthlyInvestment)}
                    </Typography>
                  </Grid>
                </AccountsTableCell>
              )}

              {row.accountReturn !== undefined && (
                <AccountsTableCell align="right">
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={12} md={6}>
                      <Typography variant="b2" color="primary" display="inline">
                        {formatCurrency(row.accountReturn, { displayPlus: true })}
                      </Typography>
                    </Grid>
                    {row.accountReturnPercentage !== undefined && (
                      <>
                        <Grid item xs={12} md={3}>
                          <TagBox variant="percentage">
                            {formatPercent(row.accountReturnPercentage / 100)}
                          </TagBox>
                        </Grid>

                        <Grid item xs={12} md={2}>
                          <Icon color="primary" name="arrowHeadRight" />
                        </Grid>
                      </>
                    )}
                  </Grid>
                </AccountsTableCell>
              )}
            </TableRow>
          ))}
      </TableBody>
      {footerRow && (
        <AccountsTableFooter>
          <TableRow>
            {footerRow.map((footerRowItem: AccountsFooterCell) => (
              <AccountsTableCell key={`${footerRowItem}-key`}>
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
