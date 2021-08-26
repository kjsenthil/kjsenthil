import { Theme } from '@material-ui/core';
import styled from 'styled-components';

export const LegendContainer = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: flex;
    gap: ${theme.spacing(1)}px;
    align-items: center;
  `}
`;

export const IconWrapper = styled.span`
  ${({ theme }: { theme: Theme }) => `
    color: ${theme.palette.grey['300']};
    vertical-align: middle;
  `}
`;
