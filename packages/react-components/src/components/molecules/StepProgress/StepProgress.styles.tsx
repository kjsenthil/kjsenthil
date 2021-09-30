import styled, { css } from 'styled-components';
import { Theme } from '../../atoms';

export const ProgressStepWrapper = styled.div`
  ${({ theme: { typography, palette } }: { theme: Theme }) => css`
    height: ${typography.pxToRem(4)};
    width: 100%;
    border-radius: 2px;
    background-color: ${palette.grey[200]};
  `}
`;

export const ProgressStep = styled.div`
  ${({
    theme: { palette, typography },
    currentProgress,
  }: {
    theme: Theme;
    currentProgress: number;
  }) => css`
    height: ${typography.pxToRem(4)};
    width: ${currentProgress}%;
    border-radius: 2px;
    background-color: ${palette.primary.main};
  `}
`;

export const StepProgressWrapper = styled.div`
  ${({ theme }: { theme: Theme }) => css`
    display: flex;
    flex-direction: row;
    gap: ${theme.spacing(1.5)}px;
  `}
`;
