import React from 'react';
import { Box, Grid, Typography } from '../../atoms';
import CardContainer from './StepCard.styles';

export interface StepCardProps {
  step: number;
  title: string;
  children: React.ReactNode;
  horizontalLayout?: boolean;
}

const StepCard = ({ title, step, children, horizontalLayout = true }: StepCardProps) => (
  <CardContainer>
    <Grid container spacing={3} alignItems="center">
      <Grid item>
        <Box mr={3}>
          <Typography variant="h4" component="h2" color="primary">
            {step}.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={5}>
        <Typography variant="h4" component="h3">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={horizontalLayout ? 'auto' : 12}>
        <Box m={1}>{children}</Box>
      </Grid>
    </Grid>
  </CardContainer>
);

export default StepCard;
