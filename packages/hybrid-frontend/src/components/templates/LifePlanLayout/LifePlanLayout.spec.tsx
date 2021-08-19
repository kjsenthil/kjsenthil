import * as React from 'react';
import { fireEvent, renderWithTheme, screen } from '@tsw/test-util';
import { GoalProgressCardProps } from '@tsw/react-components';
import LifePlanLayout from './LifePlanLayout';
import { DefaultViewSelectionValue, GoalName, LifePlanLayoutView } from './config/config';

const goalsData: Partial<Record<GoalName, GoalProgressCardProps>> = {
  Retirement: {
    onTrackPercentage: 0.5,
    affordableValues: [1, 1, 1],
    goalValue: 1,
    shortfallValue: 42,
    shortfallUnderperformValue: 69,
    title: 'Retirement',
    iconSrc: '/goal-graphic.png',
    iconAlt: 'goal graphic',
    tooltipText: 'Tooltip text',
    investmentAccounts: ['ISA', 'GIA', 'SIPP'],
    navigateToEditGoalPage: () => {},
  },
  'Something else': {
    onTrackPercentage: 0.5,
    affordableValues: [1, 1, 1],
    goalValue: 1,
    shortfallValue: 42,
    shortfallUnderperformValue: 69,
    title: 'Something else',
    iconSrc: '/goal-graphic.png',
    iconAlt: 'goal graphic',
    tooltipText: 'Tooltip text',
    investmentAccounts: ['ISA', 'GIA', 'SIPP'],
    navigateToEditGoalPage: () => {},
  },
  'Buying a home': {
    onTrackPercentage: 0.5,
    affordableValues: [1, 1, 1],
    goalValue: 1,
    shortfallValue: 42,
    shortfallUnderperformValue: 69,
    title: 'Buying a home',
    iconSrc: '/goal-graphic.png',
    iconAlt: 'goal graphic',
    tooltipText: 'Tooltip text',
    investmentAccounts: ['ISA', 'GIA', 'SIPP'],
    navigateToEditGoalPage: () => {},
  },
};

const ProjectionChart = () => <div>Projection chart</div>;

/**
 * These assertions are the same for: No goals, All goals, and Single goal view.
 */
function testCommonElements() {
  // We expect common elements in the GoalSelection section to be present.
  expect(screen.getByText("What's important to you?")).toBeVisible();
  expect(
    screen.getByText('Achieve your investment goals by adding them to your life plan.')
  ).toBeVisible();

  // We expect the Coach card to be present
  expect(screen.getByText('Speak to a coach')).toBeVisible();
}

