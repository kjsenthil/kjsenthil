import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { navigate } from 'gatsby';
import { useSelector } from 'react-redux';
import { dateOrUndefined, PerformanceProjectionsChart } from '@tswdts/react-components';
import { MyAccountLayout } from '../../templates';
import {
  useBasicInfo,
  useProjectionsChartData,
  useSimulatedProjectionsData,
  useUpdateSimulateProjectionsPrerequisites,
} from '../../../hooks';
import LifePlanLayout, { LifePlanGoalsData } from '../../templates/LifePlanLayout/LifePlanLayout';
import {
  DefaultViewSelectionValue,
  goalCreationLimits,
  goalSelectionTilesConfig,
} from './GoalSelection/config';
import { NavPaths } from '../../../config';
import { GoalCategory, GoalDefaults } from '../../../services/goal';
import {
  fetchGoalSimulateProjections,
  prepareSimulateProjectionsRequestPayload,
} from '../../../services/projections';
import { calculateDateAfterYears } from '../../../utils/date';
import { RootState, useAppDispatch } from '../../../store';
import useAllAssets from '../../../services/assets/hooks/useAllAssets';
import getGoalSelectionTiles from './GoalSelection/getGoalSelectionTiles';

const LifePlanPage = () => {
  const dispatch = useAppDispatch();
  const basicInfo = useBasicInfo();
  const fundData = useAllAssets();
  const {
    client: { included: clientData },
    investmentAccounts: { data: investmentAccounts },
    investmentSummary: { data: investmentSummaryData },
    currentGoals: { data: currentGoals = [] },
    goalSimulateProjections: {
      data: goalSimulateProjections,
      status: goalSimulateProjectionsStatus,
    },
  } = useSelector((state: RootState) => state);

  const retirementGoal = currentGoals.find(
    (goal) => goal.fields.category === GoalCategory.RETIREMENT
  );

  const {
    goalsData: chartGoalsData,
    projectionsData,
    historicalData,
    projectionsTargetData,
    projectionsMetadata,
  } = useProjectionsChartData({
    goalCategory: GoalCategory.RETIREMENT,
    shouldFallbackToUncategorised: true,
  });
  const simulatedProjectionsData = useSimulatedProjectionsData();
  const projectionsPrerequisitesPayload = useUpdateSimulateProjectionsPrerequisites();
  const {
    assetModel,
    monthlyContributions,
    portfolioCurrentValue,
    totalNetContributions,
  } = projectionsPrerequisitesPayload;

  const [currentView, setCurrentView] = useState<string>(DefaultViewSelectionValue.ALL_GOALS);
  const [showLifePlanChartLikelyRange, setShowLifePlanChartLikelyRange] = useState(true);
  const shouldFetchProjections =
    clientData &&
    investmentSummaryData &&
    retirementGoal &&
    !['success', 'loading'].includes(goalSimulateProjectionsStatus) &&
    !projectionsTargetData.length &&
    !projectionsData.length;

  const calculateDrawdownStartDate = () =>
    calculateDateAfterYears(
      basicInfo.dateOfBirth,
      retirementGoal?.fields?.objectiveFrequencyStartAge || GoalDefaults.DRAW_DOWN_START_AGE
    );

  const calculateDrawdownEndDate = () =>
    calculateDateAfterYears(
      basicInfo.dateOfBirth,
      retirementGoal?.fields?.objectiveFrequencyEndAge || GoalDefaults.DRAW_DOWN_END_AGE
    );

  const calculateAgeAt = (date?: string | Date) =>
    date ? dayjs(date).diff(dayjs(basicInfo.dateOfBirth), 'year') : undefined;

  useEffect(() => {
    if (
      shouldFetchProjections &&
      assetModel &&
      monthlyContributions !== undefined &&
      portfolioCurrentValue !== undefined &&
      totalNetContributions !== undefined
    ) {
      const projectionsPayload = prepareSimulateProjectionsRequestPayload({
        clientAge: projectionsMetadata.todayAge,
        drawdownStartDate: calculateDrawdownStartDate(),
        drawdownEndDate: calculateDrawdownEndDate(),
        monthlyIncome: Number(retirementGoal?.fields?.regularDrawdown?.val?.value?.val),
        lumpSum: retirementGoal?.fields.biRetirementLumpSum || 0,
        lumpSumDate: dateOrUndefined(retirementGoal?.fields.biRetirementLumpSumDate?.val),
        laterLifeLeftOver: retirementGoal?.fields.biRetirementRemainingAmount || 0,
        shouldIncludeStatePension: !!retirementGoal?.fields.biStatePensionAmount,
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

  const toggleLifePlanChartLikelyRange = () => setShowLifePlanChartLikelyRange((prev) => !prev);
  const isUncategorisedGoal =
    chartGoalsData[0] && chartGoalsData[0].category === GoalCategory.UNCATEGORIZED;
  const hasHistoricalData = !!historicalData.length;
  const hasGoalsData = !!chartGoalsData.length;
  const hasSimulatedProjectionData = isUncategorisedGoal && !!simulatedProjectionsData.length;
  const hasGoalProjectionData = !isUncategorisedGoal && !!projectionsData.length;
  const showChart =
    hasHistoricalData && hasGoalsData && (hasSimulatedProjectionData || hasGoalProjectionData);

  const goalsData: LifePlanGoalsData[] =
    showChart && goalSimulateProjections
      ? [
          {
            name: retirementGoal?.fields.description || '',
            category: GoalCategory.RETIREMENT,
            iconSrc: '/goals/large/retirement.jpg',
            lumpSumDate: dateOrUndefined(retirementGoal?.fields.biRetirementLumpSumDate?.val),
            startDate: calculateDrawdownStartDate(),
            endDate: calculateDrawdownEndDate(),
            ageAtLumpSumDate: calculateAgeAt(retirementGoal?.fields.biRetirementLumpSumDate?.val),
            ageAtStartDate: calculateAgeAt(calculateDrawdownStartDate()),
            ageAtEndDate: calculateAgeAt(calculateDrawdownEndDate()),
            affordableAmount: goalSimulateProjections.goal.affordableUnDiscountedOutflowAverage,
            affordableAmountUnderperform:
              goalSimulateProjections.goal.affordableUndiscountedOutflowUnderperform,
            targetAmount: goalSimulateProjections.goal.desiredDiscountedOutflow,
            shortfall: goalSimulateProjections.goal.shortfallSurplusAverage,
            onTrackPercentage: goalSimulateProjections.goal.onTrack.percentage,
            lumpSum: goalSimulateProjections.goal.drawdownRetirement?.affordable.lumpSum,
            totalAffordableDrawdown:
              goalSimulateProjections.goal.drawdownRetirement?.affordable.totalDrawdown,
            remainingAmount:
              goalSimulateProjections.goal.drawdownRetirement?.affordable.remainingAmount,
            accounts: investmentAccounts?.map(({ accountName }) => accountName ?? '') ?? [],
          },
        ]
      : [];

  const projectionsChart = showChart ? (
    <PerformanceProjectionsChart
      showLikelyRange={showLifePlanChartLikelyRange}
      toggleLikelyRange={toggleLifePlanChartLikelyRange}
      projectionsData={isUncategorisedGoal ? simulatedProjectionsData : projectionsData}
      projectionsTargetData={projectionsTargetData}
      historicalData={historicalData}
      projectionsMetadata={projectionsMetadata}
      goalsData={isUncategorisedGoal ? [] : chartGoalsData}
    />
  ) : null;

  const goalSelectionTiles = getGoalSelectionTiles({
    goalsData,
    goalSelectionTilesConfig,
    goalCreationLimits,
  });

  return (
    <MyAccountLayout basicInfo={basicInfo}>
      <LifePlanLayout
        currentView={currentView}
        goalSelectionTiles={goalSelectionTiles}
        goToAllGoalsView={() => setCurrentView(DefaultViewSelectionValue.ALL_GOALS)}
        goToSingleGoalView={(newView) => setCurrentView(newView)}
        goToCreateGoalView={() => navigate(NavPaths.LIFE_PLAN_MANAGEMENT)}
        allGoalsOnTrackPercentage={goalsData[0]?.onTrackPercentage} // We only show one goal
        projectionChart={projectionsChart}
        goalsData={goalsData}
      />
    </MyAccountLayout>
  );
};

export default LifePlanPage;
