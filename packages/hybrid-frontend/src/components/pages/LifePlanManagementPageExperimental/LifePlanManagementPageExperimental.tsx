import * as React from 'react';
import { navigate } from 'gatsby';
import { Router, useLocation } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { InputFieldsKeys } from '../../../services/goal/machines/lifePlan';
import { formatCurrency } from '../../../utils/formatters';
import { GoalCategory, GoalDefaults } from '../../../services/goal';
import { fetchPerformanceAccountsAggregated } from '../../../services/performance';
import {
  useDispatchThunkOnRender,
  useLifePlanMachine,
  useProjectionsChartData,
  useUpdateCurrentProjectionsPrerequisites,
} from '../../../hooks';
import { goalCreationPaths, NavPaths } from '../../../config/paths';
import PlanningSubPage from './PlanningSubPage/PlanningSubPage';
import GoalCreationFundingSubPage from './FundingSubPage/GoalCreationFundingSubPage';
import GoalCreationLayout, {
  useGoalCreationLayoutIsMobile,
} from '../../templates/GoalCreationLayoutExperimental';
import { ProgressBarWithLegendProps } from '../../molecules';

const goToLifePlanPage = () => navigate(NavPaths.LIFE_PLAN_PAGE);

const LifePlanManagementPageExperimental = () => {
  const dispatch = useDispatch();

  const {
    performance: { status: performanceStatus },
  } = useSelector((state: RootState) => state);

  const projectionsPrerequisitesPayload = useUpdateCurrentProjectionsPrerequisites();

  const { state: currentState, send, service } = useLifePlanMachine();

  service.onTransition(({ matches }) => {
    if (matches('fundingYourRetirement')) {
      goToLifePlanPage();
    }
  });

  const {
    drawdownStartDate,
    drawdownStartAge,
    drawdownEndAge,
    drawdownEndDate,
    drawdownPeriodLengthYears,
    annualIncome,
    monthlyIncome,
    errors,
  } = currentState.context;

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

  const handleFromAgeChange = (event: React.ChangeEvent<any>) => {
    send('SET_DRAWDOWN_AGES', {
      payload: {
        drawdownStartAge: Number(event.target.value),
        drawdownEndAge,
      },
    });
  };

  const handleToAgeChange = (event: React.ChangeEvent<any>) => {
    send('SET_DRAWDOWN_AGES', {
      payload: {
        drawdownStartAge,
        drawdownEndAge: Number(event.target.value),
      },
    });
  };

  const handleAnnualIncomeChange = (event: React.ChangeEvent<any>) => {
    send('SET_INCOME', {
      payload: {
        annualIncome: Number(event.target.value || 0),
        ...projectionsPrerequisitesPayload,
      },
    });
  };

  const handleMonthlyIncomeChange = (event: React.ChangeEvent<any>) => {
    send('SET_INCOME', {
      payload: {
        monthlyIncome: Number(event.target.value || 0),
        ...projectionsPrerequisitesPayload,
      },
    });
  };

  const displayError = (field: InputFieldsKeys) =>
    currentState.matches('planningYourRetirement.invalid') ? errors?.[field] : undefined;

  const isLoading = [
    'planningYourRetirement.saving',
    'planningYourRetirement.deleting',
    'planningYourRetirement.processingInput',
    'planningYourRetirement.bootstrapping',
  ].some((state) => currentState.matches(state));

  const location = useLocation();

  const planningSubPageBasePath = `${goalCreationPaths.retirement.path}`;
  const fundingSubPageBasePath = `${goalCreationPaths.retirement.path}/funding`;

  const isMobile = useGoalCreationLayoutIsMobile();

  const goalPotTotal = Math.max(annualIncome * (drawdownEndAge - drawdownStartAge), 0);

  // TODO: these come from the state machine
  const lumpSum = 0;
  const laterLifeLeftOver = 0;

  const lumpSumPercentage = goalPotTotal ? lumpSum / goalPotTotal : 0;
  const laterLifeLeftOverPercentage = goalPotTotal ? laterLifeLeftOver / goalPotTotal : 0;

  const untouchedAmount = goalPotTotal - lumpSum - laterLifeLeftOver;
  const untouchedAmountPercentage = goalPotTotal ? untouchedAmount / goalPotTotal : 1;

  const goalPotTrackerProgressBarData: ProgressBarWithLegendProps['progressBarData'] = [
    {
      legendProps: {
        title: `Lump sum`,
        value: lumpSum,
      },
      progress: lumpSumPercentage,
    },
    {
      legendProps: {
        title: `From age ${drawdownStartAge} to ${drawdownEndAge}`,
        value: goalPotTotal > 0 ? untouchedAmount : undefined,
      },
      progress: untouchedAmountPercentage,
    },
    {
      legendProps: {
        title: `Remaining amount`,
        value: laterLifeLeftOver,
      },
      progress: laterLifeLeftOverPercentage,
    },
  ]
    // This prevents inputs that haven't yet been filled in from being shown
    .filter(({ progress }) => progress > 0);

  return (
    <GoalCreationLayout
      iconAlt="goal image"
      iconSrc="/goal-graphic.png"
      onCancelHandler={goToLifePlanPage}
      progressButtonTitle="Save"
      isLoading={isLoading}
      progressEventHandler={() => send('SAVE')}
      title="Your life after work"
      tabsNavigationProps={{
        currentPath: location.pathname,
        navigate,
        tabs: [
          {
            path: planningSubPageBasePath,
            label: isMobile ? 'Planning' : 'Planning your retirement',
          },
          {
            path: fundingSubPageBasePath,
            label: isMobile ? 'Funding' : 'Funding your retirement',
          },
        ],
      }}
    >
      <Router>
        <PlanningSubPage
          path="/"
          default
          drawdownStartAge={drawdownStartAge}
          drawdownEndAge={drawdownEndAge}
          drawdownStartDate={drawdownStartDate}
          drawdownEndDate={drawdownEndDate}
          drawdownPeriodLengthYears={drawdownPeriodLengthYears}
          drawdownPeriodDeviationFromAverageComparison={
            drawdownPeriodDeviationFromAverageComparison
          }
          handleToAgeChange={handleToAgeChange}
          handleFromAgeChange={handleFromAgeChange}
          annualIncome={annualIncome}
          monthlyIncome={monthlyIncome}
          handleAnnualIncomeChange={handleAnnualIncomeChange}
          handleMonthlyIncomeChange={handleMonthlyIncomeChange}
          lumpSumAmount={0}
          lumpSumAge={0}
          handleLumpSumAmountChange={() => {}}
          handleLumpSumAgeChange={() => {}}
          remainingAmount={0}
          handleRemainingAmountChange={() => {}}
          displayError={displayError}
          goalPotTotal={goalPotTotal}
          goalPotProgressBarData={goalPotTrackerProgressBarData}
          currencyFormatter={formatCurrency}
        />
        <GoalCreationFundingSubPage path="/funding" />
      </Router>
    </GoalCreationLayout>
  );
};

export default LifePlanManagementPageExperimental;
