import { Theme } from '@material-ui/core';
import styled, { keyframes, css } from 'styled-components';

const show = keyframes`
  from {
    opacity: 0;
    visibility: hidden;
  }

  to {
    opacity: 1;
    visibility: visible;
  }
`;

const hide = keyframes`
  from {
    opacity: 1;
    visibility: visible;
  }

  to {
    opacity: 0;
    visibility: hidden;
  }
`;

export interface AnimationToggleProps {
  shouldShow: boolean;
  top: number;
  theme: Theme;
  animationTime?: number;
}

const AnimateToggle = styled.div`
  ${({
    shouldShow,
    animationTime = 0.2,
    top,
    theme: {
      typography: { pxToRem },
    },
  }: AnimationToggleProps) => css`
    position: absolute;
    top: ${pxToRem(top)};
    opacity: ${shouldShow ? 1 : 0};
    animation: ${shouldShow ? show : hide} ${animationTime}s ease-in-out;
  `}
`;

export default AnimateToggle;