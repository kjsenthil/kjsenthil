import styled from 'styled-components';
import { Theme } from '@material-ui/core';

export const ModalContent = styled.div`
  ${({ isMobile, theme }: { isMobile: boolean; theme: Theme }) => `
    display: flex;
    flex-direction: row;
    column-gap: ${isMobile ? theme.spacing(2) : theme.spacing(4)}px;
    row-gap: ${theme.spacing(3)}px;
`}
`;

export const TextContainer = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: column ;
    row-gap: ${theme.spacing(2)}px;
  `}
`;

export const Form = styled.form`
  border-radius: 5px;
  padding: 1rem;
`;

export const ContentContainer = styled.div`
  ${({ isMobile, theme }: { isMobile: boolean; theme: Theme }) => `
  display: flex;
  padding: ${isMobile ? `${theme.spacing(2.5)}px;` : `${theme.spacing(4.5)}px;`}
  ${isMobile ? `flex-direction: column;` : ``}
  `}
`;

export const TextWrapper = styled.div`
  flex: 1 1 0;
`;
export const ControlWrapper = styled.div`
  ${({ isMobile, theme }: { isMobile: boolean; theme: Theme }) => `
  flex: 1 1 0;
  ${isMobile ? `padding-left: ${theme.spacing(3)}px;` : `padding-left: ${theme.spacing(10)}px;`}
  `}
`;
