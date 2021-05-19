import { Theme } from '@material-ui/core';
import styled from 'styled-components';

const sharedTagStyle = ({
  theme: {
    typography: { pxToRem },
  },
}: {
  theme: Theme;
}) => `
  min-width: ${pxToRem(55)};
  width: fit-content;
  height: ${pxToRem(28)};
  padding: ${pxToRem(6)} ${pxToRem(9.5)};
  border-radius: 4px;
  text-align: center;
`;

export const PercentageTag = styled.div`
  ${({ color, theme }: { color: 'success' | 'gold'; theme: Theme }) => `
    display: inline-block;
    padding: ${theme.spacing(1 / 8)}px ${theme.spacing(0.5)}px;
    height: ${theme.typography.pxToRem(16.8)};
    border-radius: 2px;
    background-color: ${theme.palette[color].main};
  `}
`;

export const LabelTag = styled.div`
  ${({ theme }: { theme: Theme }) => `
    ${sharedTagStyle({ theme })}
    background-color: ${theme.palette.grey['100']};
    text-transform: uppercase;
  `}
`;

export const BadgeTag = styled.div`
  ${({ theme }: { theme: Theme }) => `
    ${sharedTagStyle({ theme })}
    background-color: ${theme.palette.common.white};
  `}
`;
