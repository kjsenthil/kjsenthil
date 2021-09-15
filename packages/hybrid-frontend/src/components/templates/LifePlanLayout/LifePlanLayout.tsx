import * as React from 'react';
import {
  Button,
  GoalProgressCardDetailed,
  GoalProgressCardDetailedProps,
  GoalProgressCardStyle,
  GoalSelection,
  GoalSelectionProps,
  Spacer,
  Typography,
  UpsellCard,
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

  const renderMainContent = () => {
    const hasGoals = goalsData && goalsData.length > 0;

    if (!hasGoals) {
      return null;
    }
    // To avoid having to use the non-null assertion operator everywhere else
    goalsData = goalsData!;

    const selectedGoal = goalsData.find((goal) => currentView === goal.name);

    if (!selectedGoal) {
      // We're in the "All goal" view

      return (
        <>
          <ViewSelection
            currentView={currentView}
            views={goalsData.map((goal) => goal.name)}
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
          views={goalsData.map((goal) => goal.name)}
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
        <GoalProgressCardDetailed {...selectedGoal} />
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
    </LifePlanLayoutContainer>
  );
}
