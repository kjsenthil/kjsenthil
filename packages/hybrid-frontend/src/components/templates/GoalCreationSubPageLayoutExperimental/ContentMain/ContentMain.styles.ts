import styled from 'styled-components';
import { Theme } from '../../../atoms';

export const ContentMainChildContainer = styled.div``;

// Mobile: either at the bottom or on top
// Desktop: on the left
export const ContentMain = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(2)}px;
  `}
`;
