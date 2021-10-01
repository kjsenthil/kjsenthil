import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Theme, useTheme } from '@material-ui/core';
import styled, { css } from 'styled-components';
import { Grid } from '../../atoms';

export interface ReceiptTotalProps {
  shouldFillBottom: boolean;
}

export const ReceiptResultSeparatorWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const SEPARATOR_HEIGHT = 18;
const RADIUS = 16;

const StyledSvgIcon = styled(SvgIcon)`
  ${({
    theme: {
      typography: { pxToRem },
    },
  }: {
    theme: Theme;
  }) => css`
    &.MuiSvgIcon-root {
      width: ${pxToRem(9)};
      height: ${pxToRem(SEPARATOR_HEIGHT)};
    }
  `}
`;

export const ReceiptCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ReceiptCardListPart = styled.div`
  ${({
    theme: {
      palette,
      typography: { pxToRem },
    },
  }: {
    theme: Theme;
  }) => css`
    border-top-left-radius: ${pxToRem(RADIUS)};
    border-top-right-radius: ${pxToRem(RADIUS)};
    border: 1px solid ${palette.grey[200]};
    border-bottom: 0px;
    min-height: 150px;
    background-color: ${palette.common.white};
  `}
`;

export const ReceiptCardTotalPart = styled.div`
  ${({
    theme: {
      palette,
      typography: { pxToRem },
    },
    shouldFillBottom,
  }: { theme: Theme } & ReceiptTotalProps) => css`
    border-bottom-left-radius: ${pxToRem(RADIUS)};
    border-bottom-right-radius: ${pxToRem(RADIUS)};
    border: 1px solid ${palette.grey[200]};
    border-top: 0px;
    min-height: 70px;
    background-color: ${shouldFillBottom ? palette.grey[50] : palette.common.white};
  `}
`;

export const ReceiptCardSeparatorCut = ({
  shouldFillBottom,
  inverted,
}: ReceiptTotalProps & { inverted: boolean }) => {
  const theme = useTheme();
  return (
    <StyledSvgIcon viewBox="0 0 10 20">
      <g
        transform={
          inverted
            ? 'translate(5.000000, 10.000000) scale(-1, 1) translate(-5.000000, -10.000000)'
            : ''
        }
      >
        <path
          d="M10,10 L10,20 L0,20 L0.000708254628,19.9505544 C5.05369146,19.4485019 9,15.1851058 9,10 L10,10 Z"
          id="lower"
          fill={shouldFillBottom ? theme.palette.grey[50] : theme.palette.common.white}
        />
        <path
          d="M10,10 L9,10 L9,10 C9,4.81489415 5.05369146,0.551498054 0.000708254628,0.0494455877 L0,0 L10,0 L10,10 Z"
          id="Upper"
          fill={theme.palette.common.white}
        />
        <path
          d="M0.000861185455,-4.26070649e-13 C5.29101256,0.261269678 9.5,4.63849744 9.5,10 C9.5,15.3615026 5.29101256,19.7387303 0.000861185455,20 L0.00175948546,18.9973385 C4.73892585,18.7367014 8.5,14.8081157 8.5,10 C8.5,5.19188435 4.73892585,1.26329864 0.00175948546,1.00266153 Z"
          id="border"
          fill={theme.palette.grey[200]}
        />
      </g>
    </StyledSvgIcon>
  );
};

export const ReceiptCardLeftSeparatorCut = (props: ReceiptTotalProps) => (
  <ReceiptCardSeparatorCut {...props} inverted={false} />
);

export const ReceiptCardRightSeparatorCut = (props: ReceiptTotalProps) => (
  <ReceiptCardSeparatorCut {...props} inverted />
);

export const ReceiptCardSeparatorSpan = styled.div`
  ${({
    theme: {
      palette,
      typography: { pxToRem },
    },
    shouldFillBottom,
  }: { theme: Theme } & ReceiptTotalProps) => css`
    background-color: ${palette.common.white};
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${pxToRem(SEPARATOR_HEIGHT)};
    width: 100%;
    ${shouldFillBottom
      ? css`
          background: linear-gradient(white 9px, ${palette.grey[50]} 10px);
        `
      : null}
  `}
`;

export const ReceiptCardSeparator = styled.div`
  ${({ theme }: { theme: Theme }) => css`
    border-bottom: 1px dashed ${theme.palette.grey[200]};
    margin: 0 10px;
    width: 100%;
  `}
`;

export const ReceiptCardHeader = styled.div`
  ${({
    theme: {
      typography: { pxToRem },
    },
  }: {
    theme: Theme;
  }) => css`
    padding: ${pxToRem(24)} ${pxToRem(24)} 0 ${pxToRem(24)};
  `}
`;

export const ReceiptCardListBody = styled.div`
  ${({
    theme: {
      typography: { pxToRem },
    },
  }: {
    theme: Theme;
  }) => css`
    padding: 0 ${pxToRem(24)};
  `}
`;

export const ReceiptCardTotalBody = styled.div`
  ${({
    theme: {
      typography: { pxToRem },
    },
  }: {
    theme: Theme;
  }) => css`
    padding: ${pxToRem(24)};
  `}
`;

export const ReceiptItemContainer = styled(
  ({ isHeader, shouldFillBackground, hasRadius, ...props }) => <Grid {...props} />
)`
  ${({
    theme: {
      palette,
      typography: { pxToRem },
    },
    isHeader,
    shouldFillBackground,
    hasRadius,
  }: {
    theme: Theme;
    isHeader?: boolean;
    shouldFillBackground?: boolean;
    hasRadius?: boolean;
  }) => css`
    background-color: ${isHeader && shouldFillBackground ? palette.grey[200] : 'transparent'};
    padding: ${isHeader ? pxToRem(24) : 0};
    padding-bottom: ${shouldFillBackground ? pxToRem(24) : '0'};
    border-top-left-radius: ${isHeader && hasRadius ? pxToRem(RADIUS) : 0};
    border-top-right-radius: ${isHeader && hasRadius ? pxToRem(RADIUS) : 0};
  `}
`;

export const ReceiptItemTitle = styled(Grid)``;

export const ReceiptItemValue = styled(Grid)`
  text-align: right;
  text-align: -moz-right;
  text-align: -webkit-right;
`;
