import React from 'react';
import { Table, TableBody, TableContainer, TableRow, TagBox } from '../../molecules';
import { formatCurrency, formatPercent } from '../../../utils/formatters';
import { Grid, Icon, IconButton, Tooltip, Typography } from '../../atoms';
import {
  AccountsTableCell,
  AccountsTableHead,
  AccountsTableHeaderInfo,
} from './AccountsTable.styles';

export interface AccountsHeaderCell {
  value: string;
  tooltip?: string;
}

export interface AccountsRowCell {
  accountName: string;
  totalHoldings: number;
  totalContributions: number;
  cashValue: number;
  totalReturn: number;
  totalReturnPct: number;
}

export interface AccountsTableProps {
  headerRow: AccountsHeaderCell[];
  dataRow: AccountsRowCell[];
}

const AccountsTable = ({ headerRow, dataRow }: AccountsTableProps) => (
  <TableContainer>
    <Table aria-label="accounts table">
      <AccountsTableHead>
        <TableRow>
          {headerRow &&
            headerRow.map((headerRowItem: AccountsHeaderCell) => (
              <AccountsTableCell key={`${headerRowItem.value} Key`}>
                <Typography variant="sh3" display="inline">
                  {headerRowItem.value}
                </Typography>

                {headerRowItem.tooltip && (
                  <Tooltip title={headerRowItem.tooltip}>
                    <IconButton aria-label={`${headerRowItem.value} Info`} size="small">
                      <AccountsTableHeaderInfo name="infoCircleIcon" />
                    </IconButton>
                  </Tooltip>
                )}
              </AccountsTableCell>
            ))}
        </TableRow>
      </AccountsTableHead>
      <TableBody>
        {dataRow &&
          dataRow.map((row: AccountsRowCell) => (
            <TableRow key={row.accountName}>
              <AccountsTableCell>
                <Typography variant="sh4">{row.accountName}</Typography>
              </AccountsTableCell>
              <AccountsTableCell>
                <Typography variant="b2" color="primary">
                  {formatCurrency(row.totalHoldings)}
                </Typography>
              </AccountsTableCell>
              <AccountsTableCell>
                <Typography variant="b2" color="primary">
                  {formatCurrency(row.totalContributions)}
                </Typography>
              </AccountsTableCell>
              <AccountsTableCell>
                <Typography variant="b2" color="primary">
                  {formatCurrency(row.cashValue)}
                </Typography>
              </AccountsTableCell>
              <AccountsTableCell align="right">
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="b2" color="primary" display="inline">
                      {formatCurrency(row.totalReturn, { displayPlus: true })}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TagBox variant="percentage">{formatPercent(row.totalReturnPct)}</TagBox>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Icon color="primary" name="arrowHeadRight" />
                  </Grid>
                </Grid>
              </AccountsTableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default AccountsTable;
