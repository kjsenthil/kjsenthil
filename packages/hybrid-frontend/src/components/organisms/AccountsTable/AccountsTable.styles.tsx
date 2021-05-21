import styled from 'styled-components';
import { Icon } from '../../atoms';
import { TableCell, TableHead } from '../../molecules';

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
    padding-top: 5px;
    padding-left: 5px;
    color: ${theme.palette.grey.main}
  `}
`;
