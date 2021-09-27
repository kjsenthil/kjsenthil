import * as React from 'react';
import styled, { css } from 'styled-components';
import { Grid } from '../../atoms';
import { PillsNavigationTab } from '../../..';

export const FilterContainer = styled(({ ...props }) => <Grid {...props} />)`
  ${({ theme }) => css`
    max-width: ${theme.spacing(80)}px;
  `}
`;

export const ScrollWrapper = styled(({ ...props }) => <Grid {...props} />)`
  ${({ theme }) => css`
    overflow-x: auto;

    *::-webkit-scrollbar {
      height: 5px;
      width: 5px;
      padding: ${theme.spacing(2)}px;
    }

    *::-webkit-scrollbar-track:horizontal {
      background-color: ${theme.palette.grey.light2};
      border-radius: ${theme.spacing(1)}px;
      padding: ${theme.spacing(2)}px;
    }

    *::-webkit-scrollbar-thumb:horizontal {
      background-color: ${theme.palette.grey.main};
      border-radius: ${theme.spacing(1)}px;
    }

    *::-webkit-scrollbar-thumb:horizontal:hover {
      background-color: ${theme.palette.grey.light1};
      border-radius: ${theme.spacing(1)}px;
    }

    *::-webkit-scrollbar-thumb:horizontal:active {
      background-color: ${theme.palette.grey.light1};
      border-radius: ${theme.spacing(1)}px;
    }
  `}
`;

export const StyledPillsNavigationTab = styled(({ ...props }) => <PillsNavigationTab {...props} />)`
  .MuiTab-wrapper {
    display: unset;
    margin-top: -5px;
  }
  &.MuiTab-labelIcon .MuiTab-wrapper > *:first-child {
    margin-bottom: -8px;
    margin-left: -9px;
    margin-right: 4px;
  }
`;
