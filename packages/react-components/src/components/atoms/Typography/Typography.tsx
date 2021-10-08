import React, { CSSProperties } from 'react';
import {
  Theme,
  SimplePaletteColorOptions,
  Typography as MUITypography,
  TypographyProps as MUITypographyProps,
} from '@material-ui/core';
import styled from 'styled-components';

export type ColorShade = keyof SimplePaletteColorOptions;
export type Color = 'primary' | 'secondary' | 'tertiary' | 'white' | 'black' | 'grey' | 'error';
export type Variant = keyof typeof variantComponentMap;
export type FontStyle = CSSProperties['fontStyle'];

export interface TypographyProps extends Omit<MUITypographyProps, 'color' | 'variant'> {
  color?: Color | 'inherit';
  colorShade?: ColorShade;
  variant?: Variant;
  spaceNoWrap?: boolean;
  fontWeight?: string;
  fontStyle?: FontStyle;
  component?: React.ElementType;
}

const determineColor = ({
  color,
  palette,
  variant = 'b5',
  colorShade,
}: Pick<TypographyProps, 'color' | 'colorShade' | 'variant'> & { palette: Theme['palette'] }) => {
  if (color === 'inherit') {
    return 'inherit';
  }
  if (['black', 'white'].includes(color as Color)) {
    return palette.common[color as Color];
  }
  if (['primary', 'secondary', 'tertiary', 'grey', 'error'].includes(color as Color)) {
    return palette[color as Color][colorShade || 'main'];
  }
  if (['b1', 'b2', 'b3', 'b4', 'b5'].includes(variant)) {
    return palette.common.black;
  }
  return palette.primary[colorShade || 'dark2'];
};

const sizes = {
  h1: { fontSize: 56, lineHeight: 'normal', letterSpacing: 0.4, fontWeight: 800 },
  h2: { fontSize: 38, lineHeight: 'normal', letterSpacing: 0.7, fontWeight: 800 },
  h3: { fontSize: 26, lineHeight: 'normal', letterSpacing: 0.4, fontWeight: 800 },
  h4: { fontSize: 22, lineHeight: 28, letterSpacing: 0.3, fontWeight: 800 },
  h5: { fontSize: 18, lineHeight: 28, letterSpacing: 0.3, fontWeight: 800 },
  sh1: { fontSize: 17, lineHeight: 24, letterSpacing: 0.3, fontWeight: 600 },
  sh2: { fontSize: 15, lineHeight: 20, letterSpacing: 0.2, fontWeight: 600 },
  sh3: { fontSize: 13, lineHeight: 16, letterSpacing: 0.2, fontWeight: 600 },
  sh4: { fontSize: 12, lineHeight: 16, letterSpacing: 0.2, fontWeight: 600 },
  sh5: { fontSize: 11, lineHeight: 16, letterSpacing: 0.2, fontWeight: 600 },
  b1: { fontSize: 22, lineHeight: 28, letterSpacing: 0.5, fontWeight: 'normal' },
  b2: { fontSize: 16, lineHeight: 24, letterSpacing: 0.3, fontWeight: 'normal' },
  b3: { fontSize: 14, lineHeight: 28, letterSpacing: 0.3, fontWeight: 'normal' },
  b4: { fontSize: 12, lineHeight: 20, letterSpacing: 0.3, fontWeight: 'normal' },
  b5: { fontSize: 11, lineHeight: 16, letterSpacing: 0.3, fontWeight: 'normal' },
  link: { fontSize: 13, lineHeight: 16, letterSpacing: 0.2, fontWeight: 600 },
  i1: { fontSize: 12, lineHeight: 'normal', letterSpacing: 0.09, fontWeight: 'normal' },
};

export const typographyCss = ({
  colorShade,
  variant = 'b3',
  fontStyle = 'normal',
  color,
  fontWeight: customFontWeight,
  spaceNoWrap,
  theme: {
    palette,
    typography: { pxToRem },
  },
}: Omit<TypographyProps, 'component'> & { theme: Theme }) => {
  const { fontSize, lineHeight, letterSpacing, fontWeight = customFontWeight } = sizes[variant];
  return `
    font-size: ${pxToRem(fontSize)};
    font-style: ${fontStyle};
    line-height: ${lineHeight === 'normal' ? lineHeight : pxToRem(Number(lineHeight))};
    letter-spacing: ${pxToRem(letterSpacing)};
    font-weight: ${fontWeight};
    color: ${determineColor({ color, palette, variant, colorShade })};
    white-space: ${spaceNoWrap ? 'nowrap' : 'break-spaces'};
`;
};
const StyledTypography = styled(({ variant, colorShade, color, spaceNoWrap, ...props }) => (
  <MUITypography {...props} />
))`
  ${(props) => typographyCss(props)}
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
  sh5: 'h6',
  b1: 'p',
  b2: 'p',
  b3: 'p',
  b4: 'p',
  b5: 'p',
  link: 'a',
  i1: 'p',
};

const Typography = ({ variant = 'b5', ...props }: TypographyProps) => (
  <StyledTypography variant={variant} component={variantComponentMap[variant]} {...props} />
);

export default Typography;
