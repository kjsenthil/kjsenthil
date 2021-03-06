import styled from 'styled-components';
import { Theme } from '../../../../atoms';

export const ContainerTriangle = styled.div`
  ${({ theme }: { theme: Theme }) => `
    position: absolute;
    top: 100%;
    left: 50%;
  
    width: ${theme.spacing(1)}px;
    height: ${theme.spacing(1)}px;
    
    border-bottom: solid ${theme.palette.grey['200']} 2px;
    border-right: solid ${theme.palette.grey['200']} 2px;
    
    background-color: white;
    transform: translate(-50%, -${theme.spacing(0.5)}px) rotate(45deg);
  `}
`;

export const ContainerBubble = styled.div<{
  theme: Theme;
}>`
  ${({ theme }) => `
    padding: ${theme.spacing(1.0625)}px;
    border-radius: 10px;
    border: solid ${theme.palette.grey['200']} 2px;
    background-color: white;
  `}
`;

export const ContainerParent = styled.div<{
  top: number | undefined;
  left: number | undefined;
}>`
  ${({ top, left }) => `
    position: absolute;
    top: ${top ?? 0}px;
    left: ${left ?? 0}px;
    transform: translateX(-50%);
  `}
`;
