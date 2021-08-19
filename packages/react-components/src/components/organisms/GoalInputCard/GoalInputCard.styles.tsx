import styled, { css } from 'styled-components';
import { Card, Theme } from '../../atoms';

export const GoalInputStyledCard = styled(Card)`
  ${({ theme }: { theme: Theme }) => css`
    border: 1px solid ${theme.palette.grey['200']};
    border-radius: 16px;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    min-height: ${theme.typography.pxToRem(165)};
    padding: ${theme.spacing(2)}px;
    width: 300px;
  `}
`;

export const SuggestionText = styled.div`
  min-height: 40px;
`;
