import styled, { css } from 'styled-components';
import { Icon } from '../../atoms';
import { TableCell, TableHead, TableFooter, TableRow } from '../../molecules';

export const AccountsTableHead = styled(TableHead)`
  ${({ theme }) => css`
    background: ${theme.palette.grey.light2};
  `}
`;

export const AccountsTableRow = styled(TableRow)`
  ${({ theme }) => css`
    &:first-of-type .MuiTableCell-body {
      padding-top: ${theme.spacing(3.75)}px;
    }
  `}
`;

export const AccountReturn = styled.div`
  align-items: center;
  display: flex;
`;

export const StyledActionIcon = styled(Icon)`
  display: flex;
  margin-left: auto;
`;

export const AccountsTableCell = styled(TableCell)`
  ${({ theme }) => {
    const {
      typography: { pxToRem },
    } = theme;
    return css`
      border: none;
      padding: ${theme.spacing(2.75)}px ${theme.spacing(2)}px;

      &.MuiTableCell-head {
        height: ${pxToRem(46)};
        line-height: 1.14;
        padding-top: 0;
        padding-bottom: 0;

        &:first-of-type {
          border-radius: ${theme.spacing(1)}px 0 0 ${theme.spacing(1)}px;
        }

        &:last-of-type {
          border-radius: 0 ${theme.spacing(1)}px ${theme.spacing(1)}px 0;
        }
      }
    `;
  }}
`;

export const AccountsTableHeaderInfo = styled(Icon)`
  ${({ theme }) => css`
    color: ${theme.palette.grey.main};
    font-size: 12px;
    margin-top: -4px;
  `}
`;

export const AccountsTableFooter = styled(TableFooter)`
  ${({ theme }) => css`
    border-top: 2px solid ${theme.palette.grey.main};
  `}
`;
