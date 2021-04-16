import React from 'react';
import { Link as MUILink, LinkProps as MUILinkProps } from '@material-ui/core';
import styled from 'styled-components';

const StyledLink = styled(MUILink)`
  font-weight: bold;
  font-size: ${({ theme }) => theme.typography.pxToRem(14)}};
`;

export interface LinkProps extends Omit<MUILinkProps, 'color'> {
  special?: boolean;
}

const Link = ({ special, ...props }: LinkProps) => (
  <StyledLink
    color="primary"
    component={(props.onClick && !props.href) || props.href === '#' ? 'button' : undefined}
    {...props}
    underline={special ? 'always' : 'hover'}
  />
);

export default Link;
