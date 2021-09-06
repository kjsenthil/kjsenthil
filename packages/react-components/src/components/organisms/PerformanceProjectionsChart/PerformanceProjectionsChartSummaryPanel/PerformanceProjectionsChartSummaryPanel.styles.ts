/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { Theme } from '../../../atoms';

export const SummaryPanelContainer = styled.div.withConfig<{ isMobile: boolean; theme: Theme }>({
  shouldForwardProp: (prop) => prop !== 'isMobile',
})`
  ${({ isMobile, theme }: { isMobile: boolean; theme: Theme }) =>
    isMobile
      ? `
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: ${theme.spacing(2.5)}px;
  `
      : `
    display: flex;
    justify-content: space-between;
  `}
`;

export const LegendsContainer = styled.div.withConfig<{ isMobile: boolean; theme: Theme }>({
  shouldForwardProp: (prop) => prop !== 'isMobile',
})`
  ${({ isMobile, theme }: { isMobile: boolean; theme: Theme }) =>
    isMobile
      ? `
    display: grid;
    grid: auto / 1fr 1fr;
    justify-content: space-between;
    gap: ${theme.spacing(2)}px;
  `
      : `
    display: flex;
    gap: ${theme.spacing(6)}px;
  `}
`;
