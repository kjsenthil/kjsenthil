import styled from 'styled-components';
import { Theme } from '../../atoms';

// eslint-disable-next-line import/prefer-default-export
export const GoalPotTrackerContainer = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(2.5)}px;
    width: 100%;
  `}
`;
