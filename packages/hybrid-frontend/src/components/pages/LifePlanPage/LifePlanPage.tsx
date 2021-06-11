import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import { Link, Spacer, Typography } from '../../atoms';
import { MyAccountLayout } from '../../templates';
import { fetchProjections } from '../../../services/projections';

import PerformanceProjectionsChart from '../../organisms/PerformanceProjectionsChart/PerformanceProjectionsChart';
import { usePerformanceProjectionsChartStyles } from '../../organisms/PerformanceProjectionsChart/performanceProjectionsChartStyles/performanceProjectionsChartStyles';
import { useAnnualHistoricalDataForChart } from '../../organisms/PerformanceProjectionsChart/performanceProjectionsData';
import ProjectionCalculateModal from '../../organisms/ProjectionCalculateModalContent/ProjectionCalculateModalContent';

import useProjectionsDataForChart from '../../../services/projections/hooks/useProjectionsDataForChart';

import useGoalsDataForChart from '../../../services/goal/hooks/useGoalsDataForChart';
import useProjectionsMetadataForChart from '../../../services/projections/hooks/useProjectionsMetadataForChart';
import { Disclaimer } from './LifePlanPage.styles';
import { MainCard, Modal } from '../../molecules';
import { getPossessiveSuffix } from '../../../utils/string';
import { useDispatchThunkOnRender } from '../../../hooks';
import { RootState } from '../../../store';
import useAllAssets from '../../../services/assets/hooks/useAllAssets';

const LifePlanPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const {
    client: { included: clientData },
    investmentSummary: { data: investmentSummaryData },
    projections: { status: projectionsStatus, postProjectionsError: projectionsError },
  } = useSelector((state: RootState) => state);

  const dispatch = useDispatch();

  // Projected performance data
  const projectionsData = useProjectionsDataForChart();
  const annualHistoricalData = useAnnualHistoricalDataForChart();
  const goalsData = useGoalsDataForChart();
  const projectionsMetadata = useProjectionsMetadataForChart();
  const performanceProjectionsChartStyles = usePerformanceProjectionsChartStyles();
  const hasDataForProjectionsChart =
    projectionsData.length > 0 &&
    annualHistoricalData.length > 0 &&
    goalsData.length > 0 &&
    projectionsMetadata;

  const fundData = useAllAssets();

  // Fetch projections data for projections chart
  const dispatchFetchProjections = () =>
    dispatch(
      fetchProjections({ fundData, investmentPeriod: projectionsMetadata?.investmentPeriod ?? 0 })
    );
  const { maxRetriesHit: projectionsFetchMaxRetriesHit } = useDispatchThunkOnRender(
    dispatchFetchProjections,
    projectionsStatus,
    {
      enabled: fundData && clientData && investmentSummaryData && !!projectionsMetadata,
    }
  );

  const linkClickHandler = () => setIsModalOpen(true);
  const modalCloseHandler = () => setIsModalOpen(false);

  return (
    <MyAccountLayout
      heading={(basicInfo) => ({
        primary: `Life plan`,
        secondary: `${basicInfo.firstName}${getPossessiveSuffix(basicInfo.firstName)}`,
      })}
    >
      {/* eslint-disable-next-line no-nested-ternary */}
      {hasDataForProjectionsChart && projectionsMetadata ? (
        <>
          <MainCard>
            <PerformanceProjectionsChart
              projectionsData={projectionsData}
              annualHistoricalData={annualHistoricalData}
              goalsData={goalsData}
              projectionsMetadata={projectionsMetadata}
            />
          </MainCard>
          <Spacer y={1.5} />
          <Disclaimer>
            <Typography display="inline" variant="b3" color="grey" colorShade="dark1">
              Such forecasts are not a reliable indicator of future performance
            </Typography>
            <Link component="button" onClick={linkClickHandler}>
              Tell me more
            </Link>
          </Disclaimer>
        </>
      ) : projectionsFetchMaxRetriesHit && projectionsError ? (
        <Typography>{projectionsError}</Typography>
      ) : (
        <Skeleton height={performanceProjectionsChartStyles.DIMENSION.DESKTOP.height} />
      )}
      <Spacer y={5} />
      <MainCard title="Your important moments">Coming soon</MainCard>
      <Modal
        open={isModalOpen}
        onClose={modalCloseHandler}
        modalTitle="How was this projection calculated?"
      >
        <ProjectionCalculateModal />
      </Modal>
    </MyAccountLayout>
  );
};

export default LifePlanPage;
