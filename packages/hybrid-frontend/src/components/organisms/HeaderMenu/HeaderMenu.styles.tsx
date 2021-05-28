import styled from 'styled-components';
import { AppBar } from '../../atoms';

export const StyledAppBar = styled(AppBar)`
  box-shadow: 1px 2px 44px 0 rgba(139, 139, 139, 0.26);
`;

export const LogoImage = styled.div`
  ${({ theme }) => `
    padding-top: ${theme.spacing(3)}px;
    padding-right: ${theme.spacing(7)}px;
    padding-bottom: ${theme.spacing(1)}px;
    padding-left: ${theme.spacing(8)}px;

    background-image: url('/BlueBestInvest.svg');
    background-repeat: no-repeat;
    background-size: auto;
  `}
`;
