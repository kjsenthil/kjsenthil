import styled, { keyframes, css } from 'styled-components';
import { Theme } from '@material-ui/core';

export const ProgressLegendContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow: hidden;
`;

const MIN_WIDTH = 120;

export const ProgressLegendWrapper = styled.div`
  ${({ theme, width }: { theme: Theme; width?: number }) => {
    let adjustableWidthStyles;
    if (width) {
      const fillAnimation = keyframes`
        from {
          width: 0;
        }
        to {
          width: ${width}%;
        }
      `;
      adjustableWidthStyles = css`
        min-width: ${MIN_WIDTH}px;
        max-width: 50%;
        width: ${width}%;
        animation: ${fillAnimation} 1s ease-out;
      `;
    } else {
      adjustableWidthStyles = css`
        margin-right: ${theme.spacing(2)}px;
      `;
    }

    return css`
      ${adjustableWidthStyles}
      z-index: 1;
    `;
  }}
`;

export const TargetLegendWrapper = styled.div`
  margin-left: auto;
  min-width: ${MIN_WIDTH}px;
  z-index: 1;
`;

export const TargetLegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
