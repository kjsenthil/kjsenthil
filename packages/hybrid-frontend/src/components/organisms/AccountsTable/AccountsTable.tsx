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

export interface AccountsHeaderCell {
  value: string;
  tooltip?: string;
}

export type AccountsFooterCell = string;

export interface AccountsTableProps {
  headerRow: AccountsHeaderCell[];
  dataRow: InvestmentAccount[];
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
          dataRow.map((row: InvestmentAccount) => (
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

              <AccountsTableCell>
                <Typography variant="b2" color="primary" colorShade="dark2">
                  {formatCurrency(row.accountTotalNetContribution)}
                </Typography>
              </AccountsTableCell>

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

              {row.accountReturn !== undefined && (
                <AccountsTableCell>
                  <AccountReturn>
                    <Typography variant="b2" color="primary" colorShade="dark2" noWrap>
                      {formatCurrency(row.accountReturn, { displayPlus: true })}
                    </Typography>

                    {row.accountReturnPercentage !== undefined && (
                      <>
                        <Spacer x={2} />
                        <TagBox variant="percentage" formatter={formatPercent}>
                          {row.accountReturnPercentage / 100}
                        </TagBox>
                        <StyledActionIcon color="primary" name="arrowHeadRight" />
                      </>
                    )}
                  </AccountReturn>
                </AccountsTableCell>
              )}
            </AccountsTableRow>
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
