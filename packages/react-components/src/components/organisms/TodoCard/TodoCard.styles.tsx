import React from 'react';
import { Theme } from '@material-ui/core';
import styled, { css } from 'styled-components';
import { Avatar, CardActionArea } from '../../atoms';

export const TodoCardContainer = styled(({ ...props }) => <CardActionArea {...props} />)`
  ${({ theme }: { theme: Theme }) => css`
    max-width: 395px;
    max-height: 240px;

    padding-top: ${theme.spacing(2.5)}px;
    padding-bottom: ${theme.spacing(4)}px;
    padding-left: ${theme.spacing(2.5)}px;
    padding-right: ${theme.spacing(1.25)}px;

    background-color: ${theme.palette.background.paper};
    box-shadow: none;

    border-width: 1px;
    border-style: solid;
    border-radius: 16px;
    border-color: ${theme.palette.grey['200']};
  `}
`;

export const StyledAvatar = styled(Avatar)`
  ${({ theme }: { theme: Theme }) => css`
    background-color: ${theme.palette.grey[100]};
  `}
`;
