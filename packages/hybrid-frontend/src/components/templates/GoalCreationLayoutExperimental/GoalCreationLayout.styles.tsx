import styled from 'styled-components';
import { AppBar, Toolbar, Typography } from '../../atoms';

export const StyledAppBar = styled(AppBar)`
  ${({ theme }) => `
    background-color: ${theme.palette.common.white};
    box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.07);
    padding: ${theme.spacing(2)}px;
  `}
`;

export const StyledToolBar = styled(Toolbar)`
  ${({ theme }) => `
    min-height: ${theme.spacing(12)}px;
  `}
`;

export const GoalTitle = styled(Typography)`
  ${({ theme }) => `
   font-size: ${theme.typography.pxToRem(30)};
   font-weight: bold;
   color: ${theme.palette.grey.dark2}
  `}
`;

export const GoalTitleIcon = styled.img`
  ${({ theme }) => `
    width: ${theme.spacing(7)}px;
    height: ${theme.spacing(7)}px;
    border-radius: ${theme.spacing(5)}px;
    object-fit: cover;
    object-position: center;
  `}
`;
