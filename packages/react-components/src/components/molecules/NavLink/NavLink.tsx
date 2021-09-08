import * as React from 'react';
import styled, { css } from 'styled-components';
import { Link, Theme } from '../../atoms';

const selectedStyle = (theme: Theme, isMobile: boolean) => css`
  color: ${theme.palette.primary.dark};
  text-decoration: none;
  border-left: ${isMobile ? `5px solid ${theme.palette.primary.main}` : 'unset'};
  border-bottom: ${isMobile ? `unset` : `2.7px solid ${theme.palette.primary.main}`};
  cursor: pointer;
  padding: ${isMobile ? '16px 15px 14px 11px' : '40px 20px 28.7px 20px'};
`;

// font-family explicitly set to account for Safari font override
export const NavLink = styled(({ selected, isMobile, ...props }) => (
  <Link variant="link" {...props} />
))`
  ${({ theme, selected, isMobile }: { theme: Theme; selected?: boolean; isMobile: boolean }) => css`
    color: ${isMobile ? theme.palette.primary.dark : theme.palette.grey[400]};
    background-color: ${isMobile ? theme.palette.grey[100] : 'unset'};
    width: ${isMobile ? '258px' : 'unset'};
    height: ${isMobile ? '48px' : 'unset'};
    padding: ${isMobile ? '16px 16px 14px' : '40px 20px 31px 20px'};
    margin-right: ${isMobile ? '10px' : 'unset'};
    border-radius: ${isMobile ? '8px' : '0'};
    text-decoration: none;
    font-family: ${theme.typography.fontFamily};
    display: inline-block;

    ${selected ? selectedStyle(theme, isMobile) : ``};

    &:hover {
      ${selectedStyle(theme, isMobile)}
    }
  `}
`;

export default NavLink;
