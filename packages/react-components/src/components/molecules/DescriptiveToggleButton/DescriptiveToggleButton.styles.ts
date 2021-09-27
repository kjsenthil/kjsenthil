import styled from 'styled-components';
import { Theme, ToggleButton, ToggleButtonProps } from '../../atoms';

export const DescriptiveToggleButton = styled(ToggleButton)`
  ${({ theme }: { theme: Theme } & ToggleButtonProps) => `
    padding: ${theme.spacing(2.5)}px;
    
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

export const DescriptiveToggleButtonContentContainer = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: grid;
    grid: auto / ${theme.spacing(3.75)}px 1fr;
    align-items: center;
  `}
`;
