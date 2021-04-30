import * as React from 'react';
import styled from 'styled-components';
import { Theme } from '../../../atoms';

export const Container = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: inline-flex;
    gap: ${theme.spacing(4)}px;
  `}
`;

export const SectionContainer = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: inline-flex;
    gap: ${theme.spacing(2.5)}px;
    align-items: center;
  `}
`;

export const Divider = styled.div`
  ${({ theme }: { theme: Theme }) => `
    width: ${theme.typography.pxToRem(3)};
    border-radius: 1.5px;
    background-color: ${theme.palette.grey['100']};
  `}
`;

export const PerformanceLabelIndicator = styled.div`
  ${({ theme }: { theme: Theme }) => `
    width: ${theme.typography.pxToRem(18)};
    height: ${theme.typography.pxToRem(3)};
    border-radius: 1.5px;
    background-color: ${theme.palette.primary.main};
  `}
`;

const ContributionsLabelIndicatorGreySquare = styled.div`
  ${({ theme }: { theme: Theme }) => `
    width: ${theme.typography.pxToRem(5)};
    height: ${theme.typography.pxToRem(3)};
    border-radius: 1.5px;
    background-color: ${theme.palette.grey['300']};
  `}
`;

const ContributionsLabelIndicatorContainer = styled.div`
  display: flex;
  gap: 1px;
`;

export const ContributionsLabelIndicator = () => (
  <ContributionsLabelIndicatorContainer>
    <ContributionsLabelIndicatorGreySquare />
    <ContributionsLabelIndicatorGreySquare />
    <ContributionsLabelIndicatorGreySquare />
  </ContributionsLabelIndicatorContainer>
);

export const PerformancePercentage = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: inline-block;
    margin-left: ${theme.spacing(1)}px;
    padding: ${theme.spacing(1 / 8)}px ${theme.spacing(0.5)}px;
    border-radius: 2px;
    background-color: ${theme.palette.success.main};
  `}
`;
