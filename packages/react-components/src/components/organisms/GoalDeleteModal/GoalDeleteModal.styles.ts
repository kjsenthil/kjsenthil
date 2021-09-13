import styled from 'styled-components';
import { Theme } from '@material-ui/core';

export const ModalImageContainer = styled.div`
  text-align: center;
`;

export const ModalImage = styled.img<{
  isMobile: boolean;
}>`
  ${({ isMobile }) => `
    width: ${isMobile ? '100%' : '60%'};
  `}
`;

export const ModalDialogContainer = styled.div`
  ${({
    isMobile,
    theme: {
      typography: { pxToRem },
    },
  }: {
    theme: Theme;
    isMobile: boolean;
  }) => `
  text-align: center;
  padding: ${isMobile ? `${pxToRem(5)} 0` : `${pxToRem(10)} ${pxToRem(100)} ${pxToRem(20)}`};
  `}
`;
