import React from 'react';
import Img from 'gatsby-image';
import { navigate } from 'gatsby';
import { useSelector } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import {
  Button,
  DisabledComponent,
  Link,
  Spacer,
  Typography,
  ProjectionCalculateModal,
  PerformanceProjectionsChart,
  GoalMainCardPlaceholder,
  GoalProgressCard,
  GoalSetUpNewCard,
  MainCard,
  Modal,
  UpsellCard,
  usePerformanceProjectionsChartDimension,
} from '@tswdts/react-components';
import { MyAccountLayout } from '../../templates';
import {
  useAccountIds,
  useBasicInfo,
  useDispatchThunkOnRender,
  useGoalImages,
  useProjectionsChartData,
  useSimulatedProjectionsData,
  useStateIsAvailable,
  useUpdateSimulateProjectionsPrerequisites,
} from '../../../hooks';
import { Disclaimer, YourImportantMomentsContainer } from './LifePlanPage.styles';
import { RootState, useAppDispatch } from '../../../store';
import useAllAssets from '../../../services/assets/hooks/useAllAssets';
import {
  createGoal,
  GoalCategory,
  goalDataForChart,
  GoalDefaults,
  GoalType,
} from '../../../services/goal';
import { calculateDateAfterYears } from '../../../utils/date';
import { fetchPerformanceAccountsAggregated } from '../../../services/performance';
import { goalCreationPaths } from '../../../config/paths';
import {
  fetchSimulatedProjections,
  fetchGoalSimulateProjections,
  prepareSimulateProjectionsRequestPayload,
} from '../../../services/projections';

