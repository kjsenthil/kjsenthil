import * as React from 'react';
import dayjs from 'dayjs';
import { fireEvent, renderWithTheme, screen } from '@tsw/test-util';
import { GoalSelectionProps } from '@tswdts/react-components';
import LifePlanLayout, { LifePlanGoalsData } from './LifePlanLayout';
import { DefaultViewSelectionValue } from '../../pages/LifePlanPage/GoalSelection/config';

enum GoalName {
  RETIREMENT = 'Retirement',
  BUYING_A_HOME = 'Buying a home',
  CHILD_EDUCATION = "My child's education",
  SOMETHING_ELSE = 'Something else',
  GROW_MY_MONEY = 'Just grow my money',
}

const mockGoalCategories = {
  [GoalName.RETIREMENT]: 1,
  [GoalName.BUYING_A_HOME]: 2,
  [GoalName.CHILD_EDUCATION]: 3,
  [GoalName.SOMETHING_ELSE]: 4,
  [GoalName.GROW_MY_MONEY]: 5,
};

const goalSelectionTiles: GoalSelectionProps['tiles'] = [
  {
    name: GoalName.RETIREMENT,
    iconSrc: '/goals/retirement.webp',
  },
  {
    name: GoalName.BUYING_A_HOME,
    iconSrc: '/goals/buying-a-home.webp',
    disabled: true,
  },
  {
    name: GoalName.CHILD_EDUCATION,
    iconSrc: '/goals/my-childs-education.webp',
    disabled: true,
  },
  {
    name: GoalName.SOMETHING_ELSE,
    iconSrc: '/goals/something-else.webp',
    disabled: true,
  },
  {
    name: GoalName.GROW_MY_MONEY,
    iconSrc: '/goals/just-grow-my-money.webp',
    disabled: true,
  },
];

const goalsData: LifePlanGoalsData[] = [
  {
    name: GoalName.RETIREMENT,
    category: mockGoalCategories[GoalName.RETIREMENT],
    iconSrc: 'test.jpg',
    lumpSumDate: dayjs().subtract(1, 'year').toDate(),
    startDate: dayjs().add(9, 'year').toDate(),
    endDate: dayjs().add(29, 'year').toDate(),
    ageAtLumpSumDate: 57,
    ageAtStartDate: 67,
    ageAtEndDate: 87,
    affordableAmount: 840_000,
    affordableAmountUnderperform: 634_000,
    targetAmount: 1_765_000,
    shortfall: 1_135_000,
    onTrackPercentage: 0.425316,
    lumpSum: 210_000,
    totalAffordableDrawdown: 574_000,
    remainingAmount: 56_000,
    accounts: ['ISA', 'SIPP', 'GIA'],
  },
  {
    name: GoalName.BUYING_A_HOME,
    category: mockGoalCategories[GoalName.BUYING_A_HOME],
    iconSrc: 'test.jpg',
    lumpSumDate: undefined,
    startDate: undefined,
    endDate: dayjs().add(1, 'year').toDate(),
    ageAtLumpSumDate: undefined,
    ageAtStartDate: undefined,
    ageAtEndDate: 41,
    affordableAmount: 234_000,
    targetAmount: 220_000,
    shortfall: 14_000,
    onTrackPercentage: 1.0,
    lumpSum: undefined,
    totalAffordableDrawdown: undefined,
    remainingAmount: undefined,
    accounts: ['ISA', 'SIPP', 'GIA'],
  },
  {
    name: GoalName.CHILD_EDUCATION,
    category: mockGoalCategories[GoalName.CHILD_EDUCATION],
    iconSrc: 'test.jpg',
    lumpSumDate: undefined,
    startDate: dayjs().subtract(1, 'year').toDate(),
    endDate: dayjs().add(5, 'year').toDate(),
    ageAtLumpSumDate: undefined,
    ageAtStartDate: 41,
    ageAtEndDate: 45,
    affordableAmount: 180_000,
    targetAmount: 220_000,
    shortfall: -40_000,
    onTrackPercentage: 0.8181818,
    lumpSum: undefined,
    totalAffordableDrawdown: undefined,
    remainingAmount: undefined,
    accounts: ['ISA', 'SIPP', 'GIA', 'GIA'],
  },
];

