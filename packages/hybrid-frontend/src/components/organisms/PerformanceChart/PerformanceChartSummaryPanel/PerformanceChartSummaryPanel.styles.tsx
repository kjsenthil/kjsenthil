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

export const PerformancePercentage = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: inline-block;
    margin-left: ${theme.spacing(1)}px;
    padding: ${theme.spacing(1 / 8)}px ${theme.spacing(0.5)}px;
    border-radius: 2px;
    background-color: ${theme.palette.success.main};
  `}
`;
