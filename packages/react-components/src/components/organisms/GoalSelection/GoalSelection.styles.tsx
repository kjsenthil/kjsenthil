import styled, { css } from 'styled-components';
import { Typography } from '../../atoms';

export const Heading = styled(Typography)`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacing(1.5)}px;
  `}
`;

export const Description = styled(Typography)`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacing(3)}px;
  `}
`;

export const GoalTilesLayout = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-flow: row wrap;
    column-gap: ${theme.spacing(3.5)}px;
    row-gap: ${theme.spacing(2.5)}px;
  `}
`;

export const GoalTileDoubleWidthWrapper = styled.div`
  flex: 0 1 66.6%;
`;
