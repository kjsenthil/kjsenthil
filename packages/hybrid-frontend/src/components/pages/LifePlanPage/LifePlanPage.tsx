import React from 'react';
import Img from 'gatsby-image';
import { navigate } from 'gatsby';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import { Link, Spacer, Typography } from '../../atoms';
import { MyAccountLayout } from '../../templates';
import {
  ProjectionCalculateModal,
  PerformanceProjectionsChart,
  GoalMainCardPlaceholder,
} from '../../organisms';

import {
  useBasicInfo,
  useGoalImages,
  useProjectionsChartData,
  useStateIsAvailable,
  useSimulatedProjectionsData,
  useDispatchThunkOnRender,
} from '../../../hooks';
import { Disclaimer } from './LifePlanPage.styles';
import { MainCard, Modal } from '../../molecules';
import { getPossessiveSuffix } from '../../../utils/string';
import { RootState } from '../../../store';
import useAllAssets from '../../../services/assets/hooks/useAllAssets';
import { createGoal, GoalCategory, GoalDefaults, GoalType } from '../../../services/goal';
import usePerformanceProjectionsChartDimension from '../../organisms/PerformanceProjectionsChart/hooks/usePerformanceProjectionsChartDimension/usePerformanceProjectionsChartDimension';
import { callPostUpdateCurrentProjections } from '../../../services/projections/asyncCallers';
import useAccountBreakdownInfo from '../../../hooks/useAccountBreakdownInfo';
import { calculateDateAfterYears } from '../../../utils/date';
import { fetchPerformanceContact } from '../../../services/performance';
import { goalCreationPaths } from '../../../config/paths';
import { fetchSimulatedProjections } from '../../../services/projections';

const LifePlanPage = () => {
  const images = useGoalImages();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [showLifePlanChartLikelyRange, setShowLifePlanChartLikelyRange] = React.useState(true);
  const toggleLifePlanChartLikelyRange = () => setShowLifePlanChartLikelyRange((prev) => !prev);

  const {
    client: { included: clientData },
    investmentSummary: { data: investmentSummaryData },
    currentGoals: { data: currentGoals = [] },
    simulatedProjections: { status: simulatedProjectionsStatus },
    goalCurrentProjections: { status: goalCurrentProjectionsStatus },
    goalTargetProjections: { status: goalTargetProjectionsStatus },
    performance: { status: performanceStatus },
  } = useSelector((state: RootState) => state);

  const dispatch = useDispatch();

  const performanceProjectionsChartDimension = usePerformanceProjectionsChartDimension();

  const {
    goalsData,
    projectionsData,
    historicalData,
    projectionsTargetData,
    projectionsMetadata,
  } = useProjectionsChartData({
    goalCategory: GoalCategory.RETIREMENT,
    shouldFallbackToUncategorised: true,
  });

  const isUncategorisedGoal = goalsData[0] && goalsData[0].category === GoalCategory.UNCATEGORIZED;
  const simulatedProjectionsData = useSimulatedProjectionsData();

  const stateIsReady = useStateIsAvailable(['currentGoals']);

  const hasDataForSimulatedProjectionsChart =
    isUncategorisedGoal &&
    !!historicalData.length &&
    !!goalsData.length &&
    !!simulatedProjectionsData.length;

  const hasDataForGoalProjectionsChart =
    !isUncategorisedGoal &&
    !!historicalData.length &&
    !!goalsData.length &&
    !!projectionsData.length &&
    !!projectionsTargetData.length;

  const { accountBreakdown } = useAccountBreakdownInfo();
  const { dateOfBirth } = useBasicInfo();
  const fundData = useAllAssets();

  const retirementGoal = currentGoals.find(
    (goal) => goal.fields.category === GoalCategory.RETIREMENT
  );

  useDispatchThunkOnRender(
    () => {
      dispatch(fetchPerformanceContact());
    },
    performanceStatus,
    {
      enabled: !historicalData.length,
    }
  );

  useDispatchThunkOnRender(
    () => {
      dispatch(
        fetchSimulatedProjections({
          fundData,
          investmentPeriod: projectionsMetadata.investmentPeriod,
        })
      );
    },
    simulatedProjectionsStatus,
    {
      enabled: isUncategorisedGoal,
    }
  );

  const shouldFetchProjections =
    clientData &&
    investmentSummaryData &&
    retirementGoal &&
    !['success', 'loading'].includes(goalTargetProjectionsStatus) &&
    !projectionsTargetData.length &&
    !['success', 'loading'].includes(goalCurrentProjectionsStatus) &&
    !projectionsData.length;

  React.useEffect(() => {
    if (shouldFetchProjections) {
      callPostUpdateCurrentProjections(dispatch)({
        clientAge: projectionsMetadata.todayAge,
        drawdownStartDate: calculateDateAfterYears(
          dateOfBirth,
          retirementGoal?.fields?.objectiveFrequencyStartAge || GoalDefaults.DRAW_DOWN_START_AGE
        ),
        drawdownEndDate: calculateDateAfterYears(
          dateOfBirth,
          retirementGoal?.fields?.objectiveFrequencyEndAge || GoalDefaults.DRAW_DOWN_END_AGE
        ),
        drawdownAmount: Number(retirementGoal?.fields?.regularDrawdown?.val?.value?.val),
        lumpSum: 0, // determine if needed
        laterLifeLeftOver: 0, // determine if needed
        shouldIncludeStatePension: false, // determine if needed,
        fees: 0,
        accountBreakdown,
        investmentSummary: investmentSummaryData,
        includedClientAccounts: clientData,
        fundData,
      });
    }
  }, [fundData, clientData, retirementGoal, investmentSummaryData, shouldFetchProjections]);

  const linkClickHandler = () => setIsModalOpen(true);
  const modalCloseHandler = () => setIsModalOpen(false);

  const createDefaultGoalHandler = () => {
    dispatch(createGoal({ goalType: GoalType.UNCATEGORIZED }));
  };

  return (
    <MyAccountLayout
      heading={(basicInfo) => ({
        primary: `Life plan`,
        secondary: `${basicInfo.firstName}${getPossessiveSuffix(basicInfo.firstName)}`,
      })}
    >
      {/* eslint-disable no-nested-ternary */}
      {hasDataForGoalProjectionsChart || hasDataForSimulatedProjectionsChart ? (
        <>
          <MainCard>
            <PerformanceProjectionsChart
              showLikelyRange={showLifePlanChartLikelyRange}
              toggleLikelyRange={toggleLifePlanChartLikelyRange}
              projectionsData={isUncategorisedGoal ? simulatedProjectionsData : projectionsData}
              projectionsTargetData={projectionsTargetData}
              historicalData={historicalData}
              projectionsMetadata={projectionsMetadata}
              goalsData={isUncategorisedGoal ? [] : goalsData}
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
      ) : stateIsReady && goalsData.length === 0 ? (
        <GoalMainCardPlaceholder
          vertical={false}
          title="What's important to you?"
          buttons={goalCreationPaths}
          imageElement={
            <Img fluid={images.lifePlan.childImageSharp.fluid} alt="Lifeplan chart placeholder" />
          }
          onAddGoal={(path) => navigate(path)}
          onCreateDefaultGoal={createDefaultGoalHandler}
        />
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
