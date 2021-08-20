import styled from 'styled-components';
import { Theme } from '@tswdts/react-components';

export const SubPageStepCardContentWithInputsContainer = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing(2.5)}px;
  `}
`;

export const SubPageStepCardContentWithInputsAndSignContainer = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: ${theme.spacing(1)}px;
  `}
`;

// Inputs normally have a descriptive text element below them. This can be used
// as the container for these.
export const SubPageStepCardInputContainer = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(1)}px;
  `}
`;

export const EqualSignContainer = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: flex;
    align-items: flex-end;
    padding-bottom: ${theme.spacing(1.25)}px;
  `}
`;
