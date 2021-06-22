import {
  configureStore,
  combineReducers,
  ReducersMapObject,
  getDefaultMiddleware,
  Action,
} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import createWhitelistFilter from 'redux-persist-transform-filter';
import { persistReducer, PersistConfig } from 'redux-persist';
import { useDispatch } from 'react-redux';
import { ACTIVE_ENV, IS_SSR } from '../config';
import { authSlice as authReducer } from '../services/auth/reducers';
import {
  clientSlice as clientReducer,
  accountBreakdownSlice as accountBreakdownReducer,
  InvestmentSummarySlice as investmentSummaryReducer,
} from '../services/myAccount/reducers';
import {
  goalCreationSlice as goalCreationReducer,
  currentGoalsSlice as currentGoalsReducer,
} from '../services/goal/reducers';
import { performanceSlice as performanceReducer } from '../services/performance/reducers';
import {
  projectionsSlice as projectionsReducer,
  goalCurrentProjectionsSlice as goalCurrentProjectionsReducer,
} from '../services/projections/reducers';
import { CurrentGoalsState, GoalCreationState } from '../services/goal';
import { AuthState } from '../services/auth';
import { GoalCurrentProjectionsState, ProjectionsState } from '../services/projections';
import { BreakdownState, ClientState, InvestmentSummaryState } from '../services/myAccount';
import { PerformanceState } from '../services/performance';

export interface RootState {
  auth: AuthState;
  client: ClientState;
  accountBreakdown: BreakdownState;
  investmentSummary: InvestmentSummaryState;
  goalCreation: GoalCreationState;
  currentGoals: CurrentGoalsState;
  performance: PerformanceState;
  projections: ProjectionsState;
  goalCurrentProjections: GoalCurrentProjectionsState;
}

/*
 * To whitelist or blacklist nested data you can use createBlacklistFilter or createWhitelistFilter in this way:
 *
 * const clientWhitelist = createWhitelistFilter('client', ['data.attributes.firstName', 'data.attributes.lastName']);
 *
 * then add the filter to the transforms array
 */

const authWhitelist = createWhitelistFilter('auth', ['accessTokens', 'contactId']);

const persistConfig: PersistConfig<RootState> = {
  blacklist: [
    'goalCreation',
    'currentGoals',
    'performance',
    'projections',
    'goalCurrentProjections',
  ],
  transforms: [authWhitelist],
  key: 'root',
  storage,
};

const reducersMap: ReducersMapObject = {
  auth: authReducer,
  client: clientReducer,
  accountBreakdown: accountBreakdownReducer,
  investmentSummary: investmentSummaryReducer,
  goalCreation: goalCreationReducer,
  currentGoals: currentGoalsReducer,
  performance: performanceReducer,
  projections: projectionsReducer,
  goalCurrentProjections: goalCurrentProjectionsReducer,
};

const reducers = combineReducers(reducersMap);

const rootReducer = (state: RootState | undefined, action: Action) => {
  if (action.type === 'auth/logout') {
    state = undefined;
  }

  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const reducer = IS_SSR ? reducersMap : persistedReducer;

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: ACTIVE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
