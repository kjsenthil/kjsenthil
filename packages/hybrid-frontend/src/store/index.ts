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
  accountSlice as accountReducer,
  IsaContributionSlice as isaContributionReducer,
  investmentAccountDetailsSlice as investmentAccountDetailsReducer,
  bankAccountDetailsSlice as bankAccountDetailsReducer,
} from '../services/myAccount/reducers';
import {
  goalCreationSlice as goalCreationReducer,
  currentGoalsSlice as currentGoalsReducer,
} from '../services/goal/reducers';
import { performanceSlice as performanceReducer } from '../services/performance/reducers';
import {
  simulatedProjectionsSlice as simulatedProjectionsReducer,
  goalSimulateProjectionsSlice as goalSimulateProjectionsReducer,
} from '../services/projections/reducers';
import { annualisedReturnSummarySlice as annualisedReturnSummaryReducer } from '../services/returns/reducers';
import { featureToggleSlice as featureToggleReducer } from '../services/featureToggle/reducers';
import { CurrentGoalsState, GoalCreationState } from '../services/goal';
import { AuthState } from '../services/auth';
import { GoalSimulateProjectionsState, SimulatedProjectionsState } from '../services/projections';
import {
  InvestmentAccountsState,
  ClientState,
  InvestmentSummaryState,
  AccountState,
  IsaContributionState,
  InvestmentAccountDetailsState,
  BankAccountDetailsState,
} from '../services/myAccount';
import { PerformanceState } from '../services/performance';
import { FeatureToggleState } from '../services/featureToggle';
import { AnnualisedReturnSummaryState } from '../services/returns';

export interface RootState {
  auth: AuthState;
  client: ClientState;
  investmentAccounts: InvestmentAccountsState;
  investmentSummary: InvestmentSummaryState;
  isaContribution: IsaContributionState;
  goalCreation: GoalCreationState;
  currentGoals: CurrentGoalsState;
  performance: PerformanceState;
  simulatedProjections: SimulatedProjectionsState;
  annualisedReturnSummary: AnnualisedReturnSummaryState;
  goalSimulateProjections: GoalSimulateProjectionsState;
  featureToggle: FeatureToggleState;
  selectedAccount: AccountState;
  investmentAccounDetails: InvestmentAccountDetailsState;
  bankAccountDetails: BankAccountDetailsState;
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
    'goalSimulateProjections',
    'annualisedReturnSummary',
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
  isaContribution: isaContributionReducer,
  goalCreation: goalCreationReducer,
  currentGoals: currentGoalsReducer,
  performance: performanceReducer,
  simulatedProjections: simulatedProjectionsReducer,
  annualisedReturnSummary: annualisedReturnSummaryReducer,
  featureToggle: featureToggleReducer,
  selectedAccount: accountReducer,
  goalSimulateProjections: goalSimulateProjectionsReducer,
  investmentAccountDetails: investmentAccountDetailsReducer,
  bankAccountDetails: bankAccountDetailsReducer,
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
