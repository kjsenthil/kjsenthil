import styled, { css } from 'styled-components';
import { Link, Typography } from '../../atoms';

export const SimplifiedPortfolioTileContainer = styled.div`
  ${({ theme }) => css`
    min-width: 287px;
    max-width: min-content;
    min-height: 191px;
    max-height: min-content;
    background: ${theme.palette.background.default};
    border: 1px solid ${theme.palette.grey.light1};
    border-radius: ${theme.spacing(2)}px;
    padding: ${theme.spacing(2)}px ${theme.spacing(3)}px;
  `}
`;

export const PortfolioName = styled(Typography)`
  margin-bottom: 15px;
`;

export const Accounts = styled(Typography)`
  margin-bottom: 10px;
`;

export const Total = styled(Typography)`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacing(3)}px;
  `}
`;

export const SetAGoalLink = styled(Link)`
  ${({ theme }) => css`
    color: ${theme.palette.primary.light1};
    font-size: ${theme.typography.pxToRem(12)};
  `}
`;