const ProjectionChart = () => <div>Projection chart</div>;

/**
 * These assertions are the same for: No goals, All goals, and Single goal view.
 */
function assertCommonElements() {
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
          goalSelectionTiles={goalSelectionTiles}
          goToAllGoalsView={goToAllGoalsView}
          goToCreateGoalView={goToCreateGoalView}
          goToSingleGoalView={goToSingleGoalView}
          goalsData={[]}
          allGoalsOnTrackPercentage={0.99}
          projectionChart={<ProjectionChart />}
        />
      );

      // We expect the "All goals", "Add a goal", and "Edit this goal" pill
      // navigation buttons to NOT be present.
      expect(screen.queryByText(DefaultViewSelectionValue.ALL_GOALS)).toBeNull();
      expect(screen.queryByText(DefaultViewSelectionValue.CREATE_GOAL)).toBeNull();
      expect(screen.queryByText(DefaultViewSelectionValue.EDIT_THIS_GOAL)).toBeNull();

      // We expect the title to NOT be present
      expect(screen.queryByText('99%', { exact: false })).toBeNull();

      expect(screen.queryByText('Projection chart')).toBeNull();

      // We expect all goal creation tiles to be present
      goalSelectionTiles.forEach(({ name }) => {
        expect(screen.getByText(name)).toBeVisible();
      });

      assertCommonElements();
    });
  });

  describe('All goals view', () => {
    it('renders correctly in All goals view', () => {
      renderWithTheme(
        <LifePlanLayout
          currentView={DefaultViewSelectionValue.ALL_GOALS}
          goalSelectionTiles={goalSelectionTiles}
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

      // We expect each of the goal in goalsData to have the corresponding elements with content being the goal's name:
      // - A pill navigation button
      // - A Goal Progress Card
      // - A goal creation button
      goalsData.forEach((goal) => {
        const goalElements = screen.getAllByText(goal.name);
        expect(goalElements.length).toBe(3);
        goalElements.forEach((goalElement) => {
          expect(goalElement).toBeVisible();
        });
      });

      // We expect the title to be visible and properly formatted
      expect(screen.getByText("You're on track to have 99% across all your goals.")).toBeVisible();

      expect(screen.queryByText('Projection chart')).toBeNull();

      assertCommonElements();
    });
  });

  describe('Single goal view', () => {
    it('renders correctly in Single goal view', () => {
      renderWithTheme(
        <LifePlanLayout
          currentView={GoalName.RETIREMENT}
          goalSelectionTiles={goalSelectionTiles}
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

      // We expect the selected goal to have the corresponding elements with content being the goal's name:
      // - A pill navigation button
      // - A Goal Progress Card
      // - A goal creation button
      const selectedGoal = goalsData.find((goal) => GoalName.RETIREMENT === goal.name);
      if (!selectedGoal) fail(`Goal ${GoalName.RETIREMENT} could not be found in provided goals`);
      const goalElements = screen.getAllByText(selectedGoal.name);
      expect(goalElements.length).toBe(3);
      goalElements.forEach((goalElement) => {
        expect(goalElement).toBeVisible();
      });

      // We expect the title to be visible and properly formatted
      expect(
        screen.getByText(
          "You're on track to have 43% of your target. That's £840,000 or £634,000 if markets underperform."
        )
      ).toBeVisible();

      expect(screen.getByText('Projection chart')).toBeVisible();

      assertCommonElements();
    });
  });

  describe('View navigation', () => {
    const TestComponent = () => {
      const [currentView, setCurrentView] = React.useState<string>(
        DefaultViewSelectionValue.ALL_GOALS
      );

      return (
        <LifePlanLayout
          currentView={currentView}
          goalSelectionTiles={goalSelectionTiles}
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

      const retirementGoalNavigationButton = screen.getAllByText(GoalName.RETIREMENT)[0];
      fireEvent.click(retirementGoalNavigationButton);

      expect(screen.getByText('Projection chart')).toBeVisible();

      // Now let's go back to "All goals"

      const allGoalsNavigationButton = screen.getByText(DefaultViewSelectionValue.ALL_GOALS);
      fireEvent.click(allGoalsNavigationButton);

      expect(screen.queryByText('Projection chart')).toBeNull();
    });
  });
});
