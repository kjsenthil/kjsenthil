import * as React from 'react';
import { CardActionArea } from '../../atoms';
import {
  GoalLifePlanCardContainer,
  GoalLifePlanCardContentContainerProps,
  GoalLifePlanCardContentContainer,
} from './GoalLifePlanCard.styles';

export interface GoalLifePlanCardProps extends GoalLifePlanCardContentContainerProps {
  handleClick?: () => void;
  children?: React.ReactNode;
}
export default function GoalLifePlanCard({
  handleClick,
  children,
  ...goalLifePlanCardContainerProps
}: GoalLifePlanCardProps) {
  return (
    <GoalLifePlanCardContainer>
      <CardActionArea onClick={handleClick}>
        <GoalLifePlanCardContentContainer {...goalLifePlanCardContainerProps}>
          {children}
        </GoalLifePlanCardContentContainer>
      </CardActionArea>
    </GoalLifePlanCardContainer>
  );
}
