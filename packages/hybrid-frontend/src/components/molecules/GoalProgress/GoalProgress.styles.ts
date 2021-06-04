import styled from 'styled-components';
import { Theme } from '../../atoms';

export const GoalProgressContainer = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: grid;
    grid: 20px 8px / 28px 1fr;
    column-gap: ${theme.spacing(1)}px;
  `}
`;

export const GoalIconContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
`;

export const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const GoalIcon = styled.img`
  ${({
    theme: {
      typography: { pxToRem },
      palette: { tertiary },
    },
  }: {
    theme: Theme;
  }) => `
    width: ${pxToRem(28)};
    height: ${pxToRem(28)};
    border: 1px solid ${tertiary.main};
    border-radius: 8px;
    object-fit: cover;
    object-position: center;
  `}
`;
