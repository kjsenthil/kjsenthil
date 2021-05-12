import styled from 'styled-components';
import { Theme } from '../../../atoms';

// eslint-disable-next-line import/prefer-default-export
export const Container = styled.div`
  ${({ theme, top, left }: { theme: Theme; top: number | undefined; left: number | undefined }) => `
    position: absolute;
    top: ${top ?? 0}px;
    left: ${left ?? 0}px;
    
    display: inline-flex;
    align-items: center;
    flex-direction: column;
    gap: ${theme.spacing(0.5)}px;
    max-width: ${theme.typography.pxToRem(60)};
    
    transform: translateX(-50%);
  `}
`;
