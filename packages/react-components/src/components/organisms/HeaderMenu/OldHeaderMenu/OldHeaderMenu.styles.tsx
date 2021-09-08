import styled, { css } from 'styled-components';
import { FormControlLabel, AppBar } from '../../../atoms';

export const SwitcherLabel = styled(FormControlLabel)`
  margin: 2px;
`;

export const StyledAppBar = styled(AppBar)`
  box-shadow: 1px 2px 44px 0 rgba(139, 139, 139, 0.26);
`;

export const LogoImage = styled.div`
  background-image: url('/PurpleBestInvest.svg');
  background-repeat: no-repeat;
  background-size: auto;
  height: 38px;
  width: 124px;
`;

export const DrawerContainer = styled.div`
  width: 300px;
`;

export const CashText = styled.div`
  ${({ align = 'right' }: { align: 'left' | 'right' }) => css`
    text-align: ${align};
    display: flex;
    flex-direction: column;
    white-space: nowrap;
  `}
`;