const LifePlanPage = () => {
  const images = useGoalImages();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [showLifePlanChartLikelyRange, setShowLifePlanChartLikelyRange] = React.useState(true);
  const toggleLifePlanChartLikelyRange = () => setShowLifePlanChartLikelyRange((prev) => !prev);

  const {
    client: { included: clientData },
    investmentAccounts: { data: investmentAccounts },
    investmentSummary: { data: investmentSummaryData },
    currentGoals: { data: currentGoals = [] },
    simulatedProjections: { status: simulatedProjectionsStatus },
    goalSimulateProjections: {
      data: goalSimulateProjections,
      status: goalSimulateProjectionsStatus,
    },
    performance: { status: performanceStatus },
  } = useSelector((state: RootState) => state);

  const basicInfo = useBasicInfo();

  const accountIds = useAccountIds();
  const hasAccountIds = accountIds && accountIds.length > 0;

  const dispatch = useAppDispatch();

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
  const simulatedProjectionsData = useSimulatedProjectionsData({
    firstDate: historicalData && historicalData.length > 0 ? historicalData[0].date : undefined,
  });

  const hasFetchedGoals = useStateIsAvailable(['currentGoals']);

  const hasDataForSimulatedProjectionsChart =
    isUncategorisedGoal &&
    !!historicalData.length &&
    !!goalsData.length &&
    !!simulatedProjectionsData.length;

  const hasDataForGoalProjectionsChart =
    !isUncategorisedGoal &&
    !!historicalData.length &&
    !!goalsData.length &&
    !!projectionsData.length;

  const { dateOfBirth } = basicInfo;
  const fundData = useAllAssets();

  const retirementGoal = currentGoals.find(
    (goal) => goal.fields.category === GoalCategory.RETIREMENT
  );

  const projectionsPrerequisitesPayload = useUpdateSimulateProjectionsPrerequisites();
  const {
    riskProfile,
    assetModel,
    monthlyContributions,
    portfolioCurrentValue,
    totalNetContributions,
  } = projectionsPrerequisitesPayload;

  useDispatchThunkOnRender(
    () => {
      dispatch(fetchPerformanceAccountsAggregated());
    },
    performanceStatus,
    {
      enabled: !historicalData.length && hasAccountIds,
    }
  );

  useDispatchThunkOnRender(
    () => {
      if (riskProfile) {
        dispatch(
          fetchSimulatedProjections({
            riskProfile,
            monthlyInvestment: monthlyContributions!,
            upfrontInvestment: totalNetContributions!,
            investmentPeriod: projectionsMetadata.investmentPeriod,
          })
        );
      }
    },
    simulatedProjectionsStatus,
    {
      enabled:
        isUncategorisedGoal &&
        !!riskProfile &&
        monthlyContributions !== undefined &&
        portfolioCurrentValue !== undefined,
    }
  );

  const shouldFetchProjections =
    clientData &&
    investmentSummaryData &&
    retirementGoal &&
    !['success', 'loading'].includes(goalSimulateProjectionsStatus) &&
    !projectionsTargetData.length &&
    !projectionsData.length;

  React.useEffect(() => {
    if (
      shouldFetchProjections &&
      assetModel &&
      monthlyContributions !== undefined &&
      portfolioCurrentValue !== undefined &&
      totalNetContributions !== undefined
    ) {
      const projectionsPayload = prepareSimulateProjectionsRequestPayload({
        clientAge: projectionsMetadata.todayAge,
        drawdownStartDate: calculateDateAfterYears(
          dateOfBirth,
          retirementGoal?.fields?.objectiveFrequencyStartAge || GoalDefaults.DRAW_DOWN_START_AGE
        ),
        drawdownEndDate: calculateDateAfterYears(
          dateOfBirth,
          retirementGoal?.fields?.objectiveFrequencyEndAge || GoalDefaults.DRAW_DOWN_END_AGE
        ),
        monthlyIncome: Number(retirementGoal?.fields?.regularDrawdown?.val?.value?.val),
        lumpSum: Number(retirementGoal?.fields?.biRetirementLumpSum),
        lumpSumDate: new Date(retirementGoal?.fields?.biRetirementLumpSumDate?.val!),
        laterLifeLeftOver: Number(retirementGoal?.fields?.biRetirementRemainingAmount),
        shouldIncludeStatePension: (retirementGoal?.fields?.biStatePensionAmount || 0) > 0.1,
        fees: 0.4,
        assetModel,
        monthlyContributions,
        portfolioCurrentValue,
        totalNetContributions,
        upfrontContribution: 0,
        upfrontContributionRequiredToFundDrawdown: 0,
      });
      dispatch(fetchGoalSimulateProjections(projectionsPayload));
    }
  }, [
    fundData,
    clientData,
    retirementGoal,
    investmentSummaryData,
    shouldFetchProjections,
    projectionsPrerequisitesPayload,
  ]);

  const linkClickHandler = () => setIsModalOpen(true);
  const modalCloseHandler = () => setIsModalOpen(false);

  const createDefaultGoalHandler = () => {
    dispatch(createGoal({ goalType: GoalType.UNCATEGORIZED }));
  };

  return (
    <MyAccountLayout
      basicInfo={basicInfo}
      heading={{
        primary: `Life plan`,
        secondary: 'Your',
      }}
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
            <Typography display="inline" variant="b5" color="grey" colorShade="dark1">
              Such forecasts are not a reliable indicator of future performance
            </Typography>
            <Link special onClick={linkClickHandler}>
              Tell me more
            </Link>
          </Disclaimer>
        </>
      ) : hasFetchedGoals && goalsData.length === 0 ? (
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

      <MainCard title="Your important moments">
        <YourImportantMomentsContainer>
          {retirementGoal && goalSimulateProjections && (
            <GoalProgressCard
              onTrackPercentage={goalSimulateProjections.goal?.onTrack?.percentage ?? 0}
              affordableValues={[
                goalSimulateProjections.goal?.drawdownRetirement?.affordable?.lumpSum ?? 0,
                goalSimulateProjections.goal?.drawdownRetirement?.affordable?.totalDrawdown ?? 0,
                goalSimulateProjections.goal?.drawdownRetirement?.affordable?.remainingAmount ?? 0,
              ]}
              goalValue={goalSimulateProjections.goal?.desiredDiscountedOutflow ?? 0}
              shortfallValue={goalSimulateProjections?.goal?.shortfallSurplusAverage ?? 0}
              shortfallUnderperformValue={
                goalSimulateProjections?.goal?.shortfallSurplusUnderperform ?? 0
              }
              title={
                retirementGoal && retirementGoal.fields
                  ? goalDataForChart[retirementGoal.fields.category]?.label ?? ''
                  : ''
              }
              iconSrc="/goal-graphic.png"
              iconAlt="umbrella at the beach"
              investmentAccounts={
                investmentAccounts?.map(({ accountName }) => accountName ?? '') ?? []
              }
              navigateToEditGoalPage={() => navigate(goalCreationPaths.retirement.path ?? '')}
            />
          )}
          <DisabledComponent title="Coming soon">
            <GoalSetUpNewCard
              imgProps={{
                src: images.setUpNew.childImageSharp.fluid.src,
                alt: 'dog holding newspaper',
                srcSet: images.setUpNew.childImageSharp.fluid.srcSet,
                sizes: images.setUpNew.childImageSharp.fluid.sizes,
              }}
            />
          </DisabledComponent>
        </YourImportantMomentsContainer>
      </MainCard>
      <Spacer y={5} />

      <UpsellCard title="Speak to a coach" respondTo="sm" background="triangle overlay">
        <Typography color="white" fontWeight="600" variant="b2">
          Not sure about putting your plan into action? Don&apos;t worry.
          <br />
          Our experienced, friendly coaches can talk through your goal with you and take a look at
          your different options.
        </Typography>
        <Button
          wrap="nowrap"
          color="white"
          variant="contained"
          href="https://online.bestinvest.co.uk/bestinvest-plus#/"
        >
          Book appointment
        </Button>
      </UpsellCard>
      <Modal
        maxWidth="md"
        fullWidth
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
