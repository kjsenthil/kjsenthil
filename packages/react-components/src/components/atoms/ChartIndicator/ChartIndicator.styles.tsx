import * as React from 'react';
import { SimplePaletteColorOptions, Theme } from '@material-ui/core';
import styled from 'styled-components';

export type ColorShade = keyof SimplePaletteColorOptions;
export type Color = keyof Theme['palette'];

interface StyleProps {
  theme: Theme;
  color?: Color;
  colorShade?: ColorShade;
}

const Div = ({ color, colorShade, ...props }) => <div {...props} />;

export const SolidIndicator = styled(Div)`
  ${({
    theme: {
      palette,
      typography: { pxToRem },
    },
    color = 'primary',
    colorShade = 'main',
  }: StyleProps) => `
    width: ${pxToRem(3)};
    min-height: ${pxToRem(24)};
    border-radius: 1.5px;
    background-color: ${palette[color][colorShade]};
  `}
`;

export const IndicatorDash = styled(Div)`
  ${({
    theme: {
      palette,
      typography: { pxToRem },
    },
    color = 'primary',
    colorShade = 'main',
  }: StyleProps) => `
    max-width: ${pxToRem(3)};
    height: 100%; 
    border-radius: 1.5px;
    background-color: ${palette[color][colorShade]};
  `}
`;

export const DashedIndicatorContainer = styled.div`
  ${({
    thick,
    theme: {
      typography: { pxToRem },
    },
  }: {
    thick: boolean;
    theme: Theme;
  }) => `
    height: ${pxToRem(24)};
    width: ${thick ? pxToRem(4) : pxToRem(3)};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: ${thick ? pxToRem(3) : pxToRem(1)};

  `}
`;

export const RectangleIndicator = styled(Div)`
  ${({
    theme: {
      palette,
      typography: { pxToRem },
    },
    color = 'primary',
    colorShade = 'light1',
  }: StyleProps) => `
    width: ${pxToRem(16)};
    height: ${pxToRem(24)};
    border-radius: 2px;
    background-color: ${palette[color][colorShade]};
  `}
`;