describe('LifePlanLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const goToAllGoalsView = jest.fn();
  const goToSingleGoalView = jest.fn();
  const goToCreateGoalView = jest.fn();

  describe('No goals view', () => {
    it('renders correctly in No goals view', () => {
      renderWithTheme(
        <LifePlanLayout
          currentView={DefaultViewSelectionValue.ALL_GOALS}
          editThisGoalHref=""
          goToAllGoalsView={goToAllGoalsView}
          goToCreateGoalView={goToCreateGoalView}
          goToSingleGoalView={goToSingleGoalView}
          allGoalsOnTrackPercentage={0.99}
          projectionChart={<ProjectionChart />}
        />
      );

      // We expect the "All goals", "Add a goal", and "Edit this goal" pill
      // navigation buttons to NOT be present.
      expect(screen.queryByText(DefaultViewSelectionValue.ALL_GOALS)).toBeNull();
      expect(screen.queryByText(DefaultViewSelectionValue.CREATE_GOAL)).toBeNull();
      expect(screen.queryByText(DefaultViewSelectionValue.EDIT_THIS_GOAL)).toBeNull();

      // We expect there to be no elements related to any of the goals
      (Object.keys(goalsData) as GoalName[]).forEach((goalName) => {
        expect(screen.getByText(goalName)).toBeVisible();
      });

      // We expect the title to NOT be present
      expect(screen.queryByText('99%', { exact: false })).toBeNull();

      expect(screen.queryByText('Projection chart')).toBeNull();

      testCommonElements();
    });
  });

  describe('All goals view', () => {
    it('renders correctly in All goals view', () => {
      renderWithTheme(
        <LifePlanLayout
          currentView={DefaultViewSelectionValue.ALL_GOALS}
          editThisGoalHref=""
          goToAllGoalsView={goToAllGoalsView}
          goToCreateGoalView={goToCreateGoalView}
          goToSingleGoalView={goToSingleGoalView}
          goalsData={goalsData}
          allGoalsOnTrackPercentage={0.99}
          projectionChart={<ProjectionChart />}
        />
      );

      // We expect the "All goals" and "Add a goal" pill navigation buttons to
      // be present.
      expect(screen.getByText(DefaultViewSelectionValue.ALL_GOALS)).toBeVisible();
      expect(screen.getByText(DefaultViewSelectionValue.CREATE_GOAL)).toBeVisible();

      // We expect the "Edit this goal" pill navigation button to NOT be
      // present.
      expect(screen.queryByText(DefaultViewSelectionValue.EDIT_THIS_GOAL)).toBeNull();

      // We expect each of the goal in goalsData to have 3x corresponding
      // elements:
      // - A pill navigation button
      // - A Goal Progress Card
      // - A Goal Selection tile
      (Object.keys(goalsData) as GoalName[]).forEach((goalName) => {
        const goalElements = screen.getAllByText(goalName);
        expect(goalElements).toHaveLength(3);
        goalElements.forEach((goalElement) => {
          expect(goalElement).toBeVisible();
        });
      });

      // We expect the title to be visible and properly formatted
      expect(screen.getByText("You're on track to have 99% across all your goals.")).toBeVisible();

      expect(screen.queryByText('Projection chart')).toBeNull();

      testCommonElements();
    });
  });

  describe('Single goal view', () => {
    it('renders correctly in Single goal view', () => {
      const selectedGoal = 'Retirement';

      renderWithTheme(
        <LifePlanLayout
          currentView={selectedGoal}
          editThisGoalHref=""
          goToAllGoalsView={goToAllGoalsView}
          goToCreateGoalView={goToCreateGoalView}
          goToSingleGoalView={goToSingleGoalView}
          goalsData={goalsData}
          allGoalsOnTrackPercentage={0.99}
          projectionChart={<ProjectionChart />}
        />
      );

      // We expect the "All goals", "Add a goal", and "Edit this goal" pill
      // navigation buttons to be present.
      expect(screen.getByText(DefaultViewSelectionValue.ALL_GOALS)).toBeVisible();
      expect(screen.getByText(DefaultViewSelectionValue.CREATE_GOAL)).toBeVisible();
      expect(screen.getByText(DefaultViewSelectionValue.EDIT_THIS_GOAL)).toBeVisible();

      // We expect each of the goal in goalsData to have 2x corresponding
      // element (a pill navigation button and a Goal Selection tile),
      // The current goal also has 2x corresponding elements (a pill navigation
      // and a Goal Progress Card)
      (Object.keys(goalsData) as GoalName[]).forEach((goalName) => {
        const goalElements = screen.getAllByText(goalName);
        expect(goalElements).toHaveLength(2);
        goalElements.forEach((goalElement) => {
          expect(goalElement).toBeVisible();
        });
      });

      // We expect the title to be visible and properly formatted
      ["You're on track to have", '50%', '£42', '£69', 'of your target.'].forEach((text) => {
        const textElements = screen.getAllByText(text, { exact: false });
        expect(textElements).toHaveLength(2);
        textElements.forEach((textElement) => {
          expect(textElement).toBeVisible();
        });
      });

      expect(screen.getByText('Projection chart')).toBeVisible();

      testCommonElements();
    });
  });

  describe('View navigation', () => {
    const TestComponent = () => {
      const [currentView, setCurrentView] = React.useState<LifePlanLayoutView>(
        DefaultViewSelectionValue.ALL_GOALS
      );

      return (
        <LifePlanLayout
          currentView={currentView}
          editThisGoalHref=""
          goToAllGoalsView={() => setCurrentView(DefaultViewSelectionValue.ALL_GOALS)}
          goToCreateGoalView={() => setCurrentView(DefaultViewSelectionValue.CREATE_GOAL)}
          goToSingleGoalView={(newView) => setCurrentView(newView)}
          goalsData={goalsData}
          allGoalsOnTrackPercentage={0.99}
          projectionChart={<ProjectionChart />}
        />
      );
    };

    it('can navigate to the right view', () => {
      renderWithTheme(<TestComponent />);

      // We can assert whether we're on All goals or Single goal view by
      // checking whether the projection chart exists or not.

      // We start out at the "All goals" view

      expect(screen.queryByText('Projection chart')).toBeNull();

      // Now let's navigate to the "Single goal" - retirement view

      const retirementGoalNavigationButton = screen.getAllByText('Retirement')[0];
      fireEvent.click(retirementGoalNavigationButton);

      expect(screen.getByText('Projection chart')).toBeVisible();

      // Now let's go back to "All goals"

      const allGoalsNavigationButton = screen.getByText(DefaultViewSelectionValue.ALL_GOALS);
      fireEvent.click(allGoalsNavigationButton);

      expect(screen.queryByText('Projection chart')).toBeNull();
    });
  });
});
