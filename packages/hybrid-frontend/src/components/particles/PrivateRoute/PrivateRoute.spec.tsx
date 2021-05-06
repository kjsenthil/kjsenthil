import React from 'react';
import { render, screen } from '@tsw/test-util';
import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import * as reducer from '../../../services/auth/reducers';
import * as authUtils from '../../../services/auth/utils';
import * as api from '../../../services/auth/api';
import { tokens } from '../../../services/auth/mocks';

jest.mock('../../../services/auth/api', () => ({
  postPin: jest.fn(),
}));

jest.mock('@reach/router', () => ({
  Redirect: ({ to }: { to: string }) => <h1>Redirecting to {to}</h1>,
}));

jest.mock('../../../services/auth/utils', () => ({
  isLoggedInSession: jest.fn(),
  handleLoginSession: jest.fn(),
}));

const mockIsLoggedInSession = (authUtils.isLoggedInSession as jest.Mock).mockReturnValue(false);

describe('Private Route Components', () => {
  let store: Store;
  let Component: React.ComponentType;

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
  });

  describe('when there is no login session', () => {
    it('navigate to login page ', () => {
      render(<Component />);

      expect(screen.getByText('Redirecting to /my-account/login')).toBeInTheDocument();
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
