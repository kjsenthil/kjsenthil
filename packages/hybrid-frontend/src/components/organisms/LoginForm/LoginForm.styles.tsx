import styled from 'styled-components';
import { Typography, Theme } from '../../atoms';
import { Alert } from '../../molecules';

export const Form = styled.form`
  border-radius: 5px;
  padding: 1rem;
`;

export const AlertBubble = styled(Alert)`
  ${({ theme, severity }: { theme: Theme; severity: 'success' | 'error' }) => `
    border: 1px solid ${theme.palette[severity].main};
    background-color: ${theme.palette.background.default};
    border-radius: 0 16px 16px 16px;
    width: 100%;
    padding: 0 10px;
  `}
`;

export const AlertTypography = styled(Typography)`
  padding-top: 3px;
`;
