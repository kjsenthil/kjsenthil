import styled, { css } from 'styled-components';
import { Theme } from '../../../atoms';

// Need to have 'relative' positioning because its content moves around the page
export const ContentSide = styled.div`
  position: relative;
`;

interface ContentSideMoverContainerStyledProps {
  theme: Theme;
  isMobile: boolean;
  offsetY: number;
}

const contentSideMoverContainerDesktopStyles = css`
  ${({ offsetY }: ContentSideMoverContainerStyledProps) => `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transform: translate(0, ${offsetY}px);
    transition: transform 0.2s ease-in;
  `}
`;

const contentStyleMoverContainerMobileStyles = css`
  display: flex;
`;

export const ContentSideMoverContainer = styled.div<ContentSideMoverContainerStyledProps>`
  ${(props) =>
    props.isMobile
      ? contentStyleMoverContainerMobileStyles
      : contentSideMoverContainerDesktopStyles}
`;
