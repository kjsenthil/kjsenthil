import React from 'react';
import * as router from '@reach/router';
import { renderWithProviders } from '@tsw/test-util';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Action, Store } from 'redux';
import LogoutPage from './LogoutPage';
import * as reducer from '../../../services/auth/reducers';
import { NavPaths } from '../../../config/paths';
import { AuthState } from '../../../services/auth';

jest.mock('../../templates', () => ({
  LayoutContainer: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@reach/router', () => ({ navigate: jest.fn() }));

const reducers = combineReducers({
  auth: reducer.authSlice,
});
const rootReducer = (state: { auth: AuthState }, action: Action) => {
  if (action.type === 'auth/logout') {
    state = { auth: reducer.initialState };
  }

  return reducers(state, action);
};

describe('Logout', () => {
  let mockNavigate: jest.Mock;
  const store: Store = configureStore({
    reducer: rootReducer as any,
  });

  beforeAll(() => {
    mockNavigate = router.navigate as jest.Mock;
    store.dispatch(reducer.setAccessTokens(['accessTokens1']));
  });

  it('dispatches a logout and redirects to login page', () => {
    renderWithProviders(<LogoutPage />, store);

    expect(mockNavigate).toHaveBeenCalledWith(NavPaths.ROOT_PAGE);
  });
});
