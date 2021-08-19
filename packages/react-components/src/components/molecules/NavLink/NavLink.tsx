import * as React from 'react';
import styled from 'styled-components';
import { Link, Theme } from '../../atoms';

const selectedStyle = (theme: Theme) => `
  color: ${theme.palette.primary.main};
  border-bottom: ${theme.spacing(0.5)}px solid ${theme.palette.primary.main};
  text-decoration: none;
  cursor: pointer;
`;

export const NavLink = styled(({ selected, ...props }) => <Link {...props} />)`
  ${({ theme, selected }: { theme: Theme; selected?: boolean }) => `
    padding: ${theme.spacing(3)}px;
    text-decoration: none;
    color: ${theme.palette.grey['300']};
    display: inline-block;
    border-bottom: ${theme.spacing(0.5)}px solid ${theme.palette.background.paper};

    ${selected ? selectedStyle(theme) : ``};

    &:hover {
      ${selectedStyle(theme)};
    }

    &:hover h6.MuiTypography-root {
      color: ${theme.palette.primary.main};
    }

    &:focus h6.MuiTypography-root {
      color: ${theme.palette.primary.main};
    }
  `}
`;

export default NavLink;
