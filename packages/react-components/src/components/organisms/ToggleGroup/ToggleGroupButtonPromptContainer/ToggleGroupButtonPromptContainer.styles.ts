import styled from 'styled-components';
import { Theme } from '../../../atoms';

// eslint-disable-next-line import/prefer-default-export
export const ToggleGroupButtonPromptContainerBubble = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(3.5)}px;
    
    margin-top: ${theme.spacing(2)}px;
    padding: ${theme.spacing(2.5)}px ${theme.spacing(3)}px;
    
    border: 1px solid ${theme.palette.grey[200]};
    border-radius: 16px;
  `}
`;
