import React from 'react';
import {
  Typography as MUITypography,
  TypographyProps as MUITypographyProps,
} from '@material-ui/core';
import styled from 'styled-components';
import { Palette, SimplePaletteColorOptions } from '@material-ui/core/styles/createPalette';

export type ColorShade = keyof SimplePaletteColorOptions;
export type Color = 'primary' | 'secondary' | 'tertiary' | 'white' | 'black' | 'grey' | 'error';
export type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'sh1'
  | 'sh2'
  | 'sh3'
  | 'sh4'
  | 'b1'
  | 'b2'
  | 'b3';

export interface TypographyProps
  extends Omit<MUITypographyProps, 'color' | 'component' | 'variant'> {
  color?: Color | 'inherit';
  colorShade?: ColorShade;
  variant?: Variant;
}

const determineColor = (
  color: Color,
  palette: Palette,
  variant: Variant = 'b3',
  colorShade?: ColorShade
) => {
  if (['black', 'white'].includes(color)) {
    return palette.common[color];
  }
  if (['primary', 'secondary', 'tertiary', 'grey', 'error'].includes(color)) {
    return palette[color][colorShade || 'main'];
  }
  if (['b1', 'b2', 'b3'].includes(variant)) {
    return palette.common.black;
  }
  return palette.primary[colorShade || 'dark2'];
};

const sizes = {
  h1: { fontSize: 56, lineHeight: 68, letterSpacing: 0.9, fontWeight: 900 },
  h2: { fontSize: 40, lineHeight: 48, letterSpacing: 0.7, fontWeight: 900 },
  h3: { fontSize: 28, lineHeight: 32, letterSpacing: 0.4, fontWeight: 900 },
  h4: { fontSize: 24, lineHeight: 28, letterSpacing: 0.3, fontWeight: 900 },
  h5: { fontSize: 20, lineHeight: 24, letterSpacing: 0.3, fontWeight: 900 },
  sh1: { fontSize: 18, lineHeight: 20, letterSpacing: 0.3, fontWeight: 'bold' },
  sh2: { fontSize: 16, lineHeight: 20, letterSpacing: 0.3, fontWeight: 'bold' },
  sh3: { fontSize: 14, lineHeight: 16, letterSpacing: 0.3, fontWeight: 'bold' },
  sh4: { fontSize: 12, lineHeight: 16, letterSpacing: 0.3, fontWeight: 'bold' },
  b1: { fontSize: 24, lineHeight: 28, letterSpacing: 0.5, fontWeight: 'normal' },
  b2: { fontSize: 14, lineHeight: 20, letterSpacing: 0.3, fontWeight: 'normal' },
  b3: { fontSize: 12, lineHeight: 16, letterSpacing: 0.3, fontWeight: 'normal' },
};

const StyledTypography = styled(({ variant, colorShade, color, ...props }) => (
  <MUITypography {...props} />
))`
  ${({
    colorShade,
    variant,
    color,
    fontWeight,
    theme: {
      palette,
      typography: { pxToRem },
    },
  }) => {
    const variantSizes = sizes[variant];
    return `
      font-size: ${pxToRem(variantSizes?.fontSize)};
      line-height: ${pxToRem(variantSizes?.lineHeight)};
      letter-spacing: ${pxToRem(variantSizes?.letterSpacing)};
      font-weight: ${fontWeight || variantSizes?.fontWeight};
      color: ${determineColor(color, palette, variant, colorShade)};
  `;
  }}
`;

export const variantComponentMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  sh1: 'h6',
  sh2: 'h6',
  sh3: 'h6',
  sh4: 'h6',
  b1: 'p',
  b2: 'p',
  b3: 'p',
};

const Typography = ({ variant = 'b3', ...props }: TypographyProps) => (
  <StyledTypography variant={variant} component={variantComponentMap[variant]} {...props} />
);

export default Typography;
