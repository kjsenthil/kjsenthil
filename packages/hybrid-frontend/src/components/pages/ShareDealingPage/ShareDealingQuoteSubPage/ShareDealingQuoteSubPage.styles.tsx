import * as React from 'react';
import styled from 'styled-components';
import { Grid, Icon, Theme } from '@tswdts/react-components';

export const EditLinkWrapper = styled(Grid)`
  ${({
    theme: {
      typography: { pxToRem },
    },
  }: {
    theme: Theme;
  }) => `
    padding-right: ${pxToRem(10)};
    text-align: right;
    text-align: -moz-right;
    text-align: -webkit-right;
  `}
`;

export const StyledIcon = styled(({ hasQuoteExpired, ...props }) => <Icon {...props} />)`
  ${({
    theme: {
      palette,
      typography: { pxToRem },
    },
    hasQuoteExpired,
  }: {
    theme: Theme;
    hasQuoteExpired: boolean;
  }) => `
    color: ${hasQuoteExpired ? palette.error.main : palette.success.main};
    font-size: ${pxToRem(28)};
    margin-top: ${pxToRem(4)};
  `}
`;
