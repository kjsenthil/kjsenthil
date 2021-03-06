import React from 'react';
import styled, { css } from 'styled-components';
import ListItem from '@material-ui/core/ListItem';
import { Grid, NavLink } from '@tswdts/react-components';

export const StyledHeader = styled.div`
  ${({ theme }) => `
    background-color: ${theme.palette.grey.light1};
    padding: ${theme.spacing(9)}px;
    svg { background-color: ${theme.palette.grey[200]};
    border-bottom: 1px solid ${theme.palette.grey.light1};
  `}
`;

export const StyledGrid = styled(({ isMobile, ...props }) => <Grid {...props} />)`
  ${({ isMobile }: { isMobile: boolean }) => css`
    overflow: auto;
    mask-image: ${isMobile
      ? `linear-gradient(to left, rgba(0, 0, 0, 0) 2%, rgba(0, 0, 0, 1) 20%)`
      : `none`};
  `}
`;

export const StyledNav = styled.nav`
  ${({ theme }) => `
    position: relative;
    background-color: ${theme.palette.common.white};
    border-bottom: 1px solid ${theme.palette.grey.light1};
  `}
`;

export const StyledLink = styled(NavLink)`
  ${({ theme }) => `
    white-space: nowrap;
    padding: ${theme.spacing(2)}px ${theme.spacing(2.75)}px;
    font-size: 0.75rem;
    line-height: 1.8;
    svg {
      vertical-align: middle;
      margin-bottom: -4px;
    }
  `}
`;

export const StyledListItem = styled(ListItem)`
  ${({ theme }) => `
    &:not(:last-child) {
      border-bottom: 2px solid ${theme.palette.grey[100]};
  `}
`;
