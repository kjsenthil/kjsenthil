import styled, { css } from 'styled-components';
import { Card, CardProps, Theme } from '../../atoms';

export interface GoalLifePlanCardProps extends CardProps {
  noPadding?: boolean;
}

const GoalLifePlanCard = styled(Card).withConfig({
  // Don't forward this prop as it's not a MUICard prop
  shouldForwardProp: (prop) => prop !== 'noPadding',
})<GoalLifePlanCardProps & { theme: Theme }>`
  ${({ theme, noPadding }) => css`
    border: 1px solid ${theme.palette.grey['200']};
    border-radius: 16px;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    height: ${theme.typography.pxToRem(240)};
    padding: ${!noPadding ? theme.spacing(2) : 0}px;
  `}
`;

export default GoalLifePlanCard;
