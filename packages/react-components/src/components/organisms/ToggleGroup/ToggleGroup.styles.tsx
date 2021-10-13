import React from 'react';
import styled, { css } from 'styled-components';
import { Theme, ToggleButtonGroup, ToggleButtonGroupProps, typographyCss } from '../../atoms';

export interface ToggleGroupProps extends ToggleButtonGroupProps {
  theme: Theme;
  isMobile: boolean;

  equalWidthChildren?: boolean;
}

// ---------- DYNAMIC ---------- //

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

// ---------- ONE BUTTON PER ROW ---------- //
// This uses MUI's ToggleButtonGroup vertical layout

export const ToggleButtonGroupOneButtonPerRow = styled(
  ({ isMobile, ...props }: ToggleGroupProps) => <ToggleButtonGroup {...props} />
)`
  ${({ theme, isMobile }: ToggleGroupProps) => `
    &.MuiToggleButtonGroup-vertical {
      gap: ${isMobile ? theme.spacing(3) : theme.spacing(2.5)}px;
    }
    
    & .MuiToggleButtonGroup-groupedVertical {
      position: relative;
      border-radius: 12px;
    }
  `}
`;

// ---------- ONE ROW ONLY ---------- //
// This uses MUI's ToggleButtonGroup horizontal layout. All buttons will always
// be one one row.

export const ToggleButtonGroupOneRowOnlyContainer = styled.div`
  ${({ equalWidthChildren }: { equalWidthChildren?: boolean | number }) => `
    display: flex;
    flex-direction: column;
    
    ${equalWidthChildren === true ? 'width: max-content;' : ''}
  `}
`;

interface ToggleButtonGroupOneRowOnlyProps extends ToggleButtonGroupProps {
  equalWidthChildren?: boolean | number;
}

export const ToggleButtonGroupOneRowOnly = styled(
  ({ equalWidthChildren, ...props }: ToggleButtonGroupOneRowOnlyProps) => (
    <ToggleButtonGroup {...props} />
  )
)`
  ${({ theme, equalWidthChildren }) => `
    &.MuiToggleButtonGroup-root {
      gap: ${theme.spacing(3)}px;
    }
    
    & .MuiToggleButtonGroup-groupedHorizontal {
      position: relative;
      border-radius: 12px;
      
      ${equalWidthChildren === true ? 'flex: 1 1 0;' : ''}
    }
  `}
`;
