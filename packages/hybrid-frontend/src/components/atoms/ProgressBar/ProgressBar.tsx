import * as React from 'react';
import { Theme } from '@material-ui/core';
import styled, { keyframes, css } from 'styled-components';

export interface ProgressBarProps {
  progress: number;
}

const ProgressBarContainer = styled.div`
  ${({ theme }: { theme: Theme }) => `
    position: relative;
   
    width: 100%;
    height: ${theme.typography.pxToRem(8)};
    border-radius: 4px;
    
    overflow: hidden;
    
    background-color: ${theme.palette.grey['200']};
  `}
`;

const ProgressBarFill = styled.div`
  ${({ theme, progress }: { theme: Theme } & ProgressBarProps) => {
    const bgColor = theme.palette.tertiary.main;
    const bgLightColor = theme.palette.tertiary.light1;
    const width = progress * 100;

    const fillAnimation = keyframes`
      from {
        width: 0;
      }
      to {
        width: ${width}%;
      }
    `;

    return css`
      position: absolute;
      top: 0;
      left: 0;

      height: ${theme.typography.pxToRem(8)};
      width: ${width}%;
      border-radius: 4px;

      background-image: linear-gradient(to left, ${bgLightColor}, ${bgColor} 50%);
      animation: ${fillAnimation} 1s ease-out;
    `;
  }}
`;

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <ProgressBarContainer>
      <ProgressBarFill progress={progress} />
    </ProgressBarContainer>
  );
}
