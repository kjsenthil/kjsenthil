import * as React from 'react';
import { Typography } from '../../atoms';
import { GoalLifePlanCard } from '../../molecules';
import { CardBody, CardImage, CardTextContent } from './GoalSetUpNewCard.styles';

export interface GoalSetUpNewCardProps {
  imgProps?: React.ComponentPropsWithoutRef<'img'>;
}

export default function GoalSetUpNewCard({ imgProps }: GoalSetUpNewCardProps) {
  return (
    <GoalLifePlanCard noPadding>
      <CardBody>
        <CardImage {...imgProps} />
        <CardTextContent>
          <Typography align="center" variant="b2" color="primary" colorShade="dark2">
            Save for what&#39;s important to you
          </Typography>
          <Typography align="center" variant="sh4">
            Set up a new goal
          </Typography>
        </CardTextContent>
      </CardBody>
    </GoalLifePlanCard>
  );
}
