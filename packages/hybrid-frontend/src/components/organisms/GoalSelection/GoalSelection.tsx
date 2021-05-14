import React, { useState } from 'react';
import { Button, Grid, Typography } from '../../atoms';
import { Goals } from '../../../services/goal';
import { GoalBox, ELEVATION } from './GoalSelection.styles';

interface GoalBoxProps {
  goal: Goals;
  setGoal: (goal: Goals) => void;
  selectedGoal?: Goals;
}

const GoalTile: React.FC<GoalBoxProps> = ({ setGoal, goal, selectedGoal }) => {
  const isSelected = goal === selectedGoal;
  return (
    <Grid item xs={6} sm={6}>
      <GoalBox
        onClick={() => setGoal(goal)}
        isSelected={isSelected}
        elevation={isSelected ? 1 : ELEVATION}
      >
        <Typography variant="h5" align="center">
          {goal}
        </Typography>
      </GoalBox>
    </Grid>
  );
};

export interface GoalSelectionProps {
  onSubmit: (goal: Goals) => void;
}

const GoalSelection: React.FC<GoalSelectionProps> = ({ onSubmit }) => {
  const [goal, setGoal] = useState<Goals>();

  const handleSubmit = () => {
    if (goal) {
      onSubmit(goal);
    }
  };

  return (
    <Grid container spacing={3} justify="center">
      <Grid container item>
        <GoalTile goal={Goals.HOUSE} selectedGoal={goal} setGoal={setGoal} />
        <GoalTile goal={Goals.BABY} selectedGoal={goal} setGoal={setGoal} />
      </Grid>
      <Grid container item>
        <GoalTile goal={Goals.HOLIDAY} selectedGoal={goal} setGoal={setGoal} />
        <GoalTile goal={Goals.UNIVERSITY} selectedGoal={goal} setGoal={setGoal} />
      </Grid>
      <Grid container item xs={12}>
        <Button
          data-testid="select"
          variant="contained"
          color="primary"
          fullWidth
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
