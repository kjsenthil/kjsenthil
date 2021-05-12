import * as React from 'react';
import {
  GoalDatum,
  PerformanceHistoricalDatum,
  PerformanceProjectionsDatum,
} from './performanceProjectionsChartDataUtils';

import mockProjectionsData from './mock-projections-data.json';
import mockProjectionsDataGoalNotMet from './mock-projections-data-goal-not-met.json';
import mockHistoricalData from './mock-historical-data.json';
import mockGoalsData from './mock-goals-data.json';

export interface PerformanceProjectionsDataState {
  projectionsData: PerformanceProjectionsDatum[];
  historicalData: PerformanceHistoricalDatum[];
  goalsData: GoalDatum[];

  metadata: {
    // If the goal is not met, an orange line will be visible, indicating the
    // targeted goal line
    goalMet: boolean;

    // This is used to "hide" the portion of the value line after it hits zero
    // (all drawdowns made)
    zeroValueYear: number;

    // The age of the user as of today. Used to calculate future ages.
    todayAge: number;
  };
}

export enum PerformanceProjectionsDataActionType {
  'SET_DATA' = '@@PERFORMANCE_PROJECTIONS_DATA/SET_DATA',
}

export interface PerformanceProjectionsDataAction {
  type: PerformanceProjectionsDataActionType;
  payload: unknown;
}

export function setPerformanceProjectionsData(newData: {
  projectionsData: PerformanceProjectionsDatum[];
  historicalData: PerformanceHistoricalDatum[];
  goalsData: GoalDatum[];
}) {
  return {
    type: PerformanceProjectionsDataActionType.SET_DATA,
    payload: newData,
  };
}

export type PerformanceProjectionsDataDispatch = (action: PerformanceProjectionsDataAction) => void;

function performanceProjectionsDataReducer(
  state: PerformanceProjectionsDataState,
  action: PerformanceProjectionsDataAction
) {
  switch (action.type) {
    case PerformanceProjectionsDataActionType.SET_DATA: {
      const newData = action.payload as ReturnType<typeof setPerformanceProjectionsData>['payload'];

      return { ...state, ...newData };
    }

    default: {
      throw new Error(`Invalid action ${action.type}`);
    }
  }
}

const PerformanceProjectionsDataContext = React.createContext<
  | {
      state: PerformanceProjectionsDataState;
      dispatch: PerformanceProjectionsDataDispatch;
    }
  | undefined
>(undefined);

// This function converts date strings into actual Date objects
function processJsonData<T extends { Date: string }>(d: T): T & { Date: Date } {
  return {
    ...d,
    Date: new Date(d.Date),
  };
}

export const initialPerformanceProjectionsDataState: PerformanceProjectionsDataState = {
  projectionsData: mockProjectionsData.Data.map(processJsonData),
  historicalData: mockHistoricalData.Data.map(processJsonData),
  goalsData: mockGoalsData.Data.map(processJsonData),

  metadata: { goalMet: true, zeroValueYear: 2086, todayAge: 31 },
};

export const initialPerformanceProjectionsDataStateGoalNotMet: PerformanceProjectionsDataState = {
  ...initialPerformanceProjectionsDataState,
  projectionsData: mockProjectionsDataGoalNotMet.Data.map(processJsonData),
  metadata: { goalMet: false, zeroValueYear: 2080, todayAge: 31 },
};

export function PerformanceProjectionsDataContextProvider({
  initialState,
  children,
}: {
  initialState?: PerformanceProjectionsDataState;
  children?: React.ReactNode;
}) {
  const [state, dispatch] = React.useReducer(
    performanceProjectionsDataReducer,
    initialState ?? initialPerformanceProjectionsDataState
  );

  const value = { state, dispatch };

  return (
    <PerformanceProjectionsDataContext.Provider value={value}>
      {children}
    </PerformanceProjectionsDataContext.Provider>
  );
}

export function usePerformanceProjectionsDataContext() {
  const context = React.useContext(PerformanceProjectionsDataContext);

  if (context === undefined) {
    throw new Error(
      'usePerformanceProjectionsDataContext must be used within a PerformanceProjectionsDataContextProvider'
    );
  }

  return context;
}
