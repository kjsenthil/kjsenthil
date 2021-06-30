import styled from 'styled-components';
import { Icon } from '../../atoms';
import { TableCell, TableHead, TableFooter } from '../../molecules';

export const AccountsTableHead = styled(TableHead)`
  ${({ theme }) => `
    padding: 0 ${theme.spacing(18)}px 0 ${theme.spacing(3)}px;
    border-radius: ${theme.spacing(2)}px;
    background-color: ${theme.palette.grey.light2};
  `}
`;

export const AccountsTableCell = styled(TableCell)`
  border: none;
`;

export const AccountsTableHeaderInfo = styled(Icon)`
  ${({ theme }) => `
    color: ${theme.palette.grey.main};
    font-size: 12px;
    margin-bottom: 4px;
  `}
`;

export const AccountsTableFooter = styled(TableFooter)`
  ${({ theme }) => `
    border-top: 2px solid ${theme.palette.grey.main};
  `}
`;
