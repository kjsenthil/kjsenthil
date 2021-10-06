import styled, { css } from 'styled-components';
import { Icon, IconButton } from '../../atoms';
import { TableContainer, TableCell, TableHead, TableFooter, TableRow } from '../../molecules';

export const AccountsTableContainer = styled(TableContainer)`
  ${({ theme }) => css`
    overflow: hidden;
    border-radius: ${theme.spacing(1.5)}px;
    border: 1px solid ${theme.palette.grey.light2};
  `}
`;

export const AccountsTableHead = styled(TableHead)`
  ${({ theme }) => css`
    background: ${theme.palette.grey.light2};
    align-items: right;
  `}
`;

export const AccountsTableRow = styled(TableRow)`
  ${({ theme }) => css`
    background-color: ${theme.palette.background.default};
    &:nth-child(even) {
      background-color: ${theme.palette.primary.light3};
    }
  `}
`;

export const AccountReturn = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
`;

export const StyledActionIcon = styled(Icon)`
  display: flex;
  margin-left: 4px;
  margin-right: -8px;
`;

export const AccountsIconButton = styled(IconButton)`
  &.MuiIconButton-root {
    &:hover {
      background-color: unset;
    }
  }
  &.MuiIconButton-sizeSmall {
    padding-right: 0;
  }
`;
export const AccountsTableCell = styled(TableCell)`
  ${({ theme }) => {
    const {
      typography: { pxToRem },
    } = theme;
    return css`
      border: none;
      padding: ${theme.spacing(2.25)}px ${theme.spacing(2)}px;
      overflow: hidden;
      text-align: right;
      &.MuiTableCell-head {
        height: ${pxToRem(46)};
        line-height: 1.14;
        padding-top: 0;
        padding-bottom: 0;

        &:first-of-type {
          border-radius: ${theme.spacing(1)}px 0 0 0;
        }

        &:last-of-type {
          border-radius: 0 ${theme.spacing(1)}px 0 0;
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
