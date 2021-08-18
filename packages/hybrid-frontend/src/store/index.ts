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
import { IS_PRODUCTION, IS_SSR } from '../config';
import { authSlice as authReducer } from '../services/auth/reducers';
import {
  clientSlice as clientReducer,
  investmentAccountsSlice as investmentAccountsReducer,
  InvestmentSummarySlice as investmentSummaryReducer,
} from '../services/myAccount/reducers';
import {
  goalCreationSlice as goalCreationReducer,
  currentGoalsSlice as currentGoalsReducer,
} from '../services/goal/reducers';
import { performanceSlice as performanceReducer } from '../services/performance/reducers';
import {
  simulatedProjectionsSlice as simulatedProjectionsReducer,
  goalCurrentProjectionsSlice as goalCurrentProjectionsReducer,
  goalTargetProjectionsSlice as goalTargetProjectionsReducer,
} from '../services/projections/reducers';
import { featureToggleSlice as featureToggleReducer } from '../services/featureToggle/reducers';
import { CurrentGoalsState, GoalCreationState } from '../services/goal';
import { AuthState } from '../services/auth';
import {
  GoalCurrentProjectionsState,
  GoalSimulateProjectionsState,
  GoalTargetProjectionsState,
  SimulatedProjectionsState,
} from '../services/projections';
import {
  InvestmentAccountsState,
  ClientState,
  InvestmentSummaryState,
} from '../services/myAccount';
import { PerformanceState } from '../services/performance';
import { FeatureToggleState } from '../services/featureToggle';

export interface RootState {
  auth: AuthState;
  client: ClientState;
  investmentAccounts: InvestmentAccountsState;
  investmentSummary: InvestmentSummaryState;
  goalCreation: GoalCreationState;
  currentGoals: CurrentGoalsState;
  performance: PerformanceState;
  simulatedProjections: SimulatedProjectionsState;
  goalCurrentProjections: GoalCurrentProjectionsState;
  goalTargetProjections: GoalTargetProjectionsState;
  goalSimulateProjections: GoalSimulateProjectionsState;
  featureToggle: FeatureToggleState;
}

/*
 * To whitelist or blacklist nested data you can use createBlacklistFilter or createWhitelistFilter in this way:
 * const clientWhitelist = createWhitelistFilter('client', ['data.attributes.firstName', 'data.attributes.lastName']);
 * then add the filter to the transforms array
 */

const authWhitelist = createWhitelistFilter('auth', ['accessTokens', 'contactId']);

const persistConfig: PersistConfig<RootState> = {
  blacklist: [
    'goalCreation',
    'currentGoals',
    'performance',
    'investmentAccounts',
    'simulatedProjections',
    'goalCurrentProjections',
    'goalTargetProjections',
  ],
  transforms: [authWhitelist],
  key: 'root',
  storage,
};

const reducersMap: ReducersMapObject = {
  auth: authReducer,
  client: clientReducer,
  investmentAccounts: investmentAccountsReducer,
  investmentSummary: investmentSummaryReducer,
  goalCreation: goalCreationReducer,
  currentGoals: currentGoalsReducer,
  performance: performanceReducer,
  simulatedProjections: simulatedProjectionsReducer,
  goalCurrentProjections: goalCurrentProjectionsReducer,
  goalTargetProjections: goalTargetProjectionsReducer,
  featureToggle: featureToggleReducer,
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
  devTools: !IS_PRODUCTION,
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
