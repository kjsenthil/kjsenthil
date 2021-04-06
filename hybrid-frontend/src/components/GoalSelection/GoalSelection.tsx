import React, { useState } from 'react';
import { Button, Grid, Typography, Paper } from '@material-ui/core';
import { Goals } from '../../constants';
import { useStyles, ELEVATION } from './GoalSelection.styles';

interface GoalBoxProps {
  goal: Goals;
  setGoal: (goal: Goals) => void;
  selectedGoal?: Goals;
}

const GoalBox: React.FC<GoalBoxProps> = ({ setGoal, goal, selectedGoal }) => {
  const isSelected = goal === selectedGoal;
  return (
    <Grid item xs={12} sm={3} lg={3}>
      <Paper
        onClick={() => setGoal(goal)}
        className={useStyles({ isSelected }).goalBox}
        elevation={isSelected ? 1 : ELEVATION}
      >
        <Typography variant="h6" align="center">
          {goal}
        </Typography>
      </Paper>
    </Grid>
  );
};

export interface GoalSelectionProps {
  onSubmit: (goal: Goals) => Promise<void>;
}

const GoalSelection: React.FC<GoalSelectionProps> = ({ onSubmit }) => {
  const classes = useStyles({});
  const [goal, setGoal] = useState<Goals>();

  const handleSubmit = () => {
    if (goal) {
      onSubmit(goal);
    }
  };

  return (
    <Grid className={classes.container} container spacing={3}>
      <Typography className={classes.title} variant="h4">
        Select a Goal
      </Typography>
      <Grid className={classes.container} container item xs={12} sm={12}>
        <GoalBox goal={Goals.HOUSE} selectedGoal={goal} setGoal={setGoal} />
        <GoalBox goal={Goals.BABY} selectedGoal={goal} setGoal={setGoal} />
      </Grid>
      <Grid className={classes.container} container item xs={12} sm={12}>
        <GoalBox goal={Goals.HOLIDAY} selectedGoal={goal} setGoal={setGoal} />
        <GoalBox goal={Goals.UNIVERSITY} selectedGoal={goal} setGoal={setGoal} />
      </Grid>
      <Grid className={classes.container} container item xs={12} sm={6}>
        <Button
          className={classes.selectButton}
          data-testid="select"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!goal}
        >
          Select
        </Button>
      </Grid>
    </Grid>
  );
};

export default GoalSelection;
