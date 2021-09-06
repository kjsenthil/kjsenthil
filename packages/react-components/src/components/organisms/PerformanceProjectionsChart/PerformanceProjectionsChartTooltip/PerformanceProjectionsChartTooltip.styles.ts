import styled from 'styled-components';
import { Theme } from '../../../atoms';

// eslint-disable-next-line import/prefer-default-export
export const TooltipContainer = styled.div`
  ${({ theme }: { theme: Theme }) => `
    position: relative;
    
    display: inline-flex;
    flex-direction: column;

    padding: ${theme.spacing(0.75)}px ${theme.spacing(1.25)}px;
    border-radius: 4px;
    background-color: ${theme.palette.common.white};
    box-shadow: 0 3px 8px 0 rgba(112, 120, 135, 0.24);

    /* This only makes sense in the context of the performance chart. It 
       re-centers the tooltip on the mouse's position */
    transform: translate(calc(-50% - 10px), 0);
    
    text-align: center;
    white-space: nowrap;
  `}
`;
