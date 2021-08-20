import styled, { css } from 'styled-components';
import { Theme } from '@tswdts/react-components';

export const LifePlanLayoutContainer = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: flex;
    flex-direction: column;
    padding-top: ${theme.spacing(5)}px;
  `}
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
  ${({ theme }: { theme: Theme }) => `
    display: grid;
    grid: auto / auto-fit, minmax(${theme.spacing(48.125)}px, 1fr);
    gap: ${theme.spacing(4.5)}px;
  `}
`;
