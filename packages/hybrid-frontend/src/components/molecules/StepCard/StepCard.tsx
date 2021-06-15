import React from 'react';
import { Grid, Typography } from '../../atoms';
import { CardContainer, StepContainer } from './StepCard.styles';

export interface StepCardProps {
  step: number;
  title: string;
  children: React.ReactNode;
}

const StepCard = ({ title, step, children }: StepCardProps) => (
  <CardContainer container direction="row" justify="space-between">
    <Grid item>
      <StepContainer>
        <Typography variant="h4" component="h2" color="primary">
          {step}.
        </Typography>
      </StepContainer>
    </Grid>
    <Grid item container justify="space-between" spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography variant="h4" component="h3">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        {children}
      </Grid>
    </Grid>
  </CardContainer>
);

export default StepCard;
