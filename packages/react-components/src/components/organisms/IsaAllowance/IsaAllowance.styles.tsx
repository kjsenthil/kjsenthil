import styled, { css } from 'styled-components';
import { Theme } from '../../atoms';

export const IsaValues = styled.div`
  ${({ theme }: { theme: Theme }) => css`
    flex: 1;
    > * {
      display: inline-block;
    }
    h3:first-of-type {
      margin-right: ${theme.spacing(1)}px;
    }
  `}
`;

export const IconContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
`;

export const IsaAllownceContainer = styled.div`
  height: 40px;
  margin-top: -12px;
`;
