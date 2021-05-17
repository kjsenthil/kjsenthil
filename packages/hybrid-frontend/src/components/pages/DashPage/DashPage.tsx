import { graphql, useStaticQuery } from 'gatsby';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Spacer, Typography } from '../../atoms';
import { RootState } from '../../../store';
import { MyAccountLayout } from '../../templates';
import { getProjections } from '../../../services/projections';
import { ProjectionsChart, ProjectionsGrid } from '../../organisms';
import { AllAssets } from '../../../services/assets';

const query = graphql`
  query Funds {
    allAsset {
      nodes {
        riskModel: taamodel
        sedol
        equityProportion
      }
    }
  }
`;

const DashPage = () => {
  const { contactId = '' } = useSelector((state: RootState) => state.auth);
  const { projections } = useSelector((state: RootState) => state.projections);
  const dispatch = useDispatch();

  const fundData = useStaticQuery<AllAssets>(query);

  useEffect(() => {
    dispatch(getProjections({ contactId, fundData }));
  }, []);

  return (
    <MyAccountLayout>
      <Typography variant="h2">XO projection spike</Typography>
      <Spacer y={2} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {projections?.projections && (
            <>
              <ProjectionsGrid projections={projections.projections} />
              <ProjectionsChart projections={projections.projections} />
            </>
          )}
        </Grid>
      </Grid>
    </MyAccountLayout>
  );
};

export default DashPage;
