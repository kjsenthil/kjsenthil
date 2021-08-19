import styled from 'styled-components';
import { Theme } from '@tsw/react-components';

export const Disclaimer = styled.div`
  ${({ theme }) => `
    padding: 0 ${theme.spacing(2.5)}px;

    > p:first-child {
      margin-right: ${theme.spacing(1)}px;
    }
  `};
`;

export const YourImportantMomentsContainer = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: grid;
    grid: ${theme.spacing(30)}px / repeat(auto-fit, ${theme.spacing(43.625)}px);
    gap: ${theme.spacing(5)}px;
  `}
`;
