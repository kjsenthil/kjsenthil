import styled from 'styled-components';
import { Theme } from '../../../../atoms';

// eslint-disable-next-line import/prefer-default-export
export const LikelyRangeToggleContainer = styled.div.withConfig<{
  isMobile: boolean;
  theme: Theme;
}>({
  shouldForwardProp: (prop) => prop !== 'isMobile',
})`
  ${({ theme, isMobile }: { theme: Theme; isMobile: boolean }) => `
    display: flex;
    flex-direction: ${isMobile ? 'row' : 'column'};
    justify-content: ${isMobile ? 'flex-end' : 'center'};
    align-items: ${isMobile ? 'center' : 'flex-end'};
    gap: ${isMobile ? theme.spacing(1.2) : theme.spacing(0.5)}px;
  `}
`;
