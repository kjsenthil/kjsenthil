import {
  configureStore,
  combineReducers,
  ReducersMapObject,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { useDispatch } from 'react-redux';
import { ACTIVE_ENV, IS_SSR } from '../config';
import { authSlice as authReducer } from '../services/auth/reducers';
import { goalSlice as goalReducer } from '../services/goal/reducers';
import { projectionsSlice as projectionsReducer } from '../services/projections/reducers';
import { GoalState } from '../services/goal';
import { AuthState } from '../services/auth';
import { ProjectionsState } from '../services/projections';

const persistConfig = {
  key: 'root',
  storage,
};

const reducers: ReducersMapObject = {
  auth: authReducer,
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

export interface RootState {
  auth: AuthState;
  goal: GoalState;
  projections: ProjectionsState;
}

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
