import * as React from 'react';
import { navigate } from 'gatsby';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from '@reach/router';
import { RootState } from '../../../store';
import { InputFieldsKeys } from '../../../services/goal/machines/lifePlan';
import { GoalCategory, GoalDefaults } from '../../../services/goal';
import { fetchPerformanceAccountsAggregated } from '../../../services/performance';
import {
  useBreakpoint,
  useLifePlanMachine,
  useProjectionsChartData,
  useDispatchThunkOnRender,
  useLifePlanMachineHandlers,
  useGoalPotTrackerProgressBarData,
} from '../../../hooks';
import { NavPaths } from '../../../config/paths';
import PlanningSubPage from './PlanningSubPage/PlanningSubPage';
import GoalCreationFundingSubPage from './FundingSubPage/GoalCreationFundingSubPage';
import { GoalCreationLayout } from '../../templates';
import { GoalPotTracker, GoalTrackingWidget, PerformanceProjectionsChart } from '../../organisms';
import { Spacer, Grid } from '../../atoms';

const goToLifePlanPage = () => navigate(NavPaths.LIFE_PLAN_PAGE);

const LifePlanManagementPage = () => {
  const dispatch = useDispatch();
  const { hash: currentUrlHash } = useLocation();

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
    lumpSumDate,
    shouldIncludeStatePension,
    laterLifeLeftOver,
    errors,
    hasFetchedProjections,
    retirementPotValue,
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
      biRetirementLumpSumDate: { val: lumpSumDate?.toISOString() || '', type: 'Date' },
      objectiveFrequencyEndAge: drawdownEndAge,
    },
  });

  React.useEffect(() => {
    if (!currentUrlHash.match(/#step-(\d)/)) {
      navigate('#step-1');
    }
  }, []);

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

  const { isMobile } = useBreakpoint();

  const { goalPotTrackerProgressBarData, ...trackerProps } = useGoalPotTrackerProgressBarData({
    doesGoalExist,
    goalPotTotal: retirementPotValue,
    drawdownStartAge,
    drawdownEndAge,
    lumpSum,
    laterLifeLeftOver,
  });

  const currentStateValue =
    typeof stateValue === 'string' ? stateValue : Object.keys(stateValue)[0];

  const renderContentSide = () =>
    doesGoalExist ? (
      <Grid container>
        {isMobile || (
          <Grid item xs={12}>
            <PerformanceProjectionsChart
              showLikelyRange
              {...projectionsData}
              panelOptions={{
                displayContributions: false,
                displayLikelyRangeToggle: false,
                displayLikelyRangeLegend: false,
              }}
            />
            <Spacer y={4} />
          </Grid>
        )}
        <Grid item xs={12}>
          <GoalTrackingWidget
            progressBarData={goalPotTrackerProgressBarData}
            drawdownStartAge={drawdownStartAge}
            drawdownEndAge={drawdownEndAge}
            {...trackerProps}
          />
        </Grid>
      </Grid>
    ) : (
      <GoalPotTracker
        title="Your retirement pot"
        potTotal={retirementPotValue}
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

  const isLastStep =
    (currentUrlHash === '#step-4' && currentStateValue === 'planningYourRetirement') ||
    (currentUrlHash === '#step-2' && currentStateValue === 'fundingYourRetirement');

  const handleProgressEvent = () => {
    if (isLastStep || !isMobile) {
      handlers.handleGoalSave();
    } else {
      const [, currentStep] = currentUrlHash.match(/#step-(\d)/) || [];
      if (!Number.isNaN(Number(currentStep))) {
        navigate(`#step-${Number(currentStep) + 1}`);
      }
    }
  };

  return (
    <GoalCreationLayout
      iconAlt="goal image"
      iconSrc="/goal-graphic.png"
      onCancelHandler={goToLifePlanPage}
      onDeleteHandler={doesGoalExist ? handlers.handleGoalDelete : undefined}
      progressButtonTitle={isMobile && !isLastStep ? 'Next' : 'Save'}
      isLoading={isLoading}
      progressEventHandler={handleProgressEvent}
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

export default LifePlanManagementPage;
