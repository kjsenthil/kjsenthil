import * as React from 'react';
import styled from 'styled-components';
import { Theme, ToggleButtonGroup, ToggleButtonGroupProps } from '../../atoms';

export interface StyledDescriptiveToggleButtonGroupProps extends ToggleButtonGroupProps {
  theme: Theme;
  isMobile: boolean;
}

export const StyledDescriptiveToggleButtonGroup = styled(
  ({ isMobile, ...props }: StyledDescriptiveToggleButtonGroupProps) => (
    <ToggleButtonGroup {...props} />
  )
)`
  ${({ theme, isMobile }: StyledDescriptiveToggleButtonGroupProps) => `
    &.MuiToggleButtonGroup-vertical {
      gap: ${isMobile ? theme.spacing(3) : theme.spacing(2.5)}px;
    }
    
    & .MuiToggleButtonGroup-groupedVertical {
      border-radius: 12px;
    }
  `}
`;
