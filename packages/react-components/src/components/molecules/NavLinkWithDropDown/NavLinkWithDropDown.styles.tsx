import * as React from 'react';
import styled, { css } from 'styled-components';
import { ListItem, Theme, List, Icon } from '../../atoms';
import NavLink from '../NavLink';

export const StyledDropDownContainer = styled(({ isMobile, ...props }) => <div {...props} />)`
  ${({ isMobile }: { isMobile: boolean }) => css`
    width: ${isMobile ? '300px' : 'fit-content'};
    display: flex;
    align-items: center;
  `}
`;

export const StyledDropDownIcon = styled(({ isMobile, listExpanded, ...props }) => (
  <Icon {...props} />
))`
  ${({
    theme,
    isMobile,
    listExpanded,
  }: {
    isMobile: boolean;
    listExpanded: boolean;
    theme: Theme;
  }) => css`
    margin-top: ${isMobile ? '0' : '10px'};
    margin-left: ${isMobile ? '-21%' : '-14px'};
    transform: rotate(${listExpanded ? '180deg' : '0'});
    color: ${theme.palette.primary.main};
    ${!listExpanded &&
    `
    margin-right: 13px;`}
  `}
`;

export const StyledListItem = styled(({ isMobile, ...props }) => <ListItem {...props} />)`
  ${({ isMobile }: { isMobile: boolean }) => css`
    padding: ${isMobile ? '8px 16px' : '0 0'};

    &:hover {
      background-color: transparent;
    }
  `}
`;

export const StyledNavLink = styled(({ isMobile, ...props }) => (
  <NavLink isMobile={isMobile} {...props} />
))`
  ${({ isMobile }: { isMobile: boolean }) => css`
    padding-right: ${isMobile ? '5px' : '20px'};
    padding-top: ${isMobile ? '16px' : '40px'};
    &:hover {
      margin-right: 0;
      padding-bottom: ${isMobile ? '14px' : '28.7px'};
      padding-top: ${isMobile && '16px'};
    }
  `}
`;

export const StyledList = styled(({ isMobile, ...props }) => <List {...props} />)`
  ${({ isMobile, theme }: { isMobile: boolean; theme: Theme }) => css`
    ${!isMobile &&
    `
      width: 220px;
      z-index: 1;
      background-color: ${theme.palette.background.default};
      margin-right: -70px;
      box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
    `}
  `}
`;

export const StyledChildListItem = styled(ListItem)`
  width: 100%;
`;

export const StyledChildNavLink = styled(({ isMobile, ...props }) => (
  <NavLink variant="link" isMobile={isMobile} {...props} />
))`
  ${({ isMobile }: { isMobile: boolean }) => css`
    background-color: unset;
    border-radius: unset;
    padding: 0;
    height: unset;
    padding-left: ${isMobile ? '10px' : '0'};
    &:hover {
      border-left: none;
      background-color: transparent;
      padding: ${isMobile ? '0 0 0 10px' : '0 0 0 0'};
      margin-left: 0;
      margin-right: 0;
      border-bottom: unset;
    }
  `}
`;
