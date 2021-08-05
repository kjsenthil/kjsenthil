import React from 'react';
import { renderWithStore, screen } from '@tsw/test-util';
import * as gatsby from 'gatsby';
import { Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import PrivateRoute from './PrivateRoute';
import { authSlice, pinLogin } from '../../../services/auth';
import * as api from '../../../services/auth/api';
import { tokens } from '../../../services/auth/mocks';
import { NavPaths } from '../../../config/paths';

jest.mock('../../../services/auth/api', () => ({
  postPin: jest.fn(),
}));

jest.mock('gatsby', () => ({ navigate: jest.fn() }));

const reducer = { auth: authSlice };

describe('Private Route Components', () => {
  let store: Store;
  let Component: React.ComponentType;
  let mockNavigate: jest.Mock;

  const contentText = 'Private Component';

  beforeEach(() => {
    store = configureStore({ reducer });
    Component = () => <PrivateRoute default path="/" Component={() => <h1>{contentText}</h1>} />;

    mockNavigate = gatsby.navigate as jest.Mock;
  });

  describe('when there is no login session', () => {
    it('navigate to login page ', () => {
      renderWithStore(<Component />, store);

      expect(mockNavigate).toHaveBeenCalledWith(NavPaths.ROOT_PAGE);
    });
  });

  describe('when there is a login session', () => {
    it('does not navigate to login page ', async () => {
      (api.postPin as jest.Mock).mockResolvedValue({
        data: {
          attributes: {
            tokens,
            contactId: '',
          },
        },
      });
      await store.dispatch(pinLogin([]) as any);

      renderWithStore(<Component />, store);

      expect(mockNavigate).not.toHaveBeenCalledWith(NavPaths.ROOT_PAGE);
      expect(screen.getByText(contentText)).toBeInTheDocument();
    });
  });
});
