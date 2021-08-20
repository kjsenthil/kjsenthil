import * as React from 'react';
import {
  Icon,
  PillNavigationCreatorTabComponent,
  PillsNavigation,
  PillsNavigationSelectableTabComponent,
  PillsNavigationTab,
} from '@tswdts/react-components';
import EditThisGoalLinkTabComponent from './EditThisGoalLinkTabComponent/EditThisGoalLinkTabComponent';
import { DefaultViewSelectionValue, LifePlanLayoutView } from '../config/config';

export interface ViewSelectionProps {
  currentView: LifePlanLayoutView;
  views: LifePlanLayoutView[];

  editThisGoalHref: string;

  goToAllGoalsView: () => void;
  goToSingleGoalView: (newView: LifePlanLayoutView) => void;
  goToCreateGoalView: () => void;
}

export default function ViewSelection({
  currentView,
  views,
  goToAllGoalsView,
  goToSingleGoalView,
  goToCreateGoalView,
}: ViewSelectionProps) {
  const handleChangeView = (e: React.ChangeEvent<{}>, newView: LifePlanLayoutView) => {
    if (newView === DefaultViewSelectionValue.ALL_GOALS) {
      goToAllGoalsView();
    } else if (newView === DefaultViewSelectionValue.CREATE_GOAL) {
      goToCreateGoalView();
    } else if (newView !== DefaultViewSelectionValue.EDIT_THIS_GOAL) {
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
      <PillsNavigationTab
        component={PillNavigationCreatorTabComponent}
        label={DefaultViewSelectionValue.CREATE_GOAL}
        value={DefaultViewSelectionValue.CREATE_GOAL}
        startIcon={<Icon name="plus" />}
      />
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
