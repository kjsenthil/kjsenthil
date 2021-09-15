/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import styled from 'styled-components';
import { Theme, DialogContent } from '@tswdts/react-components';

interface ShareDealingStyleProps {
  theme: Theme;
  isMobile: boolean;
  isEndState?: boolean;
}

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
