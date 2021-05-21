import {
  configureStore,
  combineReducers,
  ReducersMapObject,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, PersistConfig } from 'redux-persist';
import { useDispatch } from 'react-redux';
import { ACTIVE_ENV, IS_SSR } from '../config';
import { authSlice as authReducer } from '../services/auth/reducers';
import { myAccountSlice as myAccountReducer } from '../services/myAccount/reducers';
import { goalSlice as goalReducer } from '../services/goal/reducers';
import { projectionsSlice as projectionsReducer } from '../services/projections/reducers';
import { GoalState } from '../services/goal';
import { AuthState } from '../services/auth';
import { ProjectionsState } from '../services/projections';
import { MyAccountState } from '../services/myAccount';

export interface RootState {
  auth: AuthState;
  myAccount: MyAccountState;
  goal: GoalState;
  projections: ProjectionsState;
}

const persistConfig: PersistConfig<RootState> = {
  blacklist: ['client'],
  key: 'root',
  storage,
};

const reducers: ReducersMapObject = {
  auth: authReducer,
  myAccount: myAccountReducer,
  goal: goalReducer,
  projections: projectionsReducer,
};

const persistedReducer = persistReducer(persistConfig, combineReducers(reducers));

const reducer = IS_SSR ? reducers : persistedReducer;

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
