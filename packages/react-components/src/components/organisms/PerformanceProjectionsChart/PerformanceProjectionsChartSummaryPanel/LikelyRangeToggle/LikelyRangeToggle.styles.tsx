import styled from 'styled-components';
import { Theme } from '../../../../atoms';

// eslint-disable-next-line import/prefer-default-export
export const LikelyRangeToggleContainer = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: ${theme.spacing(0.5)}px;
  `}
`;
