import React from 'react';
import styled, { css } from 'styled-components';
import { typographyCss } from '../../atoms/Typography';
import { Theme, ToggleButtonGroup, ToggleButtonGroupProps } from '../../atoms';

export interface ToggleGroupProps extends ToggleButtonGroupProps {
  theme: Theme;
  isMobile: boolean;
}

export const StyledDescriptiveToggleButtonGroup = styled(
  ({ isMobile, ...props }: ToggleGroupProps) => <ToggleButtonGroup {...props} />
)`
  ${({ theme, isMobile }: ToggleGroupProps) => `
    &.MuiToggleButtonGroup-vertical {
      gap: ${isMobile ? theme.spacing(3) : theme.spacing(2.5)}px;
    }
    
    & .MuiToggleButtonGroup-groupedVertical {
      border-radius: 12px;
    }
  `}
`;

export const StyledUnorderedToggleButtonGroup = styled(
  ({ isMobile, ...props }: ToggleGroupProps) => <ToggleButtonGroup {...props} />
)`
  ${({ theme, isMobile }: ToggleGroupProps) => `
    white-space: wrap;

    &.MuiToggleButtonGroup-root {
      display: unset;
    }
    .MuiToggleButtonGroup-groupedHorizontal {
      border-radius: 4px;
      ${typographyCss({ variant: 'sh2', theme })};
      text-transform: unset;
      margin-right: ${isMobile ? theme.typography.pxToRem(12) : theme.typography.pxToRem(24)};
      margin-bottom: ${theme.typography.pxToRem(24)};
      border: none;
      background-color: ${theme.palette.grey[200]};
      white-space: nowrap;
    }

    .MuiToggleButton-root.Mui-selected,
    .MuiToggleButton-root.Mui-selected&:hover {
      background-color: ${theme.palette.primary.light};
      color: ${theme.palette.common.white};
    }
  `}
`;

export const StyledUnorderedGroupContainer = styled(({ isMobile, ...props }) => <div {...props} />)`
  ${({ isMobile }: { isMobile: boolean }) => css`
    max-width: ${isMobile ? '350px' : '500px'};
  `}
`;
