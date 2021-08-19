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

const Link = React.forwardRef(({ special, ...linkProps }: LinkProps, ref) => {
  const props = {
    color: 'primary',
    ...linkProps,
    underline: special ? 'always' : 'hover',
    component:
      (linkProps.onClick && !linkProps.href) || linkProps.href === '#' ? 'button' : undefined,
  } as MUILinkProps; // casting due to the absense of component property

  return <StyledLink {...props} innerRef={ref} />;
});

export default Link;
