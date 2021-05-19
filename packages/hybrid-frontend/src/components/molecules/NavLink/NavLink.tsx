import styled from 'styled-components';
import { Link } from '../../atoms';

export const NavLink = styled(Link)`
  ${({ theme }) => `
    padding: ${theme.spacing(3)}px;
    text-decoration: none;
    color: ${theme.palette.primary.grey};
    display: inline-block;
    border-bottom: ${theme.spacing(0.5)}px solid ${theme.palette.background.paper};

    &:hover {
      color: ${theme.palette.primary.main};
      border-bottom: ${theme.spacing(0.5)}px solid ${theme.palette.primary.main};
      text-decoration: none;
      cursor: pointer;
    }

    &:focus {
      color: ${theme.palette.primary.main};
      border-bottom: ${theme.spacing(0.5)}px solid ${theme.palette.primary.main};
      text-decoration: none;
      cursor: pointer;
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
