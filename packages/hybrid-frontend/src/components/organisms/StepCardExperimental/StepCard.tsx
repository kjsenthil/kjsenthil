import React from 'react';
import { Box, Typography } from '../../atoms';
import { DigitalCoachBox, DigitalCoachBoxProps } from '../../molecules';
import { CardChildrenContainer, CardContainer } from './StepCard.styles';

export interface StepCardProps {
  step: number;
  title: string;

  // If true, children will span the full width of the card. Otherwise, children
  // will start after the "step number" column
  childrenFullWidth?: boolean;

  // Will show a DigitalCoachBox if provided
  digitalCoachBoxProps?: DigitalCoachBoxProps;

  children: React.ReactNode;
}

const StepCard = React.forwardRef(
  ({ title, step, childrenFullWidth, digitalCoachBoxProps, children }: StepCardProps, ref) => (
    <CardContainer ref={ref}>
      <Typography variant="h4" component="h2" color="primary">
        {step}.
      </Typography>
      <Typography variant="h4" component="h3">
        {title}
      </Typography>
      <CardChildrenContainer childrenFullWidth={!!childrenFullWidth}>
        <Box>{children}</Box>
        <Box pt={2.5}>{digitalCoachBoxProps && <DigitalCoachBox {...digitalCoachBoxProps} />}</Box>
      </CardChildrenContainer>
    </CardContainer>
  )
);

export default StepCard;
