import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { renderWithTheme, screen } from '@tsw/test-util';
import * as reducer from '../../../services/auth/reducers';
import DashPage from './DashPage';

jest.mock('../../../api/getMyAcnClient', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('DashPage', () => {
  let store: Store;

  let Component: React.ComponentType;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: reducer.authSlice,
      },
    });

    Component = () => (
      <Provider store={store}>
        <DashPage />
      </Provider>
    );
  });

  test('DashPage title has been successfully rendered', async () => {
    renderWithTheme(<Component />);
    expect(screen.getByText('DashBoard Page')).toBeInTheDocument();
  });
});
