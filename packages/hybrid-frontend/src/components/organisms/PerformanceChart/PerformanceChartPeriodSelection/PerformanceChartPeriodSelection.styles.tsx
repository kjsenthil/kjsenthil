import * as React from 'react';
import { Button, ButtonProps, Theme } from '@material-ui/core';
import styled from 'styled-components';

export const Container = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: flex;
    gap: ${theme.spacing(1.25)}px;
  `}
`;

export interface PeriodSelectionButtonProps extends ButtonProps {
  selected: boolean;
  children?: React.ReactNode;
}

export const PeriodSelectionButton = ({ children, ...props }: PeriodSelectionButtonProps) => (
  <Button {...props}>{children}</Button>
);

export const StyledPeriodSelectionButton = styled(PeriodSelectionButton)`
  ${({ theme, selected }: PeriodSelectionButtonProps & { theme: Theme }) => `
    min-width: ${theme.spacing(4)}px;
    padding: ${theme.spacing(1)}px ${theme.spacing(0.5)}px;

    text-transform: initial;
    
    background-color: ${selected ? theme.palette.primary.light2 : 'initial'};
    &:hover {
      background-color: ${selected ? theme.palette.primary.light2 : theme.palette.grey['100']} 
    }
  `}
`;
