import { graphql, useStaticQuery } from 'gatsby';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import { Box, Grid, Spacer, Typography } from '../../atoms';
import { RootState } from '../../../store';
import { MyAccountLayout } from '../../templates';
import { getProjections } from '../../../services/projections';
import { AllAssets } from '../../../services/assets';
import PerformanceProjectionsChart from '../../organisms/PerformanceProjectionsChart/PerformanceProjectionsChart';
import { usePerformanceProjectionsChartStyles } from '../../organisms/PerformanceProjectionsChart/performanceProjectionsChartStyles/performanceProjectionsChartStyles';
import useProjectionsDataForChart from '../../../services/projections/hooks/useProjectionsDataForChart';
import { useAnnualHistoricalDataForChart } from '../../organisms/PerformanceProjectionsChart/performanceProjectionsData';
import useGoalsDataForChart from '../../../services/goal/hooks/useGoalsDataForChart';
import useProjectionsMetadataForChart from '../../../services/projections/hooks/useProjectionsMetadataForChart';

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

  const dispatch = useDispatch();

  const projectionsData = useProjectionsDataForChart();
  const annualHistoricalData = useAnnualHistoricalDataForChart();
  const goalsData = useGoalsDataForChart();
  const projectionsMetadata = useProjectionsMetadataForChart();
  const performanceProjectionsChartStyles = usePerformanceProjectionsChartStyles();

  const hasDataForChart =
    projectionsData.length > 0 &&
    annualHistoricalData.length > 0 &&
    goalsData.length > 0 &&
    projectionsMetadata;

  const fundData = useStaticQuery<AllAssets>(query);

  useEffect(() => {
    dispatch(getProjections({ contactId, fundData }));
  }, []);

  return (
    <MyAccountLayout stretch>
      <Typography variant="h2">XO projection spike</Typography>
      <Spacer y={2} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {hasDataForChart ? (
            <Box p={2}>
              <PerformanceProjectionsChart
                projectionsData={projectionsData}
                annualHistoricalData={annualHistoricalData}
                goalsData={goalsData}
                projectionsMetadata={projectionsMetadata}
              />
            </Box>
          ) : (
            <Skeleton height={performanceProjectionsChartStyles.DIMENSION.DESKTOP.height} />
          )}
        </Grid>
      </Grid>
    </MyAccountLayout>
  );
};

export default DashPage;
