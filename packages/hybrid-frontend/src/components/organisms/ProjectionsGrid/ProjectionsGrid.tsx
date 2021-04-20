import React from 'react';
import { ProjectionYear } from '../../../types';
import { Grid } from '../../atoms';
import { ProjectionWidget, ProjectionType, ProjectionValue } from './ProjectionGrid.styles';

export interface ProjectionsGridProps {
  projections: ProjectionYear[];
}

const ProjectionsGrid: React.FC<ProjectionsGridProps> = ({ projections }) => {
  // the final projection year will have the overall totals
  const gridValues = projections[projections.length - 1];

  // TODO: move this helper to a utils file
  const getFormattedGbp = (value: number): string => {
    const currency = 'GBP';

    return new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(value);
  };

  return (
    <Grid container justify="center" spacing={1}>
      <Grid item xs={6} sm={3}>
        <ProjectionWidget topColor="#ccc">
          <ProjectionType>Contributions</ProjectionType>
          <ProjectionValue data-testid="projections-grid-contributions">
            {getFormattedGbp(gridValues.actual)}
          </ProjectionValue>
        </ProjectionWidget>
      </Grid>
      <Grid item xs={6} sm={3}>
        <ProjectionWidget topColor="#f00">
          <ProjectionType>Markets underperform</ProjectionType>
          <ProjectionValue>{getFormattedGbp(gridValues.low)}</ProjectionValue>
        </ProjectionWidget>
      </Grid>
      <Grid item xs={6} sm={3}>
        <ProjectionWidget topColor="#0085c2">
          <ProjectionType>Projected value</ProjectionType>
          <ProjectionValue>{getFormattedGbp(gridValues.medium)}</ProjectionValue>
        </ProjectionWidget>
      </Grid>
      <Grid item xs={6} sm={3}>
        <ProjectionWidget topColor="#70bc13">
          <ProjectionType>Markets overperform</ProjectionType>
          <ProjectionValue>{getFormattedGbp(gridValues.high)}</ProjectionValue>
        </ProjectionWidget>
      </Grid>
    </Grid>
  );
};

export default ProjectionsGrid;
