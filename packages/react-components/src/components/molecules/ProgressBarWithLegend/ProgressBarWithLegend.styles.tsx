import styled, { keyframes, css } from 'styled-components';

export const ProgressLegendContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow: hidden;
`;

const MIN_WIDTH = 110;

export const ProgressLegendWrapper = styled.div`
  ${({ width }: { width: number }) => {
    const fillAnimation = keyframes`
      from {
        width: 0;
      }
      to {
        width: ${width}%;
      }
    `;

    return css`
      min-width: ${MIN_WIDTH}px;
      max-width: 50%;
      width: ${width}%;
      animation: ${fillAnimation} 1s ease-out;
      z-index: 1;
    `;
  }}
`;
