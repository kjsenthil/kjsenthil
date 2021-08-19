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
  noPadding,
}: GoalLifePlanCardProps) {
  return (
    <GoalLifePlanCardContainer>
      <CardActionArea onClick={handleClick}>
        <GoalLifePlanCardContentContainer noPadding={noPadding}>
          {children}
        </GoalLifePlanCardContentContainer>
      </CardActionArea>
    </GoalLifePlanCardContainer>
  );
}
