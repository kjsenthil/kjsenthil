import styled, { css } from 'styled-components';
import { Card, CardProps, Theme } from '../../atoms';

// The & > * targets the <CardActionArea> component. It's a <button> under the
// hood and these styles make sure its height is properly set.
export const GoalLifePlanCardContainer = styled(Card)`
  ${({ theme }) => css`
    height: ${theme.typography.pxToRem(240)};
    border: 1px solid ${theme.palette.grey['200']};
    border-radius: 16px;
    box-shadow: none;

    & > * {
      height: 100%;
    }
  `}
`;

export interface GoalLifePlanCardContentContainerProps extends CardProps {
  noPadding?: boolean;
}

export const GoalLifePlanCardContentContainer = styled.div<
  GoalLifePlanCardContentContainerProps & { theme: Theme }
>`
  ${({ theme, noPadding }) => css`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: ${!noPadding ? theme.spacing(2) : 0}px;
  `}
`;
