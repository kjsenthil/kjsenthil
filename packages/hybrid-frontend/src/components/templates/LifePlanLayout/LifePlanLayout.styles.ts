import styled, { css } from 'styled-components';
import { MainCard, Theme } from '@tswdts/react-components';

export const LifePlanLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const goalProgressCardsContainerMobileDisplay = css`
  ${({ theme }: { theme: Theme }) => `
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(3)}px;
  `}
`;

const goalProgressCardsContainerNonMobileDisplay = css`
  ${({ theme }: { theme: Theme }) => `
    display: grid;
    grid: auto / repeat(auto-fit, minmax(${theme.spacing(75.5)}px, 1fr));
    gap: ${theme.spacing(3)}px;
  `}
`;

export const GoalProgressCardsContainer = styled.div<{ isMobile: boolean }>`
  ${({ isMobile }) =>
    isMobile ? goalProgressCardsContainerMobileDisplay : goalProgressCardsContainerNonMobileDisplay}
`;

export const NextStepCardsContainer = styled.div`
  ${({ theme }: { theme: Theme }) => css`
    display: grid;
    grid: auto / auto-fit, minmax(${theme.spacing(48.125)}px, 1fr);
    gap: ${theme.spacing(4.5)}px;
  `}
`;

export const ProjectionChartCard = styled(MainCard)`
  ${({ theme }: { theme: Theme }) => css`
    box-shadow: none;
    border: 1px solid ${theme.palette.grey['200']};
    padding: ${theme.spacing(2.5)}px ${theme.spacing(4.5)}px ${theme.spacing(4.5)}px;
  `}
`;

export const Disclaimer = styled.div`
  ${({ theme }) => css`
    padding: 0 ${theme.spacing(2.5)}px;

    > p:first-child {
      margin-right: ${theme.spacing(1)}px;
    }
  `};
`;
