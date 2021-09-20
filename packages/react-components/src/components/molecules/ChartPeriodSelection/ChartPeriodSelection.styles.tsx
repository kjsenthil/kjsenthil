import * as React from 'react';
import { Theme } from '@material-ui/core';
import styled from 'styled-components';
import { Button, ButtonProps } from '../../atoms';

export const Container = styled.div`
  ${({ theme }: { theme: Theme }) => `
    width: inherit;
    display: flex;
    background-color: ${theme.palette.grey['200']};
    border-radius: 16px;
    justify-content: space-between;
    padding: 3px 12px 3px 4px;
    color: 'white';
  `}
`;

export interface PeriodSelectionButtonProps extends ButtonProps {
  selected: boolean;
  children?: React.ReactNode;
}

// Overriding button font size
export const StyledPeriodSelectionButton = styled(Button)`
  ${({ theme }: PeriodSelectionButtonProps & { theme: Theme }) => `
    min-width: ${theme.spacing(3)}px;
    padding: 5px 10px 5px 9px;
    border-radius: 8px;
    font-size: 15px;
  `}
`;
