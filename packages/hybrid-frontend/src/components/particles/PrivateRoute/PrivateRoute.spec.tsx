import React from 'react';
import { render, screen } from '@tsw/test-util';
import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import * as gatsby from 'gatsby';
import PrivateRoute from './PrivateRoute';
import * as reducer from '../../../services/auth/reducers';
import * as authUtils from '../../../services/auth/utils';
import * as api from '../../../services/auth/api';
import { tokens } from '../../../services/auth/mocks';

jest.mock('../../../services/auth/api', () => ({
  postPin: jest.fn(),
}));

jest.mock('gatsby', () => ({ navigate: jest.fn() }));

jest.mock('../../../services/auth/utils', () => ({
  isLoggedInSession: jest.fn(),
  handleLoginSession: jest.fn(),
}));

const mockIsLoggedInSession = (authUtils.isLoggedInSession as jest.Mock).mockReturnValue(false);

describe('Private Route Components', () => {
  let store: Store;
  let Component: React.ComponentType;
  let mockNavigate: jest.Mock;

  const contentText = 'Private Component';
  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: reducer.authSlice,
      },
    });

    Component = () => (
      <Provider store={store}>
        <PrivateRoute default path="/" Component={() => <h1>{contentText}</h1>} />
      </Provider>
    );

    mockNavigate = gatsby.navigate as jest.Mock;
  });

  describe('when there is no login session', () => {
    it('navigate to login page ', () => {
      render(<Component />);

      expect(mockNavigate).toHaveBeenCalledWith('/my-account/login');
    });
  });

  describe('when there is a login session', () => {
    beforeEach(() => {
      mockIsLoggedInSession.mockReturnValue(true);
    });

    it('does not navigate to login page ', async () => {
      (api.postPin as jest.Mock).mockResolvedValue({
        data: {
          attributes: {
            tokens,
            contactId: '',
          },
        },
      });
      await store.dispatch(reducer.pinLogin([]) as any);

      render(<Component />);

      expect(mockNavigate).not.toHaveBeenCalledWith('/my-account/login');
      expect(screen.getByText(contentText)).toBeInTheDocument();
    });

    it('refreshes token when shouldRefreshTokens is true', () => {
      store.dispatch(reducer.setShouldRefreshTokens());
      const refreshTokenSpy = jest.spyOn(reducer, 'refreshToken');
      render(<Component />);

      expect(refreshTokenSpy).toHaveBeenCalledTimes(1);
    });
  });
});
