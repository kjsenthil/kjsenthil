import * as React from 'react';
import styled, { css } from 'styled-components';
import { Icon, Theme, Button } from '../../atoms';

export const StyledButton = styled(Button)`
  ${({
    theme: {
      palette,
      typography: { pxToRem },
    },
  }) => css`
    appearance: none;
    border-bottom: 1px solid ${palette.grey[200]};
    border-radius: 0;
    color: ${palette.primary.dark2};
    font-size: ${pxToRem(13)};
    padding: 0;
    width: 100%;

    &:hover,
    &:active,
    &:focus {
      background: none;
    }

    &:hover {
      border-bottom: 1px solid ${palette.primary.light2};
      color: ${palette.primary.main};
    }

    .MuiButton-label {
      justify-content: space-between;
    }
  `}
`;

export const BulletList = styled.ul`
  ${({
    theme: {
      palette,
      typography: { pxToRem },
    },
  }) => css`
  margin: ${pxToRem(12)} 0 0;
  padding: 0;

  li {
    list-style-type: none;
    margin-bottom: ${pxToRem(20)}; 
    position: relative;
    padding-left: ${pxToRem(20)};
    
    &::before {
      content: ' ';
      width: 8px;
      height: 8px;
      background: ${palette.primary.main};
      border-radius: 50%;
      position: absolute;
      left: 0;
      top: ${pxToRem(6)};
    }
`}
`;

export const StyledIcon = styled(({ listExpanded, ...props }) => <Icon {...props} />)`
  ${({ theme, listExpanded }: { theme: Theme; listExpanded: boolean }) => css`
    color: ${theme.palette.primary.main};
    transform: rotate(${listExpanded ? '180deg' : '0'});
  `}
`;
