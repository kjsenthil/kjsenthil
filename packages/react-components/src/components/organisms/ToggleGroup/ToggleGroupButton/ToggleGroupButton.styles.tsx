import * as React from 'react';
import styled from 'styled-components';
import { Theme, ToggleButton, ToggleButtonProps } from '../../../atoms';

export type StyledToggleButtonPaddingSize = 'large' | 'small';

type StyledToggleButtonProps = {
  theme: Theme;
  buttonWidth?: number;
  paddingSize: StyledToggleButtonPaddingSize;
} & ToggleButtonProps;

export const StyledToggleButton = styled(
  ({ theme, paddingSize, buttonWidth, ...toggleButtonProps }: StyledToggleButtonProps) => (
    <ToggleButton {...toggleButtonProps} />
  )
)`
  ${({ theme, paddingSize, buttonWidth }) => `
    ${typeof buttonWidth === 'number' ? `width: ${theme.spacing(buttonWidth)}px;` : ''}
    padding: ${paddingSize === 'large' ? theme.spacing(2.5) : theme.spacing(1.75)}px;
    border: none;
    border-radius: 12px;
    text-transform: none;
    
    &.MuiButtonBase-root {
      display: block;
    }
    
    &.MuiToggleButton-root {
      color: ${theme.palette.primary.dark2};
      background-color: ${theme.palette.grey['200']};
    }
    
    &.MuiToggleButton-root.Mui-selected {
      color: ${theme.palette.common.white};
      background-color: ${theme.palette.primary.light1};
    }
  `}
`;

export const ToggleGroupButtonContentContainer = styled.div`
  ${({ theme, hasIdNumber }: { theme: Theme; hasIdNumber: boolean }) => `
    display: grid;
    grid: auto / ${hasIdNumber ? `${theme.spacing(3.75)}px` : ''} 1fr;
    align-items: center;
  `}
`;

// This is the triangle for the ToggleGroupButtonPromptContainer. It's put here
// rather than within ToggleGroupButtonPromptContainer because this is the
// easiest way to center the triangle underneath each ToggleGroup button.
//
// The side effect of this is that ToggleGroupButtonPromptContainerTriangle is
// coupled tightly with ToggleGroupButtonPromptContainer. However, considering
// that both of these components are under the umbrella of ToggleGroup, it's not
// the worst trade-off in the world.
export const ToggleGroupButtonPromptContainerTriangle = styled.div`
  ${({ theme }: { theme: Theme }) => `
    position: absolute;
    left: 50%;
    
    // This bottom offset is dependent on the distance between the 
    // ToggleGroupButton and the ToggleGroupButtonPromptContainer. The triangle
    // is meant to stick to the prompt container, after all.
    bottom: -21px; 
    
    width: 10px;
    height: 10px;
    
    border-top: 1px solid ${theme.palette.grey[200]};
    border-left: 1px solid ${theme.palette.grey[200]};
    background-color: ${theme.palette.common.white};
    
    transform: translateX(-50%) rotate(45deg);
  `}
`;
