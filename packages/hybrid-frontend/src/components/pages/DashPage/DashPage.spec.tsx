import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import { mockClient, mockRefresh } from '../../../../__mocks__/jestMock';
import DashPage from './DashPage';

describe('DashPage', () => {
  test('DashPage title has been successfully rendered', async () => {
    jest.doMock('../../../api/getMyAcnClient', () => ({
      getMyAcnClient: mockClient,
    }));

    jest.doMock('../../../api/postRefreshToken', () => ({
      postRefreshToken: mockRefresh,
    }));

    renderWithTheme(<DashPage />);
    expect(screen.getByText('DashBoard Page')).toBeInTheDocument();
  });
});
