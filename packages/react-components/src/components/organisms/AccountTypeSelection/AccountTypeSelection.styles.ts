import styled from 'styled-components';
import { CardContent } from '../../atoms';

export const ELEVATION = 3;

export const AccountTypeCardContent = styled(CardContent)`
  ${({ theme }) => `
  &:last-child {
    padding-bottom: ${theme.spacing(2)}px;
  }
`}
`;
