import React from 'react';
import styled, { css } from 'styled-components';
import { Card, Theme } from '../../atoms';

export const AccNoSortCodeBox = styled.div`
  ${({ theme }: { theme: Theme }) => css`
    display: grid;
    grid: auto / 1fr 1fr;
    width: ${theme.spacing(21.75)}px;
    row-gap: ${theme.spacing(0.75)}px;
    align-items: center;
  `}
`;

export const AccNoSortCodeBoxAndEditButton = styled.div`
  ${({ theme }: { theme: Theme }) => css`
    display: flex;
    justify-content: space-between;
    gap: ${theme.spacing(0.5)}px;
    width: 100%;
  `}
`;

export const EditButtonBox = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const BankDetailsCard = styled(({ isMobile, ...props }) => <Card {...props} />)`
  ${({ isMobile, theme }: { theme: any; isMobile: boolean }) => css`
    padding: ${theme.spacing(isMobile ? 2 : 2.5)}px;
    border: 1px solid ${theme.palette.grey['200']};
    border-radius: 16px;
    box-shadow: none;
    display: flex;
    flex-direction: column;
  `}
`;
