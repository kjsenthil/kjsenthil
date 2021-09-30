import styled, { css } from 'styled-components';
import { Box, Theme } from '@material-ui/core';
import React from 'react';

const StyledLabel = styled(({ bgColor, bgColorShade, ...props }) => <Box {...props} />)`
  ${({
    bgColor,
    bgColorShade,
    theme,
  }: {
    bgColor: string;
    bgColorShade: string;
    theme: Theme;
  }) => css`
    padding: ${theme.spacing(0.75)}px ${theme.spacing(1)}px;

    width: fit-content;
    height: ${theme.spacing(3.5)}px;

    background-color: ${theme.palette[bgColor][bgColorShade]};
    border-radius: 4px;

    text-align: center;
  `}
`;

export default StyledLabel;
