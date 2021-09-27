import styled, { css } from 'styled-components';
import { Card, Grid, Theme } from '../../atoms';
import { TableRow } from '../../molecules';

export const AccountsCardContainer = styled(Card)`
  ${({ theme }: { theme: Theme }) => css`
    background-color: ${theme.palette.background.paper};
    box-shadow: none;
    border: solid 1px ${theme.palette.grey['200']};
    border-radius: 16px;
  `}
`;

export const AccountsCardTableRow = styled(TableRow)`
  ${({ theme }: { theme: Theme }) => css`
    background-color: ${theme.palette.background.default};
    &:first-child {
      padding-top: ${theme.spacing(1)}px;
    }
    &:nth-child(even) {
      background-color: ${theme.palette.grey['50']};
    }
  `}
`;

export const AccountsCardTableRowContents = styled(Grid)`
  ${({ theme }: { theme: Theme }) => css`
    padding-top: ${theme.spacing(1.5)}px;
    padding-bottom: ${theme.spacing(1.5)}px;
    padding-left: ${theme.spacing(2.5)}px;
    padding-right: ${theme.spacing(2.5)}px;
  `}
`;

export const AccountsCardTableCell = styled(Grid)`
  ${({ theme }: { theme: Theme }) => css`
    padding-top: ${theme.spacing(0.5)}px;
    padding-bottom: ${theme.spacing(0.5)}px;
  `}
`;

export const AccountsCardTableCellHeader = styled(Grid)`
  ${({ theme }: { theme: Theme }) => css`
    padding-bottom: ${theme.spacing(0.5)}px;
  `}
`;

export const AccountsCardTableFooterContents = styled(Grid)`
  ${({ theme }) => css`
    padding-bottom: ${theme.spacing(1)}px;
    padding-left: ${theme.spacing(2.5)}px;
    padding-right: ${theme.spacing(2.5)}px;
  `}
`;
