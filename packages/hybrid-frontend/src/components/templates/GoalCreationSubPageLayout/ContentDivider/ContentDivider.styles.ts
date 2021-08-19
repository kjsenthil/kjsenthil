import styled from 'styled-components';
import { Theme } from '@tsw/react-components';

// The line. Always static.
export const DividerLine = styled.div`
  ${({ theme }: { theme: Theme }) => `
    position: absolute;
    
    width: ${theme.spacing(0.25)}px;
    height: 100%;
    background-color: ${theme.palette.grey['200']};
  `}
`;

// The triangle. Moves around.
export const DividerTriangle = styled.div`
  ${({ theme, offsetY }: { theme: Theme; offsetY: number }) => `
    width: ${theme.spacing(1.5)}px;
    height: ${theme.spacing(1.5)}px;

    border-top: ${theme.spacing(0.25)}px solid ${theme.palette.grey['200']};
    border-right: ${theme.spacing(0.25)}px solid ${theme.palette.grey['200']};
    background-color: ${theme.palette.background.layout};
    
    transform: translate(-${theme.spacing(0.6)}px, ${offsetY}px) rotate(45deg);
    transition: transform 0.2s ease-in;
  `}
`;

// A container for the line and the triangle to ensure consistent positioning.
export const DividerContainer = styled.div`
  position: relative;
  left: 4px;
`;
