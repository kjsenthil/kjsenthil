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
