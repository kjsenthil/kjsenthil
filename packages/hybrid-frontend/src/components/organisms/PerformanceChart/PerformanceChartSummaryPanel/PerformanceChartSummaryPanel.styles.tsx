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
    width: 3px;
    border-radius: 1.5px;
    background-color: ${theme.palette.grey['100']};
  `}
`;

export const LabelIndicator = styled.div`
  width: 10px;
  height: 12px;
  border-radius: 6px;
  border-style: solid;
  border-width: 2px;
`;

export const PerformanceLabelIndicator = styled(LabelIndicator)`
  ${({ theme }: { theme: Theme }) => `
    border-color: ${theme.palette.primary.main};
    background-color: ${theme.palette.primary.main};
  `}
`;

export const ContributionsLabelIndicator = styled(LabelIndicator)`
  ${({ theme }: { theme: Theme }) => `
    border-color: ${theme.palette.primary.light1}
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
