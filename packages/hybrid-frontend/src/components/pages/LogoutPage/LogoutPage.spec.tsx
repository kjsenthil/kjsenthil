import React from 'react';
import * as router from '@reach/router';
import { renderWithProviders } from '@tsw/test-util';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Action, Store } from 'redux';
import Cookies from 'js-cookie';
import LogoutPage from './LogoutPage';
import * as reducer from '../../../services/auth/reducers';
import { NavPaths } from '../../../config';
import { AuthState } from '../../../services/auth';
import { ApiAppName } from '../../../constants';

jest.mock('../../templates', () => ({
  LayoutContainer: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

let mockRemoveCookie: jest.Mock;

jest.mock('js-cookie', () => ({
  __esModule: true, // mock the exports
  default: {
    remove: jest.fn().mockImplementation((...args) => {
      mockRemoveCookie(...args);
    }),
  },
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

describe('Logout cookie', () => {
  let mockNavigate: jest.Mock;
  const store: Store = configureStore({
    reducer: rootReducer as any,
  });

  beforeAll(() => {
    mockNavigate = router.navigate as jest.Mock;
    mockRemoveCookie = Cookies.remove as jest.Mock;
    store.dispatch(reducer.setAccessTokens(['accessTokens1']));
  });

  it('dispatches a logout and redirects to login page', () => {
    renderWithProviders(<LogoutPage />, store);
    expect(mockRemoveCookie).toHaveBeenCalledWith(ApiAppName.myAccounts, { domain: '', path: '/' });
    expect(mockRemoveCookie).toHaveBeenCalledWith(ApiAppName.ois, { domain: '', path: '/' });
    expect(mockRemoveCookie).toHaveBeenCalledWith(ApiAppName.online, { domain: '', path: '/' });
    expect(mockNavigate).toHaveBeenCalledWith(NavPaths.ROOT_PAGE);
  });
});
