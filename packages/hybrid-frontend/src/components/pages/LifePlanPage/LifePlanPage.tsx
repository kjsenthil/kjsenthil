import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import { Link, Spacer, Typography } from '../../atoms';
import { MyAccountLayout } from '../../templates';
import { fetchProjections } from '../../../services/projections';

import PerformanceProjectionsChart from '../../organisms/PerformanceProjectionsChart/PerformanceProjectionsChart';
import ProjectionCalculateModal from '../../organisms/ProjectionCalculateModalContent/ProjectionCalculateModalContent';

import {
  useCurrentProjectionsDataForProjectionsChart,
  useDispatchThunkOnRender,
  useGoalsDataForChart,
  useProjectionsMetadataForProjectionsChart,
  useHistoricalDataForProjectionsChart,
} from '../../../hooks';
import { Disclaimer } from './LifePlanPage.styles';
import { MainCard, Modal } from '../../molecules';
import { getPossessiveSuffix } from '../../../utils/string';
import { RootState } from '../../../store';
import useAllAssets from '../../../services/assets/hooks/useAllAssets';
import { usePerformanceProjectionsChartDimension } from '../../organisms/PerformanceProjectionsChart/performanceProjectionsChartDimension/usePerformanceProjectionsChartDimension';
import { fetchPerformanceContact } from '../../../services/performance';

const LifePlanPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const {
    client: { included: clientData },
    investmentSummary: { data: investmentSummaryData },
    performance: { status: performanceStatus },
    goalCurrentProjections: { status: projectionsStatus, error: projectionsError },
  } = useSelector((state: RootState) => state);

  const dispatch = useDispatch();

  // TODO: this is annual data at the moment. When the new projection data is
  //  available, this probably will be monthly data.
  const annualProjectionsData = useCurrentProjectionsDataForProjectionsChart();

  const projectionsMetadata = useProjectionsMetadataForProjectionsChart();
  const annualHistoricalData = useHistoricalDataForProjectionsChart('annual');
  const goalsData = useGoalsDataForChart();
  const performanceProjectionsChartDimension = usePerformanceProjectionsChartDimension();
  const hasDataForProjectionsChart = annualHistoricalData.length > 0 && goalsData.length > 0;

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

  const dispatchGetPerformanceContact = () => dispatch(fetchPerformanceContact());
  useDispatchThunkOnRender(dispatchGetPerformanceContact, performanceStatus, {
    enabled: !!annualHistoricalData,
  });
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
