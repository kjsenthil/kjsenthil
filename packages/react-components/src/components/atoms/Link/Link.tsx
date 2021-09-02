import * as React from 'react';
import { Link as MUILink, LinkProps as MUILinkProps, Theme } from '@material-ui/core';
import styled from 'styled-components';
import { Require } from '../../../utils/common';
import { Color, ColorShade, Variant, typographyCss } from '../Typography';

export interface LinkProps extends Omit<MUILinkProps, 'color' | 'underline' | 'variant'> {
  special?: boolean;
  color?: Color | 'inherit';
  colorShade?: ColorShade;
  variant?: Variant;
}

interface StyledLinkProps extends Require<LinkProps, 'color' | 'colorShade' | 'variant'> {
  underline: 'always' | 'hover';
  innerRef: React.ForwardedRef<any>;
  component?: 'button';
}

const StyledLink = styled(({ color, colorShade, variant, innerRef, ...props }: StyledLinkProps) => (
  <MUILink {...props} innerRef={innerRef} />
))`
  ${({
    theme,
    variant,
    color,
    colorShade,
  }: {
    theme: Theme;
    variant: Variant;
    color: Color | 'inherit';
    colorShade: ColorShade;
  }) => `
    ${typographyCss({ variant, theme, color, colorShade })};
  `}
`;

const Link = React.forwardRef(
  (
    { special, variant = 'sh3', color = 'primary', colorShade = 'main', ...linkProps }: LinkProps,
    innerRef
  ) => {
    const props: StyledLinkProps = {
      color,
      variant,
      colorShade,
      ...linkProps,
      innerRef,
      underline: special ? 'always' : 'hover',
      component:
        (linkProps.onClick && !linkProps.href) || linkProps.href === '#' ? 'button' : undefined,
    };

    return <StyledLink {...props} />;
  }
);

export default Link;
