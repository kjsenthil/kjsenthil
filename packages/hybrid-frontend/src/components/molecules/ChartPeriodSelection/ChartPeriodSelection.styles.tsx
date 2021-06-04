import * as React from 'react';
import { Button, ButtonProps, Theme } from '@material-ui/core';
import styled from 'styled-components';

export const Container = styled.div`
  ${({ theme }: { theme: Theme }) => `
    width: inherit;
    display: flex;
    background-color: ${theme.palette.grey['200']};
    border-radius: 50px;
    justify-content: space-between;
    padding: 3px;
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
    min-width: ${theme.spacing(3)}px;
    padding: ${theme.spacing(0.5)}px;

    text-transform: initial;
    border-radius: 20px;
    background-color: ${selected ? theme.palette.common.white : 'initial'};
    &:hover {
      background-color: ${selected ? theme.palette.primary.light2 : 'transparent'} 
    }
  `}
`;
