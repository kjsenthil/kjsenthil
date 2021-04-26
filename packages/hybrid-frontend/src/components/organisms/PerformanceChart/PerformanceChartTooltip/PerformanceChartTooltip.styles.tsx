import * as React from 'react';
import styled from 'styled-components';
import { Card, CardContent, Theme } from '../../../atoms';

export const TooltipContainer = styled.div`
  position: relative;
  display: inline-flex;

  /* This only makes sense in the context of the performance chart. It 
     re-centers the tooltip on the mouse's position */
  transform: translate(-50%, 0);
`;

export const TooltipCard = styled(Card)`
  ${({ theme }: { theme: Theme }) => `
    display: inline-block;
    border-radius: 8px;
    border-color: ${theme.palette.grey['200']}
  `}
`;

export const TooltipCardContent = styled(CardContent)`
  ${({ theme }: { theme: Theme }) => `
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(1.5)}px;
    
    padding: ${theme.spacing(1.5)}px ${theme.spacing(1)}px;
    
    /* Need to do this because Material-UI has a default paddingBottom assigned
       to the last child. */ 
    &:last-child {
      padding-bottom: ${theme.spacing(1.5)}px
    }
  `}
`;

export const DetailsContainer = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: flex;
    gap: ${theme.spacing(1.5)}px;
  `}
`;

export const TooltipTriangleContainer = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 10px;
  transform: translate(-50%, 50%);
`;

export const TooltipTriangleTriangle = styled.div`
  ${({ theme }: { theme: Theme }) => `
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
    background-color: ${theme.palette.common.white};
    border-bottom: 1px solid ${theme.palette.grey['200']};
    border-right: 1px solid ${theme.palette.grey['200']};
  `}
`;

export const TooltipTriangle = () => (
  <TooltipTriangleContainer>
    <TooltipTriangleTriangle />
  </TooltipTriangleContainer>
);
