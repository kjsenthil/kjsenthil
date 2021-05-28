/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Disclaimer = styled.div`
  ${({ theme }) => `
    padding: 0 ${theme.spacing(2.5)}px;

    > p:first-child {
      margin-right: ${theme.spacing(1)}px;
    }
  `};
`;
