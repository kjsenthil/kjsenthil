import styled from 'styled-components';
import { Theme } from '../../atoms';

// Fun fact: setting 1fr 1fr for the grid-template-rows here doesn't work as
// expected because the <img> has an aspect ratio and its row will have larger
// height than the text content's row.
export const CardBody = styled.div`
  display: grid;
  grid: 50% 50% / auto;
  justify-items: center;
  height: 100%;
`;

export const CardImageContainer = styled.div`
  width: 100%;
`;

export const CardImage = styled.img`
  width: 100%;
  object-fit: cover;
  object-position: center;
  place-self: stretch stretch;
`;

export const CardTextContent = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${theme.spacing(1.5)}px;
    
    width: 50%;
  `}
`;
