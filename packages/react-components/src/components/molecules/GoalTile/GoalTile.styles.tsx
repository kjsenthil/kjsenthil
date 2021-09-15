import styled, { css } from 'styled-components';
import { Typography } from '../../atoms';

export const GoalTileContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-flow: row nowrap;
    width: 394px;
    height: 85px;
    overflow: hidden;
    background: ${theme.palette.background.default};
    border: 1px solid ${theme.palette.grey.light1};
    border-radius: 20px;
  `}
`;

export const GoalIcon = styled.img`
  object-fit: contain;
  object-position: left;
  height: 100%;
`;

export const GoalLabel = styled(Typography)`
  margin-left: 24px;
  align-self: center;
  text-decoration: none;
`;
