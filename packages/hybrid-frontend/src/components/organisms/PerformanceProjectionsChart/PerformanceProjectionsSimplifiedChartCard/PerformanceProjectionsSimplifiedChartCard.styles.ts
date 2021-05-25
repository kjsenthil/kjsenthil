import styled from 'styled-components';
import { Theme } from '../../../atoms';

// eslint-disable-next-line import/prefer-default-export
export const InfoBox = styled.div`
  ${({ theme }: { theme: Theme }) => `
    padding: ${theme.spacing(2)}px;
    border-radius: 0 21px 16px 16px;
    border: 1px solid ${theme.palette.grey['200']};
  `}
`;
