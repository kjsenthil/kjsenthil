import styled from 'styled-components';
import { Theme } from '../../../../atoms';

export const LikelyRangeToggleBoxContainer = styled.button`
  ${({ theme }: { theme: Theme }) => `   
    padding: ${theme.spacing(0.25)}px;
    
    background-color: ${theme.palette.grey['100']};
    border: none;
    border-radius: 16px;
    
    cursor: pointer;
  `}
`;

export const ElementsContainer = styled.div`
  position: relative;
  display: inline-grid;
  grid-template-columns: 50% 50%;
`;

export const SlidingBox = styled.div`
  ${({ theme, isLeft }: { theme: Theme; isLeft: boolean }) => `
    position: absolute;
    
    width: 50%;
    height: 100%;
    
    background-color: ${theme.palette.common.white};
    border-radius: 14px;
    
    transform: translateX(${isLeft ? '0%' : '100%'});
    transition: transform 0.25s;
  `}
`;

export const TextContainer = styled.div`
  ${({ theme }: { theme: Theme }) => `
    position: relative;
    
    display: flex;
    justify-content: center;
    padding: ${theme.spacing(0.75)}px;
  `}
`;
