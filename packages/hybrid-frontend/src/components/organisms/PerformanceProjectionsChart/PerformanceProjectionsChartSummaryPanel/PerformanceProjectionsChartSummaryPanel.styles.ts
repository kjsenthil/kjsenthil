/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { Theme } from '../../../atoms';

export const Container = styled.div`
  ${({ theme }: { theme: Theme }) => `
    display: inline-flex;
    gap: ${theme.spacing(6)}px;
  `}
`;
