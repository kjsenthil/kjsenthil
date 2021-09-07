import { Theme } from '@material-ui/core';
import styled, { keyframes, css } from 'styled-components';

export const ProgressBarContainer = styled.div`
  ${({
    isMultiValue,
    theme,
    borderRadius,
    barHeight,
  }: {
    isMultiValue: boolean;
    theme: Theme;
    borderRadius: number;
    barHeight: number;
  }) => css`
    position: relative;

    width: 100%;
    height: ${theme.typography.pxToRem(barHeight)};
    border-radius: ${borderRadius}px;

    overflow: hidden;

    background: ${isMultiValue ? theme.palette.background.default : theme.palette.grey['100']};
  `}
`;

export const ProgressBarFill = styled.div`
  ${({
    theme,
    barBackground,
    barHeight,
    borderRadius,
    barWidth,
    animationDuration = 1,
    isAnimationLinear,
  }: {
    theme: Theme;
    barBackground?: string;
    barWidth: number;
    borderRadius: number;
    barHeight: number;
    animationDuration?: number;
    isAnimationLinear?: boolean;
  }) => {
    const fillAnimation = keyframes`
      from {
        width: 0;
      }
      to {
        width: ${barWidth}%;
      }
    `;

    return css`
      position: absolute;
      top: 0;
      left: 0;

      height: ${theme.typography.pxToRem(barHeight)};
      width: ${barWidth}%;
      border-radius: ${borderRadius}px;

      background: ${barBackground};
      animation: ${fillAnimation} ${animationDuration}s ${isAnimationLinear ? 'linear' : 'ease-out'};
      z-index: 1;
    `;
  }}
`;

export const ProgressBarInnerBorder = styled.div`
  ${({
    isMultiValue,
    theme,
    borderRadius,
  }: {
    isMultiValue: boolean;
    theme: Theme;
    borderRadius: number;
  }) => css`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: ${borderRadius}px;
    border: ${isMultiValue ? `2px dashed ${theme.palette.gold.main}` : 0};
  `}
`;
