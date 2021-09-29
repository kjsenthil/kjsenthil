import styled, { css } from 'styled-components';
import { Theme, Box } from '../../atoms';

export const BulletList = styled.ul`
  ${({
    theme: {
      palette,
      typography: { pxToRem },
    },
  }) => css`
  margin: ${pxToRem(12)} ${pxToRem(6)};
  padding: 0;

  
  li {
    list-style-type: none;
    margin-bottom: ${pxToRem(20)}; 
    position: relative;
    padding-left: ${pxToRem(20)};
    
    &::before {
      content: ' ';
      width: 8px;
      height: 8px;
      background: ${palette.primary.main};
      border-radius: 50%;
      position: absolute;
      left: 0;
      top: ${pxToRem(6)};
    }
`}
`;

export const StyledBox = styled(Box)`
  ${({
    theme: {
      typography: { pxToRem },
    },
    isMobile,
  }: {
    theme: Theme;
    isMobile: boolean;
  }) => css`
    display: ${isMobile ? 'block' : 'flex'};
    justify-content: ${isMobile ? 'flex-start' : 'space-between'};
    margin-top: ${isMobile ? pxToRem(4) : '0'};
  `}
`;

export const StyledDirectDebitIcon = styled.img`
  ${({
    theme: {
      typography: { pxToRem },
    },
    isMobile,
  }: {
    theme: Theme;
    isMobile: boolean;
  }) => css`
    padding: ${isMobile ? `${pxToRem(10)} 0 0 ${pxToRem(30)}` : '0'};
  `}
`;
