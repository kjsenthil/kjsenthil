import { Theme } from '@material-ui/core';
import styled from 'styled-components';

export const LegendContainer = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: inline-flex;
    gap: ${theme.spacing(1)}px;
    align-items: center;
  `}
`;

export const ValueContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;
