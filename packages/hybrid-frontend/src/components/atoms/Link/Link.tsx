import * as React from 'react';
import { Link as MUILink, LinkProps as MUILinkProps, Theme } from '@material-ui/core';
import styled from 'styled-components';

const StyledLink = styled(MUILink)`
  ${({ theme }: { theme: Theme }) => `
    font-weight: bold;
    font-size: ${theme.typography.pxToRem(14)};
    font-family: ${theme.typography.fontFamily};
  `}
`;

export interface LinkProps extends Omit<MUILinkProps, 'color'> {
  special?: boolean;
}

const Link = React.forwardRef(({ special, ...props }: LinkProps, ref) => (
  <StyledLink
    color="primary"
    component={(props.onClick && !props.href) || props.href === '#' ? 'button' : undefined}
    {...props}
    ref={ref}
    underline={special ? 'always' : 'hover'}
  />
));

export default Link;
