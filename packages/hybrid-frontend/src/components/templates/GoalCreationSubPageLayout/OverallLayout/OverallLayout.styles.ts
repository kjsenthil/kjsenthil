import styled, { css } from 'styled-components';
import { Theme } from '@tsw/react-components';

interface OverallLayoutStyledProps {
  theme: Theme;
  sideContentFirstOnMobile: boolean;
  isMobile: boolean;
}

// On mobile, children are stacked on top of each other. Main content can either
// appear on top of or below side content.
const overallLayoutMobileDisplay = css`
  ${({ theme, sideContentFirstOnMobile }: OverallLayoutStyledProps) => `
    display: flex;
    flex-direction: ${sideContentFirstOnMobile ? 'column-reverse' : 'column'};
    gap: ${theme.spacing(2)}px;
  `}
`;

// On desktop, we have a 2-column view with a divider in the middle. Exactly 3
// elements.
const overallLayoutDesktopDisplay = css`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: ${(props) => props.theme.spacing(8)}px;
`;

// eslint-disable-next-line import/prefer-default-export
export const OverallLayoutContainer = styled.div<OverallLayoutStyledProps>`
  position: relative;
  ${(props) => (props.isMobile ? overallLayoutMobileDisplay : overallLayoutDesktopDisplay)}
`;
