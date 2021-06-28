import * as React from 'react';
import MainCard, { MainCardProps } from '../../molecules/MainCard';
import { Grid, Spacer, Link, Typography, Button } from '../../atoms';

export interface GoalMainCardPlaceholderProps extends Omit<MainCardProps, 'children'> {
  imageElement: React.ReactElement;
  onCreateDefaultGoal: () => void;
  onRetirementClick: () => void;
}

const GoalMainCardPlaceholder = ({
  title,
  renderActionEl,
  imageElement,
  onCreateDefaultGoal,
  onRetirementClick,
}: GoalMainCardPlaceholderProps) => (
  <MainCard title={title} respondTo="sm" renderActionEl={renderActionEl}>
    <Grid item container xs={12}>
      <Grid item xs={12}>
        <Typography variant="b2" color="primary" colorShade="dark2">
          Save enough money for your most important moments by adding them to your life plan.
        </Typography>
        <Spacer y={3} />
        {imageElement}
      </Grid>
      <Grid item xs={12}>
        <Spacer y={3} />
        <Typography variant="sh3" color="primary" colorShade="dark2">
          What&#39;s important to you
        </Typography>
        <Spacer y={3} />
      </Grid>

      <Grid container item justify="space-between" spacing={1}>
        <Grid item xs={4}>
          <Button fullWidth variant="outlined" color="primary" onClick={onRetirementClick}>
            Retirement
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth variant="outlined" color="primary">
            Buying a home
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth variant="outlined" color="primary">
            My Child&#39;s education
          </Button>
        </Grid>
        <Grid container item justify="space-between" spacing={1}>
          <Grid item xs={4}>
            <Button fullWidth variant="outlined" color="primary">
              Starting a business
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth variant="outlined" color="primary">
              Emergency fund
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth variant="outlined" color="primary">
              Something else
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item container alignItems="center" justify="center">
        <Grid item>
          <Spacer y={2} />
          <Link onClick={onCreateDefaultGoal}>
            I don&#39;t have a specific goal. Just show me my projections.
          </Link>
        </Grid>
      </Grid>
    </Grid>
  </MainCard>
);

export default GoalMainCardPlaceholder;
