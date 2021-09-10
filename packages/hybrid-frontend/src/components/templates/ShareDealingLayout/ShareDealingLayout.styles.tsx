import * as React from 'react';
import styled from 'styled-components';
import { Theme, Dialog, DialogContent } from '@tswdts/react-components';

interface ShareDealingStyleProps {
  theme: Theme;
  isMobile: boolean;
  isEndState?: boolean;
}

export const ShareDealingModal = styled(({ isMobile, isEndState, ...props }) => (
  <Dialog {...props} />
))`
  ${({
    isMobile,
    isEndState,
    theme: {
      palette,
      typography: { pxToRem },
    },
  }: ShareDealingStyleProps) => `

    position: relative;

    .MuiPaper-rounded {
      border-radius: ${pxToRem(16)};
    }

    .MuiDialog-paper {
      margin: ${isMobile ? pxToRem(20) : 'initial'};
      background:${
        isEndState ? `${palette.grey[50]} url(./logo-background.png) no-repeat` : 'white'
      };

    }

    .MuiDialog-paperFulLg {
      max-width: ${isMobile ? 'fit-content' : 'default'};
    }
  
    .MuiDialog-paperWidthFalse {
      max-width: inherit;
    }

    .MuiDialog-paperScrollBody {
      display: ${isMobile ? 'block' : 'inline-block'};
    }
  `}
`;

export const ShareDealingTitleContainer = styled.div`
  ${({
    isMobile,
    theme: {
      typography: { pxToRem },
    },
  }: ShareDealingStyleProps) => `
    padding: ${pxToRem(40)} ${pxToRem(104)} ${pxToRem(36)} ${pxToRem(104)};
    ${isMobile ? `padding: ${pxToRem(24)} ${pxToRem(20)};` : ''}
      box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.07);
  `}
`;

export const ShareDealingEndStateTitleContainer = styled.div`
  ${({
    theme: {
      typography: { pxToRem },
    },
  }: Pick<ShareDealingStyleProps, 'theme'>) => `
    display: block;
    text-align: center;
    padding: ${pxToRem(24)} ${pxToRem(20)} ${pxToRem(20)} ${pxToRem(20)};
  `}
`;

export const ShareDealingContent = styled(({ isMobile, isEndState, ...props }) => (
  <DialogContent {...props} />
))`
  ${({
    isMobile,
    isEndState,
    theme: {
      typography: { pxToRem },
    },
  }: ShareDealingStyleProps) => `
    padding: ${
      isEndState
        ? `${pxToRem(0)} ${pxToRem(40)} ${pxToRem(40)} ${pxToRem(40)};`
        : `${pxToRem(40)} ${pxToRem(104)}`
    };
    ${isMobile ? `padding: ${pxToRem(0)} ${pxToRem(16)} ${pxToRem(16)} ${pxToRem(16)};` : ''}
  `}
`;

export const ShareDealingCloseButtonWrapper = styled.div`
  ${({
    isMobile,
    theme: {
      typography: { pxToRem },
    },
  }: ShareDealingStyleProps) => `
    position: absolute;
    right: ${pxToRem(isMobile ? 2 : 60)};
    top: ${pxToRem(isMobile ? 8 : 29)};
  `}
`;
