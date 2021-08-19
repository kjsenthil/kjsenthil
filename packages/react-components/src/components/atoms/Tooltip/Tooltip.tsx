import React from 'react';
import { Tooltip as MUITooltip, TooltipProps as MUITooltipProps } from '@material-ui/core';
import styled, { css } from 'styled-components';

const StyledTooltip = styled(({ className, ...props }) => (
  <MUITooltip {...props} classes={{ popper: className }} />
))`
  ${({
    theme: {
      typography: { pxToRem },
      palette,
    },
  }) => css`
    .MuiTooltip-tooltip {
      background-color: ${palette.background.default};
      color: ${palette.primary.dark};
      font-size: ${pxToRem(12)};
      font-weight: bold;
      border: 1px solid ${palette.grey.light1};
      border-radius: 4px;
      padding: 5px 8px;
    }

    .MuiTooltip-arrow {
      font-size: ${pxToRem(16)};
      width: 17px;
      &::before {
        border: 1px solid ${palette.grey.light1};
        background-color: ${palette.background.default};
        box-sizing: border-box;
        border-radius: 2px;
      }
    }
  `}
`;

export interface TooltipProps extends Omit<MUITooltipProps, 'children' | 'title'> {
  children: React.ReactNode;
  title: string;
}

const Tooltip = ({ children, ...props }: TooltipProps) => (
  <StyledTooltip leaveDelay={300} {...props}>
    {children}
  </StyledTooltip>
);
export default Tooltip;
