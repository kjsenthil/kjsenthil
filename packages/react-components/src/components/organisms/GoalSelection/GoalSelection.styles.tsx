import styled, { css } from 'styled-components';
import { Link } from 'gatsby';
import { Theme, Typography } from '../../atoms';

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

export const GoalTilesLayout = styled.div<{ theme: Theme; columnsCount: string }>`
  ${({ theme, columnsCount }) => `
    display: grid;
    grid: auto / repeat(${columnsCount}, minmax(${theme.spacing(49.25)}px , 1fr));
    column-gap: ${theme.spacing(3.5)}px;
    row-gap: ${theme.spacing(2.5)}px;
  `}
`;

export const GatsbyLinkNoDecoration = styled(Link)`
  text-decoration: none;
`;
