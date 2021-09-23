import * as React from 'react';
import styled from 'styled-components';
import { Card, Theme, Link } from '../../atoms';

export const StyledMainCard = styled(({ isMobile, ...props }) => <Card {...props} />)`
  ${({
    theme: {
      palette,
      typography: { pxToRem },
    },
    isMobile,
  }: {
    theme: Theme;
    isMobile: boolean;
  }) => `
    padding: ${pxToRem(isMobile ? 20 : 40)};
    border-radius: ${pxToRem(16)};
    box-shadow: none;
    border: 1px solid ${palette.grey['200']};
  `}
`;

export const StyledLink = styled(Link)`
  ${({
    theme: {
      typography: { pxToRem },
    },
  }: {
    theme: Theme;
  }) => `
   padding: ${pxToRem(4)};
   letter-spacing:${pxToRem(0.26)};
 `}
`;
