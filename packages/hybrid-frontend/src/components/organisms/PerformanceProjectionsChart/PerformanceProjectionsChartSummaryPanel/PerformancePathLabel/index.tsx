import * as React from 'react';
import styled from 'styled-components';
import { Theme } from '../../../../atoms';

const HistoricalPathLabel = styled.div`
  ${({ theme }: { theme: Theme }) => `
    width: ${theme.typography.pxToRem(18)};
    height: ${theme.typography.pxToRem(3)};
    border-radius: 1.5px;
    background-color: ${theme.palette.primary.main};
  `}
`;

const ProjectedPathLabel = styled.div`
  ${({ theme }: { theme: Theme }) => `
    width: ${theme.typography.pxToRem(18)};
    height: ${theme.typography.pxToRem(3)};
    border-radius: 1.5px;
    background-color: ${theme.palette.tertiary.main};
  `}
`;

const Container = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(0.5)}px;
  `}
`;

export default function PerformancePathLabel() {
  return (
    <Container>
      <HistoricalPathLabel />
      <ProjectedPathLabel />
    </Container>
  );
}
