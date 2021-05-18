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
  ${({ theme, color = 'primary', colorShade = 'main' }: StyleProps) => `
    width: ${theme.typography.pxToRem(18)};
    height: ${theme.typography.pxToRem(3)};
    border-radius: 1.5px;
    background-color: ${theme.palette[color][colorShade]};
  `}
`;

export const IndicatorSquare = styled(Div)`
  ${({ theme, color = 'primary', colorShade = 'main' }: StyleProps) => `
    width: ${theme.typography.pxToRem(5)};
    height: ${theme.typography.pxToRem(3)};
    border-radius: 1.5px;
    background-color: ${theme.palette[color][colorShade]};
  `}
`;

export const DottedIndicatorContainer = styled.div`
  display: flex;
  gap: 1px;
`;

export const DoubleSolidIndicatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const GradientIndicator = styled(Div)`
  ${({
    theme,
    color = 'primary',
    topShade = 'light2',
    bottomShade = 'light1',
  }: StyleProps & { topShade: ColorShade; bottomShade: ColorShade }) => `
    min-width: ${theme.typography.pxToRem(17)};
    width: ${theme.typography.pxToRem(17)};
    height: ${theme.typography.pxToRem(20)};
    border-radius: 8px;
    background-image: linear-gradient(to bottom, ${theme.palette[color][topShade]} 45%, ${
    theme.palette[color][bottomShade]
  } 53%);
  `}
`;
