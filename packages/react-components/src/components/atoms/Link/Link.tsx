import * as React from 'react';
import { Link as MUILink, LinkProps as MUILinkProps } from '@material-ui/core';
import styled from 'styled-components';
import { Require } from '../../../utils/common';
import { Color, ColorShade } from '../Typography/Typography';

const StyledLink = styled(({ color, colorShade, innerRef, ...props }: StyledLinkProps) => (
  <MUILink {...props} innerRef={innerRef} />
))`
  ${({ theme, color, colorShade }) => `
    font-weight: bold;
    font-size: ${theme.typography.pxToRem(14)};
    font-family: ${theme.typography.fontFamily};
    color: ${theme.palette[color][colorShade]};
  `}
`;

export interface LinkProps extends Omit<MUILinkProps, 'color' | 'underline'> {
  special?: boolean;
  color?: Color;
  colorShade?: ColorShade;
}

interface StyledLinkProps extends Require<LinkProps, 'color' | 'colorShade'> {
  underline: 'always' | 'hover';
  innerRef: React.ForwardedRef<any>;
  component?: 'button';
}

const Link = React.forwardRef(
  ({ special, color = 'primary', colorShade = 'main', ...linkProps }: LinkProps, innerRef) => {
    const props: StyledLinkProps = {
      color,
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
