import * as React from 'react';
import { CardActionArea, Typography } from '../../atoms';
import { GoalLifePlanCard } from '../../molecules';
import { CardContainer, CardBody, CardImage, CardTextContent } from './GoalSetUpNewCard.styles';

export interface GoalSetUpNewCardProps {
  imgProps?: React.ComponentPropsWithoutRef<'img'>;
}

export default function GoalSetUpNewCard({ imgProps }: GoalSetUpNewCardProps) {
  return (
    <GoalLifePlanCard noPadding>
      <CardContainer>
        <CardActionArea>
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
        </CardActionArea>
      </CardContainer>
    </GoalLifePlanCard>
  );
}
