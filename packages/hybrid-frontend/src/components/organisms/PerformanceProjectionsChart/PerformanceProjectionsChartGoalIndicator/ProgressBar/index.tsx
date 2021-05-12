import * as React from 'react';
import styled from 'styled-components';
import { Theme } from '../../../../atoms';

interface ProgressBarProps {
  progress: number;
  goalMet: boolean;
}

const ProgressBarContainer = styled.div`
  ${({ theme }: { theme: Theme }) => `
    position: relative;
    
    height: ${theme.typography.pxToRem(8)};
    width: ${theme.typography.pxToRem(44)};
    border-radius: 4px;
    
    overflow: hidden;
    
    background-color: ${theme.palette.grey['200']};
  `}
`;

const ProgressBarFill = styled.div`
  ${({ theme, progress, goalMet }: { theme: Theme } & ProgressBarProps) => `
    position: absolute;
    top: 0;
    left: 0;

    height: ${theme.typography.pxToRem(8)};
    width: ${theme.typography.pxToRem(44)};
    border-radius: 4px;

    background-color: ${goalMet ? theme.palette.tertiary.main : theme.palette.gold.main};

    transform: translateX(${progress * 100 - 100}%);
  `}
`;

export default function ProgressBar({ progress, goalMet }: ProgressBarProps) {
  return (
    <ProgressBarContainer>
      <ProgressBarFill progress={progress} goalMet={goalMet} />
    </ProgressBarContainer>
  );
}
