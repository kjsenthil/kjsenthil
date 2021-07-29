import * as React from 'react';
import { navigate } from 'gatsby';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { InputFieldsKeys } from '../../../services/goal/machines/lifePlan';
import { GoalCategory, GoalDefaults } from '../../../services/goal';
import { fetchPerformanceAccountsAggregated } from '../../../services/performance';
import {
  useLifePlanMachine,
  useProjectionsChartData,
  useDispatchThunkOnRender,
  useLifePlanMachineHandlers,
  useGoalPotTrackerProgressBarData,
} from '../../../hooks';
import { NavPaths } from '../../../config/paths';
import PlanningSubPage from './PlanningSubPage/PlanningSubPage';
import GoalCreationFundingSubPage from './FundingSubPage/GoalCreationFundingSubPage';
import GoalCreationLayout, {
  useGoalCreationLayoutIsMobile,
} from '../../templates/GoalCreationLayoutExperimental';
import { GoalPotTracker, GoalTrackingWidget } from '../../organisms';
import PerformanceProjectionsSimplifiedChart from '../../organisms/PerformanceProjectionsChart/PerformanceProjectionsSimplifiedChart';

const goToLifePlanPage = () => navigate(NavPaths.LIFE_PLAN_PAGE);

const LifePlanManagementPageExperimental = () => {
  const dispatch = useDispatch();

  const {
    performance: { status: performanceStatus },
  } = useSelector((state: RootState) => state);

  const {
    state: { context, matches, value: stateValue },
    send,
    service,
    isLoading,
  } = useLifePlanMachine();

  const handlers = useLifePlanMachineHandlers({ send, context });

  service.onTransition(({ done }) => {
    if (done) {
      goToLifePlanPage();
    }
  });

  const {
    index,
    drawdownStartDate,
    drawdownStartAge,
    drawdownEndAge,
    drawdownEndDate,
    drawdownPeriodLengthYears,
    annualIncome,
    monthlyIncome,
    annualIncomeInTomorrowsMoney,
    monthlyIncomeInTomorrowsMoney,
    lumpSum,
    lumpSumAge,
    shouldIncludeStatePension,
    laterLifeLeftOver,
    errors,
    hasFetchedProjections,
  } = context;

  const doesGoalExist = !!index;

  React.useEffect(() => {
    if (!hasFetchedProjections && matches('planningYourRetirement.normal')) {
      handlers.handleCustomEvent('FETCH_PROJETIONS');
    }
  }, [hasFetchedProjections, matches('planningYourRetirement.normal')]);

  const projectionsData = useProjectionsChartData({
    goalCategory: GoalCategory.RETIREMENT,
    fallbackGoalData: {
      objectiveFrequencyStartAge: drawdownStartAge,
    },
  });

  const dispatchGetPerformanceContact = () => dispatch(fetchPerformanceAccountsAggregated());

  useDispatchThunkOnRender(dispatchGetPerformanceContact, performanceStatus, {
    enabled: !!projectionsData.projectionsData,
  });

  const drawdownPeriodDeviationFromAverage =
    drawdownPeriodLengthYears - GoalDefaults.AVERAGE_DRAW_DOWN_PERIOD_IN_YEARS;

  let drawdownPeriodDeviationFromAverageComparison = '';

  if (drawdownPeriodDeviationFromAverage === 0) {
    drawdownPeriodDeviationFromAverageComparison = 'the same as';
  } else if (drawdownPeriodDeviationFromAverage > 0) {
    drawdownPeriodDeviationFromAverageComparison = `${Math.abs(
      drawdownPeriodDeviationFromAverage
    )} more than`;
  } else {
    drawdownPeriodDeviationFromAverageComparison = `${Math.abs(
      drawdownPeriodDeviationFromAverage
    )} less than`;
  }

  const displayError = (field: InputFieldsKeys) =>
    matches('planningYourRetirement.invalid') ? errors?.[field] : undefined;

  const isMobile = useGoalCreationLayoutIsMobile();

  const goalPotTotal = Math.max(annualIncome * (drawdownEndAge - drawdownStartAge), 0);

  const { goalPotTrackerProgressBarData, ...trackerProps } = useGoalPotTrackerProgressBarData({
    doesGoalExist,
    goalPotTotal,
    drawdownStartAge,
    drawdownEndAge,
    lumpSum,
    laterLifeLeftOver,
  });

  const currentStateValue =
    typeof stateValue === 'string' ? stateValue : Object.keys(stateValue)[0];

  const renderContentSide = () =>
    doesGoalExist ? (
      <>
        <PerformanceProjectionsSimplifiedChart {...projectionsData} />
        <GoalTrackingWidget
          progressBarData={goalPotTrackerProgressBarData}
          drawdownStartAge={drawdownStartAge}
          drawdownEndAge={drawdownEndAge}
          {...trackerProps}
        />
      </>
    ) : (
      <GoalPotTracker
        title="Your retirement pot"
        potTotal={goalPotTotal}
        progressBarProps={{
          progressBarData: goalPotTrackerProgressBarData,
        }}
      />
    );

  const renderSubPage = () => {
    switch (currentStateValue) {
      case 'planningYourRetirement':
        return (
          <PlanningSubPage
            {...handlers}
            renderContentSide={renderContentSide}
            lumpSumAmount={lumpSum}
            lumpSumAge={lumpSumAge}
            displayError={displayError}
            annualIncome={annualIncome}
            monthlyIncome={monthlyIncome}
            annualIncomeInTomorrowsMoney={annualIncomeInTomorrowsMoney}
            monthlyIncomeInTomorrowsMoney={monthlyIncomeInTomorrowsMoney}
            drawdownEndAge={drawdownEndAge}
            drawdownEndDate={drawdownEndDate}
            remainingAmount={laterLifeLeftOver}
            drawdownStartAge={drawdownStartAge}
            drawdownStartDate={drawdownStartDate}
            drawdownPeriodLengthYears={drawdownPeriodLengthYears}
            drawdownPeriodDeviationFromAverageComparison={
              drawdownPeriodDeviationFromAverageComparison
            }
          />
        );
      case 'fundingYourRetirement':
        return (
          <GoalCreationFundingSubPage
            renderContentSide={renderContentSide}
            shouldIncludeStatePension={shouldIncludeStatePension}
            handleStatePensionSelection={handlers.handleStatePensionSelection}
          />
        );
      default:
        return null;
    }
  };

  return (
    <GoalCreationLayout
      iconAlt="goal image"
      iconSrc="/goal-graphic.png"
      onCancelHandler={goToLifePlanPage}
      onDeleteHandler={doesGoalExist ? handlers.handleGoalDelete : undefined}
      progressButtonTitle="Save"
      isLoading={isLoading}
      progressEventHandler={handlers.handleGoalSave}
      title="Your life after work"
      tabsNavigationProps={{
        currentPath:
          currentStateValue === 'planningYourRetirement'
            ? 'SWITCH_TO_PLANNING'
            : 'SWITCH_TO_FUNDING',
        onClick: (type) => {
          handlers.handleCustomEvent(type);
          navigate('#step-1');
        },
        tabs: [
          {
            path: 'SWITCH_TO_PLANNING',
            label: isMobile ? 'Planning' : 'Planning your retirement',
          },
          {
            path: 'SWITCH_TO_FUNDING',
            label: isMobile ? 'Funding' : 'Funding your retirement',
            disabled: !doesGoalExist,
          },
        ],
      }}
    >
      {renderSubPage()}
    </GoalCreationLayout>
  );
};

export default LifePlanManagementPageExperimental;
