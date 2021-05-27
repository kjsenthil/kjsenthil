import styled from 'styled-components';
import { Alert } from '../../molecules';
import { Typography, Theme } from '../../atoms';

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
