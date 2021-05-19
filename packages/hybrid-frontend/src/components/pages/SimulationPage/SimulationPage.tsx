import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Grid, Typography } from '../../atoms';
import { ProjectionRequest, ProjectionResponse } from '../../../services/projections';
import { postProjections } from '../../../services/projections/api';
import { ProjectionsChart, ProjectionsGrid, SimulationForm } from '../../organisms';
import { RootState } from '../../../store';
import { MyAccountLayout } from '../../templates';

const SimulationPage = () => {
  const { goalCapture } = useSelector((state: RootState) => state.goal);

  const [projections, setProjections] = useState<ProjectionResponse | undefined>(undefined);

  const onFormSubmit = async (formValues: ProjectionRequest) => {
    const projectionsResponse = await postProjections(formValues);
    setProjections(projectionsResponse);
  };

  const goalValsFromState = {
    monthlyInvestment: Number(goalCapture.monthlyInvestment),
    upfrontInvestment: Number(goalCapture.upfrontInvestment),
    investmentPeriod: 30,
  };

  return (
    <MyAccountLayout>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Simulation Page
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              {projections?.projections && (
                <>
                  <ProjectionsGrid projections={projections.projections} />
                  <ProjectionsChart projections={projections.projections} />
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              <SimulationForm onSubmit={onFormSubmit} projInputStateVals={goalValsFromState} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </MyAccountLayout>
  );
};

export default SimulationPage;
