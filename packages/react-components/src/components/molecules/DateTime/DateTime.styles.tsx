import React from 'react';
import styled from 'styled-components';
import { Box, Theme, Icon } from '../../atoms';

export const StyledBox = styled(Box)`
  display: flex;
  text-align: right;
`;

export const StyledIcon = styled(({ isExpiring, ...props }) => <Icon {...props} />)`
  ${({
    theme: {
      palette,
      spacing,
      typography: { pxToRem },
    },
    isExpiring,
  }: {
    theme: Theme;
    isExpiring: boolean;
  }) => `
    margin-left: ${spacing(1)}px;
    font-size: ${pxToRem(32)};
    vertical-align: top;
    color: ${isExpiring ? palette.success.main : palette.error.main};
  `}
`;
