import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import { ProjectionYear } from '../../../api/getProjection';

export interface ProjectionsGridProps {
  projections: ProjectionYear[];
}

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: '1rem !important',
  },
  contribution: {
    backgroundColor: '#f5f5f5 !important',
    borderTop: '1px dashed #ccc',
    padding: '0.3rem !important',
  },
  underperform: {
    backgroundColor: '#f5f5f5 !important',
    borderTop: '1px solid #f00',
    padding: '0.3rem !important',
  },
  projected: {
    backgroundColor: '#f5f5f5 !important',
    borderTop: '1px solid #0085c2',
    padding: '0.3rem !important',
  },
  overperforms: {
    backgroundColor: '#f5f5f5 !important',
    borderTop: '1px solid #70bc13',
    padding: '0.3rem !important',
  },
  type: {
    fontSize: '0.8rem !important',
    color: '#7a7a7a',
  },
  value: {
    fontSize: '1rem',
    color: '#4a4a4a',
  },
}));

const ProjectionsGrid: React.FC<ProjectionsGridProps> = ({ projections }) => {
  const classes = useStyles();

  // the final projection year will have the overall totals
  const gridValues = projections[projections.length - 1];

  // TODO: move this helper to a utils file
  const getFormattedGbp = (value: number): string => {
    const currency = 'GBP';

    return new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(value);
  };

  return (
    <Grid container justify="center" className={classes.root} spacing={1}>
      <Grid item xs={6} sm={3}>
        <Paper elevation={0} className={classes.contribution}>
          <Typography className={classes.type}>Contributions</Typography>
          <Typography className={classes.value} data-testid="projections-grid-contributions">
            {getFormattedGbp(gridValues.actual)}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Paper elevation={0} className={classes.underperform}>
          <Typography className={classes.type}>Markets underperform</Typography>
          <Typography className={classes.value}>{getFormattedGbp(gridValues.low)}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Paper elevation={0} className={classes.projected}>
          <Typography className={classes.type}>Projected value</Typography>
          <Typography className={classes.value}>{getFormattedGbp(gridValues.medium)}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Paper elevation={0} className={classes.overperforms}>
          <Typography className={classes.type}>Markets overperform</Typography>
          <Typography className={classes.value}>{getFormattedGbp(gridValues.high)}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProjectionsGrid;
