import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Menu, Pill, Theme } from '../../atoms';

const show = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const PillIconDiv = styled.div`
  ${({ theme }: { theme: Theme }) => `
  right: 0;
  top: 0;
  padding: ${theme.spacing(0.625)}px 0 0 0;
  margin-right: -${theme.spacing(0.5)}px;
  display: none;
  `};
`;

const StyledPillWithMenu = styled(({ pillStayExpanded, theme, ...props }) => <Pill {...props} />)`
  ${({ pillStayExpanded, theme }: { pillStayExpanded: boolean; theme: Theme }) => css`
    font-size: 13px;
    font-weight: 600;
    line-height: 1.23;
    letter-spacing: 0.2px;
    text-align: center;
    margin: ${theme.spacing(0.188)}px ${theme.spacing(0.25)}px ${theme.spacing(0.313)}px 0;
    text-indent: 0;
    overflow: hidden;
    ${!pillStayExpanded ? ':hover' : ''} ${PillIconDiv} {
      animation: ${show} 0.2s ease-in;
      display: initial;
    }
  `}
`;

const StyledMenu = styled(Menu)`
  ${({ theme }: { theme: Theme }) => css`
    .MuiPaper-root {
      min-width: ${theme.spacing(31.85)}px;
      margin-top: ${theme.spacing(1)}px;
      border-radius: 6px;
      box-shadow: 0 ${theme.spacing(0.7)}px ${theme.spacing(3.5)}px 0 ${theme.palette.grey['200']};
      background-color: ${theme.palette.common.white};
    }
    .MuiListItemIcon-root {
      min-width: ${theme.spacing(4)}px;
      color: ${theme.palette.common.white};
    }

    .MuiTypography-root {
      margin: auto ${theme.spacing(1.094)}px auto ${theme.spacing(1.063)}px;
      line-height: 1.23;
      letter-spacing: 0.2px;
    }

    .MuiList-root {
      padding-top: 0;
      padding-bottom: 0;
    }

    .MuiButtonBase-root {
      border-bottom: 2px solid ${theme.palette.grey['100']};
      padding: ${theme.spacing(2.6)}px ${theme.spacing(1.5)}px ${theme.spacing(2.6)}px
        ${theme.spacing(2.0)}px;
    }
  `}
`;

const ParentDiv = styled.div`
  max-width: max-content;
  margin: 0;
`;

export { PillIconDiv, StyledMenu, StyledPillWithMenu, ParentDiv };
