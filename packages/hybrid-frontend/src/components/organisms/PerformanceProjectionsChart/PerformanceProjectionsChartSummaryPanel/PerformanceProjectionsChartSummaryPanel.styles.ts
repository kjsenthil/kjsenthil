/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { Theme } from '../../../atoms';

export const SummaryPanelContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LegendsContainer = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: flex;
    gap: ${theme.spacing(6)}px;
  `}
`;
