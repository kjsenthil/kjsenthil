import styled, { keyframes, css } from 'styled-components';
import { CardContent } from '../../atoms';

export const ProgressLabelContainer = styled.div`
  position: relative;
  flex-direction: row;
  width: 100%;
  overflow: hidden;
`;

export const ProgressLabelWrapper = styled.div`
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
      min-width: 90px;
      max-width: 50%;
      width: ${width}%;
      animation: ${fillAnimation} 1s ease-out;
      z-index: 1;
    `;
  }}
`;

export const GoalTrackingCardContent = styled(CardContent)`
  &.MuiCardContent-root:last-child {
    padding-bottom: 0;
  }
`;
