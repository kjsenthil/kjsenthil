import * as React from 'react';
import {
  GoalProgressCardDetailed,
  GoalProgressCardDetailedProps,
  GoalProgressCardStyle,
  GoalSelection,
  GoalSelectionProps,
  Spacer,
  useBreakpoint,
} from '@tswdts/react-components';
import { GoalProgressCardsContainer, LifePlanLayoutContainer } from './LifePlanLayout.styles';
import Title from './Title/Title';
import SectionHeading from './SectionHeading/SectionHeading';
import ViewSelection from './ViewSelection/ViewSelection';

export type LifePlanGoalsData = Omit<GoalProgressCardDetailedProps, 'style'> & {
  category: number;
};

export interface LifePlanLayoutProps {
  // Determines which Life Plan view we're currently at. Could be either:
  // - All goals, or
  // - Single goal (One of retirement, child's education, etc.)
  currentView: string;

  goalSelectionTiles: GoalSelectionProps['tiles'];

  // These props are for the Pills navigation bar. They the navigation bar to
  // navigate around the Life Plan page
  goToAllGoalsView: () => void;
  goToSingleGoalView: (newView: string) => void;
  goToCreateGoalView: () => void;

  // The layout shows different stuff depending on whether goalsData exists or
  // not
  goalsData: LifePlanGoalsData[];

  // This is for the very first title of the layout
  allGoalsOnTrackPercentage: number;

  // This is only shown on "Single goal" view
  projectionChart: React.ReactNode;

  // If 'undefined', will not render the to-do list
  toDoListData?: unknown;
}

export default function LifePlanLayout({
  currentView,
  goalSelectionTiles,
  goToAllGoalsView,
  goToSingleGoalView,
  goToCreateGoalView,
  goalsData,
  allGoalsOnTrackPercentage,
  projectionChart,
  toDoListData,
}: LifePlanLayoutProps) {
  const { isMobile } = useBreakpoint();

  // all retirement goals should appear with the name Retirement
  const getGoalName = (goal: LifePlanGoalsData) => (goal.category === 5 ? 'Retirement' : goal.name);

  const renderMainContent = () => {
    const hasGoals = goalsData && goalsData.length > 0;

    if (!hasGoals) {
      return null;
    }
    // To avoid having to use the non-null assertion operator everywhere else
    goalsData = goalsData!;

    const selectedGoal = goalsData.find((goal) => currentView === getGoalName(goal));

    if (!selectedGoal) {
      // We're in the "All goal" view

      return (
        <>
          <ViewSelection
            currentView={currentView}
            views={goalsData.map((goal) => getGoalName(goal))}
            goToAllGoalsView={goToAllGoalsView}
            goToSingleGoalView={goToSingleGoalView}
            goToCreateGoalView={goToCreateGoalView}
            goToEditGoalView={goToCreateGoalView}
          />
          <Spacer y={5} />
          <Title onTrackPercentage={allGoalsOnTrackPercentage} />
          <Spacer y={5} />
          <GoalProgressCardsContainer isMobile={isMobile}>
            {Object.values(goalsData).map(
              (goalData) =>
                goalData && (
                  <GoalProgressCardDetailed
                    key={goalData.name}
                    style={GoalProgressCardStyle.simple}
                    {...goalData}
                    name={getGoalName(goalData)}
                  />
                )
            )}
          </GoalProgressCardsContainer>
          <Spacer y={7.5} />
        </>
      );
    }

    // We're in the "Single goal" view

    return (
      <>
        <ViewSelection
          currentView={currentView}
          views={goalsData.map((goal) => getGoalName(goal))}
          goToAllGoalsView={goToAllGoalsView}
          goToSingleGoalView={goToSingleGoalView}
          goToCreateGoalView={goToCreateGoalView}
          goToEditGoalView={goToCreateGoalView}
        />
        <Spacer y={5} />
        <Title
          onTrackPercentage={selectedGoal.onTrackPercentage}
          onTrackAmount={selectedGoal.affordableAmount}
          onTrackAmountMarketUnderperform={selectedGoal.affordableAmountUnderperform}
        />
        <Spacer y={5} />
        <GoalProgressCardDetailed {...selectedGoal} name={getGoalName(selectedGoal)} />
        <Spacer y={7.5} />
        <SectionHeading text="Your projections" />
        <Spacer y={3} />
        {projectionChart}
        <Spacer y={7.5} />
      </>
    );
  };

  return (
    <LifePlanLayoutContainer>
      {renderMainContent()}

      <GoalSelection tiles={goalSelectionTiles} />
      <Spacer y={7.5} />

      {toDoListData && (
        <>
          <SectionHeading text="Your to-do list" />
          <Spacer y={7.5} />
        </>
      )}
    </LifePlanLayoutContainer>
  );
}
