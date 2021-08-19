import styled from 'styled-components';
import { Card, Theme } from '../../atoms';

export const CardContainer = styled(Card)`
  ${({ theme }: { theme: Theme }) => `
    display: grid;
    grid: 1fr auto / auto 1fr;
    column-gap: ${theme.spacing(5)}px;
    row-gap: ${theme.spacing(3)}px;
  
    padding: ${theme.spacing(4)}px;
    background-color:  ${theme.palette.background.paper};
    box-shadow: 1px 2px 44px 0 rgba(139,139,139,0.26);
    border-radius: 16px;
  `}
`;

export const CardChildrenContainer = styled.div<{
  childrenFullWidth: boolean;
}>`
  ${({ childrenFullWidth }) => `
    grid-column: ${childrenFullWidth ? '1 / 3' : '2 / 3'};
    
    display: flex;
    flex-direction: column;
  `}
`;
