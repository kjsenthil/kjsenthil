import * as React from 'react';
import {
  Spacer,
  GoalProgressCard,
  GoalProgressCardProps,
  useBreakpoint,
} from '@tsw/react-components';
import { GoalProgressCardsContainer, LifePlanLayoutContainer } from './LifePlanLayout.styles';
import Title from './Title/Title';
import SectionHeading from './SectionHeading/SectionHeading';
import ViewSelection from './ViewSelection/ViewSelection';
import GoalSelection from './GoalSelection/GoalSelection';
import { GoalName, LifePlanLayoutView } from './config/config';

export interface LifePlanLayoutProps {
  // These props are for the Pills navigation bar
  currentView: LifePlanLayoutView;

  editThisGoalHref: string;
  goToAllGoalsView: () => void;
  goToSingleGoalView: (newView: LifePlanLayoutView) => void;
  goToCreateGoalView: () => void;

  // If 'undefined', will render LifePlanLayout in "No goals" view
  // The key of this record is the goal title
  goalsData?: Partial<Record<GoalName, GoalProgressCardProps>>;

  // This is for the very first title of the layout
  allGoalsOnTrackPercentage: number;

  // This is only shown on "Single goal" view
  projectionChart: React.ReactNode;

  // If 'undefined', will not render the to-do list
  toDoListData?: unknown;
}

export default function LifePlanLayout({
  currentView,
  editThisGoalHref,
  goToAllGoalsView,
  goToSingleGoalView,
  goToCreateGoalView,
  goalsData,
  allGoalsOnTrackPercentage,
  projectionChart,
  toDoListData,
}: LifePlanLayoutProps) {
  const { isMobile } = useBreakpoint();

  const renderMainContent = () => {
    const hasGoals = goalsData && Object.keys(goalsData).length > 0;

    if (!hasGoals) {
      return null;
    }

    // At this point, we know 'goalsData' exists thanks to the condition
    // 'hasNoGoals' above, hence the TypeScript exclamation mark (as TypeScript
    // can't infer this yet.
    const goalDatum = goalsData![currentView];

    if (!goalDatum) {
      // We're in the "All goal" view

      return (
        <>
          <ViewSelection
            currentView={currentView}
            // At this point, we know 'goalsData' exists thanks to the condition
            // 'hasNoGoals' above, hence the TypeScript exclamation mark (as TypeScript
            // can't infer this yet.
            // We also need the 'as' assertion because Object.keys() always
            // gives a string[]
            views={(Object.keys(goalsData!) as GoalName[]).map((goalName) => goalName)}
            editThisGoalHref={editThisGoalHref}
            goToAllGoalsView={goToAllGoalsView}
            goToSingleGoalView={goToSingleGoalView}
            goToCreateGoalView={goToCreateGoalView}
          />
          <Spacer y={5} />
          <Title onTrackPercentage={allGoalsOnTrackPercentage} />
          <Spacer y={5} />
          <GoalProgressCardsContainer isMobile={isMobile}>
            {
              // At this point, we know 'goalsData' exists thanks to the condition
              // 'hasNoGoals' above, hence the TypeScript exclamation mark (as TypeScript
              // can't infer this yet.
              Object.values(goalsData!).map(
                (goalData) => goalData && <GoalProgressCard key={goalData.title} {...goalData} />
              )
            }
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
          // At this point, we know 'goalsData' exists thanks to the condition
          // 'hasNoGoals' above, hence the TypeScript exclamation mark (as TypeScript
          // can't infer this yet.
          // We also need the 'as' assertion because Object.keys() always
          // gives a string[]
          views={(Object.keys(goalsData!) as GoalName[]).map((goalName) => goalName)}
          editThisGoalHref={editThisGoalHref}
          goToAllGoalsView={goToAllGoalsView}
          goToSingleGoalView={goToSingleGoalView}
          goToCreateGoalView={goToCreateGoalView}
        />
        <Spacer y={5} />
        <Title
          onTrackPercentage={goalDatum.onTrackPercentage}
          onTrackAmount={goalDatum.shortfallValue}
          onTrackAmountMarketUnderperform={goalDatum.shortfallUnderperformValue}
        />
        <Spacer y={5} />
        <GoalProgressCard {...goalDatum} />
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

      <GoalSelection currentView={currentView} />
      <Spacer y={7.5} />

      {toDoListData && (
        <>
          <SectionHeading text="Your to-do list" />
          <Spacer y={7.5} />
        </>
      )}

      {/* TODO: replace this with Speak to a coach card when it's available */}
      <div>Speak to a coach</div>
    </LifePlanLayoutContainer>
  );
}
