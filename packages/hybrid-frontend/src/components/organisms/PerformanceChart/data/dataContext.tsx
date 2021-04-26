import * as React from 'react';
import { GetPerformanceDataResponse, PerformanceChartPeriod } from './utils';
import mockData from './mock-data.json';

export interface PerformanceDataState {
  dataStore: Record<string, GetPerformanceDataResponse>;
  dataStoreId: number;
  dataPeriod: PerformanceChartPeriod;
}

export enum PerformanceDataActionType {
  'CHANGE_PERIOD' = '@@PERFORMANCE_DATA/CHANGE_PERIOD',
  'CHANGE_DATA_ID' = '@@PERFORMANCE_DATA/CHANGE_DATA_ID',
}

export interface PerformanceDataAction {
  type: PerformanceDataActionType;
  payload: any;
}

export const changePerformanceDataPeriod = (newPeriod: PerformanceChartPeriod) => ({
  type: PerformanceDataActionType.CHANGE_PERIOD,
  payload: newPeriod,
});

export type PerformanceDataDispatch = (action: PerformanceDataAction) => void;

function performanceDataReducer(state: PerformanceDataState, action: PerformanceDataAction) {
  switch (action.type) {
    case PerformanceDataActionType.CHANGE_PERIOD: {
      const newPeriod = action.payload as PerformanceChartPeriod;

      return { ...state, dataPeriod: newPeriod };
    }

    case PerformanceDataActionType.CHANGE_DATA_ID: {
      const newDataId = action.payload as number;

      return { ...state, dataId: newDataId };
    }

    default: {
      throw new Error(`Invalid action ${action.type}`);
    }
  }
}

const PerformanceDataContext = React.createContext<
  | {
      state: PerformanceDataState;
      dispatch: PerformanceDataDispatch;
    }
  | undefined
>(undefined);

const initialPerformanceDataState: PerformanceDataState = {
  dataStore: { '0': mockData as GetPerformanceDataResponse },
  dataStoreId: 0,
  dataPeriod: PerformanceChartPeriod.ALL_TIME,
};

export function PerformanceDataContextProvider({ children }: { children?: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(performanceDataReducer, initialPerformanceDataState);

  const value = { state, dispatch };

  return (
    <PerformanceDataContext.Provider value={value}>{children}</PerformanceDataContext.Provider>
  );
}

export function usePerformanceDataContext() {
  const context = React.useContext(PerformanceDataContext);

  if (context === undefined) {
    throw new Error('usePerformanceData must be used within a PerformanceDataContextProvider');
  }

  return context;
}
