import styled from 'styled-components';
import { Card, Box, Theme } from '../../atoms';

export const CardContainer = styled(Card)`
  ${({ theme }: { theme: Theme }) => `
    display: flex;
    padding: ${theme.spacing(4)}px;
    background-color:  ${theme.palette.background.paper};
    box-shadow: 1px 2px 44px 0 rgba(139,139,139,0.26);
    border-radius: 16px;
  `}
`;

export const StepContainer = styled(Box)`
  ${({ theme }: { theme: Theme }) => `
    margin-right: ${theme.spacing(3)}px;
  `}
`;
