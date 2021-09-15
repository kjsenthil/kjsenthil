import * as React from 'react';
import styled, { css } from 'styled-components';
import { Grid, Link, Theme } from '../../atoms';

export const ItemContainer = styled(({ isHeader, shouldFillBackground, hasRadius, ...props }) => (
  <Grid {...props} />
))`
  ${({
    theme: {
      spacing,
      typography: { pxToRem },
    },
  }: {
    theme: Theme;
  }) => css`
    padding: ${pxToRem(spacing(2))} 0;
  `}
`;

export const LinkWithIcon = styled(Link)`
  display: flex;
  align-items: center;
`;

export const IconStyle = styled.span`
  ${({
    theme: {
      typography: { pxToRem },
    },
  }: {
    theme: Theme;
  }) => css`
    font-size: ${pxToRem(15)};
    line-height: 0;
  `}
`;

export const ItemValue = styled(Grid)`
  text-align: right;
`;
