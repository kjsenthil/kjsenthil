import styled from 'styled-components';
import { FormControlLabel, AppBar, Icon, Theme } from '../../atoms';
import { SubHeader } from '../../molecules';

export const SwitcherLabel = styled(FormControlLabel)`
  margin: 2px;
`;

export const StyledAppBar = styled(AppBar)`
  box-shadow: 1px 2px 44px 0 rgba(139, 139, 139, 0.26);
`;

// TODO: consider getting these colours from an extended palette
export const StyledSubHeader = styled(SubHeader)`
  ${({ theme }: { theme: Theme }) => `
  background: linear-gradient(267deg, #af61fe 20%, #7024fc 75%);
  color: white;
  padding-left: ${theme.typography.pxToRem(36)};
  padding-right: ${theme.typography.pxToRem(41)};
  
  @media (max-width: 830px) {
    padding: 0;
  }
  `}
`;

export const RotatedIcon = styled(Icon)`
  transform: rotate(-90deg);
`;

export const ModalContainer = styled.div`
  ${({ theme }: { theme: Theme }) => `
  position: absolute;
  z-index: 10;
  right: ${theme.typography.pxToRem(97)};
  top: ${theme.typography.pxToRem(60)};
  width: fit-content;
  
  @media (max-width: 830px) {
    right: 0;
  }
  `}
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
  ${({ align = 'right' }: { align: 'left' | 'right' }) => `
    text-align: ${align};
    display: flex;
    flex-direction: column;
    white-space: nowrap;
  `}
`;

export const MyAccountsContainer = styled.div`
  display: flex;
  column-gap: 0.5rem;
  align-items: center;
`;

export const CoachIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 0.875rem;
  justify-content: space-around;
  width: 100%;
`;

export const CoachTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CoachIcon = styled.div`
  ${({ coachIconUrl, theme }: { coachIconUrl: string; theme: Theme }) => `
    background-image: url(${coachIconUrl});
    background-size: contain;
    width: ${theme.typography.pxToRem(45)};
    height: ${theme.typography.pxToRem(45)};
    border: 0;
    image-rendering: -webkit-optimize-contrast;
  `}
`;
