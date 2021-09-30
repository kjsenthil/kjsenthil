import * as React from 'react';
import {
  DisabledComponent,
  Icon,
  PillNavigationCreatorTabComponent,
  PillsNavigation,
  PillsNavigationSelectableTabComponent,
  PillsNavigationTab,
} from '@tswdts/react-components';
import EditThisGoalLinkTabComponent from './EditThisGoalLinkTabComponent/EditThisGoalLinkTabComponent';
import { DefaultViewSelectionValue } from '../../../pages/LifePlanPage/GoalSelection/config';
import StyledDivider from './ViewSelection.styles';

export interface ViewSelectionProps {
  currentView: string;
  views: string[];
  goToAllGoalsView: () => void;
  goToSingleGoalView: (newView: string) => void;
  goToCreateGoalView: () => void;
  goToEditGoalView: () => void;
}

export default function ViewSelection({
  currentView,
  views,
  goToAllGoalsView,
  goToSingleGoalView,
  goToCreateGoalView,
  goToEditGoalView,
}: ViewSelectionProps) {
  const handleChangeView = (e: React.ChangeEvent<{}>, newView: string) => {
    if (newView === DefaultViewSelectionValue.ALL_GOALS) {
      goToAllGoalsView();
    } else if (newView === DefaultViewSelectionValue.CREATE_GOAL) {
      goToCreateGoalView();
    } else if (newView === DefaultViewSelectionValue.EDIT_THIS_GOAL) {
      goToEditGoalView();
    } else {
      goToSingleGoalView(newView);
    }
  };

  return (
    <PillsNavigation
      variant="scrollable"
      scrollButtons="off"
      value={currentView}
      // Need the type assertion here else TypeScript is not inferring the
      // onChange type correctly for some reason.
      // Our function follows MUI's exaclty:
      // https://material-ui.com/components/tabs/
      onChange={
        handleChangeView as ((event: React.ChangeEvent<{}>, value: any) => void) &
          React.FormEventHandler<HTMLButtonElement>
      }
    >
      <PillsNavigationTab
        component={PillsNavigationSelectableTabComponent}
        label={DefaultViewSelectionValue.ALL_GOALS}
        selectedColor="tertiary"
        value={DefaultViewSelectionValue.ALL_GOALS}
      />
      {views.map((view) => (
        <PillsNavigationTab
          key={`${view}`}
          component={PillsNavigationSelectableTabComponent}
          label={view}
          value={view}
          selectedColor="tertiary"
        />
      ))}
      <StyledDivider orientation="vertical" y={4} />
      <DisabledComponent title="Coming soon">
        <PillsNavigationTab
          component={PillNavigationCreatorTabComponent}
          label={DefaultViewSelectionValue.CREATE_GOAL}
          value={DefaultViewSelectionValue.CREATE_GOAL}
          startIcon={<Icon name="plus" />}
        />
      </DisabledComponent>
      {currentView !== DefaultViewSelectionValue.ALL_GOALS && (
        <PillsNavigationTab
          component={EditThisGoalLinkTabComponent}
          label={DefaultViewSelectionValue.EDIT_THIS_GOAL}
          value={DefaultViewSelectionValue.EDIT_THIS_GOAL}
        />
      )}
    </PillsNavigation>
  );
}
