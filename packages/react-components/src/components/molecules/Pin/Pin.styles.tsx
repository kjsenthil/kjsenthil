import React from 'react';
import styled, { css } from 'styled-components';
import ReactPinField from 'react-pin-field';
import { Icon, Theme } from '../../atoms';

const ResponsivePinField = styled(({ isMobile, theme, innerRef, ...props }) => (
  <ReactPinField {...props} ref={innerRef} />
))`
  ${({ isMobile, theme }: { isMobile: boolean; theme: Theme }) => css`
    width: ${isMobile ? `${theme.spacing(4.375)}px` : '40px'};
    height: ${isMobile ? `${theme.spacing(4.375)}px` : '40px'};
    border: ${isMobile ? 'none' : `2px solid ${theme.palette.grey['100']}`};
    border-radius: 5px;
    margin-right: ${isMobile ? `${theme.spacing(1.25)}px` : `${theme.spacing(2.5)}px`};
    text-align: center;
    padding: 0;
    caret-color: transparent;
  `}
`;

const PinFieldInputWrapper = styled.div<{
  isMobile: boolean;
}>`
  ${({ isMobile, theme }: { isMobile: boolean; theme: Theme }) => `
    width: 65%;
    display: flex;
    input {
      width: ${isMobile ? `${theme.spacing(4.375)}px` : `${theme.spacing(5)}px`};
      height: ${isMobile ? `${theme.spacing(4.375)}px` : `${theme.spacing(5)}px`};
      font-weight: 600;
      font-size: 15px;
    }

    input:focus {
      border-color:${theme.palette.primary.main};
      outline: none;
    }
  `};
`;

const PinFieldHeaderWrapper = styled.div`
  ${({ theme }: { theme: Theme }) => `
    padding-bottom: ${theme.spacing(0.75)}px;
    padding-left: ${theme.spacing(0.5)}px;
  `};
`;

const Separator = styled.div<{
  isMobile: boolean;
}>`
  ${({ isMobile, theme }: { isMobile: boolean; theme: Theme }) => `
    background-color: ${theme.palette.grey['200']};
    border-radius: 10px;
    height: ${theme.spacing(4)}px;
    width: ${theme.spacing(0.375)}px;
    margin-top: ${theme.spacing(0.75)}px;
    display: ${isMobile ? 'none' : ''}
  `};
`;

const IconWithSpacing = styled(({ isMobile, theme, ...props }) => <Icon {...props} />)`
  ${({ isMobile, theme }: { isMobile: boolean; theme: Theme }) => `
    color: ${theme.palette.primary.main};
    margin-left: ${theme.spacing(1.875)}px;
    margin-top: ${theme.spacing(1.25)}px;
    display: ${isMobile ? 'none' : ''};
  `};
`;

export {
  IconWithSpacing,
  Separator,
  ResponsivePinField,
  PinFieldInputWrapper,
  PinFieldHeaderWrapper,
};
