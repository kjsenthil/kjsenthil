import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import { Link, Spacer, Typography } from '../../atoms';
import { MyAccountLayout } from '../../templates';
import { fetchProjections } from '../../../services/projections';

import PerformanceProjectionsChart from '../../organisms/PerformanceProjectionsChart/PerformanceProjectionsChart';
import { useHistoricalDataForProjectionsChart } from '../../../services/performance/hooks';
import ProjectionCalculateModal from '../../organisms/ProjectionCalculateModalContent/ProjectionCalculateModalContent';
import useProjectionsDataForProjectionsChart from '../../../services/projections/hooks/useProjectionsDataForProjectionsChart';

import useProjectionsMetadataForProjectionsChart from '../../../services/projections/hooks/useProjectionsMetadataForProjectionsChart';
import { useDispatchThunkOnRender, useGoalsDataForChart } from '../../../hooks';
import { Disclaimer } from './LifePlanPage.styles';
import { MainCard, Modal } from '../../molecules';
import { getPossessiveSuffix } from '../../../utils/string';
import { RootState } from '../../../store';
import useAllAssets from '../../../services/assets/hooks/useAllAssets';
import { usePerformanceProjectionsChartDimension } from '../../organisms/PerformanceProjectionsChart/performanceProjectionsChartDimension/usePerformanceProjectionsChartDimension';

const LifePlanPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const {
    client: { included: clientData },
    investmentSummary: { data: investmentSummaryData },
    projections: { status: projectionsStatus, postProjectionsError: projectionsError },
  } = useSelector((state: RootState) => state);

  const dispatch = useDispatch();

  // TODO: this is annual data at the moment. When the new projection data is
  //  available, this probably will be monthly data.
  const annualProjectionsData = useProjectionsDataForProjectionsChart();

  const annualHistoricalData = useHistoricalDataForProjectionsChart('annual');
  const goalsData = useGoalsDataForChart();
  const projectionsMetadata = useProjectionsMetadataForProjectionsChart();
  const performanceProjectionsChartDimension = usePerformanceProjectionsChartDimension();
  const hasDataForProjectionsChart =
    annualProjectionsData.length > 0 &&
    annualHistoricalData.length > 0 &&
    goalsData.length > 0 &&
    projectionsMetadata;

  // TODO: this should probably live in Redux so it persists. May be a metadata
  //  state that holds user-configured stuff?
  const [showLifePlanChartLikelyRange, setShowLifePlanChartLikelyRange] = React.useState(true);
  const toggleLifePlanChartLikelyRange = () => setShowLifePlanChartLikelyRange((prev) => !prev);

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
              projectionsData={annualProjectionsData}
              historicalData={annualHistoricalData}
              goalsData={goalsData}
              projectionsMetadata={projectionsMetadata}
              showLikelyRange={showLifePlanChartLikelyRange}
              toggleLikelyRange={toggleLifePlanChartLikelyRange}
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
        <Skeleton height={performanceProjectionsChartDimension.height} />
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
